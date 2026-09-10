import { createDebugPanel } from './assessment/debug-panel';
import { elements, getElement } from './assessment/dom';
import { renderEvaluation } from './assessment/evaluation-view';
import { parseTranscriptExport } from './assessment/transcript';
import type {
  AssessmentEvaluationResponse,
  AssessmentMessageResponse,
  AssessmentProgressResponse,
  DebugReport,
  ProgressHistoryEntry,
  Scenario,
  TranscriptExport,
  Turn,
  TurnRole,
} from './assessment/types';

function readScenarios(): Scenario[] {
  const scenarioData = getElement<HTMLScriptElement>('scenario-data');
  return JSON.parse(scenarioData.textContent ?? '[]') as Scenario[];
}

const scenarios = readScenarios();
const debugMode = new URLSearchParams(window.location.search).has('debug');

let transcript: Turn[] = [];
let progressHistory: ProgressHistoryEntry[] = [];
let isWaitingForAssistant = false;
let isEvaluating = false;
let thinkingIndicator: HTMLDivElement | null = null;
let progressNotice: HTMLDivElement | null = null;

function getCurrentScenario(): Scenario {
  const selectedScenario = scenarios.find(
    (scenario) => scenario.id === elements.scenarioSelect.value,
  );

  return selectedScenario ?? scenarios[0];
}

function createModuleTag(moduleNumber: number): HTMLSpanElement {
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = `${moduleNumber}. modul`;

  return tag;
}

function renderScenario(): void {
  const scenario = getCurrentScenario();
  const moduleTags = scenario.modules.map(createModuleTag);

  elements.scenarioTitle.textContent = scenario.title;
  elements.scenarioPrompt.textContent = scenario.prompt;
  elements.moduleTags.replaceChildren(...moduleTags);
}

function getUserTurnCount(): number {
  const initialTurnCount = getCurrentScenario().initialTranscript?.filter(
    (turn) => turn.role === 'user',
  ).length ?? 0;

  return Math.max(
    0,
    transcript.filter((turn) => turn.role === 'user').length - initialTurnCount,
  );
}

function updateConversationState(): void {
  const userTurnCount = getUserTurnCount();

  elements.turnCounter.textContent = `${userTurnCount} forduló`;
  elements.evaluateButton.disabled =
    userTurnCount === 0 || isWaitingForAssistant || isEvaluating;
  elements.messageInput.disabled = isWaitingForAssistant || isEvaluating;
}

function createMessageElement(role: TurnRole, content: string): HTMLDivElement {
  const message = document.createElement('div');
  message.className = `message ${role}`;

  const label = document.createElement('span');
  label.className = 'message-label';
  label.textContent = role === 'user' ? 'Te' : 'LLM';

  const body = document.createElement('span');
  body.textContent = content;

  message.append(label, body);

  return message;
}

function renderMessage(role: TurnRole, content: string): void {
  if (elements.emptyState.isConnected) {
    elements.emptyState.remove();
  }

  const message = createMessageElement(role, content);
  elements.messages.append(message);
  elements.messages.scrollTop = elements.messages.scrollHeight;
}

function showThinkingIndicator(): void {
  thinkingIndicator?.remove();

  const message = document.createElement('div');
  message.className = 'message assistant thinking';
  message.setAttribute('role', 'status');
  message.setAttribute('aria-label', 'Az LLM válaszol');

  const label = document.createElement('span');
  label.className = 'message-label';
  label.textContent = 'LLM';

  const dots = document.createElement('span');
  dots.className = 'thinking-dots';
  dots.setAttribute('aria-hidden', 'true');

  for (let index = 0; index < 3; index += 1) {
    dots.append(document.createElement('span'));
  }

  message.append(label, dots);
  elements.messages.append(message);
  elements.messages.scrollTop = elements.messages.scrollHeight;
  thinkingIndicator = message;
}

function hideThinkingIndicator(): void {
  thinkingIndicator?.remove();
  thinkingIndicator = null;
}

function hideProgressNotice(): void {
  progressNotice?.remove();
  progressNotice = null;
}

function showProgressNotice(maxTurnsReached: boolean): void {
  hideProgressNotice();

  const notice = document.createElement('div');
  notice.className = 'progress-notice';
  notice.setAttribute('role', 'status');

  const text = document.createElement('span');
  text.textContent = maxTurnsReached
    ? 'Elértük ennek a feladatnak a tervezett hosszát. A beszélgetés már kiértékelhető.'
    : 'Úgy tűnik, ebből a beszélgetésből már értékelhető a megközelítésed.';

  const evaluate = document.createElement('button');
  evaluate.type = 'button';
  evaluate.className = 'button primary';
  evaluate.textContent = 'Kiértékelés';
  evaluate.addEventListener('click', () => void evaluateConversation());

  const continueButton = document.createElement('button');
  continueButton.type = 'button';
  continueButton.className = 'button';
  continueButton.textContent = 'Folytatom még';
  continueButton.addEventListener('click', () => {
    hideProgressNotice();
    elements.messageInput.focus();
  });

  notice.append(text, evaluate, continueButton);
  elements.messages.append(notice);
  elements.messages.scrollTop = elements.messages.scrollHeight;
  progressNotice = notice;
}

function appendTurn(role: TurnRole, content: string): void {
  transcript.push({
    id: transcript.length + 1,
    role,
    content,
  });

  renderMessage(role, content);
}

function renderTranscript(): void {
  elements.messages.replaceChildren(elements.emptyState);
  for (const turn of transcript) {
    renderMessage(turn.role, turn.content);
  }
}

function resetConversation(): void {
  const initialTranscript = getCurrentScenario().initialTranscript ?? [];

  transcript = initialTranscript.map((turn) => ({ ...turn }));
  progressHistory = [];
  isWaitingForAssistant = false;
  isEvaluating = false;
  hideThinkingIndicator();
  hideProgressNotice();

  elements.messageInput.value = '';
  elements.evaluationDialog.close();
  renderTranscript();
  updateConversationState();
}

async function postAssessment<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(debugMode ? { 'x-assessment-debug': '1' } : {}),
    },
    body: JSON.stringify({
      scenarioId: getCurrentScenario().id,
      transcript,
    }),
  });

  if (!response.ok) {
    throw new Error(`Assessment API returned ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

async function requestAssistantTurn(): Promise<string> {
  const result = await postAssessment<AssessmentMessageResponse>(
    '/api/assessment/message',
  );

  if (!result.turn?.content?.trim()) {
    throw new Error('Assessment API returned an empty assistant turn.');
  }

  return result.turn.content.trim();
}

function logProgressHistory(progress: AssessmentProgressResponse): void {
  const learnerTurn = getUserTurnCount();
  progressHistory.push({
    learnerTurn,
    result: {
      ...progress,
      dimensions: progress.dimensions.map((dimension) => ({ ...dimension })),
    },
  });

  const rows = progressHistory.flatMap((entry, historyIndex) =>
    entry.result.dimensions.map(({ dimension, observability }) => {
      const previousEntry = progressHistory[historyIndex - 1];
      const previous = previousEntry?.result.dimensions.find(
        (candidate) => candidate.dimension === dimension,
      )?.observability;
      const peak = Math.max(
        ...progressHistory
          .slice(0, historyIndex + 1)
          .flatMap((candidate) => candidate.result.dimensions)
          .filter((candidate) => candidate.dimension === dimension)
          .map((candidate) => candidate.observability),
      );
      const delta = previous === undefined ? undefined : observability - previous;

      return {
        turn: entry.learnerTurn,
        dimension,
        current: observability,
        previous: previous ?? '—',
        peak,
        delta: delta === undefined ? '—' : Number(delta.toFixed(2)),
        regression: delta !== undefined && delta < 0 ? '↓' : '',
      };
    }),
  );

  console.groupCollapsed(
    `Assessment progress · ${getCurrentScenario().id} · turn ${learnerTurn}`,
  );
  console.table(rows);
  console.debug('Trigger', {
    evidenceSufficient: progress.evidenceSufficient,
    maxTurnsReached: progress.maxTurnsReached,
    noticeTriggeredBy: {
      evidence: progress.evidenceSufficient,
      turnLimit: progress.maxTurnsReached,
    },
  });
  console.groupEnd();
}

async function checkConversationProgress(): Promise<void> {
  try {
    const progress = await postAssessment<AssessmentProgressResponse>(
      '/api/assessment/progress',
    );

    logProgressHistory(progress);

    if (progress.evidenceSufficient || progress.maxTurnsReached) {
      showProgressNotice(progress.maxTurnsReached);
    }
  } catch (error) {
    console.error('Could not evaluate assessment progress.', error);
  }
}

async function submitUserMessage(): Promise<void> {
  const content = elements.messageInput.value.trim();

  if (!content || isWaitingForAssistant || isEvaluating) {
    return;
  }

  hideProgressNotice();
  appendTurn('user', content);
  elements.messageInput.value = '';
  isWaitingForAssistant = true;
  updateConversationState();
  showThinkingIndicator();

  try {
    const assistantContent = await requestAssistantTurn();
    hideThinkingIndicator();
    appendTurn('assistant', assistantContent);
    await checkConversationProgress();
  } catch (error) {
    console.error('Could not continue assessment conversation.', error);
    hideThinkingIndicator();
    renderMessage(
      'assistant',
      'A válasz most nem érkezett meg. Próbáld meg újra egy új üzenettel.',
    );
  } finally {
    hideThinkingIndicator();
    isWaitingForAssistant = false;
    updateConversationState();
    elements.messageInput.focus();
  }
}

async function evaluateConversation(): Promise<void> {
  if (getUserTurnCount() === 0 || isWaitingForAssistant || isEvaluating) {
    return;
  }

  isEvaluating = true;
  hideProgressNotice();
  updateConversationState();
  elements.evaluationSummary.textContent = 'Kiértékelés folyamatban…';
  elements.evaluationDialog.showModal();

  try {
    const evaluation = await postAssessment<AssessmentEvaluationResponse>(
      '/api/assessment/evaluate',
    );
    renderEvaluation(elements.evaluationSummary, evaluation);
  } catch (error) {
    console.error('Could not evaluate assessment.', error);
    elements.evaluationSummary.textContent =
      'A kiértékelés most nem sikerült. Zárd be ezt az ablakot, és próbáld újra.';
  } finally {
    isEvaluating = false;
    updateConversationState();
  }
}

function createTranscriptExport(): TranscriptExport {
  return {
    scenarioId: getCurrentScenario().id,
    transcript,
  };
}

function loadTranscriptExport(imported: TranscriptExport): void {
  elements.scenarioSelect.value = imported.scenarioId;
  renderScenario();
  transcript = imported.transcript;
  progressHistory = [];
  isWaitingForAssistant = false;
  isEvaluating = false;
  hideThinkingIndicator();
  hideProgressNotice();
  elements.evaluationDialog.close();
  renderTranscript();
  updateConversationState();
}

function createDebugReport(): DebugReport {
  return {
    debugReportVersion: 1,
    scenarioId: getCurrentScenario().id,
    transcript,
    progressEvaluations: progressHistory,
  };
}

function handleComposerSubmit(event: SubmitEvent): void {
  event.preventDefault();
  void submitUserMessage();
}

function handleMessageInputKeydown(event: KeyboardEvent): void {
  const shouldSubmit = event.key === 'Enter' && !event.shiftKey;

  if (!shouldSubmit) {
    return;
  }

  event.preventDefault();
  elements.composer.requestSubmit();
}

function bindEventListeners(): void {
  elements.scenarioSelect.addEventListener('change', () => {
    renderScenario();
    resetConversation();
  });

  elements.composer.addEventListener('submit', handleComposerSubmit);
  elements.resetButton.addEventListener('click', resetConversation);
  elements.evaluateButton.addEventListener('click', () => void evaluateConversation());
  elements.closeDialogButton.addEventListener('click', () => {
    elements.evaluationDialog.close();
  });
  elements.messageInput.addEventListener('keydown', handleMessageInputKeydown);
}

function initializeAssessment(): void {
  renderScenario();
  resetConversation();
  bindEventListeners();
  createDebugPanel({
    enabled: debugMode,
    parseTranscript: (value) => parseTranscriptExport(value, scenarios),
    loadTranscript: loadTranscriptExport,
    createTranscriptExport,
    createDebugReport,
  });
}

initializeAssessment();

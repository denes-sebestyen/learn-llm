type Scenario = {
  id: string;
  title: string;
  prompt: string;
  initialTranscript?: Turn[];
  modules: number[];
};

type TurnRole = 'user' | 'assistant';

type Turn = {
  id: number;
  role: TurnRole;
  content: string;
};

type AssessmentMessageResponse = {
  turn: {
    role: 'assistant';
    content: string;
  };
};

type AssessmentProgressResponse = {
  evidenceSufficient: boolean;
  coveredDimensions: string[];
  missingDimensions: string[];
  confidence: number;
  maxTurnsReached: boolean;
};

function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing required element: #${id}`);
  }

  return element as T;
}

function readScenarios(): Scenario[] {
  const scenarioData = getElement<HTMLScriptElement>('scenario-data');
  return JSON.parse(scenarioData.textContent ?? '[]') as Scenario[];
}

const scenarios = readScenarios();

const elements = {
  scenarioSelect: getElement<HTMLSelectElement>('scenario-select'),
  scenarioTitle: getElement<HTMLElement>('scenario-title'),
  scenarioPrompt: getElement<HTMLElement>('scenario-prompt'),
  moduleTags: getElement<HTMLElement>('module-tags'),
  messages: getElement<HTMLElement>('messages'),
  emptyState: getElement<HTMLElement>('empty-state'),
  composer: getElement<HTMLFormElement>('composer'),
  messageInput: getElement<HTMLTextAreaElement>('message-input'),
  resetButton: getElement<HTMLButtonElement>('reset-button'),
  evaluateButton: getElement<HTMLButtonElement>('evaluate-button'),
  turnCounter: getElement<HTMLElement>('turn-counter'),
  evaluationDialog: getElement<HTMLDialogElement>('evaluation-dialog'),
  evaluationSummary: getElement<HTMLElement>('evaluation-summary'),
  closeDialogButton: getElement<HTMLButtonElement>('close-dialog'),
};

let transcript: Turn[] = [];
let isWaitingForAssistant = false;
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
  elements.evaluateButton.disabled = userTurnCount === 0 || isWaitingForAssistant;
  elements.messageInput.disabled = isWaitingForAssistant;
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
  evaluate.addEventListener('click', openEvaluationDialog);

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

function resetConversation(): void {
  const initialTranscript = getCurrentScenario().initialTranscript ?? [];

  transcript = initialTranscript.map((turn) => ({ ...turn }));
  isWaitingForAssistant = false;
  hideThinkingIndicator();
  hideProgressNotice();

  elements.messages.replaceChildren(elements.emptyState);
  elements.messageInput.value = '';

  for (const turn of transcript) {
    renderMessage(turn.role, turn.content);
  }

  updateConversationState();
}

async function postAssessment<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
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

async function checkConversationProgress(): Promise<void> {
  try {
    const progress = await postAssessment<AssessmentProgressResponse>(
      '/api/assessment/progress',
    );

    if (progress.evidenceSufficient || progress.maxTurnsReached) {
      showProgressNotice(progress.maxTurnsReached);
    }
  } catch (error) {
    // Progress evaluation is advisory: a failure must not interrupt the conversation.
    console.error('Could not evaluate assessment progress.', error);
  }
}

async function submitUserMessage(): Promise<void> {
  const content = elements.messageInput.value.trim();

  if (!content || isWaitingForAssistant) {
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

function openEvaluationDialog(): void {
  const userTurnCount = getUserTurnCount();

  elements.evaluationSummary.textContent =
    `${transcript.length} üzenetből, ${userTurnCount} felhasználói fordulóból álló ` +
    'beszélgetés küldhető majd értékelésre.';

  elements.evaluationDialog.showModal();
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
  elements.evaluateButton.addEventListener('click', openEvaluationDialog);
  elements.closeDialogButton.addEventListener('click', () => {
    elements.evaluationDialog.close();
  });
  elements.messageInput.addEventListener('keydown', handleMessageInputKeydown);
}

function initializeAssessment(): void {
  renderScenario();
  resetConversation();
  bindEventListeners();
}

initializeAssessment();

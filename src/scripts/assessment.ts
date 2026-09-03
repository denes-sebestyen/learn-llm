type Scenario = {
  id: string;
  title: string;
  prompt: string;
  modules: number[];
};

type TurnRole = 'user' | 'assistant';

type Turn = {
  id: number;
  role: TurnRole;
  content: string;
};

const MOCK_ASSISTANT_REPLY =
  'Ez most még csak frontend prototípus. A következő lépésben ezen a ponton érkezik majd a conversation model válasza, és a teljes transcript folytatható lesz.';

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
  return transcript.filter((turn) => turn.role === 'user').length;
}

function updateConversationState(): void {
  const userTurnCount = getUserTurnCount();

  elements.turnCounter.textContent = `${userTurnCount} forduló`;
  elements.evaluateButton.disabled = userTurnCount === 0;
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

function appendTurn(role: TurnRole, content: string): void {
  transcript.push({
    id: transcript.length + 1,
    role,
    content,
  });

  renderMessage(role, content);
}

function resetConversation(): void {
  transcript = [];

  elements.messages.replaceChildren(elements.emptyState);
  elements.messageInput.value = '';

  updateConversationState();
}

function submitUserMessage(): void {
  const content = elements.messageInput.value.trim();

  if (!content) {
    return;
  }

  appendTurn('user', content);
  elements.messageInput.value = '';

  appendTurn('assistant', MOCK_ASSISTANT_REPLY);
  updateConversationState();
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
  submitUserMessage();
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
  updateConversationState();
  bindEventListeners();
}

initializeAssessment();

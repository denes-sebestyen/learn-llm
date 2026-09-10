export function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing required element: #${id}`);
  }

  return element as T;
}

export const elements = {
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

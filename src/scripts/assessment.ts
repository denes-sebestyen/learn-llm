type Scenario = { id: string; title: string; prompt: string; modules: number[] };
type Turn = { id: number; role: 'user' | 'assistant'; content: string };

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const scenarios: Scenario[] = JSON.parse(byId<HTMLScriptElement>('scenario-data').textContent ?? '[]');
const select = byId<HTMLSelectElement>('scenario-select');
const title = byId('scenario-title');
const prompt = byId('scenario-prompt');
const moduleTags = byId('module-tags');
const messages = byId('messages');
const emptyState = byId('empty-state');
const composer = byId<HTMLFormElement>('composer');
const input = byId<HTMLTextAreaElement>('message-input');
const resetButton = byId<HTMLButtonElement>('reset-button');
const evaluateButton = byId<HTMLButtonElement>('evaluate-button');
const turnCounter = byId('turn-counter');
const dialog = byId<HTMLDialogElement>('evaluation-dialog');
const evaluationSummary = byId('evaluation-summary');
let transcript: Turn[] = [];

function currentScenario() { return scenarios.find((scenario) => scenario.id === select.value) ?? scenarios[0]; }
function renderScenario() {
  const scenario = currentScenario();
  title.textContent = scenario.title;
  prompt.textContent = scenario.prompt;
  moduleTags.replaceChildren(...scenario.modules.map((number) => {
    const tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = `${number}. modul`; return tag;
  }));
}
function updateState() {
  const turns = transcript.filter((turn) => turn.role === 'user').length;
  turnCounter.textContent = `${turns} forduló`;
  evaluateButton.disabled = turns === 0;
}
function addMessage(role: Turn['role'], content: string) {
  if (emptyState.isConnected) emptyState.remove();
  const element = document.createElement('div'); element.className = `message ${role}`;
  const label = document.createElement('span'); label.className = 'message-label'; label.textContent = role === 'user' ? 'Te' : 'LLM';
  const body = document.createElement('span'); body.textContent = content;
  element.append(label, body); messages.append(element); messages.scrollTop = messages.scrollHeight;
}
function resetConversation() {
  transcript = []; messages.replaceChildren(emptyState); input.value = ''; updateState();
}
select.addEventListener('change', () => { renderScenario(); resetConversation(); });
composer.addEventListener('submit', (event) => {
  event.preventDefault(); const content = input.value.trim(); if (!content) return;
  transcript.push({ id: transcript.length + 1, role: 'user', content }); addMessage('user', content); input.value = '';
  const mockReply = 'Ez most még csak frontend prototípus. A következő lépésben ezen a ponton érkezik majd a conversation model válasza, és a teljes transcript folytatható lesz.';
  transcript.push({ id: transcript.length + 1, role: 'assistant', content: mockReply }); addMessage('assistant', mockReply); updateState();
});
resetButton.addEventListener('click', resetConversation);
evaluateButton.addEventListener('click', () => {
  const userTurns = transcript.filter((turn) => turn.role === 'user').length;
  evaluationSummary.textContent = `${transcript.length} üzenetből, ${userTurns} felhasználói fordulóból álló beszélgetés küldhető majd értékelésre.`;
  dialog.showModal();
});
byId<HTMLButtonElement>('close-dialog').addEventListener('click', () => dialog.close());
input.addEventListener('keydown', (event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); composer.requestSubmit(); } });
renderScenario(); updateState();

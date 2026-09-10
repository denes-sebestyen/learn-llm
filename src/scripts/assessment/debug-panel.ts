import type { DebugReport, TranscriptExport } from './types';
import { downloadJson } from './transcript';

type DebugPanelOptions = {
  enabled: boolean;
  parseTranscript: (value: unknown) => TranscriptExport;
  loadTranscript: (value: TranscriptExport) => void;
  createTranscriptExport: () => TranscriptExport;
  createDebugReport: () => DebugReport;
};

export function createDebugPanel(options: DebugPanelOptions): void {
  if (!options.enabled) {
    return;
  }

  const scenarioPanel = document.querySelector('.scenario-panel');
  if (!scenarioPanel) {
    return;
  }

  const panel = document.createElement('details');
  panel.className = 'helper';
  const summary = document.createElement('summary');
  summary.textContent = 'Transcript debug';

  const transcriptText = document.createElement('textarea');
  transcriptText.rows = 8;
  transcriptText.placeholder = 'Transcript JSON…';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'application/json,.json';
  fileInput.hidden = true;

  const status = document.createElement('p');
  status.setAttribute('role', 'status');

  const actions = document.createElement('div');
  actions.className = 'conversation-actions';

  const importButton = document.createElement('button');
  importButton.type = 'button';
  importButton.className = 'button';
  importButton.textContent = 'Textarea import';
  importButton.addEventListener('click', () => {
    try {
      const imported = options.parseTranscript(JSON.parse(transcriptText.value));
      options.loadTranscript(imported);
      status.textContent = 'Transcript betöltve a textarea tartalmából.';
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : 'Sikertelen import.';
    }
  });

  const textExportButton = document.createElement('button');
  textExportButton.type = 'button';
  textExportButton.className = 'button';
  textExportButton.textContent = 'Textarea export';
  textExportButton.addEventListener('click', () => {
    transcriptText.value = JSON.stringify(options.createTranscriptExport(), null, 2);
    status.textContent = 'Transcript kiírva a textarea mezőbe.';
  });

  const fileImportButton = document.createElement('button');
  fileImportButton.type = 'button';
  fileImportButton.className = 'button';
  fileImportButton.textContent = 'Fájl import';
  fileImportButton.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (!file) {
      return;
    }

    void (async () => {
      try {
        const content = await file.text();
        const imported = options.parseTranscript(JSON.parse(content));
        options.loadTranscript(imported);
        transcriptText.value = content;
        status.textContent = `Transcript betöltve: ${file.name}`;
      } catch (error) {
        status.textContent = error instanceof Error ? error.message : 'Sikertelen import.';
      } finally {
        fileInput.value = '';
      }
    })();
  });

  const exportButton = document.createElement('button');
  exportButton.type = 'button';
  exportButton.className = 'button';
  exportButton.textContent = 'Fájl export';
  exportButton.addEventListener('click', () => {
    const value = options.createTranscriptExport();
    downloadJson(`assessment-${value.scenarioId}-transcript.json`, value);
  });

  const reportButton = document.createElement('button');
  reportButton.type = 'button';
  reportButton.className = 'button';
  reportButton.textContent = 'Debug report export';
  reportButton.addEventListener('click', () => {
    const report = options.createDebugReport();
    downloadJson(`assessment-${report.scenarioId}-debug.json`, report);
  });

  actions.append(
    importButton,
    textExportButton,
    fileImportButton,
    exportButton,
    reportButton,
  );
  panel.append(summary, transcriptText, fileInput, actions, status);
  scenarioPanel.append(panel);
}

import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};
const runs = Number(getArg('--runs', '10'));
const scenario = getArg('--scenario', '');
const input = getArg('--input', 'assessment/regression/fixtures');
const output = getArg('--output', 'assessment/regression/results');

if (!Number.isInteger(runs) || runs < 1) throw new Error('--runs must be a positive integer.');

const fixtures = [];
for (const file of (await readdir(input)).filter((name) => name.endsWith('.json'))) {
  const value = JSON.parse(await readFile(join(input, file), 'utf8'));
  const scenarioId = value.scenarioId ?? value.scenario?.id;
  if (scenarioId && Array.isArray(value.transcript) && (!scenario || scenario === scenarioId)) {
    fixtures.push({ file, scenarioId, transcript: value.transcript });
  }
}
if (!fixtures.length) throw new Error('No matching fixtures found.');

const report = { version: 1, createdAt: new Date().toISOString(), runsPerFixture: runs, fixtures: [] };

for (const fixture of fixtures) {
  const evaluations = [];
  for (let index = 0; index < runs; index += 1) {
    const response = await fetch('http://127.0.0.1:8787/api/assessment/evaluate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ scenarioId: fixture.scenarioId, transcript: fixture.transcript }),
    });
    if (!response.ok) throw new Error(`Evaluation failed with HTTP ${response.status}.`);
    evaluations.push(await response.json());
    process.stdout.write('.');
  }

  const scores = {};
  for (const evaluation of evaluations) {
    for (const item of evaluation.dimensions) {
      scores[item.dimension] ??= { 0: 0, 1: 0, 2: 0, 3: 0 };
      scores[item.dimension][item.score] += 1;
    }
  }
  console.log(` ${fixture.scenarioId}: ${JSON.stringify(scores)}`);
  report.fixtures.push({ file: fixture.file, scenarioId: fixture.scenarioId, scores, evaluations });
}

await mkdir(output, { recursive: true });
const stamp = new Date().toISOString().replaceAll(':', '-');
const reportFile = join(output, `assessment-regression-${stamp}.json`);
await writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Report: ${reportFile}`);

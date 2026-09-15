# Assessment regression harness

This directory contains repeatable evaluator regression fixtures. The runner re-evaluates saved assessment transcripts several times against a locally running Worker and records score distributions together with the complete evaluation responses.

Start the Worker locally, then run:

```sh
npm run assessment:regression -- --runs 10
```

A single scenario can be selected with:

```sh
npm run assessment:regression -- --scenario prompt-improvement --runs 20
```

Fixtures live in `assessment/regression/fixtures`. Transcript exports and evaluation exports are both accepted. Generated reports are written to `assessment/regression/results` and ignored by Git. Use `--input` or `--output` to override those directories.

Keep committed fixtures synthetic and free of personal or sensitive data.

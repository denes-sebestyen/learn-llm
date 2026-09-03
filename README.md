# learn-llm

An open-source course about using large language models effectively, critically, and responsibly.

Rather than teaching collections of "perfect prompts" or prompt-engineering tricks, **learn-llm** focuses on practical LLM literacy: understanding what these systems are good at, recognizing their limitations, verifying their claims, and learning how to work with them as interactive tools and thinking partners.

> **Status:** The project is under active development. The course itself is currently written in Hungarian.

## What the course covers

The course currently consists of ten modules covering:

- a practical mental model of AI and LLMs;
- writing useful requests with appropriate context and constraints;
- iterative conversation instead of relying on a single perfect prompt;
- hallucinations, uncertainty, and overconfident mistakes;
- source criticism and verification;
- current information and web-assisted answers;
- higher-risk domains such as health, law, finance, and safety;
- using an LLM as a thinking partner rather than delegating judgment to it;
- working with documents, images, and other inputs;
- privacy, data minimization, and sensible handling of sensitive information.

The Hungarian course homepage and the individual modules are available in [`index.md`](index.md) and the [`modules`](modules/) directory.

## Adaptive assessment

The project is also experimenting with a more practical way to assess LLM literacy.

Instead of only asking fixed quiz questions, the planned assessment system can generate realistic scenarios and let a learner conduct a multi-turn conversation with an LLM. A separate evaluator can then assess the observable interaction strategy — for example whether the learner notices uncertainty or contradictions, asks useful follow-up questions, verifies important claims, minimizes unnecessary sensitive data, and changes approach when something goes wrong.

The intended architecture separates three roles:

```text
scenario generator → conversation model → evaluator
```

Static diagnostic scenarios remain useful as reproducible baselines and calibration cases, while dynamically generated conversations can test whether the same skills transfer to unfamiliar situations.

The current assessment specifications live in [`assessment/`](assessment/).

## Philosophy

The central idea of the project is that effective LLM use is not primarily about memorizing special wording.

Good LLM use involves judgment: knowing what context to provide, when to iterate, what to question, what to verify elsewhere, when consequences make independent verification especially important, and which decisions should remain with the human using the tool.

## Website

The course is published as an Astro/Starlight static site and deployed on Cloudflare Workers Static Assets.

Current site: https://learn-llm.denes-sebestyen.workers.dev/

## Contributing

Feedback, corrections, examples, and other contributions are welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the contribution workflow.

Because both LLM products and good practices around them continue to evolve, the project treats the material as something that should be reviewed and improved over time.

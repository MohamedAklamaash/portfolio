---
title: The Same Jailbreak Scored 1.00 and 0.15
description: In LLM safety, a number means little if you can't name the dataset and the judge behind it. So I built a benchmark that records both.
date: 2026-06-26
---

> [redharness](https://github.com/MohamedAklamaash/redharness) is a benchmark for how well language models hold up against jailbreaks, prompt injection and data leakage, all measured the same way. Usage notes are in [`docs/OVERVIEW.md`](https://github.com/MohamedAklamaash/redharness/blob/main/docs/OVERVIEW.md).

## What bothered me

I kept reading LLM safety papers and finding numbers I couldn't trust. One paper reports a 90% attack success rate, another reports 15% for what sounds like the same attack on the same model. There's no way to tell whether the gap comes from the attack, the dataset or whoever decided what counts as a "success".

That last part matters the most. Souly et al. (StrongREJECT) showed that weak or lenient judges make jailbreaks look far more successful than they are. Change the grader and the headline number can move by tens of points. So "attack success rate" isn't one thing. It's a slightly different measurement in almost every paper, on a different set of behaviours, scored by a different judge, often on a dataset that has changed since.

The benchmarks people actually adopted, like HarmBench and JailbreakBench, didn't win by having the strongest attack. They won by fixing the evaluation: fixed behaviours, fixed judges, versioned datasets and public leaderboards. I wanted to apply that idea more widely, so I built redharness.

## What it does

The idea is simple: **standardise the evaluation, not just the attack.** redharness covers the three areas that are measured least consistently today (jailbreaks, prompt injection and data leakage) and runs them all through the same setup with strict rules for reproducibility.

An evaluation is a grid built from five pluggable parts. A run goes through every cell of the grid and scores it:

```
Dataset ─▶ Attack ─▶ Target ─▶ transcript ─▶ Judge ─▶ Metric ─▶ Leaderboard
```

- **Target**: the model or system being tested
- **Attack**: turns a behaviour into attack attempts (simple templates, or attacker-LLM methods like PAIR, TAP and Crescendo)
- **Dataset**: a versioned set of behaviours, checked against a hash before use
- **Judge**: decides whether each attempt succeeded
- **Metric**: turns those decisions into the number you report

Prompt injection against agents adds two more parts: a sandboxed tool environment and the injection itself. It runs a short agent loop, so I can check two things: whether the attacker's goal went through, and whether the agent still finished the task it was actually given.

The part I care about most is that every leaderboard row records the dataset version, the judge and the metric that produced it. Those three are the biggest reasons results disagree across papers, so tying them to every number is the point of the whole project.

## The result that made the case

Once it could run against a real model, it showed the judge problem straight away. I tested `claude-haiku-4-5`, with `gpt-4o-mini` as the attacker and grader, on public datasets pinned to exact commits:

- **AdvBench, direct requests:** attack success 0.00 and refusal rate 1.00. An aligned model refuses plain harmful requests, as expected.
- **AdvBench, PAIR attack:** the attack gets through. But scoring the *same transcripts*, a simple string-match judge says the attack succeeded 100% of the time (1.00), while the StrongREJECT rubric judge says 15% (0.15). That's a gap of about 6.7× from nothing but the choice of judge.
- **XSTest, safe prompts:** false refusal rate 0.00. The model didn't refuse harmless prompts.

That PAIR row is the whole argument in one line. An attack success rate means very little unless you say which judge produced it. redharness has a `judge-agreement` command (attack success per judge, plus Cohen's κ) built to show exactly this.

## What took the most work

**Making it reproducible by default.** A benchmark nobody can re-run is just a story. Datasets are checked against a hash before use, runs are seeded, and results are cached on their full set of parameters, so changing any setting never reuses an old result by mistake. Every prompt and response is saved, and one command reproduces any leaderboard row.

**Keeping it safe to publish.** I wanted anyone to be able to try it without me distributing anything harmful. The bundled data is synthetic: refusal probes contain only the request, never a harmful answer, attacker goals are harmless markers, and the "secrets" are obviously fake (made-up domains, `555-01xx` phone numbers, `CANARY-…` strings). Weapons and explosives content is left out completely. Real datasets like AdvBench and HarmBench are only downloaded if you explicitly ask for them, and they're hash-checked when they arrive.

**Plugins that can't run arbitrary code.** Plugins are picked by name from a YAML file through a fixed lookup table. There's no dynamic import or `eval`, so a config file can choose components but can't execute code. The leaderboard dashboard treats every submitted result as untrusted input too.

**Keeping the core small.** The core runs fully offline with no extra packages and no API keys, and gives identical results on any machine. Live model adapters and heavier tools (PAIR, TAP, garak, PyRIT) are optional extras, and a CI check makes sure the offline core never quietly starts needing the network.

## What I learnt

The most useful lesson wasn't about any attack. It was how fragile a result becomes when the way it was measured isn't pinned down. Designing this forced me to be precise about what a "result" even is: not a number on its own, but a number plus the exact dataset, judge and metric behind it.

It also made me properly understand the safety literature (HarmBench, JailbreakBench, StrongREJECT, PAIR and TAP, canary-based leakage tests, the OWASP LLM Top 10), because plugging each one in meant understanding exactly what it measures.

## Why it matters

Anyone choosing between models should be able to ask: *is model A safer than model B, by how much, against which kind of attack, and can someone else reproduce that number?* For most published work today, the honest answer is no. redharness is my attempt to make that question answerable, and to give prompt injection and data leakage the same careful treatment that jailbreaks already get.

It's a tool for authorised safety testing and research. The goal isn't a stronger attack. It's a number you can actually trust.

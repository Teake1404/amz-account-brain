---
name: amz-finding
description: >
  Write down something concluded about an Amazon account, with the run behind it,
  the denominator, the caveats that touch it and — the part that matters — what
  would prove it wrong. A finding without a falsifier is an opinion with a date
  on it. Use when someone says "log this finding", "write this up", "we learned
  that", "save this insight", "record what we found", or states a conclusion
  about performance that should survive past this week.
---

# Finding

The unit the brain is actually for. Everything else exists so a finding can be
trusted later, by someone who was not there.

**Read `CLAUDE.md`, then `caveats.md`, then `timeline.md` before writing one.**

---

## Step 1 — is this a finding or an observation?

A **finding** says something is true of the account and could change a decision.
An **observation** is a number someone noticed.

"Branded search is 43% of attributed purchases" is an observation. "We are paying
to intercept buyers who were already returning, and branded search is where it
happens" is a finding — it carries a claim about cause and it points at an
action.

Observations belong in the run log. Findings get their own file. If it is an
observation, say so and put it in `runs/`.

---

## Step 2 — the five checks, before writing anything

1. **Which run?** Name the file in `runs/`. No run, no finding — unless it is
   explicitly marked `evidence: none, belief only`, which is allowed and useful,
   but must be labelled.
2. **What is the denominator?** A percentage with no base is not evidence. Pull
   the base from the run and put it in.
3. **Which caveats touch it?** Read `caveats.md` properly. If one applies, it
   goes in the finding, not in a footnote somewhere else.
4. **What is in the timeline for that window?** If a stockout or a price change
   overlaps, it is part of the finding whether or not it is convenient.
5. **Is the language causal, and is that earned?** "Ads drove" needs a holdout.
   Without one, the sentence is "ads were present before", and that is still
   worth writing.

---

## Step 3 — write `findings/<date>-<slug>.md`

```markdown
# <the finding, as one sentence>
date: <date> · confidence: high | medium | low
evidence: runs/<file>  ·  denominator: <n, of what>

## What we think is true
<two or three sentences, plain>

## Caveats that apply
<from caveats.md, each with why it matters here. "none" is a valid answer only
 if caveats.md was actually read.>

## Timeline overlap
<anything from timeline.md inside the window, or "none in window">

## Falsified by
<THE REQUIRED FIELD. What observation would show this is wrong? Be specific
 enough that someone could go and check it.>

## What it would change
<the decision this affects. If none, say so — a finding that changes nothing is
 worth keeping but should admit it.>
```

---

## Step 4 — the falsifier is the work

Most of the value of this skill is in one field, and it is the one people want to
skip.

Weak: *"if the data were wrong"*. That is not a falsifier, it is a shrug.

Strong: *"if branded-search share stayed at 43% through a month when we paused
branded campaigns entirely, the intercept story is wrong and the demand was
coming anyway."*

A good falsifier is something you could actually go and look at, and it often
turns out to be the next piece of work. If you cannot write one, the confidence
is `low` and the file should say so.

---

## Step 5 — check it against the existing findings

Read the other files in `findings/`. Three outcomes, all worth handling:

- **It agrees with an earlier finding** — add a line to the earlier one pointing
  here. Two independent runs agreeing is worth more than either alone.
- **It contradicts one** — do not delete the old one. Add a `superseded by` line
  to it and a `supersedes` line here, and say in one sentence what changed: new
  data, a corrected method, or a changed account. **A brain that silently
  overwrites its own past cannot be audited, and an un-auditable brain is just
  confident.**
- **It is the same finding again** — update the existing file's date and evidence
  rather than making a second one.

---

## Failure modes

- **They want to skip the falsifier.** Do not let it through as `high`
  confidence. Offer `low` with the falsifier blank and a note saying why.
- **The finding is about one week.** One week of Amazon data is mostly noise.
  Either widen the window or mark confidence `low` and say the window is the
  reason.
- **The denominator is small.** Under about 50, say the count rather than the
  percentage. "11 of 38" is honest; "29%" is theatre.
- **It restates something in `caveats.md`.** That is not a finding about the
  account, it is a property of the data. It belongs in caveats.
- **Someone senior asserts it and wants it logged as fact.** Record it with
  `evidence: none, belief only` and `source: <name>`. That is an honest entry and
  it is often the most useful one in the folder six months later.

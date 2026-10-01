# Amazon account brain

Six Claude Code skills that give one Amazon advertising account a memory — so you
stop re-deriving what you already worked out, and so a number can still be
defended three months after you quoted it.

Plain markdown in a folder. No database, no app, nothing to maintain. You can
grep it, diff it, and hand it to whoever takes the account next.

## The problem it fixes

Every week you pull reports. Last week's finding is in a Slack message. You
discover that this account's DSP rows come back NULL, and six weeks later you
discover it again. A number moves and nobody can say whether it is real, because
nobody wrote down that the hero ASIN was out of stock for nine days, or that last
month's pull used a different window.

Then someone spends a day optimising bids against a stockout.

## Install

```bash
npx skills add Teake1404/amz-account-brain
```

Then in Claude Code:

```
Set up an account brain for <client>
```

## The six skills

| skill | what it does |
|---|---|
| `amz-brain-setup` | **Run first.** Builds the folder and writes the rules. Seeds the caveats that are true of every AMC account. |
| `amz-account-profile` | What the account actually is — marketplaces, ad types, AMC and FSI, currency, margin, who signs off |
| `amz-run-log` | One file per data pull: the exact window, what came back, what was blank, what the coverage was |
| `amz-timeline` | What happened that was **not** advertising — stockouts, price changes, Prime events, policy changes |
| `amz-finding` | Something concluded, with its evidence, its denominator, and what would prove it wrong |
| `amz-ask` | Ask a question; get an answer that checks the timeline before it blames the ads |

## What the folder looks like

```
brains/<account>/
├── CLAUDE.md          the rules, read before any answer
├── profile.md         what this account is
├── caveats.md         what is known to be wrong or missing here
├── timeline.md        what happened in the world, dated
├── runs/              one file per data pull
└── findings/          one file per thing concluded
```

## The three ideas it is built on

**Read the timeline before the data.** When a number moves, `amz-ask` opens
`timeline.md` before it opens a single run. Most unexplained moves in an Amazon
account are supply or price, not bidding. Leading with the campaign data is how a
week gets spent in the wrong place.

**Every finding carries its falsifier.** A finding without a `Falsified by` line
is an opinion with a date on it. The field is required, and writing a good one
usually turns out to be the next piece of work.

**A blank is withheld, not zero.** Seeded into `caveats.md` at setup along with
the per-column thresholds, the 14-day attribution lag, the 365-day new-to-brand
definition, and the fact that two runs of the same AMC query disagree. These
distort numbers in every account, so they go in before you have found anything.

## Checking the brain

A brain decays quietly. A finding loses its falsifier, a run loses its window, an
inferred event gets cited as fact — none of that throws an error, and the folder
still looks fine.

```bash
node lib/brain-check.mjs brains/<account>
```

Run it against the worked example in this repo and it finds seven problems,
including the subtle one:

```
brain-check  demo-brand
  2 runs · 2 findings · 2 timeline entries

  warn  runs/2026-09-01-ntb-90d.md — window ends inside the attribution lag
  warn  findings/…-branded-drove-growth.md — falsifier looks like a shrug
  warn  timeline 2026-08-14 is "inferred" but cited by 1 finding(s)
  FAIL  runs/2026-09-20-branded-split.md — no window line
  FAIL  findings/…-branded-drove-growth.md — causal verb with no holdout mentioned
```

That last failure is the one that matters. "Branded search **drove** the
quarter's growth" is a causal claim, and nothing in the brain supports it.

Exit code is 1 if anything failed, so it drops into a pre-commit hook or CI.

## One brain per account

Caveats are account-specific. "DSP comes back NULL here" is only true somewhere,
so a shared caveats file is wrong for every account in it. Use a folder each
under one parent.

## Credits

The skill-pack shape — a setup skill that writes files the others read — is
Charlie Hills' pattern, from
[social-media-skills](https://github.com/charlie947/social-media-skills). The
raw-folder-plus-compiled-wiki idea underneath it is Andrej Karpathy's.

What is mine is the Amazon half: the seeded caveats, the timeline-before-data
rule, the required falsifier, and the integrity checker.

## Who wrote this

Shuqing Ke. I work on AMC and incrementality for Amazon — the measurement side,
whether the ad caused the sale or just stood next to it.

The writing is at [shuqingke.substack.com](https://shuqingke.substack.com/).

See also: [amz-motion-skills](https://github.com/Teake1404/amz-motion-skills),
for turning what the brain knows into something postable.

## Licence

MIT.

---
name: amz-brain-setup
description: >
  Run this first. Builds the folder structure for an Amazon account brain — a
  plain-markdown memory of one advertising account that survives between weeks,
  so you stop re-deriving what you already worked out. Creates profile, caveats,
  timeline, runs and findings, and writes the rule that makes every later answer
  check the timeline before it blames the ads. Use when someone says "set up an
  account brain", "start a brain for this client", "onboard this account",
  "build my Amazon knowledge base", "I keep forgetting what we found last month",
  or begins work on an Amazon account with no brain folder present.
---

# Account brain setup

One account, one folder, plain markdown. No database, no app, nothing that needs
maintaining. You can grep it, diff it, and hand it to someone else.

**Go straight to Step 1. No preamble.**

---

## Step 0 — one account, not many

Ask which account this brain is for and where the folder should live. Default to
`./brains/<account-slug>/`.

**One brain per advertising account, always.** Two accounts in one folder makes
every caveat ambiguous — "DSP comes back NULL here" is only true somewhere. If
they want several, make several folders and say so.

If the folder already exists, read `profile.md` and say what you found rather
than overwriting. Setup is idempotent.

---

## Step 1 — build the structure

```
brains/<account>/
├── CLAUDE.md          the rules, read before any answer
├── profile.md         what this account is
├── caveats.md         what is known to be weird here
├── timeline.md        what happened in the world, dated
├── runs/              one file per data pull
└── findings/          one file per thing concluded
```

Create the folders and write `CLAUDE.md` exactly as below. The three rules in it
are the whole point of the pack and must not be softened.

```markdown
# Rules for this account brain

Before answering any question about this account's performance:

1. **Read `timeline.md` first.** If anything happened in or near the window
   being discussed — a stockout, a price change, a creative swap, a Prime event,
   a budget change, a policy change — name it before offering an advertising
   explanation. Most unexplained moves are not advertising.

2. **Read `caveats.md` before quoting any figure.** It records what is known to
   be wrong or missing in this account's data. A figure that a caveat covers is
   quoted with the caveat attached, every time, or not quoted at all.

3. **Every claim names its run.** If a number came from a pull, the answer says
   which file in `runs/`. "Roughly 40%" with no run behind it is not an answer
   here, it is a guess, and should be labelled one.

A finding without a `falsified_by` line is incomplete. A run without a window is
unusable. Say so rather than working around it.
```

---

## Step 2 — seed `caveats.md` with what is true everywhere

These apply to every Amazon account, so they go in at setup. Account-specific
ones get added later by `amz-caveats` as they are discovered.

```markdown
# Caveats — things known to distort this account's numbers

## Universal (true of all AMC accounts, seeded at setup)

- **A blank is withheld, not zero.** AMC suppresses a value when a row falls
  under a per-column threshold while the row itself still publishes. Reading a
  blank as zero understates the thing and corrupts any share computed from it.
- **The thresholds are per column, not per query.** Most campaign dimensions
  publish at 2 users; timestamp-derived values need 100. Two columns holding the
  same information can sit two tiers apart, so the same question asked two ways
  returns different coverage.
- **Two runs of the same query disagree.** Same SQL, same explicit window,
  minutes apart, slightly different totals. Never assert exact equality between
  two runs; re-run before debugging a hairline mismatch.
- **Attribution lag is about 14 days.** A window ending inside that is still
  settling, and will grow after you quote it.
- **Attributed is not caused.** An ad being present before a sale is not the ad
  having produced it. Only a holdout supports a causal claim.
- **New-to-brand is a 365-day definition.** A buyer from 13 months ago counts as
  new again.

## This account

<!-- added by amz-caveats as they are found. Each one needs: what is wrong,
     how it was discovered, the date, and which figures it touches. -->
```

---

## Step 3 — empty scaffolds

Write `timeline.md` with its header and one worked example commented out, so the
format is obvious. Same for `profile.md` — but do not interview here. Say that
`amz-account-profile` fills it, and offer to run it next.

---

## Step 4 — confirm

Four lines: the path, the six things created, the one rule in `CLAUDE.md` most
likely to change an answer, and `amz-account-profile` as the next step.

---

## Failure modes

- **They want one brain for an agency's whole portfolio.** Refuse politely and
  explain: caveats are account-specific, so a shared caveats file is wrong for
  every account in it. Offer a folder per account under one parent.
- **An existing `CLAUDE.md` is at the project root.** The brain's `CLAUDE.md`
  lives inside the brain folder, not at the root. Do not merge them.
- **They ask to skip the caveats seeding to save time.** It is six lines and it
  is the part that stops a wrong number being quoted confidently. Write it.
- **The account is on Seller Central only, no AMC.** Most of the seeded caveats
  are AMC-specific. Keep them anyway, marked as not yet applicable, and note in
  `profile.md` that AMC is absent. They become live the day AMC is switched on.

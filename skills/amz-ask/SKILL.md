---
name: amz-ask
description: >
  Ask the account brain a question and get an answer that checks the timeline and
  the known caveats before it blames the ads, names the run behind every number,
  and says plainly when the brain does not know. Use when someone says "why did
  X change", "what do we know about", "ask the brain", "what happened in
  September", "have we looked at this before", "is this normal for this account",
  or asks any performance question about an account that has a brain folder.
---

# Ask the brain

The retrieval half. Everything else in this pack exists so this answer can be
honest.

**Read in this order, always, before composing anything:** `CLAUDE.md`,
`profile.md`, `caveats.md`, `timeline.md`, then the relevant files in `runs/` and
`findings/`.

---

## Step 1 — read the timeline before the data

This is the rule that earns the pack its keep, and it inverts the normal habit.

When the question is about a change — why did this drop, why did that spike —
**look at `timeline.md` for that window first, before opening a single run.**

If something is there, it leads the answer. Not as a caveat at the end, as the
first sentence:

> "There was a nine-day stockout on the hero ASIN from 14 August, which is ten
> percent of the window. Before we look at the campaign data, that is the
> likeliest explanation and it is worth ruling in or out first."

Most unexplained moves in an Amazon account are supply or price. Leading with the
ads is how a week gets spent optimising bids against an out-of-stock listing.

---

## Step 2 — check the caveats before quoting anything

For every figure you are about to state, check whether a caveat covers it. If one
does, it travels with the number in the same sentence. Never in a footnote, never
"as previously discussed".

> "New-to-brand was 31%. Note the 365-day definition — a buyer from 13 months ago
> counts as new, so this overstates genuinely new customers by an unknown amount."

---

## Step 3 — answer in this shape

1. **The answer**, one or two sentences
2. **What it rests on** — the run file, the window, the denominator
3. **What could make it wrong** — caveats, timeline overlap, the falsifier from
   the finding if there is one
4. **What the brain does not know** — explicitly

Point 4 is not padding. The honest end of most questions is a known unknown from
`profile.md`, and naming it is what stops the gap being filled with a guess by
whoever reads the answer next.

---

## Step 4 — say when you do not know

Three distinct answers, and they must not be blurred:

- **"The brain does not have this."** Nothing in runs or findings covers it. Say
  what would need to be pulled.
- **"The brain has it but cannot support that claim."** There is a run, but the
  window is inside the lag, or the denominator is tiny, or a caveat covers it.
  Say which.
- **"The brain has a belief, not evidence."** A finding marked `evidence: none,
  belief only`. Quote it and say whose belief it is.

**Never compose a plausible answer across these.** A brain that fills gaps
smoothly is worse than no brain, because it is trusted.

---

## Step 5 — offer the next pull, not a conclusion

If the brain cannot answer, end with what would answer it: which report, which
window, which grain. That is more useful than a hedge, and it is often a
ten-minute job.

---

## Failure modes

- **The question assumes a cause.** "Why did the ads stop working" presumes they
  did. Check the timeline first; the answer is often that they did not.
- **A finding contradicts a newer run.** Say both, say which is newer, and point
  at the falsifier in the finding. Do not pick silently.
- **Two runs disagree slightly.** Expected — AMC is not reproducible to the
  digit. Do not present a sub-percent difference as a change.
- **They want a single number for a deck.** Give it with its denominator and its
  run date attached, as one string. A number that travels without those becomes a
  number nobody can defend in the meeting it ends up in.
- **The timeline is empty.** Then the brain cannot rule out supply or price, and
  the answer must say so rather than implying advertising by omission.
- **The question spans two accounts.** One brain, one account. Answer from this
  one and say the other is outside it.

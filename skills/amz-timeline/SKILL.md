---
name: amz-timeline
description: >
  Record what happened to an Amazon account that was not advertising — stockouts,
  price changes, a listing suppression, a new review wave, a competitor launch,
  Prime Day, a budget change, a policy change. The file that explains a move
  before anyone blames the ads. Use when someone says "log what happened", "we
  went out of stock", "the price changed", "add to the timeline", "we launched a
  new ASIN", "why did performance drop", or describes any event that could move
  a number.
---

# Timeline

Most unexplained moves in an Amazon account are not advertising. This is the file
that says so, with dates, before anyone spends a day optimising a bid against a
stockout.

**Read `CLAUDE.md` in the brain folder first.**

---

## Step 1 — what counts

Anything that could move a number and was not a bid. Prompt with this list,
because people forget most of it:

**Supply** — out of stock, low stock, a Buy Box loss, a long inbound delay,
an FBA restriction, a listing going inactive

**Price and offer** — price change, coupon, deal, subscribe-and-save change, a
competitor's price move

**The listing** — title or image change, A+ content, a variation added or split,
a review wave good or bad, a suppression or policy flag

**Demand** — Prime Day, Big Deal Days, Black Friday, a seasonal peak, a PR
moment, a competitor launching or exiting

**Ads, but structural** — budget change, campaign restructure, a new ad type
switched on, dayparting changed, DSP starting or stopping

**Platform** — an Amazon policy change, a fee change, a reporting change, an
attribution change

**The account itself** — agency change, a new person on it, access lost or
regained

---

## Step 2 — date it properly

Every entry needs a date or a range. "Around August" is close to useless when the
question is which of two weeks moved.

If the date is uncertain, record the uncertainty rather than picking: `2026-08-12
to 2026-08-19 (exact day unknown)`. A ranged entry still rules things in and out;
an invented precise date quietly misleads.

---

## Step 3 — write to `timeline.md`

Newest first. One block each:

```markdown
## 2026-08-14 — Hero ASIN out of stock, 9 days
type: supply
affected: <ASIN or "whole account">
confidence: confirmed | reported | inferred
source: <who said so, or which file>
note: <one line>
expected direction: <what this should do to the numbers, if known>
```

**`confidence` is not optional.** "Confirmed" means you saw it in data or a
system. "Reported" means a person said so. "Inferred" means you worked it out
from a pattern and could be wrong. An inferred stockout used later as a
confirmed explanation is how a brain starts lying to its owner.

`expected direction` is written **before** anyone looks at the result. It is the
difference between explanation and rationalisation.

---

## Step 4 — reconcile against the runs

After adding an entry, look in `runs/` for any run whose window overlaps it. For
each overlap, append one line to that run file:

```markdown
timeline overlap: 2026-08-14 stockout (9 days of a 90-day window)
```

This is the mechanic that makes the brain pay off. Three months later, the figure
carries its own asterisk, and nobody has to remember.

---

## Failure modes

- **They only want to log bad events.** Log the good ones too. A review wave or a
  PR hit explains an upswing, and an unexplained upswing gets credited to the ads
  just as wrongly as an unexplained drop gets blamed on them.
- **"Nothing happened."** Ask about stock specifically, then price. Those two are
  forgotten more than everything else combined because they belong to a different
  team.
- **An inferred event hardens into fact.** Re-read entries marked `inferred` when
  they get cited. If one has been used three times, either confirm it or
  downgrade what it supports.
- **The timeline gets long.** Good. Never prune it. If it is hard to read, group
  by year, but a pruned timeline loses exactly the old entry that explains the
  year-on-year comparison.
- **A Prime event is in the window.** Always log it, even though everyone knows.
  Everyone knows in the moment; nobody remembers in March.

---
name: amz-account-profile
description: >
  Fill in what an Amazon advertising account actually is — marketplaces, ad
  types, whether DSP and AMC and FSI are live, currency, the ASINs that matter,
  margin assumptions and who decides things. Written once into profile.md and
  read by every other skill so nothing asks you twice. Use when someone says
  "profile this account", "what is this account", "fill in the profile", "set up
  the account details", or when another skill reports that profile.md is empty.
---

# Account profile

The file every other skill reads before it does anything. Twenty minutes once,
then never answered again.

**Read `CLAUDE.md` in the brain folder first.** If there is no brain folder, run
`amz-brain-setup`.

---

## Step 1 — the interview, one batch

Ask all of these at once. Do not drip them.

**What is sold**
1. Brand name, and the marketplaces it sells on
2. Seller Central, Vendor Central, or both
3. Roughly how many ASINs, and which three or four actually carry the revenue

**What runs**
4. Which ad types are live: Sponsored Products, Brands, Display, Television, DSP
5. Is AMC switched on, and is Flexible Shopping Insights switched on
6. Who runs the ads — them, an agency, a tool, a mix

**The money**
7. Currency, and how many decimal places it displays at
8. Gross margin, even approximately, and whether it differs much by product
9. Is there a target ACoS or TACoS, and where did that number come from

**The people**
10. Who signs things off, and what they look at first in a report

Question 9 matters more than it looks. A target ACoS that nobody can source is
usually inherited, and every optimisation decision is being made against it.

---

## Step 2 — verify what you can, do not just transcribe

Anything checkable against a file, check. If they have given you an export:

- do the ad types they named match what appears in the data
- does the currency in the file match what they said
- are the hero ASINs actually the revenue leaders, or is that belief out of date

**Where the file and the person disagree, record both.** Do not quietly take the
file's side. A mismatch is itself worth knowing — it usually means the belief is
a year old, and that belief is driving decisions.

---

## Step 3 — write `profile.md`

```markdown
# <Brand> — account profile
Last updated: <date> · by: <who>

## What is sold
Marketplaces · Seller or Vendor · ASIN count · the few that carry revenue

## What runs
Ad types live · AMC yes/no · FSI yes/no and from what date · who operates

## Money
Currency and decimals · gross margin · target ACoS/TACoS and **where it came from**

## People
Who signs off · what they open first

## Known unknowns
<!-- Anything asked and not answered. This list is the point: it is what the
     brain does not know, written down, so nobody mistakes silence for zero. -->

## Disagreements
<!-- Where the person and the data said different things, both versions and the date. -->
```

**FSI needs its switch-on date, not just yes or no.** It only collects from the
day it is enabled, so any FSI query before that date returns nothing and the
reason is not obvious from the output.

---

## Step 4 — confirm and hand off

Three lines: file written, the most consequential thing you learned, and the
biggest item under Known unknowns. Offer `amz-timeline` next, because an empty
timeline is the most common reason a later answer goes wrong.

---

## Failure modes

- **They do not know their margin.** Very common. Write "unknown" and put it at
  the top of Known unknowns. Never estimate a margin — every break-even
  calculation downstream inherits it, and a guessed margin produces a confident
  wrong target ACoS.
- **They give a target ACoS with no source.** Record it as `target: 25% ·
  source: unknown`. That phrasing has started more useful conversations than any
  analysis.
- **"We sell everywhere."** Push for the list. Marketplace matters for currency,
  for data availability and for which caveats apply.
- **They want to skip the people questions as irrelevant.** Who opens the report
  and what they look at first decides what the brain should surface. Ask once
  more, then move on and mark it unknown.
- **The account changed hands recently.** Then most answers are inherited rather
  than known. Mark the whole profile `inherited: true` and re-verify the money
  section against a file before anything is built on it.

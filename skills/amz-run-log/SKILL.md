---
name: amz-run-log
description: >
  Record a data pull so the number can be explained three months later — what was
  run, over exactly which window, what came back, what was blank, and what the
  coverage was. Makes two conflicting figures explicable instead of alarming. Use
  when someone says "log this run", "I just pulled a report", "record this
  query", "save this export", "why do these two numbers disagree", or hands over
  a fresh export to work from.
---

# Run log

One file per pull. The thing that turns "these two numbers disagree" from a
crisis into a two-minute look at two windows.

**Read `CLAUDE.md` in the brain folder first.**

---

## Step 1 — capture the window exactly

The window is the single most common reason two figures disagree, and the most
common thing nobody writes down.

- start and end date, as actually submitted, not as intended
- whether the end date falls inside the ~14-day attribution lag
- whether the last month in the range is **complete** — a window ending the 20th
  contains a partial month, and any per-month average silently includes it
- which table or report, by its real name

**If the end date is inside the lag, say so now**, in the conversation, not just
in the file. The figure will grow after it is quoted, and whoever quotes it
should know before they do.

---

## Step 2 — read what came back, including what did not

Record all of it:

- row count
- **blank cells, and in which columns** — a blank is withheld, never zero
- any row where every column is empty, which AMC does return
- whether a pooled or below-floor bucket appears, and how many it holds
- the headline figures as read, not rounded

**Coverage is a first-class number.** "99.3% of buyers fell into a named route"
belongs in the log next to the finding, because a change in coverage between two
runs explains a change in the headline that has nothing to do with performance.

---

## Step 3 — write `runs/<date>-<slug>.md`

```markdown
# <what was run>
run: <date and time>  ·  by: <who>
source: <table or report name>
window: <start> to <end>   complete months: <yes/no>   inside lag: <yes/no>

## Result
rows: <n>
coverage: <what share of the universe this covers, and of what>
headline: <the figures, as read>

## Blanks and pooling
<column: n blank> · <pooled bucket: n> · <fully blank rows: n>
(blank = withheld, never zero)

## What this run can be used for
<one line>

## What it cannot
<one line — the honest limit, e.g. "ends inside the lag, do not quote as final">
```

That last pair of lines is what makes the file worth keeping. A run log without
them is a receipt; with them it is a decision aid.

---

## Step 4 — compare to the last run of the same thing

Look in `runs/` for the previous run of the same query. If there is one, check
four things and report any that moved:

1. window length — are you comparing 90 days to 60
2. coverage — did the named share change
3. blank counts — did a column start being suppressed
4. the headline

**If the headline moved and coverage moved too, say the coverage first.** That
is usually the explanation, and leading with the headline sends people hunting
for a performance story that is not there.

Then check `timeline.md` for anything inside the window.

---

## Failure modes

- **They do not remember the exact window.** Get it from the export — most carry
  it in a header row or in the filename. If it genuinely cannot be recovered,
  record `window: unknown` and mark the run not comparable. Do not guess.
- **Two runs of the same window differ slightly.** Normal. AMC is not
  reproducible to the digit. Record both and move on; do not go bug-hunting over
  a fraction of a percent.
- **A column is entirely blank.** That is a threshold, not a broken export. Note
  which column and at what grain, and add it to `caveats.md` if it recurs.
- **They want to log a number from a dashboard with no export.** Allowed, but
  record `source: dashboard screenshot` and `window: as displayed`. It will not
  be reproducible and the file should say so.

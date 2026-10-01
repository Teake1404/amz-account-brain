#!/usr/bin/env node
/**
 * Integrity check for an account brain.
 *
 * A brain decays quietly: a finding loses its falsifier, a run loses its window,
 * an inferred timeline entry gets cited as fact. None of that throws an error —
 * the folder still looks fine. This reads it and says what has gone soft.
 *
 *   node lib/brain-check.mjs brains/<account>
 *
 * Exit 0 clean, 1 if anything failed. No dependencies.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2];
if (!root || !existsSync(root)) {
  console.error("usage: node lib/brain-check.mjs brains/<account>");
  process.exit(2);
}

const fail = [];
const warn = [];
const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const ls = (d) =>
  existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".md")).sort() : [];

// ---- structure ------------------------------------------------------------
for (const f of ["CLAUDE.md", "profile.md", "caveats.md", "timeline.md"]) {
  if (!read(join(root, f))) fail.push(`missing ${f} — run amz-brain-setup`);
}

// ---- runs -----------------------------------------------------------------
const runsDir = join(root, "runs");
const runs = ls(runsDir);
if (!runs.length) warn.push("no runs logged yet — findings will have nothing to cite");

for (const f of runs) {
  const t = read(join(runsDir, f));
  // A run without a window cannot be compared to anything, which is the whole
  // reason runs are logged.
  if (!/^window:/m.test(t)) fail.push(`runs/${f} — no window line`);
  if (!/^source:/m.test(t)) fail.push(`runs/${f} — no source line`);
  if (!/cannot/i.test(t)) warn.push(`runs/${f} — no "what it cannot be used for"`);
  if (/inside lag:\s*yes/i.test(t)) warn.push(`runs/${f} — window ends inside the attribution lag`);
}

// ---- findings -------------------------------------------------------------
const findDir = join(root, "findings");
const findings = ls(findDir);

for (const f of findings) {
  const t = read(join(findDir, f));

  // The falsifier is the point of a finding. Treat its absence as a failure.
  const fals = t.match(/##\s*Falsified by\s*\n([\s\S]*?)(\n##|$)/i);
  if (!fals || !fals[1].trim()) fail.push(`findings/${f} — no falsifier`);
  else if (fals[1].trim().length < 40)
    warn.push(`findings/${f} — falsifier looks like a shrug ("${fals[1].trim().slice(0, 40)}…")`);

  // Evidence must point at a run that exists, or say plainly it is a belief.
  const ev = t.match(/evidence:\s*(\S+)/i);
  if (!ev) fail.push(`findings/${f} — no evidence line`);
  else if (!/none/i.test(ev[1])) {
    const cited = ev[1].replace(/^runs\//, "");
    if (!runs.includes(cited)) fail.push(`findings/${f} — cites runs/${cited}, which does not exist`);
  }

  if (!/denominator:/i.test(t)) warn.push(`findings/${f} — no denominator`);

  // Causal language without a holdout is the error this whole pack exists for.
  if (/\b(drove|caused|generated|proved)\b/i.test(t) && !/holdout/i.test(t))
    fail.push(`findings/${f} — causal verb with no holdout mentioned`);

  // A finding older than 180 days that nothing supersedes is probably stale.
  const d = t.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m);
  if (d && !/supersede/i.test(t)) {
    const age = (Date.now() - Date.parse(d[1])) / 864e5;
    if (age > 180) warn.push(`findings/${f} — ${Math.round(age)} days old, never revisited`);
  }
}

// ---- timeline -------------------------------------------------------------
const tl = read(join(root, "timeline.md")) || "";
const entries = [...tl.matchAll(/^##\s+(\d{4}-\d{2}-\d{2})/gm)];
if (!entries.length)
  warn.push("timeline.md is empty — the brain cannot rule out supply or price for any question");

for (const block of tl.split(/^##\s+/m).slice(1)) {
  const head = block.split("\n")[0].trim();
  if (!/confidence:/i.test(block)) warn.push(`timeline "${head}" — no confidence level`);
}

// An inferred event cited by a finding is the quiet way a brain starts lying.
const inferred = [...tl.matchAll(/^##\s+(\d{4}-\d{2}-\d{2})[^\n]*\n[\s\S]*?confidence:\s*inferred/gim)]
  .map((m) => m[1]);
for (const date of inferred) {
  const citedBy = findings.filter((f) => read(join(findDir, f)).includes(date));
  if (citedBy.length)
    warn.push(`timeline ${date} is "inferred" but cited by ${citedBy.length} finding(s) — confirm or downgrade`);
}

// ---- report ---------------------------------------------------------------
const name = root.replace(/\/$/, "").split("/").pop();
console.log(`\nbrain-check  ${name}`);
console.log(`  ${runs.length} runs · ${findings.length} findings · ${entries.length} timeline entries\n`);

for (const w of warn) console.log(`  warn  ${w}`);
for (const f of fail) console.log(`  FAIL  ${f}`);

if (!warn.length && !fail.length) console.log("  clean\n");
else console.log(`\n  ${fail.length} failed, ${warn.length} warnings\n`);

process.exit(fail.length ? 1 : 0);

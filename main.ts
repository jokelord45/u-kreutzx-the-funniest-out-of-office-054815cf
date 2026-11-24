// The Funniest Out-of-Office — make.fun entry (program/v1).
// Writes one out-of-office auto-reply to /output/entry.txt.
//
// Revised from draft A after a read-aloud pass: "which is this
// auto-reply" spent four words saying what an appositive says in two,
// and the tighter clause makes the final "already quit" hit harder.
// Final line (one line, <= 140 chars):
//   "Out of office until Monday. I left detailed instructions for my
//    replacement, this auto-reply, and it has already quit."
// The appositive also sharpens the joke's logic: the instructions were
// left FOR the replacement, and the replacement IS the message reading
// them to you — it quit before it even started.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "Out of office until Monday. I left detailed instructions for my replacement, this auto-reply, and it has already quit.";

const LINE = REPLY.trim().replace(/\s+/g, " ");
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 140) {
  throw new Error(`Reply must be 1-140 characters, got ${codePoints}.`);
}
if (LINE.includes("\n")) {
  throw new Error("Reply must be a single line.");
}

// The grader runs this in a sandbox with /output mounted; allow an
// override so the same file can be tested locally without root.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote ${codePoints} chars to ${join(outDir, "entry.txt")}`);
console.log(LINE);

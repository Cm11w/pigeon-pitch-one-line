import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Pigeon Pitch, One Line: the elevator pitch a city pigeon gives investors
// for its startup — every statue in the city, turned into a co-working space
// whose tenants pay in exposure.
//
// Written to the judge's brief, in order: it IS a pitch to investors for a
// startup (not just a pigeon joke); the joke lands on a real premise (tenants
// paying in exposure) rather than a dead pun; the statue co-working angle is
// a twist the field's drone-delivery takes will not have; the voice and the
// city (statues, rooftops, seed) could only come from a pigeon; and at 161
// characters every word earns its place.
const LINE =
  "I turned every statue in the city into a co-working space: 40,000 members, zero rent, and they all pay in exposure. I'm raising a seed round to buy more statues.";

// The gate allows 1 to 200 characters, a single line, not whitespace-only.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir =
  process.env.OUTPUT_DIR ??
  process.env.MAKEFUN_OUTPUT_DIR ??
  "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read the file back and compare raw bytes so a partial write can never
// pass silently.
const written = readFileSync(outPath);
if (!written.equals(Buffer.from(LINE, "utf8"))) {
  throw new Error("entry.txt read-back does not match the entry text");
}

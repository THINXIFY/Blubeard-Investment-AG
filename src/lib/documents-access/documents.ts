import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

/** Resend allows 40 MB per message after base64 encoding (~33% larger), so the raw total stays below. */
const MAX_TOTAL_BYTES = 28 * 1024 * 1024;

/** Ships with the project, outside `public/`, so the website never serves these files. */
const bundledDir = () => path.resolve(path.join(/*turbopackIgnore: true*/ process.cwd(), "private", "documents"));

/** DOCUMENTS_DIR first, then the bundled folder; the first folder that contains PDFs wins. */
const candidateDirs = () => {
  const override = process.env.DOCUMENTS_DIR?.trim();
  return [...new Set([...(override ? [path.resolve(override)] : []), bundledDir()])];
};

type PrivateDocument = { filename: string; bytes: number };

async function listIn(dir: string): Promise<PrivateDocument[]> {
  let names: string[];
  try {
    names = await readdir(/*turbopackIgnore: true*/ dir);
  } catch {
    return [];
  }
  const out: PrivateDocument[] = [];
  for (const name of names.sort()) {
    if (name.startsWith(".") || path.extname(name).toLowerCase() !== ".pdf" || name !== path.basename(name)) continue;
    try {
      const s = await stat(/*turbopackIgnore: true*/ path.join(dir, name));
      if (s.isFile() && s.size > 0) out.push({ filename: name, bytes: s.size });
    } catch {
      /* Unreadable file: skipped. */
    }
  }
  return out;
}

async function resolveDocuments() {
  for (const dir of candidateDirs()) {
    const docs = await listIn(dir);
    if (docs.length > 0) return { dir, docs };
  }
  return { dir: bundledDir(), docs: [] as PrivateDocument[] };
}

const withinLimit = (docs: PrivateDocument[]) =>
  docs.length > 0 && docs.reduce((n, d) => n + d.bytes, 0) <= MAX_TOTAL_BYTES;

export async function documentsAvailable() {
  return withinLimit((await resolveDocuments()).docs);
}

export async function loadDocuments() {
  const { dir, docs } = await resolveDocuments();
  if (!withinLimit(docs)) throw new Error("documents_unavailable");
  const loaded = await Promise.all(
    docs.map(async (d) => ({
      filename: d.filename,
      content: await readFile(/*turbopackIgnore: true*/ path.join(dir, d.filename)),
    })),
  );
  // A file that changed or vanished between listing and reading must never produce a partial delivery.
  if (loaded.some((d) => d.content.byteLength === 0)) throw new Error("documents_unavailable");
  return loaded;
}

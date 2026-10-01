// One-off tool: `npm i -D canvas pdfjs-dist@3.11.174` before running.
// Not a project dependency — images are committed to public/images/pdf already.
import { createCanvas } from "canvas";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfjs = await import("pdfjs-dist/legacy/build/pdf.js");

const PDF_PATH = "D:/int/JIMS 2026 - Exhibitor Booklet.pdf";
const OUT_DIR = path.join(__dirname, "../public/images/pdf");
mkdirSync(OUT_DIR, { recursive: true });

const PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    return { canvas, context };
  }
  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }
  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

const data = new Uint8Array(readFileSync(PDF_PATH));
const doc = await pdfjs.getDocument({
  data,
  canvasFactory: new NodeCanvasFactory(),
  disableFontFace: true,
}).promise;

for (const pageNum of PAGES) {
  const page = await doc.getPage(pageNum);
  const scale = 2.5;
  const viewport = page.getViewport({ scale });

  const canvasFactory = new NodeCanvasFactory();
  const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);

  await page.render({
    canvasContext: canvasAndContext.context,
    viewport,
    canvasFactory,
  }).promise;

  const outPath = path.join(OUT_DIR, `page-${String(pageNum).padStart(2, "0")}.png`);
  writeFileSync(outPath, canvasAndContext.canvas.toBuffer("image/png"));
  console.log(`Rendered page ${pageNum} -> ${outPath}`);
}

console.log("Done.");

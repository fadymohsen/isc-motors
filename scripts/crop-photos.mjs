// One-off tool, two-step pipeline:
//   1. `npm i -D canvas pdfjs-dist@3.11.174` then `node scripts/extract-pdf-images.mjs`
//      to regenerate public/images/pdf/page-NN.png from the source PDF.
//   2. `npm i -D sharp` then run this script.
// Crops clean, text-free photo regions out of those full-slide renders,
// since every slide has its own headline/logo/labels baked in — using a
// full slide directly (even with CSS object-position) risks that text
// bleeding through depending on the container's aspect ratio.
// The cropped output in public/images/photos is what's actually committed;
// public/images/pdf is NOT committed (regenerate it if you need to re-crop).
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "../public/images/pdf");
const OUT = path.join(__dirname, "../public/images/photos");
mkdirSync(OUT, { recursive: true });

const crops = [
  { src: "page-01.png", out: "hero-car.jpg", rect: [1200, 0, 1200, 800] },
  { src: "page-02.png", out: "about-skyline.jpg", rect: [1650, 0, 750, 820] },
  { src: "page-06.png", out: "press-day.jpg", rect: [300, 210, 850, 440] },
  { src: "page-08.png", out: "vip-night.jpg", rect: [300, 210, 850, 440] },
  { src: "page-10.png", out: "visitor-days.jpg", rect: [300, 210, 850, 440] },
  { src: "page-15.png", out: "custom-stand.jpg", rect: [1480, 260, 920, 560] },
  { src: "page-16.png", out: "plug-play.jpg", rect: [1650, 470, 380, 380] },
  { src: "page-17.png", out: "thematic.jpg", rect: [1750, 280, 650, 670] },
  { src: "page-05.png", out: "about-banner.jpg", rect: [1080, 0, 1320, 420] },
  { src: "page-11.png", out: "new-car.jpg", rect: [130, 580, 490, 230] },
  { src: "page-11.png", out: "live-action.jpg", rect: [600, 700, 390, 260] },
  { src: "page-11.png", out: "test-drive.jpg", rect: [1650, 700, 300, 260] },
];

for (const c of crops) {
  const [left, top, width, height] = c.rect;
  await sharp(path.join(SRC, c.src))
    .extract({ left, top, width, height })
    .jpeg({ quality: 88 })
    .toFile(path.join(OUT, c.out));
  console.log(`Cropped ${c.src} -> ${c.out}`);
}

console.log("Done.");

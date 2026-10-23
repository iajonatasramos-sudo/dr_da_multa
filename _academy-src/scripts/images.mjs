// Gera as versões AVIF/WebP usadas no site a partir dos originais em assets-src/.
// Rode `npm run images` depois de trocar a capa ou a foto do Jason.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = new URL("../assets-src/", import.meta.url);
const OUT = new URL("../public/img/", import.meta.url);
await mkdir(OUT, { recursive: true });

const jobs = [
  // Capa do e-book: 3:4
  { src: "capa-ebook.png", name: "capa-ebook", widths: [360, 720], ratio: 4 / 3 },
  // Foto do autor: recorte retrato 4:5, centrado no rosto
  { src: "jason.png", name: "jason", widths: [420, 840], ratio: 5 / 4, position: "north" },
  // Fundo do hero da landing do e-book (16:9 no desktop, 9:16 no celular), sem recorte
  { src: "hero-desktop.png", name: "hero-desktop", widths: [960, 1672], ratio: 941 / 1672 },
  { src: "hero-mobile.png", name: "hero-mobile", widths: [480, 941], ratio: 1672 / 941 },
];

for (const job of jobs) {
  for (const w of job.widths) {
    const h = Math.round(w * job.ratio);
    const base = sharp(new URL(job.src, SRC).pathname).resize(w, h, { fit: "cover", position: job.position ?? "centre" });
    await base.clone().avif({ quality: 55 }).toFile(new URL(`${job.name}-${w}.avif`, OUT).pathname);
    await base.clone().webp({ quality: 78 }).toFile(new URL(`${job.name}-${w}.webp`, OUT).pathname);
    console.log(`${job.name}-${w} (${w}x${h})`);
  }
}

// Ícone para iOS a partir do SVG do selo
await sharp(new URL("../src/app/icon.svg", import.meta.url).pathname)
  .resize(180, 180)
  .png()
  .toFile(new URL("../src/app/apple-icon.png", import.meta.url).pathname);
console.log("apple-icon.png");

// Gera as imagens de Open Graph (1200×630) a partir dos modelos HTML em scripts/.
//   node scripts/og.mjs           → public/img/og.png (e-book)
//   node scripts/og.mjs imersao   → public/img/og-imersao.png
// Requer Playwright: npx playwright install chromium (uma vez).
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const which = process.argv[2] === "imersao" ? "imersao" : "ebook";
const template = which === "imersao" ? "./og-imersao.html" : "./og.html";
const output = which === "imersao" ? "../public/img/og-imersao.png" : "../public/img/og.png";

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(new URL(template, import.meta.url).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: fileURLToPath(new URL(output, import.meta.url)) });
await browser.close();
console.log(output.replace("../", ""));

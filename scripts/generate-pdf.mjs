#!/usr/bin/env node
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import path from "path";

const url = process.argv[2] || "http://localhost:3099";
const outDir = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(outDir, "..", "samsoath-homepage.pdf");

console.log(`Generating PDF from: ${url}`);
console.log(`Output: ${outPath}`);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// Set the preview cookie so middleware doesn't redirect to login
await page.setCookie({
  name: "site-preview",
  value: "granted",
  domain: new URL(url).hostname,
  path: "/",
});

// Set a wide viewport so it renders desktop layout
await page.setViewport({ width: 1280, height: 900 });

await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

// Wait for images, map tiles, and dynamic content to load
await new Promise((r) => setTimeout(r, 5000));

// Hide nav and footer for cleaner print, ensure backgrounds render
await page.addStyleTag({
  content: `
    nav, footer, .activity-ticker { display: none !important; }
    body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    section, [class*="SectionWrapper"] { break-inside: avoid; page-break-inside: avoid; }
  `,
});

await page.pdf({
  path: outPath,
  format: "Letter",
  printBackground: true,
  margin: { top: "0.3in", bottom: "0.3in", left: "0.3in", right: "0.3in" },
});

await browser.close();
console.log(`PDF saved to: ${outPath}`);

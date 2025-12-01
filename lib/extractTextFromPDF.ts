import "../lib/polyfills"; // Ensure polyfills are loaded first
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import path from "path";

// Set worker to the installed worker file
// We use a relative path resolved from the current working directory (project root)
pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(process.cwd(), "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs");

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    // Load the PDF document
    // We need to convert Buffer to Uint8Array for pdfjs-dist
    const data = new Uint8Array(buffer);

    const loadingTask = pdfjsLib.getDocument({
        data,
        useSystemFonts: true, // Helps with font loading in Node
        disableFontFace: true, // Disable font face loading
    });

    const doc = await loadingTask.promise;
    let fullText = "";

    // Iterate through all pages
    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent();

        // Extract text items and join them
        const pageText = textContent.items
            .map((item: any) => item.str)
            .join(" ");

        fullText += pageText + "\n\n";
    }

    return fullText.trim();
}

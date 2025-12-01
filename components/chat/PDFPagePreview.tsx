"use client";

import { useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist";

// Set worker locally
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

interface Props {
    pdfUrl: string;
    pageNumber: number;
}

export default function PDFPagePreview({ pdfUrl, pageNumber }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const renderPage = async () => {
            const pdf = await pdfjs.getDocument(pdfUrl).promise;
            const page = await pdf.getPage(pageNumber);

            const viewport = page.getViewport({ scale: 1 });
            const canvas = canvasRef.current;
            if (!canvas) return;

            const context = canvas.getContext("2d")!;
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
                canvasContext: context,
                viewport,
                canvas,
            }).promise;
        };

        renderPage();
    }, [pdfUrl, pageNumber]);

    return <canvas ref={canvasRef} className="rounded-lg shadow" />;
}

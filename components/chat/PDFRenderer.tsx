"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

// Load worker from local file (ROBUST FIX)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

// Render a single PDF Page
function PDFPage({ pdfDocument, pageNumber, scale }: { pdfDocument: pdfjs.PDFDocumentProxy; pageNumber: number; scale: number }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const renderTaskRef = useRef<pdfjs.RenderTask | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const renderPage = async () => {
            try {
                // Cancel previous render task if it exists
                if (renderTaskRef.current) {
                    renderTaskRef.current.cancel();
                }

                const page = await pdfDocument.getPage(pageNumber);

                // If effect was cleaned up (cancelled) while awaiting getPage, stop here
                if (isCancelled) return;

                const viewport = page.getViewport({ scale });
                const canvas = canvasRef.current;
                if (!canvas) return;

                const ctx = canvas.getContext("2d")!;
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderTask = page.render({
                    canvasContext: ctx,
                    canvas,
                    viewport,
                });

                renderTaskRef.current = renderTask;

                await renderTask.promise;
                renderTaskRef.current = null; // Clear task after completion
            } catch (err: any) {
                // Ignore cancellation errors
                if (err.name === "RenderingCancelledException" || isCancelled) {
                    return;
                }
                console.error(`Error rendering page ${pageNumber}:`, err);
                setError(err.message || "Failed to render page");
            }
        };

        renderPage();

        // Cleanup: cancel render on unmount or dependency change
        return () => {
            isCancelled = true;
            if (renderTaskRef.current) {
                renderTaskRef.current.cancel();
            }
        };
    }, [pdfDocument, pageNumber, scale]);

    if (error) return (
        <div className="flex items-center justify-center h-full p-4 bg-red-50 rounded border border-red-100">
            <div className="text-center">
                <p className="text-red-500 font-medium mb-1">Error rendering page {pageNumber}</p>
                <p className="text-red-400 text-xs">{error}</p>
            </div>
        </div>
    );

    return <canvas ref={canvasRef} className="rounded shadow-lg bg-white mx-auto" />;
}

// Render Paginated PDF
export function PDFPages({ pdfUrl }: { pdfUrl: string }) {
    const [pdfDocument, setPdfDocument] = useState<pdfjs.PDFDocumentProxy | null>(null);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log(`Loading PDF from: ${pdfUrl}`);

                const loadingTask = pdfjs.getDocument({
                    url: pdfUrl,
                    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                    cMapPacked: true,
                });
                const pdf = await loadingTask.promise;

                setPdfDocument(pdf);
                setNumPages(pdf.numPages);
                setCurrentPage(1); // Reset to first page on new PDF
            } catch (err: any) {
                console.error("Error loading PDF:", err);
                setError(err.message || "Failed to load PDF");
            } finally {
                setLoading(false);
            }
        };

        loadPdf();
    }, [pdfUrl]);

    const changePage = (offset: number) => {
        setCurrentPage((prev) => Math.min(Math.max(prev + offset, 1), numPages));
    };

    const changeScale = (delta: number) => {
        setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 3.0));
    };

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3a00a5]"></div>
            <span className="ml-2 text-gray-500">Loading PDF...</span>
        </div>
    );

    if (error) return (
        <div className="p-4 text-red-500 bg-red-50 rounded-lg border border-red-200 m-4">
            <h3 className="font-semibold">Error Loading PDF</h3>
            <p className="text-sm mt-1">{error}</p>
        </div>
    );

    if (!pdfDocument) return null;

    return (
        <div className="flex flex-col h-full bg-gray-100 rounded-lg overflow-hidden">
            {/* Controls Toolbar */}
            <div className="flex items-center justify-between p-2 bg-white border-b shadow-sm z-10">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => changePage(-1)}
                        disabled={currentPage <= 1}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Previous Page"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                        Page {currentPage} of {numPages}
                    </span>
                    <button
                        onClick={() => changePage(1)}
                        disabled={currentPage >= numPages}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Next Page"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => changeScale(-0.1)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Zoom Out"
                    >
                        <ZoomOut className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="text-xs text-gray-500 w-12 text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        onClick={() => changeScale(0.1)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Zoom In"
                    >
                        <ZoomIn className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Scrollable Page Area */}
            <div className="flex-1 overflow-auto p-4 flex items-start justify-center bg-gray-100">
                <PDFPage
                    pdfDocument={pdfDocument}
                    pageNumber={currentPage}
                    scale={scale}
                />
            </div>
        </div>
    );
}

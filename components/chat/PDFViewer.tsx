"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

interface PDFViewerProps {
    pdfFile: File | null;
    pdfName: string;
    pdfUrl: string;
    isUploading: boolean;
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFileRemove: () => void;
    onFileSelect: (file: File) => void;
}

// 🔥 Dynamically load PDFPages (browser-only)
const PDFPages = dynamic(() => import("./PDFRenderer").then((mod) => mod.PDFPages), {
    ssr: false,
    loading: () => <p className="text-gray-500 p-4">Loading PDF...</p>,
});

export function PDFViewer({
    pdfFile,
    pdfName,
    pdfUrl,
    isUploading,
    onFileUpload,
    onFileRemove,
    onFileSelect,
}: PDFViewerProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent): void => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent): void => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) onFileSelect(file);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">PDF Viewer</h2>
                {pdfFile && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {pdfName}
                        </span>
                        <button
                            onClick={onFileRemove}
                            className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>

            {/* Upload or Pages */}
            <div
                className={`flex-1 border-2 border-dashed border-gray-300 rounded-lg transition-colors bg-gray-50 ${!pdfFile ? "hover:border-[#3a00a5] cursor-pointer" : ""
                    }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => !pdfFile && fileInputRef.current?.click()}
            >
                {!pdfFile ? (
                    // 🚀 Upload Box
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📄</span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {isUploading ? "Uploading..." : "Upload your PDF"}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4">
                            {isUploading
                                ? "Uploading your PDF, wait broski..."
                                : "Drag & drop or click to upload your PDF"}
                        </p>

                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={onFileUpload}
                            accept="application/pdf"
                            className="hidden"
                        />

                        {!isUploading && (
                            <button className="bg-[#3a00a5] hover:bg-[#2d0080] text-white px-6 py-2 rounded-lg font-medium transition-all">
                                Choose PDF
                            </button>
                        )}
                    </div>
                ) : (
                    // 📄 REAL PDF Pages (dynamic browser-only)
                    <PDFPages pdfUrl={pdfUrl} />
                )}
            </div>
        </div>
    );
}

import { useRef } from "react";

interface PDFViewerProps {
    pdfFile: File | null;
    pdfName: string;
    pdfUrl: string;
    isUploading: boolean;
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFileRemove: () => void;
    onFileSelect: (file: File) => void;
}

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
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            onFileSelect(file);
        }
    };

    return (
        <div className="flex flex-col h-full">
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

            {/* PDF Upload/View Area */}
            <div
                className={`flex-1 border-2 border-dashed border-gray-300 rounded-lg ${!pdfFile ? "hover:border-[#3a00a5] cursor-pointer" : ""
                    } transition-colors overflow-hidden bg-gray-50`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => !pdfFile && fileInputRef.current?.click()}
            >
                {!pdfFile ? (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📄</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {isUploading
                                ? "Uploading... (slowly, of course)"
                                : "Upload your PDF"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            {isUploading
                                ? "I'm uploading your PDF at dial-up speeds. Please hold..."
                                : "Drag & drop or click to upload. I promise I'll try to read it... eventually."}
                        </p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onFileUpload}
                            accept=".pdf"
                            className="hidden"
                            disabled={isUploading}
                        />
                        {!isUploading && (
                            <button
                                type="button"
                                className="bg-[#3a00a5] hover:bg-[#2d0080] text-white px-6 py-2 rounded-lg font-medium transition-all"
                            >
                                Choose PDF
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="h-full flex flex-col">
                        {/* PDF Preview */}
                        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-auto">
                            <div className="w-full h-full flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📄</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2 text-center">
                                    {pdfName}
                                </h4>
                                <p className="text-gray-600 mb-4 text-center">
                                    PDF successfully uploaded!
                                </p>

                                {/* PDF Preview with Download Option */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-sm w-full">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                            <span className="text-lg">📄</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {pdfName}
                                            </p>
                                            <p className="text-xs text-gray-500">PDF Document</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <a
                                            href={pdfUrl}
                                            download={pdfName}
                                            className="flex-1 bg-[#3a00a5] hover:bg-[#2d0080] text-white text-center py-2 px-3 rounded text-sm transition-colors"
                                        >
                                            Download
                                        </a>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(pdfUrl, "_blank");
                                            }}
                                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-3 rounded text-sm transition-colors"
                                        >
                                            Open
                                        </button>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 text-center mt-4">
                                    (In a production app, this would show
                                    <br />
                                    an actual PDF viewer with pages)
                                </p>
                            </div>
                        </div>

                        {/* PDF Info Footer */}
                        <div className="border-t border-gray-200 bg-white p-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Ready for slow questioning</span>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                    PDF Loaded
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

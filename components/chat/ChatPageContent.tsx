"use client";

import { useState } from "react";
import { Header } from "@/components/chat/Header";
import { BackgroundBlobs } from "@/components/chat/BackgroundBlobs";
import { PDFViewer } from "@/components/chat/PDFViewer";
import { ChatInterface } from "@/components/chat/ChatInterface";

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface ChatPageContentProps {
    userId: string;
}

export default function ChatPageContent({ userId }: ChatPageContentProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Welcome! Upload a PDF and I'll try to understand it... eventually. I'm slower than your Wi-Fi but more persistent.",
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfName, setPdfName] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [pdfUrl, setPdfUrl] = useState<string>("");

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            setMessages(prev => [...prev, {
                id: messages.length + 1,
                text: "That's not a PDF! Upload a real PDF broski.",
                isUser: false,
                timestamp: new Date(),
            }]);
            return;
        }

        setIsUploading(true);

        // 👉 Send to backend /api/upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Upload failed");
            }

            const cloudUrl = data.cloudinaryUrl || data.secure_url || data.url;

            // 👉 Store in React state
            setPdfFile(file);
            setPdfName(file.name);
            setPdfUrl(cloudUrl);

            setIsUploading(false);

            // Success message
            setMessages(prev => [...prev, {
                id: messages.length + 1,
                text: `PDF uploaded to Cloudinary: "${file.name}". Ready to generate embeddings broski.`,
                isUser: false,
                timestamp: new Date(),
            }]);
        } catch (error: any) {
            setMessages(prev => [...prev, {
                id: messages.length + 1,
                text: `Upload failed: ${error.message}`,
                isUser: false,
                timestamp: new Date(),
            }]);
            setIsUploading(false);
        }
    };


    const handleFileSelect = (file: File): void => {
        if (file && file.type === "application/pdf") {
            // Re-use the upload logic for drag-and-drop if possible, or just mock it for now
            // But ideally we should upload it.
            // For now, let's just trigger the upload manually or warn the user.
            // Since handleFileSelect is likely from a drag-drop component, we should probably call handleFileUpload logic.
            // But handleFileUpload expects an event.
            // Let's just call the upload logic directly.

            // We'll just set it for preview and trigger upload
            setIsUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", userId);

            fetch("/api/upload", { method: "POST", body: formData })
                .then(res => res.json())
                .then(data => {
                    if (data.error) throw new Error(data.error);
                    const cloudUrl = data.cloudinaryUrl;
                    setPdfFile(file);
                    setPdfName(file.name);
                    setPdfUrl(cloudUrl);
                    setIsUploading(false);
                    setMessages(prev => [...prev, {
                        id: messages.length + 1,
                        text: `Great! I've uploaded "${file.name}". Ask me anything about this PDF.`,
                        isUser: false,
                        timestamp: new Date(),
                    }]);
                })
                .catch(err => {
                    setIsUploading(false);
                    setMessages(prev => [...prev, {
                        id: messages.length + 1,
                        text: `Upload failed: ${err.message}`,
                        isUser: false,
                        timestamp: new Date(),
                    }]);
                });

        } else if (file) {
            const errorMessage: Message = {
                id: messages.length + 1,
                text: "That's not a PDF! I only understand PDFs... and even that takes me a while.",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    const handleRemovePdf = (): void => {
        if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl);
        }
        setPdfFile(null);
        setPdfName("");
        setPdfUrl("");
        const removeMessage: Message = {
            id: messages.length + 1,
            text: "PDF removed. I wasn't really using it anyway...",
            isUser: false,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, removeMessage]);
    };

    const handleSendMessage = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        if (!pdfFile && !pdfUrl) {
            const noPdfMessage: Message = {
                id: messages.length + 1,
                text: "I'd love to chat, but you need to upload a PDF first.",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, noPdfMessage]);
            return;
        }

        const userMessage: Message = {
            id: messages.length + 1,
            text: inputMessage,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, question: inputMessage }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to get answer");

            const botMessage: Message = {
                id: messages.length + 2,
                text: data.answer,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error: any) {
            const errorMessage: Message = {
                id: messages.length + 2,
                text: `Error: ${error.message}`,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Main Content - 50/50 Split */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-4rem)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">

                    {/* Left Side - PDF Viewer */}
                    <PDFViewer
                        pdfFile={pdfFile}
                        pdfName={pdfName}
                        pdfUrl={pdfUrl}
                        isUploading={isUploading}
                        onFileUpload={handleFileUpload}
                        onFileRemove={handleRemovePdf}
                        onFileSelect={handleFileSelect}
                    />

                    {/* Right Side - Chat */}
                    <ChatInterface
                        messages={messages}
                        inputMessage={inputMessage}
                        setInputMessage={setInputMessage}
                        isLoading={isLoading}
                        pdfFile={pdfFile}
                        pdfName={pdfName}
                        onSendMessage={handleSendMessage}
                    />
                </div>
            </div>

            <BackgroundBlobs />
        </div>
    );
}

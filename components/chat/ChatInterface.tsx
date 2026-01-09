import { useRef, useEffect } from "react";

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface ChatInterfaceProps {
    messages: Message[];
    inputMessage: string;
    setInputMessage: (message: string) => void;
    isLoading: boolean;
    pdfFile: File | null;
    pdfName: string;
    onSendMessage: (e: React.FormEvent) => Promise<void>;
}

export function ChatInterface({
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    pdfFile,
    pdfName,
    onSendMessage,
}: ChatInterfaceProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTime = (date: Date): string => {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    return (
        <div className="flex flex-col h-full min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Chat with PDF</h2>
                {pdfFile && (
                    <span className="text-sm text-gray-500">
                        Ask about: <span className="font-medium">{pdfName}</span>
                    </span>
                )}
            </div>

            {/* Messages Container */}
            <div className="flex-1 min-h-0 overflow-y-auto mb-4 space-y-4 py-4 border border-gray-200 rounded-lg bg-white">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.isUser ? "justify-end" : "justify-start"
                            } px-4`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.isUser
                                ? "bg-[#3a00a5] text-white rounded-br-none"
                                : "bg-gray-100 text-gray-900 rounded-bl-none"
                                }`}
                        >
                            <div className="flex items-start gap-2">
                                {!message.isUser && (
                                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                        A
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <p className="text-sm whitespace-pre-wrap break-words">
                                        {message.text}
                                    </p>
                                    <p
                                        className={`text-xs mt-1 ${message.isUser ? "text-purple-200" : "text-gray-500"
                                            }`}
                                    >
                                        {formatTime(message.timestamp)}
                                    </p>
                                </div>
                                {message.isUser && (
                                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                        Y
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                    <div className="flex justify-start px-4">
                        <div className="max-w-[80%] rounded-2xl rounded-bl-none bg-gray-100 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-xs font-bold">
                                    A
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.1s" }}
                                        ></div>
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600">Reading PDF...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
                onSubmit={onSendMessage}
                className="border border-gray-200 rounded-lg bg-white p-4"
            >
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={
                            pdfFile
                                ? `Ask something about ${pdfName}... (I'll get to it eventually)`
                                : "Upload a PDF first to start chatting..."
                        }
                        className="flex-1 text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3a00a5] focus:ring-1 focus:ring-[#3a00a5] disabled:bg-gray-50"
                        disabled={isLoading || !pdfFile}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputMessage.trim() || !pdfFile}
                        className="bg-[#3a00a5] hover:bg-[#2d0080] text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                    {pdfFile
                        ? `AskPDF: Slow but PDF-icated • Currently chatting with: ${pdfName}`
                        : "No PDF uploaded • I'm waiting... patiently, of course"}
                </p>
            </form>
        </div>
    );
}

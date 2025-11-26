"use client";
import { useState } from "react";
import { Header } from "@/components/chat/Header";
import { BackgroundBlobs } from "@/components/chat/BackgroundBlobs";
import { PDFViewer } from "@/components/chat/PDFViewer";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

async function ChatPage() {
  const session = await auth();
  if (session?.user === null) {
    redirect("/signin");
  }
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setIsUploading(true);

      // Simulate slow upload (staying true to personality)
      setTimeout(() => {
        setPdfFile(file);
        setPdfName(file.name);

        // Create object URL for PDF preview
        const url = URL.createObjectURL(file);
        setPdfUrl(url);

        setIsUploading(false);

        // Add success message
        const successMessage: Message = {
          id: messages.length + 1,
          text: `Great! I've uploaded "${file.name}". Now I can barely read it. Ask me anything about this PDF... if you have the patience.`,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, successMessage]);
      }, 2000);
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

  const handleFileSelect = (file: File): void => {
    if (file && file.type === "application/pdf") {
      setIsUploading(true);

      setTimeout(() => {
        setPdfFile(file);
        setPdfName(file.name);

        const url = URL.createObjectURL(file);
        setPdfUrl(url);

        setIsUploading(false);

        const successMessage: Message = {
          id: messages.length + 1,
          text: `Great! I've uploaded "${file.name}". Now I can barely read it. Ask me anything about this PDF... if you have the patience.`,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, successMessage]);
      }, 2000);
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

    if (!pdfFile) {
      const noPdfMessage: Message = {
        id: messages.length + 1,
        text: "I'd love to chat, but you need to upload a PDF first. I'm not just a regular chatbot - I'm specifically designed to be slow with PDFs!",
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

    setTimeout(() => {
      const pdfResponses: string[] = [
        `Let me check the PDF... Oh wait, I'm still loading page 1 of "${pdfName}".`,
        "Scanning through the PDF... (I found some words! This is progress)",
        `Processing your question about "${pdfName}"... This might take a while, I read at dial-up speed.`,
        "Hmm, let me look that up in the PDF... *flips virtual pages slowly*",
        "Consulting the ancient PDF wisdom... (Translation: I'm loading the document)",
        `Searching "${pdfName}" for answers... Found the title page! Making progress...`,
      ];

      const randomResponse = pdfResponses[Math.floor(Math.random() * pdfResponses.length)];

      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000 + Math.random() * 3000);
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

export default ChatPage;
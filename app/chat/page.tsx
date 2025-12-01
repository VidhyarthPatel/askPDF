import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChatPageContent from "@/components/chat/ChatPageContent";

export default async function ChatPage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  return <ChatPageContent />;
}
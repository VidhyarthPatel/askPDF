import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChatPageContent from "@/components/chat/ChatPageContent";

export default async function ChatPage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  // Ensure we have a user ID. Fallback to email or throw if needed.
  const userId = session.user?.id || session.user?.email || "unknown-user";

  return <ChatPageContent userId={userId} />;
}
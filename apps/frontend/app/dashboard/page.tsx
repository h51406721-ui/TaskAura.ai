import dynamic from "next/dynamic";
import KeyboardNav from "../components/KeyboardNav";

const ChatWindow = dynamic(() => import("../components/ChatWindow"), { ssr: false });

export default function DashboardPage() {
  // For demo, use a static userId. Replace with real auth/user context in production.
  const userId = 1;
  return (
    <div className="h-[80vh]">
      <KeyboardNav selectors={["input", "button"]} />
      <ChatWindow userId={userId} />
    </div>
  );
}

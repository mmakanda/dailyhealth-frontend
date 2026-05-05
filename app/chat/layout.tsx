import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "AI Health Assistant",
  description: "Get instant answers about medicines, symptoms, and health advice from our 24/7 AI pharmacy assistant.",
};
export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

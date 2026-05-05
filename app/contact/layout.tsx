import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Daily Health Pharmacy in Bulawayo. Call, WhatsApp, or visit us at 90 Herbert Chitepo Street.",
};
export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

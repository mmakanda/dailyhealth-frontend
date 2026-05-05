import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Products",
  description: "Browse 800+ MCAZ-approved medicines and health products at Daily Health Pharmacy. Competitive prices, EcoCash accepted.",
};
export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

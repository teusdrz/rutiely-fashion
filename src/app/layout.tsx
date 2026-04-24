import type { Metadata } from "next";
import { Cormorant, DM_Sans, Julius_Sans_One } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/cart/CartDrawer";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const juliusSansOne = Julius_Sans_One({
  variable: "--font-julius",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rutiely Fashion",
  description: "Moda feminina com elegância e autenticidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${dmSans.variable} ${juliusSansOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../public/assets/style/globals.css";
import "../../public/assets/style/normalize.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const geistSans = localFont({
  src: "../../public/assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gerenciador de Despesas",
  description: "Gerencie suas despesas de forma prática e efetiva | Gerenciador de Despesas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <Header />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>

      <Footer />
    </html>
  );
}

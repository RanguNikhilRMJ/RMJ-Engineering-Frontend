import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:"RMJ Next Gen Digital Campus",
    template:"%s - RMJ Next Gen Digital Campus"
  },
  description: "RMJ Next Gen Digital Campus by RMJ IT SOLUTIONS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

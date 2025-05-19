import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./header";
import "./globals.css";
import Footer from "@/components/Footer";
import styles from "./layout.module.css";
import { ApolloWrapper } from "./ApolloWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Railway - Mike Hadley",
  description: "Railway - Mike Hadley",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${styles.layout}`}>
        <ApolloWrapper>
          <div className={styles.content}>
            <Header />
            {children}
          </div>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}

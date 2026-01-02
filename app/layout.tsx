import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fête de la Dépression - 25 Février",
  description: "Inscription à la fête du 25 février 2025 à 10h",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

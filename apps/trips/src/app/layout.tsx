import type { Metadata } from "next";
import { UserIdentityProvider } from "@/components/user-identity";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trip Planner",
  description: "Collaborative family trip planner — vote on sights, leave comments, plan together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <UserIdentityProvider>{children}</UserIdentityProvider>
      </body>
    </html>
  );
}

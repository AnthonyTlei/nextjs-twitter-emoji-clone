import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Twitter Emoji Clone",
  description: "Express your thoughts with emojis and emojis only!",
  manifest: "/manifest.json",
  icons: { apple: "/icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, height=device-height viewport-fit=cover"
          />
        </head>
        <body className={`font-sans ${inter.variable}`}>
          <main className="overflow-none flex h-screen justify-center">
            <div className="flex h-full w-full flex-col border-x border-slate-400 md:max-w-2xl">
              <TRPCReactProvider cookies={cookies().toString()}>
                <Toaster position="bottom-center" />
                {children}
              </TRPCReactProvider>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Twitter Emoji Clone",
  description: "Express your thoughts with emojis and emojis only!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
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

import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import Logo from "~/assets/logo.png";

export default function Home() {
  const { userId } = auth();
  if (userId) {
    redirect("/feed");
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <Image
        className="mb-5"
        src={Logo}
        width={150}
        height={150}
        alt="SecondBrain Logo"
      />
      <h1 className="text-xl">Welcome to twitter emoji only clone!</h1>
      <button className="border border-slate-400 p-1">
        <Link href="/feed">Get Started</Link>
      </button>
    </div>
  );
}

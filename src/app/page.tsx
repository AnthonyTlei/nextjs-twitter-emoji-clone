"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { UserButton, useUser } from "@clerk/nextjs";

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  if (!user) {
    return null;
  }

  return (
    <div className="flex w-full gap-3">
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: 56,
              height: 56,
            },
          },
        }}
      />
      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={false}
      />
    </div>
  );
};

export default function Home() {
  const getPosts = api.posts.getAll.useQuery();

  if (getPosts.error) {
    return <div>Error: {getPosts.error.message}</div>;
  }
  if (getPosts.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
        <div className="flex border-b border-slate-400 p-4">
          <CreatePostWizard />
        </div>
        <div className="flex flex-col">
          {getPosts.data?.map(({ post, author }) => (
            <div key={post.id} className="border-b border-slate-400 p-8">
              {post.content}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

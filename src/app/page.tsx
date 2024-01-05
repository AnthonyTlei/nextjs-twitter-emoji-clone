"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { UserButton, useUser } from "@clerk/nextjs";
import { PostView } from "./_components/post-view";
import { LoadingPage } from "./_components/loading";

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

const Feed = () => {
  const getPosts = api.posts.getAll.useQuery();

  if (getPosts.error) {
    return <div>Error: {getPosts.error.message}</div>;
  }

  if (getPosts.isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col">
      {getPosts.data?.map((postWithAuthor) => (
        <PostView key={postWithAuthor.post.id} {...postWithAuthor} />
      ))}
    </div>
  );
};

export default function Home() {
  const { user, isLoaded: userLoaded } = useUser();

  // Early fetch, since the first request will cache
  api.posts.getAll.useQuery();

  if (!userLoaded) {
    return <div />;
  }

  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
        <div className="flex border-b border-slate-400 p-4">
          <CreatePostWizard />
        </div>
        <Feed />
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
import { LoadingSpinner } from "./loading";

export const CreatePost = () => {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const ctx = api.useUtils();
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      ctx.posts.getAll.invalidate();
    },
    onError: (err) => {
      const errorMessage =
        err.data?.zodError?.fieldErrors.content || err.data?.code;
      if (
        errorMessage &&
        typeof errorMessage === "string" &&
        errorMessage === "TOO_MANY_REQUESTS"
      ) {
        toast.error("You are posting too fast, slow down!");
      } else if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to create post");
      }
    },
  });

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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== "" && !isPosting && (
        <button onClick={() => mutate({ content: input })}>Post</button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

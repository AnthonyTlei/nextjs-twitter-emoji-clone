"use client";

import { api } from "~/trpc/react";
import { LoadingPage } from "./loading";
import { PostView } from "./post-view";

export const UserFeed = () => {
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

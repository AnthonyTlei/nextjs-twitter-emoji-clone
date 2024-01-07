"use client";

import React from "react";
import { api } from "~/trpc/react";
import { LoadingPage } from "./loading";
import { PostView } from "./post-view";

interface ProfileFeedProps {
  userId: string;
}

const ProfileFeed = ({ userId }: ProfileFeedProps) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({ userId });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0) return <div>User has not posted</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default ProfileFeed;

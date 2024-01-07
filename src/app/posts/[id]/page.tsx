import React, { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { PostView } from "~/app/_components/post-view";

interface SinglePostPageProps {
  params: {
    id: string;
  };
}

const getPostWithAuthorById = cache(async (id: string) => {
  try {
    const postWithAuthor = await api.posts.getById.query({
      id,
    });
    return postWithAuthor;
  } catch (error) {
    return null;
  }
});

export async function generateMetadata({
  params: { id },
}: SinglePostPageProps): Promise<Metadata> {
  const postWithAuthor = await getPostWithAuthorById(id);
  if (!postWithAuthor) {
    notFound();
  }
  return {
    title:
      postWithAuthor.author.username +
      " - " +
      postWithAuthor.post.content +
      " - Twitter Emoji Clone",
    description: "Post by " + postWithAuthor.author.username,
    openGraph: {
      images: [{ url: postWithAuthor.author.profileImageUrl }],
    },
  };
}

const SinglePostPage = async ({ params: { id } }: SinglePostPageProps) => {
  const postWithAuthor = await getPostWithAuthorById(id);
  if (!postWithAuthor) {
    notFound();
  }

  return <PostView {...postWithAuthor} />;
};

export default SinglePostPage;

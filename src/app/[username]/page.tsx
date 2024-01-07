import React, { cache } from "react";
import { Metadata } from "next";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const getUser = cache(async (username: string) => {
  const extractedUsername = username.replace("%40", "");
  try {
    const user = await api.profiles.getUserByUsername.query({
      username: extractedUsername,
    });
    return user;
  } catch (error) {
    return null;
  }
});

export async function generateMetadata({
  params: { username },
}: ProfilePageProps): Promise<Metadata> {
  const user = await getUser(username);
  if (!user) {
    notFound();
  }
  return {
    title: user.username + " - Twitter Emoji Clone",
    description: user.id,
    openGraph: {
      images: [{ url: user.profileImageUrl }],
    },
  };
}

const ProfilePage = async ({ params: { username } }: ProfilePageProps) => {
  const user = await getUser(username);
  return <div>{user?.username} Profile Page</div>;
};

export default ProfilePage;

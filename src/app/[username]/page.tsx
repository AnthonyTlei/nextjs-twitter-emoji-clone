import React, { cache } from "react";
import Image from "next/image";
import { Metadata } from "next";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import ProfileFeed from "../_components/profile-feed";

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
  if (!user) {
    notFound();
  }

  return (
    <div>
      <div className="relative h-36 bg-slate-600">
        <Image
          src={user.profileImageUrl}
          alt={`${
            user.username ?? user.externalUsername ?? "unknown"
          }'s profile pic`}
          width={128}
          height={128}
          className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
        />
      </div>
      <div className="h-[64px]"></div>
      <div className="p-4 text-2xl font-bold">{`@${
        user.username ?? user.externalUsername ?? "unknown"
      }`}</div>
      <div className="w-full border-b border-slate-400" />
      <ProfileFeed userId={user.id} />
    </div>
  );
};

export default ProfilePage;

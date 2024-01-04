import { UserButton, auth } from "@clerk/nextjs";
import { api } from "~/trpc/server";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const data = await api.posts.getAll.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <UserButton afterSignOutUrl="/" />

      <h1 className="text-3xl font-bold">Posts</h1>
      <div>{data?.map((post) => <div>{post.content}</div>)}</div>
    </main>
  );
}

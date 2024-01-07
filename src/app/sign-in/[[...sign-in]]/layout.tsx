export const metadata = {
  title: "Sign In - Twitter Emoji Clone",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      {children}
    </div>
  );
}

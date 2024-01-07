import { CreatePost } from "../_components/create-post";
import { UserFeed } from "../_components/user-feed";

export default function FeedPage() {
  return (
    <div>
      <div className="flex border-b border-slate-400 p-4">
        <CreatePost />
      </div>
      <UserFeed />
    </div>
  );
}

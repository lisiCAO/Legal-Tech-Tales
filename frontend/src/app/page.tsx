
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Welcome to my Blog</h1>
      <div className="flex space-x-4">
        <Link href="/articles" className="text-xl">Blog
        </Link>
        <Link href="/login"className="text-xl">
          Login
        </Link>
      </div>
    </main>
  );
}

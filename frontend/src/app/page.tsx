import Link from "next/link";
import Image from 'next/image';
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-custom-cream">
      <div className="w-full max-w-[960px] mx-auto flex justify-center">
        <Image src="/banner.png" alt="Banner" width={500} height={300} layout="responsive" />
      </div>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6" style={{ color: 'var(--custom-darkorange)' }}>Welcome to my Blog</h1>
        <div className="flex justify-center space-x-4">
          <Link href="/articles" className="text-xl" style={{ color: 'var(--custom-pink)' }}>
            Blog
          </Link>
          <Link href="/login" className="text-xl" style={{ color: 'var(--custom-pink)' }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

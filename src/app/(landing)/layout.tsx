import AlreadySignedIn from "@/features/auth/components/already-signed-in";
import { AuthGroupButtons } from "@/features/auth/components/auth-group-buttons";
import Image from "next/image";
import Link from "next/link";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Image
        src="/bg.webp"
        fill={true}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />

      <div className="absolute inset-0 bg-background opacity-50" />

      <nav className="relative bg-background bg-opacity-90 shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-foreground">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </Link>
              </div>
            </div>
            <AuthGroupButtons />
          </div>
        </div>
      </nav>

      <main className="flex flex-grow items-center justify-center  container mx-auto px-4 py-8 relative z-10">
        <AlreadySignedIn>{children}</AlreadySignedIn>
      </main>

      <footer className="relative bg-background bg-opacity-90 shadow-md mt-8 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p className="text-sm">
            &copy; 2025 {process.env.NEXT_PUBLIC_APP_NAME}. Internal use only.
          </p>
        </div>
      </footer>
    </div>
  );
}

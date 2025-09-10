import { AuthGroupButtons } from "@/features/shared/ui/auth-group-buttons";
import Image from "next/image";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 bg-background opacity-50" />

      <nav className="relative bg-background bg-opacity-90 shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-foreground">
                  SFS Online Induction
                </Link>
              </div>
            </div>
            <AuthGroupButtons />
          </div>
        </div>
      </nav>

      <main className="flex flex-grow items-center justify-center  container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>

      <footer className="relative bg-background bg-opacity-90 shadow-md mt-8 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p className="text-sm">
            &copy; 2025 Stark Food Systems. Internal use only.
          </p>
        </div>
      </footer>
    </div>
  );
}

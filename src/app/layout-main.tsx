import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function LayoutMain({
  hasUser = false,
  mode,
  children,
}: Readonly<{
  hasUser?: boolean;
  mode?: "MUST_NO_AUTH" | "MUST_AUTH";
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg.webp?height=1080&width=1920"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <nav className="relative bg-background/90 shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center flex-col sm:flex-row sm:justify-between sm:h-16 gap-2 sm:gap-0 py-2 sm:py-0">
            {/* Logo */}
            <Link href="/" className="text-lg sm:text-xl font-bold self-center">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {!hasUser && (
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <Link href="/sign-in" className="flex-1 sm:flex-none">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" className="flex-1 sm:flex-none">
                    <Button size="sm" className="w-full sm:w-auto">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {hasUser && (
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="sm" className="w-full sm:w-auto">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex flex-grow items-center justify-center px-4 py-6 sm:py-10 container mx-auto relative z-10">
        {mode === "MUST_NO_AUTH" &&
          (hasUser ? (
            <Card className="flex flex-col items-center gap-4 p-6 text-center w-full max-w-sm">
              <h1>You&apos;re already signed in!</h1>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </Card>
          ) : (
            children
          ))}

        {mode === "MUST_AUTH" &&
          (hasUser ? (
            children
          ) : (
            <Card className="flex flex-col items-center gap-4 p-6 text-center w-full max-w-sm">
              <h1>You must be signed in to access this page.</h1>
              <div className="flex gap-2 flex-wrap justify-center w-full">
                <Link href="/sign-in">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="w-full sm:w-auto">Sign Up</Button>
                </Link>
              </div>
            </Card>
          ))}

        {mode == null && children}
      </main>

      <footer className="relative bg-background/90 shadow-md mt-8 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
          &copy; 2025 {process.env.NEXT_PUBLIC_APP_NAME}.
        </div>
      </footer>
    </div>
  );
}

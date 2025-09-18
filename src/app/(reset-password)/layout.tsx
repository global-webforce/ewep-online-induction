import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authRepository } from "@/features/auth-repository";
import { AuthGroupButtons } from "@/components/custom/auth-group-buttons";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const x = await authRepository.getUser();
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
        {!x ? (
          <Card className="flex flex-col items-center gap-4 p-6">
            <h1>You must be signed-in to reset your password. </h1>{" "}
            <div className="flex gap-2 justify-center">
              <Link href="/sign-in">
                <Button variant="default">Sign In</Button>
              </Link>
              <Link href="/forgot-password">
                <Button variant="outline">Forgot Password?</Button>
              </Link>{" "}
            </div>
          </Card>
        ) : (
          children
        )}
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

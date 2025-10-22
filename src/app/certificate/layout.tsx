import MustBeSignedIn from "@/features/auth/components/must-be-signed-in";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 bg-background opacity-50" />

      <main className="flex flex-grow items-center justify-center  container mx-auto px-4 py-8 relative z-10">
        <MustBeSignedIn>{children}</MustBeSignedIn>
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

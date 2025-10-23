import Link from "next/link";

export default async function ErrorPage(props: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const searchParams = await props.searchParams;

  const firstKey = Object.keys(searchParams)[0];
  const errorMessage = firstKey
    ? decodeURIComponent(firstKey)
    : "Unknown error";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold mb-4">Something went wrong</h1>
      <p className="text-red-600">{errorMessage}</p>

      <Link href="/" className="mt-6 underline">
        Go back home
      </Link>
    </main>
  );
}

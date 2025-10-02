import { requireUser } from "@/features/auth/require-user";

export default async function AdminDashboard() {
  const user = await requireUser();
  return (
    <main>
      <h1 className="text-lg font-semibold">User Dashboard</h1>

      <p>{JSON.stringify(user)}</p>
    </main>
  );
}

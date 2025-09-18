import { authRepository } from "@/features/auth-repository";

export default async function AdminDashboard() {
  const x = await authRepository.getUser();
  return (
    <main>
      <h1 className="text-lg font-semibold">User Dashboard</h1>

      <p>{JSON.stringify(x)}</p>
    </main>
  );
}

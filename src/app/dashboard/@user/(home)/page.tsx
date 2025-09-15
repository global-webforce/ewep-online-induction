import { authRepository } from "@/features/shared/auth-repository";

export default async function Page() {
  const user = await authRepository.getUser();
  return (
    <div>
      <h2 className="text-lg font-semibold">User Dashboard</h2>
      <p>Welcome, normal user!</p>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}

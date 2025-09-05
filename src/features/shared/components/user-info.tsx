import { authRepository } from "../repository";

export async function UserInfo() {
  const user = await authRepository.getSession();
  return (
    <div className="flex items-center">
      <h1 className="text-white">USER</h1>
      {
        // show dashboard if logged in
        <p className="text-white">{user?.email}</p>
      }
    </div>
  );
}

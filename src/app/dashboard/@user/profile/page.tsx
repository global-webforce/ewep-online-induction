import ProfileForm from "@/features/auth/profile/form";
import { authRepository } from "@/features/auth-repository";

export default async function Profile() {
  const user = await authRepository.getUser();
  return (
    <main>
      <ProfileForm data={user!} />
    </main>
  );
}

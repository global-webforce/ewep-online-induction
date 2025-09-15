import ProfileForm from "@/features/auth/profile/form";
import { authRepository } from "@/features/shared/auth-repository";

export default async function Profile() {
  const user = await authRepository.getUser();
  return (
    <main>
      <ProfileForm data={user?.profile} />
    </main>
  );
}

import { Button } from "@/components/ui/button";
import { logoutAction } from "./logout-action";

// This is server component that renders a logout button.
// It uses a form to submit the logout action.
// interactivity is not allowed in server components e.g. onClick handlers.
// Instead, we use a form with an action that points to the logout action.
// Loading is also not supported in server components, so we don't show any loading state.
// Normal async actions are not allowed in server components, so we use server actions to handle the logout process.

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <div className="flex gap-2 justify-end">
        <Button type="submit" variant="default">
          Logout
        </Button>
      </div>
    </form>
  );
}

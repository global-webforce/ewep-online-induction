import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { InductionsTable } from "@/features/inductions";
import { UsersTable } from "@/features/users";

export default function Page() {
  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        <div className="space-x-2">
          <Button asChild variant="outline" size="icon">
            <SidebarTrigger />
          </Button>
        </div>
        <h1 className="text-xl font-semibold">Users</h1>
      </div>

      {<UsersTable />}
    </>
  );
}

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { InductionSessionsTable } from "@/features/admin-inductions-sessions";

export default function Page() {
  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        <div className="space-x-2">
          <Button asChild variant="outline" size="icon">
            <SidebarTrigger />
          </Button>
        </div>
        <h1 className="text-xl font-semibold">Induction Sessions</h1>
      </div>

      {<InductionSessionsTable />}
    </>
  );
}

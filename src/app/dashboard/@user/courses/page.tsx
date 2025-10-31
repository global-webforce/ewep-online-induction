import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TableView } from "@/features/user/inductions";

export default function Page() {
  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        <div className="space-x-2">
          <Button asChild variant="outline" size="icon">
            <SidebarTrigger />
          </Button>
        </div>
        <h1 className="text-xl font-semibold">My Courses</h1>
      </div>

      {<TableView />}
    </>
  );
}

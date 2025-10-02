import { BackButton } from "@/components/custom/back-button";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { InductionFormUpdate } from "@/features/inductions";

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center mb-4">
        <div className="space-x-2">
          <Button asChild variant="outline" size="icon">
            <SidebarTrigger />
          </Button>
          <BackButton />
        </div>
        <h1 className="text-xl font-semibold">Manage Induction</h1>
      </div>

      <InductionFormUpdate />
    </div>
  );
}

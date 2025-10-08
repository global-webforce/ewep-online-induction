import { BackButton } from "@/components/custom/back-button";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SlidePresenter from "@/features/super-admin/induction-resources-presenter/slide-presenter";

export default function Page() {
  return (
    <div className="space-y-4 h-full flex flex-col ">
      <div className="flex gap-4 items-center mb-4">
        <div className="space-x-2">
          <Button asChild variant="outline" size="icon">
            <SidebarTrigger />
          </Button>
          <BackButton />
        </div>
      </div>

      <SlidePresenter />
    </div>
  );
}

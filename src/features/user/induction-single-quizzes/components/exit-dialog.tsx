import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigationGuard } from "next-navigation-guard";

export function ExitDialog({ isDirty = false }: { isDirty: boolean }) {
  const confirmExit = useNavigationGuard({
    enabled: isDirty,
    confirm: undefined,
  });

  return (
    <Dialog open={confirmExit.active}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Exit Course?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Your Course progress will be lost.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={confirmExit.reject} variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={confirmExit.accept}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

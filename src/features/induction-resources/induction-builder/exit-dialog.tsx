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
import React from "react";

export default function ExitDialog({ isDirty = false }: { isDirty: boolean }) {
  const confirmExit = useNavigationGuard({
    enabled: isDirty,
    confirm: undefined,
  });

  return (
    <Dialog open={confirmExit.active}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>You have unsaved changes</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          You have unsaved changes that will be lost.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={confirmExit.reject} variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={confirmExit.accept}>Discard</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type UnansweredDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onClose?: () => void;
};

export function UnansweredDialog({
  open,
  setOpen,
  onClose,
}: UnansweredDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Looks like you missed a few!</DialogTitle>
          <DialogDescription>
            Some questions are still unanswered. Double-check your quiz before
            submitting to make sure you&apos;ve answered everything.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={() => {
              setOpen(false);
              onClose?.();
            }}
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

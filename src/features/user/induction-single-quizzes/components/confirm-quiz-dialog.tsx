import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  setOpen,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ready to Submit?</DialogTitle>
          <DialogDescription>
            Take a moment to review your answers. Once you submit, your
            responses will be final.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Review Again
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              onConfirm();
            }}
          >
            Yes, I'm Ready
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

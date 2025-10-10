"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // ensure correct path
import { useRouter } from "next/navigation";

export default function QuizSuccessModal() {
  const router = useRouter();

  const closeModal = () => {
    router.back(); // go back to the quiz page
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quiz Submitted!</DialogTitle>
          <DialogDescription>
            Congratulations! Your quiz has been successfully submitted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={closeModal}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

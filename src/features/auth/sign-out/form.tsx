import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAction } from "./action";

export default function SignOutForm() {
  const queryClient = useQueryClient();

  const { mutate: logoutUser } = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      queryClient.clear();
      // router.push(`/sign-in`);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full text-left">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logout Confirmation</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to log out? You will need to enter your password
          to log back in.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={() => logoutUser()}>Logout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

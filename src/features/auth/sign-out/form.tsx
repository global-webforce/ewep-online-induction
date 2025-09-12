import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import React from "react";

import { logoutAction } from "./action";
import { Button } from "@/components/ui/button";

export default function SignOutForm() {
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
          <form action={logoutAction}>
            <Button type="submit">Logout</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

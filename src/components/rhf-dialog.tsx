import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";

const RhfDialog = ({
  content,
  trigger,
}: {
  content: ReactNode;
  trigger: ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className="p-0 w-10 h-10">
          {trigger}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex justify-center h-[80%]">
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default RhfDialog;

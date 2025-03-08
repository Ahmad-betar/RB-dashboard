import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const RhfDialog = ({
  content,
  trigger,
  className,
}: {
  content: ReactNode;
  trigger: ReactNode;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className="p-0 w-10 h-10">
          {trigger}
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("flex justify-center h-[80%]", className)}>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default RhfDialog;

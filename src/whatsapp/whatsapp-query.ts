import { useMutation } from "@tanstack/react-query";
import { add_message } from "./whatsapp-api";
import { toast } from "sonner";

export const addMessageMutation = () => {
  return useMutation({
    mutationFn: add_message,
    onSuccess: () => {
      toast("message added successfully");
    },
    onError: () => {
      toast("message error");
    },
  });
};

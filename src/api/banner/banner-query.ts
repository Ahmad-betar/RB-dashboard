import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { add_banner, get_banner } from "./banner-api";
import { toast } from "sonner";

export const getBannerQuery = () => {
  return useQuery({
    queryKey: ["get-banner"],
    queryFn: async () => {
      return get_banner();
    },
  });
};

export const addBannerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: add_banner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-banner"] });
      toast("Added banner successfully");
    },
  });
};

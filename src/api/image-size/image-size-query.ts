import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addImageSize, getImageSize } from "./image-size-api";

export const imageSizeQuery = () => {
  return useQuery({
    queryKey: ["image-size"],
    queryFn: async () => {
      return getImageSize();
    },
  });
};

export const imageSizeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addImageSize,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image-size"] });
    },
  });
};

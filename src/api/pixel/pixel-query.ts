// queries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addPixel, getPixel } from "./pixel-api";

// Get Pixel Query
export const usePixelQuery = () => {
  return useQuery({
    queryKey: ["pixel"],
    queryFn: getPixel,
  });
};

// Add Pixel Mutation
export const useAddPixelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPixel,
    onSuccess: () => {
      // Invalidate the pixel query to refetch data
      queryClient.invalidateQueries({ queryKey: ["pixel"] });
    },
  });
};

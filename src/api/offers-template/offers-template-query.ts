import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOffersTemplate, deleteOffersTemplate, getOffersTemplates } from "./offers-template-api";

export const useOffersTemplatesQuery = () => {
  return useQuery({
    queryKey: ["offersTemplates"],
    queryFn: getOffersTemplates,
  });
};

// Add Offers Template Mutation
export const useAddOffersTemplateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOffersTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offersTemplates"] });
    },
  });
};

// Delete Offers Template Mutation
export const useDeleteOffersTemplateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOffersTemplate,
    onSuccess: () => {
      // Invalidate the offers templates query to refetch data
      queryClient.invalidateQueries({ queryKey: ["offersTemplates"] });
    },
  });
};

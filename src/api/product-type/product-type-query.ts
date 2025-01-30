import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  create_product_type,
  delete_product_type,
  get_children_product_types,
  get_parent_product_types,
} from "./product-type-api";

export const getParentProductTypesQuery = () => {
  return useQuery({
    queryKey: ["parent-product-types"],
    queryFn: async () => {
      const data = get_parent_product_types();

      return data;
    },
    placeholderData: keepPreviousData,
  });
};
export const useGetChildrenProductTypes = (parentId: string) => {
  return useQuery({
    queryKey: ["children-product-types", parentId],
    queryFn: async () => {
      const data = await get_children_product_types(parentId);

      return data;
    },
    enabled: !!parentId,
    placeholderData: keepPreviousData,
  });
};
export const useCreateProductType = () => {
  return useMutation({
    mutationKey: ["create-product-type"],
    mutationFn: create_product_type,
  });
};
export const useDeleteProductType = () => {
  return useMutation({
    mutationKey: ["delete-product-type"],
    mutationFn: delete_product_type,
  });
};

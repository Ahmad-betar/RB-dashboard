import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  create_product_type,
  delete_product_type,
  get_children_product_types,
  get_parent_product_types,
} from "./product-type-api";
import { useNavigate } from "react-router-dom";

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
export const getChildrenProductTypes = (parentId: string) => {
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
export const createProductType = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-product-type"],
    mutationFn: create_product_type,
    onSuccess: () => {
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ["parent-product-types"] });
    },
  });
};
export const deleteProductType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-product-type"],
    mutationFn: delete_product_type,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["parent-product-types"],
      });
      queryClient.invalidateQueries({ queryKey: ["children-product-types"] });
    },
  });
};

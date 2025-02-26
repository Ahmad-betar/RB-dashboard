import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  add_products,
  delete_products,
  edit_products,
  get_one_product,
  get_products,
} from "./products-api";
import { useNavigate } from "react-router-dom";

export const getProductsQuery = () => {
  const queryResults = useQuery({
    queryKey: ["get-products"],
    queryFn: async () => {
      const data = await get_products();

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const getOneProductsQuery = (id: string) => {
  const queryResults = useQuery({
    queryKey: ["get-product", id],
    queryFn: async () => {
      const data = await get_one_product(id);

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addProductsQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["add-products"],
    mutationFn: add_products,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      navigate(-1);
    },
  });

  return queryResults;
};

export const editProductsQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["edit-products"],
    mutationFn: edit_products,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      navigate(-1);
    },
  });

  return queryResults;
};

export const deleteProductsQuery = () => {
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["delete-products"],
    mutationFn: delete_products,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    },
  });

  return queryResults;
};

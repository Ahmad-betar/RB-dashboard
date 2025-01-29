import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  add_products,
  delete_products,
  edit_products,
  get_one_product,
  get_products,
} from "./products-api";

export const getProductsQuery = async (params: any) => {
  const queryResults = useQuery({
    queryKey: ["get-products"],
    queryFn: async () => {
      const data = await get_products({});

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const getOneProductsQuery = async (params: any) => {
  const queryResults = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const data = await get_one_product({});

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addProductsQuery = async (params: any) => {
  const queryResults = useMutation({
    mutationKey: ["add-products"],
    mutationFn: add_products,
  });

  return queryResults;
};

export const editProductsQuery = async (params: any) => {
  const queryResults = useMutation({
    mutationKey: ["edit-products"],
    mutationFn: edit_products,
  });

  return queryResults;
};

export const deleteProductsQuery = async (params: any) => {
  const queryResults = useMutation({
    mutationKey: ["delete-products"],
    mutationFn: delete_products,
  });

  return queryResults;
};

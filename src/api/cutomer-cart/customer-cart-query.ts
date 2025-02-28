import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  add_to_cart,
  change_item,
  get_carts,
  order_customer,
  remove_cart,
} from "./customer-cart-api";
import { CartFiltersType } from "./type";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const getCustomerCartQuery = (params?: CartFiltersType) => {
  return useQuery({
    queryKey: ["get-customer-cart", { ...params }],
    queryFn: async () => {
      const data = await get_carts(params);

      return data;
    },
    enabled: !!params?.email || !!params?.phone,
    placeholderData: keepPreviousData,
    retry: false,
  });
};

export const orderForCustomerQuery = () => {
  return useMutation({
    mutationFn: order_customer,
  });
};

export const addToCustomerCartQuery = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: add_to_cart,
    onSuccess: () => {
      navigate(-1);
    },
    onError: () => {
      toast("Failed to order");
    },
  });
};

export const removeFromCartQuery = () => {
  return useMutation({
    mutationFn: remove_cart,
  });
};

export const changeCartItemQuery = () => {
  return useMutation({
    mutationFn: change_item,
  });
};

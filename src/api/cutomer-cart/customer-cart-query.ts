import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  add_to_cart,
  change_item,
  get_carts,
  order_customer,
  remove_cart,
} from "./customer-cart-api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const getCustomerCartQuery = () => {
  return useQuery({
    queryKey: ["get-customer-cart"],
    queryFn: async () => {
      const data = await get_carts();

      return data;
    },
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove_cart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-customer-cart"] });
    },
  });
};

export const changeCartItemQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: change_item,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-customer-cart"] });
    },
  });
};

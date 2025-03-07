import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  change_order_status,
  get_one_order,
  get_orders,
  get_status,
} from "./orders-api";
import { GetOrdersParams } from "./type";

export const getOrdersQuery = (params?: GetOrdersParams) => {
  return useQuery({
    queryKey: ["get-orders", { ...params }],
    queryFn: async () => {
      const data = await get_orders(params);

      return data;
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
};

export const getOneOrderQuery = (id: string) => {
  return useQuery({
    queryKey: ["get-order", id],
    queryFn: async () => {
      const data = await get_one_order(id);

      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export const getStatusQuery = () => {
  return useQuery({
    queryKey: ["get-status"],
    queryFn: async () => {
      const data = await get_status();

      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export const changeOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: change_order_status,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-orders"] });
    },
  });
};

import {
  useQuery,
  useMutation,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import {
  create_temp_order,
  get_temp_orders,
  get_temp_order,
} from "./temp-orders-api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Create a temporary order
export const createTempOrderMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create_temp_order,
    onSuccess() {
      navigate(-1);
      toast("Order created");
      queryClient.invalidateQueries({ queryKey: ["get-customer-cart"] });
    },
    onError: () => {
      toast("Error creating order");
    },
  });
};

// Get all temporary orders
export const getTempOrdersQuery = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["get-temp-orders", { ...params }],
    queryFn: async () => {
      const data = await get_temp_orders(params);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

// Get a single temporary order by ID
export const getTempOrderQuery = (id: string) => {
  return useQuery({
    queryKey: ["get-temp-order", id],
    queryFn: async () => {
      const data = await get_temp_order(id);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

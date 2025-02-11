import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { add_coupon, delete_coupon, get_coupons } from "./coupon-api";
import { getCouponsType } from "./type";

export const getCouponsQuery = () => {
  const queryResults = useQuery<getCouponsType>({
    queryKey: ["coupons"],
    queryFn: async () => {
      const data = await get_coupons();

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addCouponQuery = () => {
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["add-coupon"],
    mutationFn: add_coupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  return queryResults;
};

export const deleteCouponQuery = () => {
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["delete-coupon"],
    mutationFn: delete_coupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  return queryResults;
};

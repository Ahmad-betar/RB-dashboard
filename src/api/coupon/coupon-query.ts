import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { add_coupon, delete_coupon, get_coupons } from "./coupon-api";

export const getCouponsQuery = async (params: any) => {
  const queryResults = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const data = await get_coupons(params);

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addCouponQuery = async (params: any) => {
  const queryResults = useMutation({
    mutationKey: ["add-coupon"],
    mutationFn: add_coupon,
  });

  return queryResults;
};

export const deleteCouponQuery = async (id: string) => {
  const queryResults = useMutation({
    mutationKey: ["delete-coupon"],
    mutationFn: () => delete_coupon(id),
  });

  return queryResults;
};

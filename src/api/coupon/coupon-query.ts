import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { add_coupon, delete_coupon, get_coupons } from "./coupon-api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CouponFilterType } from "./type";

export const getCouponsQuery = (params?: CouponFilterType) => {
  const queryResults = useQuery({
    queryKey: ["coupons", { params }],
    queryFn: async () => {
      const data = await get_coupons(params);

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addCouponQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["add-coupon"],
    mutationFn: add_coupon,
    onSuccess: () => {
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast("Coupon Added", {
        description: "The coupon has been successfully added.",
      });
    },
    onError() {
      toast("Error", {
        description: "Failed to add the coupon. Please try again.",
      });
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

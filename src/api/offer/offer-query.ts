import {
  useQuery,
  useMutation,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import {
  get_offers,
  get_offer,
  add_offer,
  delete_offer,
  edit_offer,
  manage_offer_products,
} from "./offer-api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Get all offers
export const getOffersQuery = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["get-offers", { ...params }],
    queryFn: async () => {
      const data = await get_offers(params);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

// Get a single offer by ID
export const getOfferQuery = (id: string) => {
  return useQuery({
    queryKey: ["get-offer", id],
    queryFn: async () => {
      const data = await get_offer(id);
      return data;
    },
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};

// Add a new offer
export const addOfferMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: add_offer,
    onSuccess: () => {
      navigate(-1);
      toast("successfully added");
      queryClient.invalidateQueries({ queryKey: ["get-offers"] });
    },
  });
};

// Delete an offer by ID
export const deleteOfferMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: delete_offer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-offers"] });
    },
  });
};

// Edit an offer by ID
export const editOfferMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: edit_offer,
    onSuccess: () => {
      navigate(-1);
      toast("successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["get-offers"] });
    },
  });
};

// Get products for an offer
export const manageOfferProductsQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: manage_offer_products,
    onSuccess: () => {
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ["get-offers"] });
    },
  });
};

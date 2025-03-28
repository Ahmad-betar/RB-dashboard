import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import { addProductType, getParentProductType } from "./type";

// Get Parent Product Types
export const get_parent_product_types = async () => {
  const { data } = await axiosInstance.get<getParentProductType>(
    API_ROUTES.productType.getParent
  );
  return data;
};

// Get Children Product Types
export const get_children_product_types = async (parentId: string) => {
  const { data } = await axiosInstance.get<getParentProductType>(
    API_ROUTES.productType.getChildren + parentId
  );
  return data;
};

// Create Product Type
export const create_product_type = async (params: addProductType) => {
  const { data } = await axiosInstance.post(
    API_ROUTES.productType.create,
    params
  );
  return data;
};

// Delete Product Type
export const delete_product_type = async (id: string) => {
  const { data } = await axiosInstance.delete(API_ROUTES.productType.delete, {
    data: { productTypesIds: id },
  });
  return data;
};

import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import { AddOffersTemplateRequest, GetOffersTemplatesResponse } from "./type";

// Get all offers templates
export const getOffersTemplates = async () => {
  const { data } = await axiosInstance.get<GetOffersTemplatesResponse>(
    API_ROUTES.offersTemplate.get
  );
  return data;
};

// Add a new offers template
export const addOffersTemplate = async (
  templateData: AddOffersTemplateRequest
) => {
  const { data } = await axiosInstance.post(
    API_ROUTES.offersTemplate.add,
    templateData
  );
  return data;
};

// Delete an offers template by ID
export const deleteOffersTemplate = async (id: string) => {
  await axiosInstance.delete(`${API_ROUTES.offersTemplate.delete}${id}`);
};

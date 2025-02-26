import { axiosInstance } from "../axios";
import { API_ROUTES } from "../api-routes";
import { editStatesType, getStatesType } from "./type";

export const get_states = async () => {
  const { data } = await axiosInstance.get<getStatesType[]>(
    API_ROUTES.location.state.get
  );

  return data;
};

export const get_state = async (name: string) => {
  const { data } = await axiosInstance.get(
    API_ROUTES.location.state.getOne,
    { params: { name } }
  );

  return data;
};

export const add_state = async (params: any) => {
  const { data } = await axiosInstance.post(
    API_ROUTES.location.state.create,
    params
  );

  return data;
};

export const delete_state = async (id: string) => {
  const { data } = await axiosInstance.delete(
    API_ROUTES.location.state.delete + id
  );

  return data;
};

export const edit_states = async ({
  _id,
  deliveryCostPerKilo,
  firstKiloDeliveryCost,
}: editStatesType) => {
  const { data } = await axiosInstance.put(
    API_ROUTES.location.state.edit + _id,
    { deliveryCostPerKilo, firstKiloDeliveryCost }
  );

  return data;
};

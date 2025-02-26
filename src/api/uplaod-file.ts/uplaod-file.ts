import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";

const uplaodImage = async (params: any) => {
  const { data } = await axiosInstance.post(API_ROUTES.file.image, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

const uplaodVideo = async (params: any) => {
  const { data } = await axiosInstance.post(API_ROUTES.file.video, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const uploadImageQuery = (params: any) => {
  const queryResult = useMutation({
    mutationKey: ["uplaod-image"],
    mutationFn: uplaodImage,
  });

  return queryResult;
};

export const uploadVideoQuery = (params: any) => {
  const queryResult = useMutation({
    mutationKey: ["uplaod-video"],
    mutationFn: uplaodVideo,
  });

  return queryResult;
};

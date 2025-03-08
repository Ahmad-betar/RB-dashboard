import { imageType } from "../uplaod-file.ts/type";

export interface getPopularResponse {
  _id: string;
  product: {
    _id: string;
    title: string;
    price: number;
    images: imageType[];
  };
  orderNumber: number;
}

export interface addPopularPayload {
  product: string;
  orderNumber: number;
}

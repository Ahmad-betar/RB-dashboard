import { imageType } from "../uplaod-file.ts/type";

export interface bannerPayload {
  images: imageType[];
}

export interface bannerResponse {
  _id: string;
  images: imageType[];
}

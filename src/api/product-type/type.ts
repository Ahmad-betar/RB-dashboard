import { imageType } from "../uplaod-file.ts/type";

export interface getParentProductType {
  message: string;
  productTypes: {
    _id: string;
    name: string;
    parentProductType: string;
    image: imageType;
  }[];
}

export interface addProductType {
  name: string;
  image: imageType;
  parentProductTypeId: string | undefined;
}

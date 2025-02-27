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
  parentProductTypeId: string | undefined;
}

export interface addProductTypeForm extends addProductType {
  image: imageType[];
}

export interface addProductTypePayload extends addProductType {
  image: imageType;
}

import { imageType, videoType } from "../uplaod-file.ts/type";

export interface getProductParams {
  search?: string;
  page: number;
  sort?: string;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sizes?: number;
  productType?: string;
}

export interface ProductType {
  _id: string;
  title: string;
  description: string;
  price: number;
  logo: imageType;
  images: imageType[];
  videos: imageType[];
  availableSizes: string[];
  productType: {
    _id: string;
    name: string;
    parentProductType: {
      _id: string;
      name: string;
    };
  };
  weight: number;
  createdAt: Date;
}

export interface getProductType {
  success: boolean;
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: ProductType[];
}

export interface addProduct {
  title: string;
  description: string;
  weight: number;
  price: number;
  productTypeId: string;
  availableSizes: string[];
  logo: imageType | imageType[];
  images: imageType[];
  videos: videoType[];
  attributes: {
    name: string;
    options: string[];
    required: boolean; //Customer has to select of not
  }[];
}

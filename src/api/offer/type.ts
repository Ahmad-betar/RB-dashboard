import { ProductType } from "../products/type";
import { imageType } from "../uplaod-file.ts/type";

export interface OfferProduct {
  product: string;
  newPrice: number;
  notes: string;
  _id: string;
}

export interface Offer {
  _id: string;
  description: string;
  products: OfferProduct[];
  image: imageType;
  expirationDate: string;
  numberOfProductsHaveToBuy: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetOffersResponse {
  success: boolean;
  data: {
    offers: Offer[];
    pagination: {
      page: number;
      limit: number;
    };
  };
}

export interface addOfferPayload {
  products: {
    product: string;
    newPrice: number;
    notes: string;
  }[];
  description: string;
  expirationDate: string;
  numberOfProductsHaveToBuy: number;
}

/////////

interface ProductItem {
  product: ProductType;
  newPrice: string;
  notes: string;
  _id: string;
}

interface Data {
  _id: string;
  description: string;
  image: imageType;
  products: ProductItem[];
  expirationDate: string;
  numberOfProductsHaveToBuy: number;
  createdAt: string;
  updatedAt: string;
}

export interface getOfferResponse {
  success: boolean;
  data: Data;
}

export interface editOfferPayload {
  products?: {
    product: string;
    newPrice: number;
    notes: string;
  }[];
  action: "add" | "remove";
}

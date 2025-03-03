import { imageType } from "@/api/uplaod-file.ts/type";
import { NameID } from "../type";

export interface TempOrderItem {
  product: {
    _id: string;
    title: string;
    price: number;
  };
  quantity: number;
  size: number;
  notes: string;
}

export interface GetTempOrderResponse {
  success: boolean;
  order: {
    _id: string;
    customerPhone: string;
    products: {
      product: {
        _id: string;
        title: string;
        images: imageType[];
        productType: {
          _id: string;
          name: string;
          parentProductType: NameID | null;
        };
      };
      price: number;
      size: number;
      quantity: number;
      notes: string;
      _id: string;
    }[];
    adminNotes: string;
    creator: {
      _id: string;
      name: string;
      email: string;
      phone: string;
    };
    isUrgent: boolean;
    customerUrl: string;
    createdAt: Date;
    updatedAt: Date;
    totalPrice: number;
    itemCount: number;
  };
}

export interface GetTempOrdersResponse {
  success: boolean;
  count: number;
  orders: {
    _id: string;
    customerPhone: string;
    customerUrl: string;
    isUrgent: boolean;
    totalPrice: number;
    itemCount: number;
    adminNotes: string;
    creator: NameID;
    createdAt: string;
  }[];
}

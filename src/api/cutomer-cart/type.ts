import { imageType } from "../uplaod-file.ts/type";

export interface NameID {
  _id: string;
  name: string;
}

export interface CartItem {
  product: {
    _id: string;
    title: string;
    images: imageType[];
    productType: {
      _id: string;
      name: string;
      parentProductType?: NameID;
    };
  };
  price: number;
  size: number;
  quantity: number;
  notes: string;
  _id: string;
}

export interface CartResponse {
  success: true;
  data: {
    cart: CartItem[];
    totalPrice: number;
  };
}

export interface CartFiltersType {
  email?: string;
  phone?: string;
}

export interface addToCustomerCartType {
  productId: string;
  size: number;
  quantity: number;
  notes: string;
}

export interface changeItemCartPayload {
  itemId: string;
  quantityChange: number;
}

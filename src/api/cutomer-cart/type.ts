export interface CartItem {
  product: {
    _id: string;
    title: string;
    price: number;
    images: {
      url: string;
      publicId: string;
      _id: string;
    }[];
    productType: {
      _id: string;
      name: string;
      parentProductType: {
        _id: string;
        name: string;
      } | null;
    };
  };
  size: number;
  quantity: number;
  notes: string;
  _id: string;
}

export interface CartResponse {
  success: boolean;
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
  phone: number;
  email: string;
}

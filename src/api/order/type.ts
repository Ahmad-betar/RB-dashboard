export type StatusType =
  | "Pending"
  | "Processing"
  | "Cut"
  | "Sewn"
  | "Delivering"
  | "Completed";

export interface orderType {
  _id: string;
  customer: {
    _id: string;
    name: string;
  };
  totalAmount: number;
  deliveryAddress: {
    state: {
      _id: string;
      name: string;
    };
  };
  isUrgent: boolean;
  status: StatusType;
  createdAt: string;
}

export interface getOrdersType {
  orders: orderType[];
  pagination: {
    totalOrders: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export interface CustomerType {
  name: string;
  email: string;
  phone: number;
}

export interface CouponType {
  code: string;
  discount: number;
  discountType: "percentage";
}

export interface BuildingType {
  number: string;
  floor: string;
  apartment: string;
}

export interface DeliveryAddressType {
  area: string;
  street: string;
  building: BuildingType;
  notes: string;
}

export interface ProductType {
  title: string;
  quantity: number;
  price: number;
  size: number;
  notes: string;
}

export interface OrderDetailsType {
  orderId: string;
  customer: CustomerType;
  status: StatusType; // Ensure `StatusType` is defined elsewhere
  orderDate: Date;
  FinalCost: number;
  deliveryCost: number;
  isPaid: boolean;
  coupon: CouponType;
  isUrgent: boolean;
  orderNotes: string;
  deliveryAddress: DeliveryAddressType;
  products: ProductType[];
}

export interface OrderType {
  success: boolean;
  order: OrderDetailsType;
}

////////////////////////////////////////////////////////////////
//new

export interface CustomerType {
  _id: string;
  name: string;
}

export interface StateType {
  _id: string;
  name: string;
}

export interface DeliveryAddressType {
  state: StateType;
}

export interface OrderType {
  _id: string;
  customer: CustomerType;
  totalAmount: number;
  deliveryAddress: DeliveryAddressType;
  isUrgent: boolean;
  status: string;
  createdAt: string;
  id: string;
}

export interface PaginationType {
  totalOrders: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface GetOrdersResponse {
  success: boolean;
  orders: OrderType[];
  pagination: PaginationType;
}

export interface GetOrdersParams {
  customer?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  isUrgent?: boolean;
  isPaid?: boolean;
}

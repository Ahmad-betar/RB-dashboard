export interface couponType {
  _id: string;
  code: string;
  discount: number;
  maxDiscount: number;
  expirationDate: Date;
  minOrderAmount: number;
  discountType: string;
  usageLimit: number;
  usedCount: number;
  validFor: {
    _id: string;
    title: string;
  }[];
  creator: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
}

export interface getCouponsType {
  success: boolean;
  count: number;
  total: number;
  pages: number;
  data: couponType[];
}

export type CouponFormValues = {
  code: string;
  discount: number;
  discountType: "percentage" | "value";
  maxDiscount: number;
  minOrderAmount: number;
  usageLimit: number;
  expirationDate: Date;
  validFor: string[];
};
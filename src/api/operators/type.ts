// src/types/operator.ts

import { PaginationType } from "../order/type";

export interface Operator {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface OperatorsResponse {
  count: number;
  data: Operator[];
  pagination: PaginationType;
}

export interface AddOperatorRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface OperatorFilterParams {
  name: string;
  phone: string;
  email: string;
  limit: number;
  page: number;
}

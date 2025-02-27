// src/types/operator.ts

export interface Operator {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface OperatorsResponse {
  operators: Operator[];
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
}

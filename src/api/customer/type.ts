export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: number;
  joined: string;
  lastActivity: string;
}

export interface CustomersResponse {
  success: boolean;
  customers: Customer[];
  pagination: {
    totalCustomers: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

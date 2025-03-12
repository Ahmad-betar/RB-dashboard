// types.ts

// Products Statistics
export type ProductStatistics = {
  totalProducts: number;
  topSellingProducts: Array<{
    _id: string;
    quantity: number;
    title: string;
    orderCount: number;
  }>;
};

// Customers Statistics
export type CustomersStatistics = {
  totalCustomers: number;
  mostActiveCustomersByCount: Array<{
    ordersCount: number;
    customerId: string;
    name: string;
    phone: string;
  }>;
  mostActiveCustomersByValue: Array<{
    totalOrderValue: number;
    customerId: string;
    name: string;
    phone: string;
  }>;
};

// Sales Statistics
export type SalesStatistics = {
  totalOrders: number;
  paidOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>; // e.g., { "Processing": 4, "Pending": 2 }
};

// Daily Revenue Statistics
export type DailyRevenueStatistics = Array<{
  total: number;
  orders: number;
  date: string;
}>;

// Offer Statistics
export type OfferStatistics = {
  activeOffers: number;
  expiredOffers: number;
};

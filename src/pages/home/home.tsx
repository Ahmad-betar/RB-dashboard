import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useCustomersStatisticsQuery,
  useDailyRevenueStatisticsQuery,
  useOfferStatisticsQuery,
  useProductsStatisticsQuery,
  useSalesStatisticsQuery,
} from "@/api/statistics/statistics-query";

const AdminDashboard = () => {
  const { data: productsStats, isLoading: productsLoading } =
    useProductsStatisticsQuery();
  const { data: customersStats, isLoading: customersLoading } =
    useCustomersStatisticsQuery(5);
  const { data: salesStats, isLoading: salesLoading } =
    useSalesStatisticsQuery();
  const { data: dailyRevenueStats, isLoading: dailyRevenueLoading } =
    useDailyRevenueStatisticsQuery();
  const { data: offerStats, isLoading: offerLoading } =
    useOfferStatisticsQuery();

  if (
    productsLoading ||
    customersLoading ||
    salesLoading ||
    dailyRevenueLoading ||
    offerLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Products Statistics */}
      <Card className="mb-6">
        <CardHeader className="font-bold">Products Statistics</CardHeader>
        <CardContent>
          <p>Total Products: {productsStats?.totalProducts}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Top Selling Products:</h3>
            {productsStats?.topSellingProducts.map((product) => (
              <div key={product._id} className="mt-2">
                <p>
                  {product.title} - Sold: {product.quantity} (Orders:{" "}
                  {product.orderCount})
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customers Statistics */}
      <Card className="mb-6">
        <CardHeader className="font-bold">Customers Statistics</CardHeader>
        <CardContent>
          <p>Total Customers: {customersStats?.totalCustomers}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Most Active Customers (By Count):</h3>
            {customersStats?.mostActiveCustomersByCount.map((customer) => (
              <div key={customer.customerId} className="mt-2">
                <p>
                  {customer.name} - Orders: {customer.ordersCount}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Most Active Customers (By Value):</h3>
            {customersStats?.mostActiveCustomersByValue.map((customer) => (
              <div key={customer.customerId} className="mt-2">
                <p>
                  {customer.name} - Total Value: {customer.totalOrderValue}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales Statistics */}
      <Card className="mb-6">
        <CardHeader className="font-bold">Sales Statistics</CardHeader>
        <CardContent>
          <p>Total Orders: {salesStats?.totalOrders}</p>
          <p>Paid Orders: {salesStats?.paidOrders}</p>
          <p>Total Revenue: {salesStats?.totalRevenue}</p>
          <p>Average Order Value: {salesStats?.averageOrderValue}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Orders by Status:</h3>
            {Object.entries(salesStats?.ordersByStatus || {}).map(
              ([status, count]) => (
                <div key={status} className="mt-2">
                  <p>
                    {status}: {count}
                  </p>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Daily Revenue Statistics */}
      <Card className="mb-6">
        <CardHeader className="font-bold">Daily Revenue Statistics</CardHeader>
        <CardContent>
          {dailyRevenueStats?.map((daily) => (
            <div key={daily.date} className="mt-2">
              <p>
                {new Date(daily.date).toLocaleDateString()} - Revenue:
                {daily.total} (Orders: {daily.orders})
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Offer Statistics */}
      <Card className="mb-6">
        <CardHeader className="font-bold">Offer Statistics</CardHeader>
        <CardContent>
          <p>Active Offers: {offerStats?.activeOffers}</p>
          <p>Expired Offers: {offerStats?.expiredOffers}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

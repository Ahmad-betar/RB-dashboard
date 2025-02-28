import { getCustomersQuery } from "@/api/customer/customer-query";
import NoData from "@/components/no-data";
import LoadingSpinner from "@/components/loading";
import Title from "@/components/title";
import CustomerTable from "./customer-table";
const CustomersList = () => {
  const { data, isLoading } = getCustomersQuery();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-4 mb-4">
      <Title title="Customers" />

      <CustomerTable data={data?.customers ?? []} />

      {data?.customers.length === 0 && <NoData />}
    </div>
  );
};

export default CustomersList;

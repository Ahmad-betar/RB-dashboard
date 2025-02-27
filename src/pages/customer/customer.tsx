// src/components/customers-list.tsx

import { getCustomersQuery } from "@/api/customer/customer-query";
import NoData from "@/components/no-data";
import LoadingSpinner from "@/components/loading";
import { CustomerCard } from "./customer-card";
import Title from "@/components/title";
const CustomersList = () => {
  const { data, isLoading } = getCustomersQuery();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-4 mb-4">
      <Title title="Customers" />

      {data?.customers.length !== 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      )}

      {data?.customers.length === 0 && <NoData />}
    </div>
  );
};

export default CustomersList;

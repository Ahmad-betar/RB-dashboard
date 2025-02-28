import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import Title from "@/components/title";
import { getOrdersQuery } from "@/api/order/orders-query";
import RHFPagination from "@/components/rhf-pagination";
import OrdersTable from "./orders-table";
import OrderFilters from "./order-filters";
import { GetOrdersParams } from "@/api/order/type";

const OrdersPage = () => {
  const methods = useForm<GetOrdersParams>({
    defaultValues: { page: 1, limit: 10 },
  });
  const { watch, setValue } = methods;
  const filters = watch();

  const { data, isLoading } = getOrdersQuery(filters);

  if (isLoading) return <LoadingSpinner />;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4 mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <Title title="Orders" />
          <Button variant="outline">+ Add Order</Button>
        </div>

        <OrderFilters />

        {data?.orders.length === 0 ? (
          <NoData />
        ) : (
          <OrdersTable data={data?.orders || []} />
        )}

        <RHFPagination
          page={methods.watch("page")!}
          totalPages={data?.pagination.totalPages!}
          hasNextPage={data?.pagination.hasNextPage!}
          hasPreviousPage={data?.pagination.currentPage! > 1}
          onPageChange={(page) => setValue("page", page)}
        />
      </div>
    </FormProvider>
  );
};

export default OrdersPage;

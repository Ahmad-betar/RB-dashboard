import { FormProvider, useForm } from "react-hook-form";
import { getOrdersQuery } from "@/api/order/orders-query";
import LoadingSpinner from "@/components/loading";
import OrderCard from "@/components/order-card";
import Title from "@/components/title";
import OrderFilters from "./order-filters";
import { GetOrdersParams } from "@/api/order/type";
import NoData from "@/components/no-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Orders = () => {
  const methods = useForm<GetOrdersParams>();
  const values = methods.watch();

  const { data, isLoading } = getOrdersQuery({ ...values });

  if (isLoading) return <LoadingSpinner />;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-8 p-4 sm:p-6">
        <Title title="Orders" />

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Filters</AccordionTrigger>
            <AccordionContent className="!pb-0">
              <OrderFilters />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {data?.orders.length !== 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
        {data?.orders.length === 0 && <NoData />}
      </div>
    </FormProvider>
  );
};

export default Orders;

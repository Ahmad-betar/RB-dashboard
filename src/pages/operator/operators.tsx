import { getOperatorsQuery } from "@/api/operators/operators-query";
import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import Title from "@/components/title";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { OperatorFilterParams } from "@/api/operators/type";
import OperatorFilter from "./operator-filter";
import OperatorTable from "./operator-table";
import RHFPagination from "@/components/rhf-pagination";

const OperatorsList = () => {
  const methods = useForm<OperatorFilterParams>({
    defaultValues: { limit: 10, page: 1 },
  });
  const params = methods.watch();
  const { data, isLoading } = getOperatorsQuery(params);

  if (isLoading) return <LoadingSpinner />;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4 mb-4">
        <Link
          to={"/add-operator"}
          className={buttonVariants({
            variant: "outline",
            className: "w-fit ml-auto",
          })}
        >
          + Add Operator
        </Link>

        <Title title="Operators" />

        <OperatorFilter />

        <OperatorTable data={data?.data!} />

        {data?.data.length === 0 && <NoData />}

        <RHFPagination
          hasNextPage={data?.pagination.hasNextPage!}
          hasPreviousPage={params.page !== 1}
          page={params.page!}
          totalPages={data?.pagination.totalPages!}
          onPageChange={(page) => methods.setValue("page", page)}
        />
      </div>
    </FormProvider>
  );
};

export default OperatorsList;

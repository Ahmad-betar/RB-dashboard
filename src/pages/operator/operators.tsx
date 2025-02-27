import { getOperatorsQuery } from "@/api/operators/operators-query";
import LoadingSpinner from "@/components/loading";
import OperatorCard from "./operator-card";
import NoData from "@/components/no-data";
import Title from "@/components/title";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { OperatorFilterParams } from "@/api/operators/type";
import OperatorFilter from "./operator-filter";

const OperatorsList = () => {
  const methods = useForm<OperatorFilterParams>();
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.operators.length !== 0 &&
            data?.operators.map((operator) => (
              <OperatorCard key={operator._id} operator={operator} />
            ))}

          {data?.operators.length === 0 && <NoData />}
        </div>
      </div>
    </FormProvider>
  );
};

export default OperatorsList;

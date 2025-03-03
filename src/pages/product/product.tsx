import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import Title from "@/components/title";
import { getProductsQuery } from "@/api/products/products-query";
import { getParentProductTypesQuery } from "@/api/product-type/product-type-query";
import ProductFilters from "./product-filters";
import { getProductParams } from "@/api/products/type";
import RHFPagination from "@/components/rhf-pagination";
import ProductsTable from "./product-table";

const Product = () => {
  const methods = useForm<getProductParams>({
    defaultValues: { page: 1, limit: 10 },
  });
  const { watch, setValue } = methods;
  const filters = watch();

  const { data, isLoading } = getProductsQuery(filters);
  const { data: productTypes, isLoading: isProductTypesLoading } =
    getParentProductTypesQuery();

  useEffect(() => {
    setValue("page", 1);
  }, [filters.search, filters.sort]);

  if (isLoading || isProductTypesLoading) return <LoadingSpinner />;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-8 container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <Title title="Products" />
          <Link to="/action-product">
            <Button variant="outline">+ Add Product</Button>
          </Link>
        </div>

        <ProductFilters productTypes={productTypes?.productTypes || []} />

        {data?.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <ProductsTable data={data?.data!} />

            <RHFPagination
              page={filters.page}
              totalPages={data?.totalPages || 1}
              hasNextPage={data?.hasNextPage || false}
              hasPreviousPage={data?.hasPreviousPage || false}
              onPageChange={(page) => setValue("page", page)}
            />
          </>
        )}
      </div>
    </FormProvider>
  );
};

export default Product;

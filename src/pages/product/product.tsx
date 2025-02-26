import {
  deleteProductsQuery,
  getProductsQuery,
} from "@/api/products/products-query";
import DeleteDialog from "@/components/delete-dialog";
import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import Title from "@/components/title";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import CardText from "@/components/card-text";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "@/api/axios";
import { Pen, Video } from "lucide-react";
import TextField from "@/components/TextField";
import { useForm } from "react-hook-form";
import { getProductParams } from "@/api/products/type";
import { useEffect } from "react";
import RHFSelect from "@/components/rhf-select";
import { getParentProductTypesQuery } from "@/api/product-type/product-type-query";
import RhfDialog from "@/components/rhf-dialog";

const Product = () => {
  const { data: productTypes, isLoading: isProductTypesLoading } =
    getParentProductTypesQuery();
  const { control, setValue, watch } = useForm<getProductParams>({
    defaultValues: { page: 1 },
  });

  const values = watch();

  const { mutate, isPending } = deleteProductsQuery();
  const { data, isLoading } = getProductsQuery({
    limit: 10,
    ...values,
  });

  useEffect(() => {
    setValue("page", 1);
  }, [values.search, values.sort]);

  if (isLoading || isProductTypesLoading) return <LoadingSpinner />;

  return (
    <div className="flex gap-8 flex-col justify-end mb-8">
      <Title title="Product" />

      <Link
        to="/action-product"
        className={buttonVariants({
          variant: "outline",
          className: "w-fit ml-auto",
        })}
      >
        + Add Product
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <TextField name="search" control={control} label="Search" />

        <RHFSelect
          name="sort"
          control={control}
          label="Sort by"
          onValueChange={(value) => setValue("sort", value)}
          items={[
            { label: "asc", value: "name:asc" },
            { label: "desc", value: "name:desc" },
          ]}
        />

        <RHFSelect
          name="productType"
          control={control}
          label="Product Type"
          onValueChange={(value) => setValue("productType", value)}
          items={
            productTypes?.productTypes.map(({ name, _id }) => ({
              label: name,
              value: _id,
            })) ?? []
          }
        />

        <TextField
          name="minPrice"
          type="number"
          control={control}
          label="Min Price"
        />

        <TextField
          name="maxPrice"
          type="number"
          control={control}
          label="Max Price"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {data?.data.length !== 0 &&
          data?.data.map(
            ({
              _id,
              title,
              description,
              logoUrl,
              price,
              weight,
              productType: { name },
              videosUrls,
              imagesUrls,
            }) => (
              <Card key={_id} className="flex flex-col justify-between">
                <CardHeader className="p-0">
                  <img
                    src={API_BASE_URL + logoUrl}
                    alt=""
                    className="rounded-sm  h-52 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardText title="title" value={title} />
                  <CardText title="description" value={description} breakLine />
                  <CardText title="price" value={price} />
                  <CardText title="weight" value={weight} />
                  <CardText title="name" value={name} />
                  <div className="flex flex-wrap gap-2">
                    {imagesUrls.map((imageUrl) => (
                      <RhfDialog
                        trigger={
                          <img
                            src={API_BASE_URL + imageUrl}
                            className={buttonVariants({
                              variant: "outline",
                              className: "!p-0 w-10 h-10 my-2 object-cover",
                            })}
                          />
                        }
                        content={
                          <img
                            className="h-full"
                            src={API_BASE_URL + imageUrl}
                          />
                        }
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {videosUrls.map((videoUrl) => (
                      <RhfDialog
                        trigger={
                          <Video
                            className={buttonVariants({
                              variant: "outline",
                              className: "!p-1 w-10 h-10",
                            })}
                          />
                        }
                        content={
                          <video
                            controls
                            className="container rounded-lg object-contain h-full max-w-[75vw]"
                            poster="/placeholder.svg?height=300&width=400"
                          >
                            <source
                              src={API_BASE_URL + videoUrl}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        }
                      />
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-2">
                  <Link
                    to={"/action-product/" + _id}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <Pen />
                  </Link>

                  <DeleteDialog
                    id={_id}
                    deleteFn={mutate}
                    isLoading={isPending}
                  />
                </CardFooter>
              </Card>
            )
          )}

        {data?.data.length === 0 && <NoData />}
      </div>

      {data?.data.length !== 0 && (
        <div className="flex justify-between">
          <Button
            variant={"outline"}
            onClick={() => setValue("page", values.page + 1)}
            disabled={!data?.hasPreviousPage}
          >
            Before
          </Button>
          <p>{values.page}</p>
          <Button
            variant={"outline"}
            onClick={() => setValue("page", values.page + 1)}
            disabled={!data?.hasNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Product;

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
import among from "@/assets/among.jpg";
import CardText from "@/components/card-text";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "@/api/axios";
import { Pen } from "lucide-react";

const Product = () => {
  const { data, isLoading } = getProductsQuery();
  const { mutate, isPending } = deleteProductsQuery();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex gap-8 flex-col justify-end">
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

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {data?.data.length !== 0 &&
          data?.data.map(
            ({
              _id,
              title,
              description,
              logoUrl,
              price,
              weight,
              // productType,
              imagesUrls,
            }) => (
              <Card key={_id}>
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
                  <div className="flex gap-2">
                    {imagesUrls.map((imageUrl) => (
                      <Dialog>
                        <DialogTrigger className="p-0 mt-2">
                          <img
                            src={API_BASE_URL + imageUrl}
                            className={buttonVariants({
                              variant: "outline",
                              className: "!p-0",
                            })}
                          />
                        </DialogTrigger>
                        <DialogContent>
                          <img src={API_BASE_URL + imageUrl} />
                        </DialogContent>
                      </Dialog>
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
    </div>
  );
};

export default Product;

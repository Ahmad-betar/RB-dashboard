import { FormProvider, useForm } from "react-hook-form";
import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import Title from "@/components/title";
import { CartFiltersType } from "@/api/cutomer-cart/type";
import CartFilters from "./customer-filter";
import CartItemCard from "./cart-item-card";
import CartTotal from "./total-card";
import { getCustomerCartQuery } from "@/api/cutomer-cart/customer-cart-query";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

const Cart = () => {
  const methods = useForm<CartFiltersType>();
  const { data, isLoading } = getCustomerCartQuery(methods.watch());

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4 mx-auto p-4">
        <Link
          to={"/add-cart"}
          className={buttonVariants({
            variant: "outline",
            className: "w-fit ml-auto",
          })}
        >
          + Add to cart
        </Link>

        <Title title="Cart" />

        <CartFilters />

        {isLoading && <LoadingSpinner />}

        {data?.data.cart.length === 0 && !isLoading ? (
          <NoData />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data?.data.cart.map((item) => (
                <CartItemCard key={item._id} item={item} />
              ))}
            </div>

            {data?.data.cart.length !== 0 && !isLoading && (
              <div>
                <CartTotal totalPrice={data?.data.totalPrice || 0} />
              </div>
            )}

            <Link to={''}>
            </Link>
          </>
        )}
      </div>
    </FormProvider>
  );
};

export default Cart;

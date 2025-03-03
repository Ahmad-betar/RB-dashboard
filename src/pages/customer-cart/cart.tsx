import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import Title from "@/components/title";
import CartTable from "./cart-table";
import CartTotal from "./total-card";
import { getCustomerCartQuery } from "@/api/cutomer-cart/customer-cart-query";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

const Cart = () => {
  const { data, isLoading } = getCustomerCartQuery();

  return (
    <div className="flex flex-col gap-4 mx-auto p-4">
      <div className="flex justify-end gap-4">
        <Link
          to={"temp-orders"}
          className={buttonVariants({
            variant: "outline",
            className: "w-fit",
          })}
        >
          Temp Orders
        </Link>
        <Link
          to={"/add-cart"}
          className={buttonVariants({
            variant: "outline",
            className: "w-fit",
          })}
        >
          + Add to cart
        </Link>
      </div>

      <Title title="Cart" />

      {isLoading && <LoadingSpinner />}

      {data?.data.cart.length === 0 && !isLoading ? (
        <NoData />
      ) : (
        <>
          <div className="overflow-x-auto">
            <CartTable data={data?.data.cart || []} />
          </div>

          {data?.data.cart.length !== 0 && (
            <div>
              <CartTotal totalPrice={data?.data.totalPrice || 0} />
            </div>
          )}

          <Link to={"/admin-order"} className={buttonVariants()}>
            Order
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;

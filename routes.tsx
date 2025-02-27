import LoadingSpinner from "@/components/loading";
import { Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";

const Routes = () => {
  const Customers = lazy(() => import("@/pages/customer/customer"));
  const Orders = lazy(() => import("@/pages/orders/orders"));
  const Order = lazy(() => import("@/pages/orders/order-datail"));
  const State = lazy(() => import("@/pages/state/state"));
  const Governorate = lazy(() => import("@/pages/governorate/governorate"));
  const City = lazy(() => import("@/pages/city/city"));
  const Coupon = lazy(() => import("@/pages/coupon/coupon"));
  const AddCoupon = lazy(() => import("@/pages/coupon/add-coupon"));
  const Product = lazy(() => import("@/pages/product/product"));
  const ActionProduct = lazy(() => import("@/pages/product/action-product"));
  const ProductType = lazy(() => import("@/pages/product-type/product-type"));
  const AddProductType = lazy(
    () => import("@/pages/product-type/add-product-type")
  );
  const ChildrenProductType = lazy(
    () => import("@/pages/product-type/children-product-type")
  );
  const Operator = lazy(() => import("@/pages/operator/operators"));
  const AddOperator = lazy(() => import("@/pages/operator/add-operator"));

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReactRoutes>
        <Route path="/" element={<>dsfsadf</>} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/operators" element={<Operator />} />
        <Route path="/add-operator" element={<AddOperator />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/state" element={<State />} />
        <Route path="/state/:id" element={<Governorate />} />
        <Route path="/state/:id/:GovernorateId" element={<City />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/add-coupon" element={<AddCoupon />} />
        <Route path="/products" element={<Product />} />
        <Route path="/action-product" element={<ActionProduct />} />
        <Route path="/action-product/:id" element={<ActionProduct />} />
        <Route path="/product-type" element={<ProductType />} />
        <Route path="/add-product-type" element={<AddProductType />} />
        <Route path="/product-type/:id" element={<ChildrenProductType />} />
      </ReactRoutes>
    </Suspense>
  );
};

export default Routes;

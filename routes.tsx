import LoadingSpinner from "@/components/loading";
import { Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";

const Routes = () => {
  const Customers = lazy(() => import("@/pages/customer/customer"));
  const Orders = lazy(() => import("@/pages/orders/orders"));
  const Order = lazy(() => import("@/pages/orders/order-datail"));
  const AdminOrder = lazy(
    () => import("@/pages/customer-cart/order/admin-order")
  );
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
  const CustomerCart = lazy(() => import("@/pages/customer-cart/cart"));
  const TempOrders = lazy(
    () => import("@/pages/customer-cart/order/temp-orders")
  );
  const TempOrder = lazy(
    () => import("@/pages/customer-cart/order/temp-order")
  );
  const AddCart = lazy(() => import("@/pages/customer-cart/add-cart"));
  const Offer = lazy(() => import("@/pages/offer/offer"));
  const AddOffer = lazy(() => import("@/pages/offer/add-offer"));
  const EditOffer = lazy(() => import("@/pages/offer/edit-offer"));
  const ViewOffer = lazy(() => import("@/pages/offer/view-offer"));
  const EditOfferProduct = lazy(() => import("@/pages/offer/edit-products"));
  const Banner = lazy(() => import("@/pages/banner/banner"));
  const Popular = lazy(() => import("@/pages/popular/popular"));
  const AddPopular = lazy(() => import("@/pages/popular/add-popular"));
  const Messages = lazy(() => import("@/pages/messages/messages"));

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReactRoutes>
        <Route path="/" element={<>dsfsadf</>} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customer-cart">
          <Route index element={<CustomerCart />} />
          <Route path="temp-orders">
            <Route index element={<TempOrders />} />
            <Route path=":id" element={<TempOrder />} />
          </Route>
        </Route>
        <Route path="/add-cart" element={<AddCart />} />
        <Route path="/operators" element={<Operator />} />
        <Route path="/add-operator" element={<AddOperator />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/admin-order" element={<AdminOrder />} />
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
        <Route path="/offer" element={<Offer />} />
        <Route path="/offer/:id" element={<EditOffer />} />
        <Route path="/offer/view/:id" element={<ViewOffer />} />
        <Route path="/add-offer" element={<AddOffer />} />
        <Route path="offer/edit-product/:id" element={<EditOfferProduct />} />
        <Route path="/banner" index element={<Banner />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/add-popular" element={<AddPopular />} />
        <Route path="/messages" element={<Messages />} />
      </ReactRoutes>
    </Suspense>
  );
};

export default Routes;

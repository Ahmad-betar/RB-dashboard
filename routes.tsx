import LoadingSpinner from "@/components/loading";
import { Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";

const Routes = () => {
  const State = lazy(() => import("@/pages/state/state"));
  const Governorate = lazy(() => import("@/pages/governorate/governorate"));
  const City = lazy(() => import("@/pages/city/city"));
  const Coupon = lazy(() => import("@/pages/coupon/coupon"));

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReactRoutes>
        <Route path="/" element={<>dsfsadf</>} />
        <Route path="/state" element={<State />} />
        <Route path="/state/:id" element={<Governorate />} />
        <Route path="/state/:id/:GovernorateId" element={<City />} />
        <Route path="/coupon" element={<Coupon />} />
      </ReactRoutes>
    </Suspense>
  );
};

export default Routes;

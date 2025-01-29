import LoadingSpinner from "@/components/loading";
import React from "react";
import { Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route
        path="/"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <>dsfsadf</>
          </Suspense>
        }
      />
    </ReactRoutes>
  );
};

export default Routes;

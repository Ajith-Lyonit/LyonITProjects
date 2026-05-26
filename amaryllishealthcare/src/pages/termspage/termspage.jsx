import { Suspense, lazy } from "react";

const AMTerms = lazy(() => import("../../features/terms/components/am-terms"));

export const AMTermsPage = () => {
  return (
    <div className="bounce-div">

      <Suspense fallback={<div>Loading terms...</div>}>
        <AMTerms />
      </Suspense>


    </div>
  );
};

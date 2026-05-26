import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";

const AMSolutionList = lazy(() =>
  import("../../features/solution/components/am-solution").then((m) => ({
    default: m.AMSolutionList,
  }))
);

export const SolutionPage = () => {
  const location = useLocation();

  return (
    <div className="bounce-div">

      <Suspense fallback={<div>Loading solution list...</div>}>
        <AMSolutionList item={location.state} />
      </Suspense>

    </div>
  );
};

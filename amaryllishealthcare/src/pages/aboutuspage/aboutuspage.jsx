import { Suspense, lazy } from "react";
const AMAAboutUs = lazy(() =>
  import("../../features/aboutus/components/am-aboutus").then((m) => ({
    default: m.AMAAboutUs,
  }))
);

export const AMAboutusPage = () => {
  return (
    <div className="bounce-div">

      <Suspense fallback={<div>Loading content...</div>}>
        <AMAAboutUs />
      </Suspense>
    </div>
  );
};

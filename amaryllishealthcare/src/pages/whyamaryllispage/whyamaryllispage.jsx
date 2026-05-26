import { Suspense, lazy } from "react";

const AMWhyAmaryllisCover = lazy(() =>
  import("../../features/whyamaryllis/am-whyamaryllis")
);

export const AMWhyAmaryllisCoverPage = () => {
  return (
    <div className="bounce-div">
      <Suspense fallback={<div>Loading content...</div>}>
        <AMWhyAmaryllisCover />
      </Suspense>
    </div>
  );
};

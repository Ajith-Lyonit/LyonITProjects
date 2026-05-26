import { Suspense, lazy } from "react";
import { useLocation, useParams } from "react-router-dom";

const AMProducts = lazy(() =>
  import("../../features/product/components/am-prod-page").then((m) => ({
    default: m.AMProducts,
  }))
);

export const ProdPage = () => {
  const location = useLocation();
  const { type, id } = useParams();
  return (
    <div className="bounce-div">

      <Suspense fallback={<div>Loading products...</div>}>
        <AMProducts
          breadmap={location.pathname}
          id={id}
          type={type}
          item={location.state}
        />
      </Suspense>

    </div>
  );
};

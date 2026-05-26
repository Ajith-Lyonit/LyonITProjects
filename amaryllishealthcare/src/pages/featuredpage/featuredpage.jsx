import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";

const AMFeaturedProd = lazy(() =>
    import("../../features/featured/featured").then((m) => ({
        default: m.AMFeaturedProd,
    }))
);

export const FeaturedProdPage = () => {
    const location = useLocation();

    return (
        <div className="bounce-div">

            <Suspense fallback={<div>Loading featured product...</div>}>
                <AMFeaturedProd id={location.pathname} item={location.state} />
            </Suspense>

        </div>
    );
};

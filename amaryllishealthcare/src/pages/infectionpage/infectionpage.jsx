import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";

const AMInfectionProd = lazy(() =>
    import("../../features/infectionp/components/am-infect-prod").then((m) => ({
        default: m.AMInfectionProd,
    }))
);

export const InfectionPage = () => {
    const itemHeadLoc = useLocation();

    return (
        <div className="bounce-div">
            <Suspense fallback={<div>Loading infection products...</div>}>
                <AMInfectionProd item={itemHeadLoc.state} />
            </Suspense>
        </div>
    );
};

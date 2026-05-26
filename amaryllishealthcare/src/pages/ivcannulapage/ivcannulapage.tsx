import { Suspense, lazy } from "react";

const AMIVCannula = lazy(() =>
    import("../../features/ivcannula/ivcannula").then((m) => ({
        default: m.AMIVCannula,
    }))
);

export const IVCannulaPage = () => {
    return (
        <div className="bounce-div">

            <Suspense fallback={<div>Loading IV Cannula content...</div>}>
                <AMIVCannula />
            </Suspense>

        </div>
    );
};

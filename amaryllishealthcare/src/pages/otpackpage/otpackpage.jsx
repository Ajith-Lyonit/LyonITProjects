import { Suspense, lazy } from "react";

const AMDOTPack = lazy(() =>
    import("../../features/otpack/otpack").then((m) => ({
        default: m.AMDOTPack,
    }))
);

export const OTPackPage = () => {
    return (
        <div className="bounce-div">

            <Suspense fallback={<div>Loading OT Pack content...</div>}>
                <AMDOTPack />
            </Suspense>

        </div>
    );
};

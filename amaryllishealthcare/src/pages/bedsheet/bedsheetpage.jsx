import { Suspense, lazy } from "react";
const AMBedsheet = lazy(() =>
    import("../../features/bedsheet/bedsheet").then((m) => ({
        default: m.AMBedsheet,
    }))
);

export const BedSheetPage = () => {
    return (
        <div className="bounce-div">
            <Suspense fallback={<div>Loading bedsheet content...</div>}>
                <AMBedsheet />
            </Suspense>
        </div>
    );
};

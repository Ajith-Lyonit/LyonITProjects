import { Suspense, lazy } from "react";

const AMCareers = lazy(() =>
    import("../../features/careers/components/am-careers").then((m) => ({
        default: m.AMCareers,
    }))
);

export const AMCareerPage = () => {
    return (
        <div className="bounce-div">
            <Suspense fallback={<div>Loading careers...</div>}>
                <AMCareers />
            </Suspense>
        </div>
    );
};

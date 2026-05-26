import { Suspense, lazy } from "react";

const AMPrivacy = lazy(() =>
    import("../../features/privacy/components/am-privacy").then((m) => ({
        default: m.AMPrivacy,
    }))
);

export const AMPrivacyPage = () => {
    return (
        <div className="bounce-div">

            <Suspense fallback={<div>Loading privacy content...</div>}>
                <AMPrivacy />
            </Suspense>
        </div>
    );
};

import { Suspense, lazy } from "react";

const AMDisposableGown = lazy(() =>
    import("../../features/disposablegown/disposablegown").then((m) => ({
        default: m.AMDisposableGown,
    }))
);

export const DisposablePage = () => {
    return (
        <div className="bounce-div">

            <Suspense fallback={<div>Loading Disposable gown content...</div>}>
                <AMDisposableGown />
            </Suspense>

        </div>
    );
};

import { Suspense, lazy } from "react";

const AMConSupportForm = lazy(() =>
    import("../../features/contact/components/am-consupport").then((m) => ({
        default: m.AMConSupportForm,
    }))
);
const AmContactInit = lazy(() =>
    import("../../features/contact/components/am-contact-init").then((m) => ({
        default: m.AmContactInit,
    }))
);

const AMContactInfo = lazy(() =>
    import("../../features/contact/components/am-contact-info").then((m) => ({
        default: m.AMContactInfo,
    }))
);

export const ConSupportPage = () => {
    return (
        <div className="bounce-div">

            <Suspense fallback={<div>Loading init...</div>}>
                <AmContactInit />
            </Suspense>

            <Suspense fallback={<div>Loading init...</div>}>
                <AMContactInfo />
            </Suspense>
            <Suspense fallback={<div>Loading contact form...</div>}>
                <AMConSupportForm />
            </Suspense>
        </div>
    );
};

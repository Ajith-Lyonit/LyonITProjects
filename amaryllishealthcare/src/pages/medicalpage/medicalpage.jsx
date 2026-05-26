import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";


const AMMedico = lazy(() =>
    import("../../features/medical/components/am-medico").then((m) => ({
        default: m.AMMedico,
    }))
);

export const MedicalPage = () => {
    const location = useLocation();

    return (
        <div className="bounce-div">

            <Suspense fallback={<div>Loading medical content...</div>}>
                <AMMedico id={location.pathname} item={location.state} />
            </Suspense>

        </div>
    );
};

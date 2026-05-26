import { Suspense, lazy } from "react";

// Lazy-load the main content
const AMPatientGown = lazy(() =>
  import("../../features/patientgown/am-patientgown").then((m) => ({
    default: m.AMPatientGown,
  }))
);

export const PatientGownPage = () => {
  return (
    <div className="bounce-div">
      <Suspense fallback={<div>Loading patient gown content...</div>}>
        <AMPatientGown />
      </Suspense>

    </div>
  );
};

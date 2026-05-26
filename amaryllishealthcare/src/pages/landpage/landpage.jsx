import { lazy, Suspense } from "react";

const AMHeroBanner = lazy(() => import('../../features/land/components/am-hero-banner'));
const AMWhy = lazy(() => import('../../features/land/components/am-why'));

const AMInfection = lazy(() => import('../../features/land/components/am-infection-cat'));
const AMMedical = lazy(() => import('../../features/land/components/am-medical'));
const AMSolutionMain = lazy(() => import('../../features/land/components/am-solution-main'));
const AMSolutionCaps = lazy(() => import('../../features/land/components/am-solution'));
const AMFeatureProd = lazy(() => import('../../features/land/components/am-featured-prod'));
const AMWhyChooseUs = lazy(() => import('../../features/land/components/am-why-choose-us'));
const AMBlogs = lazy(() => import('../../features/land/components/am-blogs'));

export const LandPage = () => {
  return (
    <div className="bounce-div">

      <Suspense fallback={<div className="p-6">Loading banner...</div>}>
        <AMHeroBanner />
      </Suspense>

      <Suspense fallback={null}>
        <AMWhy />
      </Suspense>

      <Suspense fallback={null}>
        <AMInfection />
        <AMMedical />
        <AMSolutionMain />
        <AMSolutionCaps />
        <AMFeatureProd />
        <AMWhyChooseUs />
        <AMBlogs />
      </Suspense>
    </div>
  );
};

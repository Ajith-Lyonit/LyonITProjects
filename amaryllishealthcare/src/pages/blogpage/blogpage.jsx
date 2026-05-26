import { Suspense, lazy } from "react";

const AMBlogList = lazy(() =>
    import("../../features/blogs/components/am-blogs").then((m) => ({
        default: m.AMBlogList,
    }))
);

export const AMblogs = () => {
    return (
        <div className="bounce-div">

            <Suspense fallback={<div>Loading blogs...</div>}>
                <AMBlogList />
            </Suspense>
        </div>
    );
};

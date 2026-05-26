import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
const AMBlogDetailsPage = lazy(() =>
    import("../../features/blogdet/components/am-blog-details")
);
const AMBlogs = lazy(() =>
    import("../../features/land/components/am-blogs")
);

const AMBlogDetPage = () => {
    const location = useLocation();
    const rawId = decodeURIComponent(location.pathname.split("/")[2]);

    return (
        <div className="bounce-div">

            <Suspense fallback={<div>Loading blog details...</div>}>
                <AMBlogDetailsPage id={rawId} item={location.state} />
            </Suspense>

            <Suspense fallback={<div>Loading related blogs...</div>}>
                <AMBlogs />
            </Suspense>
        </div>
    );
};

export default AMBlogDetPage;

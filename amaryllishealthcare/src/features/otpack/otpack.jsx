import React, { Suspense, useMemo, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import apiservice from "../../api/apiservice";
import useDeviceType from "../../custom-hooks/userDevice";
import ReadMoreWrapper from "../../components/am-pragraph-readmore";
import { SEOTypeContentKey } from "../../constants/config";

const AmMedCard = lazy(() => import("../../components/am-med-card"));

export const AMDOTPack = () => {
    const responsiveCheck = useDeviceType();

    const { data: otpack = [], error, isLoading } = useQuery({
        queryKey: ["otpackDet"],
        queryFn: async () => {
            const res = await apiservice.fetchMedicalDevices("Surgical Packs");
            return res.data.filter((device) =>
                device?.AMD_Title?.toLowerCase().includes("pack")
            );
        },
    });

    const {
        data: seoData,
        error: seoError,
        isLoading: seoIsLoading,
    } = useQuery({
        queryKey: ["seoContentsDetails"],
        queryFn: () =>
            apiservice.fetchSeoContentsByType(
                SEOTypeContentKey.AMDB_OT_PACK
            ),
    });

    const bannerStyle = useMemo(() => ({
        height: responsiveCheck === "mobile" ? "17.5rem" : "10rem",
        backgroundSize: responsiveCheck === "mobile" ? "cover" : "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        objectFit: "cover",
        width: "100%",
        backgroundColor: "#309ECA",
        position: "relative",
    }), [responsiveCheck]);

    if (isLoading) return <div></div>;
    if (error) return <div>No products available.</div>;

    const renderNode = (node) => {
        if (!node) return null;
        switch (node.type) {
            case 'paragraph':
                return (
                    <p style={{ marginBottom: '0.5rem' }}>
                        {node.children.map((child, index) => renderNode(child, index))}
                    </p>
                );
            case 'heading':
                const HeadingTag = `h${node.level}`;
                return (
                    <HeadingTag style={{ fontSize: responsiveCheck === "mobile" ? '0.8rem' : '1.8rem' }}>
                        {node.children.map((child, index) => renderNode(child, index))}
                    </HeadingTag>
                );
            case 'list':
                const ListTag = node.format === 'unordered' ? 'ul' : 'ol';
                return (
                    <ListTag>
                        {node.children.map((child, index) => renderNode(child, index))}
                    </ListTag>
                );
            case 'list-item':
                return (
                    <li>
                        {node.children.map((child, index) => renderNode(child, index))}
                    </li>
                );
            case 'link':
                return (
                    <a
                        href={node.url}
                        target="_blank"
                        className="fw-light"
                        rel="noopener noreferrer"
                        style={{ fontSize: responsiveCheck === "mobile" ? '0.5rem' : '1rem' }}
                    >
                        {node.children && node.children.map((child, index) => renderNode(child, index))}
                    </a>
                );
            case 'text':
                return node.bold ? <strong>{node.text}</strong> : node.text;
            default:
                return null;
        }
    };


    return (
        <>
            {/* Breadcrumb */}
            {responsiveCheck !== "mobile" && (
                <div className="container-fluid am-career-bredcrump">
                    <Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link>
                    &nbsp;<i className="fa-solid fa-angle-right"></i>&nbsp;
                    <span>OT Packs</span>
                </div>
            )}

            {/* Banner */}
            <div className="container-fluid am-prod-bg" style={bannerStyle}>
                <span
                    className="fw-bold text-white"
                    style={{ top: "3rem", position: "absolute", fontSize: "2.5rem" }}
                >
                    OT Packs
                </span>
            </div>

            {/* Products */}
            <div className="container-fluid py-3">
                {responsiveCheck === "mobile" && <span className="fw-bold">OT Packs</span>}
                <div className="row">
                    {otpack.map((product) => (
                        <div
                            className={`${responsiveCheck === "mobile" ? "col-6" : "col-lg-2"} py-3`}
                            key={product.id}
                        >
                            <Suspense fallback={<div></div>}>
                                <AmMedCard
                                    spaceType="LAND_PAGE"
                                    breadlink="Infection Prevention Division"
                                    item={product}
                                />
                            </Suspense>
                        </div>
                    ))}
                </div>
            </div>

            {/* ReadMore Section */}
            <div className="container-fluid">
                <ReadMoreWrapper>
                    {seoData?.data[0]?.AMD_SEOTitleContent?.map((node, index) => (
                        <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                    ))}
                </ReadMoreWrapper>
            </div>
        </>
    );
};

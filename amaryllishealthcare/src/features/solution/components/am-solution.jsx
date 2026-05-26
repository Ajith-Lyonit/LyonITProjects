import React, { lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiservice, { apiurl } from "../../../api/apiservice";
import { useQuery } from "@tanstack/react-query";
import useDeviceType from "../../../custom-hooks/userDevice";
import { Helmet } from "react-helmet";
import ReadMoreWrapper from "../../../components/am-pragraph-readmore";

const AmMedCard =  lazy(() => import("../../../components/am-med-card"));
export const AMSolutionList = ({ item }) => {
    const responsiveCheck = useDeviceType();
    const [products, setProducts] = useState([]);
    const [groupedData, setGroupedData] = useState({});

    const { data, error, isLoading } = useQuery({
        queryKey: ["prodDetails"],
        queryFn: () => apiservice.fetchAllProducts(),
    });

    const solName = location.pathname.split("/").filter(Boolean).pop();

    const {
        data: solData,
        error: solError,
        isLoading: solIsLoading,
    } = useQuery({
        queryKey: ["solDetails", solName],
        queryFn: () => apiservice.fetchSolutionKitsDetailsByName(solName),
        enabled: !!solName,
    });

    useEffect(() => {
        if (data && solData?.data[0]?.AMD_SolType) {
            const solType = solData?.data[0].AMD_SolType;
            const catData = data?.data || [];
            const groupedData = catData.reduce((acc, product) => {
                if (product.AMD_ProductType) {
                    const parts = product.AMD_ProductType.replace(/\s+/g, "").split("_");
                    const key = parts.length > 1 ? parts[0] + " " + parts[1] : null;
                    if (key && product.AMD_ProductType.includes(solType)) {
                        if (!acc[key]) acc[key] = [];
                        acc[key].push(product);
                    }
                }
                return acc;
            }, {});

            setGroupedData(groupedData);
            setProducts(catData);
        }
    }, [data, solData]);

    const checkCaseHeading = (node) => {
        switch (node) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;

            default:
                return 5;
        }
    }

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
                const HeadingTag = `h${checkCaseHeading(node.level)}`;
                return (
                    <HeadingTag>
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
                const urls = node.url.split(/\s+/);
                return (
                    <div>
                        {urls.map((url, index) => (
                            <React.Fragment key={index}>
                                <a style={{ fontSize: responsiveCheck === "mobile" && '0.5rem' }} href={url} target="_blank" rel="noopener noreferrer">
                                    {url}
                                </a>
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                );
            case 'text':
                return node.bold ? <strong>{node.text}</strong> : node.text;
            default:
                return null;
        }
    };

    if (isLoading || solIsLoading) return <div></div>;

    if (error || solError) return <p>Error loading data</p>;

    return (
        <>
            <Helmet>
                <title>{solData?.data[0]?.AMD_MetaTitle}</title>
                <meta name="robots" content="index, follow" />
                <meta name="description" content={`${solData?.data[0]?.AMD_MetaDescription}`} />
                <link rel="canonical" href={`https://www.amaryllishealthcare.com/solutioncapabilities/${solName}`} />
            </Helmet>
            {
                item !== null ? (
                    <>
                        {responsiveCheck !== "mobile" && <div className="container-fluid am-career-bredcrump">
                            <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>Solutions - Capabilities Served</span>
                        </div>}
                        <div className="container-fluid am-prod-bg"
                            style={{
                                backgroundImage: `url(${responsiveCheck !== "mobile" ? apiurl + solData?.data[0]?.AMD_SolDeskBanner?.url : apiurl + solData?.data[0]?.AMD_SolMobileBanner?.url})`,
                                backgroundSize: 'cover',
                                width: '100%',
                                height: responsiveCheck !== "mobile" ? '10rem' : '17.5rem'
                            }}>
                        </div>
                        <div className="container-fluid mt-5 am-section-cont">
                            <div className="row">
                                {groupedData !== undefined && groupedData !== null && Object.keys(groupedData).length > 0 ? (
                                    Object.keys(groupedData).map((group) => (
                                        <div key={group} className="col-12 mb-4">
                                            <h3 className={`${responsiveCheck === "mobile" ? 'fw-bold' : ''}`}>{group}</h3>
                                            <div className="row">
                                                {groupedData[group].map((product) => (
                                                    <div className={`${responsiveCheck === "mobile" ? "col-6" : "col-lg-2"} mb-5`} key={product.id}>
                                                        <AmMedCard breadtype={'G'} breadlink={undefined} key={product.id} item={product} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No products available.</div>
                                )}
                            </div>
                        </div>
                        <div className="container-fluid">
                            {item?.AMD_SOLContentDetail !== null && item?.AMD_SOLContentDetail !== "" && (
                                <div className="p-2">
                                    <ReadMoreWrapper>
                                        {item?.AMD_SOLContentDetail?.map((node, index) => (
                                            <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                                        ))}
                                    </ReadMoreWrapper>
                                </div>
                            )}
                        </div>
                    </>
                ) : (<>
                    <div className="container-fluid am-prod-sol-bg"
                        style={{
                            backgroundImage: `url(${responsiveCheck !== "mobile" ? apiurl + solData?.data[0]?.AMD_SolDeskBanner?.url : apiurl + solData?.data[0]?.AMD_SolMobileBanner?.url})`,
                            backgroundSize: 'cover',
                            width: '100%',
                            height: responsiveCheck !== "mobile" ? '10rem' : '17.5rem'
                        }}>
                    </div>
                    <div className="container-fluid mt-5">
                        <div className="row">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div className="col-lg-2 mb-5" key={product.id}>
                                        <AmMedCard key={product.id} item={product} />
                                    </div>
                                ))
                            ) : (
                                <div>No products available.</div>
                            )}
                        </div>
                    </div>
                    <div className="container-fluid">
                        {item?.AMD_SOLContentDetail !== null && item?.AMD_SOLContentDetail !== "" && (
                            <div className="p-2">
                                <ReadMoreWrapper>
                                    {item?.AMD_SOLContentDetail?.map((node, index) => (
                                        <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                                    ))}
                                </ReadMoreWrapper>
                            </div>
                        )}
                    </div>
                </>)
            }
        </>
    )
}
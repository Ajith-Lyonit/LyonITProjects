import React, { useState, useEffect, lazy } from "react";
import apiservice, { apiurl } from "../../../api/apiservice";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useDeviceType from "../../../custom-hooks/userDevice";
import { ProductCategoryStates } from "../../../dvalues/data";
import { useRecoilValue } from "recoil";
import { Helmet } from "react-helmet";
import ReadMoreWrapper from "../../../components/am-pragraph-readmore";

const AmMedCard = lazy(() => import("../../../components/am-med-card"));
export const AMProducts = ({ item, medicaldevice, breadmap, type }) => {
    const responsiveCheck = useDeviceType()
    const [products, setProducts] = useState([]);
    const [bgUrl, setBgUrl] = useState("")
    const [catDetails, setCatDetails] = useState(null);
    const breadmapValue = breadmap.trim().split("/").slice(2, 3)
    const cats = useRecoilValue(ProductCategoryStates)
    const catFormattedName = type
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    const { data, error, isLoading } = useQuery({
        queryKey: ['procategoryDetails', catFormattedName],
        queryFn: () => apiservice.fetchProductsByCatId(item === undefined || null ? medicaldevice === undefined || null ? catFormattedName : catFormattedName : catFormattedName),
    });
    const renderNode = (node) => {
        if (!node) return null;

        switch (node.type) {
            case 'paragraph':
                return (
                    <p style={{ marginBottom: '1rem' }}>
                        {node.children.map((child, index) => renderNode(child, index))}
                    </p>
                );
            case 'heading':
                const HeadingTag = `h${node.level}`;
                return (
                    <HeadingTag style={{ fontSize: responsiveCheck === "mobile" ? '1.2rem' : '1.8rem' }}>
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
                        style={{ fontSize: responsiveCheck === "mobile" ? '.9rem' : '1rem' }}
                    >
                        {node.children && node.children.map((child, index) => renderNode(child, index))}
                    </a>
                );
            case 'text':
                return node.bold ? <strong>{node.text}</strong> : node.text;
            case 'html':
                return (
                    <div
                        dangerouslySetInnerHTML={{ __html: node.text || node.value }}
                    />
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        if (data) {
            const findCatItem = cats.find((item) => item.AMD_CatTitle === catFormattedName)
            setCatDetails(findCatItem);
            const bgImg = responsiveCheck === "mobile" ? findCatItem?.AMD_MobileBanner?.url : findCatItem?.AMD_DeskBanner?.url
            setBgUrl(bgImg)
            const catData = data?.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) || [];
            setProducts(catData);
        }
    }, [data, catFormattedName, bgUrl]);

    if (isLoading) {
        return <div></div>;
    }
    if (error) {
        console.error('Error fetching data:', error);
        return <div>Error loading item details: {error.message}</div>;
    }

    return (
        <>
            <Helmet>
                <title>{catDetails !== null ? catDetails?.AMD_MetaTitle : ''}</title>
                <meta name="description" content={catDetails !== null ? catDetails?.AMD_MetaDescription : ''} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://www.amaryllishealthcare.com/infection-prevention-division/${type}`} />
            </Helmet>
            {
                item !== null ? (
                    <>
                        {responsiveCheck !== "mobile" && <div className="container-fluid am-career-bredcrump">
                            <Link to={"/"} className="text-dark text-decoration-none">Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<Link className="text-dark text-decoration-none" to={'/infection-prevention-division'}>Infection Prevention Division</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>{breadmapValue}</span>
                        </div>}
                        <div className="container-fluid am-prod-bg"
                            style={{
                                height: responsiveCheck === "mobile" ? '17.5rem' : '10rem',
                                backgroundSize: responsiveCheck === "mobile" ? 'cover' : 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                objectFit: 'cover',
                                width: '100%',
                                backgroundImage: `url(${apiurl + bgUrl})`,
                            }}
                        >
                        </div>
                        <div className="container-fluid py-3">
                            {responsiveCheck === "mobile" && <span className="fw-bold d-block mb-3">{item?.AMD_CatTitle}</span>}
                            <div className="row">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <div className={`${responsiveCheck === "mobile" ? 'col-6' : 'col-lg-2 py-3'}`} key={product.id}>
                                            <AmMedCard
                                                spaceType={'LAND_PAGE'}
                                                breadlink={`Infection Prevention Division-${item.AMD_CatTitle}`}
                                                key={product.id} item={product} />
                                        </div>
                                    ))
                                ) : (
                                    <div>No products available.</div>
                                )}
                            </div>
                        </div>

                        <div className="container-fluid">
                            <ReadMoreWrapper>
                                {item?.AMD_CategoryDescription?.map((node, index) => (
                                    <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                                ))}
                            </ReadMoreWrapper>
                        </div>
                    </>
                ) : (<>
                    <>
                        {responsiveCheck !== "mobile" && <div className="container-fluid am-career-bredcrump">
                            <Link to={"/"} className="text-dark text-decoration-none">Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<Link className="text-decoration-none text-dark" to={'/infection-prevention-division'} >infection-prevention-ivision</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>{breadmapValue}</span>
                        </div>}
                        <div className="container-fluid am-prod-bg"
                            style={{
                                height: responsiveCheck === "mobile" ? '17.5rem' : '10rem',
                                backgroundSize: responsiveCheck === "mobile" ? 'cover' : 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                objectFit: 'cover',
                                width: '100%',
                                backgroundImage: `url(${apiurl + bgUrl})`,
                            }}
                        >
                        </div>
                        <div className="container-fluid py-3">
                            {responsiveCheck === "mobile" && <span className="fw-bold d-block mb-3">
                            </span>}
                            <div className="row">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <div className={`${responsiveCheck === "mobile" ? 'col-6' : 'col-lg-2 py-3'}`} key={product.id}>
                                            <AmMedCard
                                                spaceType={'LAND_PAGE'}
                                                breadlink={`Infection Prevention Division`}
                                                key={product.id} item={product} />
                                        </div>
                                    ))
                                ) : (
                                    <div>No products available.</div>
                                )}
                            </div>
                        </div>
                        <div className="container-fluid">
                            <ReadMoreWrapper>
                                {data?.data[0]?.category?.AMD_CategoryDescription?.map((node, index) => (
                                    <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                                ))}
                            </ReadMoreWrapper>
                        </div>
                    </>
                </>)
            }
        </>
    );
};

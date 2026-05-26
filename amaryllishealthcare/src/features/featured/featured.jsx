import React, { lazy, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { HomeBannerStates, ProductCategoryStates } from "../../dvalues/data";
import useDeviceType from "../../custom-hooks/userDevice";
import apiservice, { apiurl } from "../../api/apiservice";
import { ReferType, SEOTypeContentKey } from "../../constants/config";
import ReadMoreWrapper from "../../components/am-pragraph-readmore";
const AmMedCard = lazy(() => import("../../components/am-med-card"));


export const AMFeaturedProd = ({ item, id }) => {

    const responsiveCheck = useDeviceType()
    const cats = useRecoilValue(ProductCategoryStates)
    const homeState = useRecoilValue(HomeBannerStates)
    const [medbg, setMedBg] = useState("")
    const [products, setProducts] = useState([]);

    const [localItem, setLocalItem] = useState(
        item ?? { title: "Medical Device-Consumables", type: "M" }
    );

    useEffect(() => {
        if (!item) {
            setLocalItem({ title: "Medical Device-Consumables", type: "M" });
        } else {
            setLocalItem(item);
        }
    }, [item, id]);


    if (!localItem) return null;

    const isMedical = localItem?.type === 'M';
    const finalId = 'Medical Device';
    const { data, error } = useQuery({
        queryKey: [isMedical ? 'medicoDet' : 'featDet', finalId],
        queryFn: () => apiservice.fetchFeaturedProducts(),
        enabled: !!localItem,
    });

    const {
        data: seoData,
        error: seoError,
        isLoading: seoIsLoading,
    } = useQuery({
        queryKey: ["seoContentsDetails"],
        queryFn: () =>
            apiservice.fetchSeoContentsByType(
                SEOTypeContentKey.AMDB_FEATURE_PROD_CONTENT
            ),
    });

    useEffect(() => {
        const featureBg = homeState.find((item) => item.AMD_BannerType === ReferType.AMDB_FEATURED_PRODUCTS)
        if (featureBg !== undefined) {
            const bgFeaImg = responsiveCheck === "mobile" ? featureBg?.AMD_Bannermobile?.url : featureBg?.AMD_Banner?.url
            setMedBg(bgFeaImg)
        }
    }, [cats, homeState, localItem?.type, responsiveCheck])
    useEffect(() => {
        if (data?.data !== null) {
            const medData = data?.data || []
            setProducts(medData);
        }
    }, [data]);

    if (error) {
        console.error('Error fetching data:', error);
        return <div style={{ marginTop: '8rem' }} className="text-center py-5">No products available.</div>;
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
            {
                localItem !== null ? (
                    <>
                        {responsiveCheck !== "mobile" && <div className="container-fluid am-career-bredcrump">
                            <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>Home</Link>&nbsp;<i className="fa-solid fa-angle-right"></i>&nbsp;<span>{localItem.type === 'F' ? 'Featured Products' : 'Medical Device Consumables'}</span>
                        </div>}
                        <div className="container-fluid am-prod-bg"
                            style={{
                                height: responsiveCheck === "mobile" ? '17.5rem' : '10rem',
                                backgroundSize: responsiveCheck === "mobile" ? 'cover' : 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                objectFit: 'cover',
                                width: '100%',
                                backgroundImage: `url(${apiurl + medbg})`,
                            }}
                        >
                        </div>
                        <div className="container-fluid py-3">
                            {responsiveCheck === "mobile" && (
                                <>
                                    (<span className="fw-bold">Featured Products</span>)
                                </>
                            )}
                            <div className="row">
                                {products.map((product) => (
                                    <div className={`${responsiveCheck === 'mobile' ? 'col-6' : 'col-lg-2'} py-3`} key={product.id}>
                                        <AmMedCard linktype={'medical-device-division'} breadtype={localItem.type} key={product.id} item={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="container-fluid">
                            <ReadMoreWrapper>
                                {seoData?.data[0]?.AMD_SEOTitleContent?.map((node, index) => (
                                    <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                                ))}
                            </ReadMoreWrapper>
                        </div>
                    </>
                ) : (<>
                    No Products Available
                </>)
            }
        </>
    )
}
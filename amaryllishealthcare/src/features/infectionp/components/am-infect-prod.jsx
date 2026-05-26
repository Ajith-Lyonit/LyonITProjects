import { AmInfecCard } from "../../../components/am-infec-card";
import { useQuery } from "@tanstack/react-query";
import apiservice, { apiurl } from "../../../api/apiservice";
import React, { lazy, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HomeBannerStates } from "../../../dvalues/data";
import { useRecoilValue } from "recoil";
import { ReferType, SEOTypeContentKey } from "../../../constants/config";
import useDeviceType from "../../../custom-hooks/userDevice";
import ReadMoreWrapper from "../../../components/am-pragraph-readmore";

export const AMInfectionProd = ({ item }) => {
    const responsiveCheck = useDeviceType()
    const [bgImg, setBgImg] = useState("")
    const homeState = useRecoilValue(HomeBannerStates)
    const { data, error, isLoading } = useQuery({
        queryKey: ["catDetails"],
        queryFn: apiservice.fetchCategories,
    });

    const {
        data: seoData,
        error: seoError,
        isLoading: seoIsLoading,
    } = useQuery({
        queryKey: ["seoContentsDetails"],
        queryFn: () =>
            apiservice.fetchSeoContentsByType(
                SEOTypeContentKey.AMDB_INFECTION_PREVENTION
            ),
    });

    useEffect(() => {
        const iItem = homeState.find(
            (item) => item?.AMD_BannerType === ReferType.AMDB_INFECTION_PREVENTION
        );
        const imageUrl =
            responsiveCheck === "mobile"
                ? iItem?.AMD_Bannermobile?.url
                : iItem?.AMD_Banner?.url;
        if (imageUrl && imageUrl !== bgImg) {
            setBgImg(imageUrl);
        }
    }, [homeState, bgImg, responsiveCheck]);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (data) {
            const catData = data["data"];
            const filterByInf = catData.filter(
                (item) => item.AMD_CatTitle !== "Medical Device"
            );
            setCategories(filterByInf);
        }
    }, [data]);

    if (isLoading || seoIsLoading) {
        return <div></div>;
    }

    if (error || seoError) {
        return (
            <div>
                Error loading content: {error?.message || seoError?.message}
            </div>
        );
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
            {responsiveCheck !== "mobile" &&
                <div className="container-fluid am-career-bredcrump">
                    <Link to={"/"} className="text-dark text-decoration-none">Home</Link>&nbsp;&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>Infection Prevention Division</span>
                </div>}
            <div className="container-fluid am-prod-bg"
                style={{
                    height: responsiveCheck === "mobile" ? '16rem' : '10rem',
                    backgroundSize: responsiveCheck === "mobile" ? 'cover' : 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    objectFit: 'cover',
                    width: '100%',
                    backgroundImage: `url(${apiurl + bgImg})`,
                }}>
            </div>
            {responsiveCheck === "mobile" && <p className="ps-4 pt-4 fw-bold">Infection Prevention Product <br /> Categories</p>}
            <div className="container-fluid am-infec-prod-cat mt-4">
                <div className="row">
                    {categories.map(item => (
                        <div className={`${responsiveCheck === "mobile" ? 'col-6' : 'col-lg-4'} mb-4`}>
                            <AmInfecCard key={item} item={item} />
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
    )
}
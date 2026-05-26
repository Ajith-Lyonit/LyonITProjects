import { useQuery } from "@tanstack/react-query";
import apiservice, { apiurl } from "../../../api/apiservice";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useDeviceType from "../../../custom-hooks/userDevice";
import { useRecoilValue } from "recoil";
import { BlogsListStates } from "../../../dvalues/data";
import { Helmet } from "react-helmet";

const AMBlogDetailsPage = ({ item, id }) => {
    const responsiveCheck = useDeviceType()
    const [details, setDetails] = useState(null)
    const blogListValue = useRecoilValue(BlogsListStates)
    const [imgUrl, setImgUrl] = useState(null)

    useEffect(() => {
        const listItem = blogListValue.filter((item) => item.AMD_BlogurlName === id)
        setImgUrl(listItem[0])
    }, [id])

    const fetchBlogDetailByID = useMemo(() => {
        return () => apiservice.fetchBlogDetailByID(id);
    }, [id]);


    const {
        data: blogDetails,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['blogDetailsData', id],
        queryFn: fetchBlogDetailByID,
        enabled: !!id,
    });

    useEffect(() => {
        if (isLoading) {
        } else if (blogDetails) {
            const data = blogDetails?.data[0]
            setDetails(data)
        } else if (error) {
            throw new Error('Error fetching blog details');
        }
    }, [blogDetails, error, isLoading]);

    const processTextWithStrong = (text) => {
        const regex = /\*\*(.*?)\*\*/g;

        const parts = [];
        let lastIndex = 0;
        text.replace(regex, (match, p1, offset) => {
            if (lastIndex < offset) {
                parts.push(text.slice(lastIndex, offset));
            }
            parts.push(<strong key={offset}>{p1}</strong>);
            lastIndex = offset + match.length;
        });

        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts;
    };

    const checkCaseHeading = (node) => {
        switch (node) {
            case 1:
            case 2:
            case 3:
                return 6;

            default:
                return 5;
        }
    }

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


    return (
        <>
            <Helmet>
                <title>{imgUrl?.AMD_MetaTitle}</title>
                <meta name="robots" content="index, follow" />
                <meta name="description" content={`${imgUrl?.AMD_MetaDescription}`} />
                <link rel="canonical" href={`https://www.amaryllishealthcare.com/blogs/${id}`} />
            </Helmet>
            {responsiveCheck !== "mobile" && (
                <div className="container-fluid am-career-bredcrump">
                    <Link to={"/"} className="text-dark text-decoration-none">Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<Link className="text-decoration-none text-dark" to={'/blogs'}>Blogs</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>{imgUrl?.AMD_Title}</span>
                </div>)}
            <div className="container-fluid am-blog-detail-page"
                style={{
                    width: '100%',
                    backgroundImage: `url(${apiurl}${responsiveCheck === "mobile" ? imgUrl?.AMD_BannerMobile?.url : imgUrl?.AMD_Bannerimage?.url})`,
                    height: '18.5rem',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover', backgroundPosition: 'center'
                }}>
                <h1>{imgUrl?.AMD_Title}</h1>
            </div>
            <div className="container am-blog-content-block">
                <div className="am-share-space">
                    <p>{imgUrl?.AMD_BlogListsContent?.length} min read</p>
                    <p></p>
                </div>
                <div className="am-blog-init-desc">
                    <p>{imgUrl?.AMD_SubTitleOne}</p>
                    <p>{imgUrl?.AMD_SubTitleTwo}</p>
                </div>
                <div>
                    {imgUrl?.AMD_Description?.map((node, index) => (
                        <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                    ))}
                </div>
            </div>
            <div className="container am-blog-details-description">
                {details !== null &&
                    <>
                        {details.AMD_BlogListsContent?.length > 0 && (
                            details.AMD_BlogListsContent?.map((blgcont) => (
                                <div className="am-blog-list-start" key={blgcont.id}>
                                    <div className="text-center">
                                        <img
                                            src={`${apiurl}${blgcont?.AMD_BlogImage?.formats?.large?.url}`}
                                            alt=""
                                        />
                                    </div>
                                    {blgcont?.AMD_BlogMainTitle !== null && <>
                                        <h2>{blgcont?.AMD_BlogMainTitle}</h2>
                                        {blgcont?.AMD_BlogSubTitle !== null && <p>{processTextWithStrong(blgcont?.AMD_BlogSubTitle)}</p>}

                                        <div>
                                            {blgcont?.AMD_BlogParagraphs?.map((node, index) => (
                                                <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                                            ))}
                                        </div>
                                    </>}
                                </div>
                            ))
                        )}
                    </>}
            </div>
        </>
    )
}

export default AMBlogDetailsPage
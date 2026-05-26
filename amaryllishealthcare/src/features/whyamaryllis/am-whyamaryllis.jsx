import { Link } from "react-router-dom";
import useDeviceType from "../../custom-hooks/userDevice";
import feci1 from "./img/feci1.png";
import feci2 from "./img/feci2.png";
import feci3 from "./img/feci3.png";
import feci4 from "./img/feci4.png";
import feci5 from "./img/feci5.png";
import { useQuery } from "@tanstack/react-query";
import apiservice from "../../api/apiservice";
import { SEOTypeContentKey } from "../../constants/config";
import ReadMoreWrapper from "../../components/am-pragraph-readmore";
import React from "react";

const AMWhyAmaryllisCover = () => {
    const responsiveCheck = useDeviceType()
    const {
        data: seoData,
        error: seoError,
        isLoading: seoIsLoading,
    } = useQuery({
        queryKey: ["seoContentsDetails"],
        queryFn: () =>
            apiservice.fetchSeoContentsByType(
                SEOTypeContentKey.AMDB_WHY_AMARYLLIS
            ),
    });
    const fecDetails = [
        {
            title: 'Industry Experience',
            description: 'Largest manufacturing facility with 100K+ sqft in India and preferred product partner to 700+ hospitals across India',
            image: feci1
        },
        {
            title: 'Quality',
            description: 'We use medical fabric that meets international standards - AAMI PB 70 (American) & EN 13795 (European) standards',
            image: feci2
        },
        {
            title: 'Flexible Manufacturing',
            description: 'Allows for product customization, as per end-users’ requirements',
            image: feci3
        },
        {
            title: 'Prompt Delivery',
            description: 'Streamlined supply chain to deliver shipments within committed timelines',
            image: feci4
        },
        {
            title: 'Scope for Growth & Future Expansion',
            description: 'Gives access to new innovative surgical products and expanded market opportunities',
            image: feci5
        }
    ]

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

    return (
        <
            >
            {responsiveCheck !== "mobile" &&
                <div className="container-fluid am-career-bredcrump">
                    <Link to={"/"} className="text-dark text-decoration-none">Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>Terms and Conditions</span>
                </div>}
            <div className="am-why-bg-box" style={{
                backgroundImage: 'url("/whybg.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '20rem',
            }}>
                <h1>Why Amaryllis</h1>
            </div>

            <div className="container-fluid my-4 am-why-amaryllisbox">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="text-center">Improving Care, Saving Lives</h1>
                        <p>Amaryllis Healthcare represents over a decade of trusted medical expertise. As India’s largest European CE and ISO 13485 certified manufacturer of surgical gowns, drapes, packs, and medical device consumables, we are humbled to be a preferred partner for leading hospitals across the country - known for our uncompromising quality and reliable service</p>
                    </div>
                </div>
            </div>
            <div>
                <img src="/visionstrip.png" className="img-fluid" alt="" />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 tetx-center">
                        <img src="/certon.jpeg" className="img-fluid" alt="" loading="lazy" />
                        <h2 className="text-center">CE Certified</h2>
                    </div>
                    <div className="col-lg-6 tetx-center">
                        <img src="/certtwo.jpeg" className="img-fluid" alt="" loading="lazy" />
                        <h2 className="text-center">ISO Certified</h2>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <h3>Our Facilities</h3>
                <div className="row">
                    <div className="col-lg-6">
                        <img src="/oufec1.jpeg" className="img-fluid" alt="" />
                        <h5>Clean Air Room</h5>
                    </div>
                    <div className="col-lg-6">
                        <img src="/oufec2.jpeg" className="img-fluid" alt="" />
                        <h5>Clean Room Corridor</h5>
                    </div>
                    <div className="col-lg-6 my-3">
                        <img src="/oufec3.jpeg" className="img-fluid" alt="" />
                        <h5>Fabric Cutting</h5>
                    </div>
                    <div className="col-lg-6 my-3">
                        <img src="/oufec4.jpeg" className="img-fluid" alt="" />
                        <h5>IV Cannula Assembly</h5>
                    </div>
                </div>
            </div>
            <div className="p-5">
                <img src="/fecilities/bgfec.png" className="img-fluid" alt="" />
            </div>
            <div className="container-fluid">
                <div className="row">
                    {fecDetails.map((item) => (
                        <div className="col">
                            <div className="am-fec-box">
                                <h5>{item.title}</h5>
                                <div className="am-fec-imgbox">
                                    <img src={item.image} className="img-fluid" alt="" />
                                </div>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container-fluid my-4">
                <ReadMoreWrapper>
                    {seoData?.data[0]?.AMD_SEOTitleContent?.map((node, index) => (
                        <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                    ))}
                </ReadMoreWrapper>
            </div>
        </>
    )
}


export default AMWhyAmaryllisCover
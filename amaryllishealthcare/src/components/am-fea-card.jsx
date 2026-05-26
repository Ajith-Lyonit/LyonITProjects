import { Link } from "react-router-dom"
import { apiurl } from "../api/apiservice"
import useDeviceType from "../custom-hooks/userDevice";

export const AMFeatureCard = ({ item }) => {
    const responsiveCheck = useDeviceType()
    const breadtype = 'F';
    const breadlink = undefined;
    const renderTextWithBold = (text) => {
        if (!text) return text;
        const boldedText = text.replace(/\*\*(.*?)\*\*/g, (match, p1) => `<strong>${p1}</strong>`);
        return { __html: boldedText };
    };

    return (
        <div className="am-featured-card">
            <div className="am-feature-img">
                <img src={`${apiurl}${item?.image?.formats?.medium?.url}`} className="rounded" 
                title={item?.image?.name}
                alt={item?.image?.alternativeText} />
            </div>
            <span className="am-feture-calss">New Product</span>
            <div className="am-feature-content p-3">
                <h5 data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={item?.AMD_Title}>
                    {item?.AMD_Title.length > 160 ? item?.AMD_Title.substring(0, 160) + '...' : item?.AMD_Title}
                </h5>
                {responsiveCheck === "mobile" ? (<>
                    <p
                        dangerouslySetInnerHTML={
                            item.AMD_Maindescription !== null && item?.AMD_Maindescription.length > 230
                                ? renderTextWithBold(item?.AMD_Maindescription.substring(0, 300) + "...") // Truncate and bold
                                : renderTextWithBold(item?.AMD_Maindescription) // Bold the whole description
                        }
                    ></p></>) : (<>
                        <p
                            dangerouslySetInnerHTML={
                                item.AMD_Maindescription !== null && item?.AMD_Maindescription.length > 230
                                    ? renderTextWithBold(item?.AMD_Maindescription.substring(0, 253) + "...") // Truncate and bold
                                    : renderTextWithBold(item?.AMD_Maindescription) // Bold the whole description
                            }
                        ></p>
                    </>)}
            </div>
            <Link className="text-dark text-decoration-none p-0 m-0"
                to={`${'/infection-prevention-division'}/${decodeURIComponent(item?.category?.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-').split("_").slice(0, 2).join("-")}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}
            >
                <button className="am-hero-button">
                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                </button>
            </Link>
        </div>
    )
}
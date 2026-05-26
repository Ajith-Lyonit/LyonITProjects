import { Link } from "react-router-dom"
import { apiurl } from "../api/apiservice"
import useDeviceType from "../custom-hooks/userDevice";

const AmMedCard = ({ item, displaytype, breadlink, breadtype, spaceType, linktype }) => {
    const responsiveCheck = useDeviceType()
    const formatContent = (text) => {
        if (!text) return [];
        const lines = text
            .replace(/\n/g, ' ')
            .split(' - ');
        return lines.map((line, index) => {
            const formattedLine = line.trim()
                .replace(/^-/, "")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/_(.*?)_/g, "<em>$1</em>");
            return (
                <p style={{ maxHeight: '4.7rem', overflow: 'hidden' }}
                    key={index}
                    dangerouslySetInnerHTML={{ __html: formattedLine }}
                />
            );
        });
    };
    
    return (
        <div className={`am-medical-card ${(responsiveCheck === "mobile" && spaceType === undefined || spaceType === "") ? "mb-0" : (responsiveCheck === "mobile" && spaceType === "LAND_PAGE") ? "mb-4" : "mb-0"}`}>
            <div className={`am-med-img text-center ${responsiveCheck === "mobile" ? "pt-0" : "pt-2"}`}>
                {displaytype === 'MEDCICAL' ? (
                    <img  src={`${apiurl}${item?.AMD_Displayimage?.url}`} title={item?.image?.formats?.thumbnail?.name} style={{ height: '11rem', width: '12rem', objectFit: 'contain' }} className="img-fluid" alt={item?.image?.alternativeText} />
                ) : (
                    <img src={`${apiurl}${item?.image?.formats?.thumbnail?.url}`} title={item?.image?.formats?.thumbnail?.name} className="img-fluid" alt={item?.image?.alternativeText} />
                )}
            </div>
            {(responsiveCheck === "mobile" && breadtype === "F") ?
                <div className="am-medical" style={{ backgroundColor: 'white' }}>
                    <span>New Product</span>
                    <p className="am-diff-font" data-bs-placement="top"
                        style={{ color: '#222222' }}
                        title={item?.AMD_Title}>
                        {item?.AMD_Title.length > 24 ? item?.AMD_Title.substring(0, 23) + '...' : item?.AMD_Title}</p>
                    <p style={{ color: 'black' }}>{formatContent(item?.AMD_Maindescription)}</p>
                    {responsiveCheck === "mobile" ? (<>
                        {linktype !== "medical-device-division" ? (
                            <Link to={`${'/infection-prevention-division'}/${decodeURIComponent(item.category.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-').split("_").slice(0, 2).join("-")}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}>
                                <button className="am-infec-med-button-second">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button></Link>
                        ) : (
                            <Link to={`/medical-device-division/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}>
                                <button className="am-infec-med-button-second">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button></Link>
                        )
                        }

                    </>) : (<>
                        {formatContent(item?.AMD_Maindescription)}
                        {linktype !== "medical-device-division" ? (
                            <Link to={`${'/infection-prevention-division'}/${decodeURIComponent(item.category.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-').split("_").slice(0, 2).join("-")}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}>
                                <button className="am-infec-med-button-second">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button></Link>
                        ) : (
                            <Link to={`/medical-device-division/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}>
                                <button className="am-infec-med-button-second">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button></Link>
                        )
                        }
                    </>)}
                </div>
                :
                <div className="am-medical">
                    <p className="am-diff-font" data-bs-placement="top"
                        title={item?.AMD_Title}>{item?.AMD_Title.length > 24 ? item?.AMD_Title.substring(0, 23) + '...' : item?.AMD_Title}</p>
                    <p className="text-white">{formatContent(item?.AMD_Maindescription)}</p>
                    {responsiveCheck === "mobile" ? (<>
                        {item?.category?.AMD_CatTitle === "Medical Device" ? (
                            <Link className="text-dark text-decoration-none p-0 m-0"
                                to={`/medical-device-division/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}
                            >
                                <button className="am-infec-med-button-second">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button>
                            </Link>
                        ) : (
                            <Link className="text-dark text-decoration-none p-0 m-0"
                                to={`${'/infection-prevention-division'}/${decodeURIComponent(item?.category?.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-').split("_").slice(0, 2).join("-")}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}
                            >
                                <button className="am-infec-med-button-second">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button>
                            </Link>
                        )}
                    </>) : (<>
                        {formatContent(item?.AMD_Maindescription)}
                         {item?.category?.AMD_CatTitle === "Medical Device" ? (
                            <Link className="text-dark text-decoration-none p-0 m-0"
                                to={`${'/medical-device-division'}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}
                            >
                                <button className="am-infec-med-button">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button>
                            </Link>
                        ) : (
                            <Link className="text-dark text-decoration-none p-0 m-0"
                                to={`${'/infection-prevention-division'}/${decodeURIComponent(item?.category?.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-').split("_").slice(0, 2).join("-")}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}
                            >
                                <button className="am-infec-med-button">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button>
                            </Link>
                        )}
                    </>)}
                </div>
            }
            {responsiveCheck !== "mobile" &&
                <div className="am-medical">
                    <p className="am-diff-font" data-bs-placement="top"
                        title={item?.AMD_Title}>{item?.AMD_Title.length > 24 ? item?.AMD_Title.substring(0, 23) + '...' : item?.AMD_Title}</p>
                    {responsiveCheck === "mobile" ? (<>
                        {item?.category?.AMD_CatTitle === "Medical Device" ? (
                            <Link className="text-dark text-decoration-none p-0 m-0"
                                to={`${'/medical-device-division'}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}
                            >
                                <button className="am-infec-med-button-second">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button>
                            </Link>
                        ) : (
                            <Link className="text-dark text-decoration-none p-0 m-0"
                                to={`${'/infection-prevention-division'}/${decodeURIComponent(item?.category?.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-').split("_").slice(0, 2).join("-")}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}
                            >
                                <button className="am-infec-med-button-second">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button>
                            </Link>
                        )}
                        
                    </>) : (<>
                        <p className="text-white">{formatContent(item?.AMD_Maindescription)}</p>
                        {item?.category?.AMD_CatTitle === "Medical Device" ? (
                            <Link className="text-dark text-decoration-none p-0 m-0"
                                to={`${'/medical-device-division'}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}
                            >
                                <button className="am-infec-med-button">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button>
                            </Link>
                        ) : (
                            <Link className="text-dark text-decoration-none p-0 m-0"
                                to={`${'/infection-prevention-division'}/${decodeURIComponent(item?.category?.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-').split("_").slice(0, 2).join("-")}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}
                            >
                                <button className="am-infec-med-button">
                                    Explore More&nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                                </button>
                            </Link>
                        )}
                    </>)}
                </div>}
        </div>
    )
}

export default AmMedCard
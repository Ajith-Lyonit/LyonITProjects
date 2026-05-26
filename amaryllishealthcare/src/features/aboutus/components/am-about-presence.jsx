import { useEffect, useState } from "react";
import useDeviceType from "../../../custom-hooks/userDevice";

const AMAboutPresence = () => {
    const responsiveCheck = useDeviceType();

    const renderText = (mobile, desktop) => {
        return responsiveCheck === "mobile" ? mobile : desktop;
    };

    return (
        <div className="container-fluid am-about-presence">
            <h3 className="py-3">Our Presence in India</h3>
            <div className="row">
                <div className="col-lg-6">
                   <img src='India.jpeg' style={{mixBlendMode:'multiply'}} alt="India map" loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <div className="am-about-text-margin">
                        <h4>
                            {renderText(
                                "1 Corporate office & 3 Manufacturing plants",
                                <>
                                    1 Corporate office & <br /> 3 Manufacturing plants
                                </>
                            )}
                        </h4>
                        <h4>
                            {renderText(
                                "6 company-owned warehouse",
                                <>
                                    6 company-owned <br /> warehouse
                                </>
                            )}
                        </h4>
                        <h4>5 Regional head offices</h4>
                        <h4>
                            {renderText(
                                "20+ States are covered by our Channel partners",
                                <>
                                    20+ States are covered by <br /> our Channel partners
                                </>
                            )}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AMAboutPresence;
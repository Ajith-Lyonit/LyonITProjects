import useDeviceType from "../../../custom-hooks/userDevice";
import c1 from "../img/c1.png";
import c2 from "../img/c2.png";

export const AMContactInfo = () => {
    const responsiveCheck = useDeviceType()
    return (
<>
            <div className="container-fluid am-co3ntact-info">
                <div className="row d-flex justify-content-center mb-3">
                    <div className="col-lg-6">
                        <div className="am-contac-flex">
                            <img src={c1} className="img-fluid" alt="" />
                            <div className="am-contact-desc">
                                <h6>General Enquires</h6>
                                <p> +91 9169 338 338</p>
                                <p>info@amaryllishealthcare.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="am-contac-flex ">
                            <img src={c2} className="img-fluid" alt="" />
                            <div className={`am-contact-desc ${responsiveCheck === "mobile" ? 'mt-3' : ''}`}>
                                <h6>Corporate Head Office</h6>
                                <span># 301, Lyon Square, 14th 'B' Cross, 7th Main Rd, 6th Sector, HSR Layout, Bengaluru, Karnataka 560102</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
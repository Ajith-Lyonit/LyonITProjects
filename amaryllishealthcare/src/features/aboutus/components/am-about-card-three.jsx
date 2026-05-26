import { Link } from "react-router-dom";
import useDeviceType from "../../../custom-hooks/userDevice";
import { useEffect, useState } from "react";

const AMAboutCardThree = () => {

    const responsiveCheck = useDeviceType();
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");

    useEffect(() => {
        if (responsiveCheck === "mobile") {
            import("../img/cmob1.jpeg").then((mod) => setImage1(mod.default));
            import("../img/cmob2.jpeg").then((mod) => setImage2(mod.default));
        } else {
            import("../img/abl1.jpeg").then((mod) => setImage1(mod.default));
            import("../img/abl2.jpeg").then((mod) => setImage2(mod.default));
        }
    }, [responsiveCheck]);

    return (
        <>
            <div className={`container-fluid ${responsiveCheck === "mobile" ? "mt-5" : " mb-5"}`}>
                <div className="row">
                    <div className="col-lg-6 col-6">
                        <div className="am-card-about-three">
                            {image1 && <img src={image1} className="img-fluid" alt="Careers" loading="lazy" />}
                            {responsiveCheck === "mobile" ? (
                                <Link className="text-dark text-decoration-none" to={'/careers'}><h4>Careers</h4></Link>
                            ) : (
                                <div className="am-card-about-three-cont">
                                    <Link className="text-dark text-decoration-none" to={'/careers'}><h6>Careers</h6></Link>
                                    <Link to={'/careers'}>
                                        <button className="am-three-button">Explore more&nbsp;<i class="fa-solid fa-angle-right"></i></button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-6 col-6">
                        <div className="am-card-about-three">
                            {image2 && <img src={image2} className="img-fluid" alt="Blogs" loading="lazy" />}
                            {responsiveCheck === "mobile" ? (
                                <Link className="text-dark text-decoration-none" to={'/blogs'}><h4>Blogs</h4></Link>
                            ) : (
                                <div className="am-card-about-three-cont">
                                    <Link className="text-dark text-decoration-none" to={'/blogs'}><h6>Blogs</h6></Link>
                                    <Link to={'/blogs'}>
                                        <button className="am-three-button">Explore more&nbsp;<i class="fa-solid fa-angle-right"></i></button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AMAboutCardThree
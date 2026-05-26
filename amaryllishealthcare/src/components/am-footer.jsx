import { Link } from "react-router-dom";
import footerimg from "../features/land/img/footer.jpeg";
import footerloog from "../features/land/img/footerlogo.png";
import { useEffect, useState } from "react";
import apiservice from "../api/apiservice";
import { useRecoilState } from "recoil";
import { HomeBannerStates } from "../dvalues/data";
import { useQuery } from "@tanstack/react-query";

const AMFooter = () => {
    const [innerWidth, setInnerWidth] = useState(0)
    useEffect(() => {
        setInnerWidth(window.innerWidth)
    }, [innerWidth])
    const [catgories, setCategories] = useRecoilState(HomeBannerStates)
    const { data, error } = useQuery({
        queryKey: ['homeDetails'],
        queryFn: apiservice.fetchHomeBanners,
    });

    useEffect(() => {
        if (data) {
            setCategories(data.data);
        }
    }, [data, setCategories]);



    if (error) {
        return <div>Error loading item details: {error.message}</div>;
    }

    return (
        <div className="container-fluid am-footer"
            style={{
                backgroundImage: `url(${footerimg})`,
                objectFit: 'contain',
                objectPosition: 'center',
                backgroundSize: 'contain',
                height: innerWidth <= 500 ? '62.8rem' : '25rem'
            }}>
            <div className="am-footer-start">
                <div className="am-text-align">
                    <img
                        src={footerloog}
                        alt="text-img-div"
                        width={'100%'}
                        height={87}
                    />
                    <p className="footerPara py-2">In partnering with the healthcare industry, it is imperative to ensure that one delivers on one’s promises. At Amaryllis Healthcare, we place the greatest value on customer and end-user satisfaction.</p>
                </div>
                <div className="am-footer-menu">
                    <div>
                        <Link className="text-dark text-decoration-none" to={'/aboutus'}>
                            <h5>About Us</h5>
                        </Link>
                        <Link className="text-decoration-none text-dark" to={'/'}><p>Home</p></Link>
                        <Link to={'/careers'} className="text-decoration-none text-dark">
                            <p>Career</p></Link>
                        <Link to={'/blogs'} className="text-decoration-none text-dark">
                            <p>Knowledge</p></Link>
                        <Link to={'/contact'} className="text-decoration-none text-dark">
                            <p>Customer Support</p></Link>
                        <Link to={'/privacy'} className="text-decoration-none text-dark">
                            <p>Privacy Policy</p></Link>
                        <Link to={'/terms'} className="text-decoration-none text-dark">
                            <p>Terms and Conditions</p></Link>
                    </div>
                    <div>
                        <h5>Solutions</h5>
                        <Link
                            className="text-decoration-none text-dark"
                            state={{ title: 'Infection Prevention Division', type: 'I' }}
                            to={'/infection-prevention-division'}>
                            <p>Infection Prevention Division</p>
                        </Link>
                        <Link className="text-decoration-none text-dark"
                            state={{ title: 'Medical Device-Consumables', type: 'M' }}
                            to={'/medical-device-division'}>
                            <p>Medical Device Consumables</p>
                        </Link>
                    </div>
                    <div>
                        <Link className="text-dark text-decoration-none"
                            state={{ title: 'Featured-Products', type: 'F' }}
                            to={'/medical-device-division'}
                        ><h5>
                                Featured Products</h5></Link>
                        <Link className="text-dark text-decoration-none"
                            state={{ title: 'Featured-Products', type: 'F' }}
                            to={'/medical-device-division'}
                        > <p>View All Products</p>
                        </Link>
                    </div>
                    <div>
                        <Link className="text-dark text-decoration-none" to={'/contact'}>
                            <h5>Contact</h5>
                        </Link>
                        <Link className="text-dark text-decoration-none" to={'/contact'}>
                            <p>Contact Us</p>
                        </Link>
                        <p>+91 9169 338 338</p>
                        <p><i className="fa-regular fa-envelope"></i>&nbsp;info@amaryllishealthcare.com</p>
                        <p className="am-footer-icon">
                            <a href="https://api.whatsapp.com/send?phone=919169338338" target="_blank" rel="noopener noreferrer" className="text-success"><i className="fa-brands fa-whatsapp"></i></a>&nbsp;&nbsp;
                            <a href="https://www.youtube.com/@amaryllishealthcare" target="_blank" className="text-danger"><i className="fa-brands fa-youtube"></i></a>&nbsp;&nbsp;
                            <a href="https://www.linkedin.com/company/amaryllishealthcare/" target="_blank" className="text-primary"><i className="fa-brands fa-linkedin-in"></i></a>
                        </p>
                    </div>
                </div>
            </div>
            <p className="am-footer-right">© Copyright {new Date().getFullYear()} Amaryllis Healthcare Pvt. Ltd. All Rights Reserved.</p>
        </div>
    )
}

export default AMFooter
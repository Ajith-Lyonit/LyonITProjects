import { useEffect } from "react";
import useDeviceType from "../../../custom-hooks/userDevice";


export const AMContactHeadOffice = () => {
    const responsiveCheck = useDeviceType()
    const elements = document.querySelectorAll('.am-contact-headoff-cont');
    useEffect(() => {
        elements.forEach((item, index) => {
            if (index % 2 === 0 && responsiveCheck === "mobile") {
                item.style.backgroundColor = '#F5F5F5';
                item.style.color = "#000"
                item.style.padding = '0.2rem'
                item.style.marginBottom = '1rem';
            } else {
            }
        })
    }, [elements]);
    return (
        <>
            <div className="container-fluid am-contact-headoff">
                <h3 className="py-3">Our Warehouse & Regional Head Office</h3>
                <div className="am-contact-headoff-flex">
                    <div className="am-contact-headoff-cont">
                        <h6>Chennai</h6>
                        <p>Amaryllis Healthcare Pvt. Ltd.,
                            Navaneethammal Street,
                            Chennai, Tamil Nadu - 600029,
                            India.</p>
                    </div>
                    <div className="am-contact-headoff-line"></div>
                    <div className="am-contact-headoff-cont">
                        <h6>Coimbatore</h6>
                        <p>
                            Amaryllis Healthcare Pvt. Ltd.,
                            1/26-D1,Ground Floor, Gandi
                            street ,Vilankurichi,
                            Coimbatore,TN- 641035. India.
                        </p>
                    </div>
                    <div className="am-contact-headoff-line"></div>
                    <div className="am-contact-headoff-cont">
                        <h6>Kerala</h6>
                        <p>
                            Amaryllis Healthcare Pvt. Ltd., No-
                            44/3610A,Tammanam, Sivalayam
                            Road, Karanakkodam, Ernakulam,
                            Kerala - 682032, India.
                        </p>
                    </div>
                    <div className="am-contact-headoff-line"></div>
                    <div className="am-contact-headoff-cont">
                        <h6>West Bengal</h6>
                        <p>
                            Amaryllis Healthcare Pvt. Ltd.,
                            No - 36, 1E / 1J, East Topsia
                            Road, Kolkata, West Bengal-
                            700039, India.
                        </p>
                    </div>
                    <div className="am-contact-headoff-line"></div>
                    <div className="am-contact-headoff-cont">
                        <h6>Gujarat</h6>
                        <p>
                            Amaryllis Healthcare Pvt. Ltd.,
                            No.LL-12, Shorff Chambers,
                            Opposite, Paldi Bus Stop,
                            Ahmedabad, Gujarat- 380006, India.
                        </p>
                    </div>
                </div>
                <div className="am-contact-follow py-2">
                    <h3>Follow Us on</h3>
                    <a href="https://api.whatsapp.com/send?phone=919169338338" target="_blank" className="text-success"><i class="fa-brands fa-whatsapp"></i></a>&nbsp;&nbsp;
                    <a href="https://www.youtube.com/@amaryllishealthcare" target="_blank" className="text-danger"><i class="fa-brands fa-youtube"></i></a>&nbsp;&nbsp;
                    <a href="https://www.linkedin.com/company/amaryllishealthcare/" target="_blank" className="text-primary"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
            </div>
        </>
    )
}
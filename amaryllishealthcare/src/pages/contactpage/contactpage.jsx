import { Suspense, lazy } from "react";
import useDeviceType from "../../custom-hooks/userDevice";
import { Link } from "react-router-dom";

const AMContactForm = lazy(() =>
    import("../../features/contact/components/am-conact-form").then((m) => ({
        default: m.AMContactForm,
    }))
);
const AMContactHeadOffice = lazy(() =>
    import("../../features/contact/components/am-contact-headoff").then((m) => ({
        default: m.AMContactHeadOffice,
    }))
);

export const ContactPage = () => {
    const responsiveCheck = useDeviceType();
    return (
        <div className="bounce-div">
            {responsiveCheck !== "mobile" && <div className="container-fluid am-career-bredcrump">
                <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>Request Catalouge</span>
            </div>}
            <Suspense fallback={<div>Loading contact form...</div>}>
                <AMContactForm />
            </Suspense>

            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-lg-12">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3245.809149319444!2d77.6308376741194!3d12.914496516129654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae153be4fbf7f1%3A0x1308a19d2a1107bc!2sAmaryllis%20Healthcare%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1755580961105!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>

            <div className="am-headoff-border-class"></div>

            <Suspense fallback={<div>Loading head office info...</div>}>
                <AMContactHeadOffice />
            </Suspense>
        </div>
    );
};

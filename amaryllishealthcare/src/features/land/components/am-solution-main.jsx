import { Link } from "react-router-dom";
import useDeviceType from "../../../custom-hooks/userDevice";

const AMSolutionMain = () => {
    const responsiveCheck = useDeviceType()
    return (
        <
        >
            <div className="container-fluid am-why-marginclass">
                <h1 className={`am-why-header ${responsiveCheck !== "mobile" && 'fa-2x'}`}>
                    Trusted Partner for Certified Infection Prevention & Medical Device Consumables
                </h1>
                {responsiveCheck !== "mobile" ? (
                    <div>
                    <p className="am-libre-font-two">
                    Amaryllis Healthcare is a trusted name in India's medical sector, known for manufacturing and delivering high-quality medical consumables <Link to={'/medical-device-division'}>medical consumables</Link>. Our extensive product range spans from essential devices like <Link to={'/iv-cannula'}>IV Cannulas</Link> to infection prevention solutions such as <a href="https://www.amaryllishealthcare.com/infection-prevention-division/surgical-gowns">surgical gowns</a>,surgical drapes, and <a href="https://www.amaryllishealthcare.com/infection-prevention-division/surgical-packs">surgical procedure packs</a> — all designed with patient safety and clinical efficacy in mind.
                    </p>
                    <p className="am-libre-font-two">
                        With over 15 years of deep industry expertise, we serve 700+ hospitals across 15+ countries. Our unwavering commitment to quality, innovation, and reliability has made us a preferred partner for healthcare professionals seeking safe, effective, and forward-thinking solutions for patient care.
                    </p>
                </div>) : <div style={{ marginTop: '-1rem' }}>
                    <p className="am-libre-font-two">
                    Amaryllis Healthcare is a trusted name in India's medical sector, known for manufacturing and delivering high-quality medical consumables <Link to={'/medical-device-division'}>medical consumables</Link>. Our extensive product range spans from essential devices like <Link to={'/iv-cannula'}>IV Cannulas</Link> to infection prevention solutions such as <a href="https://www.amaryllishealthcare.com/infection-prevention-division/surgical-gowns">surgical gowns</a>,surgical drapes, and <a href="https://www.amaryllishealthcare.com/infection-prevention-division/surgical-packs">surgical procedure packs</a> — all designed with patient safety and clinical efficacy in mind.
                    </p>
                    <p className="am-libre-font-two">
                        With over 15 years of deep industry expertise, we serve 700+ hospitals across 15+ countries. Our unwavering commitment to quality, innovation, and reliability has made us a preferred partner for healthcare professionals seeking safe, effective, and forward-thinking solutions for patient care.
                    </p>
                </div>}
            </div>
        </>
    )
}

export default AMSolutionMain
import { lazy, useEffect, useState } from "react";
import apiservice from "../../api/apiservice";
import { useQuery } from "@tanstack/react-query";
import useDeviceType from "../../custom-hooks/userDevice";
import { Link } from "react-router-dom";
import ReadMoreWrapper from "../../components/am-pragraph-readmore";

const AmMedCard = lazy(() => import("../../components/am-med-card"));
export const AMIVCannula = () => {
    const responsiveCheck = useDeviceType();
    const { data } = useQuery({
        queryKey: ['ivcannulaDet'],
        queryFn: () => apiservice.fetchMedicalDevices('Medical Device'),
    });
    const [isOpen, setIsOpen] = useState(false);
    const [ivCannulaItems, setIvCannulaItems] = useState([]);
    const [otherItems, setOtherItems] = useState([]);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        if (data?.data) {
            const allowedTitles = ["iv cannula safety", "iv cannula standard"];
            const filtered = data.data.filter((device) => {
                const title = device?.AMD_Title?.toLowerCase() || "";
                return title.includes("iv cannula") &&
                    allowedTitles.includes(title.trim());
            });
            const otherItems = data.data.filter((device) => {
                const title = device?.AMD_Title?.toLowerCase() || "";
                return !(title.includes("iv cannula") &&
                    allowedTitles.includes(title.trim()));
            });
            setOtherItems(otherItems);
            setIvCannulaItems(filtered);
        }
    }, [data]);

    return (
        <>
            {responsiveCheck !== "mobile" && <div className="container-fluid am-career-bredcrump">
                <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>IV Cannula's</span>
            </div>}
            <div className="container-fluid am-prod-bg"
                style={{
                    height: responsiveCheck === "mobile" ? '17.5rem' : '10rem',
                    backgroundSize: responsiveCheck === "mobile" ? 'cover' : 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    objectFit: 'cover',
                    width: '100%',
                    backgroundColor: '#309ECA',
                    position: 'relative',
                }}
            >
                <span className="fw-bold text-white" style={{ top: '3rem', position: 'absolute', fontSize: '2.5rem' }}>IV Cannula's</span>
            </div>
            <div className="container-fluid py-3">
                {responsiveCheck === "mobile" && (
                    (<span className="fw-bold">Iv Cannula's</span>))}
                <div className="row">
                    {ivCannulaItems.map((product) => (
                        <div className={`${responsiveCheck === 'mobile' ? 'col-6' : 'col-lg-2'} py-3`} key={product.id}>
                            <AmMedCard linktype={'medical-device-division'} key={product.id} item={product} />
                        </div>
                    ))}
                </div>
                <div className="my-4">
                    {/* Toggle Button */}
                    <button
                        className="btn btn-outline-primary mb-3"
                        type="button"
                        onClick={toggleCollapse}
                        aria-expanded={isOpen}
                        aria-controls="collapseOtherItems"
                    >
                        {isOpen ? "Hide Related Products" : "Show Related Products"}
                    </button>

                    {/* Collapsible Content */}
                    <div className={`collapse ${isOpen ? "show" : ""}`} id="collapseOtherItems">
                        <div className="row">
                            {otherItems.map((product) => (
                                <div
                                    className={`${responsiveCheck === "mobile" ? "col-6" : "col-lg-2"
                                        } py-3`}
                                    key={product.id}
                                >
                                    <AmMedCard
                                        linktype="medical-device-division"
                                        item={product}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <div className="container-fluid">
                <ReadMoreWrapper>
                    <h1 className="fw-semibold" style={{ fontSize: '1.5rem' }}>Leading IV Cannula Manufacturer in India — Trusted for Comfort and Control</h1>
                    <p>Amaryllis Healthcare offers a precision-engineered range of IV Cannulas, designed to improve patient comfort, minimize insertion trauma, and support smooth, safe infusion across all clinical settings.</p>
                    <p>Manufactured in ISO 13485-certified facilities and CE-marked for global compliance, our IV Cannulas support safe and efficient vascular access across all healthcare environments—from high-acuity trauma settings to neonatal intensive care units.</p>
                    <p>Each cannula is produced in Class 100K cleanroom conditions, ensuring sterile, dependable performance tailored to the needs of modern hospitals.</p>
                    <h2 style={{ fontSize: '1.2rem' }}>Why Amaryllis Healthcare Is a Smarter Choice for IV Cannulas in India</h2>
                    <p>IV Cannulas manufactured by Amaryllis Healthcare are thoughtfully designed to meet the strict need of patient comfort and clinician efficiency. Every detail is crafted to support accurate placement, safe handling, and optimal infusion delivery.</p>
                    <h6>Key product features include:</h6>
                    <p>Triple-facetted bevelled needle for smoother, less painful vein penetration</p>
                    <p>Siliconized, kink-free catheter to ensure uninterrupted flow</p>
                    <p>Robotic manufacturing for consistent, high-precision quality</p>
                    <p>Single-handed cannulation for fast, ergonomic use</p>
                    <p>Safety needle mechanism to reduce needlestick injuries and improve clinician protection</p>
                    <p>Color-coded wings and hub for fast gauge identification</p>
                    <h6>A Range Tailored to Every Patient and Procedure</h6>
                    <p>We offer a targeted selection of IV Cannula variants to suit various clinical applications and patient profiles:</p>
                    <ul>
                        <li>
                            <strong>IV Cannula Eco - </strong>A cost-effective option that balances affordability with essential performance
                        </li>
                        <li>
                            <strong>IV Cannula Standard (PTFE Catheter) -</strong>Biocompatible and smooth for general use across all departments
                        </li>
                        <li>
                            <strong>PUR IV Cannula (Polyurethane Catheter) -</strong>Ultra-flexible, ideal for long-term infusions and sensitive veins
                        </li>
                    </ul>
                    <p>All models are available in gauge sizes ranging from 14G to 26G, ensuring optimal care delivery for adults, children, and neonatal patients alike.</p>
                    <h6>Global-Standard IV Cannulas From an ISO-Certified Facility</h6>
                    <p>Every IV Cannula is EO-sterilized and individually sealed in tamper-evident blister packaging to maintain sterility until point of use. Our manufacturing operations adhere to ISO 13485 standards, with all production conducted in cleanroom-certified environments to minimize contamination and ensure traceability throughout the supply chain.</p>
                    <h6>Trusted by Hospitals. Proven Across Specialties.</h6>
                    <p>Amaryllis Healthcare's IV Cannulas are widely used across departments, including:</p>
                    <ul>
                        <li>Emergency and trauma care</li>
                        <li>Surgical theatres and pre-operative wards</li>
                        <li>Neonatal and pediatric intensive care units</li>
                        <li>Oncology infusion centers</li>
                        <li>Post-operative and general medical wards</li>
                    </ul>
                    <p>Whether for quick access during emergencies or extended use with minimal discomfort, our IV Cannulas offer dependable performance across the full spectrum of patient care.</p>
                    <h6>Explore Our IV Cannula Range</h6>
                    <p>Looking for a reliable partner in IV cannula solutions? Amaryllis Healthcare delivers a clinically proven range of Intravenous Cannulas designed for today’s healthcare challenges. Click below to explore detailed specifications, packaging options, and product certifications.</p>
                </ReadMoreWrapper>
            </div>
        </>
    );
};

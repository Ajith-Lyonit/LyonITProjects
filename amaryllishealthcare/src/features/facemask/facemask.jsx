import { useEffect, useState, startTransition, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import apiservice from "../../api/apiservice";
import useDeviceType from "../../custom-hooks/userDevice";
import ReadMoreWrapper from "../../components/am-pragraph-readmore";

const AmMedCard =  lazy(() => import("../../components/am-med-card"));

export const AMFaceMask = () => {
    const responsiveCheck = useDeviceType();
    const [facemasks, setFaceMasks] = useState([]);

    const { data, error, isLoading } = useQuery({
        queryKey: ["bedsheetDet"],
        queryFn: () => apiservice.fetchMedicalDevices("Protective Essentials"),
    });

    useEffect(() => {
        if (data?.data) {
            const filtered = data.data.filter((device) =>
                device?.AMD_Title?.toLowerCase().includes("ply")
            );

            startTransition(() => setFaceMasks(filtered));
        }
    }, [data]);

    if (error) return <div>No products available.</div>;

    return (
        <>
            {/* Breadcrumb */}
            {responsiveCheck !== "mobile" && (
                <div className="container-fluid am-career-bredcrump">
                    <Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link>
                    &nbsp;<i className="fa-solid fa-angle-right"></i>&nbsp;
                    <span>Face Masks</span>
                </div>
            )}

            {/* Banner */}
            <div
                className="container-fluid am-prod-bg"
                style={{
                    height: responsiveCheck === "mobile" ? "17.5rem" : "10rem",
                    backgroundSize: responsiveCheck === "mobile" ? "cover" : "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    objectFit: "cover",
                    width: "100%",
                    backgroundColor: "#309ECA",
                    position: "relative",
                }}
            >
                <span
                    className="fw-bold text-white"
                    style={{ top: "3rem", position: "absolute", fontSize: "2.5rem" }}
                >
                    Face Masks
                </span>
            </div>

            {/* Products */}
            <div className="container-fluid py-3">
                {responsiveCheck === "mobile" && <span className="fw-bold">Face Masks</span>}
                <div className="row">
                    {facemasks.map((product) => (
                        <div
                            className={`${responsiveCheck === "mobile" ? "col-6" : "col-lg-2"} py-3`}
                            key={product.id}
                        >
                            <AmMedCard spaceType={'LAND_PAGE'}
                                breadlink={`Infection Prevention Division`}
                                key={product.id} item={product} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ReadMore Section */}
            <div className="container-fluid">
                <ReadMoreWrapper>
                    <h1 style={{ fontSize: '1.5rem' }}>3 Ply Masks Built for Protection and Comfort</h1>
                    <p>In clinical environments where protection can't be compromised from operating rooms to outpatient clinics the humble surgical mask remains a frontline essential. At Amaryllis Healthcare, we've refined the classic 3-ply design into a dependable shield for everyday medical use.</p>
                    <p>Engineered in ISO 13485-certified cleanrooms and compliant with IS 16288 / IS 16289 standards, our masks deliver 99.9% Bacterial Filtration Efficiency — rigorously tested, lab-approved, and trusted across India’s top hospitals.</p>
                    <h3 style={{ fontSize: '1.2rem' }}>Explore Our 3-Ply Surgical Mask Range</h3>
                    <p>Ear Loop 3-Ply Mask</p>
                    <p>Effortless to wear, ideal for busy clinical shifts</p>
                    <ul>
                        <li>Soft, latex-free ear loops for quick, gentle fit</li>
                        <li>Built-in PE-coated nose wire for a secure seal</li>
                        <li>Triple-layered construction with splash resistance Size: 175 mm × 100 mm | Loop: 180 mm × 2 Best for: Outpatient visits, ward rounds, routine medical duties</li>
                    </ul>
                    <h3 style={{ fontSize: '1.2rem' }}>Tie-On 3-Ply Mask</h3>
                    <p>Tailored for critical care and surgical environments</p>
                    <ul>
                        <li>Four extended tie straps ensure a firm, secure fit</li>
                        <li>Designed for long hours of wear without discomfort</li>
                        <li>Flexible nose strip adapts to face contours Tie length: 890 mm × 2 Best for: Operating rooms, ICUs, sterile settings</li>
                    </ul>
                    <h3 style={{ fontSize: '1.2rem' }}>Ultra-Soft Loop Mask</h3>
                    <p>All-day comfort for sensitive skin and extended shifts</p>
                    <ul>
                        <li>Ultra-soft ear loops reduce pressure behind the ears</li>
                        <li>Breathable design helps minimize skin irritation</li>
                        <li>Best for: Surgeons, nurses, and frontline staff working extended hours</li>
                    </ul>
                    <h2 style={{ fontSize: '1.4rem' }}>Why Masks from Amaryllis Healthcare Are Preferred by 550+ Hospitals</h2>
                    <p>Each one of our 3-Ply Mask is lab-tested for:</p>
                    <ul>
                        <li>BFE: 99.9% (Bacterial Filtration Efficiency)</li>
                        <li>PFE: 96.6% at 0.3 µm (Particulate Filtration Efficiency)</li>
                        <li>Splash Resistance: Passes 120 mmHg synthetic blood penetration test</li>
                        <li>Breathability: 49.79 Pa/cm² differential pressure for easy airflow</li>
                    </ul>
                    <h3 style={{ fontSize: '1.2rem' }}>What's Inside Each Mask?</h3>
                    <ul>
                        <li>Outer Layer: Hydrophobic blue spunbond layer (splash-resistant)</li>
                        <li>Middle Layer: Meltblown filter for high filtration efficiency</li>
                        <li>Inner Layer: Soft white spunbond for comfortable skin contact</li>
                        <li>Nose Wire: PE-coated, 0.45 mm strip for facial conformity</li>
                        <li>GSM Weight: 25 GSM ±8% per layer for optimal comfort and protection</li>
                    </ul>
                    <h3 style={{ fontSize: '1.2rem' }}>Compliant with Indian & International Medical Norms</h3>
                    <ul>
                        <li>Produced in Class 100K Cleanroom Facilities</li>
                        <li>Hypoallergenic, Breathable & Latex-Free</li>
                        <li>Sterile, Disposable, and Ready for Single Use</li>
                        <li>Validated by Accredited Third-Party Labs</li>
                        <li>Consistent Supply with High-Volume Production Capacity</li>
                    </ul>
                    <h3 style={{ fontSize: '1.2rem' }}>Built for the Frontlines — One Breath at a Time</h3>
                    <p>With millions of units delivered to over 550 hospitals and healthcare institutions, Amaryllis Healthcare’s 3-ply surgical masks are a trusted part of daily infection control protocols which help healthcare teams work safely, confidently, and in compliance across every setting.</p>
                    <h3 style={{ fontSize: '1.2rem' }}>Need a Certified Mask Supply Partner?</h3>
                    <p>Whether you're managing procurement for a hospital, clinic, or health network, our team is ready to help tailor a PPE solution to your needs.Explore our full mask range or get in touch today.</p>
                </ReadMoreWrapper>
            </div>
        </>
    );
};

import { Suspense, lazy, useEffect, useState } from "react";
import apiservice from "../../api/apiservice";
import { useQuery } from "@tanstack/react-query";
import useDeviceType from "../../custom-hooks/userDevice";
import { Link } from "react-router-dom";

const AmMedCard = lazy(() => import("../../components/am-med-card"));
const ReadMoreWrapper = lazy(() => import("../../components/am-pragraph-readmore"));

export const AMBedsheet = () => {
    const responsiveCheck = useDeviceType();
    const [facemasks, setFaceMasks] = useState([]);

    const { data } = useQuery({
        queryKey: ["bedsheetDet"],
        queryFn: () => apiservice.fetchMedicalDevices("Surgical Accessories"),
    });

    useEffect(() => {
        if (data?.data) {
            const filtered = data.data.filter(
                (device) => device?.AMD_Title === "Bed sheet plus pillow cover"
            );
            setFaceMasks(filtered);
        }
    }, [data]);

    return (
        <Suspense fallback={<p>Loading content...</p>}>
            {responsiveCheck !== "mobile" && (
                <div className="container-fluid am-career-bredcrump">
                    <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                        Home
                    </Link>
                    &nbsp;<i className="fa-solid fa-angle-right"></i>&nbsp;
                    <span>Patient Gowns</span>
                </div>
            )}

            {/* ✅ Hero Section */}
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
                    style={{
                        top: "3rem",
                        position: "absolute",
                        fontSize: "2.5rem",
                    }}
                >
                    Disposable Bedsheet
                </span>
            </div>

            <div className="container-fluid py-3">
                {responsiveCheck === "mobile" && (
                    <span className="fw-bold">Disposable Bedsheet</span>
                )}
                <div className="row">
                    {facemasks.map((product, index) => (
                        <div
                            className={`${responsiveCheck === "mobile" ? "col-6" : "col-lg-2"
                                } py-3`}
                            key={index}
                        >
                            <AmMedCard
                                linktype="medical-device-division"
                                item={product}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="container-fluid">
                <ReadMoreWrapper>
                    <h1>Disposable Bedsheet for Hospital: Enhancing Safer Patient Care with Quality Disposable Bedsheet Solutions.</h1>
                    <p>
                        At <strong>Amaryllis Healthcare</strong>, every product is designed
                        with a single goal — to support safer, more hygienic patient care.
                        Our sterile, disposable bed sheets are thoughtfully designed to
                        support infection control, patient comfort, and dependable
                        performance in real-world hospital settings.
                    </p>
                    <p>
                        Made with high-quality{" "}
                        <strong>SMS (Spunbond–Meltblown–Spunbond)</strong> fabric, each
                        sheet is soft, breathable, and fluid-repellent, creating a protective
                        layer that’s gentle on the skin. Whether it’s the ICU or a recovery
                        ward, our sheets help care teams uphold sterility standards and
                        minimize the risk of cross-contamination — all without compromising
                        comfort or ease of use.
                    </p>

                    <h6>Certified Quality. Cleanroom Manufacturing.</h6>
                    <p>
                        Manufactured in Class 100K cleanroom environments at our 100,000+ sq.
                        ft. automated facility, Amaryllis Healthcare’s disposable bed sheets
                        meet rigorous <strong>CE</strong> and <strong>ISO 13485</strong>{" "}
                        standards which ensures:
                    </p>
                    <ul>
                        <li>Reliable, fluid-resistant barrier performance</li>
                        <li>Non-linting surfaces for use in sterile and critical care zones</li>
                        <li>Uniform safety and consistency across production batches</li>
                    </ul>
                    <p>
                        As part of our sterile product portfolio — which includes surgical
                        gowns, drapes, and procedure packs — these sheets support robust
                        infection control protocols hospital-wide.
                    </p>

                    <h2>Built for Trust: What Sets Our Disposable Bedsheets Apart</h2>
                    <h6>Medical-Grade SMS Fabric</h6>
                    <p>
                        Built with a triple-layer structure, including a protective
                        meltblown barrier, these sheets provide strong resistance against
                        fluids and microbial exposure — ideal for maintaining hygiene in
                        critical care environments.
                    </p>

                    <h5>Breathable and Skin-Friendly</h5>
                    <p>
                        Soft to the touch and designed to let air flow freely, the material
                        helps reduce discomfort during long hours of use, making it more
                        comfortable for both patients and caregivers.
                    </p>

                    <h5>Full-Length Coverage</h5>
                    <p>
                        Available in both standard and large sizes, the sheets are designed
                        to fully cover mattresses and protect surfaces during patient exams,
                        recovery periods, or procedures involving higher fluid exposure.
                    </p>

                    <h5>Eco-Conscious Efficiency</h5>
                    <p>
                        Single-use design eliminates the need for laundering, which saves
                        time, energy, water, and hospital resources.
                    </p>

                    <h5>Cross-Contamination Control</h5>
                    <p>
                        Sterile and single-use format helps minimize HAIs and supports
                        infection prevention protocols with zero added laundry load.
                    </p>

                    <h5>Lint-Free Performance</h5>
                    <p>
                        Ideal for OT and ICU use, with minimal fiber shedding to maintain a
                        clean and safe surgical zone.
                    </p>

                    <h2>Common Applications for Amaryllis Healthcare's Disposable Bedsheets</h2>
                    <p>
                        Designed to meet real-world hospital needs, our bed sheets are
                        suitable for:
                    </p>
                    <ul>
                        <li>General and day-care wards</li>
                        <li>Intensive care and isolation rooms</li>
                        <li>Trauma bays and emergency units</li>
                        <li>Recovery and post-anesthesia care</li>
                        <li>Maternity and pediatric wards</li>
                        <li>Outpatient clinics and diagnostic labs</li>
                    </ul>
                    <p>
                        Wherever hygiene, speed, and sterility matter, our disposable bed
                        sheets deliver a dependable, low-effort solution.
                    </p>

                    <h5>Why Leading Hospitals Choose Amaryllis</h5>
                    <p>
                        With over 550 hospitals across India relying on Amaryllis Healthcare,
                        we combine clinical insight with advanced manufacturing to deliver
                        consistent, sterile, and ready-to-use products. Our commitment
                        includes:
                    </p>
                    <ul>
                        <li>CE- and ISO 13485-certified cleanroom production</li>
                        <li>Batch-to-batch consistency backed by rigorous QA</li>
                        <li>Nationwide fulfillment and on-time delivery</li>
                        <li>
                            Transparent customer service and full compliance documentation
                        </li>
                    </ul>

                    <h6>Explore Our Disposable Bed Sheet Range</h6>
                    <p>
                        Whether restocking day wards or equipping critical care units,
                        Amaryllis Healthcare’s disposable bed sheets provide the protection,
                        sterility, and peace of mind your teams rely on.
                    </p>
                    <p>
                        <a href="#contact">→ Request a sample or contact us for a quote today.</a>
                    </p>
                </ReadMoreWrapper>
            </div>
        </Suspense>
    );
};

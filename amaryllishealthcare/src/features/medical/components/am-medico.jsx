import { lazy, useEffect, useState } from "react";
import apiservice, { apiurl } from "../../../api/apiservice";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { HomeBannerStates, ProductCategoryStates } from "../../../dvalues/data";
import { useRecoilValue } from "recoil";
import { ReferType } from "../../../constants/config";
import useDeviceType from "../../../custom-hooks/userDevice";
import ReadMoreWrapper from "../../../components/am-pragraph-readmore";

const AmMedCard = lazy(() => import("../../../components/am-med-card"));

export const AMMedico = ({ item, id }) => {
    const responsiveCheck = useDeviceType()
    const cats = useRecoilValue(ProductCategoryStates)
    const homeState = useRecoilValue(HomeBannerStates)
    const [medbg, setMedBg] = useState("")
    const [products, setProducts] = useState([]);


    const [localItem, setLocalItem] = useState(
        item ?? { title: "Medical Device-Consumables", type: "M" }
    );

    useEffect(() => {
        if (!item) {
            setLocalItem({ title: "Medical Device-Consumables", type: "M" });
        } else {
            setLocalItem(item);
        }
    }, [item, id]);

    if (!localItem) return null;

    const isMedical = localItem?.type === 'M';
    const finalId = 'Medical Device';
    const { data, error, isLoading } = useQuery({
        queryKey: [isMedical ? 'medicoDet' : 'featDet', finalId],
        queryFn: () => {
            if (isMedical) {
                if (!finalId) return Promise.reject("Missing ID for medical devices");
                return apiservice.fetchMedicalDevices(finalId);
            } else {
                return apiservice.fetchFeaturedProducts();
            }
        },
        enabled: !!localItem,
    });


    useEffect(() => {
        if (localItem?.type == "M") {
            const medicalBg = cats.find((item) => item.AMD_CatTitle === 'Medical Device')
            if (medicalBg !== undefined) {
                const bgMedImg = responsiveCheck === "mobile" ? medicalBg?.AMD_MobileBanner?.url : medicalBg?.AMD_DeskBanner?.url
                setMedBg(bgMedImg)
            }
        } else {
            const featureBg = homeState.find((item) => item.AMD_BannerType === ReferType.AMDB_FEATURED_PRODUCTS)
            if (featureBg !== undefined) {
                const bgFeaImg = responsiveCheck === "mobile" ? featureBg?.AMD_Bannermobile?.url : featureBg?.AMD_Banner?.url
                setMedBg(bgFeaImg)
            }
        }
    }, [cats, homeState, localItem?.type, responsiveCheck])
    useEffect(() => {
        if (data?.data !== null) {
            if (localItem.type !== 'F') {
                const featData = data?.data.sort((a, b) => a.AMD_SerialNo.localeCompare(b.AMD_SerialNo)) || [];
                setProducts(featData);
            } else {
                const medData = data?.data || []
                setProducts(medData);
            }
        }
    }, [data]);

    if (isLoading) {
        return <div></div>;
    }
    if (error) {
        console.error('Error fetching data:', error);
        return <div style={{ marginTop: '8rem' }} className="text-center py-5">No products available.</div>;
    }
    return (
        <>
            {
                localItem !== null ? (
                    <>
                        {responsiveCheck !== "mobile" && <div className="container-fluid am-career-bredcrump">
                            <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>{localItem.type === 'F' ? 'Featured Products' : 'Medical Device Consumables'}</span>
                        </div>}
                        <div className="container-fluid am-prod-bg"
                            style={{
                                height: responsiveCheck === "mobile" ? '17.5rem' : '10rem',
                                backgroundSize: responsiveCheck === "mobile" ? 'cover' : 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                objectFit: 'cover',
                                width: '100%',
                                backgroundImage: `url(${apiurl + medbg})`,
                            }}
                        >
                        </div>
                        <div className="container-fluid py-3">
                            {responsiveCheck === "mobile" && (
                                <>
                                    {localItem.type === "F" ?
                                        (<span className="fw-bold">Featured Products</span>) :
                                        (<span className="fw-bold">Medical Device Consumables</span>)}
                                </>
                            )}
                            <div className="row">
                                {products.map((product) => (
                                    <div className={`${responsiveCheck === 'mobile' ? 'col-6' : 'col-lg-2'} py-3`} key={product.id}>
                                        <AmMedCard linktype={'medical-device-division'} breadtype={localItem.type} key={product.id} item={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {localItem.type == "M" && <div className="container-fluid am-medical-video">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h1 style={{ fontSize: '2rem' }}>See How We Innovate</h1>
                                    <p>
                                        Amaryllis Healthcare is a pioneer in medical innovation, committed to safety, quality, and precision. Our fully automated, 100,000+ sq. ft. facility operates under Class 10k cleanroom standards and is equipped with fully sensor-driven machinery, ensuring sterility and accuracy at every production stage. As the first South Indian company with an automated plant for medical device consumables, we are dedicated to enhancing and saving lives through innovation. Explore the essence of our advanced facility and our mission to redefine healthcare excellence.
                                    </p>
                                    <button style={{ marginTop: '0.2rem' }}>Discover&nbsp;<i class="fa-solid fa-chevron-right"></i></button>
                                </div>
                                <div className="col-lg-6">
                                    <div class="ratio ratio-16x9">
                                        <iframe
                                            className="rounded"
                                            style={{ paddingTop: "3.5rem" }}
                                            width="100%"
                                            height="310"
                                            src="https://www.youtube.com/embed/-R72EvCIHiU"
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="container-fluid">
                            <ReadMoreWrapper>
                                <section class="py-2">
                                    <h1 style={{ fontSize: '1rem' }}>Everyday Medical Consumables, Delivered with Clinical Precision</h1>
                                    <p>In hospitals, every second matters. So does every single item on a tray. From IV drips in emergency rooms to wound dressings in post-operative care, medical consumables form the backbone of daily clinical operations. At Amaryllis Healthcare, our Medical Consumable Division is focused on delivering dependable, sterile and high-utility devices that support frontline care with precision and consistency.</p>
                                    <p>We understand that hospitals rely on more than just large-ticket equipment. It’s the routine consumables, cannulas, tubing sets, syringes and more that must be available, safe and ready to use around the clock. That’s why our products are engineered for high performance, shelf stability and effortless integration into hospital workflows.</p>
                                    <p>Whether you’re managing a trauma bay, general ward, or outpatient department, our consumables ensure that your clinical care stays uninterrupted, efficient and compliant.</p>

                                    <h2>Built for the Daily Demands of Care</h2>
                                    <p>Consumables are often used in fast-paced, high-pressure environments. There’s no room for error and reliability is non-negotiable. Our Medical Consumable Division covers a broad spectrum of essential use cases, providing hospitals with a single-source supply partner for high-volume items that meet strict quality and regulatory benchmarks.</p>
                                    <p>Our core product offerings include:</p>
                                    <h3>IV Sets &amp; Components</h3>
                                    <p>Gravity and pressure sets, extension lines, burettes, and Y-site connectors manufactured for precise flow control and leakage prevention.</p>
                                    <h3>IV Cannulas</h3>
                                    <p>Sterile, color-coded and designed with smooth bevels for atraumatic insertion. Our cannulas offer excellent vein visibility and secure fixation which minimizes dislodgement risk.</p>
                                    <h3>Tubes and Catheters</h3>
                                    <p>Including suction tubes, feeding tubes, uro bags, oxygen masks and nasal cannulas all biocompatible and latex-free.</p>
                                    <p>Every product is developed with a clear goal: to support procedural efficiency, patient comfort and clinical safety.</p>

                                    <h2>Sterility You Can Trust. Packaging You Can Count On.</h2>
                                    <p>Medical consumables are often stored in bulk, accessed frequently and used across departments making packaging integrity and traceability critical. At Amaryllis, each product is individually packed in medical-grade and tamper-proof materials to ensure sterility until the point of use.</p>
                                    <ul>
                                        <li>ETO Sterilized (where applicable), with sterility validation logs</li>
                                        <li>Clear labeling with batch numbers, manufacturing dates and expiry</li>
                                        <li>Standardized SKUs for easy inventory management</li>
                                        <li>Shelf-stable packaging for multi-year storage under ambient conditions</li>
                                        <li>Color-coded variants for quick product identification</li>
                                    </ul>
                                    <p>This attention to detail makes our consumables safe to stock, simple to track and fast to deploy especially in critical care and emergency units where time is of the essence.</p>

                                    <h2>Biocompatibility and Patient Safety First</h2>
                                    <p>All our medical consumables are produced using non-toxic, biocompatible, DEHP-free materials which makes them safe for use across age groups and comorbidities. Each product is tested for:</p>
                                    <ul>
                                        <li>Cytotoxicity</li>
                                        <li>Sterility Assurance Level (SAL 10⁻⁶)</li>
                                        <li>Particulate matter limits</li>
                                        <li>Chemical reactivity</li>
                                        <li>Shelf-life stability</li>
                                    </ul>
                                    <p>From pediatric cannulas to large-volume IV sets, every item is manufactured under cleanroom protocols, with production cycles validated for clinical use.</p>

                                    <h2>Quality Assurance That Goes Beyond Compliance</h2>
                                    <p>At Amaryllis Healthcare, quality isn’t just a checkbox. It's the cornerstone of our product design, manufacturing and logistics systems.</p>
                                    <ul>
                                        <li>ISO 13485:2016 certified systems for medical device manufacturing</li>
                                        <li>CE marking for product groups meeting European safety and performance criteria</li>
                                        <li>CDSCO registration for domestic compliance in India</li>
                                        <li>Batch-wise traceability for complete visibility from raw materials to final packaging</li>
                                        <li>Routine in-house and third-party testing for microbial load, tensile strength, flow rate and packaging integrity</li>
                                    </ul>
                                    <p>This end-to-end traceability ensures hospitals can maintain documentation trails for internal audits, procurement validations and regulatory checks without hassle.</p>

                                    <h2>Your Partner in Procurement and Performance</h2>
                                    <p>For hospital administrators and supply chain managers, sourcing consumables isn’t just about price or availability but it’s about trust. Amaryllis Healthcare brings the predictability of a structured supply system, backed by responsive customer support, clear documentation and consistent delivery schedules.</p>
                                    <ul>
                                        <li>Standard and custom SKUs to match your procurement lists</li>
                                        <li>Bulk supply readiness for multi-hospital networks</li>
                                        <li>Rapid fulfillment for high-urgency products</li>
                                        <li>On-request certification kits for NABH and NABL documentation</li>
                                        <li>Support for long-term contracts and tender participation</li>
                                    </ul>
                                    <p>Our clients include over 550+ hospitals across India, from government healthcare networks to private multispecialty chains, all of whom trust Amaryllis for safe and on-time delivery of the products they use every day.</p>

                                    <h2>From Trauma Bays to OPDs, Our Consumables Keep Workflows Safe, Efficient, and Well-Supplied.</h2>
                                    <p>The smallest tools often make the biggest difference in patient care. At Amaryllis Healthcare, we take pride in manufacturing everyday medical consumables that meet the same high standards as critical-care equipment.</p>
                                    <p>If your hospital is looking for a reliable, scalable and compliant supply partner for consumables that actually perform connect with us today.</p>
                                    <p>Explore our full medical consumables range, request product specifications, or ask for a quotation based on your facility’s needs. We’re here to help you raise the standard of care.</p>
                                </section>
                            </ReadMoreWrapper>
                        </div>
                    </>
                ) : (<>
                    No Products Available
                </>)
            }
        </>
    )
}
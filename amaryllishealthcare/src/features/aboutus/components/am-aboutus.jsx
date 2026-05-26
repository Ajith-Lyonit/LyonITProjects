
import cv1 from "../img/cv1.png";
import cv2 from "../img/cv2.png";
import cv3 from "../img/cv3.png";
import cv4 from "../img/cv4.png";
import cv5 from "../img/cv5.png";
import abmob1 from '../img/mobcard1.png';
import abmob2 from '../img/mobcard2.png'
import abmob3 from '../img/mobcard3.png'
import { Link } from "react-router-dom";
import useDeviceType from "../../../custom-hooks/userDevice";
import { lazy, useState } from "react";

const AMVisionMission = lazy(() => import("./am-vis-mis"));
const AMAboutCardOne = lazy(() => import("./am-card-one"));
const AMAboutPresence = lazy(() => import("./am-about-presence"));
const AMAboutGlobalPresence = lazy(() => import("./am-global-presence"));
const AMAboutCardTwo = lazy(() => import("./am-card-two"));
const AMAboutCardThree = lazy(() => import("./am-about-card-three"));
const AboutAmaryllis = lazy(() => import("./aboutamaryllis"));

export const AMAAboutUs = () => {
    const responsiveCheck = useDeviceType()
    const [expanded, setExpanded] = useState(true);
    const aboutCoreValues = [
        {
            itemText: "Leadership",
            itemImg: cv1,
            itemDesc: `We <strong>lead by example</strong> and our team to set high standards for each other and for the industry</p>`
        },
        {
            itemText: "Excellence & Integrity",
            itemImg: cv2,
            itemDesc: `We believe that <strong>excellence</strong> and <strong>integrity</strong> go hand in hand and should guide every step we take `
        },
        {
            itemText: "Learning",
            itemImg: cv3,
            itemDesc: `We foster <strong>learning</strong>, encouraging our team to closely work not just with the customers but also with each other - 
            to gain further <strong>insights</strong> and <strong>perspective</strong>`
        },
        {
            itemText: "Inclusivity",
            itemImg: cv4,
            itemDesc: `We promote <strong>inclusive</strong> work culture where all employees, all opinions, all tasks - big or small - are <strong>valued</strong> `
        },
        {
            itemText: "Collaboration & Support",
            itemImg: cv5,
            itemDesc: `As colleagues, we take <strong>care to collaborate</strong> with each other, and <strong>support</strong> each other to <strong>grow</strong> `
        }
    ]
    return (
        <
            >
            {responsiveCheck !== "mobile" && <div className="container-fluid am-career-bredcrump">
                <Link to={"/"} className="text-dark text-decoration-none">Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>About Us</span>
            </div>}
            <div className="container-fluid am-common-font-1" style={responsiveCheck === "mobile" ? { paddingTop: '1.5rem' } : {}}>
                <div className="row">
                    <div className="col-lg-6">
                        <img src="/abouthero.jpeg" className="img-fluid" alt="" />
                    </div>
                    <div className="col-lg-6">
                        <h3 className="text-center">Improving Care, Saving Lives</h3>
                        <p>
                            Amaryllis Healthcare represents over a decade of trusted medical expertise. As India’s largest European CE and ISO 13485 certified manufacturer of surgical gowns, drapes, packs, and medical device consumables, we are humbled to be a preferred partner for leading hospitals across the country - known for our uncompromising quality and reliable service
                        </p>
                    </div>
                </div>
            </div>
            {responsiveCheck === "mobile" ? (<div className="d-flex flex-column gap-2">
                <div>
                    <img src={abmob1} className="img-fluid" alt="" />
                </div>
                <div>
                    <img src={abmob2}  className="img-fluid" alt="" />
                </div>
                <div>
                    <img src={abmob3}  className="img-fluid" alt="" />
                </div>
            </div>) : (
                <AMVisionMission></AMVisionMission>
            )}
            <AMAboutCardOne />
            <AboutAmaryllis />
            <div className="container-fluid">
                <h2>Our Purpose</h2>
                <div className="row mt-5">
                    <div className="colg-12 mb-3">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="am-about-visionbox">
                                    <h5>Vision</h5>
                                    <img src="/vision-icon.png" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-10">
                                <p>At Amaryllis Healthcare, we believe that advancing patient care is the key to saving lives. Our vision reflects this deeply held belief — that every patient deserves the best chance, and every caregiver the best tools.</p>
                                <p>Our products do more than just protect — they instill confidence. From conception to completion, every design choice and every process is driven by one goal: to improve care where it matters most — on the frontlines.</p>
                            </div>
                        </div>
                    </div>
                    <div className="colg-12 mt-4">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="am-about-visionbox">
                                    <h5>Mission</h5>
                                    <img src="/mission-icon.png" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-10">
                                <p>We don’t just manufacture medical products — we create solutions that solve real clinical challenges. At Amaryllis Healthcare, our mission is to offer solutions that meet real clinical needs — solutions that are thoughtfully engineered, clinically validated, and globally compliant.</p>
                                <p className="fw-bold">This mission comes to life through:</p>
                                <ul>
                                    <li><strong>Listening</strong> to the evolving needs of caregivers and surgical teams and developing innovative solutions</li>
                                    <li><strong>Maintaining uncompromising quality</strong> across every stage of production</li>
                                    <li><strong>Adhering strictly</strong> to international safety standards</li>
                                    <li><strong>Fostering long-term trust</strong> with every hospital, caregiver, and partner we serve</li>
                                </ul>
                                <p>This commitment — <strong>to innovate, adhere to superior quality standards, and to earn trust</strong> — defines who we are and how we serve.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-4 bg-light mb-4">
                <button
                    className="btn p-0 btn-light d-flex justify-content-between align-items-center w-100"
                    onClick={() => setExpanded(!expanded)}
                >
                    <span className="fa-2x">What We Do</span>
                    <i className={`fa-solid ${expanded ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                </button>

                <div className={`collapse ${expanded ? "show" : ""} mt-3`}>
                    <div>
                        <p>Our focus lies on two crucial pillars: infection prevention and high-performance medical consumables. Each product - whether a surgical gown, drape, or IV cannula — reflects a deep understanding of surgical workflows, clinical conditions, and the real-world demands of healthcare providers.</p>
                        <p>With over a decade of manufacturing expertise, our facility - covering 100,000 sq. meters - stands as one of Indias largest for surgical disposables. It features:</p>
                        <ul>
                            <li>Cleanrooms rated at Class 100K</li>
                            <li>Advanced air-shower systems</li>
                            <li>Fully sterile packaging lines</li>
                        </ul>
                        <p>with the world's most stringent standards, including:</p>
                        <ul>
                            <li>AAMI PB70 for barrier protection</li>
                            <li>EN 13795 for surgical fabrics</li>
                            <li>ISO 11607-1 and EN 868-5 for packaging sterility</li>
                        </ul>
                        <p>As healthcare evolves, we stay firmly rooted in our purpose: to continue innovating in the field of infection prevention and medical consumables - one product, one surgery, and one partnership at a time.</p>
                    </div>
                </div>
            </div>
            <AMAboutPresence />
            <AMAboutGlobalPresence />
            <h4 className={` ${responsiveCheck === "mobile" ? 'ms-4 mt-5 mb-3' : 'ms-5 py-2'} am-common-font-individual`}>Our Core Values</h4>
            {responsiveCheck === "mobile" ?
                <div className="container-fluid">
                    <div className="row">
                        {aboutCoreValues.map((item, index) => (
                            <div className="col-6" key={index}>
                                <AMAboutCardTwo key={item} item={item} />
                            </div>
                        ))}
                    </div>
                </div> : <div className="am-about-values">
                    {aboutCoreValues.map((item, index) => (
                        <AMAboutCardTwo key={index} item={item} />
                    ))}
                </div>
            }
            <AMAboutCardThree />
        </>
    )
}
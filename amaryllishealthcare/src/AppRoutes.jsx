import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { LandPage } from './pages/landpage/landpage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ProdPage } from './pages/prodpage/prodpage';
import { ProdDetPage } from './pages/proddetpage/proddetpage';
import { AMblogs } from './pages/blogpage/blogpage';
import AMBlogDetPage from './pages/blogdet/blogdet';
import { AMCareerPage } from './pages/careerpage/careerpage';
import { AMAboutusPage } from './pages/aboutuspage/aboutuspage';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ContactPage } from './pages/contactpage/contactpage';
import { InfectionPage } from './pages/infectionpage/infectionpage';
import { SolutionPage } from './pages/solutionpage/solutionpage';
import { MedicalPage } from "./pages/medicalpage/medicalpage"
import { Helmet } from 'react-helmet'
import { AmMobileSolCaps } from './pages/mobilesolpage/mobilesolpage';
import { AMPrivacyPage } from './pages/privacypage/privacypage';
import { AMTermsPage } from './pages/termspage/termspage';
import { IVCannulaPage } from './pages/ivcannulapage/ivcannulapage';
import { FaceMaskPage } from './pages/facemaskpage/facemaskpage';
import { AMWhyAmaryllisCoverPage } from './pages/whyamaryllispage/whyamaryllispage';
import { PatientGownPage } from './pages/patientgown/patientgownpage';
import { BedSheetPage } from './pages/bedsheet/bedsheetpage';
import { FeaturedProdPage } from './pages/featuredpage/featuredpage';
import { DisposablePage } from './pages/disposablegownpage/disposablepage';
import { OTPackPage } from './pages/otpackpage/otpackpage';
import AMLayout from './components/am-layout';
import { ConSupportPage } from './pages/consupport/consupport';

function AppRoutes() {
    return (
        <Routes>
            <Route path='' element={<AMLayout>
                <Helmet>
                    <title>Manufacturer of Gowns, Kits & IV Cannulas | Amaryllis Healthcare</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com" />
                    <meta name="description" content="Leading manufacturer of surgical gowns, drapes, OT kits & IV cannulas, trusted by 550+ hospitals in 15+ countries for quality and patient safety." />
                </Helmet>
                <LandPage />
            </AMLayout>}></Route>
            <Route path='/careers' element={<AMLayout>
                <Helmet>
                    <title>Careers</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/careers" />
                </Helmet>
                <AMCareerPage />
            </AMLayout>}></Route>
            <Route path='/aboutus' element={<AMLayout>
                <Helmet>
                    <title>15+ Years of Medical Consumables Excellence</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/abouts" />
                    <meta name="description" content="Amaryllis Healthcare, bringing 15+ years of certified expertise, delivers trusted surgical and infection control solutions to leading hospitals worldwide." />
                </Helmet>
                <AMAboutusPage />
            </AMLayout>}></Route>
            <Route path='/blogs/:id' element={<AMLayout>
                <AMBlogDetPage />
            </AMLayout>}></Route>
            <Route path='/blogs' element={<AMLayout>
                <Helmet>
                    <title>Blogs</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/blogs" />
                </Helmet>
                <AMblogs />
            </AMLayout>}></Route>
            <Route path='/infection-prevention-division/:subtype/:type' element={<AMLayout>
                <ProdDetPage />
            </AMLayout>}></Route>
            <Route path='/medical-device-division/:type' element={<AMLayout>
                <ProdDetPage />
            </AMLayout>}></Route>
            <Route path='/infection-prevention-division/:type' element={<AMLayout>
                <ProdPage />
            </AMLayout>}></Route>
            <Route path='/requestcatalouge' element={<AMLayout>
                <Helmet>
                    <title>Request Catalouge</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/requestcatalouge" />
                </Helmet>
                <ContactPage />
            </AMLayout>}></Route>
            <Route path='/contact' element={<AMLayout>
                <Helmet>
                    <title>Contact Us</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/contact" />
                </Helmet>
                <ConSupportPage />
            </AMLayout>}></Route>
            <Route path='/infection-prevention-division' element={<AMLayout>
                <Helmet>
                    <title>Infection Prevention Consumables | Amaryllis Healthcare</title>
                    <meta name="robots" content="index, follow" />
                    <meta name="description" content="Manufacturer of infection prevention medical consumables including surgical drapes, gowns, OT packs, PPE and more, ensuring sterility and compliance across the hospital." />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/infection-prevention-division" />
                </Helmet>
                <InfectionPage />
            </AMLayout>}></Route>
            <Route path='/solutioncapabilities/:type' element={<AMLayout>
                <Helmet>
                    <title>Solution | Capabilities</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/" />
                </Helmet>
                <SolutionPage />
            </AMLayout>}></Route>
            <Route path='/medical-device-division' element={<AMLayout>
                <Helmet>
                    <title>Medical Device Consumables Manufacturing | Amaryllis Healthcare</title>
                    <meta name="description" content="Discover our medical device consumables manufacturing division delivering sterile, CE-certified products for hospital use and healthcare needs worldwide." />
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/medical-device-division" />
                </Helmet>
                <MedicalPage />
            </AMLayout>}></Route>
            <Route path='/medical-device-division/:type' element={<AMLayout>
                <Helmet>
                    <title>Product Details</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="..." />
                </Helmet>
                <ProdDetPage />
            </AMLayout>}></Route>
            <Route path='/mobileSolutionPage' element={<AMLayout>
                <Helmet>
                    <title>Solution Capabilities</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/mobileSolutionPage" />
                </Helmet>
                <AmMobileSolCaps />
            </AMLayout>}></Route>
            <Route path='/privacy' element={<AMLayout>
                <Helmet>
                    <title>PrivacyPage</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/privacy" />
                </Helmet>
                <AMPrivacyPage />
            </AMLayout>}></Route>
            <Route path='/terms' element={<AMLayout>
                <Helmet>
                    <title>Terms and Conditions Page</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/terms" />
                </Helmet>
                <AMTermsPage />
            </AMLayout>}></Route>
            <Route path='/disposable-gown' element={<AMLayout>
                <Helmet>
                    <title>Disposable Gown Manufacturer in India | Amaryllis Healthcare</title>
                    <meta name="robots" content="index, follow" />
                    <meta name="description" content="Disposable Gown designed for safe, efficient, and comfortable infusion , backed by advanced features and trusted by healthcare professionals worldwide." />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/disposable-gown" />
                </Helmet>
                <DisposablePage />
            </AMLayout>}></Route>
            <Route path='/ot-pack' element={<AMLayout>
                <Helmet>
                    <title>OT Pack Manufacturer in India | Amaryllis Healthcare</title>
                    <meta name="robots" content="index, follow" />
                    <meta name="description" content="OT Pack designed for safe, efficient, and comfortable infusion , backed by advanced features and trusted by healthcare professionals worldwide." />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/ot-pack" />
                </Helmet>
                <OTPackPage />
            </AMLayout>}></Route>
            <Route path='/iv-cannula' element={<AMLayout>
                <Helmet>
                    <title>IV Cannula Manufacturer in India | Amaryllis Healthcare</title>
                    <meta name="robots" content="index, follow" />
                    <meta name="description" content="IV Cannulas designed for safe, efficient, and comfortable infusion , backed by advanced features and trusted by healthcare professionals worldwide." />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/iv-cannula" />
                </Helmet>
                <IVCannulaPage />
            </AMLayout>}></Route>
            <Route path='/face-masks' element={<AMLayout>
                <Helmet>
                    <title>Reliable Face Masks for Hospitals | Amaryllis Healthcare</title>
                    <meta name="robots" content="index, follow" />
                    <meta name="description" content="Hospital-grade, breathable 3 Ply masks-combining sterile, skin-friendly protection with lasting comfort and safety." />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/face-masks" />
                </Helmet>
                <FaceMaskPage />
            </AMLayout>}></Route>
            <Route path='/patient-gown' element={<AMLayout>
                <Helmet>
                    <title>Patient Gowns for Hospitals</title>
                    <meta name="robots" content="index, follow" />
                    <meta name="description" content="Breathable, skin-safe patient gowns built for comfort, dignity, and infection control. Designed to support mobility and meet clinical compliance." />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/patient-gown" />
                </Helmet>
                <PatientGownPage />
            </AMLayout>}></Route>
            <Route path='/disposable-bed-sheet' element={<AMLayout>
                <Helmet>
                    <title> Disposable Bed Sheets for Hospitals | Amaryllis Healthcare</title>
                    <meta name="robots" content="index, follow" />
                    <meta name="description" content="Lightweight, absorbent, and skin-safe single-use bed sheets. Simplifies sanitation, reduces cross-contamination, and keeps patients protected.." />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com//disposable-bed-sheet" />
                </Helmet>
                <BedSheetPage />
            </AMLayout>}></Route>
            <Route path='/why-amaryllis' element={<AMLayout>
                <Helmet>
                    <title>Why Hospitals Choose Us | Amaryllis Healthcare</title>
                    <meta name="robots" content="index, follow" />
                    <meta name="description" content="Discover why hospitals worldwide trust Amaryllis Healthcare, from innovation to certified manufacturing in gowns, drapes, IV cannulas and more." />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/why-amaryllis" />
                </Helmet>
                <AMWhyAmaryllisCoverPage />
            </AMLayout>}></Route>
            <Route path='/featured-products' element={<AMLayout>
                <Helmet>
                    <title>Featured Surgical Essentials | Amaryllis Healthcare</title>
                    <meta name="robots" content="index, follow" />
                    <meta name="description" content="Explore our featured surgical solutions including gowns, drapes, kits and other top performers selected by hospitals around the world." />
                    <link rel="canonical" href="https://www.amaryllishealthcare.com/featured-products" />
                </Helmet>
                <FeaturedProdPage />
            </AMLayout>}></Route>
        </Routes>
    )
}
export default AppRoutes;
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import { AMSolutionCard } from "../../../components/am-solution-card";
import useDeviceType from "../../../custom-hooks/userDevice";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiservice from "../../../api/apiservice";
import { useEffect, useState } from "react";


const AMSolutionCaps = () => {
    const responsiveCheck = useDeviceType()
    const [solCaps, setSolCaps] = useState([])

    const { data, error, isLoading } = useQuery({
        queryKey: ['solutionKits'],
        queryFn: apiservice.fetchSolutionKits,
    });

    useEffect(() => {
        if (data) {
            const catData = data["data"];
            const filterByInf = catData.sort((a, b) => Number(a.AMD_SolOrderType) - Number(b.AMD_SolOrderType)) || [];
            setSolCaps(filterByInf);
        }
    }, [data]);

    if (error) {
        return <div></div>
    }
    if (isLoading) {
        return <div></div>;
    }


    return (
        <
        >
            <div className="container-fluid am-why-marginclass am-medical-bg">
                <h3 className={`am-why-header ${responsiveCheck !== "mobile" && 'fa-2x'}`}>
                    Solutions - Capabilities Served
                </h3>
                {responsiveCheck === "mobile" ? (<>
                    <p className="am-libre-font" style={{ textAlign: 'left', marginTop: '-1.3rem' }}>Delivering Excellence to 15+ Surgical Specialties with Advanced Solutions for Every Procedure</p>
                </>) : <>
                    <p className="am-libre-font" style={{ marginTop: '-1.5rem', marginBottom: '1.6rem' }}>Delivering Excellence to 15+ Surgical Specialties with Advanced Solutions for Every Procedure</p>
                </>}
                <div className={`row am-why-padding ${responsiveCheck !== "mobile" ? "ps-3 pe-3" : "p-0"}`}>
                    {responsiveCheck === "mobile" ? (<>
                        {solCaps.map((item, index) => (
                            index < 2 &&
                            <div className="col-6">
                                <AMSolutionCard key={item.id} item={item} />
                            </div>
                        ))}
                    </>) : (<>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={4}
                            navigation
                            loop
                            mousewheel
                            modules={[Navigation, Pagination, Mousewheel]}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 8,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 8,
                                },
                                480: {
                                    slidesPerView: 2,
                                    spaceBetween: 8,
                                },
                                0: {
                                    slidesPerView: 2,
                                    spaceBetween: 8,
                                },
                            }}
                        >
                            {/* Image Slide */}
                            {solCaps.map((item, index) => (
                                index < 7 &&
                                <SwiperSlide key={item.id}>
                                    <AMSolutionCard key={item.id} item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>)}
                </div>
                <div className={`row am-why-padding mt-4 ${responsiveCheck !== "mobile" ? "ps-3 pe-3 py-2" : "p-0"}`}>
                    {responsiveCheck === "mobile" ? (<>
                        {solCaps.map((item, index) => (
                            index >= 7 && index <= 8 && (
                                <div className="col-6" key={index}>
                                    <AMSolutionCard key={index} item={item} />
                                </div>
                            )
                        ))}
                        <div className="d-flex justify-content-end mt-3">
                            <Link
                                className="text-decoration-none text-dark"
                                to={'/mobileSolutionPage'}>View all</Link>
                        </div>
                    </>) : (<>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={4} // Number of slides to show at once
                            navigation
                            loop // Enable infinite loop
                            mousewheel // Enable mousewheel control for slide transitions
                            modules={[Navigation, Pagination, Mousewheel]} // Include necessary modules
                            breakpoints={{
                                // When the screen width is 1024px or more
                                1024: {
                                    slidesPerView: 4, // Show 4 slides
                                    spaceBetween: 8,
                                },
                                // When the screen width is 768px to 1024px
                                768: {
                                    slidesPerView: 3, // Show 3 slides
                                    spaceBetween: 8,
                                },
                                // When the screen width is 480px to 768px
                                480: {
                                    slidesPerView: 2, // Show 2 slides
                                    spaceBetween: 8,
                                },
                                // When the screen width is smaller than 480px
                                0: {
                                    slidesPerView: 2, // Show 1 slide
                                    spaceBetween: 8,
                                },
                            }} // Responsive breakpoints

                        >
                            {/* Image Slide */}
                            {solCaps.map((item, index) => (
                                index > 6 && index < 15 &&
                                <SwiperSlide key={item.id}>
                                    <AMSolutionCard key={item.id} item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>)}
                </div>
            </div>
        </>
    )
}

export default AMSolutionCaps
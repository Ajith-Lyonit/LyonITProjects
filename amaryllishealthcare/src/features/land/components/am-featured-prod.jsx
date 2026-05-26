import { AMFeatureCard } from "../../../components/am-fea-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiservice from "../../../api/apiservice";
import useDeviceType from "../../../custom-hooks/userDevice";
import { Link } from "react-router-dom";

const AMFeatureProd = () => {
    const responsiveCheck = useDeviceType()
    const [products, setProducts] = useState([]);
    const { data, error, isLoading } = useQuery({
        queryKey: ['fDetails'],
        queryFn: () => apiservice.fetchFeaturedProducts(),
    });
    useEffect(() => {
        if (data) {
            const catData = data?.data || [];
            setProducts(catData);
        }
    }, [data]);

    if (isLoading) {
        return <div></div>;
    }
    if (error) {
        console.error('Error fetching data:', error);
        return < div></div>;
    }
    return (
        <
            >
            {products.length > 0 ? (
                <div className="container-fluid am-why-marginclass">
                    <h3 className="am-why-header">Featured Products</h3>
                    <div className={`row am-why-padding ${responsiveCheck == "mobile" && "p-1"}`}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={4}
                            navigation
                            loop
                            mousewheel
                            modules={[Navigation, Pagination, Mousewheel]}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 4, // Show 4 slides
                                    spaceBetween: 10// Space between slides
                                },
                                // When the screen width is 768px to 1024px
                                768: {
                                    slidesPerView: 3, // Show 3 slides
                                    spaceBetween: 8, // Space between slides
                                },
                                // When the screen width is 480px to 768px
                                480: {
                                    slidesPerView: 2, // Show 2 slides
                                    spaceBetween: 8, // Space between slides
                                },
                                // When the screen width is smaller than 480px
                                0: {
                                    slidesPerView: 1, // Show 1 slide
                                    spaceBetween: 8, // Space between slides
                                },
                            }}
                        >
                            {products.length > 0 &&
                                products.map(item => (
                                    <SwiperSlide key={item.id}>
                                        <AMFeatureCard item={item} />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                    {responsiveCheck === "mobile" && <div className="d-flex justify-content-end">
                        <Link
                            className="text-decoration-none text-dark"
                            state={{ title: 'Featured-Products', type: 'F' }}
                            to={'/medical-device-division'}
                        >View all
                        </Link>
                    </div>}
                </div>
            ) : (<>
            </>)}
        </>
    )
}
export default AMFeatureProd
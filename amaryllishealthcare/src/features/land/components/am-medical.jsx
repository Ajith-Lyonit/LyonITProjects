import { useQuery } from "@tanstack/react-query";
import apiservice from "../../../api/apiservice";
import { lazy, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import { ProductCategoryStates } from "../../../dvalues/data";
import { useRecoilValue } from "recoil";
import useDeviceType from "../../../custom-hooks/userDevice";
import { Link } from "react-router-dom";

const AmMedCard =  lazy(() => import("../../../components/am-med-card"));
const AMMedical = () => {
    const responsiveCheck = useDeviceType()
    const [products, setProducts] = useState([]);
    const catItems = useRecoilValue(ProductCategoryStates)
    const { data, error, isLoading } = useQuery({
        queryKey: ['medicalDetails'],
        queryFn: () => apiservice.fetchMedicalDevices(catItems.find((item) => item.AMD_CatTitle === 'Medical Device').AMD_CatTitle),
    });
    useEffect(() => {
        if (data) {
            const catData = data?.data.sort((a, b) => a.AMD_SerialNo.localeCompare(b.AMD_SerialNo)) || [];
            setProducts(catData);
        }
    }, [data]);

    if (isLoading) {
        return <div></div>;
    }
    if (error) {
        console.error('Error fetching data:', error);
        return <div>Error loading item details: {error.message}</div>;
    }


    return (
        <>
            <div className="container-fluid am-medical-bg am-why-marginclass">
                <h3 className="am-why-header">
                    Medical Device Consumables
                </h3>
                <div className={`row am-why-padding ${responsiveCheck === "mobile" && 'p-0'}`}>
                    {responsiveCheck === "mobile" ? (
                        <>
                            {products.map((product, prodindex) => (
                                prodindex < 4 &&
                                <div className="col-sm-6 col-6" key={product.id}>
                                    <AmMedCard spaceType={'LAND_PAGE'} breadtype={'M'} breadlink={undefined} displaytype={'MEDCICAL'} key={product.id} item={product} />
                                </div>
                            ))}
                            <div className="d-flex justify-content-end">
                                <Link
                                    className="text-decoration-none text-dark"
                                    state={{ title: 'Medical Device-Consumables', type: 'M' }}
                                    to={'/medical-device-division'}
                                >View all</Link>
                            </div>
                        </>) : (
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={6}
                            navigation
                            loop
                            mousewheel
                            modules={[Navigation, Pagination, Mousewheel]}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 6,
                                    spaceBetween: 10,
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
                                    slidesPerView: 1,
                                    spaceBetween: 8,
                                },
                            }}
                        >

                            {products.length > 0 ? (
                                products.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <div className="col" key={product.id}>
                                            <AmMedCard breadtype={'M'} breadlink={undefined} displaytype={'MEDCICAL'} key={product.id} item={product} />
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <div>No products available.</div>
                            )}
                        </Swiper>
                    )}
                </div>
            </div>
        </>
    )
}

export default AMMedical
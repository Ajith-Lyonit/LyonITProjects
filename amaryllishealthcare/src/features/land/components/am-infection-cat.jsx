import { useEffect, useState } from "react";
import { AmInfecCard } from "../../../components/am-infec-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import { useRecoilValue } from "recoil";
import { ProductCategoryStates } from "../../../dvalues/data";
import useDeviceType from "../../../custom-hooks/userDevice";
import { Link } from "react-router-dom";

const AMInfection = () => {
    const responsiveCheck = useDeviceType()

    const [catgories, setCategories] = useState([])
    const cats = useRecoilValue(ProductCategoryStates)

    useEffect(() => {
        if (cats) {
            const catData = cats;
            const filterByInf = catData.filter((item) => { return item.AMD_CatTitle !== 'Medical Device' })
            setCategories(filterByInf);
        }
    }, [cats]);

    return (
        < >
            <div className="container-fluid am-why-marginclass">
                <h3 className="am-why-header">
                    {responsiveCheck === "mobile" ? (<>
                        Infection Prevention Product <br /> Categories
                    </>) : (<>
                        Infection Prevention Product Categories
                    </>)}
                </h3>
                <div className={`row am-why-padding ${responsiveCheck === "mobile" && 'p-0'}`}>
                    {responsiveCheck === "mobile" ? (
                        <>
                            {catgories.map((item, index) => (
                                index < 4 &&
                                <div className="col-sm-6 col-6" key={index}>
                                    <AmInfecCard item={item} />
                                </div>
                            ))}
                            <div className="d-flex justify-content-end">
                                <Link
                                    className="text-decoration-none text-dark"
                                    state={{ title: 'Infection Prevention Division', type: 'I' }}
                                    to={'/infection-prevention-division'}>View all</Link>
                            </div>
                        </>
                    ) : (
                        <Swiper
                            spaceBetween={20}
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
                            {catgories.map(item => (
                                <SwiperSlide key={item.id}>
                                    <AmInfecCard key={item} item={item} />
                                </SwiperSlide>
                            ))}

                        </Swiper>
                    )}
                </div>
            </div>
        </>
    )
}

export default AMInfection
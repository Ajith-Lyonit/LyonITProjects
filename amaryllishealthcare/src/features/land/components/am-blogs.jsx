import { Swiper, SwiperSlide } from "swiper/react";
import { AMBlogCard } from "../../../components/am-blog-card"
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import apiservice from "../../../api/apiservice";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useDeviceType from "../../../custom-hooks/userDevice";
import { Link } from "react-router-dom";

const AMBlogs = () => {
    const responsiveCheck = useDeviceType()
    const [blogList, setBlogList] = useState([])
    const {
        data: blog,
        error: blogerror,
        isLoading: isBlogLoading,
    } = useQuery({
        queryKey: ['blogHomeData'],
        queryFn: apiservice.fetchBlogsList,
    });

    useEffect(() => {
        if (isBlogLoading) {
            console.log('Loading blogs...');
        } else if (blog) {
            console.log('Fetched blogs data:', blog);
            const data = blog?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            console.log('Data set', data);
            setBlogList(data);
        } else if (blogerror) {
            console.error('Error fetching blogs:', blogerror);
        } else {
            console.log('Blogs data not available');
        }
    }, [blog, blogerror, isBlogLoading]);
    return (
        <
            >
            <div className="container-fluid am-why-marginclass">
                <h3 className="am-why-header">Latest Blogs</h3>
                <div className={`row am-why-padding ${responsiveCheck === "mobile" && "p-0"}`}>
                    {responsiveCheck === "mobile" ? (<>
                        {blogList.map((item, index) => (
                            index < 4 &&
                            <div className="col-6 mb-2">
                                <AMBlogCard key={item} item={item} />
                            </div>
                        ))}
                        <div className="d-flex justify-content-end">
                            <Link
                                className="text-decoration-none text-dark"
                                to={'/blogs'}
                            >View all</Link>
                        </div>
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
                                    slidesPerView: 2,
                                    spaceBetween: 8,
                                },
                            }}
                        >
                            {blogList.map(item => (
                                <SwiperSlide key={item.id}>
                                    <AMBlogCard key={item} item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>)}
                </div>
            </div>
        </>
    )
}

export default AMBlogs
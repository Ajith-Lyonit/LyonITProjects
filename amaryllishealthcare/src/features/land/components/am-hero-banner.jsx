import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import apiservice, { apiurl } from "../../../api/apiservice";
import useDeviceType from "../../../custom-hooks/userDevice";
import { useRecoilValue } from "recoil";
import { ProductCategoryStates } from "../../../dvalues/data";
import { useMemo, Suspense } from "react";

const AMHeroBanner = () => {
  const responsiveCheck = useDeviceType();
  const surgicalGowns = useRecoilValue(ProductCategoryStates);

  const { data } = useQuery({
    queryKey: ["mainsliderDetails"],
    queryFn: apiservice.fetchMainSliders,
    staleTime: 1000 * 60 * 15,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    suspense: true,
  });

  const mainSlider = useMemo(() => {
    if (!data) return [];
    const catData = data["data"];
    return responsiveCheck !== "mobile"
      ? catData[0]["AMD_Desktopslide"]
      : catData[0]["AMD_Mobileslide"];
  }, [data, responsiveCheck]);

  const swiperConfig = useMemo(
    () => ({
      spaceBetween: 10,
      slidesPerView: 1,
      pagination: { clickable: true },
      loop: true,
      navigation: true,
      speed: 1000,
      autoHeight: false, // ✅ prevents layout shift
      modules: [Navigation, Pagination, Autoplay],
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    }),
    []
  );

  return (
    <div className="swiper-container min-h-[800px] w-full overflow-hidden">
      <Swiper {...swiperConfig}>
        {mainSlider.map((slides, idx) =>
          slides.mime !== "video/mp4" ? (
            <SwiperSlide className="custom-slide-swiper" key={idx}>
              <div className="w-full min-h-[800px] relative">
                {slides?.alternativeText === "Infection Page" ? (
                  <Link to="/infection-prevention-division">
                    <button className="am-button-click absolute z-10">
                      Explore Our Surgical & Medical Solutions
                    </button>

                    <picture>
                      <source
                        srcSet={`${apiurl + slides.url}?format=avif`}
                        type="image/avif"
                        title={slides?.name}
                      />
                      <source
                        srcSet={`${apiurl + slides.url}?format=webp`}
                        type="image/webp"
                        title={slides?.name}
                      />
                      <img
                        src={apiurl + slides.url}
                        title={slides?.name}
                        alt={slides?.alternativeText || "main slider"}
                        loading={idx === 0 ? "eager" : "lazy"}
                        decoding="async"
                        fetchpriority={idx === 0 ? "high" : "auto"}
                        className="w-full h-full object-cover"
                        width="1920"
                        height="800"
                      />
                    </picture>
                  </Link>
                ) : (
                  surgicalGowns && (
                    <Link
                      to="/infection-prevention-division/surgical-gowns"
                      state={surgicalGowns}
                    >
                      <picture>
                        <source
                          srcSet={`${apiurl + slides.url}?format=avif`}
                          type="image/avif"
                          title={slides?.name}
                        />
                        <source
                          srcSet={`${apiurl + slides.url}?format=webp`}
                          type="image/webp"
                          title={slides?.name}
                        />
                        <img
                          src={apiurl + slides.url}
                          title={slides?.name}
                          alt={slides?.alternativeText || "main slider"}
                          loading={idx === 0 ? "eager" : "lazy"}
                          decoding="async"
                          fetchpriority={idx === 0 ? "high" : "auto"}
                          className="w-full h-full object-cover"
                          width="1920"
                          height="800"
                        />
                      </picture>
                    </Link>
                  )
                )}
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide className="custom-slide-swiper" key={idx}>
              <div className="video-container w-full min-h-[800px] relative overflow-hidden">
                <Link
                  className="text-decoration-none"
                  state={{ title: "Medical Device-Consumables", type: "M" }}
                  to="/medical-device-division"
                >
                  <video
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    poster="/video-poster.jpg"
                    fetchpriority="high"
                    className="video w-full h-full object-cover"
                    width="1920"
                    height="800"
                    title={slides?.name}
                  >
                    <source
                      src={`${apiurl + slides.url}?format=webm`}
                      type="video/webm"
                      title={slides?.name}
                    />
                    <source src={apiurl + slides?.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Link>

                <div className="gradient-text absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h5 className="text-center">
                    South India's first fully automated <br /> plant for medical
                    device consumables
                  </h5>
                </div>

                <div className="gradientbutton absolute bottom-10 left-10 z-10">
                  <Link
                    className="text-decoration-none"
                    state={{
                      title: "Medical Device-Consumables",
                      type: "M",
                    }}
                    to="/medical-device-division"
                  >
                    <button>See How We Innovate</button>
                  </Link>
                </div>

                <div className="gradient-overlay absolute inset-0"></div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

const AMHeroBannerWithSuspense = () => (
  <Suspense
    fallback={
      <div className="w-full min-h-[800px] bg-gray-100"></div>
    }
  >
    <AMHeroBanner />
  </Suspense>
);

export default AMHeroBannerWithSuspense;

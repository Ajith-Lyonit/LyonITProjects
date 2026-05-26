import { useState, useEffect, Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import apiservice, { apiurl } from "../../api/apiservice";
import useDeviceType from "../../custom-hooks/userDevice";
import { useRecoilValue } from "recoil";
import { HomeBannerStates } from "../../dvalues/data";
import { ReferType } from "../../constants/config";


// Lazy load the solution card component
const AMSolutionCard = lazy(() =>
  import("../../components/am-solution-card").then((m) => ({
    default: m.AMSolutionCard,
  }))
);

export const AmMobileSolCaps = () => {
  const responsiveCheck = useDeviceType();
  const homeState = useRecoilValue(HomeBannerStates);
  const [solCaps, setSolCaps] = useState([]);
  const [bgImg, setBgImg] = useState("");

  useEffect(() => {
    const iItem = homeState.find(
      (item) => item?.AMD_BannerType === ReferType.AMDB_SOLUTIONS
    );
    const imageUrl =
      responsiveCheck === "mobile" ? iItem?.AMD_Bannermobile?.url : iItem?.AMD_Banner?.url;
    if (imageUrl && imageUrl !== bgImg) {
      setBgImg(imageUrl);
    }
  }, [homeState, responsiveCheck, bgImg]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["solutionKits"],
    queryFn: apiservice.fetchSolutionKits,
  });

  useEffect(() => {
    if (data) {
      const catData = data.data;
      const filterByInf =
        catData.sort((a, b) => Number(a.AMD_SolOrderType) - Number(b.AMD_SolOrderType)) || [];
      setSolCaps(filterByInf);
    }
  }, [data]);

  if (error) return <div></div>;
  if (isLoading) return <div></div>;

  return (
    <div className="bounce-div">

      {/* Banner */}
      <div
        className="container-fluid am-why-marginclass am-mobile-sol-caps"
        style={{
          backgroundImage: `url(${apiurl + bgImg})`,
          backgroundSize: "contain",
          height: "17.5rem",
          width: "100%",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container-fluid">
        <h1 className={`am-why-header ${responsiveCheck !== "mobile" && "fa-2x"}`}>
          Solutions - Capabilities Served
        </h1>
        <p
          className="am-libre-font"
          style={{
            textAlign: responsiveCheck === "mobile" ? "justify" : "initial",
            marginTop: responsiveCheck === "mobile" ? "-1.3rem" : "-1.5rem",
            marginBottom: responsiveCheck !== "mobile" ? "1.6rem" : undefined,
          }}
        >
          Delivering Excellence to 15+ Surgical Specialties with Advanced Solutions for Every Procedure
        </p>

        <div className="row am-why-padding p-0">
          <Suspense fallback={<div>Loading solutions...</div>}>
            {responsiveCheck === "mobile" &&
              solCaps.map((item) => (
                <div className="col-6 mb-4" key={item.id}>
                  <AMSolutionCard item={item} />
                </div>
              ))}
          </Suspense>
        </div>
      </div>

    </div>
  );
};

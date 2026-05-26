import useDeviceType from "../../../custom-hooks/userDevice";
import AMPartner from "./am-partner";
import AMWhyExpplain from "./am-why-exaplain";

const AMWhy = () => {
    const responsiveCheck = useDeviceType()
    return (
        <>
            <div className="container-fluid am-medical-bg py-4">
                <div className="text-center">
                    <img
                        src={responsiveCheck !== "mobile" ? "/Amaryllislogo.png" : "/HeroAmmaryllis.png"}
                        alt="Amaryllis Healthcare"
                        width={responsiveCheck !== "mobile" ? 200 : 200}
                        height={responsiveCheck !== "mobile" ? 60 : 40}
                        style={{
                            height: responsiveCheck === "mobile" ? "40px" : "60px",
                            width: "auto",
                            maxWidth: "100%"
                        }}
                        decoding="async"
                        loading="lazy"
                    />
                </div>
                <AMPartner />
                <AMWhyExpplain />
            </div>
        </>
    )
}

export default AMWhy
import useDeviceType from "../../../custom-hooks/userDevice";

const AMPartner = () => {
    const responsiveCheck = useDeviceType()
    return (
        <>
            <h3 className="fa-1x text-center" style={{ marginTop: '0.8rem' }}>
                {responsiveCheck === "mobile" ? (
                    <span className="am-libre-font">Protecting 100+ Million Lives with <br /> Trusted Surgical and Medical Solutions</span>
                ) : (
                    <span className="am-libre-font">Protecting 100+ Million Lives with Trusted Surgical and Medical Solutions</span>
                )}
            </h3>
        </>
    )
}

export default AMPartner 
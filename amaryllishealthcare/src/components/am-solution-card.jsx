import { Link } from "react-router-dom"
import useDeviceType from "../custom-hooks/userDevice"
import { apiurl } from "../api/apiservice"


export const AMSolutionCard = ({ item }) => {
    console.log("sol items",item)
    const responsiveCheck = useDeviceType()
    return (
        responsiveCheck === "mobile" ? (<Link to={'/solutionPage'} state={item}>
            <div className="am-solution-card">
                <div className={`am-solution-img  ${responsiveCheck === "mobile" ? "p-2" : "p-3"}`}>
                    {responsiveCheck === "mobile" ? (<>
                        <img style={{ borderRadius: 6, width: '100%' }}
                            src={apiurl + item?.AMD_SolDisplayMobile?.url}
                            alt={item?.AMD_SolDisplayMobile?.alternativeText}
                            title={item?.AMD_SolDisplayMobile?.name} />
                    </>) : (<>
                        <img src={apiurl + item?.AMD_SolDisplayDesk?.url} className="img-fluid rounded"
                            alt={item?.AMD_SolDisplayDesk?.alternativeText}
                            title={item?.AMD_SolDisplayDesk?.name}
                        />
                    </>)}
                </div>
                <div className="am-solution-content">
                    <h6>
                        {item?.AMD_SolTitle?.split(' ').length === 1 ? (
                            item?.AMD_SolTitle
                        ) : item?.AMD_SolTitle?.split(' ').length === 2 ? (
                            <>
                                {item?.AMD_SolTitle?.split(' ')[0]}
                                <br />
                                {item?.AMD_SolTitle?.split(' ')[1]}
                            </>
                        ) : (
                            <>
                                {item?.AMD_SolTitle?.split(' ').slice(0, 2).join(' ')}
                                <br />
                                {item?.AMD_SolTitle?.split(' ').slice(2).join(' ')}
                            </>
                        )}
                    </h6>

                    <Link to={`/solutioncapabilities/${item?.AMD_SOLURLName}`} state={item}>
                        {responsiveCheck !== "mobile" ? (<>
                            <button>
                                Explore&nbsp;&nbsp;more &nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                            </button></>) : (<>
                                <button>
                                    <i className="fa-solid fa-angle-right"></i>
                                </button>
                            </>)}
                    </Link>
                </div>
            </div>
        </Link>) : (<>
            <div className="am-solution-card">
                <div className={`am-solution-img  ${responsiveCheck === "mobile" ? "p-2" : "p-3"}`}>
                    {responsiveCheck === "mobile" ? (<>
                        <img style={{ borderRadius: 6, width: '100%' }} src={apiurl + item?.AMD_SolDisplayMobile?.url}
                            alt={item?.AMD_SolDisplayMobile?.alternativeText}
                            title={item?.AMD_SolDisplayMobile?.name}
                        />
                    </>) : (<>
                        <img src={apiurl + item?.AMD_SolDisplayDesk?.url} className="img-fluid rounded"
                            alt={item?.AMD_SolDisplayDesk?.alternativeText}
                            title={item?.AMD_SolDisplayDesk?.name} />
                    </>)}
                </div>
                <div className="am-solution-content">
                    <h6>
                        {item?.AMD_SolTitle?.split(' ').length === 1 ? (
                            item?.AMD_SolTitle
                        ) : item?.AMD_SolTitle?.split(' ').length === 2 ? (
                            <>
                                {item?.AMD_SolTitle?.split(' ')[0]}
                                <br />
                                {item?.AMD_SolTitle?.split(' ')[1]}
                            </>
                        ) : (
                            <>
                                {item?.AMD_SolTitle?.split(' ').slice(0, 2).join(' ')}
                                <br />
                                {item?.AMD_SolTitle?.split(' ').slice(2).join(' ')}
                            </>
                        )}
                    </h6>

                    <Link to={`/solutioncapabilities/${item?.AMD_SOLURLName}`} state={item}>
                        {responsiveCheck !== "mobile" ? (<>
                            <button>
                                Explore&nbsp;&nbsp;more &nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                            </button></>) : (<>
                                <button>
                                    <i className="fa-solid fa-angle-right"></i>
                                </button>
                            </>)}
                    </Link>
                </div>
            </div>
        </>)
    )
}
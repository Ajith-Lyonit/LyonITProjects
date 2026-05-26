import { Link } from "react-router-dom";
import abl1 from "../img/abl1.jpeg";
import abl2 from "../img/abl2.jpeg";

 const AMAboutCardOne = () => {
    return (
        <
        >
            <div className="container-fluid am-prod-about-card-one py-3">
                <h3 className="mb-5">Our Specialized Product Lines</h3>
                <div className="row">
                    <div className="col-lg-6 ps-2">
                        <div className="am-prod-card-l1">
                            <img src={abl1} className="img-fluid" alt="" />
                            <h3>Infection <br /> Prevention Division</h3>
                            <Link
                                className="text-decoration-none text-white"
                                state={{ title: 'Infection Prevention Division', type: 'I' }}
                                to={'/infection-prevention-division'}>
                                <button>Explore more&nbsp;<i class="fa-solid fa-angle-right"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="am-prod-card-l1">
                            <img src={abl2} className="img-fluid" alt="" />
                            <h3>Medical Device <br /> Consumables</h3>
                            <Link className="text-decoration-none text-white"
                                state={{ title: 'Medical Device-Consumables', type: 'M' }}
                                to={'/medical-device-division'}>
                                <button>Explore more&nbsp;<i class="fa-solid fa-angle-right"></i></button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AMAboutCardOne;
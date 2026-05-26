import useDeviceType from '../../../custom-hooks/userDevice';
import wh1 from '../img/fav1.png';
import wh2 from '../img/fav2.png';
import wh3 from '../img/fav3.png';

const AMWhyExpplain = () => {
    const responsiveCheck = useDeviceType()

    const startDate = new Date(2010, 6);
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    if (
        now.getMonth() < startDate.getMonth() ||
        (now.getMonth() === startDate.getMonth() && now.getDate() < startDate.getDate())
    ) {
        years--;
    }
    return (
        <>
            <div>
                <div className="am-why-explain">
                    <div className="am-card-why">
                        <img src={wh1} alt="experience in years" title="experience in years" className="img-fluid" />&nbsp;
                        <h3>{years}+&nbsp;</h3>
                        <p>Years of industry <br />experience</p>
                    </div>
                    <div className='am-why-line mt-3'></div>
                    <div className="am-card-why">
                        <img src={wh2} alt="medical and surgical categories" title="medical and surgical categories" className="img-fluid"  />&nbsp;
                        <h3>15+&nbsp;</h3>
                        <p>Medical & Surgical <br />
                            Product Categories</p>
                    </div>
                    <div className='am-why-line mt-3'></div>
                    <div className="am-card-why">
                        <img src={wh3} alt="countries trusting our products" title="countries trusting our products" className="img-fluid" />&nbsp;
                        <h3>15+&nbsp;</h3>
                        {responsiveCheck !== "mobile" ? (
                            <p>Countries Trusting Our <br />
                                Products</p>
                        ) : (
                            <p>Countries Trusting Our
                                Products</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AMWhyExpplain
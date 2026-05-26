import { Link } from "react-router-dom"
import useDeviceType from "../../../custom-hooks/userDevice"

export const AmContactInit = () => {
     const responsiveCheck = useDeviceType()
     return (
          <>
               {responsiveCheck !== "mobile" && <div className="container-fluid am-career-bredcrump">
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>Contact Us</span>
               </div>}
               <div className="container-fluid am-contact-init">
                    <h2>Let's connect! Reach out to us today</h2>
               </div>
          </>
     )
}
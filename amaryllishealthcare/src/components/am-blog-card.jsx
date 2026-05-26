import { Link, useNavigate } from "react-router-dom"
import { apiurl } from "../api/apiservice"
import useDeviceType from "../custom-hooks/userDevice"

export const AMBlogCard = ({ item }) => {
    console.log(item)
    const responsiveCheck = useDeviceType()
    const useTypeItem = useNavigate()
    return (
        <div className="am-blog-card" onClick={() => responsiveCheck==="mobile"? useTypeItem(`/blogs/${item.AMD_BlogurlName}`, { state: item }):''}>
            <div className="am-blog-img">
                <img src={`${apiurl}${item?.AMD_DisplayBlogImage?.formats?.thumbnail?.url}`} 
                 alt={item?.AMD_DisplayBlogImage?.alternativeText}
                title={item?.AMD_DisplayBlogImage?.name} />
            </div>
            <span className="am-blog-label">{item?.blogcategory?.AMD_Title}</span>
            <div className="am-blog-title">
                {responsiveCheck === "mobile" ? (
                    <p>{item?.AMD_Title.length > 50 ? item?.AMD_Title?.substring(0, 38) + "..." : item?.AMD_Title}</p>
                ) : (
                    <p>{item.AMD_Title}</p>
                )}
            </div>
            <div className="am-blog-dates">
                {responsiveCheck === "mobile" ? (<>
                    <p>
                        {new Date(item?.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                    <Link to={'/blogs/'+item.AMD_BlogurlName} state={item} className="text-decoration-none text-danger pe-2">
                        <p><i className="fa-solid fa-angle-right "></i></p>
                    </Link>
                </>) : (<>
                    <p>
                        {new Date(item?.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                    <Link to={'/blogs/'+item.AMD_BlogurlName} state={item} className="text-decoration-none text-danger pe-2">
                        <p>Read&nbsp;&nbsp;more &nbsp;<i className="fa-solid fa-angle-right "></i></p>
                    </Link>
                </>)}
            </div>

        </div>
    )
}
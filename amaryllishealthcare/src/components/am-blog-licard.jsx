import { Link } from "react-router-dom"
import { apiurl } from "../api/apiservice"

const AMBlogListCard = ({ item }) => {

    return (
        <div className="am-blog-list-card">
            <div className="am-blog-list-img">
                <img
                    src={`${apiurl}${item?.AMD_DisplayBlogImage?.formats?.thumbnail?.url}`}
                    alt={item?.AMD_DisplayBlogImage?.alternativeText}
                    title={item?.AMD_DisplayBlogImage?.name} />
            </div>
            <div className="am-blog-list-content">
                <h5 data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={item.AMD_Title}>{item.AMD_Title.length > 60 ? item.AMD_Title.substring(0, 60) + "..." : item.AMD_Title}</h5>
                {item?.AMD_SubTitleOne && <p>{item.AMD_SubTitleOne.length > 120 ? item.AMD_SubTitleOne.substring(0, 120) + "..." : item.AMD_SubTitleOne}</p>}
            </div>
            <div className="am-blog-list-footer">
                <p>{new Date(item?.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}</p>
                <Link to={'/blogs/' + item.AMD_BlogurlName} state={item} className="text-danger text-decoration-none pe-1">
                    <p>Read&nbsp;&nbsp;more &nbsp;<i className="fa-solid fa-angle-right"></i></p>
                </Link>
            </div>
        </div>
    )
}

export default AMBlogListCard
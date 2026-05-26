import { Link } from "react-router-dom"
import { apiurl } from "../api/apiservice"
import { useEffect, useState } from "react";
import useDeviceType from "../custom-hooks/userDevice";

export const AmInfecCard = ({ item }) => {
  const responsiveCheck = useDeviceType()
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (item?.image?.formats?.thumbnail?.url) {
      setImageUrl(item.image?.formats?.thumbnail?.url);
    }
    if (item?.AMD_CatTitle) {
      setTitle(item.AMD_CatTitle);
    }
  }, [item]);
  return (
    <div className="am-infection-card">
      <div>
        <h5>{title}</h5>
        <Link
          to={`/infection-prevention-division/${decodeURIComponent(item.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-')
            }`}
          state={item}
        >
          <button className="am-infec-button">
            {responsiveCheck === "mobile" ? (
              <><i className="fa-solid fa-angle-right"></i></>
            ) : (
              <>Explore&nbsp;&nbsp;more &nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i></>
            )}
          </button>
        </Link>
      </div>
      <div className="am-infec-img">
        {imageUrl ? (
          <img src={`${apiurl}${imageUrl}`} alt={title} key={imageUrl} title={title} />
        ) : (
          <p className="text-white p-3">coming soon...</p>
        )}
      </div>
    </div>
  )
}
import { Suspense, lazy, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiservice, { apiurl } from "../../../api/apiservice";
import { Link } from "react-router-dom";
import { BlogsListStates, HomeBannerStates } from "../../../dvalues/data";
import { useRecoilState, useRecoilValue } from "recoil";
import useDeviceType from "../../../custom-hooks/userDevice";
import { ReferType } from "../../../constants/config";

const AMBlogListCard = lazy(() => import("../../../components/am-blog-licard"));

export const AMBlogList = () => {
  const responsiveCheck = useDeviceType();
  const [blogList, setBlogList] = useState([]);
  const [blgCategories, setBlgCategories] = useState([]);
  const [filteredBlogList, setFilteredBlogList] = useState(blogList);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [bgImg, setBgImg] = useState("");
  const homeState = useRecoilValue(HomeBannerStates);
  const [blogsProduct, setBlogsProduct] = useRecoilState(BlogsListStates);

  // Set banner image based on device
  useEffect(() => {
    const iItem = homeState.find((item) => item?.AMD_BannerType === ReferType.AMDB_BLOGS);
    const imageUrl = responsiveCheck === "mobile" ? iItem?.AMD_Bannermobile?.url : iItem?.AMD_Banner?.url;
    if (imageUrl && imageUrl !== bgImg) setBgImg(imageUrl);
  }, [homeState, bgImg, responsiveCheck]);

  // Handle category change
  const handleChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    const filterBlogs =
      newCategory !== "ALL"
        ? blogList.filter((item) => item.blogcategory?.AMD_Title === newCategory)
        : blogList;
    setFilteredBlogList(filterBlogs);
  };

  // Fetch categories
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categoriesData"],
    queryFn: apiservice.fetchBlogCategories,
  });

  // Fetch blogs
  const { data: blogData, isLoading: isLoadingBlogs } = useQuery({
    queryKey: ["blogListData"],
    queryFn: apiservice.fetchBlogsList,
    refetchInterval: 10000,
  });

  // Set category state
  useEffect(() => {
    if (categoriesData) setBlgCategories(categoriesData.data);
  }, [categoriesData]);

  // Set blog list state
  useEffect(() => {
    if (blogData) {
      console.log(blogData);
      const data = [...blogData.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBlogList(data);
      setBlogsProduct(data);
      setFilteredBlogList(data);
    }
  }, [blogData, setBlogsProduct]);


  return (
    <Suspense fallback={<p>Loading...</p>}>
      {/* Breadcrumb */}
      {responsiveCheck !== "mobile" && (
        <div className="container-fluid am-career-bredcrump">
          <Link to="/" className="text-dark text-decoration-none">
            Home
          </Link>
          &nbsp;<i className="fa-solid fa-angle-right"></i>&nbsp;
          <span>Blogs</span>
        </div>
      )}

      {/* Banner */}
      <div
        className="am-blog-list-bg"
        style={{
          height: responsiveCheck === "mobile" ? "17.5rem" : "10rem",
          backgroundSize: responsiveCheck === "mobile" ? "cover" : "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          objectFit: "cover",
          width: "100%",
          backgroundImage: `url(${apiurl + bgImg})`,
        }}
      />

      {/* Blog header + category select */}
      <div className="container-fluid">
        <div className="am-blg-img">
          <h1 className="am-why-header pt-3 pb-3">Knowledge</h1>
          <div>
            <select className="text-dark" value={selectedCategory} onChange={handleChange}>
              <option value="ALL">All</option>
              {blgCategories.map((item) => (
                <option key={item.id} value={item.AMD_Title}>
                  {item.AMD_Title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog list */}
        <div className="row" style={{ marginTop: "-0.5rem" }}>
          {isLoadingBlogs || isLoadingCategories ? (
            <div></div>
          ) : filteredBlogList.length > 0 ? (
            filteredBlogList.map((data) => (
              <div className="col-lg-4" key={data.id}>
                <AMBlogListCard item={data} />
              </div>
            ))
          ) : (
            <div>No blogs available</div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

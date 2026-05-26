import { useRecoilValue } from "recoil";
import { ProductCategoryStates } from "../dvalues/data";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiservice from "../api/apiservice";
import { Link } from "react-router-dom";

const AMFooterLog = () => {
    const cats = useRecoilValue(ProductCategoryStates)
    const [keywordData, setKeywordData] = useState([])

    const handleUpKeyword = () => {
        window.scrollTo(0, 0);
    }
    const { data: keyword, error: errorKeywords, isLoading: isKeywordsLoading } = useQuery({
        queryKey: ['keywords'],
        queryFn: apiservice.fetchKeywordBuckets,
    });


    useEffect(() => {
        if (keyword && keyword["data"] && cats) {
            const keyList = keyword["data"];
            const catList =cats;
            let keyData = [];
            catList.forEach(element => {
                if (element.AMD_CatTitle !== "Medical Device") {
                    const mappedData = keyList.map((keyItem) => {
                        return {
                            id: element.AMD_CatTitle.trim() === keyItem.AMD_CateogryName.trim() ? element.id : 0,
                            AMD_CatTitle: keyItem.AMD_CateogryName,
                            AMD_DeskBanner: element.AMD_DeskBanner,
                            AMD_MobileBanner: element.AMD_MobileBanner,
                            AMD_Keywords: keyItem.AMD_Keywords,
                            image: element.image
                        };
                    });
                    mappedData.forEach(item => {
                        if (!keyData.some(existingItem => existingItem.id === item.id)) {
                            keyData.push(item);
                        }
                    });
                }
            });
            setKeywordData(keyData);

        }
    }, [keyword]);

    if (errorKeywords) {
        return <div></div>;
    }


    return (
        <div className="container-fluid am-down-footer">
            <div className="am-down-container">
                <div className="am-down-content">
                    <p className="text-white">Most Searched</p>
                </div>
                {keywordData.map((items) => (
                    <div className="am-down-content" key={items.id}>
                        <div className="text-white">{items.AMD_CatTitle}</div>
                        <p>
                            {items.AMD_Keywords.split(',').map((keyword, index) => (
                                <Link
                                    key={index}
                                    onClick={handleUpKeyword}
                                    className="text-white text-decoration-none"
                                    to={`${'/infection-prevention-division'}/${decodeURIComponent(items?.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-').split("_").slice(0, 2).join("-")}`} 
                                    state={items}
                                >
                                    {keyword.trim()}
                                </Link>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AMFooterLog
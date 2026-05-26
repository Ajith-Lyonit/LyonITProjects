import { useQuery } from "@tanstack/react-query";
import apiservice from "../../api/apiservice";
import { useParams } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
const AMProductDetail = lazy(() => import("../../features/proddet/components/am-prodet-page"));

export const ProdDetPage = () => {
    const { type } = useParams();

    const formattedUrl = type
        .split('-')
        .join(' ')
        .charAt(0)
        .toUpperCase() + type.split('-').join(' ').slice(1);

    const [productDetail, setProdDetail] = useState([]);
    const { data, error, isLoading } = useQuery({
        queryKey: ['productDatas', formattedUrl],
        queryFn: () => apiservice.fetchProductDetailById(formattedUrl)
    });

    useEffect(() => {
        if (data) {
            const catData = data.data;
            setProdDetail(catData);
        }
    }, [data]);

    if (isLoading) {
        return <div className="text-center vh-100"><div></div></div>;
    }

    if (error) {
        return <div>Error loading item details: {error.message}</div>;
    }

    return (
        <Suspense fallback={<div className="text-center vh-100"><div></div></div>}>
            <div className="bounce-div">
                {productDetail.length > 0 ? (
                    <AMProductDetail item={productDetail[0]} />
                ) : (
                    <div>No product details available</div>
                )}
            </div>
        </Suspense>
    );
};

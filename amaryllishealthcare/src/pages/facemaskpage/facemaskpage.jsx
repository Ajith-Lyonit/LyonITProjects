import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiservice from "../../api/apiservice";
import { AMFaceMask } from "../../features/facemask/facemask";

export const FaceMaskPage = () => {
  const [productDetail, setProdDetail] = useState(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["productDatas"],
    queryFn: () => apiservice.fetchProductDetailById("Face mask 3ply blue tie"),
  });

  useEffect(() => {
    if (data?.data?.length) {
      setProdDetail(data.data[0]);
    }
  }, [data]);

  if (isLoading) return <div className="text-center vh-100"><div></div></div>;
  if (error) return <div className="text-center py-20">Error loading item details: {error.message}</div>;
  if (!productDetail) return <div className="text-center py-20">No product details available</div>;

  return (
    <div className="bounce-div">
      <AMFaceMask item={productDetail} />
    </div>
  );
};

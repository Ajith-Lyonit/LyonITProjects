import React, { lazy, useEffect, useState } from "react";
import apiservice from "../../api/apiservice";
import { useQuery } from "@tanstack/react-query";
import useDeviceType from "../../custom-hooks/userDevice";
import { Link } from "react-router-dom";
import ReadMoreWrapper from "../../components/am-pragraph-readmore";

const AmMedCard = lazy(() => import("../../components/am-med-card"));
export const AMPatientGown = () => {
    const responsiveCheck = useDeviceType();

    const { data } = useQuery({
        queryKey: ['patientGownDet'],
        queryFn: () => apiservice.fetchMedicalDevices('Surgical Gowns'),
    });

    const [patientGownItems, setIvPatientGownItems] = useState([]);

    useEffect(() => {
        if (data?.data) {
            const filtered = data.data.filter((device) => { return device?.AMD_Title === "Patient gown" });
            setIvPatientGownItems(filtered);
        }
    }, [data]);

    const renderNode = (node) => {
        if (!node) return null;
        switch (node.type) {
            case 'paragraph':
                return (
                    <p style={{ marginBottom: '0.5rem' }}>
                        {node.children.map((child, index) => renderNode(child, index))}
                    </p>
                );
            case 'heading':
                const HeadingTag = `h${node.level}`;
                return (
                    <HeadingTag style={{ fontSize: responsiveCheck === "mobile" ? '0.8rem' : '1.8rem' }}>
                        {node.children.map((child, index) => renderNode(child, index))}
                    </HeadingTag>
                );
            case 'list':
                const ListTag = node.format === 'unordered' ? 'ul' : 'ol';
                return (
                    <ListTag>
                        {node.children.map((child, index) => renderNode(child, index))}
                    </ListTag>
                );
            case 'list-item':
                return (
                    <li>
                        {node.children.map((child, index) => renderNode(child, index))}
                    </li>
                );
            case 'link':
                return (
                    <a
                        href={node.url}
                        target="_blank"
                        className="fw-light"
                        rel="noopener noreferrer"
                        style={{ fontSize: responsiveCheck === "mobile" ? '0.5rem' : '1rem' }}
                    >
                        {node.children && node.children.map((child, index) => renderNode(child, index))}
                    </a>
                );
            case 'text':
                return node.bold ? <strong>{node.text}</strong> : node.text;
            default:
                return null;
        }
    };

    return (
        <>
            {responsiveCheck !== "mobile" && <div className="container-fluid am-career-bredcrump">
                <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>Patient Gowns</span>
            </div>}
            <div className="container-fluid am-prod-bg"
                style={{
                    height: responsiveCheck === "mobile" ? '17.5rem' : '10rem',
                    backgroundSize: responsiveCheck === "mobile" ? 'cover' : 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    objectFit: 'cover',
                    width: '100%',
                    backgroundColor: '#309ECA',
                    position: 'relative',
                }}
            >
                <span className="fw-bold text-white" style={{ top: '3rem', position: 'absolute', fontSize: '2.5rem' }}>Patient Gowns</span>
            </div>
            <div className="container-fluid py-3">
                {responsiveCheck === "mobile" && (
                    (<span className="fw-bold">Patient Gowns</span>))}
                <div className="row">
                    {patientGownItems.map((product) => (
                        <div className={`${responsiveCheck === 'mobile' ? 'col-6' : 'col-lg-2'} py-3`} key={product.id}>
                            <AmMedCard linktype={'medical-device-division'} key={product.id} item={product} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="container-fluid">
                <ReadMoreWrapper>
                    {patientGownItems[0]?.AMD_SEOContent?.map((node, index) => (
                        <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                    ))}
                </ReadMoreWrapper>
            </div>
        </>
    );
};

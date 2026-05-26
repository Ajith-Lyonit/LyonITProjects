import React, { lazy, useMemo, useState } from "react";
import apiservice, { apiurl } from "../../../api/apiservice";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { config, subjectConfig } from "../../../constants/config";
import useDeviceType from "../../../custom-hooks/userDevice";
import { Helmet } from "react-helmet";
import ReadMoreWrapper from "../../../components/am-pragraph-readmore";
import Breadcrumbs from "../../../components/am-bread-crump";
import { useRecoilValue } from "recoil";
import { ProductsStates } from "../../../dvalues/data";
const AmMedCard = lazy(() => import("../../../components/am-med-card"));

const AMProductDetail = ({ item }) => {
    const responsiveCheck = useDeviceType()
    const [country, setCountrys] = useState([]);
    const [mainImage, setMainImage] = useState("");
    const [splitSet, setSplitSet] = useState([])
    const [tabChange, setTabChange] = useState(null)
    const [delectedSize, setDelectedSize] = useState([]);
    const [selSize, setSelSize] = useState("");
    const [delPack, setDelSize] = useState([]);
    const [pacSize, setPacSize] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({});
    const products = useRecoilValue(ProductsStates)
    const [selectedSize, setSelectedSize] = useState("");
    const category = useMemo(() => {
        const parts = window.location.pathname.split("/").filter(Boolean);
        const idx = parts.indexOf("infection-prevention-division");
        if (idx !== -1 && parts[idx + 1]) {
            return parts[idx + 1].replace(/-/g, " ");
        }
        return parts[0]?.replace(/-/g, " ") || "";
    }, [window.location.pathname]);

    const filteredProducts = useMemo(() => {
        if (!products || products.length === 0) return [];

        if (category.toLowerCase().includes("infection prevention")) {
            return products.filter((p) => {
                if (!p.url) return false;
                try {
                    const parts = new URL(p.url).pathname.split("/").filter(Boolean);
                    const idx = parts.indexOf("infection-prevention-division");
                    if (idx !== -1 && parts[idx + 1]) {
                        return parts[idx + 1] === category.split(" ").pop()?.toLowerCase();
                    }
                } catch (e) {
                    return false;
                }
                return false;
            });
        }

        if (category.toLowerCase() === "medical device division") {
            return products
                .filter((p) => p.category?.AMD_CatTitle?.toLowerCase() === "medical device")
                .slice(0, 6);
        }

        return products.filter(
            (p) => p.category?.AMD_CatTitle?.toLowerCase() === category.toLowerCase()
        );
    }, [products, category]);


    const intList = [
        'Medical Device Consumables',
        'Sugical Gowns',
        'Sugical Drapes',
        'Sugical Packs',
        'Surgical Accessories',
        'CSSD Essentials',
        'Protective Essentials'
    ]

    const toggleTab = (tab) => {
        setTabChange(tabChange === tab ? null : tab);
    };


    useEffect(() => {
        let isMounted = true;

        // Lazy import instead of top-level import
        import("world-countries").then((module) => {
            if (!isMounted) return;

            const data = module.default.sort((a, b) => {
                const nameA = a.name.common || "";
                const nameB = b.name.common || "";
                return nameA.localeCompare(nameB);
            });

            setCountrys(data);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (item) {
            autoTabChange();
            setAMD_ProductCatalogue(item?.AMD_Title);
        }
    }, [item]);

    const autoTabChange = () => {
        if (responsiveCheck !== "mobile") {
            if (item?.AMD_DescMoreInformation === "" || item?.AMD_DescMoreInformation === null) {
                toggleTab('second');
            } else {
                toggleTab('second')
            }
        } else {
            toggleTab('second')
        }
    };


    useEffect(() => {
        if (!item) return;

        const formatImage = (img) => ({
            url: img?.formats?.small?.url,
            alt: img?.alternativeText || "Product Image",
        });

        const images = [];

        if (item?.image) {
            images.push(formatImage(item.image));
        }

        if (Array.isArray(item?.images)) {
            images.push(...item.images.map(formatImage));
        }

        setSplitSet(images);
    }, [item]);



    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    const renderTextWithBold = (text) => {
        if (!text) return null;
        const regex = /\*\*(.*?)\*\*/g;
        const parts = [];
        let lastIndex = 0;
        text.replace(regex, (match, p1, offset) => {
            parts.push(text.slice(lastIndex, offset));
            parts.push(<strong key={offset}>{p1}</strong>);
            lastIndex = offset + match.length;
        });
        parts.push(text.slice(lastIndex));
        return parts;
    };

    useEffect(() => {
        if (item?.AMD_Sizes?.length > 0) {
            const firstItem = item.AMD_Sizes[0];
            setSelSize(firstItem.size);
            setDelectedSize([firstItem]);
        }
    }, [item]);

    const handleSizeClick = (size) => {
        console.log(size);
        setSelectedSize(size);
        if (responsiveCheck === "mobile") {
            const newZize = size;
            let findItem = item?.AMD_Sizes.filter((item) => item.size === newZize)
            setSelSize(size)
            setDelectedSize(findItem);
        } else {
            let findItem = item?.AMD_Sizes.filter((item) => item.size === size)
            setSelSize(size)
            setDelectedSize(findItem);
        }
    };

    useEffect(() => {
        if (item?.AMD_Packageinformation?.length > 0) {
            const firstItem = item?.AMD_Packageinformation[0];
            setPacSize(firstItem.size);
            setDelSize([firstItem]);
        }
    }, [item]);

    const handlePackClick = (size) => {
        if (responsiveCheck === "mobile") {
            const newSize = size?.target?.value;
            const newSizeNumber = Number(newSize);
            let findItem = item?.AMD_Packageinformation.filter((item) => {
                const itemSize = item.size;
                if (!isNaN(newSizeNumber)) {
                    const itemSizeNumber = Number(itemSize);
                    return !isNaN(itemSizeNumber) && itemSizeNumber === newSizeNumber;
                } else {
                    return itemSize === newSize;
                }
            });
            setPacSize(size)
            setDelSize(findItem);

        } else {
            let findItem = item?.AMD_Packageinformation.filter((item) => item.size === size)
            setPacSize(size)
            setDelSize(findItem);
        }
    };

    const formatContent = (text) => {
        if (!text) return [];
        const lines = text
            .replace(/\n/g, ' ')
            .split(' - ');
        return lines.map((line, index) => {
            const formattedLine = line.trim()
                .replace(/^-/, "")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/_(.*?)_/g, "<em>$1</em>");
            return (
                <li
                    id="readmoreInfo"
                    key={index}
                    dangerouslySetInnerHTML={{ __html: formattedLine }}
                />
            );
        });
    };


    const openModal = (title, label) => {
        let data = {
            title: title,
            label: label
        }
        if (label === 'Quote') {
            setAMD_ProductCatalogue(item?.AMD_Title)
        } else {
            setAMD_ProductCatalogue("")
        }
        setModalConfig(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [AMD_Country, setAMD_Country] = useState('India');
    const [AMD_State, setAMD_State] = useState('')
    const [AMD_Email, setAMD_Email] = useState('');
    const [AMDCONF_Email, setAMDCONF_Email] = useState('');
    const [AMD_Firstname, setAMD_Firstname] = useState('');
    const [AMD_Lastname, setAMD_Lastname] = useState('');
    const [AMD_OrganizationName, setAMD_OrganizationName] = useState('');
    const [AMD_Phone, setAMD_Phone] = useState('');
    const [AMD_ProductCatalogue, setAMD_ProductCatalogue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleConfirmEmailChange = (e) => {
        const confirmEmail = e.target.value;
        setAMDCONF_Email(confirmEmail);

        if (confirmEmail !== AMD_Email) {
            setErrorMessage("Emails do not match.");
        } else {
            setErrorMessage("");
        }
    };

    const contactForm = useMutation({
        mutationFn: apiservice.postCareerContactData,
        onSuccess: (data) => {
        },
        onError: (error) => {
        },
        onSettled: () => {
        },
    });

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    const handleContactSubmit = () => {
        let errors = [];
        if (!AMD_Firstname) errors.push('First name is required.');
        if (!AMD_Lastname) errors.push('Last name is required.');
        if (!AMD_Email) errors.push('Email is required.');
        if (!isValidEmail(AMD_Email)) errors.push('Email format is invalid.');
        if (AMD_Email !== AMDCONF_Email) errors.push('Email and confirmation email must match.');
        if (!AMD_Phone) errors.push('Phone number is required.');
        if (!isValidPhone(AMD_Phone)) errors.push('Phone number format is invalid.');
        if (!AMD_Country) errors.push('Country is required.');
        if (!AMD_OrganizationName) errors.push('Organization name is required.');
        if (!AMD_State) errors.push('State is required.')

        if (errors.length > 0) {
            Swal.fire({
                title: 'Are you sure?',
                html: `${errors.map((item) => `<p style="font-size:0.8rem;line-height:1px;" class="text-danger">${item}</p>`).join('')}`,
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        } else {
            const formData = new FormData();
            formData.append("data", JSON.stringify({
                "AMD_Country": AMD_Country,
                "AMD_Email": AMD_Email,
                "AMD_Firstname": AMD_Firstname,
                "AMD_Lastname": AMD_Lastname,
                "AMD_OrganizationName": AMD_OrganizationName,
                "AMD_Phone": AMD_Phone,
                "AMD_ProductCatalogue": AMD_ProductCatalogue,
                "AMD_Followup": false,
                "AMD_AdditionalRequest": "",
                "AMD_HelpText": "",
                "AMD_OtherText": "",
                "AMD_FormType": config.AMD_FormCatalogue,
                "AMD_SubjectType": modalConfig.label === 'Quote' ? subjectConfig.AMD_QUOTE : subjectConfig.AMD_CATALOG,
                "AMD_Pincode": "",
                "AMD_State": AMD_State,
                "AMD_City": "",
                "AMD_RoleOrDepartment": "",
            }));
            Swal.fire({
                title: 'Submitted',
                html: `${errors.map((item) => `<p style="font-size:0.8rem;line-height:1px;" class="text-danger">${item}</p>`).join('')}`,
                icon: 'success',
                confirmButtonText: 'Ok',
            })
            contactForm.mutate(formData);
        }

    }

    const [isFixed, setIsFixed] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 30) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const checkCaseHeading = (node) => {
        switch (node) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 6;

            default:
                return 5;
        }
    }

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
                const HeadingTag = `h${checkCaseHeading(node.level)}`;
                return (
                    <HeadingTag>
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
                const urls = node.url.split(/\s+/);
                return (
                    <div>
                        {urls.map((url, index) => (
                            <React.Fragment key={index}>
                                <a style={{ fontSize: responsiveCheck === "mobile" && '0.5rem' }} href={url} target="_blank" rel="noopener noreferrer">
                                    {url}
                                </a>
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                );
            case 'text':
                return node.bold ? <strong>{node.text}</strong> : node.text;
            default:
                return null;
        }
    };

    return (
        <
            >
            <Helmet>
                <title>{item?.AMD_MetaTitle}</title>
                <meta name="robots" content="index, follow" />
                <meta name="description" content={`${item?.AMD_MetaDescription}`} />
                <link rel="canonical" href={`https://www.amaryllishealthcare.com${location.pathname}`} />
            </Helmet>
            {responsiveCheck !== "mobile" && (
                <Breadcrumbs></Breadcrumbs>
            )}



            <div className="container-fluid am-proddetails">
                <div className="row">
                    <div className={`col-lg-5 col-md-5 ${isFixed && responsiveCheck !== "mobile" ? 'fixed-left  pt-5 py-3' : ''}`}>
                        {responsiveCheck === "mobile" && <>
                            <h1 className="fw-bold mt-3">{item?.AMD_ProdcutTitleDisplayName}</h1>
                            <p>SKU: {item?.AMD_Productcode}</p>
                        </>}
                        {responsiveCheck !== "mobile" && <div className="am-proddet-img-box w-100">
                            <img
                                src={mainImage ? `${apiurl}${mainImage}` : `${apiurl}${item?.image?.formats?.small?.url} `}
                                className="img-fluid w-100"
                                title={item?.image?.formats?.thumbnail?.name}
                                alt={item?.image?.alternativeText || "Product Image"}
                            />
                        </div>}
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={4}
                            navigation
                            loop
                            mousewheel
                            modules={[Navigation, Pagination, Mousewheel]}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 8,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 8,
                                },
                                480: {
                                    slidesPerView: 2,
                                    spaceBetween: 8,
                                },
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 8,
                                },
                            }}

                        >
                            <div className="am-proddet-img-boxes">
                                {splitSet.map(imgObj => (
                                    imgObj?.url && (
                                        <SwiperSlide
                                            key={imgObj.url}
                                            style={{
                                                cursor: "pointer",
                                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 5px",
                                                borderRadius: "0.6rem",
                                                border: "1px solid lightgray",
                                            }}
                                        >
                                            <img
                                                style={{ borderRadius: "0.6rem" }}
                                                src={`${apiurl}${imgObj.url}`}
                                                className="img-fluid"
                                                title={item?.image?.formats?.thumbnail?.name}
                                                alt={imgObj.alt}
                                                onClick={() => handleThumbnailClick(imgObj.url)}
                                            />
                                        </SwiperSlide>
                                    )
                                ))}

                            </div>
                        </Swiper>
                    </div>
                    <div className="col-lg-7 col-md-7">
                        {responsiveCheck !== "mobile" && <>
                            <h1 className="fw-bold">{item?.AMD_ProdcutTitleDisplayName}</h1>
                            <p>SKU: {item?.AMD_Productcode}</p>
                        </>}
                        <div className="am-proddet-line"></div>
                        {(item?.AMD_Sizes !== null && item?.AMD_Sizes !== "" && responsiveCheck === "mobile") && <>
                            <div class="am-proddet-basic">
                                <div>Size:</div>
                                &nbsp;&nbsp;&nbsp;
                                <div class="am-button-pex">
                                    <select id="sizeSelect" className="custom-selectclass" value={selectedSize} onChange={handleSizeClick}>
                                        {item?.AMD_Sizes.length > 0 && [...new Set(item?.AMD_Sizes.map(data => data.size))].map((bItem, index) => (
                                            <option key={index} value={bItem}>{bItem}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </>}
                        {(item?.AMD_Sizes !== null && item?.AMD_Sizes !== "" && responsiveCheck !== "mobile") &&
                            <>
                                {item?.AMD_Sizes.length === 1 ? (<></>) : (
                                    <div className="am-proddet-basic">
                                        <div>Size:</div>
                                        &nbsp;&nbsp;&nbsp;
                                        <div className="am-button-pex">
                                            {item?.AMD_Sizes.length > 0 && [...new Set(item?.AMD_Sizes.map(data => data.size))].map(bItem => (
                                                <button
                                                    onClick={() => handleSizeClick(bItem)}
                                                    style={{
                                                        backgroundColor: selSize === item ? 'lightblue' : 'white',
                                                        border: bItem === selSize ? '1px solid #222831' : '1px solid white', // Add border to selected size
                                                    }}
                                                >{bItem}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        }
                        {item?.AMD_Towel !== null &&
                            <div className="am-proddet-basic">
                                <div>Towel:</div>
                                <div>
                                    <button>{item?.AMD_Towel}</button>
                                </div>
                            </div>}
                        {item?.AMD_Availablevariants !== null &&
                            <div className="am-button-med-icon">
                                <div className={`mb-2 ${responsiveCheck === 'mobile' ? 'mt-2' : ''}`}>Available variants</div>
                                <div>
                                    {item?.AMD_Availablevariants.map((variant, index) => (
                                        <div key={index}>
                                            {variant.children[0].text.split(',').map((item, idx) => (
                                                <button className="text-dark" key={idx} style={{ marginBottom: "1rem" }}>
                                                    {item.trim()}
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        <div className="am-proddet-basic">
                            <div>Sterile:</div>
                            <div>
                                {item?.AMD_Sterile !== null && item?.AMD_Sterile.split(',').map(data => (
                                    <button>{data}</button>
                                ))}
                            </div>
                        </div>
                        <div className="am-proddet-line"></div>
                        <div className="am-proddet-quote">
                            <button onClick={() => { openModal('Product Name', 'Quote') }}>Request a Quote</button>
                            <button onClick={() => { openModal('Which product catalog are you interested in?', 'Catalog') }}>Request a Catalog</button>
                        </div>
                        <div className="am-proddet-line"></div>
                        <div className="am-proddet-para">
                            <button
                                data-bs-toggle="collapse"
                                href="#collapseExample"
                                role="button" aria-expanded="false"
                                aria-controls="collapseExample"
                                className={`am-expand-button ${responsiveCheck === "mobile" ? "pb-2" : "pb-4"}`}>Product Description <i className="fa-solid fa-chevron-down"></i></button>
                            <div class="collapse show" id="collapseExample">
                                <p>{renderTextWithBold(item?.AMD_Maindescription)}</p>
                            </div>
                            <div className="am-proddet-line"></div>
                            <button
                                data-bs-toggle="collapse"
                                href="#featureCollapse"
                                role="button" aria-expanded="false"
                                aria-controls="featureCollapse"
                                className="am-expand-button">Features <i className="fa-solid fa-chevron-down"></i></button>
                            <div class="collapse show" id="featureCollapse">
                                <ul>
                                    {formatContent(item?.AMD_Features)}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className={`col-lg-12 col-md-12 ${responsiveCheck === "mobile" ? "mt-0" : "mt-3"}`}>
                        {responsiveCheck === "mobile" ? (
                            <div className="am-prodet-info">
                                {item?.AMD_DescMoreInformation !== "" && item?.AMD_DescMoreInformation !== null && <>
                                    <button
                                        onClick={() => toggleTab('first')}
                                        className={tabChange === "first" ? 'active' : ''}>More Information&nbsp;{responsiveCheck === "mobile" && <i className="fa-solid fa-chevron-down"></i>}
                                    </button>
                                    {tabChange === "first" &&
                                        <div className="am-proddet-content w-100">
                                            <div className="py-4">
                                                {item?.AMD_DescMoreInformation !== "" && item?.AMD_DescMoreInformation !== null && <div className="am-proddet-content w-100">
                                                    {item?.AMD_DescMoreInformation?.map((node, index) => (
                                                        <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                                                    ))}
                                                </div>}
                                            </div>
                                        </div>
                                    }
                                </>
                                }
                                {(item?.AMD_Productspecification !== null) && <>
                                    <button
                                        onClick={() => toggleTab('second')}
                                        className={tabChange === "second" ? 'active' : ''}>Product Specifications&nbsp;{responsiveCheck === "mobile" && <i className="fa-solid fa-chevron-down"></i>}
                                    </button>
                                    {tabChange === "second" &&
                                        <div className="am-proddet-content w-100">
                                            <div className="py-4">
                                                {(item?.AMD_Sizes !== null && item?.AMD_Sizes !== "" && responsiveCheck === "mobile") && <>
                                                    <div class="am-proddet-basic">
                                                        <div>Size</div>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <div class="am-button-pex">
                                                            <select id="sizeSelect" className="custom-selectclass" value={selectedSize} style={{ marginLeft: '37vw' }} onChange={handleSizeClick}>
                                                                {item?.AMD_Sizes.length > 0 && [...new Set(item?.AMD_Sizes.map(data => data.size))].map((bItem, index) => (
                                                                    <option key={index} value={bItem}>{bItem}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>}
                                                {(item?.AMD_Sizes !== null && item?.AMD_Sizes !== "" && responsiveCheck !== "mobile") &&
                                                    <>
                                                        {item?.AMD_Sizes.length === 1 ? (<></>) : (
                                                            <div className="am-proddet-basic">
                                                                <div>Size:</div>
                                                                &nbsp;&nbsp;&nbsp;
                                                                <div className="am-button-pex">
                                                                    {item?.AMD_Sizes.length > 0 && [...new Set(item?.AMD_Sizes.map(data => data.size))].map(bItem => (
                                                                        <button
                                                                            onClick={() => handleSizeClick(bItem)}
                                                                            style={{
                                                                                backgroundColor: selSize === item ? 'lightblue' : 'white',
                                                                                border: bItem === selSize ? '1px solid #222831' : '1px solid white', // Add border to selected size
                                                                            }}
                                                                        >{bItem}</button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                }
                                                {Array.isArray(delectedSize) ? (
                                                    delectedSize.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                marginLeft: '-0.6rem',
                                                                lineHeight: '26px'
                                                            }}
                                                        >
                                                            {Object.entries(item).map(([key, value]) =>
                                                                key !== "size" ? (
                                                                    <div className="d-flex" key={key} style={{
                                                                        width: responsiveCheck === "bigDesktop" ? '45vw' : '76vw',
                                                                        marginLeft: "10px"
                                                                    }}>
                                                                        <p className="fw-semibold" style={{ width: responsiveCheck === "mobile" ? '62.5%' : '57.5%' }}>{key.replace(/_/g, " ").charAt(0).toUpperCase() + key.replace(/_/g, " ").slice(1)}</p>
                                                                        <p>&nbsp;{value}</p>
                                                                    </div>
                                                                ) : null
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No details available.</p>
                                                )}

                                                <div className="am-proddet-sizes">
                                                    <div className="fw-semibold">Model</div>
                                                    <div>{item?.AMD_Productcode}</div>
                                                </div>
                                                {item?.AMD_Disposablesingleuse !== "" && item?.AMD_Disposablesingleuse !== null &&
                                                    <div className="am-proddet-sizes">
                                                        <div className="fw-semibold">Disposable / Single Use</div>
                                                        <div>{item?.AMD_Disposablesingleuse}</div>
                                                    </div>}
                                                <div>
                                                    {item?.AMD_Productspecification !== "" && item?.AMD_Productspecification !== undefined && <>
                                                        {item?.AMD_Productspecification !== "object" || null ? (
                                                            <>

                                                                {item?.AMD_Productspecification?.length > 0 ? (
                                                                    <>
                                                                        {item?.AMD_Productspecification.map((item) => (
                                                                            <div className="am-proddet-sizes">
                                                                                <div className="fw-semibold">{item.title}</div>
                                                                                <div>
                                                                                    {item.value}
                                                                                </div>
                                                                            </div>
                                                                        ))} </>
                                                                ) : (
                                                                    <div className="am-table-wrapper">
                                                                        {item?.AMD_Productspecification?.headings.map((heading, index) => (
                                                                            <div className="am-table-box" key={index}>
                                                                                {index === 0 && item?.AMD_Productspecification?.dataList.length > 0 && (
                                                                                    <table className="table table-hover">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                {Object.keys(item?.AMD_Productspecification?.dataList[0][0]).map((key) => (
                                                                                                    <th key={key}>{key}</th>
                                                                                                ))}
                                                                                            </tr>
                                                                                        </thead>
                                                                                    </table>
                                                                                )}

                                                                                {heading !== "" && <h6 className="am-table-header">{heading}</h6>}
                                                                                <table className="table table-hover">
                                                                                    <tbody>
                                                                                        {item?.AMD_Productspecification?.dataList[index].map((row, rowIndex) => (
                                                                                            <tr key={rowIndex}>
                                                                                                {Object.keys(row).map((key) => (
                                                                                                    <td key={key}>
                                                                                                        {key === "Colour" ? (
                                                                                                            <div className="am-table-colour-col" style={{ backgroundColor: row[key] }}></div>
                                                                                                        ) : (
                                                                                                            <span>{row[key]}</span>
                                                                                                        )}
                                                                                                    </td>
                                                                                                ))}
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        ))}

                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (<></>)
                                                        }
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </>}
                                {(item?.AMD_Packageinformation !== "" && item?.AMD_Packageinformation != null) &&
                                    <div className="am-proddet-content w-100">
                                        <button
                                            onClick={() => toggleTab('third')}
                                            className={tabChange === "third" ? 'active' : ''}>Packaging Information&nbsp;{responsiveCheck === "mobile" && <i className="fa-solid fa-chevron-down"></i>}
                                        </button>
                                        {tabChange === "third" && <div className="py-4">
                                            {(item?.AMD_Packageinformation !== null && item?.AMD_Packageinformation !== "" && responsiveCheck !== "mobile") &&
                                                <div className="am-proddet-basic"
                                                    style={item?.AMD_Packageinformation.length === 1 ? { marginTop: '-2rem' } : {}}
                                                >
                                                    {item?.AMD_Packageinformation.length === 1 ? (<div >

                                                    </div>) : (<>
                                                        <div>Size:</div>
                                                        <div className="am-button-pex">
                                                            {item?.AMD_Packageinformation.length > 0 && [...new Set(item?.AMD_Packageinformation.map(data => data.size))].map(bItem => (
                                                                <>
                                                                    <button
                                                                        onClick={() => handlePackClick(bItem)}
                                                                        style={{
                                                                            backgroundColor: pacSize === item ? 'lightblue' : 'white',
                                                                            border: bItem === pacSize ? '1px solid #222222' : '1px solid white', // Add border to selected size
                                                                        }}
                                                                    >{bItem}</button>
                                                                </>
                                                            ))}
                                                        </div>
                                                    </>)}
                                                </div>
                                            }
                                            {item?.AMD_Packageinformation !== null && item?.AMD_Packageinformation !== "" && responsiveCheck === "mobile" && item?.AMD_Packageinformation.length !== 1 &&
                                                <div class="am-proddet-basic">
                                                    <div>Size:</div>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <div class="am-button-pex">
                                                        <select id="sizeSelect" className="custom-selectclass" style={{ marginLeft: '34vw' }} onChange={handlePackClick}>
                                                            {item?.AMD_Packageinformation.length > 0 && [...new Set(item?.AMD_Packageinformation.map(data => data.size))].map((bItem, index) => (
                                                                <option key={index} value={bItem}>{bItem}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            }
                                            {Array.isArray(delPack) ? (
                                                delPack.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            marginBottom: "20px",
                                                        }}
                                                    >
                                                        {Object.entries(item).map(([key, value]) =>
                                                            key !== "size" ? (
                                                                <div key={key} style={{ marginLeft: "-10px" }}>
                                                                    <div className="d-flex" key={key} style={{
                                                                        width: responsiveCheck === "bigDesktop" ? '45vw' : '76vw',
                                                                        marginLeft: "10px"
                                                                    }}>
                                                                        {value !== 0 && <>
                                                                            <p className="fw-semibold" style={{ width: '57.5%' }}>{key.replace(/_/g, " ").charAt(0).toUpperCase() + key.replace(/_/g, " ").slice(1)}</p>
                                                                            <p>&nbsp;{value}</p></>}
                                                                    </div>
                                                                </div>
                                                            ) : null
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No details available.</p>
                                            )}
                                        </div>}
                                    </div>
                                }
                            </div>
                        ) : (
                            <div className="am-prodet-info">
                                {item?.AMD_DescMoreInformation !== "" && item?.AMD_DescMoreInformation !== null &&
                                    <button
                                        onClick={() => toggleTab('first')}
                                        className={tabChange === "first" ? 'active' : ''}>More Information&nbsp;{responsiveCheck === "mobile" && <i className="fa-solid fa-chevron-down"></i>}
                                    </button>}
                                <button
                                    onClick={() => toggleTab('second')}
                                    className={tabChange === "second" ? 'active' : ''}>Product Specifications&nbsp;{responsiveCheck === "mobile" && <i className="fa-solid fa-chevron-down"></i>}
                                </button>
                                {(item?.AMD_Packageinformation !== "" && item?.AMD_Packageinformation != null) &&
                                    <button
                                        onClick={() => toggleTab('third')}
                                        className={tabChange === "third" ? 'active' : ''}>Packaging Information&nbsp;{responsiveCheck === "mobile" && <i className="fa-solid fa-chevron-down"></i>}
                                    </button>
                                }
                            </div>
                        )}
                        {responsiveCheck !== "mobile" &&
                            <div className="am-proddet-content w-100">
                                {
                                    tabChange === 'first' ? (
                                        <div className="py-4">
                                            {item?.AMD_DescMoreInformation !== "" && item?.AMD_DescMoreInformation !== null && <>
                                                {item?.AMD_DescMoreInformation?.map((node, index) => (
                                                    <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                                                ))}
                                            </>}
                                        </div>) : tabChange === 'second' ? (
                                            <div className="py-4">
                                                {(item?.AMD_Sizes !== null && item?.AMD_Sizes !== "" && responsiveCheck === "mobile") && <>
                                                    <div class="am-proddet-basic">
                                                        <div>Size</div>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <div class="am-button-pex">
                                                            <select id="sizeSelect" className="custom-selectclass" style={{ marginLeft: '9rem' }} onChange={handleSizeClick}>
                                                                {item?.AMD_Sizes.length > 0 && [...new Set(item?.AMD_Sizes.map(data => data.size))].map((bItem, index) => (
                                                                    <option key={index} value={bItem}>{bItem}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>}
                                                {(item?.AMD_Sizes !== null && item?.AMD_Sizes !== "" && responsiveCheck !== "mobile") &&
                                                    <>
                                                        {item?.AMD_Sizes.length === 1 ? (<></>) : (
                                                            <div className="am-proddet-basic">
                                                                <div>Size:</div>
                                                                &nbsp;&nbsp;&nbsp;
                                                                <div className="am-button-pex">
                                                                    {item?.AMD_Sizes.length > 0 && [...new Set(item?.AMD_Sizes.map(data => data.size))].map(bItem => (
                                                                        <button
                                                                            onClick={() => handleSizeClick(bItem)}
                                                                            style={{
                                                                                backgroundColor: selSize === item ? 'lightblue' : 'white',
                                                                                border: bItem === selSize ? '1px solid #222831' : '1px solid white', // Add border to selected size
                                                                            }}
                                                                        >{bItem}</button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                }
                                                {Array.isArray(delectedSize) ? (
                                                    delectedSize.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                marginLeft: '-0.6rem',
                                                                lineHeight: '26px'
                                                            }}
                                                        >
                                                            {Object.entries(item).map(([key, value]) =>
                                                                key !== "size" ? (
                                                                    <div className="d-flex" key={key} style={{
                                                                        width: responsiveCheck === "bigDesktop" ? '45vw' : '76vw',
                                                                        marginLeft: "10px"
                                                                    }}>
                                                                        <p className="fw-semibold" style={{ width: responsiveCheck === "mobile" ? '62.5%' : '57.5%' }}>{key.replace(/_/g, " ").charAt(0).toUpperCase() + key.replace(/_/g, " ").slice(1)}</p>
                                                                        <p>&nbsp;{value}</p>
                                                                    </div>
                                                                ) : null
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No details available.</p>
                                                )}
                                                <div className="am-proddet-sizes">
                                                    <div className="fw-semibold">Model</div>
                                                    <div>{item?.AMD_Productcode}</div>
                                                </div>
                                                {item?.AMD_Disposablesingleuse !== "" && item?.AMD_Disposablesingleuse !== null &&
                                                    <div className="am-proddet-sizes">
                                                        <div className="fw-semibold">Disposable / Single Use</div>
                                                        <div>{item?.AMD_Disposablesingleuse}</div>
                                                    </div>}
                                                <div>
                                                    {item?.AMD_Productspecification !== "" && item?.AMD_Productspecification !== undefined && <>
                                                        {item?.AMD_Productspecification !== "object" || null ? (
                                                            <>
                                                                {item?.AMD_Productspecification?.length > 0 ? (
                                                                    <>
                                                                        {item?.AMD_Productspecification.map((item) => (
                                                                            <div className="am-proddet-sizes">
                                                                                <div className="fw-semibold">{item.title}</div>
                                                                                <div>
                                                                                    {item.value}
                                                                                </div>
                                                                            </div>
                                                                        ))} </>
                                                                ) : (
                                                                    <div className="am-table-wrapper">
                                                                        {item?.AMD_Productspecification?.headings.map((heading, index) => (
                                                                            <div className="am-table-box" key={index}>
                                                                                {index === 0 && item?.AMD_Productspecification?.dataList.length > 0 && (
                                                                                    <table className="table table-hover">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                {Object.keys(item?.AMD_Productspecification?.dataList[0][0]).map((key) => (
                                                                                                    <th key={key}>{key}</th>
                                                                                                ))}
                                                                                            </tr>
                                                                                        </thead>
                                                                                    </table>
                                                                                )}

                                                                                {heading !== "" && <h6 className="am-table-header">{heading}</h6>}
                                                                                <table className="table table-hover">
                                                                                    <tbody>
                                                                                        {item?.AMD_Productspecification?.dataList[index].map((row, rowIndex) => (
                                                                                            <tr key={rowIndex}>
                                                                                                {Object.keys(row).map((key) => (
                                                                                                    <td key={key}>
                                                                                                        {key === "Colour" ? (
                                                                                                            <div className="am-table-colour-col" style={{ backgroundColor: row[key] }}></div>
                                                                                                        ) : (
                                                                                                            <span>{row[key]}</span>
                                                                                                        )}
                                                                                                    </td>
                                                                                                ))}
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        ))}

                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (<></>)
                                                        }
                                                    </>}
                                                </div>
                                            </div>) : <div className="py-4">
                                        {(item?.AMD_Packageinformation !== null && item?.AMD_Packageinformation !== "" && responsiveCheck !== "mobile") &&
                                            <div className="am-proddet-basic"
                                                style={item?.AMD_Packageinformation.length === 1 ? { marginTop: '-2rem' } : {}}
                                            >
                                                {item?.AMD_Packageinformation.length === 1 ? (<div >

                                                </div>) : (<>
                                                    <div>Size:</div>
                                                    <div className="am-button-pex">
                                                        {item?.AMD_Packageinformation.length > 0 && [...new Set(item?.AMD_Packageinformation.map(data => data.size))].map(bItem => (
                                                            <>
                                                                <button
                                                                    onClick={() => handlePackClick(bItem)}
                                                                    style={{
                                                                        backgroundColor: pacSize === item ? 'lightblue' : 'white',
                                                                        border: bItem === pacSize ? '1px solid #222222' : '1px solid white', // Add border to selected size
                                                                    }}
                                                                >{bItem}</button>
                                                            </>
                                                        ))}
                                                    </div>
                                                </>)}
                                            </div>
                                        }
                                        {item?.AMD_Packageinformation !== null && item?.AMD_Packageinformation !== "" && responsiveCheck === "mobile" && item?.AMD_Packageinformation.length !== 1 &&
                                            <div class="am-proddet-basic">
                                                <div>Size:</div>
                                                &nbsp;&nbsp;&nbsp;
                                                <div class="am-button-pex">
                                                    <select id="sizeSelect" className="custom-selectclass" style={{ marginLeft: '8rem' }} onChange={handlePackClick}>
                                                        {item?.AMD_Packageinformation.length > 0 && [...new Set(item?.AMD_Packageinformation.map(data => data.size))].map((bItem, index) => (
                                                            <option key={index} value={bItem}>{bItem}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        }
                                        {Array.isArray(delPack) ? (
                                            delPack.map((item, index) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    {Object.entries(item).map(([key, value]) =>
                                                        key !== "size" ? (
                                                            <div key={key} style={{ marginLeft: "-10px" }}>
                                                                <div className="d-flex" key={key} style={{
                                                                    width: responsiveCheck === "bigDesktop" ? '45vw' : '76vw',
                                                                    marginLeft: "10px"
                                                                }}>
                                                                    {value !== 0 && <>
                                                                        <p className="fw-semibold" style={{ width: '57.5%' }}>{key.replace(/_/g, " ").charAt(0).toUpperCase() + key.replace(/_/g, " ").slice(1)}</p>
                                                                        <p>&nbsp;{value}</p></>}
                                                                </div>
                                                            </div>
                                                        ) : null
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No details available.</p>
                                        )}
                                    </div>
                                }
                            </div>}

                    </div>
                </div>
                <div>
                    {item?.AMD_SEOContent !== null && item?.AMD_SEOContent !== "" && (
                        <div className="p-2">
                            <ReadMoreWrapper>
                                {item?.AMD_SEOContent?.map((node, index) => (
                                    <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                                ))}
                            </ReadMoreWrapper>
                        </div>
                    )}
                </div>
                <div className="row">
                    <h4 className="py-3">Similar Products</h4>
                    {filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts.slice(0, 6).map((product) => (
                            <div
                                className={`${responsiveCheck === "mobile" ? "col-6" : "col-lg-2 py-3"
                                    }`}
                                key={product.id}
                            >
                                <AmMedCard
                                    spaceType="LAND_PAGE"
                                    breadlink="Infection Prevention Division"
                                    item={product}
                                />
                            </div>
                        ))
                    ) : (
                        <div>No products available.</div>
                    )}
                </div>
            </div>
            <div className={`am-modal ${isModalOpen ? "show" : ""}`} aria-hidden="true">
                <div className="am-modal-content">
                    <span className="am-close" onClick={closeModal}>
                        &times;
                    </span>
                    <div>
                        <div className="container-fluid am-contact-form-fill">
                            <h3 className="pb-3 d-inline-block fw-bold">Request a {modalConfig?.label}</h3>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="fname" className="form-label">First Name*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fname"
                                            value={AMD_Firstname}
                                            onChange={(e) => setAMD_Firstname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="lname" className="form-label">Last Name*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lname"
                                            value={AMD_Lastname}
                                            onChange={(e) => setAMD_Lastname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email*</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={AMD_Email}
                                            onChange={(e) => setAMD_Email(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="confirm-email" className="form-label">Confirm Email*</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="confirm-email"
                                            onInput={handleConfirmEmailChange}
                                            value={AMDCONF_Email}
                                            onChange={(e) => setAMDCONF_Email(e.target.value)}

                                        />
                                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="organization" className="form-label mb-3">Organization Name / Individual*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="organization"
                                            value={AMD_OrganizationName}
                                            onChange={(e) => setAMD_OrganizationName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="country" className="form-label">Country*</label>
                                        <select
                                            className="w-100 am-custom-select"
                                            id="country"
                                            value={AMD_Country}
                                            onChange={(e) => setAMD_Country(e.target.value)}
                                        >
                                            {country.length > 0 && country.map((country) => (
                                                <option key={country.name.common} value={country.name.common}>
                                                    {country.name.common}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="states" className="form-label mt-2">State/Provinces*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            placeholder=""
                                            value={AMD_State}
                                            onChange={(e) => setAMD_State(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-group mb-3">
                                        <label htmlFor="phone" className="form-label mt-2">Phone*</label>
                                        <div className="d-flex w-100">
                                            <select
                                                className="form-control"
                                                id="country"
                                                style={{
                                                    flex: '1 1 20%',
                                                    marginRight: '5px',
                                                    background: '#F2F2F2'
                                                }}
                                                value={AMD_Country}
                                                onChange={(e) => setAMD_Country(e.target.value)}
                                            >
                                                {country.length > 0
                                                    && country.map((country) => (
                                                        <option key={country.name.common} value={country.name.common}>
                                                            {country.idd.root + country.idd.suffixes}
                                                        </option>
                                                    ))}
                                            </select>
                                            <input
                                                type="number"
                                                className="form-control w-100"
                                                id="phone"
                                                value={AMD_Phone}
                                                onChange={(e) => setAMD_Phone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="product-catalogue" className="form-label">{modalConfig.title}*</label>
                                        {modalConfig.label === 'Quote' ? (
                                            <input
                                                className="w-100 form-control"
                                                id="product-catalogue"
                                                value={AMD_ProductCatalogue}
                                                onChange={(e) => setAMD_ProductCatalogue(e.target.value)}
                                            />
                                        ) : (
                                            <select
                                                className="w-100 am-custom-select"
                                                id="product-catalogue"
                                                value={AMD_ProductCatalogue}
                                                onChange={(e) => setAMD_ProductCatalogue(e.target.value)}
                                            >
                                                {intList.map(item => (
                                                    <option key={item} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <button onClick={handleContactSubmit} style={{ marginTop: modalConfig.label !== "Quote" ? '3.5rem' : '2rem' }} type="submit" className="am-career-button-two">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AMProductDetail;
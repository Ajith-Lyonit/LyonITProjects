import { Link } from "react-router-dom";
import { AMButton } from "./am-button";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import apiservice from "../api/apiservice";
import { ProductCategoryStates, ProductsStates } from "../dvalues/data";
import { useRecoilState } from "recoil";
import useDeviceType from "../custom-hooks/userDevice";

const AMHeader = () => {

    const responsiveCheck = useDeviceType()
    const breadtype = 'S';
    const breadlink = undefined;

    function openNav() {
        setIsSearching(false)
        setIsInputMobileFocused(false)
        document.getElementById("mySidenav").style.width = "100%";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    const [isSearching, setIsSearching] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isInputMobileFocused, setIsInputMobileFocused] = useState(false);
    const [placeholder, setPlaceholder] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [shareProduct, setShareProduct] = useRecoilState(ProductsStates);
    const [footerCat, setFooterCat] = useRecoilState(ProductCategoryStates)

    const { data: catdata, error: caterror, isLoading: catisloading } = useQuery({
        queryKey: ['catDetails'],
        queryFn: apiservice.fetchCategories,
    });

    useEffect(() => {
        if (catdata) {
            const catList = catdata.data;
            setFooterCat(catList);
        }
    }, [catdata]);

    useEffect(() => {
        if (footerCat.length === 0) {
            setPlaceholder("");
            return;
        }
        const interval = setInterval(() => {
            setPlaceholder((prev) => {
                if (!prev && footerCat.length > 0) {
                    return footerCat[0]?.AMD_CatTitle || "";
                }
                const currentIndex = footerCat.findIndex(cat => cat.AMD_CatTitle === prev);
                const nextIndex = (currentIndex + 1) % footerCat.length;
                return footerCat[nextIndex]?.AMD_CatTitle || "";
            });

        }, 3000);

        return () => clearInterval(interval);
    }, [footerCat, catdata]);


    const {
        data: searchData,
        isLoading: searchLoading,
    } = useQuery({
        queryKey: ['product-search', debouncedQuery],
        queryFn: () => apiservice.searchProductByKeyword(debouncedQuery),
        enabled: !!debouncedQuery,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300); // debounce 300ms

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleMboile = () => {
        setIsInputMobileFocused(true)
    };

    useEffect(() => {
        if (searchData?.data) {
            setFilteredProducts(searchData.data);
            setShareProduct(searchData.data);
        } else {
            setFilteredProducts([]);
        }
    }, [searchData]);

    useEffect(() => {
        setSelectedIndex(null);
    }, [filteredProducts]);

    const handleClickOutside = (e) => {
        if (!e.target.closest('.form-control')) {
            setIsInputFocused(false)
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const onScrollFuncClose = () => {
        setIsInputMobileFocused(false)
        setIsSearching(false)
    }

    useEffect(() => {
        document.addEventListener('scroll', onScrollFuncClose);
        return () => {
            document.removeEventListener('scroll', onScrollFuncClose);
        };
    }, []);
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    };


    const toggleSearch = () => {
        setIsSearching(prevstate => !prevstate);
        setIsInputMobileFocused(!isInputMobileFocused)
    };

    const scrollLogo = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className={`am-header fixed-top pt-3 bg-white ${responsiveCheck === "mobile" ? '' : 'bounce-in bounce-delay-3'}`}>
            <div className="am-header-sub">
                <div>
                    <Link to={'/'} onClick={scrollLogo}>
                        <img src="/Amaryllislogo.png" className="am-header-logo" alt="amaryllis logo" title="amaryllis logo" />
                    </Link>
                </div>
                <div className="am-div-1 mt-2">
                    <div className="am-seach-position">
                        <input
                            type="text"
                            className="form-control animated-placeholder"
                            placeholder={`Search ${placeholder}`}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={handleFocus}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    if (selectedIndex !== null && filteredProducts[selectedIndex]) {
                                        // optional: navigate to selected item
                                    }
                                }
                                else if (e.key === "ArrowDown") {
                                    e.preventDefault();
                                    setSelectedIndex((prev) =>
                                        prev === null || prev >= filteredProducts.length - 1
                                            ? 0
                                            : prev + 1
                                    );
                                }
                                else if (e.key === "ArrowUp") {
                                    e.preventDefault();
                                    setSelectedIndex((prev) =>
                                        prev === null || prev <= 0
                                            ? filteredProducts.length - 1
                                            : prev - 1
                                    );
                                }
                            }}
                        />

                        <div className="am-search-img-bg">
                            <img src="/Amaryllissearch.png" alt="search" title="search" />
                        </div>
                    </div>
                </div>
                <div className="am-div-1  mt-2" style={{ marginRight: '-1rem' }}>
                    <div className="d-flex justify-content-end">
                        <Link to={'/requestcatalouge'}>
                            <AMButton title={'Request for Catalog'} />
                        </Link>
                    </div>
                </div>
                <div className="am-bars-div" aria-label="Toggle search">
                    {isSearching ? (
                        <i
                            onClick={toggleSearch}
                            class="fa-solid fa-xmark"></i>
                    ) : (<i
                        onClick={toggleSearch}
                        className="fa-solid fa-magnifying-glass"
                    ></i>)}
                    <i onClick={openNav} className="fa-solid fa-bars-staggered"></i>
                </div>
                <div id="mySidenav" className="sidenav">
                    <a
                        href="#"
                        className="closebtn"
                        onClick={(e) => {
                            e.preventDefault();
                            closeNav();
                        }}
                        aria-label="Close navigation"
                    >
                        &times;
                    </a>

                    <div>
                        <Link onClick={closeNav} className={`${responsiveCheck === "mobile" ? "text-dark" : "text-white"}`} to={'/'}>
                            Home
                        </Link>
                    </div>
                    <div>
                        <div className="am-custom-drop text-white">
                            <div className="dropdown">
                                <button className={`dropbtn ${responsiveCheck === "mobile" ? "text-dark" : "text-white"} ms-4`}>Our Products&nbsp;<i className="fa-solid fa-chevron-down"></i></button>
                                <div className="dropdown-content">
                                    <div className="submenu">
                                        {responsiveCheck === "mobile" ? (
                                            <span
                                                className="text-dark"
                                                style={{ fontSize: '0.8rem', paddingLeft: 10 }}
                                            >Infection Prevention Division&nbsp;<i className="fa-solid fa-chevron-right"></i></span>

                                        ) : (
                                            <Link
                                                className="text-decoration-none"
                                                state={{ title: 'Infection Prevention Division', type: 'I' }}
                                                to={'/infection-prevention-division'}
                                            >Infection Prevention Division&nbsp;<i className="fa-solid fa-chevron-right"></i></Link>
                                        )}
                                        <div className="submenu-content">
                                            {footerCat.filter(item => item.AMD_CatTitle !== "Medical Device").map((item, index) => (
                                                <Link onClick={closeNav} key={index} to={`/infection-prevention-division/${decodeURIComponent(item.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-')}`} state={item}>
                                                    <p style={{ fontSize: '0.8rem' }}>{item.AMD_CatTitle}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <Link
                                        onClick={closeNav}
                                        className="text-decoration-none"
                                        state={{ title: 'Medical Device-Consumables', type: 'M' }}
                                        to={'/medical-device-division'}
                                    >Medical Device Consumables</Link>
                                    <Link
                                        onClick={closeNav}
                                        className="text-decoration-none"
                                        state={{ title: 'Featured-Products', type: 'F' }}
                                        to={'/featured-products'}
                                    >
                                        Featured Products
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link onClick={closeNav} className="text-decoration-none" to={'/blogs'}>Knowledge</Link>
                    </div>
                    <div>
                        <Link onClick={closeNav} className="text-decoration-none" to={'/aboutus'}>About Us</Link>
                    </div>
                    <div>
                        <Link onClick={closeNav} className="text-decoration-none" to={'/careers'}>Careers</Link>
                    </div>
                    <div>
                        <Link onClick={closeNav} to={'/requestcatalouge'}>
                            Request for Catalog
                        </Link>
                    </div>

                </div>
            </div>
            {isSearching && (
                <div className="me-3 am-input-mobile-animation">
                    <input
                        type="text"
                        placeholder={`Search ${placeholder}`}
                        className="am-header-mobil-search"
                        autoFocus
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={handleMboile}
                    />
                </div>
            )}
            {isInputMobileFocused && (
                <div className="position-relative">
                    <div className="product-search-results">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item, index) => (
                                <Link className="text-dark text-decoration-none p-0 m-0"
                                    to={`${'/infection-prevention-division'}/${decodeURIComponent(item.AMD_ProductType).trim().toLowerCase().replace(/\s+/g, '-').split("_").slice(0, 2).join("-")}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}

                                >
                                    <div key={item.id}
                                        className={`product-item ${selectedIndex === index ? "am-selected" : ""}`}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;<span>{item.AMD_Title}</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>No products found</div>
                        )}
                    </div>
                </div>
            )}
            <div className="am-search-menu-bar mt-3">
                <div>
                    <Link to={'/'}>
                        <img src="/Amaryllishome.png" className="am-search-home-icon" alt="home icon" title="home icon" />
                    </Link>
                </div>
                <div>
                    <div className="dropdown">
                        <button className="dropbtn">Our Products&nbsp;<i className="fa-solid fa-chevron-down"></i></button>
                        <div className="dropdown-content">
                            <div className="submenu">
                                <Link
                                    className="text-decoration-none"
                                    state={{ title: 'Infection Prevention Division', type: 'I' }}
                                    to={'/infection-prevention-division'}
                                >Infection Prevention Division&nbsp;<i className="fa-solid fa-chevron-right"></i></Link>
                                <div className="submenu-content">
                                    {footerCat.filter(item => item.AMD_CatTitle !== "Medical Device").map((item, index) => (
                                        <Link onClick={closeNav} key={index} to={`/infection-prevention-division/${decodeURIComponent(item.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-')}`} state={item}>
                                            <p>{item.AMD_CatTitle}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Link
                                className="text-decoration-none"
                                state={{ title: 'Medical Device-Consumables', type: 'M' }}
                                to={`/medical-device-division`}
                            >Medical Device Consumables</Link>
                            <Link
                                className="text-decoration-none"
                                state={{ title: 'Featured-Products', type: 'F' }}
                                to={'/featured-products'}
                            >
                                Featured Products
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <Link className="text-decoration-none text-dark" to={'/blogs'}>Knowledge</Link>
                </div>
                <div>
                    <Link className="text-decoration-none text-dark" to={'/aboutus'}>About Us</Link>
                </div>
                <div>
                    <Link className="text-decoration-none text-dark" to={'/careers'}>Careers</Link>
                </div>
            </div>
            {isInputFocused && (
                <div className="position-relative">
                    <div className="product-search-results">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item, index) => (
                                item?.category?.AMD_CatTitle === "Medical Device" ? (
                                    <Link key={index} className="text-dark text-decoration-none p-0 m-0"
                                        to={`${'/medical-device-division'}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}
                                    >
                                        <div key={item.id}
                                            className={`product-item ${selectedIndex === index ? "am-selected" : ""}`}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                        >
                                            <i className="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;<span>{item.AMD_Title}</span>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link key={index} className="text-dark text-decoration-none p-0 m-0"
                                        to={`${'/infection-prevention-division'}/${decodeURIComponent(item?.category?.AMD_CatTitle).trim().toLowerCase().replace(/\s+/g, '-').split("_").slice(0, 2).join("-")}/${decodeURIComponent(item?.AMD_Title).trim().toLowerCase().replace(/\s+/g, '-').replaceAll('---', '-')}`} state={{ breadlink, item, breadtype }}
                                    >
                                        <div key={item.id}
                                            className={`product-item ${selectedIndex === index ? "am-selected" : ""}`}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                        >
                                            <i className="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;<span>{item.AMD_Title}</span>
                                        </div>
                                    </Link>
                                )
                            ))
                        ) : (
                            <div>No products found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AMHeader
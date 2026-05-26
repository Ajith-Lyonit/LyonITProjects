import { AMCareerTable } from "../../../components/am-career-table";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiservice, { apiurl } from "../../../api/apiservice";
import { config, ReferType, subjectConfig } from "../../../constants/config";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { HomeBannerStates } from "../../../dvalues/data";
import { useRecoilValue } from "recoil";
import useDeviceType from "../../../custom-hooks/userDevice";

export const AMCareers = () => {
    const responsiveCheck = useDeviceType()
    const [AMD_City, setAMD_City] = useState('');
    const [country, setCountrys] = useState([]);
    const [AMD_Country, setAMD_Country] = useState('India');
    const [AMD_Email, setAMD_Email] = useState('');
    const [AMDCONF_Email, setAMDCONF_Email] = useState('');
    const [AMD_Firstname, setAMD_Firstname] = useState('');
    const [AMD_Lastname, setAMD_Lastname] = useState('');
    const [AMD_Phone, setAMD_Phone] = useState('');
    const [AMD_Pincode, setAMD_Pincode] = useState('');
    const [AMD_Resume, setAMD_Resume] = useState(null);
    const [AMD_RoleOrDepartment, setAMD_RoleOrDepartment] = useState('Territory Sales Manager');
    const [AMD_State, setAMD_State] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [carrePosition, setCarrePosition] = useState([]);
    const [bgImg, setBgImg] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const homeState = useRecoilValue(HomeBannerStates)
    useEffect(() => {
        const iItem = homeState.find((item) => item?.AMD_BannerType === ReferType.AMDB_CAREER);
        const imageUrl = responsiveCheck === "mobile" ? iItem?.AMD_Bannermobile?.url : iItem?.AMD_Banner?.url;
        if (imageUrl && imageUrl !== bgImg) {
            setBgImg(imageUrl);
        }
    }, [homeState, bgImg]);

    const carrerData = [
        { position: "Territory Sales Manager", place: "Bangalore  |  Thrissur  |  Ahmedabad  |  Raipur  |  Faridabad  |  Punjab" },
        { position: "Export Manager", place: "Bangalore" },
        { position: "Area Sales Manager", place: "Bangalore  |  Ahmedabad  |  Raipur  |  Punjab" },
        { position: "State Sales Manager", place: "Bangalore  |  Raipur  |  Faridabad " },
        { position: "Export Manager", place: "Bangalore  |  Ahmedabad  |  Raipur" },
        { position: "Area Sales Manager", place: "Bangalore  |  Ahmedabad  |  Raipur  |  Punjab" },
        { position: "State Sales Manager", place: "Bangalore  |  Raipur  |  Faridabad" },
        { position: "Others", place: "" },
    ]
    const [careerList, setCareerList] = useState(carrerData);
    const handleConfirmEmailChange = (e) => {
        const confirmEmail = e.target.value;
        setAMDCONF_Email(confirmEmail);

        // Check if the emails match
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

    const {
        data: dcareer,
        error: dcerror,
        isLoading: isTableLoading,
    } = useQuery({
        queryKey: ['jobPositionList'],
        queryFn: apiservice.fetchCareersList,
    });

    function mergeCareerData(staticData, apiData) {
        const formattedApiData = apiData.map(item => ({
            position: item.AMD_Position,
            place: item.AMD_Locations?.split(',').join(' | ') || ""
        }));

        const map = new Map();

        [...staticData, ...formattedApiData].forEach(item => {
            map.set(item.position.trim(), item);
        });

        return Array.from(map.values());
    }

    useEffect(() => {
        if (!isTableLoading && dcareer) {
            const merged = mergeCareerData(carrerData, dcareer);
            setCareerList(merged)
            setCarrePosition(dcareer);
        }
    }, [dcareer, dcerror, isTableLoading]);

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


    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };


    const isValidPhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };
    const resetForm = () => {
        setAMD_Firstname("");
        setAMD_Lastname("");
        setAMD_Email("");
        setAMDCONF_Email("");
        setAMD_Phone("");
        setAMD_Country("");
        setAMD_State("");
        setAMD_City("");
        setAMD_Pincode("");
        setAMD_RoleOrDepartment("");
        setAMD_Resume(null);
    };

    const handleContactSubmit = () => {
        if (!AMD_Resume) {
            Swal.fire({
                title: 'Please upload a resume!',
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
            return;
        }

        let errors = [];
        let isFormValid = true;

        // Validation checks
        if (!AMD_Firstname) errors.push('First name is required.');
        if (!AMD_Lastname) errors.push('Last name is required.');
        if (!AMD_Email) errors.push('Email is required.');
        if (AMD_Email && !isValidEmail(AMD_Email)) errors.push('Email format is invalid.');
        if (AMD_Email !== AMDCONF_Email) errors.push('Email and confirmation email must match.');
        if (!AMD_Phone) errors.push('Phone number is required.');
        if (AMD_Phone && !isValidPhone(AMD_Phone)) errors.push('Phone number format is invalid.');
        if (!AMD_Country) errors.push('Country is required.');

        if (errors.length > 0) isFormValid = false;

        if (!isFormValid) {
            Swal.fire({
                title: 'Please fix the following:',
                html: errors.map((item) => `<p style="font-size:0.8rem;line-height:1.5;" class="text-danger">${item}</p>`).join(''),
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("data", JSON.stringify({
            "AMD_City": AMD_City,
            "AMD_Country": AMD_Country,
            "AMD_Email": AMD_Email,
            "AMD_Firstname": AMD_Firstname,
            "AMD_Lastname": AMD_Lastname,
            "AMD_Phone": AMD_Phone,
            "AMD_Pincode": AMD_Pincode,
            "AMD_RoleOrDepartment": AMD_RoleOrDepartment,
            "AMD_State": AMD_State,
            "AMD_SubjectType": subjectConfig.AMD_CAREER,
            "AMD_FormType": config.AMD_FormCareer,
            "AMD_Resume": "",
        }));

        formData.append('AMD_Resume', AMD_Resume);

        contactForm.mutate(formData, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Successfully submitted',
                    icon: 'success'
                });
                setIsSubmitting(false);
                resetForm();
            },
            onError: () => {
                Swal.fire({
                    title: 'Something went wrong!',
                    icon: 'error'
                });
                setIsSubmitting(false);
            }
        });
    };


    const handleUpload = (e) => {
        e.preventDefault();
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx';
        input.onchange = () => {
            let files = Array.from(input.files);
            const file = files[0];


            const maxSize = 1024 * 1024;

            if (file.size > maxSize) {
                Swal.fire({
                    title: 'File is too large!',
                    confirmButtonText: 'Ok',
                    icon: 'warning'
                })
                return;
            }
            setAMD_Resume(file);
        };
        input.click();
    };

    const infraaray = [
        '2 Advanced Manufacturing Facilities',
        '1 Corporate Head Office for Strategic Leadership',
        '5 Regional Head Offices Supporting Local Markets',
        '5 Warehouses Ensuring Efficient Distribution'
    ]

    const addBreaksToString = (str) => {
        const words = str.split(' ');
        if (words.length > 2) {
            words[1] = words[1] + ' <br />';
        }
        return words.join(' ');
    };


    return (
        <
            >
            {responsiveCheck !== "mobile" && <div className="container-fluid am-career-bredcrump">
                <Link to={"/"} className="text-dark text-decoration-none">Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>Careers</span>
            </div>}
            <div className="container-fluid am-careers-comp mb-2 z-3"
                style={{
                    height: responsiveCheck === "mobile" ? '17.5rem' : '10rem',
                    backgroundSize: responsiveCheck === "mobile" ? 'cover' : 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    objectFit: 'cover',
                    width: '100%',
                    backgroundImage: `url(${apiurl + bgImg})`,
                }}>
                <button className="am-careers-button" onClick={() => {
                    window.scrollTo({
                        top: 1290,
                        behavior: 'smooth'
                    })
                }}>Apply Now&nbsp;<i class="fa-solid fa-chevron-right"></i></button>
            </div>
            <div className="container-fluid am-why-marginclass">
                <h1 className="am-why-header">Why work with us?</h1>
                <div className="row">
                    <div className="col-md-4">
                        <div className="am-why-career">
                            <div className="am-why-career-head">
                                <h6>Global <br />Presence</h6>
                            </div>
                            <div className="am-ahy-career-cont text-center">
                                Operating in Over &nbsp;
                                <strong>15+ Countries</strong>,&nbsp;Impacting Healthcare Worldwide
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="am-why-career">
                            <div className="am-why-career-head">
                                <h6>Unified Team <br /> of Industry Experts</h6>
                            </div>
                            <div className="am-ahy-career-cont text-center">
                                <strong>500+ Skilled Professionals</strong> <br />Working Across Functions</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="am-why-career">
                            <div className="am-why-career-head">
                                <h6>Impressive Employee <br /> Retention</h6>
                            </div>
                            <div className="am-ahy-career-cont text-center">
                                <strong>92% Employee Retention Rate, </strong>&nbsp; <br />
                                Reflecting a Culture of Stability <br /> and Professional Growth
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid am-career-mid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="am-career-mid-card">
                            <h6>Indian Infrastructure</h6>
                            <div className="am-career-mid-cont">
                                {infraaray.map((text, index) => (
                                    <div style={{ background: index % 2 == 0 && responsiveCheck === "mobile" ? '#f2f2f2' : '', width: '100%', padding: '0.3rem' }} key={index} dangerouslySetInnerHTML={{ __html: addBreaksToString(text) }} />
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid  am-why-marginclass">
                <h1 className="am-why-header">Current Openings</h1>
                <div className="am-career-table-flex" style={{ marginTop: '-1.2rem' }}>
                    <h6>Open Position</h6>
                    <h6>Place</h6>
                </div>
                <div className="d-flex flex-column justify-content-center">
                    {carrePosition.length > 0 && carrePosition.map((data, index) => (
                        <AMCareerTable index={index} item={data} />
                    ))}
                </div>
            </div>

            <div className="container-fluid am-careers-form">
                <h1 className="am-why-header">Take the First Step Towards Your Future with Us</h1>
                <p>Apply Now</p>
                <form encType="multipart/form-data">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="fname" className="form-label">First Name*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fname"
                                    placeholder=""
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
                                    placeholder=""
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
                                <label htmlFor="country" className="form-label">Country*</label>
                                <select
                                    className="w-100 am-custom-select"
                                    id="country"
                                    value={AMD_Country}
                                    onChange={(e) => setAMD_Country(e.target.value)}
                                >
                                    {country.length > 0 && country.map((country) => (
                                        <option key={country.cca2} value={country.name.common}>
                                            {country.name.common}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="depart" className="form-label">Desired Role/Department*</label>
                                <select
                                    className="w-100 am-custom-select"
                                    name="depart"
                                    id="depart"
                                    value={AMD_RoleOrDepartment}
                                    onChange={(e) => setAMD_RoleOrDepartment(e.target.value)}
                                >
                                    {careerList.map((item) => (
                                        <option value={item.position} key={item.position}>{item.position}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-group mb-3">
                                <label htmlFor="phone" className="form-label">Phone*</label>
                                <div className="d-flex w-100">
                                    <select
                                        className="form-control"
                                        id="country"
                                        style={{
                                            flex: responsiveCheck === "mobile" ? '1 1 15%' : '1 1 12%',
                                            background: '#F2F2F2'
                                        }}
                                        value={AMD_Country}
                                        onChange={(e) => setAMD_Country(e.target.value)}
                                    >
                                        {country.length > 0
                                            && country.map((country) => (
                                                <option key={country.name.common} value={country.name.common}>
                                                    {country.idd.root}
                                                    {Array.isArray(country.idd.suffixes) ?
                                                        country.idd.suffixes[0] :
                                                        country.idd.suffixes}
                                                </option>
                                            ))}
                                    </select>
                                    <input
                                        type="number"
                                        style={{ marginLeft: '5px' }}
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
                                <label htmlFor="states" className="form-label mt-1">State/Provinces*</label>
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
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City/Town*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder=""
                                    value={AMD_City}
                                    onChange={(e) => setAMD_City(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="pincode" className="form-label">Pincode*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pincode"
                                    placeholder=""
                                    value={AMD_Pincode}
                                    onChange={(e) => setAMD_Pincode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="resume" className="form-label">Resume*</label><br />
                                <button
                                    type="button"
                                    onClick={(e) => handleUpload(e)}
                                    className="am-career-button-one"
                                >
                                    Choose File
                                </button> <span>{AMD_Resume !== null && AMD_Resume.name}</span>
                                {AMD_Resume !== null && <div>File: {AMD_Resume.type} {AMD_Resume.size}</div>}
                                <div className="me-auto am-maxi-size">Maximum file size 1 MB*</div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <button
                                    type="button"
                                    onClick={handleContactSubmit}
                                    className="am-career-button-two"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}
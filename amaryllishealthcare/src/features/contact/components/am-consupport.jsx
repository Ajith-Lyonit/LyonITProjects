import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiservice from "../../../api/apiservice";
import { config, subjectConfig } from "../../../constants/config";
import Swal from "sweetalert2";
import useDeviceType from "../../../custom-hooks/userDevice";

const loadCountries = () => import("world-countries");

export const AMConSupportForm = () => {
    const responsiveCheck = useDeviceType();
    const [tabChange, setTabChange] = useState("second");
    const [country, setCountrys] = useState([]);
    const [AMD_Country, setAMD_Country] = useState("India");
    const [AMD_State, setAMD_State] = useState("");
    const [AMD_Email, setAMD_Email] = useState("");
    const [AMDCONF_Email, setAMDCONF_Email] = useState("");
    const [AMD_Firstname, setAMD_Firstname] = useState("");
    const [AMD_Followup, setAMD_Followup] = useState(false);
    const [AMD_HelpText, setAMD_HelpText] = useState("");
    const [AMD_Lastname, setAMD_Lastname] = useState("");
    const [AMD_OrganizationName, setAMD_OrganizationName] = useState("");
    const [AMD_OtherText, setAMD_OtherText] = useState("");
    const [AMD_Phone, setAMD_Phone] = useState("");
    const [AMD_ProductCatalogue, setAMD_ProductCatalogue] = useState(
        "Medical Device Consumables"
    );
    const [AMD_QueryType, setAMD_QueryType] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const queryList = [
        "Product information",
        "Pricing or availability details",
        "Questions about your order",
        "Interested in our products",
        "Support with an ongoing issue",
        "Learn more about our solutions",
        "Feedback or suggestions",
        "Partnership opportunities",
        "Others",
    ];

    // Lazy-load countries
    useEffect(() => {
        loadCountries().then((module) => {
            const countries = module.default;
            const filteredCountries = countries
                .map((c) => ({
                    name: c.name.common,
                    code: c.cca2,
                    dialCode:
                        c.idd.root + (c.idd.suffixes && c.idd.suffixes.length > 0 ? c.idd.suffixes[0] : ""),
                }))
                .sort((a, b) => a.name.localeCompare(b.name));
            setCountrys(filteredCountries);
        });
    }, []);

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

    const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

    const resetSupportValues = () => {
        setAMD_Country("India");
        setAMD_State("");
        setAMD_Email("");
        setAMDCONF_Email("");
        setAMD_Firstname("");
        setAMD_Followup(false);
        setAMD_HelpText("");
        setAMD_Lastname("");
        setAMD_OrganizationName("");
        setAMD_OtherText("");
        setAMD_Phone("");
        setAMD_ProductCatalogue("Medical Device Consumables");
        setAMD_QueryType("");
        setErrorMessage("");
    }

    const handleContactSubmit = () => {
        let errors = [];
        if (!AMD_Firstname) errors.push("First name is required.");
        if (!AMD_Lastname) errors.push("Last name is required.");
        if (!AMD_Email) errors.push("Email is required.");
        if (!isValidEmail(AMD_Email)) errors.push("Email format is invalid.");
        if (AMD_Email !== AMDCONF_Email) errors.push("Email and confirmation email must match.");
        if (!AMD_Phone) errors.push("Phone number is required.");
        if (!isValidPhone(AMD_Phone)) errors.push("Phone number format is invalid.");
        if (!AMD_Country) errors.push("Country is required.");
        if (!AMD_State) errors.push("State is required");
        if (!AMD_OrganizationName) errors.push("Organization name is required.");

        if (errors.length > 0) {
            Swal.fire({
                title: "Are you sure?",
                html: `${errors
                    .map(
                        (item) =>
                            `<p style="font-size:0.8rem;line-height:1px;" class="text-danger">${item}</p>`
                    )
                    .join("")}`,
                icon: "warning",
                confirmButtonText: "Ok",
            });
        } else {
            const formData = new FormData();
            formData.append(
                "data",
                JSON.stringify({
                    AMD_Country,
                    AMD_State,
                    AMD_Email,
                    AMD_Firstname,
                    AMD_Followup,
                    AMD_HelpText,
                    AMD_Lastname,
                    AMD_OrganizationName,
                    AMD_OtherText,
                    AMD_Phone,
                    AMD_ProductCatalogue,
                    AMD_FormType: config.AMD_FormContact,
                    AMD_SubjectType: subjectConfig.AMD_HAVE_QUESTION,
                })
            );
            resetSupportValues()
            Swal.fire({
                title: "Successfully submitted",
                icon: "success",
            });

            contactForm.mutate(formData);
        }
    };

    return (
        <div className="container-fluid am-contact-l">
            <div className="row">
                <div className="col-lg-12 mt-4 mb-4">
                    <div className="am-contact-l-form">
                        <button
                            className={tabChange === "second" ? "active" : ""}
                            onClick={() => {
                                setTabChange("second");
                                window.scrollTo({ top: 280, behavior: "smooth" });
                            }}
                        >
                            Have a question
                        </button>
                        <Link to={"/careers"} className="w-100">
                            <button
                                className={tabChange === "third" ? "active" : ""}
                                onClick={() => setTabChange("third")}
                            >
                                Join our team
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container-fluid am-contact-form-fill">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleContactSubmit();
                    }}
                >
                    <div className="row">
                        {/* First Name */}
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="fname" className="form-label">
                                    First Name*
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fname"
                                    value={AMD_Firstname}
                                    onChange={(e) => setAMD_Firstname(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="lname" className="form-label">
                                    Last Name*
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lname"
                                    value={AMD_Lastname}
                                    onChange={(e) => setAMD_Lastname(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={AMD_Email}
                                    onChange={(e) => setAMD_Email(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Confirm Email */}
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="confirm-email" className="form-label">
                                    Confirm Email*
                                </label>
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

                        {/* Country */}
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">
                                    Country*
                                </label>
                                <select
                                    className="w-100 am-custom-select"
                                    id="country"
                                    value={AMD_Country}
                                    onChange={(e) => setAMD_Country(e.target.value)}
                                >
                                    {country.map((c) => (
                                        <option key={c.code} value={c.name}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Phone and State */}
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="states" className="form-label mt-2">
                                    State/Provinces*
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    value={AMD_State}
                                    onChange={(e) => setAMD_State(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="org" className="form-label mt-2">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="org"
                                    value={AMD_OrganizationName}
                                    onChange={(e) => setAMD_OrganizationName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-group mb-3">
                                <label htmlFor="phone" className="form-label mb-3">
                                    Phone*
                                </label>
                                <div className="d-flex w-100">
                                    <select
                                        className="form-control"
                                        style={{ flex: responsiveCheck !== "mobile" ? "1 1 12%" : "1 1 22%", background: "#F2F2F2" }}
                                        value={AMD_Country}
                                        onChange={(e) => setAMD_Country(e.target.value)}
                                    >
                                        {country.map((c) => (
                                            <option key={c.code} value={c.name}>
                                                {c.dialCode}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        style={{ marginLeft: "5px" }}
                                        className="form-control w-100"
                                        id="phone"
                                        value={AMD_Phone}
                                        onChange={(e) => setAMD_Phone(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        {tabChange === 'second' && (
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label htmlFor="query" className="form-label">Query?*</label>
                                    <select
                                        className="w-100 am-custom-select"
                                        id="query"
                                        value={AMD_QueryType}
                                        onChange={(e) => setAMD_QueryType(e.target.value)}
                                    >
                                        {queryList.map(item => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                        {AMD_QueryType === 'Others' && (
                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <label htmlFor="other-text" className="form-label">Other Please Specify?*</label>
                                    <textarea
                                        style={{ height: '5rem' }}
                                        className="form-control"
                                        id="other-text"
                                        value={AMD_OtherText}
                                        onChange={(e) => setAMD_OtherText(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        )}
                        {tabChange === 'second' && (
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label htmlFor="help-text" className="form-label">How can we help?</label>
                                    <textarea
                                        style={{ height: '5rem' }}
                                        className="form-control"
                                        id="help-text"
                                        value={AMD_HelpText}
                                        onChange={(e) => setAMD_HelpText(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        )}
                        <div className="col-lg-3">
                            <div className="mb-3">
                                {/* You can add custom logic for the button here */}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="mb-3">
                            <button type="submit" className="am-career-button-two">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

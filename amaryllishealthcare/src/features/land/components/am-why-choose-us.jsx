import useDeviceType from "../../../custom-hooks/userDevice";


const AMWhyChooseUs = () => {
    const faqList = [
        {
            title: '1. What product categories does Amaryllis Healthcare specialize in?',
            description: 'We provide both Infection Prevention Products i.e., surgical gowns, drapes, and CSSD products and also Medical Device Consumables i.e., IV cannulas, IV sets, and Three way stopcocks.'
            , subdescription: []
        },
        {
            title: '2. What distinguishes Amaryllis Healthcare from other manufacturers of surgical products?',
            description: ` Amaryllis Healthcare is India's largest European CE and ISO 13485 licensed producer of IV cannulas, surgical gowns, surgical kits, drapes and other medical requirements. What distinguishes us apart is our uncompromising commitment to international standards, a proud 14-year heritage and strong trust our long standing partners have provided us.`
            , subdescription: []
        },
        {
            title: '3. Can we request custom products?',
            description: 'Yes, we provide flexible manufacturing solutions for personalized surgical packs and medical devices to suit unique clinical needs.'
            , subdescription: []
        },
        {
            title: '4. What are the advantages for hospitals which opt for Amaryllis Healthcare?',
            description: ' Hospitals that have worked with us enjoy the advantages of high-performance surgical gowns, superior IV cannulas, and pre-packaged surgical kits. Our products are equipped with:',
            subdescription: [
                'Certified International Quality',
                'Dependable On-Time Delivery',
                'Custom product development',
                'Marketing Support',
                'Extensive product training for staff and employees.'
            ]
        },
        {
            title: '5. Are Amaryllis IV cannulas available in standard and safety variants?',
            description: ' Yes, we offer standard IV cannulas and safety IV cannulas. Our products are specifically created to reduce needle-stick accidents and provide increased protection for busy healthcare professionals.'
            , subdescription: []
        },
        {
            title: '6. How does Amaryllis ensure the sterility of its surgical gowns and kits?',
            description: 'We stringently subject all our drapes, gowns, and kits to strict sterilization procedures. We adhere to validated protocols for sterilization and utilize controlled environments for zero-contamination risk and manufacture in class 100k clean room environments.'
            , subdescription: []
        }
    ]
    const responsiveCheck = useDeviceType()
    return (
        <
        >
            <div className="container-fluid am-why-marginclass am-medical-bg">
                <h3 className={`am-why-header ${responsiveCheck !== "mobile" && 'fa-2x'}`}>
                    Why Choose Us
                </h3>
                {responsiveCheck === "mobile" ?
                    (
                        <div style={{ marginTop: '-1rem' }}>
                            <h2 className="am-libre-font-two" style={{ fontSize: '1.3rem' }}>
                                Surgical Gowns, IV Cannulas & Surgical Kits Built for Precision and Protection
                            </h2>
                            <h2 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Commitment to Quality and Safety</h2>
                            <p>
                            Patient safety and quality assurance are at the core of Amaryllis Healthcare. All our products, ranging from <a href="https://www.amaryllishealthcare.com/infection-prevention-division/surgical-gowns">Surgical Gowns</a> to <a href="https://www.amaryllishealthcare.com/medical-device-division/iv-cannula-standard">IV Cannulas</a> tested stringently to meet international safety requirements. We confirm our strict quality control standards through our European CE and ISO 13485 certifications, which give assurance to health professionals that the products they use are reliable and dependable.
                            </p>
                            <button
                                className="btn btn-link p-0"
                                data-bs-toggle="collapse"
                                data-bs-target="#moreText"
                                aria-expanded="false"
                                aria-controls="moreText"
                            >
                                Read More
                            </button>
                            <div className="collapse" id="moreText">
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Established Expertise</h3>
                                <p>
                                With our 15+ years of experience in the field of medical supplies, we have gained invaluable knowledge regarding the requirements of healthcare professionals, and we provide timely solutions without ever compromising on quality. We serve an extensive chain of hospitals and have built a strong operational platform, backed by two state-of-the-art production plants at Bangalore and one in Rajyapalyam, five strategically located company-owned warehouses, and five regional offices spread across India. This facilitates quick and reliable availability of our products, constantly meeting and surpassing our customers' expectations.
                                </p>
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Personalized Healthcare Solutions</h3>
                                <p>
                                We understand that each and every health care facility has different needs, and we provide customized solutions for you that fit your requirements perfectly. From Customized <a href="https://www.amaryllishealthcare.com/infection-prevention-division/surgical-packs">Surgical Kits</a> for particular procedures to Branded<a href="https://www.amaryllishealthcare.com/infection-prevention-division/surgical-gowns">Surgical Gowns</a> according to your specifications, our professional team involves you at every step, bringing you personalized solutions for greater efficiency, cost-effectiveness, and better patient care.
                                </p>
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Customer Support</h3>
                                <p>
                                    At Amaryllis Healthcare, our commitment to clients goes beyond product delivery. Our team of customer service professionals is continuously on hand, ready to assist you, ranging from technical support and training programs to make you self-sufficient and capable using our products most efficiently. We view ourselves as an extension of your healthcare team, ready and responsive to your requirements at every turn.
                                </p>
                                <h2 className="am-libre-font-two" style={{ fontSize: '1.3rem' }}>
                                    Amaryllis Healthcare - Trusted Provider of IV cannula & Surgical Gowns
                                </h2>
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Our Worldwide Reach</h3>
                                <p>Amaryllis Healthcare has a strong and reputed international presence. Our products are relied on by more than 15 countries in Europe, Asia, the Middle East etc today. We have strong partnerships with hospitals and clinics across the globale, meeting different market standards and specifications. Our international presence reflects our ability to provide excellence on every continent, and our regional know-how makes us fulfill the unique requirements of Indian healthcare providers.</p>
                                <ul>
                                    <li>More than 550+ partnerships and health care organizations rely on Amaryllis Healthcare.</li>
                                    <li>Supplying quality medical supplies to 15+ countries</li>
                                    <li>Major presence across international markets for Europe, North America, and Southeast Asia.</li>
                                    <li>Compliance to international standards (European CE, ISO) for product quality for domestic and export.</li>
                                </ul>
                                <p>This international presence is efficiently backed by our Indian headquarters and production facilities, and from here, every product is created and produced under skilled direction. We further strengthen our global presence and work together with regional partners to make Amaryllis Healthcare solutions available to an increased number of hospitals worldwide.</p>
                                <h3 className="am-libre-font-two" style={{ fontSize: '1.3rem' }}>Certifications</h3>
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>European CE and ISO 13485 Approved</h3>
                                <p> We are ISO 13485 and European CE-certified, which highlights our commitment to stringent quality control and product safety standards.</p>
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Compliant to AAMI PB70 & EN 13795 Standards </h3>
                                <p>All our materials adhere to AAMI PB70 (American standards) and EN 13795 (European standards) for medical textiles — delivering best-in-class protection and performance.</p>
                                <div className="accordion my-5" id="itemAccordion">
                                    {faqList.map((item, index) => {
                                        const collapseId = `collapse-${index}`;
                                        const headingId = `heading-${index}`;

                                        return (
                                            <div className="accordion-item" key={index}>
                                                <h3 className="accordion-header" id={headingId}>
                                                    <button
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#${collapseId}`}
                                                        aria-expanded="false"
                                                        aria-controls={collapseId}
                                                        style={{ fontSize: '0.8rem' }}
                                                    >
                                                        {item.title}
                                                    </button>
                                                </h3>
                                                <div
                                                    id={collapseId}
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby={headingId}
                                                >
                                                    <div className="accordion-body">
                                                        {item.description || 'Answer coming soon...'}
                                                        {item.subdescription.length !== 0 && (
                                                            <ul>
                                                                {item.subdescription.map(sublist => (
                                                                    <li>{sublist}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) :
                    (
                       <div style={{ marginTop: '-1rem' }}>
                            <h2 className="am-libre-font-two" style={{ fontSize: '1.3rem' }}>
                                Surgical Gowns, IV Cannulas & Surgical Kits Built for Precision and Protection
                            </h2>
                            <h2 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Commitment to Quality and Safety</h2>
                            <p>
                            Patient safety and quality assurance are at the core of Amaryllis Healthcare. All our products, ranging from <a href="https://www.amaryllishealthcare.com/infection-prevention-division/surgical-gowns">Surgical Gowns</a> to <a href="https://www.amaryllishealthcare.com/medical-device-division/iv-cannula-standard">IV Cannulas</a> tested stringently to meet international safety requirements. We confirm our strict quality control standards through our European CE and ISO 13485 certifications, which give assurance to health professionals that the products they use are reliable and dependable.
                            </p>
                            <button
                                className="btn btn-link p-0"
                                data-bs-toggle="collapse"
                                data-bs-target="#moreText"
                                aria-expanded="false"
                                aria-controls="moreText"
                            >
                                Read More
                            </button>
                            <div className="collapse" id="moreText">
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Established Expertise</h3>
                                <p>
                                With our 15+ years of experience in the field of medical supplies, we have gained invaluable knowledge regarding the requirements of healthcare professionals, and we provide timely solutions without ever compromising on quality. We serve an extensive chain of hospitals and have built a strong operational platform, backed by two state-of-the-art production plants at Bangalore and one in Rajyapalyam, five strategically located company-owned warehouses, and five regional offices spread across India. This facilitates quick and reliable availability of our products, constantly meeting and surpassing our customers' expectations.
                                </p>
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Personalized Healthcare Solutions</h3>
                                <p>
                                We understand that each and every health care facility has different needs, and we provide customized solutions for you that fit your requirements perfectly. From Customized <a href="https://www.amaryllishealthcare.com/infection-prevention-division/surgical-packs">Surgical Kits</a> for particular procedures to Branded <a href="https://www.amaryllishealthcare.com/infection-prevention-division/surgical-gowns">Surgical Gowns</a> according to your specifications, our professional team involves you at every step, bringing you personalized solutions for greater efficiency, cost-effectiveness, and better patient care.
                                </p>
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Customer Support</h3>
                                <p>
                                    At Amaryllis Healthcare, our commitment to clients goes beyond product delivery. Our team of customer service professionals is continuously on hand, ready to assist you, ranging from technical support and training programs to make you self-sufficient and capable using our products most efficiently. We view ourselves as an extension of your healthcare team, ready and responsive to your requirements at every turn.
                                </p>
                                <h2 className="am-libre-font-two" style={{ fontSize: '1.3rem' }}>
                                    Amaryllis Healthcare - Trusted Provider of IV cannula & Surgical Gowns
                                </h2>
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Our Worldwide Reach</h3>
                                <p>Amaryllis Healthcare has a strong and reputed international presence. Our products are relied on by more than 15 countries in Europe, Asia, the Middle East etc today. We have strong partnerships with hospitals and clinics across the globale, meeting different market standards and specifications. Our international presence reflects our ability to provide excellence on every continent, and our regional know-how makes us fulfill the unique requirements of Indian healthcare providers.</p>
                                <ul>
                                    <li>More than 550+ partnerships and health care organizations rely on Amaryllis Healthcare.</li>
                                    <li>Supplying quality medical supplies to 15+ countries</li>
                                    <li>Major presence across international markets for Europe, North America, and Southeast Asia.</li>
                                    <li>Compliance to international standards (European CE, ISO) for product quality for domestic and export.</li>
                                </ul>
                                <p>This international presence is efficiently backed by our Indian headquarters and production facilities, and from here, every product is created and produced under skilled direction. We further strengthen our global presence and work together with regional partners to make Amaryllis Healthcare solutions available to an increased number of hospitals worldwide.</p>
                                <h3 className="am-libre-font-two" style={{ fontSize: '1.3rem' }}>Certifications</h3>
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>European CE and ISO 13485 Approved</h3>
                                <p> We are ISO 13485 and European CE-certified, which highlights our commitment to stringent quality control and product safety standards.</p>
                                <h3 className="fw-medium" style={{ fontSize: '1rem', marginTop: '1rem' }}>Compliant to AAMI PB70 & EN 13795 Standards </h3>
                                <p>All our materials adhere to AAMI PB70 (American standards) and EN 13795 (European standards) for medical textiles — delivering best-in-class protection and performance.</p>
                                <div className="accordion my-5" id="itemAccordion">
                                    {faqList.map((item, index) => {
                                        const collapseId = `collapse-${index}`;
                                        const headingId = `heading-${index}`;

                                        return (
                                            <div className="accordion-item" key={index}>
                                                <h3 className="accordion-header" id={headingId}>
                                                    <button
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#${collapseId}`}
                                                        aria-expanded="false"
                                                        aria-controls={collapseId}
                                                        style={{ fontSize: '0.8rem' }}
                                                    >
                                                        {item.title}
                                                    </button>
                                                </h3>
                                                <div
                                                    id={collapseId}
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby={headingId}
                                                >
                                                    <div className="accordion-body">
                                                        {item.description || 'Answer coming soon...'}
                                                        {item.subdescription.length !== 0 && (
                                                            <ul>
                                                                {item.subdescription.map(sublist => (
                                                                    <li>{sublist}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default AMWhyChooseUs
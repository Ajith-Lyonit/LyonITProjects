import { Link } from "react-router-dom";
import useDeviceType from "../../../custom-hooks/userDevice";

export const AMPrivacy = () => {
    const responsiveCheck = useDeviceType()
    return (
<>
            {responsiveCheck !== "mobile" &&
                <div className="container-fluid am-career-bredcrump">
                    <Link to={"/"} className="text-dark text-decoration-none">Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>Privacy Policy</span>
                </div>}
            <div className="am-privaacy-page">
                <h1>Privacy Policy</h1>
            </div>
            <div className="container-fluid am-privaacy-page">
                <div className="row">
                    <div className="col-lg-12">

                        <p>At Amaryllis Healthcare, we respect the privacy of every user of our website. Your privacy is important to us, and we strive to take reasonable care and protection of the information we receive from you, the User. In this regard, we adhere to the applicable governing laws in India.</p>

                        <p>This Privacy Policy (“Privacy Policy”) applies to the collection, storage, processing, disclosure, and transfer of your Personal Information (defined below) as per the above-mentioned laws, particularly when you use the website of <span className="text-decoration-underline">www.amaryllishealthcare.com</span> (“Website”) operated by Amaryllis Healthcare for any information or services (“Services”).</p>

                        <p>The terms ‘You’ or ‘Your’ refer to you as the User (registered or unregistered) of the Website and/or Services, and the terms ‘We’, ‘Us” and ‘Our’ refer to Amaryllis Healthcare.</p>

                        <p>1. Access</p>
                        <p>We collect Your Personal Information directly from You, from third-parties, and automatically through Our Website. This Personal Information, for instance, would relate to the type of device You are using, the time that You have logged on to Our Website, Your IP address, and other Personal Information as listed in Clause 4 below.</p>

                        <p>2. Consent</p>
                        <p>By choosing the Opt-In option on the Website and thereafter, by providing Us Your personal information or availing services of Amaryllis Healthcare or by making use of the facilities provided by the Website, it is agreed by You that You have freely consented to the collection, storage, processing, disclosure, and transfer of Your Personal Information in accordance with the provisions of this Privacy Policy and any amendments thereof.</p>

                        <p>You acknowledge that You have provided Your Personal Information out of your free will and after understanding how it will be used. You also consent that the collection, storage, processing, disclosure, and transfer of any Personal Information shall not cause any wrongful loss to You, if it is done in accordance with the provisions of this Privacy Policy. However, we shall not be liable for any loss that may happen to you owing to the provision of wrongful Personal Information by You.</p>

                        <p>3. Control Over Your Personal Information</p>
                        <p>You have the right to withdraw Your consent at any point, provided such withdrawal of the consent is intimated to us in writing through an email at <a href="mailto:info@amaryllishealthcare.com">info@amaryllishealthcare.com</a> requesting the same. If You wish to rectify the Personal Information that we may have collected to offer You personalized services and offers, as per Clause 12 of this Policy, you may write to the Grievance Officer, as mentioned under Clause 15 of this Policy, citing the reason for such rectification of Personal Information.
                            Once You withdraw Your Consent to share the Personal Information collected by Us, We shall have the option not to fulfill the purposes for which the said Personal Information was sought and We may restrict you from using our Services or the Website.</p>

                        <p>4.Changes to the Privacy Policy</p>
                        <p>We may update this Privacy Policy from time to time with or without advance notice</p>

                        <p>5.Personal Information Collected</p>
                        <p>The kinds of information that We collect about You include but are not limited to the following:</p>
                        <p>
                            Customer Name,
                            Address (including country and pin/postal code),
                            Phone number/mobile number,
                            Email address,
                            Login ID and password,
                            User details as provided at the time of registration or thereafter,
                            Your usage details such as time, frequency, duration and pattern of use, features used and the amount of storage used,
                            Master and transaction data and other data stored in Your user account,
                            Internet Protocol address, cookie data, browser type, browser language, referring URL, files accessed, errors generated, time zone, operating system, product preferences and communication and other visitor details collected in Our log files,
                            Any other information that is willingly shared by You (collectively referred to as "Personal Information")
                        </p>

                        <p>
                            6.How we Collect Personal Information
                        </p>
                        <p>The methods by which we collect your Personal Information include but are not limited to the following:</p>
                        <p>
                            By filling the inquiry or information request form,
                            By providing details to a Amaryllis Healthcare Health Care Professional or Amaryllis Healthcare representative,
                            When You register on Our Website,
                            When You provide Your Personal Information to Us during course of receiving services,
                            When You use the features on Our Website,
                            When you provide access to any other website.
                            By the use of cookies (more fully detailed in Clause 9 of this Privacy Policy)
                        </p>

                        <p>
                            7.Use of Personal Information
                        </p>
                        <p>
                            Your Personal Information may be used for various purposes including but not limited to the following:
                        </p>
                        <p>
                            To provide effective Services
                            To operate and improve the Website and/or our Services;
                            To perform studies, research and analysis for improving Our information, analysis, services and technologies; and ensuring that the content displayed are customized to Your interests and preferences;
                            To contact You via phone, SMS, WhatsApp or email for inquiries, technical issues, support, payment reminders, deals and offers and other announcements;
                            To send promotional mailings from Us or any of Our channel partners via SMS, WhatsApp, email or snail mail;
                            To advertise products and services of Amaryllis Healthcare and third parties;
                            To transfer information about You if we are acquired by or merged with another company;
                            To share with our business partners for provision of specific services you have ordered so as to enable them to provide effective services to You;
                            To administer or otherwise carry out Our obligations in relation to any agreement You have with us;
                            To build your profile on the Website;
                            To respond to subpoenas, court orders, or legal process, or to establish or exercise Our legal rights or defend against legal claims; and
                            To investigate, prevent, or take action regarding illegal activities, suspected fraud, violations of our Terms of Use, breach of Our agreement with you or as otherwise required by law,
                            To aggregate Personal Information for research, statistical analysis and business intelligence purposes, and to sell or otherwise transfer such research, statistical or intelligence data in an aggregated or non-personally identifiable form to third parties and affiliates, (referred to as “Purpose(s)”)
                        </p>
                        <p>
                            8.Sharing and Transferring of Personal Information
                        </p>
                        <p>
                            Once you have freely consented to share your Personal Information with us, You authorize us to exchange, transfer, share, part with all or any of Your Personal Information, across borders and from Your country to any other countries across the world with the Cloud Service Provider and Our affiliates / agents / third party service providers / partners / banks and financial institutions or any other persons, for the Purposes specified under this Policy or as may be required by applicable law.
                            You acknowledge that some countries where we may transfer Your Personal Information may not have data protection laws that are as stringent as the laws of Your own country. You acknowledge that it is adequate that when Amaryllis Healthcare transfers Your Personal Information to any other entity within or outside Your country of residence, Amaryllis Healthcare will place contractual obligations on the transferee which will oblige the transferee to adhere to the provisions of this Privacy Policy.
                        </p>
                        <p> 9.Use of Cookies</p>
                        <p>
                            We may store temporary or permanent ‘cookies’ on your computer. You can erase or choose to block these cookies from your computer. You can configure your computer's browser to alert you when we attempt to send you a cookie with an option to accept or refuse the cookie. If you have turned cookies off, you may be prevented from using certain features of the Website. In the course of serving advertisements or optimizing services to its Users, Amaryllis Healthcare may allow authorized third parties to place or recognize a unique cookie on the User’s browser/device. Amaryllis Healthcare does not store personal information in cookies. Further, Amaryllis Healthcare does not exercise control over the sites displayed as search results or links from within its Services. These other sites may place their own cookies or other files on Your computer, collect data or solicit personal information from You, for which Amaryllis Healthcare is not responsible or liable. Amaryllis Healthcare encourages You to read the privacy policies of all external sites.
                        </p>
                        <p>
                            10.Security
                        </p>
                        <p>
                            The security of your Personal Information is important to us. We have adopted reasonable security practices and procedures including role-based access, password protection, encryption etc. to ensure that the Personal Information collected is secure. We restrict access to your Personal Information to Our and Our affiliates’ employees, agents, third party service providers, partners, and agencies on a need to know basis and for the Purposes as specified above in this Policy.
                            While We will endeavor to take all reasonable and appropriate steps to keep secure any information which We hold about You and prevent unauthorized access, You acknowledge that the internet is not 100% secure and that We cannot provide any absolute assurance regarding the security of Your Personal Information. We will not be liable in any way in relation to any breach of security or unintended loss or disclosure of information caused by Us in relation to your Personal Information.
                        </p>
                        <p>
                            11.Third Party References and Links
                        </p>
                        <p>During Your interactions with Us, it may happen that We provide/include reference to third parties, and/or links and hyperlinks of third party websites. It may also happen that you include links and hyperlinks of third party websites. The reference of such third parties or listing of such third party external sites (by You or by Us) does not imply endorsement of such party or site by Amaryllis Healthcare. Such third parties and third party sites are governed by their own terms and conditions. We do not make any representations regarding the availability and performance of any of the third parties or third party sites. We are not responsible for the content, terms of use, privacy policies and practices of such third party websites.
                        </p>
                        <p>Do-not-track requests</p>
                        <p>There is no standard for how online service should respond to “Do Not Track” signals or other mechanisms that may allow you to opt out of the collection of information across networks of websites and online services. Therefore, we do not honor “Do Not Track” signals. As standards develop, we will revisit this issue and update this notice if our practices change.</p>
                        <p>
                            12.Rectification/Correction of Personal information
                        </p>
                        <p>
                            If You need to update or correct your Personal Information, you may send updates and corrections to us at info@amaryllishealthcare.com and we will take all reasonable efforts to incorporate the changes within a reasonable period of time.
                        </p>
                        <p>
                            13.Compliance with Laws
                        </p>
                        <p>
                            You are not allowed to use the services of the Website if any of the terms of this Privacy Policy are not in accordance with the applicable laws of your country.
                        </p>
                        <p>
                            14.Term of Storage of Personal Information
                        </p>
                        <p>
                            Amaryllis Healthcare shall store Your Personal Information at least for a period of three years from the last date of use of the Services or Website or for such period as may be required by law.
                        </p>
                        <p>
                            15.Grievance Offer
                        </p>
                        <p>We have appointed a Grievance Officer to address any concerns or grievances that You may have regarding the processing of Your Personal Information. If you have any such grievances, please write to our Grievance Officer at info@amaryllishealthcare.com and Our officer will attempt to resolve Your issues in a timely manner.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
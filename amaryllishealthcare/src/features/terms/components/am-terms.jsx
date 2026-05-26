import { Link } from "react-router-dom"
import useDeviceType from "../../../custom-hooks/userDevice"
const AMTerms = () => {
    const responsiveCheck = useDeviceType()
    return (
        <>
            {responsiveCheck !== "mobile" &&
                <div className="container-fluid am-career-bredcrump">
                    <Link to={"/"} className="text-dark text-decoration-none">Home</Link>&nbsp;<i class="fa-solid fa-angle-right"></i>&nbsp;<span>Terms and Conditions</span>
                </div>}
            <div className="am-privaacy-page">
                <h1>Terms and Conditions</h1>
            </div>
            <div className="container-fluid am-privaacy-page">
                <div className="row">
                    <div className="col-lg-12">
                        <p>Welcome to <strong>www.amaryllishealthcare.com</strong> ("Website" or "Platform"). This Platform is owned and operated by Amaryllis Healthcare, a trusted manufacturer and supplier of high-quality surgical gowns, drapes, packs, and other medical devices ("Offerings"). By accessing or using our Platform, you ("User" or "You") agree to comply with and be bound by the following terms and conditions ("Terms" or "Agreement"). If You do not agree to all of these Terms, You must not access or use the Platform in any manner.</p>

                        <p>You acknowledge that by using or accessing the Platform, You are agreeing to these Terms, which, along with our Privacy Policy (the “Privacy Policy”), govern Your relationship with us. You also represent that You have read and understood all of the provisions of this Agreement.</p>

                        <p>Amaryllis Healthcare reserves the right to change these Terms at any time. Any such changes will be posted on the Platform, and Your continued use of the Platform after such changes have been posted will constitute Your acceptance of the revised Terms. You are encouraged to review these Terms regularly. The Terms were last updated on 12th May 2025.</p>

                        <h2>1. General</h2>
                        <ul>
                            <li><strong>1.1. Ownership and Operation:</strong> This Platform is owned and operated by Amaryllis Healthcare, an Indian company with its registered office at #273/A Bommasandra Industrial Area, Bangalore - 560 099, Karnataka, India.</li>
                            <li><strong>1.2. Binding Agreement:</strong> These Terms and Conditions, along with any policy or other document referred to herein, govern the manner in which a person can access or use the Platform. Upon Your consent (by accessing or using the Platform), these Terms constitute a binding contract between You and Amaryllis Healthcare ("We," "Us," or "Our").</li>
                            <li><strong>1.3. Acceptance of Terms:</strong> By accessing, browsing, or otherwise using the Platform, You signify Your acceptance of these Terms.</li>
                            <li><strong>1.4. Amendments to Terms:</strong> These Terms may be updated periodically and will be published on our Platform. We encourage You to review the latest version regularly.</li>
                        </ul>

                        <h2>2. Platform Services and Scope</h2>
                        <ul>
                            <li><strong>2.1. Scope of the Platform:</strong> The Platform showcases Our product Offerings.</li>
                            <li><strong>2.2. User Categories:</strong> Includes customers or potential customers and visitors.</li>
                            <li><strong>2.3. License to Use:</strong> Limited, non-exclusive, revocable license to access and use the Platform.</li>
                            <li><strong>2.4. No Fiduciary Relationship:</strong> All interactions are solely between You and Amaryllis Healthcare.</li>
                        </ul>

                        <h2>3. Intellectual Property</h2>
                        <ul>
                            <li><strong>3.1. Ownership:</strong> All rights are owned by Amaryllis Healthcare or its licensors.</li>
                            <li><strong>3.2. Platform Content:</strong> Protected by copyright, trademark, and other intellectual property laws.</li>
                            <li><strong>3.3. Limited Use:</strong> Personal, non-commercial use only.</li>
                            <li><strong>3.4. No License to Marks:</strong> No implied license to use trademarks or service marks.</li>
                            <li><strong>3.5. Protection of Rights:</strong> IP rights enforced to the fullest extent permitted by law.</li>
                        </ul>

                        <h2>4. Product Information and Availability</h2>
                        <ul>
                            <li><strong>4.1. Accuracy of Information:</strong> Efforts made to ensure accuracy, but errors may occur.</li>
                            <li><strong>4.2. Informational Purpose:</strong> Content is for general information purposes only.</li>
                            <li><strong>4.3. No Guarantee of Availability:</strong> Products may be changed or discontinued without notice.</li>
                            <li><strong>4.4. Reliance on Information:</strong> Use of content is at Your own risk.</li>
                        </ul>

                        <h2>5. Pricing and Payments (If Applicable)</h2>
                        <ul>
                            <li><strong>5.1. Currency:</strong> Prices in INR unless stated otherwise.</li>
                            <li><strong>5.2. Right to Change Prices:</strong> Prices may change without notice.</li>
                            <li><strong>5.3. Secure Transactions:</strong> Payments processed securely via third-party gateways.</li>
                            <li><strong>5.4. Accuracy of Payment Information:</strong> You must provide accurate and complete details.</li>
                            <li><strong>5.5. Errors in Pricing or Payment:</strong> Errors may be corrected; orders may be revised or canceled.</li>
                        </ul>

                        <h2>6. Third-Party Links and Content</h2>
                        <ul>
                            <li><strong>6.1. Links to External Websites:</strong> Provided for convenience and do not imply endorsement.</li>
                            <li><strong>6.2. No Responsibility for Third-Party Content:</strong> We are not responsible for third-party sites or content.</li>
                            <li><strong>6.3. Your Interactions:</strong> Governed by third-party terms and privacy policies.</li>
                        </ul>

                        <h2>7. Prohibited Conduct</h2>
                        <p>You agree not to engage in any prohibited activities, including but not limited to:</p>
                        <ul>
                            <li>Illegal activities or violation of laws</li>
                            <li>Uploading malicious code</li>
                            <li>Interfering with the Platform</li>
                            <li>Harvesting personal data</li>
                            <li>Using bots or scrapers</li>
                            <li>Impersonation or misrepresentation</li>
                            <li>Inhibiting use by others</li>
                            <li>Circumventing security controls</li>
                            <li>Creating competing products</li>
                            <li>Posting unlawful or offensive content</li>
                            <li>Posting content without rights or permission</li>
                            <li>Posting spam or unsolicited messages</li>
                            <li>Disrupting services or network</li>
                            <li>Unauthorized access to systems</li>
                        </ul>

                        <h2>8. Disclaimer of Warranties</h2>
                        <ul>
                            <li><strong>8.1:</strong> Platform provided "as is" and "as available."</li>
                            <li><strong>8.2:</strong> No warranties of any kind, express or implied.</li>
                            <li><strong>8.3:</strong> No guarantee of uninterrupted or error-free use.</li>
                            <li><strong>8.4:</strong> Accuracy or reliability of information not guaranteed.</li>
                        </ul>

                        <h2>9. Limitation of Liability</h2>
                        <ul>
                            <li><strong>9.1:</strong> Not liable for any damages arising from your use of the Platform.</li>
                            <li><strong>9.2:</strong> Some exclusions may not apply in all jurisdictions.</li>
                        </ul>

                        <h2>10. Indemnification</h2>
                        <p>You agree to indemnify and hold harmless Amaryllis Healthcare against any losses or damages arising from:</p>
                        <ul>
                            <li>Your use of the Platform</li>
                            <li>Your breach of these Terms</li>
                            <li>Your violation of laws or rights</li>
                            <li>Your submitted content</li>
                        </ul>

                        <h2>11. Privacy Policy</h2>
                        <p>Your use of the Platform is also governed by our <Link to={'/privacy'}>Privacy Policy</Link>.</p>

                        <h2>12. Force Majeure</h2>
                        <p>We are not liable for events beyond our control including natural disasters, strikes, or internet failures.</p>

                        <h2>13. Governing Law and Dispute Resolution</h2>
                        <p>These Terms are governed by the laws of India and disputes shall be resolved in courts located in Bangalore, Karnataka.</p>

                        <h2>14. Waiver</h2>
                        <p>No waiver of any rights unless in writing by Amaryllis Healthcare.</p>

                        <h2>15. Severability</h2>
                        <p>If any provision is invalid, the remaining provisions shall remain in full force and effect.</p>

                        <h2>16. Entire Agreement</h2>
                        <p>These Terms, together with the Privacy Policy, constitute the entire agreement.</p>

                        <h2>17. Contact Us</h2>
                        <p>If You have any questions, please contact us at: <a href="mailto:info@amaryllishealthcare.com">info@amaryllishealthcare.com</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AMTerms
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './TermsService.css';

const TermsService = () => {
    return (
        <div className="terms-page">
            <Navbar />
            <div className="terms-container">
                <h1>Terms and Conditions</h1>
                <p><strong>Effective Date:</strong>10/07/2024</p>

                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using <strong>Let's Print</strong>, you agree to be bound by these Terms and Conditions, including any additional terms and conditions and policies referenced herein or available by hyperlink. If you do not agree to all the terms, you may not access the website or use any services.</p>

                <h2>2. Changes to Terms</h2>
                <p>We reserve the right to update, change, or replace any part of these Terms and Conditions by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.</p>

                <h2>3. Use of Our Services</h2>
                <p>By agreeing to these Terms, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority and you have given us your consent to allow any of your minor dependents to use this site.</p>

                <h2>4. User Accounts</h2>
                <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.</p>

                <h2>5. Products or Services</h2>
                <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our <a href="/return-policy">Return Policy</a>.</p>

                <h2>6. Payment</h2>
                <p>All payments are processed through secure payment gateways. We accept various forms of payment including credit cards and PayPal. By providing your payment information, you agree to our billing policies.</p>

                <h2>7. Intellectual Property</h2>
                <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of <strong>Let's Print</strong> and protected by applicable intellectual property laws. You may not use, reproduce, or distribute any content from the site without express permission.</p>

                <h2>8. Prohibited Uses</h2>
                <p>In addition to other prohibitions as set forth in the Terms and Conditions, you are prohibited from using the site or its content:</p>
                <ul>
                    <li>For any unlawful purpose</li>
                    <li>To solicit others to perform or participate in any unlawful acts</li>
                    <li>To infringe upon or violate our intellectual property rights</li>
                    <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>

                <h2>9. Limitation of Liability</h2>
                <p>We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error-free. You expressly agree that your use of the service is at your sole risk.</p>

                <h2>10. Indemnification</h2>
                <p>You agree to indemnify, defend, and hold harmless <strong>Let's Print</strong> and our affiliates, officers, directors, agents, contractors, and employees, harmless from any claim or demand arising from your breach of these Terms and Conditions or your violation of any law or the rights of a third-party.</p>

                <h2>11. Governing Law</h2>
                <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of <strong>NYC</strong>.</p>

                <h2>12. Contact Information</h2>
                <p>Questions about the Terms and Conditions should be sent to us at: <strong>letsprint003@gmail.com</strong></p>
            </div>
            <Footer />
        </div>
    );
};

export default TermsService;

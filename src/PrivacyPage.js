import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './PrivacyPage.css';

const PrivacyPage = () => {
    return (
        <div className="privacy-page">
            <Navbar />

            <div className="privacy-container">
                <h1>Privacy Policy</h1>
                <p><strong>Effective Date:</strong>10/07/2024</p>

                <p>At <strong>Let's Print</strong>, we value your privacy. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you visit our website <strong>Lets-Print.org </strong>
                    or use our services. Please read this policy carefully to understand our practices regarding your personal
                    data.</p>

                <h2>1. Information We Collect</h2>
                <p>We collect two types of information from you when you visit our website or use our services:</p>

                <h3>Personal Information</h3>
                <ul>
                    <li>Name</li>
                    <li>Email Address</li>
                    <li>Phone Number</li>
                    <li>Payment Information</li>
                    <li>Shipping/Billing Address</li>
                </ul>

                <h3>Non-Personal Information</h3>
                <ul>
                    <li>IP Address</li>
                    <li>Browser Type</li>
                    <li>Device Information</li>
                    <li>Website Usage Data (pages visited, time spent on the site, etc.)</li>
                </ul>

                <h2>2. How We Collect Information</h2>
                <p>We collect personal information directly and automatically when you interact with our website.</p>

                <h3>Direct Collection</h3>
                <p>We collect personal information directly from you when you:</p>
                <ul>
                    <li>Place an order</li>
                    <li>Register for an account</li>
                    <li>Fill out a form (e.g., contact form, booking inquiry)</li>
                    <li>Sign up for our newsletter</li>
                </ul>

                <h3>Automatic Collection</h3>
                <p>We collect non-personal information automatically when you interact with our website through cookies,
                    analytics tools, and similar technologies.</p>

                <h3>Third-Party Collection</h3>
                <p>We use third-party services like <strong>[Payment Processor]</strong>, <strong>[Email Marketing Service]</strong>,
                    and <strong>[Analytics Provider]</strong> to collect and process data.</p>

                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul>
                    <li>To process transactions and deliver services</li>
                    <li>To send you order confirmations, receipts, or customer service responses</li>
                    <li>To send promotional emails (only with your consent)</li>
                    <li>To improve our website and services through analytics</li>
                    <li>To comply with legal obligations (e.g., tax filings)</li>
                </ul>

                <h2>4. Data Sharing and Disclosure</h2>
                <p>We may share your personal data with service providers, legal authorities, or during business transfers (e.g., mergers).</p>

                <h2>5. Data Security</h2>
                <p>We implement reasonable security measures to protect your personal information from unauthorized access,
                    disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic
                    storage is 100% secure.</p>

                <h2>6. Data Retention</h2>
                <p>We retain your personal information for as long as necessary to provide services and comply with legal
                    obligations.</p>

                <h2>7. Your Rights</h2>
                <p>You have the right to access, update, correct, or delete your personal information. Contact us at <strong>[letsprint003@gmail.com]</strong> to exercise these rights.</p>

                <h2>8. Cookies and Tracking</h2>
                <p>We use cookies and similar tracking technologies to enhance your experience. You can control or disable
                    cookies through your browser settings.</p>

                <h2>9. Third-Party Links</h2>
                <p>Our website may contain links to other websites that are not operated by us. We are not responsible for the
                    privacy practices of other websites.</p>

                <h2>10. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated
                    effective date.</p>

                <h2>11. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p><strong>Let's Print</strong><br />
                    Email: <strong>letsprint003@gmail.com</strong><br />
                    Phone: <strong>[]</strong></p>
            </div>

            <Footer />
        </div>
    );
};

export default PrivacyPage;

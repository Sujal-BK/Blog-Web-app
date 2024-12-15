import React from 'react';
import Layout from '../Layout/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
    <div className="container mx-auto p-4 md:p-8 lg:p-12 font-[Poppins]">
      <h1 className="text-2xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6">Information Collection</h2>
      <p className="mb-2">We collect the following types of personal information:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Name</li>
        <li>Email Address</li>
        <li>IP Address</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">Use of Information</h2>
      <p className="mb-2">Your information may be used to:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Improve our services</li>
        <li>Send newsletters and updates</li>
        <li>Respond to inquiries</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">Data Sharing and Disclosure</h2>
      <p className="mb-2">We do not sell or rent your personal information. We may share your information with third parties only in the following circumstances:</p>
      <ul className="list-disc list-inside mb-4">
        <li>To comply with legal obligations</li>
        <li>With service providers who assist us in our operations</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">User  Rights</h2>
      <p className="mb-2">You have the right to:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Access your personal data</li>
        <li>Request correction of your data</li>
        <li>Request deletion of your data</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">Cookies and Tracking Technologies</h2>
      <p className="mb-4">We use cookies to enhance your experience. You can manage your cookie preferences through your browser settings.</p>

      <h2 className="text-xl font-semibold mt-6">Data Security</h2>
      <p className="mb-4">We take reasonable measures to protect your personal information from unauthorized access.</p>

      <h2 className="text-xl font-semibold mt-6">Changes to the Privacy Policy</h2>
      <p className="mb-4">We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

      <h2 className="text-xl font-semibold mt-6">Contact Information</h2>
      <p className="mb-4">If you have any questions about this privacy policy, please contact us at:</p>
      <p className="mb-4">Email: <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@blog.com</a></p>
    </div>
    </Layout>
  );
};

export default PrivacyPolicy;
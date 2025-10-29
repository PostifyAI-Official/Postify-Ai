'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-zinc-600">
            Last updated: October 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none text-zinc-700">
            <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Introduction</h2>
            <p>
              Postify ("we", "us", "our", or "Company") operates the postify.com website and the Postify application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            <h3 className="text-xl font-bold text-black mt-6 mb-3">Types of Data Collected:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information ("Personal Data") including, but not limited to:
                <ul className="list-disc pl-6 mt-2">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Password</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </li>
              <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include information such as your computer's Internet Protocol address, browser type, browser version, the pages you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
              <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Use of Data</h2>
            <p>Postify uses the collected data for various purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer care and support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Security of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: privacy@postify.com</li>
              <li>Website: www.postify.com</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, delete, or port your data. Please contact us to exercise these rights.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">8. GDPR Compliance</h2>
            <p>
              If you are located in the European Union, you have rights under the General Data Protection Regulation (GDPR). We are committed to complying with GDPR and other applicable privacy laws.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">9. CCPA Compliance</h2>
            <p>
              If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA). We comply with all CCPA requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

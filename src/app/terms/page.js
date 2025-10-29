'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            Terms and Conditions
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
            <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Terms</h2>
            <p>
              By accessing this website and using Postify, you accept these terms and conditions in full. If you do not agree to these terms and conditions or any part of these terms and conditions, you must not use this website or Postify.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Postify for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the website</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Disclaimer</h2>
            <p>
              The materials on Postify are provided on an 'as is' basis. Postify makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Limitations</h2>
            <p>
              In no event shall Postify or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Postify, even if Postify or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Postify could include technical, typographical, or photographic errors. Postify does not warrant that any of the materials on the website are accurate, complete, or current. Postify may make changes to the materials contained on the website at any time without notice.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Links</h2>
            <p>
              Postify has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Postify of the site. Use of any such linked website is at the user's own risk.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Modifications</h2>
            <p>
              Postify may revise these terms and conditions for the website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms and conditions.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">9. User Accounts</h2>
            <p>
              When you create an account with Postify, you must provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your password and account information. You are responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">10. User Content</h2>
            <p>
              You retain all rights to any content you submit, post or display on or through Postify. By submitting content to Postify, you grant Postify a non-exclusive, worldwide, royalty-free license to use that content for the purposes of providing and improving the Service.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">11. Prohibited Uses</h2>
            <p>You agree not to use Postify to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Post or transmit any illegal, threatening, abusive, defamatory, obscene, or otherwise objectionable material</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Create content that infringes on others' intellectual property rights</li>
              <li>Spam or send unsolicited messages</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">12. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">13. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: legal@postify.com</li>
              <li>Website: www.postify.com</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

import { FaUserShield, FaDatabase, FaLock, FaSyncAlt, FaEnvelopeOpenText } from "react-icons/fa";

const TermsOfService = () => {
  return (
    <div className="text-gray-800 bg-gradient-to-r from-purple-500 via-blue-400 to-blue-600 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold mb-6 text-white text-center  drop-shadow-[1px_1px_0px_black]">🚀 Terms of Service</h1>
        <p className="mb-4 text-white text-lg text-center drop-shadow-[1px_1px_0px_black]">
          These Terms of Service ("Terms") govern your use of the <strong>Foody</strong> app and its related services.
          By using our app, you agree to comply with these Terms.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaUserShield className="mr-2 text-purple-500" /> Use of Service</h2>
          <p className="mb-4 text-gray-700">
            You must be at least <span className="font-bold text-red-500">13 years old</span> to use our services.
            You agree to use Foody only for lawful purposes and in accordance with these Terms.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaDatabase className="mr-2 text-blue-500" /> Account Responsibility</h2>
          <p className="mb-4 text-gray-700">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaLock className="mr-2 text-red-500" /> Orders & Payments</h2>
          <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700">
            <li>Orders placed through <strong>Foody</strong> are binding once confirmed.</li>
            <li>All payments are processed securely through third-party services.</li>
            <li>We reserve the right to refuse or cancel orders at any time.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaSyncAlt className="mr-2 text-yellow-500" /> Content Ownership</h2>
          <p className="mb-4 text-gray-700">
            All content, trademarks, and logos on Foody are the property of their respective owners.
            You may not copy, reproduce, or distribute any part of our app without permission.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaEnvelopeOpenText className="mr-2 text-green-500" /> Prohibited Activities</h2>
          <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700">
            <li>Using the app for illegal activities.</li>
            <li>Hacking, attempting to breach our security.</li>
            <li>Spamming or scraping user data.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaSyncAlt className="mr-2 text-orange-500" /> Termination</h2>
          <p className="mb-4 text-gray-700">
            We reserve the right to suspend or terminate your access to Foody if you violate these Terms or engage in any harmful behavior.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaUserShield className="mr-2 text-purple-500" /> Limitation of Liability</h2>
          <p className="mb-4 text-gray-700">
            Foody is provided "as-is" without warranties. We are not liable for any indirect, incidental, or consequential damages resulting from your use of the app.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaSyncAlt className="mr-2 text-yellow-500" /> Changes to Terms</h2>
          <p className="mb-4 text-gray-700">
            We may update these Terms at any time. Continued use of the app after changes means you accept the updated Terms.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaEnvelopeOpenText className="mr-2 text-green-500" /> Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, contact us at:  
            <br />
            <span className="font-medium">Foody App</span> <br />
            Email: <a href="mailto:support@foodyapp.com" className="text-blue-600 hover:underline font-medium">support@foodyapp.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
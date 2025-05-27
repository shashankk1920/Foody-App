import { FaUserShield, FaDatabase, FaLock, FaSyncAlt, FaEnvelopeOpenText } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="text-gray-800 bg-gradient-to-r from-purple-400 to-blue-500">
    <div className="max-w-4xl mx-auto px-6 py-10 ">
      <h1 className="text-4xl font-extrabold mb-6 text-white text-center drop-shadow-[1px_1px_0px_black]">🔒 Privacy Policy</h1>
      <p className="mb-4 text-white text-lg text-center drop-shadow-[1px_1px_0px_black]">
        At <strong>Foody</strong>, your privacy is our priority. This policy explains how we collect, use, and safeguard your personal data.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaUserShield className="mr-2 text-purple-500" /> Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Personal Info:</strong> Name, email, phone number, etc.</li>
          <li><strong>Order Details:</strong> Restaurants visited, orders placed, preferences.</li>
          <li><strong>Device Info:</strong> IP address, browser type, device data.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaDatabase className="mr-2 text-blue-500" /> How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Enhancing our services.</li>
          <li>Processing payments and orders.</li>
          <li>Sending promotional emails and updates.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaLock className="mr-2 text-red-500" /> Data Security</h2>
        <p className="mb-4 text-gray-700">
          We implement industry-standard security measures to protect your data from unauthorized access.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaSyncAlt className="mr-2 text-yellow-500" /> Changes to This Policy</h2>
        <p className="mb-4 text-gray-700">
          We may update this policy periodically. Significant changes will be notified via email or in our app.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 flex items-center"><FaEnvelopeOpenText className="mr-2 text-green-500" /> Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions, reach us at:  
          <br />
          <span className="font-medium">Foody App</span> <br />
          Email: <a href="mailto:support@foodyapp.com" className="text-blue-600 hover:underline font-medium">support@foodyapp.com</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default PrivacyPolicy;
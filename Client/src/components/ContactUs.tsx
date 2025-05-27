import { useState } from "react";
import { FaEnvelopeOpenText, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="text-gray-800 bg-gradient-to-r from-purple-500 via-blue-400 to-blue-600 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold mb-6 text-white text-center drop-shadow-[1px_1px_0px_black] ">📩 Contact Us</h1>
        <p className="mb-6 text-white text-lg text-center drop-shadow-[1px_1px_0px_black]">
          We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>

        {submitted && (
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg mb-6 flex items-center">
            <FaCheckCircle className="mr-2" /> Thank you for contacting us. We will get back to you soon!
          </div>
        )}

        {/* Contact Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <h2 className="text-xl font-semibold mt-10 mb-4 text-center text-white bg-gradient-to-r from-yellow-400 to-red-500 py-2 rounded-md shadow-md">
          📞 Get in Touch with Us!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
          {/* Email Card */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <FaEnvelopeOpenText className="text-3xl mb-2" />
            <p className="font-medium text-lg">Email Us</p>
            <a href="mailto:support@foodyapp.com" className="hover:underline">support@foodyapp.com</a>
          </div>

          {/* Phone Card */}
          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <FaPhoneAlt className="text-3xl mb-2" />
            <p className="font-medium text-lg">Call Us</p>
            <p>9793868492</p>
          </div>

          {/* Address Card */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <FaMapMarkerAlt className="text-3xl mb-2" />
            <p className="font-medium text-lg">Visit Us</p>
            <p>Gorakhpur,UP, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
 <footer className="bg-gray-300 text-black p-4 md:flex md:justify-between md:items-center md:px-10">


      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Footer Links */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-lg font-medium">
          <a href="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          <a href="/contact-us" className="hover:text-blue-600 transition-colors">Contact Us</a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 mt-6 mb-6"></div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6">
          <a href="#" aria-label="Facebook" className="text-xl hover:text-blue-600 transition">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Twitter" className="text-xl hover:text-blue-600 transition">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Instagram" className="text-xl hover:text-blue-600 transition">
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm mt-6">&copy; 2025 <span className="font-semibold">FOODY APP</span>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
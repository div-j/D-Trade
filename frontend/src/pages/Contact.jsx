import React from 'react';
import { FaEnvelope, FaPhone, FaFacebook, FaMapMarkerAlt } from 'react-icons/fa';
import HelmetWrapper from '../seo/HelmetWrapper';
import Card from '../components/Card';
// import { FaEnvelope, FaPhone, FaFacebook, FaMapMarkerAlt } from 'react-icons/fa';
function Contact() {
  
  return (
    <div className="max-w-screen-lg mx-auto mt-16 mb-16">
      <HelmetWrapper
        title="Contact Us"
        description="Learn more Contact d-trade, your trusted marketplace for electronics and electrical products."
        keywords="Contact us, d-trade, electronics, electrical products, gadgets"
      />
        <Card
        url="/contact2.webp"  // Replace with your actual image path
        alt="Contact Us"
        title="Contact Us"
        description="Learn more Contact d-trade, your trusted marketplace for electronics and electrical products."
      >
         <div className="flex items-center">
              <FaEnvelope className="mr-2 text-xl" />
              <span>contact@d-trade.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2 text-xl" />
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center">
              <FaFacebook className="mr-2 text-xl" />
              <span>facebook.com/d-trade</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-xl" />
              <span>123 Main Street, City, Country</span>
            </div>
     
      </Card>
    </div>
  );
}

export default Contact;

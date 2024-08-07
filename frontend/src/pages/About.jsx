import React from 'react';
import { FaEnvelope, FaPhone, FaFacebook, FaMapMarkerAlt } from 'react-icons/fa';
import HelmetWrapper from '../seo/HelmetWrapper';
import Card from '../components/Card';
// import { FaEnvelope, FaPhone, FaFacebook, FaMapMarkerAlt } from 'react-icons/fa';
function About() {
  
  return (
    <div className="max-w-screen-lg mx-auto mt-16 mb-16">
      <HelmetWrapper
        title="About Us"
        description="Learn more about d-trade, your trusted marketplace for electronics and electrical products."
        keywords="about us, d-trade, electronics, electrical products, gadgets"
      />
        <Card
        url="/aboutus.webp"  // Replace with your actual image path
        alt="About Us"
        title="About d-trade"
        description="d-trade is your go-to marketplace for all things electronics and electrical products. We offer a wide range of high-quality gadgets and tools to meet your needs. Our mission is to provide exceptional value and service to our customers."
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

export default About;

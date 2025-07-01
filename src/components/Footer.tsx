
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-4 text-center">
      <p>Edo State University Iyamho &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;


import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 p-8 mt-[40px]">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Edo State University Iyamho ICT</h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              For any inquiries, support requests, or feedback, please reach out to the Edo State University Iyamho ICT Support Department.
            </p>
            <div className="space-y-4 text-lg text-gray-700">
              <div>
                <h3 className="font-semibold">Contact Information</h3>
                <p><strong>Email:</strong> registrar@edouniversity.edu.ng</p>
                <p><strong>ICT Support:</strong> ict@edouniversity.edu.ng</p>
                <p><strong>Phone:</strong> +234-123-456-7890</p>
                <p><strong>Emergency Line:</strong> +234-987-654-3210</p>
              </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>Km7, Auchi-Abuja Road,<br />Iyamho-Uzairue Edo State, Nigeria</p>
              </div>
              <div>
                <h3 className="font-semibold">Office Hours</h3>
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Quick Contact Form</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;

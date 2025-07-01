
import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 p-8 mt-[40px]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">About Edo State University Iyamho ICT</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Edo State University Iyamho ICT Support Portal is dedicated to providing seamless technical support and incident management for the university community. Our mission is to ensure efficient resolution of ICT issues and to empower users with the tools and resources they need.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are committed to continuous improvement and innovation to meet the evolving needs of our students, staff, and faculty.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To be the leading university in Nigeria for technological innovation and digital excellence, providing world-class ICT infrastructure and support services.
              </p>
              <h3 className="text-xl font-semibold mb-2">Core Values</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Excellence in service delivery</li>
                <li>Innovation and continuous improvement</li>
                <li>User-centered approach</li>
                <li>Transparency and accountability</li>
                <li>Collaborative problem-solving</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-6">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🖥️</span>
                </div>
                <h3 className="font-semibold mb-2">Technical Support</h3>
                <p className="text-gray-600">24/7 technical assistance for all ICT-related issues</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="font-semibold mb-2">System Maintenance</h3>
                <p className="text-gray-600">Regular maintenance and updates of university systems</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-semibold mb-2">Training & Resources</h3>
                <p className="text-gray-600">ICT training programs and educational resources</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gray-300 w-24 h-24 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold">Dr. John Adebayo</h3>
                <p className="text-gray-600">Director, ICT Services</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-300 w-24 h-24 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold">Eng. Sarah Okonkwo</h3>
                <p className="text-gray-600">Chief Technical Officer</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-300 w-24 h-24 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold">Mr. David Osagie</h3>
                <p className="text-gray-600">Support Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

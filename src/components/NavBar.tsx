import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Determine if current path is login or register
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1]?.[0] || parts[0][1] || "")).toUpperCase();
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-xl font-bold text-primary">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="ESUI Logo" className="h-8 w-8 object-contain" />
            <span className="ml-2">Edo State University ICT</span>
          </Link>
        </div>

        {/* User Avatar */}
        {user && (
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              {user.profile_photo ? (
                <img
                  src={`/${user.profile_photo}`}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <AvatarFallback className="text-base">
                  {getInitials(user.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="font-medium">{user.name}</span>
          </div>
        )}

        {/* Desktop Menu */}
        <ul className="hidden sm:flex space-x-6 text-gray-700 items-center">
          <li>
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-primary">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-primary">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-primary">
              E-library
            </Link>
          </li>
          <li>
            <Link to="/faq" className="hover:text-primary">
              FAQ
            </Link>
          </li>
          <li>
            {isLoginPage ? (
              <Link
                to="/register"
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            ) : isRegisterPage ? (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </li>
        </ul>

        {/* Burger Button */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-full bg-gray-700 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-0.5 w-full bg-gray-700 transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}></span>
          <span className={`block h-0.5 w-full bg-gray-700 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-md flex flex-col justify-center items-center p-6 z-40"
          onClick={() => setMenuOpen(false)}
        >
          <button
            className="text-gray-700 text-3xl font-bold mb-6 focus:outline-none absolute top-6 right-6"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <ul
            className="w-full flex flex-col space-y-6 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-primary text-lg"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary text-lg"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-primary text-lg"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-primary text-lg"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="text-gray-700 hover:text-primary text-lg"
                onClick={() => setMenuOpen(false)}
              >
                FAQ
              </Link>
            </li>
            <li>
              {isLoginPage ? (
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-primary text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              ) : isRegisterPage ? (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

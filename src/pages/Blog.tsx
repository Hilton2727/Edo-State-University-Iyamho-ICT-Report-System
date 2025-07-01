import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { fetchBlogPosts } from "../services/api.service";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBlogPosts();
        setBlogPosts(data);
      } catch (error: any) {
        setError(error.message || "Unknown error");
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 p-8 mt-[40px]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Edo State University Iyamho ICT Blog</h1>
          <p className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed text-center mb-8">
            Welcome to the Edo State University Iyamho ICT blog. Here you will find the latest news, updates, and articles related to ICT support, technology trends, and university announcements.
          </p>
          {loading ? (
            <div className="text-center text-gray-500">Loading blog posts...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3 hover:text-blue-600 cursor-pointer">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">Read More →</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Recent Updates</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">• New incident reporting system deployed</li>
                  <li className="text-sm text-gray-600">• Campus WiFi speed increased by 50%</li>
                  <li className="text-sm text-gray-600">• Student portal mobile app launched</li>
                  <li className="text-sm text-gray-600">• 24/7 help desk service now available</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <a href="/submit-incident" className="block text-blue-600 hover:text-blue-800">Submit Incident Report</a>
                  <a href="/knowledge-base" className="block text-blue-600 hover:text-blue-800">Knowledge Base</a>
                  <a href="/contact" className="block text-blue-600 hover:text-blue-800">Contact Support</a>
                  <a href="/faq" className="block text-blue-600 hover:text-blue-800">FAQ</a>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Updates</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Events</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Maintenance</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Security</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Education</span>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;

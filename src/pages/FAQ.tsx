import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ChevronDown, ChevronRight } from "lucide-react";
import { fetchFaqs } from "../services/api.service";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [faqData, setFaqData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await fetchFaqs();
        setFaqData(data);
      } catch (error: any) {
        setError(error.message || "Unknown error");
        setFaqData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  // Group FAQs by category before rendering
  const groupedFaqs = faqData.reduce((acc: any, faq: any) => {
    const cat = faq.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});
  const groupedFaqArray = Object.entries(groupedFaqs).map(([category, items]) => ({
    category,
    items: items as any[],
  }));

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 p-8 mt-[40px]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-700 text-center mb-8">
            Find quick answers to common questions about ESUI ICT services and support.
          </p>

          <div className="space-y-6">
            {groupedFaqArray.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-md">
                <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                  <h2 className="text-xl font-semibold">{category.category}</h2>
                </div>
                <div className="p-4">
                  {category.items.map((item: any, itemIndex: number) => {
                    const globalIndex = categoryIndex * 100 + itemIndex;
                    const isOpen = openItems.includes(globalIndex);
                    
                    return (
                      <div key={itemIndex} className="border-b border-gray-200 last:border-b-0">
                        <button
                          className="w-full text-left py-4 flex items-center justify-between hover:bg-gray-50"
                          onClick={() => toggleItem(globalIndex)}
                        >
                          <span className="font-medium text-gray-800">{item.question}</span>
                          {isOpen ? (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="pb-4 text-gray-600 leading-relaxed">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Still need help?</h3>
            <p className="text-blue-700 mb-4">
              If you can't find the answer you're looking for, don't hesitate to contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/submit-incident"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors text-center"
              >
                Submit Support Request
              </a>
              <a
                href="/contact"
                className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition-colors text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;

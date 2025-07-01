
import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingChatButtonProps {
  showPopup?: boolean;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ showPopup = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [isResponding, setIsResponding] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [showSatisfaction, setShowSatisfaction] = useState(false);

  const commonIssues = [
    "Can't access student portal",
    "WiFi connection problems",
    "Having issues paying school fees",
    "School email Password reset needed?",
    "Printing problems",
    "Other technical issue"
  ];

  const responses = [
    "I've checked your account and reset your portal access. Please try logging in again with your student ID and password.",
    "The WiFi issue has been identified. Please restart your device and reconnect to ESUI-WiFi using your university credentials.",
    "I've sent email setup instructions to your university email. Please check your inbox for the configuration guide.",
    "Your password has been reset. Please check your email for the new temporary password and follow the instructions to set a new one.",
    "I've prepared a software installation guide for you. The software center link has been sent to your email with download instructions.",
    "The printer issue has been resolved. Please try printing again. If problems persist, please visit the ICT office in person.",
    "Thank you for contacting support. I've created a ticket for your issue and our technical team will contact you within 24 hours."
  ];

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 5000);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleIssueSelect = (issue: string, index: number) => {
    setSelectedIssue(issue);
    setIsResponding(true);
    
    setTimeout(() => {
      setResponse(responses[index]);
      setIsResponding(false);
      setShowSatisfaction(true);
    }, 3000);
  };

  const handleSatisfactionResponse = (satisfied: boolean) => {
    if (!satisfied) {
      // Redirect to submit incident page
      window.location.href = '/submit-incident';
    } else {
      // Close chat and reset
      setIsOpen(false);
      setSelectedIssue(null);
      setResponse(null);
      setShowSatisfaction(false);
    }
  };

  const resetChat = () => {
    setSelectedIssue(null);
    setResponse(null);
    setShowSatisfaction(false);
    setIsResponding(false);
  };

  return (
    <>
      {/* Welcome popup */}
      {showWelcome && showPopup && !isOpen && (
        <div className="fixed bottom-24 right-8 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-40 animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">👋 Hi there!</p>
              <p className="text-sm text-gray-600 mt-1">How can I help you today?</p>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Chat popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 bg-white border border-gray-200 rounded-lg shadow-xl w-80 h-96 z-40 flex flex-col">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Edo State University ICT ChatBOt </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {!selectedIssue && !response && (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Hi! I'm Zigi an AI assistant. How can I help you today?
                </p>
                <div className="space-y-2">
                  {commonIssues.map((issue, index) => (
                    <button
                      key={index}
                      onClick={() => handleIssueSelect(issue, index)}
                      className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border transition-colors"
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedIssue && !response && (
              <div>
                <div className="bg-blue-50 p-3 rounded mb-4">
                  <p className="text-sm">{selectedIssue}</p>
                </div>
                {isResponding && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="animate-pulse">●</div>
                    <span>Assistant is typing...</span>
                  </div>
                )}
              </div>
            )}

            {response && (
              <div>
                <div className="bg-blue-50 p-3 rounded mb-4">
                  <p className="text-sm">{selectedIssue}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded mb-4">
                  <p className="text-sm">{response}</p>
                </div>
                {showSatisfaction && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Was this helpful?</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleSatisfactionResponse(true)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Yes, thanks!
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSatisfactionResponse(false)}
                      >
                        No, need more help
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {(selectedIssue || response) && (
            <div className="p-4 border-t">
              <Button
                onClick={resetChat}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Start New Conversation
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50 hover:scale-105"
        aria-label="Open chat support"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </>
  );
};

export default FloatingChatButton;

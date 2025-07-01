import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Laptop,
  Server,
  HardDrive,
  Shield,
  Users,
  FileText,
  BarChart,
  Clock,
  ChevronRight,
} from "lucide-react";

import NavBar from "@/components/NavBar";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="min-h-screen">
      <NavBar />
      <section className="relative w-full bg-black flex justify-center overflow-hidden">
        <img
          src="/bg.png"
          alt="Background"
          className="w-full h-screen object-cover transform sm:scale-100 scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-35"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Welcome to Edo State University Iyamho ICT Report System
          </h1>
          <Button asChild size="lg" variant="secondary">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Hero section */}
      <section className="bg-primary text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4 md:text-5xl">
                Edo State University Iyamho ICT Support Portal
              </h1>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Report, track, and resolve technical issues efficiently.
                Our platform provides seamless incident management for the university community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center flex-col items-center">
              <img 
                src="/" 
                alt="Incident Reporting Illustration" 
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Easy Incident Reporting</h3>
                <p className="text-gray-600">
                  Submit and track technical issues with our intuitive incident reporting system.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
                <p className="text-gray-600">
                  Receive notifications and track the status of your reported incidents in real-time.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BarChart size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Comprehensive Analytics</h3>
                <p className="text-gray-600">
                  Access detailed reports and analytics to optimize ICT resource allocation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User roles section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">For Everyone in the University</h2>
          
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-md bg-gray-200 p-1">
              <button
                onClick={() => setActiveTab("students")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "students"
                    ? "bg-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-300/50"
                }`}
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab("staff")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "staff"
                    ? "bg-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-300/50"
                }`}
              >
                Staff
              </button>
              <button
                onClick={() => setActiveTab("technicians")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "technicians"
                    ? "bg-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-300/50"
                }`}
              >
                Technicians
              </button>
              <button
                onClick={() => setActiveTab("admins")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "admins"
                    ? "bg-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-300/50"
                }`}
              >
                Admins
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === "students" && (
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-bold mb-4">For Students</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Report internet connectivity issues, software problems, and hardware malfunctions</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Track the status of your support tickets in real-time</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Access the knowledge base for self-help solutions to common problems</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Receive notifications when your issues are being addressed</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-2 flex justify-center">
                  <Laptop className="h-32 w-32 text-primary" />
                </div>
              </div>
            )}
            
            {activeTab === "staff" && (
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-bold mb-4">For Staff</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Report classroom technology issues, office equipment problems, and software needs</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Prioritize urgent issues that affect teaching and administrative functions</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Track resolution progress and communicate with technicians</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Access department-specific technology guides and resources</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-2 flex justify-center">
                  <Users className="h-32 w-32 text-primary" />
                </div>
              </div>
            )}
            
            {activeTab === "technicians" && (
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-bold mb-4">For Technicians</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Manage assigned tickets and update status as you work</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Communicate directly with users through the ticket system</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Document solutions for the knowledge base to prevent recurring issues</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Track your performance and resolution statistics</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-2 flex justify-center">
                  <HardDrive className="h-32 w-32 text-primary" />
                </div>
              </div>
            )}
            
            {activeTab === "admins" && (
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-bold mb-4">For Administrators</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Access comprehensive dashboards with analytics on all ICT issues</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Monitor technician performance and workloads</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Generate reports for resource planning and decision making</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="ml-2">Manage user accounts, permissions, and system settings</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-2 flex justify-center">
                  <Server className="h-32 w-32 text-primary" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join Edo State University Iyamho ICT Support Portal today and experience
            streamlined technical support for all your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/register">Create an Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Edo State University Iyamho </h3>
              <p className="mb-4">ICT Support Department</p>
              <p className="text-sm">© {new Date().getFullYear()} Edo State University Iyamho. All rights reserved.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">University Homepage</a></li>
                <li><a href="#" className="hover:text-white">Student Portal</a></li>
                <li><a href="#" className="hover:text-white">Staff Portal</a></li>
                <li><a href="#" className="hover:text-white">Contact ICT</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <address className="not-italic">
                <p>Km7, Auchi-Abuja Road</p>
                <p>Iyamho-Uzairue Edo State, Nigeria</p>
                <p className="mt-2">registrar@edouniversity.edu.ng</p>
                <p>Phone: +234-123-456-7890</p>
              </address>
            </div>
          </div>
        </div>
      </footer>

      {/* Add FloatingChatButton with welcome popup */}
      <FloatingChatButton showPopup={true} />
    </div>
  );
};

export default Index;

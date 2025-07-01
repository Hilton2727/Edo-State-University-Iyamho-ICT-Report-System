import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  BookOpen,
  ChevronDown,
  UsersIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import FloatingChatButton from "@/components/FloatingChatButton";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1]?.[0] || parts[0][1] || "")).toUpperCase();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      role: ["Student", "Staff", "Technician", "Admin"],
    },
    {
      label: "Submit Incident",
      icon: FileText,
      href: "/submit-incident",
      role: ["Student", "Staff"],
    },
    {
      label: "Technician Dashboard",
      icon: ClipboardList,
      href: "/technician",
      role: ["Technician"],
    },
    {
      label: "Admin Dashboard",
      icon: Settings,
      href: "/admin",
      role: ["Admin"],
    },
    {
      label: "Knowledge Base",
      icon: BookOpen,
      href: "/knowledge-base",
      role: ["Student", "Staff", "Technician", "Admin"],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.role.map(r => r.toLowerCase()).includes((user?.role || '').toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white shadow-md transition-transform duration-300 ease-in-out md:relative",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/" className="flex items-center">
            {isSidebarOpen ? (
              <div className="flex items-center">
                <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                <h1 className="text-xl font-bold text-primary">Edo State University ICT</h1>
              </div>
            ) : (
              <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
            {/* Admin-only sections */}
            {user?.role === 'Admin' && (
              <>
                <Link
                  to="/admin/reporter"
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    location.pathname === "/admin/reporter"
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <User className="mr-3 h-5 w-5" />
                  {isSidebarOpen && <span>Reporter</span>}
                </Link>
                <Link
                  to="/admin/team-member"
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    location.pathname === "/admin/team-member"
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <UsersIcon className="mr-3 h-5 w-5" />
                  {isSidebarOpen && <span>Team Member</span>}
                </Link>
                <Link
                  to="/admin/ticket"
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    location.pathname === "/admin/ticket"
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <ClipboardList className="mr-3 h-5 w-5" />
                  {isSidebarOpen && <span>Ticket</span>}
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="border-t p-4">
          {isSidebarOpen ? (
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                {user?.profile_photo ? (
                  <img src={`/${user.profile_photo}`} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <AvatarFallback>{user ? getInitials(user.name) : ""}</AvatarFallback>
                )}
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
          ) : (
            <Avatar className="h-8 w-8 mx-auto">
              {user?.profile_photo ? (
                <img src={`/${user.profile_photo}`} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <AvatarFallback>{user ? getInitials(user.name) : ""}</AvatarFallback>
              )}
            </Avatar>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    3
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="border-b p-3">
                  <h4 className="font-medium">Notifications</h4>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="border-b p-4 hover:bg-gray-50">
                    <p className="text-sm font-medium">Ticket #1234 updated</p>
                    <p className="text-xs text-gray-500">Status changed to In Progress</p>
                    <p className="mt-1 text-xs text-gray-400">2 minutes ago</p>
                  </div>
                  <div className="border-b p-4 hover:bg-gray-50">
                    <p className="text-sm font-medium">New comment on Ticket #5678</p>
                    <p className="text-xs text-gray-500">Tech Support: "We're working on this issue..."</p>
                    <p className="mt-1 text-xs text-gray-400">1 hour ago</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50">
                    <p className="text-sm font-medium">Your ticket has been resolved</p>
                    <p className="text-xs text-gray-500">Ticket #9012 has been marked as resolved</p>
                    <p className="mt-1 text-xs text-gray-400">Yesterday at 3:45 PM</p>
                  </div>
                </div>
                <div className="border-t p-2">
                  <Button variant="ghost" size="sm" className="w-full justify-center">
                    View all notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    {user?.profile_photo ? (
                      <img src={`/${user.profile_photo}`} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
                    ) : (
                      <AvatarFallback>{user ? getInitials(user.name) : ""}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="hidden md:inline">{user?.name}</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Add FloatingChatButton to all pages */}
      <FloatingChatButton showPopup={false} />
    </div>
  );
};

export default MainLayout;

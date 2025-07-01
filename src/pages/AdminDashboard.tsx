import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dashboardService, ticketService } from "@/services/data.service";
import { Ticket, User } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Users as UsersIcon,
  Calendar,
  Layers,
  Settings,
  Download,
  Eye,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { fetchAdminTicketStats, fetchTechs, fetchAdmins, fetchStaff, fetchStudents, fetchAllTickets } from '@/services/api.service';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#8DD1E1"];

interface StatsData {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
  byLocation: Record<string, number>;
}

interface TechPerformance {
  technician: User;
  assigned: number;
  resolved: number;
  averageResolutionTime: number;
}

const AdminDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [datePeriod, setDatePeriod] = useState("30");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTechs, setTotalTechs] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [allTickets, setAllTickets] = useState<any[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ticketStats, techsRes, adminsRes, staffRes, studentsRes, ticketsRes] = await Promise.all([
          fetchAdminTicketStats(),
          fetchTechs(),
          fetchAdmins(),
          fetchStaff(),
          fetchStudents(),
          fetchAllTickets()
        ]);
        setStats(ticketStats);
        const techs = (techsRes as any).techs || [];
        const admins = (adminsRes as any).admins || [];
        const staff = (staffRes as any).staff || [];
        const students = (studentsRes as any).students || [];
        setTotalTechs(techs.length);
        setTotalUsers(admins.length + techs.length + staff.length + students.length);
        setUsers([
          ...admins.map(u => ({ ...u, role: "Admin" })),
          ...techs.map(u => ({ ...u, role: "Technician" })),
          ...staff.map(u => ({ ...u, role: "Staff" })),
          ...students.map(u => ({ ...u, role: "Student" })),
        ]);
        setAllTickets((ticketsRes as any).tickets || []);
      } catch (e) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const ticketsByStatus = allTickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const statusData = Object.entries(ticketsByStatus).map(([name, value]) => ({ name, value }));
  
  const ticketsByPriority = allTickets.reduce((acc, t) => {
    acc[t.priority] = (acc[t.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const priorityData = Object.entries(ticketsByPriority).map(([name, value]) => ({ name, value }));
  
  const ticketsByCategory = allTickets.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const categoryData = Object.entries(ticketsByCategory).map(([name, value]) => ({ name, value }));
  
  const getWeek = (dateStr: string) => {
    const d = new Date(dateStr);
    const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
    const pastDaysOfYear = (d.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  const now = new Date();
  const currentYear = now.getFullYear();
  const last8Weeks = Array.from({ length: 8 }, (_, i) => {
    const week = getWeek(now.toISOString()) - (7 - i);
    return `Week ${week}`;
  });
  const ticketsByWeek = allTickets.reduce((acc, t) => {
    const d = new Date(t.createdAt);
    if (d.getFullYear() === currentYear) {
      const week = getWeek(t.createdAt);
      acc[week] = (acc[week] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);
  const ticketTrendData = last8Weeks.map((label, i) => {
    const weekNum = getWeek(now.toISOString()) - (7 - i);
    return { date: label, tickets: ticketsByWeek[weekNum] || 0 };
  });
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const techPerformance = users.filter(u => u.role === 'Technician').map(tech => {
    const assigned = allTickets.filter(t => t.assignedTo && t.assignedTo.name === tech.name && new Date(t.createdAt) >= thirtyDaysAgo).length;
    const resolved = allTickets.filter(t => t.assignedTo && t.assignedTo.name === tech.name && t.status === 'resolved' && new Date(t.createdAt) >= thirtyDaysAgo).length;
    return {
      technician: tech,
      assigned,
      resolved,
      averageResolutionTime: 0
    };
  });
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-gray-500">
            Comprehensive overview of ICT support metrics
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Export Reports
        </Button>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-4">
        <Card
          className="cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate('/admin/ticket')}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Tickets</p>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <h3 className="text-2xl font-bold">{stats?.total || 0}</h3>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Layers />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate('/admin/ticket')}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Tickets</p>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <h3 className="text-2xl font-bold">
                    {stats?.open || 0}
                  </h3>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Calendar />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate('/admin/reporter')}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <h3 className="text-2xl font-bold">{totalUsers}</h3>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <UsersIcon />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate('/admin/team-member')}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Technicians</p>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <h3 className="text-2xl font-bold">{totalTechs}</h3>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Settings />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex justify-end">
        <Select
          value={datePeriod}
          onValueChange={setDatePeriod}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Tickets by Status</CardTitle>
              <PieChartIcon className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-[250px]">
                <Skeleton className="h-[250px] w-[250px] rounded-full" />
              </div>
            ) : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {statusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Ticket Trend</CardTitle>
              <LineChartIcon className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={ticketTrendData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="tickets"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Tickets by Category</CardTitle>
              <BarChartIcon className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Tickets by Priority</CardTitle>
              <BarChartIcon className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={priorityData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Technician Performance</CardTitle>
            <Badge>Last 30 Days</Badge>
          </div>
          <CardDescription>
            Overview of technician workload and resolution metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-6">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div key={idx} className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full mr-4" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-8 w-16 ml-4" />
                  </div>
                ))}
            </div>
          ) : (
            <div className="space-y-6">
              {techPerformance.map((tech) => (
                <div key={tech.technician.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>
                          {getInitials(tech.technician.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{tech.technician.name}</p>
                        <p className="text-sm text-gray-500">
                          Avg. Resolution: {tech.averageResolutionTime} hours
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {tech.resolved} / {tech.assigned}
                      </p>
                      <p className="text-sm text-gray-500">
                        Resolved / Assigned
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Progress
                      value={tech.assigned > 0 ? (tech.resolved / tech.assigned) * 100 : 0}
                      className="h-2 flex-1"
                    />
                    <span className="ml-2 text-sm">
                      {tech.assigned > 0
                        ? `${((tech.resolved / tech.assigned) * 100).toFixed(0)}%`
                        : "0%"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-8" id="reporter">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
          <CardTitle>Reporter (Students)</CardTitle>
          <CardDescription>List of all student reporters</CardDescription>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/reporter">
              View More <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Matric Number</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.filter(u => u.role === 'Student').slice(0, 5).map((student, idx) => (
                  <tr key={student.id}>
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.mat_no || 'N/A'}</td>
                    <td className="px-4 py-2">{student.level || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8" id="team-member">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
          <CardTitle>Team Member</CardTitle>
          <CardDescription>List of all team members (Technicians & Admins)</CardDescription>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/team-member">
              View More <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-gray-200">
            {users.filter(u => u.role === 'Technician' || u.role === 'Admin').slice(0, 5).map((member) => (
              <li key={member.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{member.name}</span>
                  <span className="ml-2 text-xs text-gray-500">({member.role})</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ticketService } from "@/services/data.service";
import { Ticket } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, Check, AlertTriangle, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { fetchTicketsByUser } from "@/services/api.service";

const Dashboard = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (user) {
          const res = await fetchTicketsByUser(user.id);
          // Map API response to expected frontend format
          const mappedTickets = (res.tickets || []).map(ticket => ({
            ...ticket,
            createdAt: ticket.created_at || ticket.createdAt || ticket.updated_at || new Date().toISOString(),
            updatedAt: ticket.updated_at || ticket.updatedAt || ticket.created_at || new Date().toISOString(),
            assignedTo: ticket.assignedTo || (ticket.assigned_to && typeof ticket.assigned_to === 'object' ? ticket.assigned_to : null),
          }));
          setTickets(mappedTickets);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return ticket.status.toLowerCase().replace(" ", "-") === activeTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "status-open";
      case "In Progress":
        return "status-in-progress";
      case "Resolved":
        return "status-resolved";
      case "Closed":
        return "status-closed";
      default:
        return "";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "priority-low";
      case "Medium":
        return "priority-medium";
      case "High":
        return "priority-high";
      case "Urgent":
        return "priority-urgent";
      default:
        return "";
    }
  };

  const getStatusCount = (status: string) => {
    return tickets.filter((ticket) => ticket.status === status).length;
  };

  const renderSkeletons = () => {
    return Array(3)
      .fill(0)
      .map((_, idx) => (
        <div key={idx} className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex justify-between items-center mt-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      ));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Dashboard</h1>
          <p className="text-gray-500">
            Track and manage your ICT support tickets
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link to="/submit-incident">
            <Plus className="mr-2 h-4 w-4" /> Report New Issue
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Tickets</p>
                <h3 className="text-2xl font-bold">{tickets.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FileText />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Open</p>
                <h3 className="text-2xl font-bold">{getStatusCount("Open")}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <AlertTriangle />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <h3 className="text-2xl font-bold">{getStatusCount("In Progress")}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Clock />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <h3 className="text-2xl font-bold">{getStatusCount("Resolved") + getStatusCount("Closed")}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Check />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>My Tickets</CardTitle>
          <CardDescription>
            View and manage all your submitted support tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search tickets..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs
              defaultValue="all"
              className="w-full sm:w-auto"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="open" className="flex-1">Open</TabsTrigger>
                <TabsTrigger value="in-progress" className="flex-1">In Progress</TabsTrigger>
                <TabsTrigger value="resolved" className="flex-1">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {loading ? (
            renderSkeletons()
          ) : filteredTickets.length > 0 ? (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-lg">{ticket.title}</h3>
                      <p className="text-sm text-gray-500 mb-1">
                        {ticket.id} • {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 sm:justify-end flex-wrap">
                      <Badge
                        className={cn(
                          "whitespace-nowrap",
                          getStatusColor(ticket.status)
                        )}
                      >
                        {ticket.status}
                      </Badge>
                      <Badge
                        className={cn(
                          "whitespace-nowrap",
                          getPriorityColor(ticket.priority)
                        )}
                      >
                        {ticket.priority} Priority
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 my-2 line-clamp-2">
                    {ticket.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm text-gray-500">
                      {ticket.assignedTo
                        ? `Assigned to: ${ticket.assignedTo.name}`
                        : "Unassigned"}
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/ticket/${ticket.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">No tickets found</h3>
              <p className="mt-1 text-gray-500">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "You haven't submitted any tickets yet"}
              </p>
              <Button asChild className="mt-4">
                <Link to="/submit-incident">Report New Issue</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

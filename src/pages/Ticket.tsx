import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAdminTicketStats, updateTicketStatus } from "@/services/api.service";
import { Ticket, TicketStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardList, Search, Clock, Check, AlertTriangle, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Ticket = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('/api/ticket/list.php');
        const data = await res.json();
        setTickets(data.tickets || []);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        toast.error("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleStatusChange = async (ticketId: string, newStatus: TicketStatus) => {
    try {
      const result = await updateTicketStatus(ticketId, newStatus);
      if (result.success) {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
          )
        );
        toast.success(`Ticket status updated to ${newStatus}`);
      } else {
        toast.error(result.error || "Failed to update ticket status");
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast.error("Failed to update ticket status");
    }
  };

  const handleAssignToMe = async (ticketId: string) => {
    // For admin, you may want to assign to a specific staff/tech, but for now, just assign to 'Admin'
    try {
      const result = await updateTicketStatus(ticketId, "In Progress");
      if (result.success) {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status: "In Progress", assignedTo: { id: '1', name: 'Admin User', role: 'Admin', email: 'admin@edouniversity.edu.ng' } } : ticket
          )
        );
        toast.success("Ticket assigned to you");
      } else {
        toast.error(result.error || "Failed to assign ticket");
      }
    } catch (error) {
      console.error("Error assigning ticket:", error);
      toast.error("Failed to assign ticket");
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    // Status filter
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    // Category filter
    const matchesCategory =
      categoryFilter === "all" || ticket.category === categoryFilter;
    // Priority filter
    const matchesPriority =
      priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const getStatusCount = (status: string) => {
    return tickets.filter((ticket) => ticket.status === status).length;
  };

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

  const renderSkeletons = () => {
    return Array(5)
      .fill(0)
      .map((_, idx) => (
        <div key={idx} className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between mb-3">
            <Skeleton className="h-6 w-48" />
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <div className="flex justify-between items-center mt-4">
            <Skeleton className="h-4 w-32" />
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Admin Ticket Management</h1>
          <p className="text-gray-500">
            View, assign, and update the status of all support tickets
          </p>
        </div>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">All Tickets</p>
                <h3 className="text-2xl font-bold">{tickets.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ClipboardList />
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
                <h3 className="text-2xl font-bold">{getStatusCount("Resolved")}</h3>
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
          <CardTitle>Manage Tickets</CardTitle>
          <CardDescription>
            View, assign, and update the status of support tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search tickets..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Network">Network</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                  <SelectItem value="System Access">System Access</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={priorityFilter}
                onValueChange={setPriorityFilter}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                  <div className="flex flex-col sm:flex-row justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{ticket.title}</h3>
                      <p className="text-sm text-gray-500">
                        {ticket.id} • {new Date(ticket.createdAt).toLocaleDateString()} • {ticket.category} • {ticket.location}
                      </p>
                    </div>
                    <div className="flex gap-2 sm:justify-end flex-wrap">
                      <Badge className={cn(getStatusColor(ticket.status))}>
                        {ticket.status}
                      </Badge>
                      <Badge className={cn(getPriorityColor(ticket.priority))}>
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {ticket.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
                    <div className="text-sm text-gray-500">
                      Reported by: {ticket.createdBy.name} ({ticket.createdBy.role})
                      {ticket.assignedTo && (
                        <span> • Assigned to: {ticket.assignedTo.name}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {!ticket.assignedTo && (
                        <Button 
                          size="sm" 
                          onClick={() => handleAssignToMe(ticket.id)}
                        >
                          Assign to Me
                        </Button>
                      )}
                      {(ticket.status === "Open" || ticket.status === "In Progress") && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(ticket.id, "Resolved")}
                        >
                          <Check className="mr-1 h-4 w-4" /> Mark Resolved
                        </Button>
                      )}
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/ticket/${ticket.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-md">
              <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">No tickets found</h3>
              <p className="mt-2 text-gray-500">
                {searchQuery || statusFilter !== "all" || categoryFilter !== "all" || priorityFilter !== "all"
                  ? "Try adjusting your filters"
                  : "There are no tickets to display"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Ticket; 
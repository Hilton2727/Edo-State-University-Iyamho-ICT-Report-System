import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ticketService } from "@/services/data.service";
import { Ticket, TicketStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  MapPin, 
  Tag, 
  AlertTriangle, 
  MessageSquare, 
  Paperclip, 
  ChevronLeft, 
  Send, 
  FileText,
  Printer,
  Download,
  UserMinus,
  UserPlus
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { saveTicketAsPDF, printTicket } from "@/services/pdf.service";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { fetchTicketById, addTicketComment, updateTicketStatus, fetchTechs, assignTicket, deleteTicket } from '@/services/api.service';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const ViewTicket = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [selectedTech, setSelectedTech] = useState("");
  const [techUsers, setTechUsers] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showUnassignConfirm, setShowUnassignConfirm] = useState(false);
  const [unassigning, setUnassigning] = useState(false);
  
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        if (!id) return;
        
        const fetchedTicket = await fetchTicketById(id);
        
        if (fetchedTicket) {
          setTicket(fetchedTicket);
        } else {
          navigate("/dashboard");
          toast.error("Ticket not found");
        }
      } catch (error) {
        console.error("Error fetching ticket:", error);
        toast.error("Failed to load ticket information");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTicket();
  }, [id, navigate]);
  
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim() || !ticket || !user) return;
    
    setSubmittingComment(true);
    
    try {
      const result = await addTicketComment(ticket.id, comment, user.id, user.role);
      
      if (result.success) {
        // Refresh the ticket to get updated comments
        const updatedTicket = await fetchTicketById(ticket.id);
        setTicket(updatedTicket);
        setComment("");
        toast.success("Comment added successfully");
      } else {
        toast.error(result.error || "Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };
  
  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (!ticket || ticket.status === newStatus) return;
    
    setUpdatingStatus(true);
    
    try {
      const result = await updateTicketStatus(ticket.id, newStatus);
      
      if (result.success) {
        // Refresh the ticket to get updated status
        const updatedTicket = await fetchTicketById(ticket.id);
        setTicket(updatedTicket);
        toast.success(`Ticket status updated to ${newStatus}`);
      } else {
        toast.error(result.error || "Failed to update ticket status");
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast.error("Failed to update ticket status");
    } finally {
      setUpdatingStatus(false);
    }
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
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + " KB";
    const mb = kb / 1024;
    return mb.toFixed(1) + " MB";
  };
  
  const handleDownloadPDF = () => {
    if (!ticket) return;
    try {
      saveTicketAsPDF(ticket);
      toast.success("Report saved as PDF");
    } catch (error) {
      console.error("Error saving PDF:", error);
      toast.error("Failed to save as PDF");
    }
  };
  
  const handlePrint = () => {
    if (!ticket) return;
    try {
      printTicket(ticket);
    } catch (error) {
      console.error("Error printing:", error);
      toast.error("Failed to print report");
    }
  };
  
  const canUpdateStatus = user?.role === "Admin" || user?.role === "Technician";
  
  const openAssignModal = async () => {
    setShowAssignModal(true);
    setAssigning(false);
    setSelectedTech("");
    try {
      const res: any = await fetchTechs();
      setTechUsers(res && res.techs ? res.techs : []);
    } catch {
      setTechUsers([]);
    }
  };
  
  const handleAssign = async () => {
    if (!ticket || !selectedTech) return;
    setAssigning(true);
    try {
      const result = await assignTicket(ticket.id, selectedTech);
      if (result.success) {
        const updatedTicket = await fetchTicketById(ticket.id);
        setTicket(updatedTicket);
        setShowAssignModal(false);
        toast.success('Ticket assigned successfully');
      } else {
        toast.error(result.error || 'Failed to assign ticket');
      }
    } catch (error) {
      toast.error('Failed to assign ticket');
    }
    setAssigning(false);
  };
  
  const handleDelete = async () => {
    if (!ticket) return;
    setDeleting(true);
    try {
      await deleteTicket(ticket.id);
      setShowDeleteConfirm(false);
      toast.success('Ticket deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to delete ticket');
    }
    setDeleting(false);
  };
  
  const handleUnassign = useCallback(async () => {
    if (!ticket) return;
    setUnassigning(true);
    try {
      // Unassign by setting assigned_to to null
      const result = await updateTicketStatus(ticket.id, ticket.status || "Open", null);
      if (result.success) {
        const updatedTicket = await fetchTicketById(ticket.id);
        setTicket(updatedTicket);
        setShowUnassignConfirm(false);
        toast.success("Ticket unassigned successfully");
      } else {
        toast.error(result.error || "Failed to unassign ticket");
      }
    } catch (error) {
      toast.error("Failed to unassign ticket");
    }
    setUnassigning(false);
  }, [ticket]);
  
  if (loading) {
    return (
      <div>
        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 ml-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-32 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!ticket) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
        <h2 className="mt-4 text-xl font-semibold">Ticket Not Found</h2>
        <p className="mt-2 text-gray-500">The ticket you are looking for does not exist.</p>
        <Button onClick={() => navigate("/dashboard")} className="mt-4">
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-0 -ml-4"
          onClick={() => navigate("/dashboard")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        
        <div className="flex flex-row gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
          >
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPDF}
          >
            <Download className="mr-2 h-4 w-4" /> Save as PDF
          </Button>
          {user?.role === 'Admin' && (
            <>
              <Button
                variant="destructive"
                size="sm"
                className="ml-2"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={deleting}
              >
                Delete
              </Button>
              {!ticket?.assignedTo && (
                <Button
                  variant="default"
                  size="sm"
                  className="ml-2 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={openAssignModal}
                >
                  Assign
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">{ticket.title}</h2>
                <Badge className={cn(getStatusColor(ticket.status))}>
                  {ticket.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Ticket {ticket.id}</span>
                <span>•</span>
                <span>
                  Reported on {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
              </CardDescription>
            </div>
            
            {canUpdateStatus && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <Select
                  value={ticket.status}
                  onValueChange={(value) => handleStatusChange(value as TicketStatus)}
                  disabled={updatingStatus}
                >
                  <SelectTrigger className={cn("w-[140px]", getStatusColor(ticket.status))}>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Tag className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium mr-2">Category:</span>
                  <span className="text-sm">{ticket.category}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium mr-2">Location:</span>
                  <span className="text-sm">{ticket.location}</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium mr-2">Priority:</span>
                  <Badge className={cn("text-xs", getPriorityColor(ticket.priority))}>
                    {ticket.priority}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium mr-2">Last Updated:</span>
                  <span className="text-sm">
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">People</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback>{getInitials(ticket.createdBy.name)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium mr-2">Reported by:</span>
                  <span className="text-sm">
                    {ticket.createdBy.name} ({ticket.createdBy.role})
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    {ticket.assignedTo ? (
                      <AvatarFallback>{getInitials(ticket.assignedTo.name)}</AvatarFallback>
                    ) : (
                      <AvatarFallback>?</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm font-medium mr-2">Assigned to:</span>
                  <span className="text-sm">
                    {ticket.assignedTo ? ticket.assignedTo.name : "Unassigned"}
                  </span>
                  {user?.role === 'Admin' && (
                    ticket.assignedTo ? (
                      <Button size="xs" variant="outline" className="ml-2 px-2 py-1 text-xs" onClick={()=>setShowUnassignConfirm(true)}>
                        <UserMinus className="h-4 w-4 mr-1" /> Unassign
                      </Button>
                    ) : (
                      <Button size="xs" variant="outline" className="ml-2 px-2 py-1 text-xs" onClick={openAssignModal}>
                        <UserPlus className="h-4 w-4 mr-1" /> Assign
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Description</h3>
            <div className="border rounded-md p-4 bg-gray-50">
              <p className="whitespace-pre-line">{ticket.description}</p>
            </div>
          </div>
          
          {ticket.attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Attachments ({ticket.attachments.length})
              </h3>
              <div className="border rounded-md p-4 bg-gray-50">
                <ul className="space-y-2">
                  {ticket.attachments.map((attachment) => (
                    <li key={attachment.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Paperclip className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">{attachment.name}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({formatFileSize(attachment.size)})
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Comments ({ticket.comments.length})
            </h3>
            
            {ticket.comments.length > 0 ? (
              <div className="space-y-4">
                {ticket.comments.map((comment) => (
                  <div key={comment.id} className="border rounded-md p-4">
                    <div className="flex items-start mb-2">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.user.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {comment.user.role}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm ml-11 whitespace-pre-line">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-md">
                <MessageSquare className="mx-auto h-8 w-8 text-gray-300" />
                <p className="mt-2 text-sm text-gray-500">No comments yet</p>
              </div>
            )}
            
            <Separator className="my-6" />
            
            <form onSubmit={handleAddComment}>
              <h3 className="text-sm font-medium mb-2">Add Comment</h3>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment or update..."
                className="min-h-[100px] mb-3"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!comment.trim() || submittingComment}
                >
                  {submittingComment ? (
                    "Posting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Post Comment
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      
      {/* Assign Modal */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Ticket to Technician</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <select
              className="w-full border rounded p-2"
              value={selectedTech}
              onChange={e => setSelectedTech(e.target.value)}
              disabled={assigning}
            >
              <option value="">Select Technician</option>
              {techUsers.map(tech => (
                <option key={tech.id} value={tech.id}>{tech.name} ({tech.email})</option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignModal(false)} disabled={assigning}>Cancel</Button>
            <Button onClick={handleAssign} disabled={!selectedTech || assigning}>{assigning ? 'Assigning...' : 'Assign'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Ticket</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={deleting}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>{deleting ? 'Deleting...' : 'Delete'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unassign Confirmation Dialog */}
      <Dialog open={showUnassignConfirm} onOpenChange={setShowUnassignConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unassign Ticket</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to unassign this ticket? The current technician will no longer have access to this ticket.</p>
          <DialogFooter>
            <Button variant="outline" onClick={()=>setShowUnassignConfirm(false)} disabled={unassigning}>Cancel</Button>
            <Button variant="destructive" onClick={handleUnassign} disabled={unassigning}>{unassigning ? 'Unassigning...' : 'Confirm'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewTicket;

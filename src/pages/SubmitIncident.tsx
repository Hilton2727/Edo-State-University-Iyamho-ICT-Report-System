import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ticketService } from "@/services/data.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileUp, Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IncidentCategory, TicketPriority } from "@/types";
import { toast } from "sonner";
import { createTicket } from "@/services/api.service";

const SubmitIncident = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<IncidentCategory>("Network");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("Medium");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...fileList]);
    }
  };
  
  const removeFile = (fileIndex: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!title.trim()) {
      setError("Please enter a title for the incident");
      return;
    }
    
    if (!description.trim()) {
      setError("Please provide a description of the issue");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await createTicket({
        title,
        category,
        location,
        priority,
        description,
        createdBy: { id: user!.id, role: user!.role },
        files,
      });
      if (result.success) {
        toast.success("Incident report submitted successfully!");
        navigate(`/ticket/${result.ticket.id}`);
      } else {
        setError(result.error || "Failed to submit incident. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting incident:", err);
      setError("Failed to submit incident. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Report a New Incident</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>New Incident Report</CardTitle>
          <CardDescription>
            Please provide details about the technical issue you're experiencing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} id="incident-form">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Incident Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief title describing the issue"
                  required
                />
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={category}
                    onValueChange={(value) => setCategory(value as IncidentCategory)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Network">Network</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                      <SelectItem value="System Access">System Access</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Building, room, or online service"
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value as TicketPriority)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low - Minor issue, no urgency</SelectItem>
                    <SelectItem value="Medium">Medium - Standard priority</SelectItem>
                    <SelectItem value="High">High - Significant impact on work</SelectItem>
                    <SelectItem value="Urgent">Urgent - Critical issue needs immediate attention</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Please select the appropriate priority level based on the impact of the issue.
                </p>
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide detailed information about the issue. Include what you were doing when it occurred, any error messages, and steps to reproduce the problem."
                  rows={5}
                  required
                />
              </div>
              
              <div className="grid gap-3">
                <Label>Attachments (Optional)</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <FileUp className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Drag and drop files here, or click to select files
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Supported formats: PNG, JPG, PDF, DOC (Max size: 10MB)
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    Select Files
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                  />
                </div>
                
                {files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Selected Files:</h4>
                    <ul className="space-y-2">
                      {files.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded-md text-sm"
                        >
                          <div className="flex items-center space-x-2">
                            <FileUp className="h-4 w-4 text-gray-400" />
                            <span className="truncate max-w-[200px]">{file.name}</span>
                            <span className="text-gray-400">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => removeFile(index)}
                          >
                            &times;
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="incident-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Submit Report
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubmitIncident;

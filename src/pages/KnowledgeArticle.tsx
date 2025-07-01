import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../contexts/AuthContext";
import { AlertTriangle, ChevronLeft, Printer, User, Calendar, ThumbsUp, FileText } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchKnowledgeArticles } from "../services/api.service";

// We need to add these dependencies for markdown rendering
// <lov-add-dependency>react-markdown@latest</lov-add-dependency>
// <lov-add-dependency>remark-gfm@latest</lov-add-dependency>

const KnowledgeArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [article, setArticle] = useState<any>(null);
  const [relatedTickets, setRelatedTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await fetchKnowledgeArticles();
        const found = data.find((a: any) => a.id === id);
        setArticle(found || null);
          
          // Fetch related tickets if available
        if (found && found.relatedTickets && found.relatedTickets.length > 0) {
            const tickets = await Promise.all(
            found.relatedTickets.map((ticketId) =>
                ticketService.getTicketById(ticketId)
              )
            );
            
            setRelatedTickets(tickets.filter(Boolean) as Ticket[]);
          }
      } catch (error: any) {
        setError(error.message || "Unknown error");
        setArticle(null);
        toast.error("Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [id]);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const handlePrintArticle = () => {
    window.print();
  };
  
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
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
        <h2 className="mt-4 text-xl font-semibold">Article Not Found</h2>
        <p className="mt-2 text-gray-500">The article you are looking for does not exist.</p>
        <Button onClick={() => navigate("/knowledge-base")} className="mt-4">
          Return to Knowledge Base
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          className="-ml-4 no-print"
          onClick={() => navigate("/knowledge-base")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Knowledge Base
        </Button>
        
        <div className="flex gap-2 no-print">
          <Button variant="outline" size="sm" onClick={handlePrintArticle}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          {(user?.role === "Admin" || user?.role === "Technician") && (
            <Button variant="outline" size="sm">
              Edit Article
            </Button>
          )}
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge>{article.category}</Badge>
            <div className="flex gap-1">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <CardTitle className="text-2xl">{article.title}</CardTitle>
          <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>
                {article.author?.name || 'Unknown'}{article.author?.role ? ` (${article.author.role})` : ''}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                Updated {isNaN(Date.parse(article.updatedAt)) ? 'N/A' : new Date(article.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
          
          <div className="flex justify-between items-center mt-8 pt-8 border-t no-print">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" /> Helpful
              </Button>
              <span className="text-sm text-gray-500">Was this article helpful?</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Share:</span>
              <Button variant="ghost" size="sm">
                Email
              </Button>
              <Button variant="ghost" size="sm">
                Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {relatedTickets.length > 0 && (
        <Card className="no-print">
          <CardHeader>
            <CardTitle className="text-lg">Related Incidents</CardTitle>
            <CardDescription>
              Tickets that are related to this knowledge base article
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relatedTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{ticket.title}</h3>
                    <Badge variant="outline">{ticket.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    <FileText className="inline h-4 w-4 mr-1" />
                    {ticket.id} • {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {ticket.description}
                  </p>
                  <div className="flex justify-end">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/ticket/${ticket.id}`}>View Ticket</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KnowledgeArticle;

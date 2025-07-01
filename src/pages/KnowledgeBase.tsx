import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { KnowledgeArticle, IncidentCategory } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Tag, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import FloatingChatButton from "@/components/FloatingChatButton";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { fetchKnowledgeArticles } from "../services/api.service";

const KnowledgeBase = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<KnowledgeArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetchKnowledgeArticles();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error: any) {
        setError(error.message || "Unknown error");
        setArticles([]);
        setFilteredArticles([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  useEffect(() => {
    const filterArticles = () => {
      let results = [...articles];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(
          (article) =>
            article.title.toLowerCase().includes(query) ||
            article.content.toLowerCase().includes(query) ||
            article.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      
      // Filter by category
      if (activeCategory !== "all") {
        results = results.filter((article) => article.category === activeCategory);
      }
      
      setFilteredArticles(results);
    };
    
    filterArticles();
  }, [searchQuery, activeCategory, articles]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Searching is handled in the useEffect above
  };
  
  const getCategoryCount = (category: string) => {
    return articles.filter((article) => article.category === category).length;
  };
  
  const allCategories = [
    "Network",
    "Software",
    "Hardware",
    "System Access",
    "Other",
  ] as IncidentCategory[];
  
  const canCreateArticle = user?.role === "Admin" || user?.role === "Technician";
  
  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, idx) => (
        <Card key={idx}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6" />
          </CardContent>
        </Card>
      ));
  };
  
  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Knowledge Base</h1>
            <p className="text-gray-500">
              Search for solutions to common technical issues and comprehensive guides for using university systems
            </p>
          </div>
          {canCreateArticle && (
            <Button asChild className="mt-4 md:mt-0">
              <Link to="/submit-knowledge-article">
                Create New Article
              </Link>
            </Button>
          )}
        </div>

        {/* Search and filter section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search the knowledge base..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Categories sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeCategory === "all"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    All Categories ({articles.length})
                  </button>
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category} ({getCategoryCount(category)})
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {renderSkeletons()}
              </div>
            ) : filteredArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <Link key={article.id} to={`/knowledge-base/${article.id}`}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">{article.category}</Badge>
                          {article.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-gray-50"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {article.tags.length > 2 && (
                            <Badge variant="outline" className="bg-gray-50">
                              +{article.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 line-clamp-3">
                          {article.content.substring(0, 200).replace(/[#*`>\-]/g, "").replace(/\n/g, " ")}...
                        </p>
                        <div className="flex items-center justify-between mt-4 text-sm">
                          <span className="text-gray-500">
                            Updated {isNaN(Date.parse(article.updatedAt)) ? 'N/A' : new Date(article.updatedAt).toLocaleDateString()}
                          </span>
                          <span className="text-primary flex items-center">
                            Read more <ChevronRight className="h-4 w-4 ml-1" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-semibold">No articles found</h3>
                  <p className="mt-2 text-gray-500">
                    {searchQuery
                      ? "Try adjusting your search query"
                      : "There are no articles in this category yet"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <FloatingChatButton />
    </>
  );
};

export default KnowledgeBase;

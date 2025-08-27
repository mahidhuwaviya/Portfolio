import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Eye, SearchCode, Bus, Sparkles, Clock, Mail, ChevronDown, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Portfolio, SearchFilters } from "@shared/schema";

type VisitorType = "guest" | "stalker" | "recruiter";

const searchOptions = [
  { value: "about", label: "About Me" },
  { value: "education", label: "Education" },
  { value: "contacts", label: "Contacts" },
  { value: "internships", label: "Internships" },
  { value: "certificates", label: "Certificates" },
  { value: "tech-stack", label: "Tech Stack" },
];

const visitorTypeConfig = {
  guest: {
    icon: User,
    title: "Guest",
    gradient: "from-blue-100 to-blue-200",
    iconColor: "text-blue-600",
    statusMessage: "Great choice! You'll see curated highlights and trending work."
  },
  stalker: {
    icon: User,
    title: "Stalker",
    gradient: "from-purple-100 to-purple-200",
    iconColor: "text-purple-600",
    statusMessage: "Perfect! You'll get detailed project breakdowns and process insights."
  },
  recruiter: {
    icon: User,
    title: "Recruiter",
    gradient: "from-green-100 to-green-200",
    iconColor: "text-green-600",
    statusMessage: "Excellent! You'll see skills, availability, and contact options."
  }
};

export default function Home() {
  const [selectedVisitorType, setSelectedVisitorType] = useState<VisitorType | null>(null);
  const [selectedSearchOption, setSelectedSearchOption] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const { toast } = useToast();

  // Search effect
  useEffect(() => {
    if (!selectedSearchOption && !selectedVisitorType) {
      setShowResults(false);
      return;
    }

    const filters: SearchFilters = {
      query: selectedSearchOption || undefined,
      visitorType: selectedVisitorType || undefined,
    };
    setSearchFilters(filters);
    if (selectedSearchOption || selectedVisitorType) {
      setShowResults(true);
    }
  }, [selectedSearchOption, selectedVisitorType]);

  const { data: portfolios, isLoading } = useQuery<Portfolio[]>({
    queryKey: ["/api/portfolios/search", searchFilters],
    enabled: showResults && (!!selectedSearchOption || !!selectedVisitorType),
  });

  const handleVisitorTypeSelect = (type: VisitorType) => {
    setSelectedVisitorType(type);
  };

  const handleStartExploring = () => {
    if (!selectedVisitorType) {
      toast({
        title: "Selection Required",
        description: "Please select your exploration style first!",
        variant: "destructive",
      });
      return;
    }

    if (!selectedSearchOption) {
      toast({
        title: "Search Required", 
        description: "Please select a search option to start exploring portfolios!",
        variant: "destructive",
      });
      return;
    }

    setShowResults(true);
  };

  const getStatusMessage = () => {
    if (selectedVisitorType) {
      return visitorTypeConfig[selectedVisitorType].statusMessage;
    }
    return "Select your exploration style to get personalized portfolio recommendations";
  };

  const renderVisitorCard = (type: VisitorType) => {
    const config = visitorTypeConfig[type];
    const Icon = config.icon;
    const isSelected = selectedVisitorType === type;

    return (
      <Card
        key={type}
        className={cn(
          "visitor-card cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 aspect-square",
          isSelected && "ring-2 ring-primary border-primary shadow-md -translate-y-0.5"
        )}
        onClick={() => handleVisitorTypeSelect(type)}
        data-testid={`card-visitor-${type}`}
      >
        <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
          <div className={cn(
            "w-20 h-20 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto mb-4",
            config.gradient
          )}>
            <Icon className={cn("text-3xl", config.iconColor)} />
          </div>
          <h3 className="text-xl font-semibold text-foreground">{config.title}</h3>
        </CardContent>
      </Card>
    );
  };

  const renderPortfolioCard = (portfolio: Portfolio) => {
    return (
      <Card key={portfolio.id} className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1" data-testid={`text-name-${portfolio.id}`}>
                {portfolio.name}
              </h3>
              <p className="text-muted-foreground" data-testid={`text-title-${portfolio.id}`}>
                {portfolio.title}
              </p>
            </div>
            {portfolio.featured === "true" && (
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2" data-testid={`text-description-${portfolio.id}`}>
            {portfolio.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {portfolio.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {portfolio.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{portfolio.skills.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              {portfolio.experience}
            </div>
            
            {selectedVisitorType === "recruiter" && (
              <div className="flex items-center gap-2">
                <Badge variant={portfolio.availability.toLowerCase().includes("available") ? "default" : "secondary"}>
                  {portfolio.availability}
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline"
                  data-testid={`button-contact-${portfolio.id}`}
                  onClick={() => {
                    toast({
                      title: "Contact Information",
                      description: `Reach out to ${portfolio.name} at ${portfolio.contactEmail}`,
                    });
                  }}
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Contact
                </Button>
              </div>
            )}
          </div>

          {selectedVisitorType === "stalker" && portfolio.portfolioUrl && (
            <div className="mt-4 pt-4 border-t">
              <Button 
                variant="link" 
                className="p-0 h-auto"
                data-testid={`link-portfolio-${portfolio.id}`}
                onClick={() => portfolio.portfolioUrl && window.open(portfolio.portfolioUrl, '_blank')}
              >
                View Full Portfolio →
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-12 animate-in fade-in duration-600">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Portfolio Explorer
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover exceptional creative talent. Choose your approach and dive into portfolios that inspire.
        </p>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-2xl mb-16 animate-in slide-in-from-bottom duration-800">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Select value={selectedSearchOption} onValueChange={setSelectedSearchOption}>
            <SelectTrigger className="pl-12 pr-6 py-5 text-lg border-2 focus:scale-[1.02] transition-transform">
              <SelectValue placeholder="Choose what you're looking for..." />
            </SelectTrigger>
            <SelectContent>
              {searchOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} data-testid={`option-${option.value}`}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!showResults && (
        <>
          {/* Visitor Type Selection */}
          <div className="w-full max-w-5xl mb-8">
            <h2 className="text-2xl font-semibold text-center mb-8 text-foreground">
              How are you exploring today?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(visitorTypeConfig).map((type) => 
                renderVisitorCard(type as VisitorType)
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button 
              size="lg"
              onClick={handleStartExploring}
              disabled={!selectedVisitorType}
              data-testid="button-start-exploring"
            >
              Start Exploring
            </Button>
            <Button 
              variant="ghost"
              onClick={() => {
                toast({
                  title: "Advanced Filters",
                  description: "Advanced filtering options will be available soon!",
                });
              }}
              data-testid="button-advanced-filters"
            >
              Advanced Filters
            </Button>
          </div>

          {/* Status Message */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground" data-testid="text-status">
              {getStatusMessage()}
            </p>
          </div>
        </>
      )}

      {/* Results Section */}
      {showResults && (
        <div className="w-full max-w-6xl animate-in fade-in duration-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                Portfolio Results
              </h2>
              {selectedVisitorType && (
                <p className="text-muted-foreground mt-1">
                  Exploring as {visitorTypeConfig[selectedVisitorType].title}
                  {selectedSearchOption && ` • "${searchOptions.find(opt => opt.value === selectedSearchOption)?.label}"`}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setShowResults(false);
                setSelectedSearchOption("");
                setSelectedVisitorType(null);
              }}
              data-testid="button-back-to-search"
            >
              ← Back to Search
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
                    <div className="h-12 bg-muted rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-16"></div>
                      <div className="h-6 bg-muted rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : portfolios && portfolios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map(renderPortfolioCard)}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No portfolios found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or exploring different creative disciplines.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

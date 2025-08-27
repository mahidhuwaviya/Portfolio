import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type VisitorType = "guest" | "stalker" | "recruiter";

const visitorTypeConfig = {
  guest: {
    icon: User,
    title: "Guest",
    gradient: "from-blue-100 to-blue-200",
    iconColor: "text-blue-600",
    description: "Browse curated highlights and trending work"
  },
  stalker: {
    icon: User,
    title: "Stalker", 
    gradient: "from-purple-100 to-purple-200",
    iconColor: "text-purple-600",
    description: "Access detailed project breakdowns and process insights"
  },
  recruiter: {
    icon: User,
    title: "Recruiter",
    gradient: "from-green-100 to-green-200", 
    iconColor: "text-green-600",
    description: "View skills, availability, and contact information"
  }
};

export default function Login() {
  const [, setLocation] = useLocation();
  const [visitorType, setVisitorType] = useState<VisitorType>("guest");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get visitor type from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('as') as VisitorType;
    if (type && ['guest', 'stalker', 'recruiter'].includes(type)) {
      setVisitorType(type);
    }
  }, []);

  const config = visitorTypeConfig[visitorType];
  const Icon = config.icon;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to home with the selected visitor type
      setLocation(`/?visitorType=${visitorType}`);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-background to-muted/20">
      
      

      {/* Login Card */}
      <Card className="w-full max-w-md animate-in slide-in-from-bottom duration-800">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className={cn(
              "w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center",
              config.gradient
            )}>
              <Icon className={cn("text-2xl", config.iconColor)} />
            </div>
          </div>
          <CardTitle className="text-xl">
            Logging in as {config.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username or Email</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                data-testid="input-username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? "Signing In..." : `Sign In as ${config.title}`}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex justify-between text-sm">
              <Button 
                variant="link" 
                className="p-0 h-auto text-muted-foreground"
                onClick={() => setLocation('/')}
                data-testid="button-back"
              >
                ← Back to Home
              </Button>
              <Button 
                variant="link" 
                className="p-0 h-auto text-muted-foreground"
                data-testid="button-forgot-password"
              >
                Forgot Password?
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visitor Type Switcher */}
      <div className="mt-8 flex items-center gap-2 animate-in fade-in duration-1000 delay-200">
        <span className="text-sm text-muted-foreground">Switch role:</span>
        {Object.entries(visitorTypeConfig).map(([type, typeConfig]) => (
          <Button
            key={type}
            variant={type === visitorType ? "default" : "outline"}
            size="sm"
            onClick={() => setVisitorType(type as VisitorType)}
            className="text-xs"
            data-testid={`button-switch-${type}`}
          >
            {typeConfig.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
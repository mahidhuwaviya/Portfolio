import { Mail, Github, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12 animate-in fade-in duration-600">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-8">
          Who's Peeking?
        </h1>
      </div>
      
      {/* Footer */}
      <footer className="w-full mt-16 py-6 border-t border-border">
        <div className="flex justify-center items-center gap-6">
          <a
            href="mailto:contact@example.com"
            className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            data-testid="link-email"
          >
            <Mail className="w-5 h-5 text-muted-foreground" />
          </a>
          <a
            href="https://linkedin.com/in/example"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            data-testid="link-linkedin"
          >
            <Linkedin className="w-5 h-5 text-muted-foreground" />
          </a>
          <a
            href="https://github.com/example"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            data-testid="link-github"
          >
            <Github className="w-5 h-5 text-muted-foreground" />
          </a>
        </div>
      </footer>
    </div>
  );
}

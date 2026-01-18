import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, Mail, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const sections = [
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("About Me");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const scrollPosition = scrollContainerRef.current.scrollTop + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.label);
            break;
          }
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop - 20,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Sidebar (40%) */}
      <aside className="w-[40%] flex flex-col border-r border-border bg-muted/30 p-8 relative">
        {/* Top Header */}
        <div className="absolute top-8 right-8 flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Who's peeking?</span>
          <div className="relative w-48">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              readOnly 
              placeholder={activeSection}
              className="pl-9 h-9 bg-background border-border text-sm"
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm space-y-6">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                readOnly 
                placeholder={activeSection}
                className="pl-12 h-12 bg-background border-2 text-lg font-medium"
              />
            </div>
            
            <div className="flex justify-between items-center w-full overflow-x-auto pb-2 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap border",
                    activeSection === section.label
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 border-t border-border">
          <h3 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wider text-center">Connect Me</h3>
          <div className="flex justify-center items-center gap-6">
            <a href="mailto:contact@example.com" className="p-3 rounded-full bg-background border border-border hover:bg-muted transition-colors">
              <Mail className="w-5 h-5 text-foreground" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-background border border-border hover:bg-muted transition-colors">
              <Linkedin className="w-5 h-5 text-foreground" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-background border border-border hover:bg-muted transition-colors">
              <Github className="w-5 h-5 text-foreground" />
            </a>
          </div>
        </div>
      </aside>

      {/* Right Content (60%) */}
      <main 
        ref={scrollContainerRef}
        className="w-[60%] overflow-y-auto scroll-smooth p-12 space-y-24 relative"
      >
        <section id="about" className="min-h-[40vh] flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Passionate creative professional with a focus on building impactful digital experiences. 
            I blend design thinking with technical expertise to solve complex problems.
          </p>
        </section>

        <section id="projects" className="min-h-[60vh]">
          <h2 className="text-4xl font-bold mb-8">Projects</h2>
          <div className="grid grid-cols-1 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-all">
                <div className="h-48 bg-muted rounded-xl mb-6"></div>
                <h3 className="text-2xl font-semibold mb-2">Project Title {i}</h3>
                <p className="text-muted-foreground mb-4">A brief description of the innovative solution and the impact it created.</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">React</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Node.js</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="tech-stack" className="min-h-[40vh]">
          <h2 className="text-4xl font-bold mb-8">Tech Stack</h2>
          <div className="flex flex-wrap gap-4">
            {["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "Drizzle ORM", "Vite", "Express"].map((tech) => (
              <div key={tech} className="px-6 py-3 rounded-xl border border-border bg-card font-medium">
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="min-h-[30vh]">
          <h2 className="text-4xl font-bold mb-8">Education</h2>
          <div className="space-y-6">
            <div className="border-l-2 border-primary pl-6 py-2">
              <h3 className="text-xl font-semibold">Master of Computer Science</h3>
              <p className="text-muted-foreground">University of Excellence • 2020 - 2022</p>
            </div>
            <div className="border-l-2 border-border pl-6 py-2">
              <h3 className="text-xl font-semibold">Bachelor of Design</h3>
              <p className="text-muted-foreground">Design Institute • 2016 - 2020</p>
            </div>
          </div>
        </section>

        <section id="certificates" className="min-h-[30vh] pb-24">
          <h2 className="text-4xl font-bold mb-8">Certificates</h2>
          <div className="grid grid-cols-2 gap-4">
            {["AWS Certified Developer", "Google UX Design", "Meta Front-End Developer", "Advanced React Patterns"].map((cert) => (
              <div key={cert} className="p-4 rounded-lg bg-muted/50 text-sm font-medium">
                {cert}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

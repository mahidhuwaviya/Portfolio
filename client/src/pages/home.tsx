import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, Mail, Github, Linkedin, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const sections = [
  { id: "about", label: "About" },
  { id: "healthtrack", label: "Projects" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "experience", label: "Experience" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("About");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const scrollPosition = scrollContainerRef.current.scrollTop + window.innerHeight / 3;
      
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

  const scrollToSection = (id: string, label: string) => {
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop - 20,
        behavior: "smooth"
      });
      setActiveSection(label);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0F0D0D]">
      {/* Header for Mobile and Desktop Overlay */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 md:p-8 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Logo or name could go here if needed */}
        </div>
        
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="hidden md:flex items-center gap-3 bg-[#0F0D0D]/40 backdrop-blur-md px-4 py-2 rounded-full border border-[#87C9C1]/10">
            <span className="text-[0.8rem] font-medium text-[#87C9C1]/60 whitespace-nowrap">Who's peeking?</span>
            <div className="relative w-48">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#87C9C1]" />
              <Input 
                readOnly 
                placeholder={`Search in [${activeSection}]...`}
                className="pl-9 h-8 bg-transparent border-none text-[0.85rem] text-[#87C9C1] placeholder:text-[#87C9C1]/70"
              />
            </div>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 bg-[#0F0D0D]/60 backdrop-blur-md rounded-full border border-[#87C9C1]/20 text-[#87C9C1]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0F0D0D] flex flex-col items-center justify-center p-8 md:hidden">
          <div className="flex flex-col gap-6 w-full max-w-xs">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id, section.label)}
                className={cn(
                  "w-full text-center py-4 text-2xl font-bold nav-item transition-all",
                  activeSection === section.label
                    ? "text-[#87C9C1] border-l-4 border-[#87C9C1] shadow-[inset_10px_0_20px_-10px_#42421C]"
                    : "text-[#87C9C1]/40"
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Left Content (Main Section) */}
      <main 
        ref={scrollContainerRef}
        className="w-full md:w-[70%] overflow-y-auto no-scrollbar scroll-smooth p-8 md:p-16 space-y-32 relative z-10"
      >
        <section id="about" className="min-h-[60vh] flex flex-col justify-center">
          <h2 className="text-[3rem] md:text-[4rem] font-bold mb-8 text-[#87C9C1]">About</h2>
          <p className="text-lg md:text-xl text-[#87C9C1]/80 leading-relaxed max-w-2xl">
            Passionate creative professional with a focus on building impactful digital experiences. 
            I blend design thinking with technical expertise to solve complex problems.
          </p>
        </section>

        <section id="healthtrack" className="min-h-[80vh]">
          <h2 className="text-[3rem] md:text-[4rem] font-bold mb-8 text-[#87C9C1]">Projects</h2>
          <div className="group p-8 rounded-3xl border border-[#1C3342] bg-[#0F0D0D] hover:shadow-[0_0_50px_-12px_rgba(66,66,28,0.5)] transition-all duration-500">
            <div className="h-64 md:h-96 bg-[#1C3342]/10 rounded-2xl mb-8 flex items-center justify-center border border-[#87C9C1]/5">
              <span className="text-[#87C9C1]/30 text-xl font-medium nav-item">HealthTrack Preview</span>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-[#87C9C1]">Personalized Health Monitoring</h3>
            <p className="text-[#87C9C1]/70 text-lg mb-8 leading-relaxed">An innovative solution for tracking fitness goals and vitals with real-time analytics.</p>
            <div className="flex flex-wrap gap-3">
              {["React Native", "Firebase", "HealthKit"].map(tag => (
                <span key={tag} className="px-4 py-2 bg-[#42421C]/20 text-[#87C9C1] rounded-full text-sm font-medium border border-[#87C9C1]/10 nav-item">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="tech-stack" className="min-h-[60vh]">
          <h2 className="text-[3rem] md:text-[4rem] font-bold mb-12 text-[#87C9C1]">Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind", "Drizzle", "Vite", "Express"].map((tech) => (
              <div key={tech} className="aspect-square flex items-center justify-center rounded-2xl border border-[#1C3342] bg-[#0F0D0D] font-bold text-[#87C9C1]/80 hover:text-[#87C9C1] hover:border-[#87C9C1]/30 transition-all nav-item">
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="min-h-[80vh] pb-32">
          <h2 className="text-[3rem] md:text-[4rem] font-bold mb-12 text-[#87C9C1]">Experience</h2>
          <div className="space-y-16">
            <div className="group relative pl-8 border-l-2 border-[#1C3342] hover:border-[#87C9C1] transition-all duration-500">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#1C3342] group-hover:bg-[#87C9C1] transition-all" />
              <h3 className="text-2xl font-bold text-[#87C9C1] mb-2">Senior Frontend Engineer</h3>
              <p className="text-[#87C9C1]/40 mb-4 nav-item uppercase tracking-widest text-sm">Tech Innovations Inc. • 2022 - Present</p>
              <p className="text-[#87C9C1]/70 leading-relaxed max-w-xl">Leading the frontend development of enterprise-scale applications using React and TypeScript.</p>
            </div>
            <div className="group relative pl-8 border-l-2 border-[#1C3342] hover:border-[#87C9C1] transition-all duration-500">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#1C3342] group-hover:bg-[#87C9C1] transition-all" />
              <h3 className="text-2xl font-bold text-[#87C9C1] mb-2">UI/UX Designer</h3>
              <p className="text-[#87C9C1]/40 mb-4 nav-item uppercase tracking-widest text-sm">Creative Studio • 2020 - 2022</p>
              <p className="text-[#87C9C1]/70 leading-relaxed max-w-xl">Focused on building intuitive interfaces and seamless user journeys for various digital products.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Right Sidebar (Navigation) - Desktop Only */}
      <aside className="hidden md:flex w-[30%] flex-col bg-[#0F0D0D] p-12 justify-center items-center border-l border-[#87C9C1]/5">
        <div className="w-full max-w-xs space-y-12">
          <div className="flex flex-col gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id, section.label)}
                className={cn(
                  "w-full text-left px-8 py-4 text-sm font-bold nav-item uppercase tracking-[0.2em] transition-all duration-500 rounded-xl",
                  activeSection === section.label
                    ? "text-[#87C9C1] border-l-2 border-[#87C9C1] bg-[#42421C]/10 shadow-[0_0_30px_-10px_rgba(66,66,28,0.4)]"
                    : "text-[#87C9C1]/30 hover:text-[#87C9C1]/60 hover:bg-[#1C3342]/10"
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center items-center gap-10 pt-12 border-t border-[#87C9C1]/10">
            <a href="mailto:contact@example.com" className="group">
              <Mail className="w-5 h-5 text-[#87C9C1]/40 group-hover:text-[#C493BC] transition-all transform group-hover:-translate-y-1" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group">
              <Linkedin className="w-5 h-5 text-[#87C9C1]/40 group-hover:text-[#C493BC] transition-all transform group-hover:-translate-y-1" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group">
              <Github className="w-5 h-5 text-[#87C9C1]/40 group-hover:text-[#C493BC] transition-all transform group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

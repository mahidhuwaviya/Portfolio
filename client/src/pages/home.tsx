import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, Mail, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const sections = [
  { id: "about", label: "About Me" },
  { id: "healthtrack", label: "HealthTrack Project" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "experience", label: "Experience" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("About Me");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const scrollPosition = scrollContainerRef.current.scrollTop + 200;
      
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
    <div className="flex h-screen overflow-hidden bg-[#0F0D0D]">
      {/* Left Content (70%) */}
      <main 
        ref={scrollContainerRef}
        className="w-[70%] overflow-y-auto scroll-smooth p-16 space-y-32 relative"
      >
        <section id="about" className="min-h-[40vh] flex flex-col justify-center">
          <h2 className="text-[2.5rem] font-bold mb-8 text-[#87C9C1]">About Me</h2>
          <p className="text-base text-[#87C9C1]/80 leading-[1.6] max-w-2xl">
            Passionate creative professional with a focus on building impactful digital experiences. 
            I blend design thinking with technical expertise to solve complex problems.
          </p>
        </section>

        <section id="healthtrack" className="min-h-[60vh]">
          <h2 className="text-[2.5rem] font-bold mb-8 text-[#87C9C1]">HealthTrack Project</h2>
          <div className="group p-8 rounded-2xl border border-[#1C3342] bg-[#0F0D0D] hover:shadow-xl transition-all">
            <div className="h-64 bg-[#1C3342]/30 rounded-xl mb-6 flex items-center justify-center">
              <span className="text-[#87C9C1]/50">HealthTrack Dashboard Preview</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-[#87C9C1]">Personalized Health Monitoring</h3>
            <p className="text-[#87C9C1]/70 mb-6">An innovative solution for tracking fitness goals and vitals with real-time analytics.</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-[#42421C] text-[#87C9C1] rounded-full text-xs font-medium">React Native</span>
              <span className="px-3 py-1 bg-[#42421C] text-[#87C9C1] rounded-full text-xs font-medium">Firebase</span>
            </div>
          </div>
        </section>

        <section id="tech-stack" className="min-h-[40vh]">
          <h2 className="text-[2.5rem] font-bold mb-8 text-[#87C9C1]">Tech Stack</h2>
          <div className="flex flex-wrap gap-4">
            {["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "Drizzle ORM", "Vite", "Express"].map((tech) => (
              <div key={tech} className="px-6 py-3 rounded-xl border border-[#1C3342] bg-[#0F0D0D] font-medium text-[#87C9C1]">
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="min-h-[40vh] pb-32">
          <h2 className="text-[2.5rem] font-bold mb-8 text-[#87C9C1]">Experience</h2>
          <div className="space-y-12">
            <div className="border-l-2 border-[#87C9C1] pl-6 py-2">
              <h3 className="text-xl font-semibold text-[#87C9C1]">Senior Frontend Engineer</h3>
              <p className="text-[#87C9C1]/60">Tech Innovations Inc. • 2022 - Present</p>
            </div>
            <div className="border-l-2 border-[#1C3342] pl-6 py-2">
              <h3 className="text-xl font-semibold text-[#87C9C1]">UI/UX Designer</h3>
              <p className="text-[#87C9C1]/60">Creative Studio • 2020 - 2022</p>
            </div>
          </div>
        </section>
      </main>

      {/* Right Sidebar (30%) */}
      <aside className="w-[30%] flex flex-col bg-[#1C3342] p-8 relative">
        {/* Top Header */}
        <div className="absolute top-8 right-8 flex items-center gap-3">
          <span className="text-[0.9rem] font-medium text-[#87C9C1] whitespace-nowrap">Who's peeking?</span>
          <div className="relative w-32">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#87C9C1]" />
            <Input 
              readOnly 
              placeholder={activeSection}
              className="pl-9 h-9 bg-[#0F0D0D] border-none text-[0.9rem] text-[#87C9C1] placeholder:text-[#87C9C1]/50"
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-full max-w-xs space-y-8">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#87C9C1]" />
              <Input 
                readOnly 
                placeholder={activeSection}
                className="pl-12 h-14 bg-[#0F0D0D] border-none text-xl font-medium text-[#87C9C1] placeholder:text-[#87C9C1]"
              />
            </div>
            
            <div className="flex flex-col gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "w-full text-left px-6 py-3 text-[0.9rem] font-medium rounded-lg transition-all border border-transparent",
                    activeSection === section.label
                      ? "bg-[#42421C] text-[#87C9C1] border-[#87C9C1]/20 shadow-lg"
                      : "text-[#87C9C1]/70 hover:bg-[#0F0D0D]/30 hover:text-[#87C9C1]"
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8">
          <div className="flex justify-center items-center gap-8">
            <a href="mailto:contact@example.com" className="group">
              <Mail className="w-6 h-6 text-[#C493BC] transition-transform group-hover:scale-110" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group">
              <Linkedin className="w-6 h-6 text-[#C493BC] transition-transform group-hover:scale-110" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group">
              <Github className="w-6 h-6 text-[#C493BC] transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Mail, Github, Linkedin, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import PeekingCat from "@/components/ui/PeekingCat";
import CursorTrail from "@/components/ui/CursorTrail";
import CyberBackground from "@/components/ui/CyberBackground";

const sections = [
  { id: "about", label: "About" },
  { id: "healthtrack", label: "Projects" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
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
    <div className="flex h-screen overflow-hidden bg-[#0F0D0D] relative font-sans">
      <CyberBackground />
      <div className="fixed top-0 left-0 w-full md:w-[70%] h-full z-[100] pointer-events-none mix-blend-screen hidden md:block">
        <CursorTrail />
      </div>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end p-6 pointer-events-none md:hidden">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="flex items-center gap-6 mr-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-[0_0_15px_rgba(135,201,193,0.1)]">
            <a href="mailto:contact@example.com" className="group">
              <Mail className="w-5 h-5 text-[#87C9C1]/70 transition-all hover:text-[#87C9C1]" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group">
              <Linkedin className="w-5 h-5 text-[#87C9C1]/70 transition-all hover:text-[#87C9C1]" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group">
              <Github className="w-5 h-5 text-[#87C9C1]/70 transition-all hover:text-[#87C9C1]" />
            </a>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[#87C9C1] shadow-[0_0_15px_rgba(135,201,193,0.1)] active:scale-95 transition-all"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-8 md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-8 w-full max-w-xs text-center">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id, section.label)}
                className={cn(
                  "text-3xl font-bold nav-item transition-all duration-300",
                  activeSection === section.label
                    ? "text-white drop-shadow-[0_0_15px_rgba(135,201,193,1)] scale-110"
                    : "text-[#87C9C1]/40 hover:text-[#87C9C1]"
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
        <section id="about" className="min-h-[60vh] flex flex-col justify-center relative z-20">
          <h2 className="text-[3rem] md:text-[4rem] font-bold mb-4 text-[#87C9C1]">Mahi Dhuwaviya</h2>
          <h3 className="text-xl md:text-2xl text-[#87C9C1] font-medium mb-8">Aspiring Backend Developer</h3>
          <p className="text-lg md:text-xl text-[#87C9C1]/80 leading-relaxed max-w-2xl mb-12">
            Passionate creative professional with a focus on building impactful digital experiences.
            I blend design thinking with technical expertise to solve complex problems.
          </p>

          <div className="flex flex-wrap gap-6">
            <button
              onClick={() => scrollToSection('healthtrack', 'Projects')}
              className="px-8 py-4 bg-[#87C9C1] text-[#0F0D0D] font-bold rounded-xl shadow-[0_0_20px_rgba(135,201,193,0.4)] relative overflow-hidden group animate-shimmer-sweep"
            >
              <span className="relative z-10">View Projects</span>
            </button>
            <a
              href="mailto:contact@example.com"
              className="px-8 py-4 border border-[#1C3342] text-[#87C9C1] font-medium rounded-xl hover:bg-[#87C9C1]/10 transition-all"
            >
              Get in Touch
            </a>
          </div>
        </section>

        <section id="healthtrack" className="min-h-[80vh]">
          <h2 className="text-[3rem] md:text-[4rem] font-bold mb-8 text-[#87C9C1]">Projects</h2>
          <div className="space-y-16">
            {/* <div className="group p-8 rounded-3xl border border-[#1C3342] bg-[#0F0D0D] hover:shadow-[0_0_50px_-12px_rgba(66,66,28,0.5)] transition-all duration-500">
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
          </div> */}

            <div className="group p-8 rounded-3xl border border-[#1C3342] bg-[#0F0D0D] hover:shadow-[0_0_50px_-12px_rgba(66,66,28,0.5)] transition-all duration-500">
              <div className="h-64 md:h-96 bg-[#1C3342]/10 rounded-2xl mb-8 flex items-center justify-center border border-[#87C9C1]/5 overflow-hidden relative">
                <img
                  src="/assets/food_app_preview.png"
                  alt="Food Delivery App"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 opacity-90 hover:opacity-100"
                />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-[#87C9C1]">Full-Stack Food Delivery</h3>
              <p className="text-[#87C9C1]/70 text-lg mb-8 leading-relaxed">
                A comprehensive e-commerce solution featuring secure user authentication, RESTful API endpoints for CRUD operations [cite: 29], and integrated email services for password resets[cite: 35].
              </p>
              <div className="flex flex-wrap gap-3">
                {["React", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-[#42421C]/20 text-[#87C9C1] rounded-full text-sm font-medium border border-[#87C9C1]/10 nav-item">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="group p-8 rounded-3xl border border-[#1C3342] bg-[#0F0D0D] hover:shadow-[0_0_50px_-12px_rgba(66,66,28,0.5)] transition-all duration-500">
              <div className="h-64 md:h-96 bg-[#1C3342]/10 rounded-2xl mb-8 flex items-center justify-center border border-[#87C9C1]/5 overflow-hidden relative">
                <img
                  src="/assets/chat_app_preview.png"
                  alt="Real-Time Chat App"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 opacity-90 hover:opacity-100"
                />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-[#87C9C1]">Real-Time Communication</h3>
              <p className="text-[#87C9C1]/70 text-lg mb-8 leading-relaxed">
                Instant messaging platform utilizing bi-directional communication. Developed with a focus on responsive UI components and secure session management using Bcrypt and JWT[cite: 74, 78].
              </p>
              <div className="flex flex-wrap gap-3">
                {["React", "Socket.io", "Node.js", "Express", "Bcrypt", "Mongoose"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-[#42421C]/20 text-[#87C9C1] rounded-full text-sm font-medium border border-[#87C9C1]/10 nav-item">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="group p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-md hover:border-[#87C9C1]/30 hover:shadow-[0_0_50px_-12px_rgba(135,201,193,0.3)] transition-all duration-500">
              <div className="h-64 md:h-96 bg-[#1C3342]/10 rounded-2xl mb-8 flex items-center justify-center border border-[#87C9C1]/5 overflow-hidden relative">
                <img
                  src="/assets/streaming_app_preview.png"
                  alt="Streaming Platform Clone"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 opacity-90 hover:opacity-100"
                />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-[#87C9C1]">Media Ecosystems</h3>
              <p className="text-[#87C9C1]/70 text-lg mb-8 leading-relaxed">
                A series of platform clones (Netflix, YouTube, Spotify) focusing on high-volume data integration. Features complex third-party API consumption including TMDB, Spotify Developer API, and YouTube Data API v3.
              </p>
              <div className="flex flex-wrap gap-3">
                {["TypeScript", "Redux Toolkit", "Tailwind CSS", "Firebase", "Third-party APIs"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-[#42421C]/20 text-[#87C9C1] rounded-full text-sm font-medium border border-[#87C9C1]/10 nav-item">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </section>

        <section id="tech-stack" className="min-h-[60vh]">
          <h2 className="text-[3rem] md:text-[4rem] font-bold mb-12 text-[#87C9C1]">Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {["MernStack", "React", "Node.js", "Express.js", "MongoDB", "MySQL", "JavaScript", "Java", "SpringBoot", "Spring Framework", "Git", "GitHub"].map((tech) => (
              <div key={tech} className="aspect-square flex items-center justify-center rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md font-bold text-[#87C9C1]/80 hover:text-[#87C9C1] hover:border-[#87C9C1]/30 transition-all nav-item">
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="min-h-[80vh] pb-32">
          <h2 className="text-[3rem] md:text-[4rem] font-bold mb-12 text-[#87C9C1]">Experience</h2>
          <div className="space-y-16">
            {/* <div className="group relative pl-8 border-l-2 border-[#1C3342] hover:border-[#87C9C1] transition-all duration-500">
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
            </div> */}
            <div className="group relative pl-8 border-l-2 border-white/10 hover:border-[#87C9C1] transition-all duration-500">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#1C3342] group-hover:bg-[#87C9C1] transition-all" />
              <h3 className="text-2xl font-bold text-[#87C9C1] mb-2">Full Stack Web Development Intern</h3>
              <p className="text-[#87C9C1]/40 mb-4 nav-item uppercase tracking-widest text-sm">
                Edu-Versity(Powered By Wipro DICE ID)•Sep2024-Oct2024
              </p>
              <p className="text-[#87C9C1]/40 mb-4 nav-item uppercase tracking-widest text-sm">Focus: MERN Stack •Remote</p>

              <p className="text-[#87C9C1]/70 leading-relaxed max-w-xl">
                Developed and deployed full-stack projects using the MERN stack.
                Engineered secure RESTful APIs and implemented authentication systems using JWT and Bcrypt
                to ensure data protection and application scalability.
              </p>
            </div>

            <div className="group relative pl-8 border-l-2 border-[#1C3342] hover:border-[#87C9C1] transition-all duration-500">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#1C3342] group-hover:bg-[#87C9C1] transition-all" />
              <h3 className="text-2xl font-bold text-[#87C9C1] mb-2">Aspiring Java Backend Intern</h3>
              <p className="text-[#87C9C1]/40 mb-4 nav-item uppercase tracking-widest text-sm">
                YPSILON IT SOLUTIONS PRIVATE LIMITED  •Jun2025-Jan2025
              </p>
              <p className="text-[#87C9C1]/40 mb-4 nav-item uppercase tracking-widest text-sm">Focus: Java & Spring Framework • Indore</p>
              <p className="text-[#87C9C1]/70 leading-relaxed max-w-xl">
                Actively seeking a 6-month professional internship to apply expertise in Java backend development.
                Dedicated to building scalable enterprise solutions and mastering the Spring ecosystem within a production environment.
              </p>
            </div>
          </div>
        </section>
        <section id="education" className="min-h-[60vh] pb-32">
          <h2 className="text-[3rem] md:text-[4rem] font-bold mb-12 text-[#87C9C1]">Education</h2>
          <div className="space-y-12">
            <div className="group p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-md hover:border-[#87C9C1]/30 transition-all duration-500">
              <h3 className="text-2xl font-bold text-[#87C9C1] mb-2">Bachelor of Computer Application</h3>
              <p className="text-[#87C9C1]/40 mb-4 nav-item uppercase tracking-widest text-sm">Computer Science • 2023 - 2026 (Present) • CGPA: 8.39/10</p>
              <p className="text-[#87C9C1]/70 leading-relaxed">
                Amity University Online
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Right Sidebar (Navigation) - Desktop Only */}
      <aside className="hidden md:flex w-[30%] flex-col bg-black/20 backdrop-blur-md p-12 justify-between items-center relative z-20">
        {/* Gradient Partition Line */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#87C9C1]/50 to-transparent" />

        {/* Header Content moved to Top of Sidebar */}
        <div className="w-full flex flex-row items-center gap-4 pt-4 relative">
          {/* Cat Container - Left Side - Enlarged */}
          <div className="w-20 h-20 relative">
            <PeekingCat />
          </div>

          {/* Text Removed - Now inside PeekingCat */}
        </div>

        <div className="w-full max-w-xs space-y-12">
          <div className="flex flex-col gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id, section.label)}
                className={cn(
                  "w-full text-left px-8 py-4 text-sm font-bold nav-item uppercase tracking-[0.2em] transition-all duration-500 rounded-xl",
                  activeSection === section.label
                    ? "text-[#87C9C1] drop-shadow-[0_0_10px_rgba(135,201,193,0.6)] font-extrabold"
                    : "text-[#87C9C1]/30 hover:text-[#87C9C1]/60"
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Social Links - Bottom */}
        <div className="flex justify-center items-center gap-10 pb-4 border-t border-[#87C9C1]/10 pt-12 w-full max-w-xs">
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
      </aside>
    </div>
  );
}

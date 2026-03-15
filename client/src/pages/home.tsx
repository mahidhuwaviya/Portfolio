import { useState, useEffect, useRef } from "react";
import { Mail, Github, Linkedin, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import PeekingCat from "@/components/ui/PeekingCat";
import CursorTrail from "@/components/ui/CursorTrail";
import CyberBackground from "@/components/ui/CyberBackground";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
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

      {/* Mobile Menu Overlay (fullscreen) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center p-8 md:hidden mobile-menu-overlay">
          {/* Close button top-right */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-3 bg-white/5 rounded-full border border-white/10 text-[#87C9C1] active:scale-95 transition-all min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col gap-6 w-full max-w-xs text-center">
            {sections.map((section, i) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id, section.label)}
                className={cn(
                  "text-2xl font-bold nav-item transition-all duration-300 py-3 rounded-xl min-h-[56px] mobile-nav-item",
                  activeSection === section.label
                    ? "text-white drop-shadow-[0_0_15px_rgba(135,201,193,1)] scale-105 bg-white/5"
                    : "text-[#87C9C1]/50 hover:text-[#87C9C1]"
                )}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {section.label}
                {activeSection === section.label && (
                  <span className="block text-xs text-[#87C9C1]/40 font-normal mt-1 nav-item tracking-widest uppercase">
                    current
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Social links inline in menu */}
          <div className="flex items-center gap-8 mt-12">
            <a href="mailto:mahi.dhuwaviya.04@gmail.com" className="p-3 bg-white/5 rounded-full border border-white/10 min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95 transition-all" aria-label="Email">
              <Mail className="w-5 h-5 text-[#87C9C1]/70" />
            </a>
            <a href="https://www.linkedin.com/in/mahi-jain-b372022a6/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full border border-white/10 min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95 transition-all" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 text-[#87C9C1]/70" />
            </a>
            <a href="https://github.com/mahidhuwaviya" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full border border-white/10 min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95 transition-all" aria-label="GitHub">
              <Github className="w-5 h-5 text-[#87C9C1]/70" />
            </a>
          </div>
        </div>
      )}

      {/* ── FIXED MOBILE TOP BAR (cat) ─────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center gap-3 px-5 py-3 bg-[#0F0D0D]/80 backdrop-blur-md border-b border-white/5">
        <div className="w-10 h-10 relative flex-shrink-0">
          <PeekingCat />
        </div>
        <div>
          <p className="text-[#87C9C1]/40 text-[10px] nav-item uppercase tracking-widest leading-none">Portfolio</p>
          <p className="text-[#87C9C1]/80 text-sm font-semibold leading-tight">Mahi Dhuwaviya</p>
        </div>
      </header>

      {/* Left Content (Main Section) */}
      <main
        ref={scrollContainerRef}
        className="w-full md:w-[70%] overflow-y-auto no-scrollbar scroll-smooth px-5 pt-20 md:p-16 space-y-20 md:space-y-32 relative z-10 pb-28 md:pb-16"
      >
        {/* ── ABOUT ───────────────────────────────────────────────── */}
        <section id="about" className="flex flex-col justify-center min-h-screen md:min-h-[60vh] relative z-20">
          <h2 className="text-[2.2rem] md:text-[4rem] font-bold mb-3 md:mb-4 text-[#87C9C1] leading-tight">
            Mahi Dhuwaviya
          </h2>
          <h3 className="text-lg md:text-2xl text-[#87C9C1] font-medium mb-5 md:mb-8">
            Backend Developer
          </h3>
          <p className="text-base md:text-xl text-[#87C9C1]/80 leading-relaxed max-w-2xl mb-8 md:mb-12">
            Passionate Backend Developer with a focus on building impactful digital experiences.
            I blend design thinking with technical expertise to solve complex problems.
          </p>

          {/* CTAs — stack full-width on mobile, inline on md+ */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button
              onClick={() => scrollToSection('projects', 'Projects')}
              className="w-full sm:w-auto min-h-[52px] px-8 py-4 bg-[#87C9C1] text-[#0F0D0D] font-bold rounded-xl shadow-[0_0_20px_rgba(135,201,193,0.4)] relative overflow-hidden group touch-manipulation active:scale-[0.97] transition-all"
            >
              {/* shimmer sheen — only this inner element moves, not the button */}
              <span className="absolute inset-0 animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <span className="relative z-10">View Projects</span>
            </button>
            <a
              href="mailto:mahi.dhuwaviya,04@gmail.com"
              className="w-full sm:w-auto min-h-[52px] px-8 py-4 border border-[#1C3342] text-[#87C9C1] font-medium rounded-xl hover:bg-[#87C9C1]/10 active:bg-[#87C9C1]/10 transition-all flex items-center justify-center touch-manipulation"
            >
              Get in Touch
            </a>
          </div>
        </section>

        {/* ── PROJECTS ────────────────────────────────────────────── */}
        <section id="projects" className="min-h-[80vh]">
          <h2 className="text-[2rem] md:text-[4rem] font-bold mb-6 md:mb-8 text-[#87C9C1]">Projects</h2>
          <div className="space-y-10 md:space-y-16">

            {/* ── Health Tracker ── */}
            <div className="p-5 md:p-8 rounded-3xl border border-[#1C3342] bg-[#0F0D0D] mobile-card-press hover:border-[#87C9C1]/20 hover:shadow-[0_0_50px_-12px_rgba(66,66,28,0.5)] transition-all duration-500">
              <p className="text-[#87C9C1]/30 text-xs nav-item uppercase tracking-widest mb-3">
                ↗ tap image to visit project
              </p>
              <a
                href="https://health-tracker-app-frontend.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-44 md:h-96 bg-[#1C3342]/10 rounded-2xl mb-5 md:mb-8 border border-[#87C9C1]/5 overflow-hidden relative cursor-pointer"
              >
                <img
                  src="assets/images/HealthTracker.png"
                  alt="Health Tracker App"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-[#87C9C1] text-xs nav-item px-3 py-1.5 rounded-full border border-[#87C9C1]/30 backdrop-blur-sm">
                    Open Live Site ↗
                  </span>
                </div>
              </a>
              <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-[#87C9C1]">Health Tracker App <span className="text-sm font-normal text-[#87C9C1]/50">(Live)</span></h3>
              <p className="text-[#87C9C1]/70 text-base md:text-lg mb-5 md:mb-8 leading-relaxed">
                A comprehensive wellness platform designed to bridge the gap between nutrition and activity tracking.
                Integrated a third-party nutrition API to provide real-time data for meal logging, built dynamic workout tracking, and created a localized water intake monitor.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {["Java", "Spring Framework", "Spring Security", "React", "TypeScript", "Third-party APIs"].map(tag => (
                  <span key={tag} className="px-3 md:px-4 py-1.5 md:py-2 bg-[#42421C]/20 text-[#87C9C1] rounded-full text-xs md:text-sm font-medium border border-[#87C9C1]/10 nav-item">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Food Delivery ── */}
            <div className="p-5 md:p-8 rounded-3xl border border-[#1C3342] bg-[#0F0D0D] mobile-card-press hover:border-[#87C9C1]/20 hover:shadow-[0_0_50px_-12px_rgba(66,66,28,0.5)] transition-all duration-500">
              <p className="text-[#87C9C1]/30 text-xs nav-item uppercase tracking-widest mb-3">
                ↗ tap image to visit project
              </p>
              <a
                href="https://github.com/mahidhuwaviya/Project1-FoodDelivery.git"
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-44 md:h-96 bg-[#1C3342]/10 rounded-2xl mb-5 md:mb-8 border border-[#87C9C1]/5 overflow-hidden relative cursor-pointer"
              >
                <img
                  src="assets/images/foodDeliveryApp.png"
                  alt="Food Delivery App"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-[#87C9C1] text-xs nav-item px-3 py-1.5 rounded-full border border-[#87C9C1]/30 backdrop-blur-sm">
                    View on GitHub ↗
                  </span>
                </div>
              </a>
              <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-[#87C9C1]">Full-Stack Food Delivery</h3>
              <p className="text-[#87C9C1]/70 text-base md:text-lg mb-5 md:mb-8 leading-relaxed">
                A comprehensive e-commerce solution featuring secure user authentication, RESTful API endpoints for CRUD operations, and integrated email services for password resets.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {["React", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary"].map(tag => (
                  <span key={tag} className="px-3 md:px-4 py-1.5 md:py-2 bg-[#42421C]/20 text-[#87C9C1] rounded-full text-xs md:text-sm font-medium border border-[#87C9C1]/10 nav-item">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Chat App ── */}
            <div className="p-5 md:p-8 rounded-3xl border border-[#1C3342] bg-[#0F0D0D] mobile-card-press hover:border-[#87C9C1]/20 hover:shadow-[0_0_50px_-12px_rgba(66,66,28,0.5)] transition-all duration-500">
              <p className="text-[#87C9C1]/30 text-xs nav-item uppercase tracking-widest mb-3">
                ↗ tap image to visit project
              </p>
              <a
                href="https://github.com/mahidhuwaviya/Project2-ChaptApp.git"
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-44 md:h-96 bg-[#1C3342]/10 rounded-2xl mb-5 md:mb-8 border border-[#87C9C1]/5 overflow-hidden relative cursor-pointer"
              >
                <img
                  src="assets/images/ChatApp.png"
                  alt="Real-Time Chat App"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-[#87C9C1] text-xs nav-item px-3 py-1.5 rounded-full border border-[#87C9C1]/30 backdrop-blur-sm">
                    View on GitHub ↗
                  </span>
                </div>
              </a>
              <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-[#87C9C1]">Real-Time Communication</h3>
              <p className="text-[#87C9C1]/70 text-base md:text-lg mb-5 md:mb-8 leading-relaxed">
                Instant messaging platform utilizing bi-directional communication. Developed with a focus on responsive UI components and secure session management using Bcrypt and JWT.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {["React", "Socket.io", "Node.js", "Express", "Bcrypt", "Mongoose"].map(tag => (
                  <span key={tag} className="px-3 md:px-4 py-1.5 md:py-2 bg-[#42421C]/20 text-[#87C9C1] rounded-full text-xs md:text-sm font-medium border border-[#87C9C1]/10 nav-item">
                    {tag}
                  </span>
                ))}
              </div>
            </div>


          </div>

        </section>

        {/* ── TECH STACK ──────────────────────────────────────────── */}
        <section id="tech-stack" className="min-h-[60vh]">
          <h2 className="text-[2rem] md:text-[4rem] font-bold mb-8 md:mb-12 text-[#87C9C1]">Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {["Java", "SpringBoot", "Spring Framework", "Spring Security", "MernStack", "React", "Node.js", "Express.js", "JavaScript", "MongoDB", "MySQL", "Git", "GitHub"].map((tech) => (
              <div key={tech} className="min-h-[80px] md:aspect-square flex items-center justify-center rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md font-bold text-[#87C9C1]/80 hover:text-[#87C9C1] hover:border-[#87C9C1]/30 active:scale-95 transition-all nav-item text-sm md:text-base text-center px-2 py-4 md:px-4 touch-manipulation">
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ──────────────────────────────────────────── */}
        <section id="experience" className="min-h-[60vh] pb-16 md:pb-32">
          <h2 className="text-[2rem] md:text-[4rem] font-bold mb-8 md:mb-12 text-[#87C9C1]">Experience</h2>
          <div className="space-y-10 md:space-y-16">
            <div className="group relative pl-6 md:pl-8 border-l-2 border-white/10 hover:border-[#87C9C1] transition-all duration-500">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#1C3342] group-hover:bg-[#87C9C1] transition-all" />
              <h3 className="text-xl md:text-2xl font-bold text-[#87C9C1] mb-2">Full Stack Web Development Intern</h3>
              <p className="text-[#87C9C1]/40 mb-3 nav-item uppercase tracking-widest text-xs md:text-sm">
                Edu-Versity (Powered By Wipro DICE ID) • Sep 2024 – Oct 2024
              </p>
              <p className="text-[#87C9C1]/40 mb-3 nav-item uppercase tracking-widest text-xs md:text-sm">Focus: MERN Stack • Remote</p>
              <p className="text-[#87C9C1]/70 leading-relaxed text-sm md:text-base max-w-xl">
                Developed and deployed full-stack projects using the MERN stack.
                Engineered secure RESTful APIs and implemented authentication systems using JWT and Bcrypt
                to ensure data protection and application scalability.
              </p>
            </div>

            <div className="group relative pl-6 md:pl-8 border-l-2 border-[#1C3342] hover:border-[#87C9C1] transition-all duration-500">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#1C3342] group-hover:bg-[#87C9C1] transition-all" />
              <h3 className="text-xl md:text-2xl font-bold text-[#87C9C1] mb-2">Aspiring Java Backend Intern</h3>
              <p className="text-[#87C9C1]/40 mb-3 nav-item uppercase tracking-widest text-xs md:text-sm">
                YPSILON IT SOLUTIONS PRIVATE LIMITED • Jun 2025 – Jan 2025
              </p>
              <p className="text-[#87C9C1]/40 mb-3 nav-item uppercase tracking-widest text-xs md:text-sm">Focus: Java & Spring Framework • Indore</p>
              <p className="text-[#87C9C1]/70 leading-relaxed text-sm md:text-base max-w-xl">
                Actively seeking a 6-month professional internship to apply expertise in Java backend development.
                Dedicated to building scalable enterprise solutions and mastering the Spring ecosystem within a production environment.
              </p>
            </div>
          </div>
        </section>

        {/* ── EDUCATION ───────────────────────────────────────────── */}
        <section id="education" className="min-h-[40vh] pb-16 md:pb-32">
          <h2 className="text-[2rem] md:text-[4rem] font-bold mb-8 md:mb-12 text-[#87C9C1]">Education</h2>
          <div className="space-y-8 md:space-y-12">
            <div className="group p-5 md:p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-md hover:border-[#87C9C1]/30 active:scale-[0.99] transition-all duration-500">
              <h3 className="text-xl md:text-2xl font-bold text-[#87C9C1] mb-2">Bachelor of Computer Application</h3>
              <p className="text-[#87C9C1]/40 mb-3 nav-item uppercase tracking-widest text-xs md:text-sm">
                Computer Science • 2023 – 2026 (Present) • CGPA: 8.39/10
              </p>
              <p className="text-[#87C9C1]/70 leading-relaxed text-sm md:text-base">
                Amity University Online
              </p>
            </div>
          </div>
        </section>

        {/* Best-on-desktop note — mobile only */}
        <p className="md:hidden text-center text-[#87C9C1]/20 text-xs nav-item pb-4 tracking-widest uppercase select-none">
          ✦ Best experienced on a laptop ✦
        </p>
      </main>

      {/* ── BOTTOM NAVIGATION BAR — Mobile Only ─────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 md:hidden mobile-bottom-nav">
        {/* Social links */}
        <div className="flex items-center gap-1">
          <a
            href="mailto:contact@example.com"
            className="p-3 rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center text-[#87C9C1]/60 hover:text-[#87C9C1] active:scale-95 active:bg-white/5 transition-all touch-manipulation"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center text-[#87C9C1]/60 hover:text-[#87C9C1] active:scale-95 active:bg-white/5 transition-all touch-manipulation"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center text-[#87C9C1]/60 hover:text-[#87C9C1] active:scale-95 active:bg-white/5 transition-all touch-manipulation"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        {/* Active section indicator */}
        <span className="text-[#87C9C1]/40 text-xs nav-item uppercase tracking-widest select-none">
          {activeSection}
        </span>

        {/* Menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-[#87C9C1]/10 backdrop-blur-md rounded-full border border-[#87C9C1]/20 text-[#87C9C1] min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95 transition-all touch-manipulation shadow-[0_0_15px_rgba(135,201,193,0.15)]"
          aria-label="Open navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

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

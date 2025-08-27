import { type Portfolio, type InsertPortfolio, type SearchFilters } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPortfolio(id: string): Promise<Portfolio | undefined>;
  searchPortfolios(filters: SearchFilters): Promise<Portfolio[]>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  getAllPortfolios(): Promise<Portfolio[]>;
}

export class MemStorage implements IStorage {
  private portfolios: Map<string, Portfolio>;

  constructor() {
    this.portfolios = new Map();
    this.seedData();
  }

  private seedData() {
    const samplePortfolios: InsertPortfolio[] = [
      {
        name: "Sarah Chen",
        title: "Senior UX Designer",
        skills: ["UI/UX Design", "Figma", "User Research", "Prototyping", "Design Systems"],
        discipline: "UX Design",
        description: "Passionate about creating intuitive digital experiences that solve real user problems. Specialized in design systems and user-centered design methodologies.",
        experience: "5+ years",
        availability: "Available for freelance",
        contactEmail: "sarah.chen@example.com",
        portfolioUrl: "https://sarahchen.design",
        featured: "true",
      },
      {
        name: "Marcus Rodriguez",
        title: "Creative Director",
        skills: ["Brand Identity", "Art Direction", "Adobe Creative Suite", "Typography", "Print Design"],
        discipline: "Brand Design",
        description: "Award-winning creative director with expertise in brand identity and visual storytelling. Led campaigns for Fortune 500 companies.",
        experience: "8+ years",
        availability: "Open to full-time opportunities",
        contactEmail: "marcus@creativestudio.com",
        portfolioUrl: "https://marcusrodriguez.co",
        featured: "true",
      },
      {
        name: "Emily Johnson",
        title: "Motion Graphics Designer",
        skills: ["After Effects", "Cinema 4D", "Motion Design", "3D Animation", "Video Editing"],
        discipline: "Motion Graphics",
        description: "Bringing ideas to life through dynamic motion graphics and animation. Specialized in explainer videos and brand animations.",
        experience: "4+ years",
        availability: "Available for projects",
        contactEmail: "emily@motionworks.com",
        portfolioUrl: "https://emilyjohnson.motion",
        featured: "false",
      },
      {
        name: "Alex Kim",
        title: "Frontend Developer & Designer",
        skills: ["React", "TypeScript", "Web Design", "CSS Animation", "Responsive Design"],
        discipline: "Web Development",
        description: "Full-stack creative combining development skills with design sensibility. Expert in creating interactive web experiences.",
        experience: "6+ years",
        availability: "Currently employed, open to opportunities",
        contactEmail: "alex.kim@webstudio.dev",
        portfolioUrl: "https://alexkim.dev",
        featured: "true",
      },
      {
        name: "Jessica Taylor",
        title: "Illustrator & Visual Artist",
        skills: ["Digital Illustration", "Procreate", "Character Design", "Concept Art", "Traditional Art"],
        discipline: "Illustration",
        description: "Contemporary illustrator creating vibrant artwork for books, magazines, and digital media. Specialized in character design and storytelling through visuals.",
        experience: "3+ years",
        availability: "Available for commissions",
        contactEmail: "jessica@artworks.studio",
        portfolioUrl: "https://jessicataylor.art",
        featured: "false",
      },
    ];

    samplePortfolios.forEach(portfolio => {
      this.createPortfolio(portfolio);
    });
  }

  async getPortfolio(id: string): Promise<Portfolio | undefined> {
    return this.portfolios.get(id);
  }

  async searchPortfolios(filters: SearchFilters): Promise<Portfolio[]> {
    const allPortfolios = Array.from(this.portfolios.values());
    
    let filteredPortfolios = allPortfolios;

    // Filter by search query (name, title, skills, discipline, description)
    if (filters.query && filters.query.trim()) {
      const query = filters.query.toLowerCase().trim();
      filteredPortfolios = filteredPortfolios.filter(portfolio =>
        portfolio.name.toLowerCase().includes(query) ||
        portfolio.title.toLowerCase().includes(query) ||
        portfolio.discipline.toLowerCase().includes(query) ||
        portfolio.description.toLowerCase().includes(query) ||
        portfolio.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Filter by discipline
    if (filters.discipline) {
      filteredPortfolios = filteredPortfolios.filter(portfolio =>
        portfolio.discipline.toLowerCase().includes(filters.discipline!.toLowerCase())
      );
    }

    // Filter by skills
    if (filters.skills && filters.skills.length > 0) {
      filteredPortfolios = filteredPortfolios.filter(portfolio =>
        filters.skills!.some(skill =>
          portfolio.skills.some(portfolioSkill =>
            portfolioSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    // Filter by availability
    if (filters.availability) {
      filteredPortfolios = filteredPortfolios.filter(portfolio =>
        portfolio.availability.toLowerCase().includes(filters.availability!.toLowerCase())
      );
    }

    // Sort based on visitor type preference
    if (filters.visitorType === "guest") {
      // Guests see featured portfolios first
      filteredPortfolios.sort((a, b) => {
        if (a.featured === "true" && b.featured !== "true") return -1;
        if (a.featured !== "true" && b.featured === "true") return 1;
        return 0;
      });
    } else if (filters.visitorType === "recruiter") {
      // Recruiters see available talent first
      filteredPortfolios.sort((a, b) => {
        const aAvailable = a.availability.toLowerCase().includes("available") || 
                          a.availability.toLowerCase().includes("open");
        const bAvailable = b.availability.toLowerCase().includes("available") || 
                          b.availability.toLowerCase().includes("open");
        
        if (aAvailable && !bAvailable) return -1;
        if (!aAvailable && bAvailable) return 1;
        return 0;
      });
    }

    return filteredPortfolios;
  }

  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const id = randomUUID();
    const portfolio: Portfolio = { 
      ...insertPortfolio, 
      id,
      skills: insertPortfolio.skills || []
    };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }

  async getAllPortfolios(): Promise<Portfolio[]> {
    return Array.from(this.portfolios.values());
  }
}

export const storage = new MemStorage();

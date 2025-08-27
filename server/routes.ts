import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchFiltersSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Search portfolios endpoint
  app.get("/api/portfolios/search", async (req, res) => {
    try {
      const filters = searchFiltersSchema.parse(req.query);
      const portfolios = await storage.searchPortfolios(filters);
      res.json(portfolios);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid search parameters",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all portfolios endpoint
  app.get("/api/portfolios", async (req, res) => {
    try {
      const portfolios = await storage.getAllPortfolios();
      res.json(portfolios);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get single portfolio endpoint
  app.get("/api/portfolios/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const portfolio = await storage.getPortfolio(id);
      
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

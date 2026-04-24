import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

// ES Module path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/ai/recommendations", async (req, res) => {
    try {
      const { seekerProfile, companions } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set on the server" });
      }

      const { GoogleGenAI } = await import("@google/genai");
      const genAI = new GoogleGenAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        You are a matching assistant for Bahäm, a companionship platform for elderly and those in need.
        Given a seeker's profile and a list of potential companions, rank the companions based on:
        1. Language match.
        2. Availability overlap.
        3. Distance (proximity).
        4. Interest alignment.
        5. Prior ratings.

        Seeker: ${JSON.stringify(seekerProfile)}
        Companions: ${JSON.stringify(companions)}

        Return a JSON array of companion IDs in recommended order with a brief "matchReason" for each.
        Format: [{"id": "...", "matchReason": "..."}]
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const jsonStr = text.match(/\[.*\]/s)?.[0];
      const recommendations = jsonStr ? JSON.parse(jsonStr) : [];
      
      res.json(recommendations);
    } catch (error: any) {
      console.error("Server AI Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Development mode setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode setup
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA fallback: all unknown routes serve index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

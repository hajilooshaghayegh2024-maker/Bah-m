/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getRecommendations(seekerProfile: any, companions: any[]) {
  try {
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

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const text = response.text;
    if (!text) return [];

    const jsonStr = text.match(/\[.*\]/s)?.[0];
    return jsonStr ? JSON.parse(jsonStr) : [];
  } catch (error) {
    console.error("AIService Error:", error);
    return [];
  }
}

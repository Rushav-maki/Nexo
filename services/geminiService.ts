
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private static instance: GoogleGenAI | null = null;

  private static getClient() {
    if (!this.instance) {
      this.instance = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    }
    return this.instance;
  }

  static async searchHotels(location: string): Promise<any> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find 4 top-rated hotels in ${location}, Nepal. Include pricing in NPR, key amenities, and a short luxury description.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              location: { type: Type.STRING },
              pricePerNight: { type: Type.NUMBER },
              rating: { type: Type.NUMBER },
              amenities: { type: Type.ARRAY, items: { type: Type.STRING } },
              description: { type: Type.STRING }
            },
            required: ["name", "location", "pricePerNight", "rating", "amenities", "description"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  }

  static async generateEduResponse(grade: number, subject: string, topic: string): Promise<any> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are a master teacher for the Nepal NEB curriculum. Create a comprehensive, full-length lesson for Grade ${grade} ${subject} on the topic: "${topic}". 
      The lesson must be detailed enough to cover a 45-minute class. 
      Include specifically:
      1. Learning Objectives.
      2. Comprehensive Explanation (Multiple paragraphs).
      3. Connection to Nepal (How this topic applies to life or geography in Nepal).
      4. Step-by-Step breakdown or Key Points.
      5. Analogy using local cultural items or geography.
      6. A 5-question deep-thinking quiz.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            concept: { type: Type.STRING },
            objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
            explanation: { type: Type.STRING },
            nepalContext: { type: Type.STRING },
            keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            analogy: { type: Type.STRING },
            quickQuiz: { type: Type.ARRAY, items: { type: Type.STRING } },
            followUpSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["concept", "objectives", "explanation", "nepalContext", "keyPoints", "analogy", "quickQuiz", "followUpSuggestions"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }

  static async eduFollowUp(context: string, question: string): Promise<string> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this lesson context: "${context}", answer this student follow-up question: "${question}". Keep the explanation simple, encouraging, and accurate to the NEB syllabus.`
    });
    return response.text || "I'm sorry, I couldn't process that question. Could you try rephrasing?";
  }

  static async analyzeSymptoms(symptoms: string): Promise<any> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Symptom analysis: "${symptoms}". Provide a professional diagnosis (with disclaimer), recommended specialist type, and list 3 major hospitals in Nepal.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosis: { type: Type.STRING },
            specialist: { type: Type.STRING },
            hospitals: { type: Type.ARRAY, items: { type: Type.STRING } },
            urgency: { type: Type.STRING }
          },
          required: ["diagnosis", "specialist", "hospitals", "urgency"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }

  static async analyzeAgriLocation(location: string, crop: string): Promise<any> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze ${location} for ${crop} in Nepal. Include soil tips and suitability.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suitability: { type: Type.STRING },
            soilTips: { type: Type.STRING },
            bestVariety: { type: Type.STRING },
            climateRisk: { type: Type.STRING }
          },
          required: ["suitability", "soilTips", "bestVariety", "climateRisk"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }

  static async generateItinerary(dest: string, budget: string, days: string): Promise<any> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Plan ${days} days in ${dest} with ${budget} budget. Indicate if it is high altitude.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            isHighAltitude: { type: Type.BOOLEAN },
            plan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  desc: { type: Type.STRING },
                  budgetLine: { type: Type.STRING }
                },
                required: ["day", "desc", "budgetLine"]
              }
            }
          },
          required: ["title", "isHighAltitude", "plan"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }

  static async chat(msg: string): Promise<string> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: msg
    });
    return response.text || "";
  }
}

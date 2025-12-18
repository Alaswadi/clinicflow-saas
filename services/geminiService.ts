import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResponse } from "../types";

// In a real app, this key comes from a secure backend proxy or process.env
// We assume process.env.API_KEY is available as per instructions.
const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

export const getAIClinicalSuggestion = async (symptoms: string, age: number, gender: string): Promise<DiagnosisResponse> => {
  if (!apiKey) {
    console.warn("No API Key found. Returning mock response.");
    return {
      possibleDiagnosis: "Viral Upper Respiratory Infection (Mock)",
      reasoning: "Symptoms align with seasonal viral patterns. (API Key missing)",
      recommendedTests: ["CBC", "Influenza A/B"],
      recommendedMedicines: ["Paracetamol", "Fluids"]
    };
  }

  try {
    const model = "gemini-3-flash-preview";
    
    const prompt = `
      You are an expert medical AI assistant for a general practitioner.
      Patient Profile: Age ${age}, Gender ${gender}.
      Symptoms: "${symptoms}".
      
      Provide a clinical assessment including a likely diagnosis, reasoning, recommended lab tests, and generic medicine names.
      Be concise and professional.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            possibleDiagnosis: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            recommendedTests: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedMedicines: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["possibleDiagnosis", "reasoning", "recommendedTests", "recommendedMedicines"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as DiagnosisResponse;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate diagnosis suggestion.");
  }
};

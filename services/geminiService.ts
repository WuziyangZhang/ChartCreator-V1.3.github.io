import { GoogleGenAI, Schema, Type } from "@google/genai";
import { AnalysisResult, ChartType, DataPoint, InsightData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Input validation constants
const MAX_CHAR_LIMIT = 50000;
const MIN_CHAR_LIMIT = 10;

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    chartType: {
      type: Type.STRING,
      enum: ["BAR", "LINE", "AREA", "PIE", "SCATTER", "COMPOSED", "RADAR", "RADIAL"],
      description: "The most suitable chart type for the data."
    },
    title: {
      type: Type.STRING,
      description: "A professional title for the chart."
    },
    description: {
      type: Type.STRING,
      description: "A short description of what the chart shows."
    },
    xAxisKey: {
      type: Type.STRING,
      description: "The JSON key to use for the X-axis (usually the category or time)."
    },
    dataKeys: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "The JSON keys to use for the data series (Y-axis values)."
    },
    colors: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Hex color codes for the data series. Use professional palettes (e.g., Indigo, Emerald, Slate)."
    },
    data: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The label for the x-axis" },
          value1: { type: Type.NUMBER, description: "Primary value if applicable" },
          value2: { type: Type.NUMBER, description: "Secondary value if applicable" },
          value3: { type: Type.NUMBER, description: "Tertiary value if applicable" }
        },
      },
      description: "The transformed data optimized for Recharts. Use keys matching 'dataKeys'."
    },
    insights: {
      type: Type.OBJECT,
      properties: {
        en: { type: Type.STRING, description: "Professional analysis in English (3-5 bullet points)." },
        zh: { type: Type.STRING, description: "Professional analysis in Chinese (3-5 bullet points)." }
      },
      required: ["en", "zh"]
    }
  },
  required: ["chartType", "title", "data", "xAxisKey", "dataKeys", "colors", "insights"]
};

// Schema specifically for regenerating insights
const insightSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    en: { type: Type.STRING, description: "Updated professional analysis in English." },
    zh: { type: Type.STRING, description: "Updated professional analysis in Chinese." }
  },
  required: ["en", "zh"]
};

/**
 * Validates input data before sending to AI to save tokens and prevent errors.
 */
const validateInput = (data: string): void => {
  if (!data || typeof data !== 'string') {
    throw new Error("Invalid data format provided.");
  }
  if (data.length < MIN_CHAR_LIMIT) {
    throw new Error("Data is too short to analyze.");
  }
  // Basic check for table-like structure (commas for CSV, brackets for JSON)
  if (!data.includes(',') && !data.includes('{') && !data.includes('\t')) {
    console.warn("Data does not look like CSV or JSON, but proceeding.");
  }
};

export const analyzeDataWithGemini = async (rawData: string, requirements?: string): Promise<AnalysisResult> => {
  try {
    validateInput(rawData);

    const model = "gemini-2.5-flash";
    const prompt = `
      You are an expert Data Scientist and Visualization Specialist.
      Analyze the provided raw data and generate a visualization config based on the user's specific requirements.
      
      User Requirements (CRITICAL):
      "${requirements || "None provided. Identify the best insights and structure automatically."}"
      
      Your tasks:
      1. Understand the User Requirements above. If they ask for specific dimensions, axes, or aggregations, PRIORITIZE them.
      2. Identify the structure and meaningful metrics in the raw data.
      3. Choose the BEST chart type to visualize this data (or the one requested).
      4. Clean and transform the data into a JSON array suitable for a charting library. 
         - Ensure numerical values are numbers, not strings.
         - Handle missing values gracefully (skip or zero).
         - Limit to reasonable amount of data points (max 20) for clarity if the dataset is huge, summarizing/aggregating if necessary.
      5. Generate professional insights in both English and Chinese.
      6. Map the data keys dynamically. If you have multiple series, ensure 'dataKeys' lists them all.
         IMPORTANT: The 'data' array objects should have properties that exactly match the strings in 'xAxisKey' and 'dataKeys'.
      
      Raw Data:
      ${rawData.substring(0, MAX_CHAR_LIMIT)}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const result = JSON.parse(text);

    return {
      chartType: result.chartType as ChartType,
      data: result.data,
      config: {
        xAxisKey: result.xAxisKey,
        dataKeys: result.dataKeys,
        colors: result.colors,
        title: result.title,
        description: result.description || ""
      },
      insights: result.insights,
      rawData: rawData 
    };

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    // Standardize error messages
    const msg = error.message || "Unknown error";
    if (msg.includes("429")) throw new Error("Rate limit exceeded. Please try again in a moment.");
    if (msg.includes("SAFETY")) throw new Error("Data flagged by safety filters.");
    throw new Error(`Failed to analyze data: ${msg}`);
  }
};

export const regenerateInsights = async (data: DataPoint[], chartTitle: string): Promise<InsightData> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      The user has manually edited the data for the chart titled "${chartTitle}".
      Please analyze this NEW dataset and provide updated insights.
      
      New Data Context:
      ${JSON.stringify(data).substring(0, MAX_CHAR_LIMIT)}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: insightSchema,
        temperature: 0.4,
      }
    });

    const text = response.text;
    if (!text) return { en: "Could not regenerate insights.", zh: "无法重新生成洞察。" };
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Insight Regeneration Error:", error);
    return { en: "Error updating insights.", zh: "更新洞察时出错。" };
  }
};

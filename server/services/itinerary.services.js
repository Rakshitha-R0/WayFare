import Itinerary from "../model/itinerary.model.js";
import asyncHandler from "express-async-handler";
import OpenAI from "openai";

export const ItineraryPlan = asyncHandler(async (req) => {
  try {
    const { travelType, location, startDate, endDate, budget } = req.body;
    const client = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });
  
    const messages = [
      {
        role: "user",
        content: `Create a travel itinerary for travel type ${travelType} for the location ${location} from date (${startDate} to date ${endDate},and budget of  $${budget}). Return JSON:
        {
          "days": [{
            "date": "YYYY-MM-DD",
            "plan": ["activity/place 1", "activity/place 2"],
            "cost": 0,
            "tip": "daily tip"
          }],
          "total": {
            "stay": 0,
            "food": 0,
            "travel": 0
          },
          "tips": ["general tip 1", "general tip 2"]
        }`,
      },
    ];
  
    const response = await client.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages,
    });
  
    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error("No response from OpenAI");
    }
  
    let content = response.choices[0].message.content;
  
    content = content.replace(/```json\s*|```/g, "").trim();
    const match = content.match(/{[\s\S]*}/);
  
    if (!match) {
      throw new Error("Unable to parse JSON from the AI response.");
    }
  
    const jsonData = JSON.parse(match[0]);
  
    const payload = {
      ...req.body,
      itinerary: jsonData,
      originalPrompt: messages[0].content,
      originalResponse: content
    };
  
    await Itinerary.create(payload);
  
    return { message: "Success", data: jsonData };
  
  } catch (error) {
    console.error("Error in ItineraryPlan:", error.message);
    throw error;
  }
  
});

export const getItineraryPlan = asyncHandler(async () => {
  const ExistingItinerary = await Itinerary.find();
  if (!ExistingItinerary) {
    let err = new Error("Itinerary not found");
    err.statusCode = 404;
    throw err;
  }
  return ExistingItinerary;
});

export const DeleteItinerary = asyncHandler(async (id) => {
  const DeleteTravelPlan = await Itinerary.findByIdAndDelete(id);
  if (!DeleteTravelPlan) {
    let err = new Error("Itinerary not found");
    err.statusCode = 404;
    throw err;
  }
  return DeleteTravelPlan;
})

import Itinerary from "../model/itinerary.model.js";
import asyncHandler from "express-async-handler";
import axios from "axios";
// import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";

export const ItineraryPlan = asyncHandler(async (req) => {
  try {
    const { travelType, location, startDate, endDate, budget } = req.body;
    // const client = new OpenAI({
    //   apiKey: process.env.OPEN_AI_KEY,
    //   baseURL: "https://openrouter.ai/api/v1",
    // });

    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        `Create a travel itinerary for a ${travelType} trip to ${location} from ${startDate} to ${endDate}, with a total budget of ₹${budget}. Return the result in the following JSON format:
  {
    "days": [
      {
        "date": "YYYY-MM-DD",
        "plan": ["activity/place 1", "activity/place 2"],
        "cost": 0,
        "tip": "daily tip"
      }
    ],
    "total": {
      "stay": 0,
      "food": 0,
      "travel": 0
    },
    "tips": [
      "general tip 1",
      "general tip 2"
    ]
  }`,
      ],
      role: "A friendly travel agent",
      temperature: 0.5,
    });

    // console.log(response.text);

    if (!response || !response.text) {
      throw new Error("No response from Google GenAI");
    }

    let content = response.text;

    content = content.replace(/```json\s*|```/g, "").trim();
    const match = content.match(/{[\s\S]*}/);

    if (!match) {
      throw new Error("Unable to parse JSON from the AI response.");
    }

    const jsonData = match[0] ? JSON.parse(match[0]) : null;

    let payload = req.body;
    payload.itinerary = jsonData;
    if (req.userId) {
      payload.userID = req.userId;
    }
    await Itinerary.create(payload);

    return { message: "Success", data: jsonData };
  } catch (error) {
    console.error("Error in ItineraryPlan:", error.message);
    throw error;
  }
});

export const getItineraryPlan = asyncHandler(async (req) => {
  const ExistingItinerary = await Itinerary.find({ userID: req.userId });

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
});

export const autoComplete = asyncHandler(async (req) => {
  const { location } = req.query;
  console.log(location, req.query);

  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json",
    {
      params: {
        input: location,
        key: process.env.GOOGLE_API_CLOUD,
      },
    }
  );

  console.log(response.data);

  return response.data.predictions.map((prediction) => prediction.description);
});

export const getItineraryById = asyncHandler(async (id) => {
  const itinerary = await Itinerary.findById(id);
  if (!itinerary) {
    let err = new Error("Itinerary not found");
    err.statusCode = 404;
    throw err;
  }
  return itinerary;
});

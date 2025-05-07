import asyncHandler from "express-async-handler";
import { ItineraryPlan, getItineraryPlan, DeleteItinerary, autoComplete } from "../services/itinerary.services.js";

export const createNewItinerary = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    
const newItinerary = await ItineraryPlan(req);
console.log(newItinerary);

    if (!newItinerary) {
        let err = new Error("Failed to create itinerary");
        err.statusCode = 500;
        return next(err);
    }
    res.status(201).json(newItinerary);
    
})

export const getItinerary = asyncHandler(async (req, res, next) => {
    const ExistingItinerary = await getItineraryPlan();
    if (!ExistingItinerary) {
        let err = new Error("Itinerary not found");
        err.statusCode = 404;
        throw err;
    }
    res.status(200).json(ExistingItinerary);
})

export const deleteItinerary = asyncHandler(async (req, res, next) => {
    const deletedTravelPlan = await DeleteItinerary(req.params.id);
    if (!deletedTravelPlan) {
        let err = new Error("Itinerary not found");
        err.statusCode = 404;
        return next(err);
    }
    res.status(200).json({data: deletedTravelPlan, message: "Itinerary deleted successfully" });
})

export const getAutoComplete = asyncHandler(async (req, res, next) => {
    let autocomplete = await autoComplete(req);
    if (!autocomplete) {
        res.status(404).json({ message: "No data found" });
        return;
    }
    res.status(200).json(autocomplete);
})
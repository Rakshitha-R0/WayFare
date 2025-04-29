import { createItinerary } from "../services/itinerary.services";
import asyncHandler from "express-async-handler";

export const createNewItinerary = asyncHandler(async (req, res, next) => {
    const newItinerary = await createItinerary(req);
    if (!newItinerary) {
        let err = new Error("Itinerary not created");
        err.statusCode = 400;
        throw err;
    }
    res.status(201).json(newItinerary);
})

export const getItineraryByName = asyncHandler(async (req, res, next) => {
    const ExistingItinerary = await getItinerary(req);
    if (!ExistingItinerary) {
        let err = new Error("Itinerary not found");
        err.statusCode = 404;
        throw err;
    }
    res.status(200).json(ExistingItinerary);
}) 
import Itinerary from "../model/itinerary.model";
import asyncHandler from "express-async-handler";

export const createItinerary = asyncHandler(async (req) => {
    const newItinerary = await Itinerary.create(req.body);
    if (!newItinerary) {
        let err = new Error("Itinerary not created");
        err.statusCode = 400;
        throw err;
    }
    return newItinerary;
})

export const getItinerary = asyncHandler(async (req) => {
    const ExistingItinerary = await Itinerary.findById(req.params.id);
    if (!ExistingItinerary) {
        let err = new Error("Itinerary not found");
        err.statusCode = 404;
        throw err;
    }
    return ExistingItinerary;
})
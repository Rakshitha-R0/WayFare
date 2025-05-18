import express from "express";
import { createNewItinerary, getItinerary, deleteItinerary, getAutoComplete, getItineraries } from "../controllers/itinerary.controllers.js";
import validate from "../middleware/validation.js";
import itinerarySchema  from '../validations/itinerary.validation.js';
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/", auth, validate(itinerarySchema), createNewItinerary);
router.get("/", auth, getItineraries);
router.delete("/:id", auth, deleteItinerary);
router.get("/autocomplete", auth, getAutoComplete);
router.get("/:id", auth, getItinerary);


export default router;

import express from "express";
import { createNewItinerary, getItinerary, deleteItinerary } from "../controllers/itinerary.controllers.js";
import validate from "../middleware/validation.js";
import itinerarySchema  from '../validations/itinerary.validation.js';
const router = express.Router();

router.post("/", validate(itinerarySchema), createNewItinerary);
router.get("/", getItinerary);
router.delete("/:id", deleteItinerary);

export default router;

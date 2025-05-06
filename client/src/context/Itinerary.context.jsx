import { useContext, createContext, useEffect, useState } from "react";
import useAuth from "./Auth.context";
import axios from "../utils/axios";

const ItineraryContext = createContext();

export const ItineraryProvider = ({ children }) => {
    const { token } = useAuth();
    const [itineraries, setItineraries] = useState([]);

    useEffect(() => {
        if (token) {
            fetchItineraries();
        }
    }, [token]);

    const fetchItineraries = async () => {
        if (!token) {
            console.error("No token found. Cannot fetch itineraries.");
            return;
        }
        try {
            const response = await axios.get("/itinerary", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("itinerary context",response);
            
            setItineraries(response.data);
        } catch (err) {
            console.error("Error fetching itineraries:", err);
        }
    };

    const deleteItinerary = async (id) => {
        try {
            await axios.delete(`/itinerary/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItineraries((prev) => prev.filter((itinerary) => itinerary._id !== id));
            alert("Itinerary deleted successfully!");
        } catch (error) {
            console.error("Error deleting itinerary:", error);
        }
    };

    return (
        <ItineraryContext.Provider value={{ itineraries, setItineraries, deleteItinerary }}>
            {children}
        </ItineraryContext.Provider>
    );
};

export default function useItinerary() {
    return useContext(ItineraryContext);
}
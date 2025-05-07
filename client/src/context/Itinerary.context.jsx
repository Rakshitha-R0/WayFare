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
        try {
            const response = await axios.get("/itinerary", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItineraries((prev) => [...prev, ...response.data]);
        } catch (error) {
            console.error("Error fetching itineraries:", error);
        }
    };

    return (
        <ItineraryContext.Provider value={{ itineraries, setItineraries }}>
            {children}
        </ItineraryContext.Provider>
    );
};

export default function useItinerary() {
    return useContext(ItineraryContext);
}
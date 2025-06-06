import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import useAuth from "../context/Auth.context";
import axios from "../utils/axios";
import Navbar from "../component/NavBar";
import ItineraryForm from "../component/Itinerary/ItineraryForm";
import ItineraryList from "../component/Itinerary/ItineraryList";
import { useTheme } from "@mui/material/styles";
import Footer from "../component/Footer";

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const Home = () => {
  const { token } = useAuth();
  const theme = useTheme();

  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [debouncedInput, setDebouncedInput] = useState("");
  const [formData, setFormData] = useState({
    travelType: "",
    location: "",
    startDate: "",
    endDate: "",
    budget: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedInput.length > 1) {
        try {
          const res = await axios.get("/itinerary/autocomplete", {
            params: { location: debouncedInput },
            headers: { Authorization: `Bearer ${token}` },
          });
          setSuggestions(res.data);
        } catch (err) {
          console.error("Error fetching suggestions", err);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [debouncedInput, token]);

  const fetchItineraries = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/itinerary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItineraries(response.data);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchItineraries();
    }
  }, [token, fetchItineraries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, location: query });
  };

  const handleLocationChange = (e) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenBackdrop(true);
    try {
      await axios.post("/itinerary", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        travelType: "",
        location: "",
        startDate: "",
        endDate: "",
        budget: "",
      });
      setQuery("");
      await fetchItineraries();
      setSnackbarMsg("Itinerary created");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMsg("Failed to create itinerary");
      setOpenSnackbar(true);
      console.error("Error creating itinerary:", error);
    } finally {
      setOpenBackdrop(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/itinerary/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchItineraries();
      setSnackbarMsg("Itinerary deleted successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMsg("Failed to delete itinerary");
      setOpenSnackbar(true);
      console.error("Error deleting itinerary:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const handleSelect = (description) => {
    setQuery(description);
    setFormData((prev) => ({ ...prev, location: description }));
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      const selected = suggestions[activeIndex];
      handleSelect(selected);
    }
  };

  const suggestionStyles = {
    position: "absolute",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: 1,
    zIndex: 1000,
    mt: 0.5,
    maxHeight: 200,
    overflowY: "auto",
  };

  return token ? (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid>
              <ItineraryForm
                formData={formData}
                query={query}
                suggestions={suggestions}
                activeIndex={activeIndex}
                onSubmit={handleSubmit}
                onInputChange={handleInputChange}
                onLocationChange={handleLocationChange}
                onLocationSelect={handleSelect}
                onKeyDown={handleKeyDown}
                suggestionStyles={suggestionStyles}
              />
            </Grid>
            <Grid>
              <ItineraryList
                itineraries={itineraries}
                isLoading={isLoading}
                onDelete={handleDelete}
                capitalizeWords={capitalizeWords}
              />
            </Grid>
          </Grid>
        </Container>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMsg}
        />
      </Box>
      <Footer />
    </>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    />
  );
};

export default Home;

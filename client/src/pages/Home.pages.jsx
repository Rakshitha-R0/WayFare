import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios.js";
import useAuth from "../context/Auth.context";
import useItinerary from "../context/Itinerary.context";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const { token } = useAuth();
  const { itineraries, setItineraries, deleteItinerary } = useItinerary();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    travelType: "",
    location: "",
    startDate: "",
    endDate: "",
    budget: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("token ",token);
      
      const response = await axios.post("/itinerary", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItineraries((prev) => [...prev, response.data]);
      alert("Itinerary created successfully!");
    } catch (error) {
      console.error("Error creating itinerary:", error);
    }
  };


  return (
    <Box>
      <Container maxWidth="xl" sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                Create a Travel Itinerary
              </Typography>
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="travel-type-label">Travel Type</InputLabel>
                  <Select
                    labelId="travel-type-label"
                    label="Travel Type"
                    name="travelType"
                    value={formData.travelType}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="">Select a travel type</MenuItem>
                    <MenuItem value="solo">Solo Travel</MenuItem>
                    <MenuItem value="family">Family Vacation</MenuItem>
                    <MenuItem value="business">Business Trip</MenuItem>
                    <MenuItem value="romantic">Romantic Getaway</MenuItem>
                    <MenuItem value="adventure">Adventure Travel</MenuItem>
                    <MenuItem value="cultural">Cultural Experience</MenuItem>
                    <MenuItem value="luxury">Luxury Vacation</MenuItem>
                    <MenuItem value="budget">Budget Travel</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="Budget"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <Button type="submit" variant="contained" fullWidth>
                  Create Itinerary
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Itineraries List */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                Saved Itineraries
              </Typography>
              {itineraries?.length > 0 ? (
                <List>
                  {itineraries.map((itinerary) => (
                    <ListItem
                      key={`${itinerary._id}-${itinerary.location}`}
                      sx={{
                        borderBottom: "1px solid #ddd",
                        paddingBottom: 2,
                        marginBottom: 2,
                      }}
                    >
                      <ListItemText
                        primary={`Itinerary: ${itinerary.location}`}
                        secondary={
                          <span>
                            <Typography variant="body2" component="span">
                              <strong>Travel Type:</strong> {itinerary.travelType}
                            </Typography>
                            <br />
                            <Typography variant="body2" component="span">
                              <strong>Start Date:</strong> {itinerary.startDate}
                            </Typography>
                            <br />
                            <Typography variant="body2" component="span">
                              <strong>End Date:</strong> {itinerary.endDate}
                            </Typography>
                            <br />
                            <Typography variant="body2" component="span">
                              <strong>Budget:</strong> ${itinerary.budget}
                            </Typography>
                            <br />
                            {/* <Typography variant="body2" component="span">
                              <strong>Itinerary:</strong> {JSON.stringify(itinerary.itinerary)}
                            </Typography>
                            <br /> */}
                          </span>
                        }
                      />
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteItinerary(itinerary._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No itineraries found.</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
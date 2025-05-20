import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Navbar from '../component/NavBar';
import Footer from '../component/Footer';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../context/Auth.context';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TimelineIcon from '@mui/icons-material/Timeline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const featuredLocations = [
  {
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    description: 'City of Love and Lights',
    alt: 'Eiffel Tower at sunset in Paris'
  },
  {
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    description: 'Where Tradition Meets Future',
    alt: 'Tokyo cityscape with Mount Fuji'
  },
  {
    name: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620',
    description: 'The City That Never Sleeps',
    alt: 'Manhattan skyline with Empire State Building'
  },
  {
    name: 'Sydney, Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
    description: 'Harbor City Paradise',
    alt: 'Sydney Opera House and Harbor Bridge'
  },
  {
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    description: 'Modern Desert Miracle',
    alt: 'Dubai skyline with Burj Khalifa'
  }
];

const features = [
  {
    icon: <FlightTakeoffIcon fontSize="large" />,
    title: 'Smart Travel Planning',
    description: 'AI-powered itinerary creation tailored to your preferences'
  },
  {
    icon: <LocationOnIcon fontSize="large" />,
    title: 'Popular Destinations',
    description: 'Explore top-rated locations around the world'
  },
  {
    icon: <TimelineIcon fontSize="large" />,
    title: 'Customizable Schedules',
    description: 'Flexible planning that fits your timeline'
  },
  {
    icon: <AttachMoneyIcon fontSize="large" />,
    title: 'Budget Friendly',
    description: 'Options for every budget range'
  },
];

const Welcome = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: '70vh', md: 'calc(100vh - 64px)' },
          backgroundImage: `linear-gradient(rgba(0, 0, 0, ${isDark ? '0.7' : '0.5'}), rgba(0, 0, 0, ${isDark ? '0.7' : '0.5'})), url('/src/assets/welcome.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid >
              <Typography variant="h2" component="h1" gutterBottom
                sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
                Plan Your Perfect Journey
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Create custom travel itineraries for free with our AI-powered platform
              </Typography>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                size="large"
                startIcon={<ExploreIcon />}
                sx={{
                  bgcolor: 'success.main',
                  '&:hover': { bgcolor: 'success.dark' },
                  py: 1.5,
                  px: 4,
                }}
              >
                Start Planning
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{
        py: 8,
        bgcolor: 'background.default',
        color: 'text.primary'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Why Choose Wayfarer?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {features.map((feature, index) => (
              <Grid key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    boxShadow: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    minHeight: 250,
                    bgcolor: 'background.default',
                    color: 'text.primary',
                  }}
                >
                  <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 3,
                    gap: 2
                  }}>
                    <Box sx={{
                      color: 'primary.main',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 60
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        flexGrow: 0
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Locations */}
      <Box sx={{
        py: 8,
        bgcolor: 'background.paper',
        color: 'text.primary'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Featured Destinations
          </Typography>
          <Typography variant="subtitle1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
            Create free itineraries for these popular locations
          </Typography>
          <Grid container spacing={3}>
            {featuredLocations.map((location, index) => (
              <Grid key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    '&:hover': {
                      boxShadow: 6
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={location.image}
                    alt={location.alt}
                    loading="lazy"
                    sx={{
                      bgcolor: 'grey.300',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {location.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {location.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Welcome;
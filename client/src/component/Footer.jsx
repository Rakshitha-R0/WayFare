import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Container, Grid, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      padding: "20px 0",
      marginTop: "40px",
      position: "relative",
      fontSize: "14px",
      fontFamily: "Arial, sans-serif",
      fontWeight: "400",
      lineHeight: "1.5",
      letterSpacing: "0.5px",
      background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
      boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)",
      borderTop: "1px solid #ddd",
    }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid >
            <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
              About Wayfarer
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              Wayfarer is your ultimate travel companion. Plan your trips, explore destinations, and create unforgettable memories with ease.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid >
            <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
              Quick Links
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  Signup
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Social Media Links */}
          <Grid >
            <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#007bff" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#007bff" }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#007bff" }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            textAlign: "center",
            marginTop: "20px",
            paddingTop: "10px",
          }}
        >
          <Typography variant="body2" sx={{ color: "#555" }}>
            © {new Date().getFullYear()} Wayfarer. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
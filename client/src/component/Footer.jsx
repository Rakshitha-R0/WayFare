import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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
          <Grid >
            <Typography variant="h6" gutterBottom>
              About Wayfarer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your AI-powered travel companion for creating perfect itineraries.
              Plan your next adventure with ease.
            </Typography>
          </Grid>
          <Grid >
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign Up
              </Link>
            </Stack>
          </Grid>
          <Grid >
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                color="primary"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="primary"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                color="primary"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="primary"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Wayfarer. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
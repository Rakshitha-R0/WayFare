import {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/Auth.context";
import axios from "../utils/axios";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../context/Theme.context";

const settings = ["Profile", "Logout"];

const UploadButton = styled(Button)({
  marginTop: "1rem",
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { token, user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleProfileClick = () => {
    handleCloseUserMenu();
    setOpenModal(true);
  };
  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate("/login");
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file));
    }
  };
  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("userImage", selectedFile);
    try {
      let res = await axios.put(`/users/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setOpenModal(false);
      setSelectedImage(null);
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <img src={logo} alt="logo" style={{ height: "50px" }} />
            </Link>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  ml: 1,
                  color: "text.primary",
                }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <Box
                sx={{
                  flexGrow: 0,
                  gap: "1em",
                  display: { md: "flex", alignItems: "center" },
                }}
              >
                {token ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={user?.username}
                          src={user?.userImage}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={
                            setting === "Profile"
                              ? handleProfileClick
                              : setting === "Logout"
                              ? handleLogout
                              : handleCloseUserMenu
                          }
                        >
                          <Typography sx={{ textAlign: "center" }}>
                            {setting}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        backgroundColor: "green",
                        padding: "0.5em 1em",
                        borderRadius: "8px",
                      }}
                    >
                      Signup
                    </Link>
                  </>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="profile-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography
            id="profile-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Update Profile Picture
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Preview"
              src={selectedImage || user?.userImage}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="profile-image-upload"
              onChange={handleImageUpload}
            />
            <label htmlFor="profile-image-upload">
              <Button variant="contained" component="span">
                Choose Image
              </Button>
            </label>
            <UploadButton
              variant="contained"
              color="primary"
              disabled={!selectedImage}
              onClick={uploadImage}
            >
              Upload
            </UploadButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Navbar;

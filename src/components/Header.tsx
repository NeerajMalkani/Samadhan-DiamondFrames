import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import Home from "@mui/icons-material/Home";
import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import "../theme/Styles.css";
import { theme } from "../theme/AppTheme";
import { useNavigate } from "react-router-dom";
import { RemoveSession } from "../utils/sessions";

const Header = () => {
  const navigate = useNavigate();
  const pageSelected = "Home";
  const pages = [
    { title: "Home", icon: <Home /> },
    { title: "Dashboard", icon: <Dashboard />, click: () => {} },
    { title: "App Admin", icon: <Person />, click: () => {} },
    {
      title: "Logout",
      icon: <Logout />,
      click: () => {
        RemoveSession("isLogin");
        navigate(`/login`);
      },
    },
  ];
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap sx={{ color: "white", mr: 2 }}>
            Samadhan
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
            {pages.map((page) => (
              <Box key={page.title}>
                <Button startIcon={page.icon} onClick={page.click} sx={{ ml: 2, color: pageSelected === page.title ? theme.palette.secondary.main : "white", display: { xs: "none", md: "flex" } }}>
                  {page.title}
                </Button>
                <IconButton size="large" onClick={page.click} sx={{ color: pageSelected === page.title ? theme.palette.secondary.main : "white", display: { xs: "block", md: "none" } }}>
                  {page.icon}
                </IconButton>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

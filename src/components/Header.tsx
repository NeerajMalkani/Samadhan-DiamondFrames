import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Box, Button, CssBaseline, IconButton, SwipeableDrawer, Toolbar, Typography } from "@mui/material";
import Home from "@mui/icons-material/Home";
import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import "../theme/Styles.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import DrawerItems from "./DrawerItems";
import { theme } from "../theme/AppTheme";
import { useCookies } from "react-cookie";

const drawerWidth = 280;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = () => {
  const objOpen = React.useState(false);
  const navigate = useNavigate();
  let pageSelected = "";
  const cuurURL = window.location.href;
  const [cookies, setCookie, removeCookie] = useCookies(["dfc"]);
  switch (true) {
    case cuurURL.includes("home"):
      pageSelected = "Home";
      break;
    case cuurURL.includes("dashboard"):
      pageSelected = "Dashboard";
      break;
    case cuurURL.includes("appadmin"):
      pageSelected = "AppAdmin";
      break;
  }
  const pages = [
    {
      title: "Home",
      icon: <Home />,
      click: () => navigate(`/Samadhan-DiamondFrames/home`),
    },
    {
      title: "Dashboard",
      icon: <Dashboard />,
      click: () => navigate(`/Samadhan-DiamondFrames/dashboard`),
    },
    { title: "Profile", icon: <Person />, click: () => {} },
    {
      title: "Logout",
      icon: <Logout />,
      click: () => {      
        removeCookie("dfc");
        navigate(`/Samadhan-DiamondFrames/login`);
      },
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <Toolbar disableGutters>
            <IconButton size="large" sx={{ mr: 2, color: "white", display: pageSelected === "" || pageSelected === "Dashboard" ? "flex" : "none" }} onClick={() => objOpen[1](!objOpen[0])}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap letterSpacing=".2rem" sx={{ color: "white", mr: 2, display: { xs: pageSelected === "" || pageSelected === "Dashboard" ? "none" : "flex", md: "flex" } }}>
              Samadhan
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
              {pages.map((page) => (
                <Box key={page.title}>
                  <Button  style={{ textTransform: "unset" }} startIcon={page.icon} onClick={page.click} sx={{ ml: 2, color: pageSelected === page.title ? theme.palette.secondary.main : "white", display: { xs: "none", md: "flex" } }}>
                    {page.title}
                  </Button>
                  <IconButton size="large" onClick={page.click} sx={{ color: pageSelected === page.title ? theme.palette.secondary.main : "white", display: { xs: "flex", md: "none" } }}>
                    {page.icon}
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      <React.Fragment key="left">
        <SwipeableDrawer anchor="left" open={objOpen[0]} onClose={() => objOpen[1](false)} onOpen={() => objOpen[1](true)}>
          <DrawerItems open={objOpen} />
        </SwipeableDrawer>
      </React.Fragment>
    </Box>
  );
};

export default Header;

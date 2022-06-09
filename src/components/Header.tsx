import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Box, Button, CssBaseline, IconButton, SwipeableDrawer, Toolbar, Typography } from "@mui/material";
import Home from "@mui/icons-material/Home";
import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import "../theme/Styles.css";
import { useNavigate } from "react-router-dom";
import { RemoveSession } from "../utils/sessions";
import React from "react";
import DrawerItems from "./DrawerItems";

const drawerWidth = 280;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Header = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  let pageSelected = "";
  const cuurURL = window.location.href;
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
      click: () => navigate(`/home`),
    },
    {
      title: "Dashboard",
      icon: <Dashboard />,
      click: () => navigate(`/dashboard`),
    },
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <Toolbar disableGutters>
            <IconButton size="large" sx={{ mr: 2, color: "white", display: pageSelected === "" || pageSelected === "Dashboard" ? "flex" : "none" }} onClick={() => setOpen(!open)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap letterSpacing=".2rem" sx={{ color: "white", mr: 2, display: { xs: pageSelected === "" || pageSelected === "Dashboard" ? "none" : "flex", md: "flex" } }}>
              Samadhan
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
              {pages.map((page) => (
                <Box key={page.title}>
                  <Button startIcon={page.icon} onClick={page.click} sx={{ ml: 2, color: pageSelected === page.title ? theme.palette.secondary.main : "white", display: { xs: "none", md: "flex" } }}>
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
        <SwipeableDrawer anchor="left" open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
          <DrawerItems />
        </SwipeableDrawer>
      </React.Fragment>
    </Box>
  );
};

export default Header;

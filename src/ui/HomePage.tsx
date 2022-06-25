import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Handshake from "@mui/icons-material/Handshake";
import Engineering from "@mui/icons-material/Engineering";
import Group from "@mui/icons-material/Group";
import Person from "@mui/icons-material/Person";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import InsertComment from "@mui/icons-material/InsertComment";
import Book from "@mui/icons-material/Book";
import Dashboard from "@mui/icons-material/Dashboard";
import "../theme/Styles.css";
import { CreateGeneralCards, CreateTotalUserCards } from "../components/Cards";
import { useCookies } from "react-cookie";

const HomePage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/Samadhan-DiamondFrames/login`);
  }, []);
  return (
    <Box height="100vh" sx={{ mt: 7 }}>
      <Header />
      <Container sx={{ padding: { xs: 2, md: 4 } }} maxWidth="xl">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h5">Total Users (256)</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {CreateTotalUserCards("Dealers", 85, <Handshake sx={{ color: "#553bbf", fontSize: 36 }} />, "#f4efff", "#553bbf")}
              {CreateTotalUserCards("Contractors", 56, <Engineering sx={{ color: "#9c33b6", fontSize: 36 }} />, "#f9e8ff", "#9c33b6")}
              {CreateTotalUserCards("General Users", 75, <Group sx={{ color: "#43b4ca", fontSize: 36 }} />, "#e7fbff", "#43b4ca")}
              {CreateTotalUserCards("Clients", 40, <Person sx={{ color: "#4cd2a7", fontSize: 36 }} />, "#e6fef5", "#4cd2a7")}
            </Grid>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h5" sx={{ mt: 2 }}>
              All Actions
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {CreateGeneralCards("Update Profile", <ManageAccounts sx={{ fontSize: 36 }} />)}
              {CreateGeneralCards("Suggestions", <InsertComment sx={{ fontSize: 36 }} />)}
              {CreateGeneralCards("Pocket Diary", <Book sx={{ fontSize: 36 }} />)}
              {CreateGeneralCards("Activity", <Dashboard sx={{ fontSize: 36 }} />)}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;

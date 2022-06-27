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
import SimpleImageSlider from "react-simple-image-slider";

const HomePage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/Samadhan-DiamondFrames/login`);
  }, []);

  const images = [
    { url: "images/1.jpg" },
    { url: "images/2.jpg" },
    { url: "images/3.jpg" },
    { url: "images/4.jpg" },
    { url: "images/5.jpg" },
    { url: "images/6.jpg" },
    { url: "images/7.jpg" },
  ];

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
              {CreateTotalUserCards("Dealers", 85, null, "#f4efff", "#553bbf")}
              {/* <Handshake sx={{ color: "#553bbf", fontSize: 36 }} /> */}
              {CreateTotalUserCards("Contractors", 56, null, "#f9e8ff", "#9c33b6")}
              {/* <Engineering sx={{ color: "#9c33b6", fontSize: 36 }} /> */}
              {CreateTotalUserCards("General Users", 75, null, "#e7fbff", "#43b4ca")}
              {/* <Group sx={{ color: "#43b4ca", fontSize: 36 }} /> */}
              {CreateTotalUserCards("Clients", 40, null, "#e6fef5", "#4cd2a7")}
              {/* <Person sx={{ color: "#4cd2a7", fontSize: 36 }} /> */}
            </Grid>
          </Grid>
          {/* <Grid item xs={4} sm={8} md={12}>
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
          </Grid> */}
<Grid>
<div>
      <SimpleImageSlider
        width={896}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
</Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;

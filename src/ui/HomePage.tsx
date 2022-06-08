import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { GetSession } from "../utils/sessions";
import Handshake from "@mui/icons-material/Handshake";
import Engineering from "@mui/icons-material/Engineering";
import Group from "@mui/icons-material/Group";
import Person from "@mui/icons-material/Person";
import "../theme/Styles.css";

const HomePage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (GetSession("isLogin") !== "true") {
      navigate(`/login`);
    }
  });
  return (
    <Box height="100vh">
      <Header />
      <Container sx={{ padding: { xs: 2, md: 4 } }} maxWidth="xl">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h5">Total Users (256)</Typography>
          </Grid>
          <Grid item xs={2} sm={4} md={3}>
            <Card>
              <CardContent className="flex-column flex-center">
                <div className="flex-center" style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#f4efff" }}>
                  <Handshake sx={{ color: "#553bbf", fontSize: 36 }} />
                </div>
                <Typography variant="h4" sx={{ mt: 2, color: "#553bbf" }}>
                  85
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Dealers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={3}>
            <Card>
              <CardContent className="flex-column flex-center">
                <div className="flex-center" style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#f9e8ff" }}>
                  <Engineering sx={{ color: "#9c33b6", fontSize: 36 }} />
                </div>
                <Typography variant="h4" sx={{ mt: 2, color: "#9c33b6" }}>
                  56
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Contractors
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={3}>
            <Card>
              <CardContent className="flex-column flex-center">
                <div className="flex-center" style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#e7fbff" }}>
                  <Group sx={{ color: "#43b4ca", fontSize: 36 }} />
                </div>
                <Typography variant="h4" sx={{ mt: 2, color: "#43b4ca" }}>
                  75
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  General Users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={3}>
            <Card>
              <CardContent className="flex-column flex-center">
                <div className="flex-center" style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#e6fef5" }}>
                  <Person sx={{ color: "#4cd2a7", fontSize: 36 }} />
                </div>
                <Typography variant="h4" sx={{ mt: 2, color: "#4cd2a7" }}>
                  40
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Client
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;

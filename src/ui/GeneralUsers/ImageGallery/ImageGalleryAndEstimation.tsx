import { Alert, AlertColor, Box, CircularProgress, Container, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { BrandNameModel } from "../../../models/Model";

const ImageGalleryAndEstimationPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [brandNamesList, setBrandNamesList] = useState<Array<BrandNameModel>>([]);

  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const CreateImageList = () => {
    let menuItems = [];
    brandNamesList.map((value: BrandNameModel, index: number) => {
      menuItems.push(
        <Grid sx={{ border: "1px solid rgba(0,0,0,0.12)" }}>
          <Typography>dsdf</Typography>
          <Typography>dsfsd</Typography>
          <div
            style={{ padding: "8px", cursor: "pointer" }}
            onClick={() => {
              navigate(`/generaluser/imagegallery/product?id=25`);
            }}
          >
            <img src="" alt="" style={{ maxWidth: 240, maxHeight: 240, border: "1px solid rgba(0,0,0,0.12)" }} />
          </div>
        </Grid>
      );
    });

    return menuItems;
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Service Catalogue and Image Gallery</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div>
                {brandNamesList.length === 0 ? (
                  <></>
                ) : (
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {CreateImageList()}
                  </Grid>
                )}
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ImageGalleryAndEstimationPage;

import { Alert, AlertColor, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Link, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/Header";
import { BrandNameModel, ButtonSettings, ImageGalleryEstimation } from "../../../models/Model";
import PrismaZoom from "react-prismazoom";
import { ArrowBack } from "@mui/icons-material";
import ShowsGrid from "../../../components/GridStructure";

const ImageGalleryProductPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
      searchParams.get("id");
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [brandNamesList, setBrandNamesList] = useState<Array<ImageGalleryEstimation>>([]);

  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [selectedImage, setSelectedImage] = useState("");
  const [imageOpen, setImageOpen] = useState(false);

  const buttonSetting: ButtonSettings = {
    isActionButton: false,
    actionButtons: [
      {
        title: "Go to Estimation",
        type: "contained",
        callBack: () => {},
      },
      {
        title: "Zoom",
        type: "contained",
        callBack: () => {},
      },
    ],
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleImageClose = () => {
    setImageOpen(false);
  };

  const handleCardClick = () => {};

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <IconButton
              aria-label="back"
              size="small"
              onClick={() => {
                navigate(`/generaluser/imagegallery`);
              }}
            >
              <ArrowBack fontSize="small" />
            </IconButton>
            <Typography sx={{ ml: 1 }} variant="h4">
              Service Catalogue and Image Gallery
            </Typography>
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
                  <div>{brandNamesList.length === 0 ? <></> : <ShowsGrid shows={brandNamesList} buttonSettings={buttonSetting} cardCallback={handleCardClick} />}</div>
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

      <Dialog open={imageOpen} onClose={handleImageClose} fullScreen={true}>
        <DialogTitle>Catalogue Images</DialogTitle>
        <DialogContent>
          <PrismaZoom allowPan={false} style={{ height: 640, display: "flex", justifyContent: "center" }}>
            <img alt="" style={{ height: 640 }} src={selectedImage} />
          </PrismaZoom>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageClose}>Cancel</Button>
          <Button onClick={() => {}}>Go to Estimation</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageGalleryProductPage;

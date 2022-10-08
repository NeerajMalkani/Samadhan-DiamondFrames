import { Alert, AlertColor, Box, CircularProgress, Container, Grid, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../../../api/Provider";
import ShowsGrid from "../../../components/GridStructure";
import Header from "../../../components/Header";
import NoData from "../../../components/NoData";
import { ButtonSettings, ImageGalleryEstimation } from "../../../models/Model";
import { communication } from "../../../utils/communication";
import ListIcon from "@mui/icons-material/List";

const ImageGalleryCategoryPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    }
  }, []);

 //#region Variables
  const [loading, setLoading] = useState(true);

  const [imageGalleryData, setImageGalleryData] = useState<Array<ImageGalleryEstimation>>([]);

  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
 //#endregion 

 //#region Functions
  const buttonSetting: ButtonSettings = {
    isActionButton: false,
    actionButtons: [],
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCardClick = (data: ImageGalleryEstimation) => {
    navigate(`/generaluser/imagegallery/product`, { state: { id: data.serviceID, name: data.serviceName, type: "gallery" } });
  };

  useEffect(() => {
    FetchImageGalleryData();
  }, []);

  const FetchImageGalleryData = () => {
    Provider.getAll("generaluserenquiryestimations/getimagegallery")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setImageGalleryData(response.data.data);
          }
        } else {
          setImageGalleryData([]);
          setSnackMsg(communication.NoData);
          setSnackbarType("info");
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
  };
//#endregion
 
  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h4">Service Catalogue & Image Gallery</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div>
                {imageGalleryData.length === 0 ? (
                  <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <ShowsGrid shows={imageGalleryData} buttonSettings={buttonSetting} cardCallback={handleCardClick} type="category" />
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

export default ImageGalleryCategoryPage;

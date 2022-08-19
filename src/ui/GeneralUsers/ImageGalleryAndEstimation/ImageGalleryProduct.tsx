import { Alert, AlertColor, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Link, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/Header";
import { ButtonSettings, ImageGalleryEstimation } from "../../../models/Model";
import PrismaZoom from "react-prismazoom";
import { ArrowBack } from "@mui/icons-material";
import ShowsGrid from "../../../components/GridStructure";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import Provider from "../../../api/Provider";
import { communication } from "../../../utils/communication";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { CyperKey } from "../../../utils/credentials";

const ImageGalleryProductPage = (route) => {
  let CryptoJS = require("crypto-js");
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  useEffect(() => {

    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      let ciphertext = CryptoJS.AES.decrypt(decodeURI(searchParams.get("id").toString()), CyperKey).toString();
      FetchImageGalleryData(parseInt(ciphertext));
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [imageGalleryData, setImageGalleryData] = useState<Array<ImageGalleryEstimation>>([]);

  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [selectedImage, setSelectedImage] = useState("");
  const [imageOpen, setImageOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const buttonSetting: ButtonSettings = {
    isActionButton: false,
    actionButtons: [
      {
        title: "Zoom",
        type: "text",
        callBack: (data: ImageGalleryEstimation) => {
          setSelectedImage(data.designImage);
          setImageOpen(true);
        },
      },
      {
        title: "Go to Estimation",
        type: "text",
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

  const handleCardClick = (data: ImageGalleryEstimation) => {
    setSelectedImage(data.designImage);
    setImageOpen(true);
  };

  const FetchImageGalleryData = (id: number) => {
    let params = {
      CategoryID: id,
    };

    Provider.getAll(`generaluserenquiryestimations/getimagegallerybycategoryid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setImageGalleryData(response.data.data);
            setCategoryName(response.data.data[0].serviceName);
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

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <IconButton
              aria-label="back"
              size="large"
              sx={{ marginTop: "-8px" }}
              onClick={() => {
                navigate(`/generaluser/imagegallery/category`);
              }}
            >
              <ArrowBack fontSize="small" />
            </IconButton>
            <Typography sx={{ ml: 1, display: "inline" }} variant="h4">
              {"Image Gallery » " + categoryName}
            </Typography>
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
                  <ShowsGrid shows={imageGalleryData} buttonSettings={buttonSetting} cardCallback={handleCardClick} type="product" />
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

import { Alert, AlertColor, Box, CircularProgress, Container, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ShowsGrid from "../../../components/GridStructure";
import Header from "../../../components/Header";
import { ImageGalleryEstimation } from "../../../models/Model";

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

  const [loading, setLoading] = useState(false);
  const [brandNamesList, setBrandNamesList] = useState<Array<ImageGalleryEstimation>>([{
    id: 0,
    srno: 1,
    imageName: "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320",
    categoryName: "zsdfgsdg",
    productName: "gdfgdf"
  },{
    id: 1,
    srno: 2,
    imageName: "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320",
    categoryName: "zsdfgsdg",
    productName: "gdfgdf"
  },{
    id: 1,
    srno: 2,
    imageName: "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320",
    categoryName: "zsdfgsdg",
    productName: "gdfgdf"
  },{
    id: 1,
    srno: 2,
    imageName: "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320",
    categoryName: "zsdfgsdg",
    productName: "gdfgdf"
  },{
    id: 1,
    srno: 2,
    imageName: "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320",
    categoryName: "zsdfgsdg",
    productName: "gdfgdf"
  },{
    id: 1,
    srno: 2,
    imageName: "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320",
    categoryName: "zsdfgsdg",
    productName: "gdfgdf"
  },{
    id: 1,
    srno: 2,
    imageName: "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320",
    categoryName: "zsdfgsdg",
    productName: "gdfgdf"
  },{
    id: 1,
    srno: 2,
    imageName: "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320",
    categoryName: "zsdfgsdg",
    productName: "gdfgdf"
  }]);

  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

 

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
                 <ShowsGrid shows={brandNamesList} actionButton={true}/>
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

import { Alert, AlertColor, Box, CircularProgress, Container, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/Header";
import { ArrowBack } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const ImageGalleryProductDetailsPage = () => {
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
  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [lengthFeet, setLengthFeet] = useState("1");
  const [lengthInches, setLengthInches] = useState("0");
  const [widthHeightFeet, setWidthHeightFeet] = useState("1");
  const [widthHeightInches, setWidthHeightInches] = useState("0");
  const [totalSqFt, setTotalSqFt] = useState<number>(0);
  const [buttonLoading, setButtonLoading] = useState(false);

  const CreateLengthFeet = (count: number) => {
    let menuItems = [];
    for (let i = 0; i < count; i++) {
      menuItems.push(
        <MenuItem key={i} value={i + 1}>
          {i + 1}
        </MenuItem>
      );
    }
    return menuItems;
  };

  const CalculateSqfeet = (lf: number, li: number, whf: number, whi: number) => {
    if (lf > 0 && li > -1 && whf > 0 && whi > -1) {
      let lengthInches = ((lf * 12 + li) * (whf * 12 + whi)) / 144;
      setTotalSqFt(parseFloat(lengthInches.toFixed(4)));
    } else {
      setTotalSqFt(0);
    }
  };

  const handleLFChange = (event: SelectChangeEvent, type: string) => {
    let lf: string = event.target.value;
    if (parseInt(lf) > 0) {
      setLengthFeet(event.target.value as string);
      if (type === "lengthFeet") {
        CalculateSqfeet(parseInt(lf), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(widthHeightInches));
      } else if (type === "lengthInches") {
        CalculateSqfeet(parseInt(lengthFeet), parseInt(lf), parseInt(widthHeightFeet), parseInt(widthHeightInches));
      } else if (type === "widthFeet") {
        CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(lf), parseInt(widthHeightInches));
      } else if (type === "widthInches") {
        CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(lf));
      }
    }
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
          {loading ? (
            <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid item xs={4} sm={8} md={12}>
                <Grid item xs={4} sm={4} md={6}>
                  <div>
                    <img src="" alt="" />
                  </div>
                </Grid>
                <Grid item xs={4} sm={4} md={6}>
                  <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Design Code</b>
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Category Name
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Design Code</b>
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Category Name
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Category Name</b>
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Category Name
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Product Name</b>
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Category Name
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
                <Typography sx={{ ml: 1 }} variant="h4">
                  Service Catalogue and Image Gallery
                </Typography>
                <Grid container columns={{ xs: 4, sm: 8, md: 12 }} sx={{ mt: 1 }}>
                  <Grid container xs={4} sm={4} md={4} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, width: "100%" }}>
                      <b>Length</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b>Feet</b>
                      </Typography>
                      <Select
                        value={lengthFeet}
                        onChange={(e) => {
                          handleLFChange(e, "lengthFeet");
                        }}
                      >
                        {CreateLengthFeet(50)}
                      </Select>
                    </Grid>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b>Inches</b>
                      </Typography>
                      <Select
                        value={lengthInches}
                        onChange={(e) => {
                          handleLFChange(e, "lengthInches");
                        }}
                      >
                        <MenuItem value="0">0</MenuItem>
                        {CreateLengthFeet(11)}
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid container xs={4} sm={4} md={4} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, width: "100%" }}>
                      <b>Width / Height</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b>Feet</b>
                      </Typography>
                      <Select
                        value={widthHeightFeet}
                        onChange={(e) => {
                          handleLFChange(e, "widthFeet");
                        }}
                      >
                        {CreateLengthFeet(50)}
                      </Select>
                    </Grid>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b>Inches</b>
                      </Typography>
                      <Select
                        value={widthHeightInches}
                        onChange={(e) => {
                          handleLFChange(e, "widthInches");
                        }}
                      >
                        <MenuItem value="0">0</MenuItem>
                        {CreateLengthFeet(11)}
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                    <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <b style={{ padding: 8 }}>Total (Sq.Ft)</b>
                      <label style={{ color: "#ff0000", marginLeft: "16px", border: "2px solid rgba(0,0,0,0.12)", padding: 8, borderRadius: "4px" }}>{totalSqFt}</label>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
                  <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={() => {}}>
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </>
          )}
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

export default ImageGalleryProductDetailsPage;

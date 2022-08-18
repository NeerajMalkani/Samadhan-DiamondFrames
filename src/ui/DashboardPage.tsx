import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../theme/Styles.css";
import { CreateGeneralCards, CreateTotalUserCards } from "../components/Cards";
import { useCookies } from "react-cookie";
import Provider from "../api/Provider";
import { RoleDetails } from "../models/Model";
import { LoadingButton } from "@mui/lab";
import { communication } from "../utils/communication";
import SimpleImageSlider from "react-simple-image-slider";
import TitlebarBelowImageList from "../components/ImageGallery";
import CalculateIcon from "@mui/icons-material/Calculate";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import Icon from "@mui/material/Icon";
import PrismaZoom from "react-prismazoom";
import { theme } from "../theme/AppTheme";

function useWindowSize(callback: Function) {
  useLayoutEffect(() => {
    function updateSize() {
      if (callback !== undefined) {
        callback(window.innerWidth, window.innerHeight);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
}

const DashboardPage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["dfc"]);
  const [role, setRole] = useState("--Select--");
  const [roleID, setRoleID] = useState<number>(0);
  const [roleError, setRoleError] = useState<boolean>(false);
  const [roleErrorText, setRoleErrorText] = useState<string>("");

  const [userName, setUserName] = useState("");
  const [userCountData, setUserCountData] = useState<RoleDetails[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [CookieRoleID, SetCookieRoleID] = useState(0);
  const [CookieRoleName, SetCookieRolName] = useState("");
  const [CookieUserName, SetCookieUserName] = useState("");
  const [CookieUserID, SetCookieUseID] = useState(0);
  const [open, setOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [imageOpen, setImageOpen] = useState(false);

  const [catalogueFullData, setCatalogueFullData] = useState([]);
  const [catalogueCategoryImages, setCatalogueCategoryImages] = useState([]);
  const [catalogueImages, setCatalogueImages] = useState([]);

  const [galleryWidth, setGalleryWidth] = useState(896);
  const [galleryHeight, setGalleryHeight] = useState(504);

  const arrQuickLinks = [
    { title: "Pocket Diary", icon: "CalculateIcon", backgroundColor: "" },
    { title: "Feedbacks", icon: "AnnouncementIcon", backgroundColor: "" },
  ];

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    else {
      SetCookieRoleID(cookies.dfc.RoleID);
      SetCookieRolName(cookies.dfc.RoleName);
      SetCookieUserName(cookies.dfc.FullName);
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);

  useWindowSize((widthScreen, heightScreen) => {
    if (widthScreen < 896) {
      setGalleryWidth(widthScreen - 60);
      setGalleryHeight(((widthScreen - 60) * 504) / 896);
    } else {
      setGalleryWidth(896);
      setGalleryHeight(504);
    }
  });

  useEffect(() => {
    GetServiceCatalogue();
  }, []);

  const GetUserCount = () => {
    Provider.getAll("registration/getusers")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          let UserCount = 0;
          response.data.data.map((item: RoleDetails, index: number) => {
            UserCount += item.roleCount;
          });

          setTotalUsers(UserCount);
          setUserCountData(response.data.data);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const GetServiceCatalogue = () => {
    Provider.getAll("servicecatalogue/getpostnewdesigntypes")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setCatalogueFullData(response.data.data);
            const categoryImageData = [];
            const sliderImageData = [];
            response.data.data.map((data, index: number) => {
              categoryImageData.push({
                url: data.designImage,
                title: data.categoryName,
                id: index,
              });
              sliderImageData.push({
                url: data.designImage,
              });
            });
            setCatalogueCategoryImages(categoryImageData);
            setCatalogueImages(sliderImageData);
          }
        } else {
          setSnackbarMessage("No data found");
          setIsSnackbarOpen(true);
        }
        GetUserCount();
      })
      .catch((e) => {
        setIsLoading(false);
        setSnackbarMessage(e.message);
        setIsSnackbarOpen(true);
      });
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    let roleNameOnClick: string = event.target.value;
    let ac = userCountData.find((el) => el.roleName.toLowerCase() === roleNameOnClick.toLowerCase());
    if (ac !== undefined) {
      setRole(ac?.roleName);
      setRoleID(ac?.roleID);
      setRoleError(false);
      setRoleErrorText("");
    }
  };

  const SwitchUserClick = () => {
    if (role === "" || roleID === 0) {
      setRoleError(true);
      setRoleErrorText("Error");
    } else {
      //ajax
      // UpdateUserRole();
      setOpen(true);
    }
  };

  const UpdateUserRole = () => {
    handleClose();
    setButtonLoading(true);
    const params = {
      UserID: CookieUserID,
      RoleID: roleID,
    };
    Provider.create("registration/updateuserrole", params)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          removeCookie("dfc");
          const user = {
            UserID: CookieUserID,
            FullName: CookieUserName,
            RoleID: roleID,
            RoleName: role,
          };
          setCookie("dfc", JSON.stringify(user), { path: "/" });
          // setRoleName(roleName);
          // GetUserCount();
          window.location.reload();
        } else {
          setSnackbarMessage(communication.NoData);
          setIsSnackbarOpen(true);
        }
        setButtonLoading(false);
      })
      .catch((e) => {
        setSnackbarMessage(e.message);
        setIsSnackbarOpen(true);
        setButtonLoading(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleImageClose = () => {
    setImageOpen(false);
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };
  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "16px",
    fontWeight: "bold",
  };
  return (
    <Box sx={{ mt: 7 }}>
      <Header />
      <Container sx={{ padding: { xs: 2, md: 4 } }} maxWidth="xl">
        {isLoading ? (
          <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
              <Grid style={{ float: "left" }} item xs={4} sm={5} md={8} display="flex" flexDirection="row">
                <Avatar alt="" src="/src/assets/avtar.png" sx={{ mt: 1 }} />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">{CookieUserName}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {CookieRoleName}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={5} md={4} style={{ float: "right" }}>
                <Button variant="contained" startIcon={<CalculateIcon />}>
                  Pocket Diary
                </Button>
                <Button sx={{ ml: 1 }} variant="contained" startIcon={<AnnouncementIcon />}>
                  Feedbacks
                </Button>
              </Grid>
            </Grid>

            {CookieRoleID === 2 ? (
              <Grid item xs={4} sm={6} md={6} sx={{ mt: 1 }}>
                <FormControl fullWidth size="small" error={roleError}>
                  <Typography sx={{ mb: 1 }}>Switch Role</Typography>
                  <Select value={role} onChange={handleRoleChange}>
                    <MenuItem disabled={true} value="--Select--">
                      --Select--
                    </MenuItem>
                    {userCountData.map((item) => {
                      if (item.roleID !== 2) {
                        return (
                          <MenuItem key={item.roleID} value={item.roleName}>
                            {item.roleName}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                  <FormHelperText>{roleErrorText}</FormHelperText>
                </FormControl>
                <Grid>
                  <LoadingButton loading={buttonLoading} type="submit" variant="contained" sx={{ mt: 2 }} onClick={SwitchUserClick}>
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            ) : null}
            {/*  */}
            <Grid xs={4} sm={8} md={12} sx={{ mt: 2, p: 1, border: 1, borderRadius: "4px", borderColor: "rgba(0, 0, 0, 0.12)", backgroundColor: "rgba(0, 102, 193, 0.04)" }}>
              <Grid item xs={4} sm={8} md={12} sx={{ mt: 1, ml: 1 }}>
                <Typography variant="h5">Gallery</Typography>
              </Grid>
              <Grid xs={4} sm={8} md={12} sx={{ mt: 1 }} style={{ display: "flex", justifyContent: "center" }}>
                <TitlebarBelowImageList
                  itemData={catalogueCategoryImages}
                  callback={(index: number) => {
                    console.log(index);
                  }}
                />
              </Grid>
            </Grid>
            <Grid xs={4} sm={8} md={12} sx={{ mt: 2, pb: 1, border: 1, borderRadius: "4px", borderColor: "rgba(0, 0, 0, 0.12)", backgroundColor: "rgba(0, 102, 193, 0.04)" }}>
              <Grid item xs={4} sm={8} md={12} sx={{ mt: 1, ml: 1 }}>
                <Typography variant="h5">Gallery</Typography>
              </Grid>
              <Grid xs={4} sm={8} md={12} sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                <SimpleImageSlider
                  slideDuration={3}
                  loop={true}
                  autoPlay={true}
                  width={galleryWidth}
                  height={galleryHeight}
                  images={catalogueImages}
                  showBullets={true}
                  showNavs={true}
                  onClick={(index: number, e: any) => {
                    setSelectedImage(catalogueImages[index].url);
                    setImageOpen(true);
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              xs={4}
              sm={8}
              md={12}
              sx={{
                position: "relative",
                mt: 2,
                p: 1,
                display: "flex",
                justifyContent: "center",
                border: 1,
                borderRadius: "4px",
                borderColor: "rgba(0, 0, 0, 0.12)",
                backgroundColor: "rgba(0, 102, 193, 0.04)",
              }}
            >
              <img alt="" style={{ height: 148, maxWidth: galleryWidth }} src="https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-ncino.jpg" />
              <Typography sx={{ position: "absolute", bottom: "8px", right: "16px" }}>Sponsered Ads</Typography>
            </Grid>
            <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
              <Grid item xs={4} sm={8} md={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Total Users ({totalUsers})
                </Typography>
              </Grid>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {userCountData.map((item, index) => {
                  return CreateTotalUserCards(userCountData[index].roleName, userCountData[index].roleCount, null, "#f4efff", "theme.palette.primary");
                })}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>Do you really want to switch your role to {roleName}? If OK, then your active role will get automatically changed</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                UpdateUserRole();
              }}
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={imageOpen} onClose={handleImageClose} fullScreen={true}>
          <DialogTitle>Catalogue Images</DialogTitle>
          <DialogContent>
            <PrismaZoom allowPan={false} style={{ height: 640, display: "flex", justifyContent: "center" }}>
              <img alt="" style={{ height: 640 }} src={selectedImage} />
            </PrismaZoom>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleImageClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardPage;

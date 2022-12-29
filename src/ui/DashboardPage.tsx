import { Alert, AlertColor, Avatar, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, MenuItem, Select, SelectChangeEvent, Snackbar, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../theme/Styles.css";
import { CreateTotalUserCards } from "../components/Cards";
import { useCookies } from "react-cookie";
import Provider from "../api/Provider";
import { ButtonSettings, ImageGalleryEstimation, RoleDetails } from "../models/Model";
import { LoadingButton } from "@mui/lab";
import { communication } from "../utils/communication";
import SimpleImageSlider from "react-simple-image-slider";
import CalculateIcon from "@mui/icons-material/Calculate";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import PrismaZoom from "react-prismazoom";
import ShowsGrid from "../components/GridStructure";
import { APIConverter } from "../utils/apiconverter";
import { debug } from "console";

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

  //#region Variables
  const [role, setRole] = useState("--Select--");
  const [roleID, setRoleID] = useState<number>(0);
  const [roleError, setRoleError] = useState<boolean>(false);
  const [roleErrorText, setRoleErrorText] = useState<string>("");

  const [userName, setUserName] = useState("");
  const [userCountData, setUserCountData] = useState<RoleDetails[]>([]);
  const [userRoles, setUserRoles] = useState<RoleDetails[]>([]);
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
  const [catalogueCategoryImages, setCatalogueCategoryImages] = useState<Array<ImageGalleryEstimation>>([]);
  const [catalogueImages, setCatalogueImages] = useState([]);

  const [galleryWidth, setGalleryWidth] = useState(896);
  const [galleryHeight, setGalleryHeight] = useState(504);
  const [arnID, setArnID] = useState<number>(2);
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  //#endregion

  // const arrQuickLinks = [
  //   { title: "Pocket Diary", icon: "CalculateIcon", backgroundColor: "" },
  //   { title: "Feedbacks", icon: "AnnouncementIcon", backgroundColor: "" },
  // ];
  //#region Functions
  const buttonSetting: ButtonSettings = {
    isActionButton: false,
    actionButtons: [],
  };

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    else {
      debugger;
      SetCookieRoleID(cookies.dfc.RoleID);
      SetCookieRolName(cookies.dfc.RoleName);
      SetCookieUserName(cookies.dfc.FullName);
      SetCookieUseID(cookies.dfc.UserID);
      if (cookies.dfc.RoleID === "3") {
        FillUserRoles();
      }
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
    // FetchActvityRoles();
    FetchImageGalleryData();
  }, []);

  // const FetchActvityRoles = () => {
  //   Provider.getAll("master/getmainactivities")
  //     .then((response: any) => {
  //       if (response.data && response.data.code === 200) {
  //         if (response.data.data) {
  //           response.data.data = response.data.data.filter((el: any) => {
  //             return el.display && el.activityRoleName === "General User";
  //           });
  //           setArnID(response.data.data[0].id);
  //         }
  //       }
  //     })
  //     .catch((e) => {});
  // };

  const FetchImageGalleryData = () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
      },
    };
    Provider.createDFDashboard(Provider.API_URLS.GetdashboardServicecatalogue, params)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setCatalogueCategoryImages(response.data.data);
          }
        } else {
          setCatalogueCategoryImages([]);
          setSnackbarMessage(communication.NoData);
          setSnackbarType("info");
          setIsSnackbarOpen(true);
        }
      })
      .catch((e) => {
        setSnackbarMessage(communication.NetworkError);
        setSnackbarType("error");
        setIsSnackbarOpen(true);
      });
  };

  const GetUserCount = () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
      },
    };
    Provider.createDFDashboard(Provider.API_URLS.GetdashboardTotaluser, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          let UserCount = 0;
          setTotalUsers(response.data.data[0].TotalUsers);
          let usr_data = [
            {
              roleID: 0,
              roleName: "Dealer",
              roleCount: response.data.data[0].TotalDealer,
            },
            {
              roleID: 1,
              roleName: "Contractor",
              roleCount: response.data.data[0].TotalContractor,
            },
            {
              roleID: 2,
              roleName: "General User",
              roleCount: response.data.data[0].TotalGeneralUser,
            },
            {
              roleID: 3,
              roleName: "Client",
              roleCount: response.data.data[0].TotalClient,
            },
          ];

          setUserCountData(usr_data);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const FillUserRoles = () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
      },
    };
    Provider.createDFDashboard(Provider.API_URLS.GetdashboardUserswitchto, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          let d = [];
          for (var key in response.data.data[0]) {
            if (response.data.data[0].hasOwnProperty(key)) {
              d.push({
                roleID: key,
                roleName: response.data.data[0][key],
              });
            }
          }
          setUserRoles(d);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const GetServiceCatalogue = () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
      },
    };
    Provider.createDFDashboard(Provider.API_URLS.GetdashboardServicecatalogue, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setCatalogueFullData(response.data.data);
            //const categoryImageData = [];
            const sliderImageData = [];
            response.data.data.map((data, index: number) => {
              // categoryImageData.push({
              //   url: data.designImage,
              //   title: data.categoryName,
              //   id: index,
              // });
              sliderImageData.push({
                url: data.designImage,
              });
            });
            // setCatalogueCategoryImages(response.data.data);
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
    let ac = userRoles.find((el) => el.roleName.toLowerCase() === roleNameOnClick.toLowerCase());
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
    debugger;
    handleClose();
    setButtonLoading(true);
    const params = {
      data: {
        Sess_UserRefno: CookieUserID,
        switchto_group_refno: roleID,
      },
    };
    Provider.createDFDashboard(Provider.API_URLS.Getdashboard_Userswitchto_Proceed, params)
      .then((response) => {
        debugger;
        if (response.data && response.data.code === 200) {
          GetUserDetails(CookieUserID);
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

  const GetUserDetails = (user_refno) => {
    setIsLoading(true);
    let params = {
      data: {
        user_refno: user_refno,
      },
    };
    Provider.createDFCommon(Provider.API_URLS.UserFromRefNo, params)
      .then((response: any) => {
        removeCookie("dfc");
        if (response.data && response.data.code === 200) {
          const user = {
            UserID: user_refno,
            FullName: response.data.data.Sess_FName === "" ? response.data.data.Sess_Username : "",
            RoleID: response.data.data.Sess_group_refno,
            RoleName: response.data.data.Sess_group_name,
            Sess_FName: response.data.data.Sess_FName,
            Sess_MobileNo: response.data.data.Sess_MobileNo,
            Sess_Username: response.data.data.Sess_Username,
            Sess_role_refno: response.data.data.Sess_role_refno,
            Sess_group_refno: response.data.data.Sess_group_refno,
            Sess_designation_refno: response.data.data.Sess_designation_refno,
            Sess_locationtype_refno: response.data.data.Sess_locationtype_refno,
            Sess_group_refno_extra_1: response.data.data.Sess_group_refno_extra_1,
            Sess_User_All_GroupRefnos: response.data.data.Sess_User_All_GroupRefnos,
            Sess_branch_refno: response.data.data.Sess_branch_refno,
            Sess_company_refno: response.data.data.Sess_company_refno,
            Sess_CompanyAdmin_UserRefno: response.data.data.Sess_CompanyAdmin_UserRefno,
            Sess_CompanyAdmin_group_refno: response.data.data.Sess_CompanyAdmin_group_refno,
            Sess_RegionalOffice_Branch_Refno: response.data.data.Sess_RegionalOffice_Branch_Refno,
            Sess_menu_refno_list: response.data.data.Sess_menu_refno_list,
          };
          setCookie("dfc", JSON.stringify(user), { path: "/" });
          //navigate(`/dashboard`);
          window.location.reload();
        } else {
          setSnackbarMessage(communication.InvalidUserNotExists);
          setIsSnackbarOpen(true);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setSnackbarMessage(e.message);
        setIsSnackbarOpen(true);
        setIsLoading(false);
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
  const handleCardClick = (data: ImageGalleryEstimation) => {
    //debugger;
    navigate(`/generaluser/imagegallery/product`, { state: { id: data.id, name: data.serviceName, type: "dashboard" } });
  };

  // const captionStyle = {
  //   fontSize: "2em",
  //   fontWeight: "bold",
  // };
  // const slideNumberStyle = {
  //   fontSize: "16px",
  //   fontWeight: "bold",
  // };
  //#endregion

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
                <Button variant="contained" startIcon={<CalculateIcon />} onClick={() => navigate("/dashboardpocket")}>
                  Pocket Diary
                </Button>
                <Button sx={{ ml: 1 }} variant="contained" startIcon={<AnnouncementIcon />}>
                  Feedbacks
                </Button>
              </Grid>
            </Grid>

            {parseInt(CookieRoleID.toString()) == 3 ? (
              <Grid item xs={4} sm={6} md={6} sx={{ mt: 1 }}>
                <FormControl fullWidth size="small" error={roleError}>
                  <Typography sx={{ mb: 1 }}>Switch Role</Typography>
                  <Select value={role} onChange={handleRoleChange}>
                    <MenuItem disabled={true} value="--Select--">
                      --Select--
                    </MenuItem>
                    {userRoles.map((item) => {
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
                {/* <TitlebarBelowImageList
                  itemData={catalogueCategoryImages}
                  callback={(index: number) => {
                    console.log(index);
                  }}
                /> */}
                <ShowsGrid shows={catalogueCategoryImages} buttonSettings={buttonSetting} cardCallback={CookieRoleID == 3 || CookieRoleID == 4 ? handleCardClick : () => {}} type="category" />
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
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardPage;

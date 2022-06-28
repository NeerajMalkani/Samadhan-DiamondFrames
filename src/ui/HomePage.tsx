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
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../theme/Styles.css";
import { CreateGeneralCards, CreateTotalUserCards } from "../components/Cards";
import { useCookies } from "react-cookie";
import Provider from "../api/Provider";
import { RoleDetails } from "../models/Model";
import { LoadingButton } from "@mui/lab";
import { communication } from "../utils/communication";
// import { Carousel } from "react-carousel-minimal";

const HomePage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
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

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/Samadhan-DiamondFrames/login`);
    else {
      SetCookieRoleID(cookies.dfc.RoleID);
      SetCookieRolName(cookies.dfc.RoleName);
      SetCookieUserName(cookies.dfc.FullName);
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);

  const ImageGallery = [
    {
      image: "https://www.homepictures.in/wp-content/uploads/2019/10/False-Ceiling-Gypsum-Designs-For-Hall-and-Bedrooms-1.jpg",
    },
    {
      image: "https://macj-abuyerschoice.com/wp-content/uploads/2019/10/Blog-Images.jpg",
    },
    {
      image: "https://static.wixstatic.com/media/e5df22_7e8607574d1e4d949a1b45e6f7c2d50c~mv2.jpg/v1/fill/w_600,h_358,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/e5df22_7e8607574d1e4d949a1b45e6f7c2d50c~mv2.jpg",
    }];

  useEffect(() => {
    GetUserCount();
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

  const handleRoleChange = (event: SelectChangeEvent) => {
    let roleNameOnClick: string = event.target.value;
    let ac = userCountData.find(
      (el) => el.roleName.toLowerCase() === roleNameOnClick.toLowerCase()
    );

    if (ac !== undefined) {
      setRole(roleName);
      setRoleID(ac?.id);
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
      UpdateUserRole();
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
          setRoleName(roleName);
          GetUserCount();
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
  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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
    <Box height="100vh" sx={{ mt: 7 }}>
      <Header />
      <Container sx={{ padding: { xs: 2, md: 4 } }} maxWidth="xl">
        {isLoading ? (
          <Box
            height="300px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ m: 2 }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center">
              <Avatar alt="" src="/src/assets/avtar.png" />
              <Box>
                <Typography>{CookieUserName}</Typography>
                <Typography>{CookieRoleName}</Typography>
              </Box>
            </Grid>

            {CookieRoleID === 2 ? (
              <Grid
                item
                xs={4}
                sm={6}
                md={6}
                sx={{ mt: 1 }}
              >
                <FormControl fullWidth size="small" error={roleError}>
                  <Typography sx={{ mb: 1 }}>Switch Role</Typography>
                  <Select value={role} onChange={handleRoleChange}>
                    <MenuItem disabled={true} value="--Select--">
                      --Select--
                    </MenuItem>
                    {userCountData.map((item, index) => {
                      if (item.id !== 2) {
                        return (
                          <MenuItem key={item.id} value={item.roleName}>
                            {item.roleName}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                  <FormHelperText>{roleErrorText}</FormHelperText>
                </FormControl>
                <Grid>
                  <LoadingButton
                    loading={buttonLoading}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                    //style={{ marginTop: 24 }}
                    onClick={SwitchUserClick}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            ) : null}
            <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
              <Grid item xs={4} sm={8} md={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Total Users ({totalUsers})
                </Typography>
              </Grid>
              <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {userCountData.map((item, index) => {
                  return CreateTotalUserCards(
                    userCountData[index].roleName,
                    userCountData[index].roleCount,
                    null,
                    "#f4efff",
                    "theme.palette.primary"
                  );
                })}
              </Grid>
            </Grid>
            <Grid>
              {/* <Grid><Typography>Gallery</Typography></Grid>
              <Grid>
                <Carousel
                  data={ImageGallery}
                  time={10000}
                  width="960px"
                  height="480px"
                  captionStyle={captionStyle}
                  radius="4px"
                  slideNumber={false}
                  slideNumberStyle={slideNumberStyle}
                  captionPosition="bottom"
                  automatic={true}
                  dots={true}
                  pauseIconColor="white"
                  pauseIconSize="40px"
                  slideBackgroundColor="darkgrey"
                  slideImageFit="cover"
                  thumbnails={false}
                  thumbnailWidth="98px"
                  style={{
                    textAlign: "center",
                    maxWidth: "960px",
                    maxHeight: "480px",
                    margin: "16px auto",
                  }}
                />
              </Grid> */}
            </Grid>
          </Grid>
        )}
      </Container>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to switch your role to {roleName}? If OK, then your active role will get automatically changed
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => { UpdateUserRole(); }} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;

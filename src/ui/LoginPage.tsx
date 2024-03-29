import { Box, Button, Paper, Typography, TextField, Snackbar, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../theme/Styles.css";
import companyLogo from "../assets/logo192.png";
import { communication } from "../utils/communication";
import Provider from "../api/Provider";
import { ValidateFields } from "../utils/validations";
import { theme } from "../theme/AppTheme";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  /* #region Check user is login and handle enter click  */
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  useEffect(() => {
    if (cookies && cookies.dfc && cookies.dfc.UserID) navigate(`/dashboard`);

    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        loginClick();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });
  /* #endregion */

  /* #region Declare state variables */
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  /* #endregion */

  /* #region  Handle event and click listeners */
  //#region Functions
  const loginClick = () => {
    debugger;
    setIsLoading(true);
    if (username && password) {
      if (password.length > 2) {
        let params = {
          data: {
            uname: username,
            auth: password,
          },
        };
        Provider.createDFCommon(Provider.API_URLS.LoginCheck, params)
          .then((response: any) => {
            debugger;
            if (response.data && response.data.code === 200) {
              GetUserDetails(response.data.data.user_refno);
            } else {
              setSnackbarMessage(communication.InvalidUserNotExists);
              setIsSnackbarOpen(true);
            }
            setIsLoading(false);
          })
          .catch((e) => {
            debugger;
            setSnackbarMessage(e.message);
            setIsSnackbarOpen(true);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
        setSnackbarMessage(communication.IncorrectUsernameOrPassword);
        setIsSnackbarOpen(true);
      }
    } else {
      setIsLoading(false);
      setUsernameError(communication.BlankUsername);
      setPasswordError(!password ? communication.BlankPassword : "");
      setIsUsernameError(!username);
      setIsPasswordError(!password);
    }
  };

  const GetUserDetails = (user_refno) => {
    debugger;
    setIsLoading(true);
    if (username && password) {
      if (password.length > 2) {
        let params = {
          data: {
            user_refno: user_refno,
          },
        };
        Provider.createDFCommon(Provider.API_URLS.UserFromRefNo, params)
          .then((response: any) => {
            debugger;
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
                Sess_if_create_brand: response.data.data.Sess_if_create_brand,
                Sess_company_refno: response.data.data.Sess_company_refno,
                Sess_CompanyAdmin_UserRefno: response.data.data.Sess_CompanyAdmin_UserRefno,
                Sess_CompanyAdmin_group_refno: response.data.data.Sess_CompanyAdmin_group_refno,
                Sess_RegionalOffice_Branch_Refno: response.data.data.Sess_RegionalOffice_Branch_Refno,
                Sess_menu_refno_list: response.data.data.Sess_menu_refno_list,
              };
              setCookie("dfc", JSON.stringify(user), { path: "/" });
              navigate(`/dashboard`);
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
      } else {
        setIsLoading(false);
        setSnackbarMessage(communication.IncorrectUsernameOrPassword);
        setIsSnackbarOpen(true);
      }
    } else {
      setIsLoading(false);
      setUsernameError(communication.BlankUsername);
      setPasswordError(!password ? communication.BlankPassword : "");
      setIsUsernameError(!username);
      setIsPasswordError(!password);
    }
  };

  const onUsernameChanged = (text: string, e: any) => {
    setUsername(text);
    if (text.length > 0) {
      setIsUsernameError(false);
    }
  };

  const onPasswordeChange = (text: string) => {
    setPassword(text);
    if (text.length > 0) {
      setIsPasswordError(false);
    }
  };
  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };
  /* #endregion */

  /* #region UI Elements */
  return (
    <Box height="100vh" className="flex-center">
      <Paper
        className="padding-32 flex-center flex-column"
        sx={{
          minWidth: { sm: 480 },
          width: { xs: "100%", sm: "unset" },
          boxShadow: {
            xs: "unset",
            sm: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
          },
        }}
      >
        <img className="margin-bottom-24" src={companyLogo} alt="Samadhan-Diamond Frames" width={104} height={104} />

        <TextField
          fullWidth
          label="Username"
          variant="filled"
          size="small"
          inputProps={{
            maxLength: 50,
          }}
          onChange={(e) => {
            onUsernameChanged(e.target.value, e);
          }}
          error={isUsernameError}
          helperText={usernameError}
          value={username}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="filled"
          size="small"
          onChange={(e) => {
            onPasswordeChange(e.target.value);
          }}
          error={isPasswordError}
          helperText={passwordError}
          value={password}
          sx={{ mb: 1 }}
        />

        <Button sx={{ mb: 2 }} variant="text" href="/forgotpassword" className="flex-align-self-end" style={{ textTransform: "unset" }}>
          Forgot Password?
        </Button>

        <LoadingButton loading={loading} type="submit" variant="contained" fullWidth={true} onClick={loginClick}>
          Login
        </LoadingButton>
        <div style={{ width: "100%", marginTop: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: theme.palette.divider,
              }}
            ></div>
            <Typography variant="body2" color="text.secondary" style={{ marginTop: "-10px", backgroundColor: "#ffffff" }}>
              OR
            </Typography>
          </div>
          <Button type="submit" variant="outlined" fullWidth={true} style={{ marginTop: 24 }} href="/signup">
            New User
          </Button>
        </div>
      </Paper>
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
          // onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
  /* #endregion */
};

export default LoginPage;

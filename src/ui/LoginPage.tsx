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
import { json } from "stream/consumers";

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
  // const [loginType, setLoginType] = useState(false);
  /* #endregion */

  /* #region  Handle event and click listeners */
  const loginClick = () => {
    setIsLoading(true);
    if (username && password) {
      if (password.length > 2) {
        let params = {
          // PhoneNumber: loginType ? 0 : parseFloat(username),
          Username: username,
          Password: password,
          //  RoleID: loginType ? 1 : 2,
        };
        debugger;

        var string_ = JSON.stringify(params);

        string_ = string_.replace(/{/g, "");
        string_ = string_.replace(/}/g, "");
        string_ = string_.replace(/:/g, "=");
        string_ = string_.replace(/,/g, "&");
        string_ = string_.replace(/"/g, "");

        Provider.getAll(`registration/login?${string_}`)
          .then((response: any) => {
            console.log(response.data);
            if (response.data && response.data.code === 200) {
              debugger;
              const user = {
                UserID: response.data.data[0].userID,
                FullName: response.data.data[0].fullName,
                RoleID: response.data.data[0].roleID,
                RoleName: response.data.data[0].roleName,
              };
              setCookie("dfc", JSON.stringify(user), { path: "/" });
              navigate(`/dashboard`);
              //StoreUserData(user);
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
        {/* <Typography variant="h5" className="text-align-center padding-bottom-8">
          {!loginType ? "Login as a User" : "Login as an Admin"}
        </Typography> */}
        {/* <Button
          sx={{ mb: 1 }}
          variant="text"
          style={{ textTransform: "unset" }}
          onClick={() => {
            setLoginType(!loginType);
            setUsername("");
            setPassword("");
            setUsernameError("");
            setPasswordError("");
            setIsUsernameError(false);
            setIsPasswordError(false);
          }}
        >
          Switch to {loginType ? "User" : "Admin"} login
        </Button> */}

        <TextField
          fullWidth
          label="Username"
          variant="filled"
          size="small"
          // autoComplete={loginType ? "username" : "tel"}
          inputProps={{
            maxLength: 50,
            onKeyDown: (e) => {
              // if (!loginType) {
              //   restrictNumericMobile(e);
              // }
            },
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

        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          fullWidth={true}
          //style={{ marginTop: 24 }}
          onClick={loginClick}
        >
          Login
        </LoadingButton>
        {/* {!loginType ? ( */}
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

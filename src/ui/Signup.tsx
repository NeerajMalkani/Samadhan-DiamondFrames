import { LoadingButton } from "@mui/lab";
import { Alert, Button, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/logo192.png";
import { communication } from "../utils/communication";
import { restrictNumericMobile, ValidateFields } from "../utils/validations";
import { useCookies } from "react-cookie";
import Provider from "../api/Provider";

const SignupPage = () => {
  //#region Variables
  const [isFullNameError, setIsFullNameError] = useState<boolean>(false);
  const [fullNameError, setFullNameError] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const [isMobileError, setIsMobileError] = useState<boolean>(false);
  const [mobileError, setMobileError] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");

  const [isPassword1Error, setIsPassword1Error] = useState<boolean>(false);
  const [password1Error, setPassword1Error] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");

  const [isPassword2Error, setIsPassword2Error] = useState<boolean>(false);
  const [password2Error, setPassword2Error] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const [isOTPInvalid, setIsOTPInvalid] = useState<boolean>(false);
  const [otp1, setOTP1] = useState<string>("");
  const [otp2, setOTP2] = useState<string>("");
  const [otp3, setOTP3] = useState<string>("");
  const [otp4, setOTP4] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);
  const [otpButtonDisabled, setOTPButtonDisabled] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  //#endregion

  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  //#region Functions
  useEffect(() => {
    if (cookies && cookies.dfc && cookies.dfc.UserID) navigate(`/dashboard`);
  }, []);

  const onOTP1Changed = (text: string) => {
    setOTP1(text);
    if (text.length > 0) {
      setIsOTPInvalid(false);
    }
  };
  const onOTP2Changed = (text: string) => {
    setOTP2(text);
    if (text.length > 0) {
      setIsOTPInvalid(false);
    }
  };
  const onOTP3Changed = (text: string) => {
    setOTP3(text);
    if (text.length > 0) {
      setIsOTPInvalid(false);
    }
  };
  const onOTP4Changed = (text: string) => {
    setOTP4(text);
    if (text.length > 0) {
      setIsOTPInvalid(false);
    }
  };

  const SignupClick = () => {
    let isValid = true;
    if (fullName.length === 0 || !ValidateFields("fullname", fullName)) {
      isValid = false;
      setIsFullNameError(true);
      setFullNameError(communication.BlankFullName);
    }
    if (mobile.length === 0 || !ValidateFields("phonenumber", mobile)) {
      isValid = false;
      setIsMobileError(true);
      setMobileError(communication.BlankMobile);
    }
    if (otp1.length === 0 && otp2.length === 0 && otp3.length === 0 && otp4.length === 0) {
      isValid = false;
      setIsOTPInvalid(true);
    }
    if (password1.length === 0) {
      isValid = false;
      setIsPassword1Error(true);
      setPassword1Error(communication.BlankPassword);
    }
    if (password2.length === 0) {
      isValid = false;
      setIsPassword2Error(true);
      setPassword2Error(communication.BlankPassword);
    }
    if (isValid) {
      if (password1 !== password2) {
        setIsPassword2Error(true);
        setSnackbarMessage(communication.InvalidPasswordsMatch);
        setIsSnackbarOpen(true);
      } else {
        //do signup, call api
        InsertNewUser();
      }
    }
  };

  const onFullNameChanged = (text: string) => {
    setFullName(text);
    setFullNameError("");
    setIsFullNameError(false);
  };

  const onMobileChanged = (text: string) => {
    setMobile(text);
    setMobileError("");
    setIsMobileError(false);
    if (text.length <= 0) {
      setOTP1("");
      setOTP2("");
      setOTP3("");
      setOTP4("");
      setOTPButtonDisabled(false);
    }
  };

  const onPasswordChanged = (text: string) => {
    setPassword1(text);
    setPassword1Error("");
    setIsPassword1Error(false);
  };

  const onConfirmPasswordChanged = (text: string) => {
    setPassword2(text);
    setPassword2Error("");
    setIsPassword2Error(false);
  };

  const ValidateOTP = () => {
    if (mobile.length === 0 || !ValidateFields("phonenumber", mobile)) {
      setIsMobileError(true);
      setIsOTPInvalid(true);
      setSnackbarMessage(communication.InvalidMobileBeforeOTP);
      setIsSnackbarOpen(true);
    } else {
      const random4Digits = Math.floor(1000 + Math.random() * 9000);
      setOTP1(random4Digits.toString().substring(0, 1));
      setOTP2(random4Digits.toString().substring(1, 2));
      setOTP3(random4Digits.toString().substring(2, 3));
      setOTP4(random4Digits.toString().substring(3, 4));
      setIsOTPInvalid(false);
      setOTPButtonDisabled(true);
      setIsSnackbarOpen(false);
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const InsertNewUser = () => {
    setIsLoading(true);
    const params = {
      data: {
        Mobileno: mobile,
        firstname: fullName,
        auth: password1,
        confirm_password: password1,
        EntryFrom: "Browser",
      },
    };
    Provider.createDFCommon(Provider.API_URLS.NewUserProfile, params)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          navigate(`/login`);
        } else if (response.data.code === 304) {
          setSnackbarMessage(communication.AlreadyExists);
          setIsSnackbarOpen(true);
        } else {
          setSnackbarMessage(communication.Error);
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

  const GETOTP = () => {
    const params = {
      data: {
        Mobileno: mobile,
        EntryFrom: 1,
      },
    };
    debugger;
    Provider.createDFCommon(Provider.API_URLS.MobileCheck, params)
      .then((response) => {
        debugger;
        if (response.data && response.data.code === 200) {
          let otp = response.data.data.OTP_No;
          if (otp !== "") {
            setOTP1(otp.toString().substring(0, 1));
            setOTP2(otp.toString().substring(1, 2));
            setOTP3(otp.toString().substring(2, 3));
            setOTP4(otp.toString().substring(3, 4));
          }
        } else if (response.data.code === 304) {
          setSnackbarMessage(communication.AlreadyExists);
          setIsSnackbarOpen(true);
        } else {
          setSnackbarMessage(response.data.message);
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

  //#endregion

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
        <Typography variant="h5" className="text-align-center padding-bottom-8">
          Create New Account
        </Typography>
        <Grid style={{ width: "100%" }}>
          <Grid>
            <TextField
              fullWidth
              label="Full Name"
              variant="filled"
              size="small"
              inputProps={{ maxLength: 50 }}
              onChange={(e) => {
                onFullNameChanged(e.target.value);
              }}
              error={isFullNameError}
              helperText={fullNameError}
              value={fullName}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid>
            <TextField
              fullWidth
              label="Mobile Number"
              variant="filled"
              size="small"
              inputProps={{
                maxLength: 10,
                onKeyDown: (e) => {
                  restrictNumericMobile(e);
                },
              }}
              onChange={(e) => {
                onMobileChanged(e.target.value);
              }}
              error={isMobileError}
              helperText={mobileError}
              value={mobile}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid sx={{ mb: 2 }}>
            <Box display="flex" flexDirection="row">
              <TextField variant="filled" size="small" disabled value={otp1} onChange={(e) => onOTP1Changed(e.target.value)} sx={{ width: 48, height: 48, mr: 1 }} />
              <TextField variant="filled" size="small" disabled value={otp2} onChange={(e) => onOTP2Changed(e.target.value)} sx={{ width: 48, height: 48, mr: 1 }} />
              <TextField variant="filled" size="small" disabled value={otp3} onChange={(e) => onOTP3Changed(e.target.value)} sx={{ width: 48, height: 48, mr: 1 }} />
              <TextField variant="filled" size="small" disabled value={otp4} onChange={(e) => onOTP4Changed(e.target.value)} sx={{ width: 48, height: 48 }} />

              <Button
                variant="text"
                disabled={otpButtonDisabled}
                onClick={() => {
                  debugger;
                  //ValidateOTP();
                  GETOTP();
                }}
              >
                Get OTP
              </Button>
            </Box>
            <Typography variant="caption" style={{ display: isOTPInvalid ? "block" : "none" }} sx={{ pt: 0.6, pl: 1.8, color: "error.main" }}>
              {communication.InvalidOTP}
            </Typography>
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Password"
              variant="filled"
              size="small"
              onChange={(e) => {
                onPasswordChanged(e.target.value);
              }}
              type="password"
              error={isPassword1Error}
              helperText={password1Error}
              value={password1}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid>
            <TextField
              fullWidth
              label="Confirm Password"
              variant="filled"
              size="small"
              onChange={(e) => {
                onConfirmPasswordChanged(e.target.value);
              }}
              type="password"
              error={isPassword2Error}
              helperText={password2Error}
              value={password2}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid>
            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
              fullWidth={true}
              //style={{ marginTop: 24 }}
              onClick={SignupClick}
            >
              Sign In
            </LoadingButton>
          </Grid>
        </Grid>
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
};

export default SignupPage;

import { LoadingButton } from "@mui/lab";
import { Alert, Button, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import companyLogo from "../assets/logo192.png";

const ForgotPasswordPage = () => {
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

  const ForgotPasswordClick = () => {};

  const onMobileChanged = (text: string) => {
    setMobile(text);
    setMobileError("");
    //if (text.length > 0) {
    setIsMobileError(false);
    //}
  };

  const onMobileNumberChanged = (text: string) => {
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
    // if (text.length > 0) {
    setIsPassword1Error(false);
    // }
  };

  const onConfirmPasswordChanged = (text: string) => {
    setPassword2(text);
    setPassword2Error("");
    //if (text.length > 0) {
    setIsPassword2Error(false);
    // }
  };

  const ValidateOTP = () => {
    if (mobile.length === 0) {
      setIsMobileError(true);
      setIsOTPInvalid(true);
      //setSnackbarText(communication.InvalidMobileBeforeOTP);
      //setIsSnackbarVisible(true);
    } else {
      const random4Digits = Math.floor(1000 + Math.random() * 9000);
      setOTP1(random4Digits.toString().substring(0, 1));
      setOTP2(random4Digits.toString().substring(1, 2));
      setOTP3(random4Digits.toString().substring(2, 3));
      setOTP4(random4Digits.toString().substring(3, 4));
      setIsOTPInvalid(false);
      setOTPButtonDisabled(true);
      //setIsSnackbarVisible(false);
    }
  };

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
        <Grid style={{ width: "100%"}}>
          <Grid>
            <TextField
              fullWidth
              label="Mobile Number"
              variant="filled"
              size="small"
              onChange={(e) => {
                onMobileChanged(e.target.value);
              }}
              error={isMobileError}
              helperText={mobileError}
              value={mobile}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid>
            <Box display="flex" flexDirection="row">
              <TextField variant="filled" size="small" value={otp1} onChange={(e) => onOTP1Changed(e.target.value)} sx={{ mb: 2, width: 48, height: 48, mr: 1 }} />
              <TextField variant="filled" size="small" value={otp2} onChange={(e) => onOTP2Changed(e.target.value)} sx={{ mb: 2, width: 48, height: 48, mr: 1 }} />
              <TextField variant="filled" size="small" value={otp3} onChange={(e) => onOTP3Changed(e.target.value)} sx={{ mb: 2, width: 48, height: 48, mr: 1 }} />
              <TextField variant="filled" size="small" value={otp4} onChange={(e) => onOTP4Changed(e.target.value)} sx={{ mb: 2, width: 48, height: 48 }} />

              <Button variant="text" disabled={otpButtonDisabled} onClick={() => {}}>
                Get OTP
              </Button>
            </Box>
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="New Password"
              variant="filled"
              size="small"
              onChange={(e) => {
                onPasswordChanged(e.target.value);
              }}
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
              onClick={ForgotPasswordClick}
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar>
        <Alert></Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPasswordPage;

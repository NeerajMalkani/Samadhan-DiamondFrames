import { Box, Button, Paper, Typography, TextField, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import "../theme/Styles.css";
import companyLogo from "../assets/logo192.png";

const LoginPage = () => {
  const [loading, setIsLoading] = useState(false);

  const [mobileError, setMobileError] = useState("");
  const [isMobileError, setIsMobileError] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);

  const loginClick = () => {};
  const onMobileChange = () => {};
  const onPasswordeChange = () => {};
  return (
    <Box height="100vh" className="flex-center">
      <Paper className="padding-32 flex-center flex-column" elevation={3} sx={{ minWidth: { sm: 480 }, margin: { xs: 4, sm: "unset" }, width: { xs: "100%", sm: "unset" } }}>
        <img className="margin-bottom-24" src={companyLogo} alt="Samadhan-Diamond Frames" width={128} height={128} />
        <Typography variant="h5" className="text-align-center padding-bottom-32">
          Login to your account
        </Typography>
        <TextField id="mobile" error={isMobileError} label="Mobile number" placeholder="Mobile number" fullWidth={true} helperText={mobileError} onChange={onMobileChange} />
        <TextField id="password" type="password" error={isPasswordError} label="Password" placeholder="Password" fullWidth={true} helperText={mobileError} style={{ marginTop: 24 }} onChange={onPasswordeChange} />
        <Link href="#" style={{ alignSelf: "flex-end", marginTop: 16 }}>
          Forgot Password?
        </Link>
        <LoadingButton loading={loading} type="submit" variant="contained" fullWidth={true} style={{ marginTop: 24 }} onClick={loginClick}>
          Login
        </LoadingButton>
        <Typography variant="body2" color="text.secondary" style={{ marginTop: 8 }}>
          OR
        </Typography>
        <Button type="submit" variant="outlined" fullWidth={true} style={{ marginTop: 8 }} onClick={loginClick}>
          New User
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;

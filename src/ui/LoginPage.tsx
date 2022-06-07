import { Box, Button, Paper, Typography, TextField, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../theme/Styles.css";
import companyLogo from "../assets/logo192.png";
import { GetSession } from "../utils/sessions";
import { communication } from "../utils/communication";

const LoginPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (GetSession("isLogin") === "true") {
      navigate(`/dashboard`);
    }
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

  const [loading, setIsLoading] = useState(false);

  const [mobileError, setMobileError] = useState("");
  const [isMobileError, setIsMobileError] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const loginClick = () => {
    setIsLoading(true);
    setMobileError(!mobile ? communication.BlankMobile : "");
    setPasswordError(!password ? communication.BlankPassword : "");
    setIsMobileError(!mobile);
    setIsPasswordError(!password);
    if (mobile && password) {
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/dashboard`);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };
  const onMobileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(event.target.value);
  };
  const onPasswordeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
    <Box height="100vh" className="flex-center">
      <Paper className="padding-32 flex-center flex-column" sx={{ minWidth: { sm: 480 }, width: { xs: "100%", sm: "unset" }, boxShadow: { xs: "unset", sm: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)" } }}>
        <img className="margin-bottom-24" src={companyLogo} alt="Samadhan-Diamond Frames" width={128} height={128} />
        <Typography variant="h5" className="text-align-center padding-bottom-32">
          Login to your account
        </Typography>
        <TextField id="mobile" error={isMobileError} label="Mobile number" placeholder="Mobile number" fullWidth={true} helperText={mobileError} onChange={onMobileChange} />
        <TextField id="password" type="password" error={isPasswordError} label="Password" placeholder="Password" fullWidth={true} helperText={passwordError} style={{ marginTop: 24 }} onChange={onPasswordeChange} />
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

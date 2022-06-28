import { Box } from "@mui/material";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const DashboardPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);

  let navigate = useNavigate();
  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/Samadhan-DiamondFrames/login`);
  },[]);
  
  return (
    <Box height="100vh">
      <Header />
    </Box>
  );
};

export default DashboardPage;

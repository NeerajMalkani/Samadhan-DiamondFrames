import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { GetSession } from "../utils/sessions";

const DashboardPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (GetSession("isLogin") !== "true") {
      navigate(`/Samadhan-DiamondFrames/login`);
    }
  });
  return (
    <Box height="100vh">
      <Header />
    </Box>
  );
};

export default DashboardPage;

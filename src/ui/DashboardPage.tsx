import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetSession } from "../utils/sessions";

const DashboardPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (GetSession("isLogin") !== "true") {
      navigate(`/login`);
    }
  });
  return <Box height="100vh" className="flex-center"></Box>;
};

export default DashboardPage;

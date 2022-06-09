import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { theme } from "../theme/AppTheme";
import ActivityPage from "../ui/ActivityPage";
import DashboardPage from "../ui/DashboardPage";
import HomePage from "../ui/HomePage";
import LoginPage from "../ui/LoginPage";

const AppRoutes = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: "background.default" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/activity" element={<ActivityPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default AppRoutes;

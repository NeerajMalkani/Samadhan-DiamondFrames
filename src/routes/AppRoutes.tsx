import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { theme } from "../theme/AppTheme";
import LoginPage from "../ui/LoginPage";

const AppRoutes = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: "background.default" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default AppRoutes;

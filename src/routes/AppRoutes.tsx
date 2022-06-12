import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataContextProvider } from "../contexts/DataContexts";
import ActivityRoleNameModel from "../models/ActivityRoleModel";
import CategoryModel from "../models/CategoryModel";
import ServiceNameModel from "../models/ServiceNameModel";
import UnitOfSalesModel from "../models/UnitOfSalesModel";
import { theme } from "../theme/AppTheme";
import ActivityPage from "../ui/ActivityPage";
import ServicePage from "../ui/ServicePage";
import UnitPage from "../ui/UnitPage";
import CategoryPage from "../ui/CategoryPage";
import DashboardPage from "../ui/DashboardPage";
import HomePage from "../ui/HomePage";
import LoginPage from "../ui/LoginPage";

const AppRoutes = () => {
  const activityNamesList = useState<ActivityRoleNameModel[]>([]);
  const serviceNameList = useState<ServiceNameModel[]>([]);
  const unitOfSalesList = useState<UnitOfSalesModel[]>([]);
  const categoryList = useState<CategoryModel[]>([]);
  return (
    <ThemeProvider theme={theme}>
      <DataContextProvider value={{ categoryList: categoryList, activityNamesList: activityNamesList, unitOfSalesList: unitOfSalesList, serviceNameList: serviceNameList }}>
        <CssBaseline />
        <Box sx={{ backgroundColor: "background.default" }}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/master/activity" element={<ActivityPage />} />
              <Route path="/master/service" element={<ServicePage />} />
              <Route path="/master/unit" element={<UnitPage />} />
              <Route path="/master/category" element={<CategoryPage />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </DataContextProvider>
    </ThemeProvider>
  );
};

export default AppRoutes;

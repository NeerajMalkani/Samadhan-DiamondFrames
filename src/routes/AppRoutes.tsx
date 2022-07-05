import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataContextProvider } from "../contexts/DataContexts";
import{ActivityRoleNameModel, CategoryModel, ServiceNameModel, UnitOfSalesModel, ProductModel, DepartmentNameModel, DesignationNameModel} from "../models/Model";
import { theme } from "../theme/AppTheme";
import ActivityPage from "../ui/ActivityPage";
import ServicePage from "../ui/ServicePage";
import UnitPage from "../ui/UnitPage";
import CategoryPage from "../ui/CategoryPage";
import DashboardPage from "../ui/DashboardPage";
import HomePage from "../ui/HomePage";
import LoginPage from "../ui/LoginPage";
import ProductPage from "../ui/Product";
import SignupPage from "../ui/Signup";
import ForgotPasswordPage from "../ui/ForgotPasswordPage";
import { CookiesProvider } from 'react-cookie';
import ServiceProductPage from "../ui/ServiceProduct";
import DepartmentPage from "../ui/Department";
import DesignationPage from "../ui/Designation";

const AppRoutes = () => {
  const activityNamesList = useState<ActivityRoleNameModel[]>([]);
  const serviceNameList = useState<ServiceNameModel[]>([]);
  const unitOfSalesList = useState<UnitOfSalesModel[]>([]);
  const categoryList = useState<CategoryModel[]>([]);
  const productList = useState<ProductModel[]>([]);
  const departmentNamesList = useState<DepartmentNameModel[]>([]);
  const designationNamesList = useState<DesignationNameModel[]>([]);
  // const [cookies, setCookie] = useCookies(["dfc"]);
  // useEffect(() => {
  //   debugger;
  //   if (!cookies || !cookies.dfc || !cookies.dfc.uid)  {
  //     Navigate(`/Samadhan-DiamondFrames/login`);
  //   }
  // },[]);


  return (
    <CookiesProvider>
    <ThemeProvider theme={theme}>
      <DataContextProvider value={{ categoryList: categoryList, activityNamesList: activityNamesList, unitOfSalesList: unitOfSalesList, serviceNameList: serviceNameList, productList: productList, departmentNamesList:departmentNamesList, designationNamesList:designationNamesList }}>
        <CssBaseline />
        <Box sx={{ backgroundColor: "background.default" }}>
          <BrowserRouter>
            <Routes>
              <Route path="/Samadhan-DiamondFrames/" element={<LoginPage />} />
              <Route path="/Samadhan-DiamondFrames/login" element={<LoginPage />} />
              <Route path="/Samadhan-DiamondFrames/signup" element={<SignupPage />} />
              <Route path="/Samadhan-DiamondFrames/forgotpassword" element={<ForgotPasswordPage />} />
              <Route path="/Samadhan-DiamondFrames/home" element={<HomePage />} />
              <Route path="/Samadhan-DiamondFrames/dashboard" element={<DashboardPage />} />
              <Route path="/Samadhan-DiamondFrames/master/activity" element={<ActivityPage />} />
              <Route path="/Samadhan-DiamondFrames/master/service" element={<ServicePage />} />
              <Route path="/Samadhan-DiamondFrames/master/unit" element={<UnitPage />} />
              <Route path="/Samadhan-DiamondFrames/master/category" element={<CategoryPage />} />
              <Route path="/Samadhan-DiamondFrames/master/product" element={<ProductPage />} />
              <Route path="/Samadhan-DiamondFrames/master/serviceproduct" element={<ServiceProductPage />} />
              <Route path="/Samadhan-DiamondFrames/master/department" element={<DepartmentPage />} />
              <Route path="/Samadhan-DiamondFrames/master/designation" element={<DesignationPage />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </DataContextProvider>
    </ThemeProvider>
    </CookiesProvider>
  );
};

export default AppRoutes;

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataContextProvider } from "../contexts/DataContexts";
import { ActivityRoleNameModel, CategoryModel, ServiceNameModel, UnitOfSalesModel, ProductModel, DepartmentNameModel, DesignationNameModel, EWayBillModel, LocationTypeModel } from "../models/Model";
import { theme } from "../theme/AppTheme";
import ActivityPage from "../ui/Master/ActivityPage";
import ServicePage from "../ui/Master/ServicePage";
import UnitPage from "../ui/Master/UnitPage";
import CategoryPage from "../ui/Master/CategoryPage";
import DashboardPage from "../ui/DashboardPage";
import LoginPage from "../ui/LoginPage";
import ProductPage from "../ui/Master/Product";
import SignupPage from "../ui/Signup";
import ForgotPasswordPage from "../ui/ForgotPasswordPage";
import { CookiesProvider } from "react-cookie";
import ServiceProductPage from "../ui/Master/ServiceProduct";
import DepartmentPage from "../ui/Master/Department";
import DesignationPage from "../ui/Master/Designation";
import EWayBillPage from "../ui/Master/EWayBill";
import LocationTypePage from "../ui/Master/LocationType";
import WorkFloorPage from "../ui/ServiceCatalogue/WorkFloorPage"
import WorkLocationPage from "../ui/ServiceCatalogue/WorkLocationPage";
import DesignTypePage from "../ui/ServiceCatalogue/DesignTypePage";

const AppRoutes = () => {
  const activityNamesList = useState<ActivityRoleNameModel[]>([]);
  const serviceNameList = useState<ServiceNameModel[]>([]);
  const unitOfSalesList = useState<UnitOfSalesModel[]>([]);
  const categoryList = useState<CategoryModel[]>([]);
  const productList = useState<ProductModel[]>([]);
  const departmentNamesList = useState<DepartmentNameModel[]>([]);
  const designationNamesList = useState<DesignationNameModel[]>([]);
  const eWayBillList = useState<EWayBillModel[]>([]);
  const locationTypeList = useState<LocationTypeModel[]>([]);
  // const [cookies, setCookie] = useCookies(["dfc"]);
  // useEffect(() => {
  //   debugger;
  //   if (!cookies || !cookies.dfc || !cookies.dfc.uid)  {
  //     Navigate(`/login`);
  //   }
  // },[]);

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <DataContextProvider
          value={{
            categoryList: categoryList,
            activityNamesList: activityNamesList,
            unitOfSalesList: unitOfSalesList,
            serviceNameList: serviceNameList,
            productList: productList,
            departmentNamesList: departmentNamesList,
            designationNamesList: designationNamesList,
            eWayBillList: eWayBillList,
            locationTypeList: locationTypeList,
          }}
        >
          <CssBaseline />
          <Box sx={{ backgroundColor: "background.default" }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="forgotpassword" element={<ForgotPasswordPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="master/activity" element={<ActivityPage />} />
                <Route path="master/service" element={<ServicePage />} />
                <Route path="master/unit" element={<UnitPage />} />
                <Route path="master/category" element={<CategoryPage />} />
                <Route path="master/product" element={<ProductPage />} />
                <Route path="master/serviceproduct" element={<ServiceProductPage />} />
                <Route path="master/department" element={<DepartmentPage />} />
                <Route path="master/designation" element={<DesignationPage />} />
                <Route path="master/ewaybill" element={<EWayBillPage />} />
                <Route path="master/locationtype" element={<LocationTypePage/>} />
                <Route path="servicecatalogue/workfloor" element={<WorkFloorPage/>} />
                <Route path="servicecatalogue/worklocation" element={<WorkLocationPage/>} />
                <Route path="servicecatalogue/designtype" element={<DesignTypePage/>} />
                
              </Routes>
            </BrowserRouter>
          </Box>
        </DataContextProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
};

export default AppRoutes;

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataContextProvider } from "../contexts/DataContexts";
import { ActivityRoleNameModel, CategoryModel, ServiceNameModel, UnitOfSalesModel, ProductModel, DepartmentNameModel, DesignationNameModel, EWayBillModel, LocationTypeModel } from "../models/Model";
import { theme } from "../theme/AppTheme";
import ActivityPage from "../ui/Admin/Master/ActivityPage";
import ServicePage from "../ui/Admin/Master/ServicePage";
import UnitPage from "../ui/Admin/Master/UnitPage";
import CategoryPage from "../ui/Admin/Master/CategoryPage";
import DashboardPage from "../ui/DashboardPage";
import LoginPage from "../ui/LoginPage";
import ProductPage from "../ui/Admin/Master/Product";
import SignupPage from "../ui/Signup";
import ForgotPasswordPage from "../ui/ForgotPasswordPage";
import { CookiesProvider } from "react-cookie";
import ServiceProductPage from "../ui/Admin/Master/ServiceProduct";
import DepartmentPage from "../ui/Admin/Master/Department";
import DesignationPage from "../ui/Admin/Master/Designation";
import EWayBillPage from "../ui/Admin/Master/EWayBill";
import LocationTypePage from "../ui/Admin/Master/LocationType";
import WorkFloorPage from "../ui/Admin/ServiceCatalogue/WorkFloorPage";
import WorkLocationPage from "../ui/Admin/ServiceCatalogue/WorkLocationPage";
import DesignTypePage from "../ui/Admin/ServiceCatalogue/DesignTypePage";
import PostNewDesignPage from "../ui/Admin/ServiceCatalogue/PostNewDesignPage";
import BrandMasterPage from "../ui/Dealer/BrandAndProducts/BrandMaster";
import BrandPage from "../ui/Dealer/BrandAndProducts/Brand";
import ProductListPage from "../ui/Dealer/Product/Product";
import MyServices from "../ui/Dealer/CompanyProfile/MyServices";
import BuyerCategory from "../ui/Dealer/BrandAndProducts/BuyerCategory";
import Basic from "../ui/Dealer/CompanyProfile/Basic";
import MaterialSetup from "../ui/Admin/ServiceCatalogue/MaterialSetup";
import EmployeeList from "../ui/Contractor/Employee/EmployeeList";
import CBasic from "../ui/Contractor/CompanyProfile/CBasic";
import CMyService from "../ui/Contractor/CompanyProfile/CMyService";
import AddDepartment from "../ui/Contractor/Organization/AddDepartment";
import AddDesignation from "../ui/Contractor/Organization/AddDesignation";

const AppRoutes = () => {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
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
              <Route path="master/locationtype" element={<LocationTypePage />} />
              <Route path="servicecatalogue/workfloor" element={<WorkFloorPage />} />
              <Route path="servicecatalogue/worklocation" element={<WorkLocationPage />} />
              <Route path="servicecatalogue/designtype" element={<DesignTypePage />} />
              <Route path="servicecatalogue/postnewdesign" element={<PostNewDesignPage />} />
              <Route path="servicecatalogue/materialsetup" element={<MaterialSetup />} />
              <Route path="dealer/brandmaster" element={<BrandMasterPage />} />
              <Route path="dealer/brandsetup" element={<BrandPage />} />
              <Route path="dealer/productlisting" element={<ProductListPage />} />
              <Route path="dealer/myservices" element={<MyServices />} />
              <Route path="dealer/buyercategory" element={<BuyerCategory />} />
              <Route path="dealer/basicdetails" element={<Basic />} />
              <Route path="contractor/employee/employee-list" element={<EmployeeList />} />
              <Route path="contractor/companyprofile/cbasic" element={<CBasic/>}/>
              <Route path="contractor/companyprofile/cmyservice" element={<CMyService/>}/>
              <Route path="contractor/organization/adddepartment" element={<AddDepartment/>}/>
              <Route path="contractor/organization/adddesignation" element={<AddDesignation/>}/>
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </CookiesProvider>
  );
};

export default AppRoutes;

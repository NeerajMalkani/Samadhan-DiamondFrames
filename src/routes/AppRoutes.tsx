import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ActivityRoleNameModel, CategoryModel, ServiceNameModel, UnitOfSalesModel, ProductModel, DepartmentNameModel, DesignationNameModel, EWayBillModel, LocationTypeModel } from "../models/Model";
import { theme } from "../theme/AppTheme";
import ActivityPage from "../ui/Admin/Master/ActivityPage";
import ServicePage from "../ui/Admin/Master/ServicePage";
import UnitPage from "../ui/Admin/Master/UnitPage";
import CategoryPage from "../ui/Admin/Master/CategoryPage";
import DashboardPage from "../ui/DashboardPage";
import DashboardPocket from "../ui/DashboardPocket";
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
import EmployeeList from "../ui/Common/Employee/EmployeeList";
import CBasic from "../ui/Common/Company Profile/CBasic";
import CMyService from "../ui/Contractor/CompanyProfile/CMyService";
import AddDepartment from "../ui/Common/Organization/AddDepartment";
import AddDesignation from "../ui/Common/Organization/AddDesignation";
import ImageGalleryCategoryPage from "../ui/GeneralUsers/ImageGalleryAndEstimation/ImageGalleryCategory";
import ImageGalleryProductPage from "../ui/GeneralUsers/ImageGalleryAndEstimation/ImageGalleryProduct";
import ImageGalleryProductDetailsPage from "../ui/GeneralUsers/ImageGalleryAndEstimation/ProductDetails";
import ProductEstimationDetailsPage from "../ui/GeneralUsers/ImageGalleryAndEstimation/ProductEstimationDetails";
import UserEstimationListPage from "../ui/GeneralUsers/ImageGalleryAndEstimation/UserEstimationList";
import ContractorClientPage from "../ui/Contractor/Client/CClient";
import AddBranch from "../ui/Common/Organization/AddBranch";
import EmployeeEdit from "../ui/Common/Employee/EmployeeEdit";
import DesignWisePage from "../ui/Contractor/QuotationAndEstimation/DesignWise/DesignWise";
import Approved from "../ui/Admin/Users/Approved";
import Pending from "../ui/Admin/Users/Pending";
import Declined from "../ui/Admin/Users/Declined";
import Userbasic from "../ui/GeneralUsers/Userbasic";
import UserBasic from "../ui/Common/UserProfile/Userbasic";
import AppUserEnquiry from "../ui/Contractor/Enquiries/AppUserEnquiry";
import ArchitectAndConsultant from "../ui/Contractor/Enquiries/ArchitectAndConsultant";
import YetStartProject from "../ui/Contractor/Projects/YetStartProject";
import OngoingProject from "../ui/Contractor/Projects/OngoingProject";
import CompletedProject from "../ui/Contractor/Projects/CompletedProject";
import Pocketscreen from "../ui/Pocket/PocketScreen";
import PocketSource from "../ui/Pocket/PocketSource";
import PocketReport from "../ui/Pocket/PocketReport";
import PocketCashcheck from "../ui/Pocket/PocketCashcheck";
import PocketInbox from "../ui/Pocket/PocketInbox";
import ClientList from "../ui/Common/Client/ClientList";
import PocketRemainder from "../ui/Pocket/PocketRemainder";
import RateCardSetup from "../ui/Contractor/RateCard/RateCardSetup";
import AddRateCard from "../ui/Contractor/RateCard/AddRateCard";
import ClientEdit from "../ui/Common/Client/ClientEdit";
import ArchitectRateCardSetup from "../ui/Architect/ArchitectRateCardSetup";



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
              /*pocketDashboard*/
              <Route path="dashboardpocket" element={<DashboardPocket />} />
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
              <Route path="common/companyprofile/cbasic" element={<CBasic />} />
              <Route path="contractor/companyprofile/cmyservice" element={<CMyService />} />
              <Route path="common/organization/department" element={<AddDepartment />} />
              <Route path="common/organization/designation" element={<AddDesignation />} />
              <Route path="contractor/organization/branch" element={<AddBranch />} />
              <Route path="generaluser/imagegallery/productdetails" element={<ImageGalleryProductDetailsPage />} />
              <Route path="generaluser/imagegallery/productestimationdetails" element={<ProductEstimationDetailsPage />} />
              <Route path="generaluser/userestimation" element={<UserEstimationListPage />} />
              <Route path="common/employee/edit/:id" element={<EmployeeEdit />} />
              <Route path="generaluser/imagegallery/category" element={<ImageGalleryCategoryPage />} />
              <Route path="generaluser/imagegallery/product" element={<ImageGalleryProductPage />} />
              <Route path="contractor/clientlist" element={<ContractorClientPage />} />
              <Route path="contractor/quotationandestimation/designwise" element={<DesignWisePage />} />
              <Route path="Common/employee/employeelist" element={<EmployeeList />} />
              <Route path="users/approved" element={<Approved/>}/>
              <Route path="users/pending" element={<Pending/>}/>
              <Route path="users/declined" element={<Declined/>}/>
              <Route path="user/profile" element={<UserBasic />}/>

              <Route path="contractor/enquiries/appuserenquiry" element={<AppUserEnquiry />} />
              <Route path="contractor/enquiries/architectandconsultant" element={<ArchitectAndConsultant />} />
              <Route path="contractor/projects/yetstartproject" element={<YetStartProject />} />
              <Route path="contractor/projects/Ongoingproject" element={<OngoingProject />} />
              <Route path="contractor/projects/completedproject" element={<CompletedProject />} />
              <Route path="pocketscreen" element={<Pocketscreen />} />
              <Route path="pocketsource" element={<PocketSource />} />
              <Route path="pocketreport" element={<PocketReport />} />
              <Route path="pocketcashcheck" element={<PocketCashcheck />} />
              <Route path="pocketinbox" element={<PocketInbox />} />
              <Route path="pocketremainder" element={<PocketRemainder />} />
              <Route path="common/client/clientlist" element={<ClientList />}/>

              <Route path="master/ratecardsetup" element={<RateCardSetup />} />
              <Route path="master/addratecard" element={<AddRateCard />} />
              <Route path="common/client/edit/:id" element={<ClientEdit/>}/>
              <Route path="architect/architectratecardsetup" element ={<ArchitectRateCardSetup/>} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </CookiesProvider>
  );
};

export default AppRoutes;


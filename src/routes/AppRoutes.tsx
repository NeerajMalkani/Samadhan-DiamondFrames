import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import BuyerCategory from "../ui/Dealer/BrandAndProducts/BuyerCategory";
import MaterialSetup from "../ui/Admin/ServiceCatalogue/MaterialSetup";
import EmployeeListPage from "../ui/Common/Employee/EmployeeList";
import CBasic from "../ui/Common/CompanyProfile/CBasic";
import MyServices from "../ui/Common/CompanyProfile/MyServices";
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
import AddServiceProduct from "../ui/Admin/Master/AddServiceProduct";
import SendRateCard from "../ui/Contractor/RateCard/SendRateCard";
import SendRateCardList from "../ui/Contractor/RateCard/SendRateCardList";
import QuotationWise from "../ui/Contractor/QuotationAndEstimation/QuotationWise";
// import CategoryName from "../ui/GeneralUsers/PocketDiary/Setting/CategoryName";
// import SubCategoryName from "../ui/GeneralUsers/PocketDiary/Setting/SubCategoryName";
import BudgetSetup from "../ui/Common/PocketDiary/Setting/BudgetSetup";
import AddExpenses from "../ui/Common/PocketDiary/AddExpenses";
import Sources from "../ui/Common/PocketDiary/Source";
import Inbox from "../ui/Common/PocketDiary/Inbox";
import DashboardManufacture from "../ui/DashboardManufacture";
import BrandConversionValue from "../ui/Manufacture/ProductionUnitMaster/BrandConversionValue";
import OpeningStock from "../ui/Manufacture/ProductionUnitMaster/OpeningStock";

import ProductProduction from "../ui/Manufacture/ProductProduction";
import ProductOrderList from "../ui/Manufacture/ProductOrderList";
import CreateNewProductOrder from "../ui/Manufacture/CreateNewProductOrder";
import VenderOrderFormList from "../ui/Manufacture/VendorForm/VenderOrderFormList";
import VenderOrderAddForm from "../ui/Manufacture/VendorForm/VenderOrderAddForm";
import InvoiceRecieptList from "../ui/Manufacture/VendorForm/InvoiceRecieptList";
import AddInvoiceReciept from "../ui/Manufacture/VendorForm/AddInvoiceReciept";
import ProductionStatus from "../ui/Manufacture/ProductionStatus";
import AddProductionStatus from "../ui/Manufacture/AddProductionStatus";
import SummaryMaterial from "../ui/Manufacture/SummaryMaterial";

import OpeningStockScrap from "../ui/Manufacture/ProductionUnitMaster/OpeningStockScrap";
import EmployeeRequest from "../ui/Manufacture/Employee/EmployeeRequest";
import MarkAvailability from "../ui/Manufacture/Employee/MarkAvailability";
import EmployeeAvailabilityEntryList from "../ui/Manufacture/Employee/EmployeeAvailabilityEntryList";
import EmployeeAttendenceEntry from "../ui/Manufacture/Employee/EmployeeAttendenceEntry";
import EmployeeAttendenceEntryList from "../ui/Manufacture/Employee/EmployeeAttendenceEntryList";

import ACategoryName from "../ui/Admin/PocketDairyMaster/ACategoryName";
import ASubCategoryName from "../ui/Admin/PocketDairyMaster/ASubcategoryName";

import GCategoryName from "../ui/Common/PocketDiary/Setting/GCategoryName";
import GSubCategoryName from "../ui/Common/PocketDiary/Setting/GSubCategoryName";
import GMyContacts from "../ui/Common/PocketDiary/Setting/GMyContacts";
import GMyBank from "../ui/Common/PocketDiary/Setting/GMyBank";
import AddSource from "../ui/Common/PocketDiary/AddSource";
import ABrandConversionValue from "../ui/Admin/ProductionUnitMaster/ABrandConversationValue";
import WidthOfGPCoil from "../ui/Admin/ProductionUnitMaster/WidthOfGPCoil";
import MassOfZincCoating from "../ui/Admin/ProductionUnitMaster/MassOfZIncCoating";

import AddExpensesList from "../ui/Common/PocketDiary/ExpensesList";
import AddBank from "../ui/Common/Organization/AddBank";
import MyPersonalBank from "../ui/Common/PocketDiary/Setting/MyPersonalBank";




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
              {/* <Route path="dealer/basicdetails" element={<Basic />} /> */}
              <Route path="common/companyprofile/cbasic" element={<CBasic />} />
              <Route path="common/organization/services" element={<MyServices />} />
              <Route path="common/organization/department" element={<AddDepartment />} />
              <Route path="common/organization/designation" element={<AddDesignation />} />
              <Route path="common/organization/branch" element={<AddBranch />} />
              <Route path="generaluser/imagegallery/productdetails" element={<ImageGalleryProductDetailsPage />} />
              <Route path="generaluser/imagegallery/productestimationdetails" element={<ProductEstimationDetailsPage />} />
              <Route path="generaluser/userestimation" element={<UserEstimationListPage />} />
              <Route path="common/employee/edit/:id" element={<EmployeeEdit />} />
              <Route path="generaluser/imagegallery/category" element={<ImageGalleryCategoryPage />} />
              <Route path="generaluser/imagegallery/product" element={<ImageGalleryProductPage />} />
              <Route path="contractor/clientlist" element={<ContractorClientPage />} />
              <Route path="contractor/quotationandestimation/designwise" element={<DesignWisePage />} />
              <Route path="Common/employee/employeelist" element={<EmployeeListPage />} />
              <Route path="users/approved" element={<Approved />} />
              <Route path="users/pending" element={<Pending />} />
              <Route path="users/declined" element={<Declined />} />
              <Route path="user/profile" element={<UserBasic />} />

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
              <Route path="common/client/clientlist" element={<ClientList />} />
              <Route path="contractor/ratecardsetup" element={<RateCardSetup />} />
              <Route path="contractor/ratecard/edit/:id" element={<AddRateCard />} />
              <Route path="contractor/addratecard" element={<AddRateCard />} />
              <Route path="common/client/edit/:id" element={<ClientEdit />} />
              <Route path="architect/architectratecardsetup" element={<ArchitectRateCardSetup />} />
              <Route path="master/addserviceproduct" element={<AddServiceProduct />} />
              <Route path="master/serviceproduct/edit/:id" element={<ServiceProductPage />} />
              <Route path="contractor/ratecard/sendratecard/edit/:id" element={<SendRateCard />} />
              <Route path="contractor/ratecard/sendratecard" element={<SendRateCard />} />
              <Route path="contractor/ratecard/sendratecardlist" element={<SendRateCardList />} />
              <Route path="contractor/quotationandeListestimation/quotationwise" element={<QuotationWise />} />
              {/* <Route path="generalusers/pocketdiary/setting/categoryname" element={<CategoryName/>}/>
              <Route path="generalusers/pocketdiary/setting/subcategoryname" element={<SubCategoryName/>}/> */}

              <Route path="common/pocketdiary/setting/budgetsetup" element={<BudgetSetup/>}/>
              <Route path="common/pocketdiary/addexpenses" element={<AddExpenses/>}/>
              <Route path="common/pocketdiary/source" element={<Sources/>}/>
              <Route path="common/pocketdiary/inbox" element={<Inbox/>}/>
              <Route path="dashboardmanufacture" element={<DashboardManufacture/>}/>
              <Route path="manufacture/poductionunitmaster/brandconversionvalue" element={<BrandConversionValue/>}/>
              <Route path="manufacture/productionunitmaster/openingstock" element={<OpeningStock/>}/>

              <Route path="manufacture/productproduction" element={<ProductProduction/>}/>
              <Route path="manufacture/productOrderList" element={<ProductOrderList/>}/>
              <Route path="manufacture/newproductorder" element={<CreateNewProductOrder />}/>
              <Route path="manufacture/venderOrderForm" element={<VenderOrderFormList/>}/>
              <Route path="manufacture/venderorderaddform" element={<VenderOrderAddForm />}/>
              <Route path="manufacture/invoicerecieptlist" element={<InvoiceRecieptList/>}/>
              <Route path="manufacture/addinvoicereciept" element={<AddInvoiceReciept />}/>
              <Route path="manufacture/productionstatus" element={<ProductionStatus/>}/>
              <Route path="manufacture/addProductionStatus" element={<AddProductionStatus />}/>
              <Route path="manufacture/summaryMaterial" element={<SummaryMaterial/>}/>

              <Route path="manufacture/productionunitmaster/openingstockscrap" element={<OpeningStockScrap/>}/>
              <Route path="manufacture/employee/employeerequest" element={<EmployeeRequest/>}/>
              <Route path="manufacture/employee/markavailability" element={<MarkAvailability/>}/>
              <Route path="manufacture/employee/employeeavailabilityentrylist" element={<EmployeeAvailabilityEntryList/>}/>
              <Route path="manufacture/employee/employeeattendenceentry" element={<EmployeeAttendenceEntry/>}/>
              <Route path="manufacture/employee/employeeattendenceentrylist" element={<EmployeeAttendenceEntryList/>}/>

              <Route path="admin/pocketddairymaster/acategoryname" element={<ACategoryName/>}/>
              <Route path="admin/pocketddairymaster/asubcategoryname" element={<ASubCategoryName/>}/>

              <Route path="common/pocketdiary/setting/gcategoryname" element={<GCategoryName/>}/>
              <Route path="common/pocketdiary/setting/gsubcategoryname" element={<GSubCategoryName/>}/>
              <Route path="common/pocketdiary/setting/gmycontacts" element={<GMyContacts/>}/>
              <Route path="common/pocketdiary/setting/gmybank" element={<GMyBank/>}/>
              <Route path="common/pocketdiary/addsource" element={<AddSource/>}/>
              <Route path="admin/productionunitmaster/abrandconversationvalue" element={<ABrandConversionValue/>}/>
              <Route path="admin/productionunitmaster/widthofgpcoil" element={<WidthOfGPCoil/>}/>
              <Route path="admin/productionunitmaster/massofzinccoating" element={<MassOfZincCoating/>}/>
              <Route path="common/pocketdiary/expenseslist" element={<AddExpensesList/>}/>
              <Route path="common/organization/addbank" element={<AddBank/>}/>
              <Route path="common/pocketdiary/setting/mypersonalbank" element={<MyPersonalBank/>}/>
              

            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </CookiesProvider>
  );
};

export default AppRoutes;

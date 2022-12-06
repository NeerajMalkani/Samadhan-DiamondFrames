import axios from "axios";

const BASE_URL_OLD = "https://api.starselector.com/api";
// const BASE_URL_OLD = "https://dfsolutions.in/api/apicommon/spawu7S4urax/tYjD/";
const BASE_URL = "https://dfsolutions.in/api/apicommon/spawu7S4urax/tYjD";
const BASE_URL_Admin =
  "https://dfsolutions.in/api/apiappadmin/spawu7S4urax/tYjD";
const BASE_URL_Dashboard =
  "https://dfsolutions.in/api/apidashboard/spawu7S4urax/tYjD";

class Provider {
  API_URLS = {
    /******************************LOGIN************************************/
    LoginCheck: "logincheck/",
    UserFromRefNo: "userrefnocheck/",

    /******************************SIGN UP************************************/
    NewUserProfile: "newuserprofilecreate/",

    /******************************FORGOT PASSWORD************************************/
    MobileCheck: "mobilenocheck/",
    ForgotMobileNoCheck: "forgotmobilenocheck/",
    ForgotPasswordCheck: "forgotpasswordcheck/",
    AlterPasswordCheck: "alterpasswordcheck/",

    /******************************Admin Master************************************/
    GroupFromRefNo: "grouprefnocheck/",
    GroupNameCreate: "groupnamecreate/",
    GroupNameUpdate: "groupnameupdate/",

    ServiceFromRefNo: "servicerefnocheck/",
    ServiceNameCreate: "servicenamecreate/",
    ServiceNameUpdate: "servicenameupdate/",

    UnitCategoryFromRefNo: "unitcategoryrefnocheck/",
    UnitNameCreate: "unitnamecreate/",
    UnitNameUpdate: "unitnameupdate/",

    DepartmentRefNoCheck: "departmentrefnocheck/",
    DepartmentNameCreate: "departmentnamecreate/",
    DepartmentNameUpdate: "departmentnameupdate/",

    DesignationRefNoCheck: "designationrefnocheck/",
    DesignationNameCreate: "designationnamecreate/",
    DesignationNameUpdate: "designationnameupdate/",

    EWayBillRefNoCheck: "ewaybillrefnocheck/",
    GetStateEWayBillForm: "getstateewaybillform/",
    EWayBillCreate: "ewaybillcreate/",
    EWayBillUpdate: "ewaybillupdate/",

    LocationTypeRefNoCheck: "locationtyperefnocheck/",
    LocationTypeCreate: "locationtypecreate/",
    LocationTypeUpdate: "locationtypeupdate/",

    ActivityRoleCategory: "getactivityrolecategoryform/",
    CategoryFromRefNo: "categoryrefnocheck/",
    CategoryNameCreate: "categorynamecreate/",
    CategoryNameUpdate: "categorynameupdate/",

    ProductFromRefNo: "productrefnocheck/",
    ActivityRoleForProduct: "getactivityroleproductform/",
    ServiceForProduct: "getservicenameproductform/",
    CategoryForProduct: "getcategorynameproductform/",
    CategoryDataForProduct: "getcategorydataproductform/",
    UnitNameSelectedForProduct: "getunitnameserviceproductform/",
    UnitNameForProduct: "getunitnameproductform/",
    ProductNameCreate: "productnamecreate/",
    ProductNameUpdate: "productnameupdate/",

    ServiceProductrefNoCheck: "serviceproductrefnocheck/",
    ServiceProductFilter: "serviceproductfilter/",
    ActivityRoleServiceProduct: "getactivityroleserviceproductform/",
    ServiceNameServiceProduct: "getservicenameserviceproductform/",
    CategoryNameServiceProduct: "getcategorynameserviceproductform/",
    CategoryDataServiceProduct: "getcategorydataserviceproductform/",
    ProductServiceProduct: "getproductnameserviceproductform/",
    ServiceProductCreate: "serviceproductcreate/",
    ServiceProductUpdate: "serviceproductupdate/",
    //
    DealerCompanyDetail: "getdealercompanybasicdetails/",
    StateDetails: "getstatedetails/",
    DistrictDetails: "	getdistrictdetails_by_state_refno/",
    DealerCompanyDetailUpdate: "dealercompanybasicdetailsupdate/",

    WorkFloorRefNoCheck: "workfloorrefnocheck/",
    WorkFloorCreate: "workfloornamecreate/",
    WorkFloorUpdate: "workfloornameupdate/",

    WorkLocationRefNoCheck: "worklocationrefnocheck/",
    WorkLocationCreate: "worklocationnamecreate/",
    WorkLocationUpdate: "worklocationnameupdate/",

    ActivityRolesDesignType: "getgroupnamedesigntypeform/",
    ServiceNameDesignType: "getservicenamedesigntypeform/",
    CategoryNameDesignType: "getcategorynamedesigntypeform/",
    ProductNameDesignType: "getproductnamedesigntypeform/",
    DesignTypeRefNoCheck: "designtyperefnocheck/",
    DesignTypeCreate: "designtypecreate/",
    DesignTypeUpdate: "designtypeupdate/",

    ActivityRolesMaterialSetup: "getgroupnamematerialsetupform/",
    ServiceNameMaterialSetup: "getservicenamematerialsetupform/",
    CategoryNameMaterialSetup: "getcategorynamematerialsetupform/",
    ProductNameMaterialSetup: "getproductnamematerialsetupform/",
    ProductDesignTypeMaterialSetup: "getproductdesigntypematerialsetupform/",
    ServiceNamePopupMaterialSetup: "getservicename_popup_materialsetupform/",
    CategoryNamePopupMaterialSetup: "getcategoryname_popup_materialsetupform/",
    ProductListPopupMaterialSetup: "getproductlist_popup_materialsetupform/",
    BrandNamelistPopupMaterialSetup: "getbrandnamelist_popup_materialsetupform/",
    ProductRateBrandRefNoMaterialSetup: "getproductrate_by_brandrefno_materialsetupform/",
    MaterialsSetupRefNoCheck: "materialssetuprefnocheck/",
    MaterialsSetupCreate: "materialsetupcreate/",
    MaterialsSetupUpdate: "materialsetupupdate/",
    MaterialsSetupList: "materialssetuplist/",
    /******************************Dashboard************************************/

    GetdashboardTotaluser: "getdashboard_totaluser/",
    GetdashboardUserswitchto: "getdashboard_userswitchto/",
    Getdashboard_Userswitchto_Proceed: "getdashboard_userswitchto_proceed/",
    GetdashboardServicecatalogue: "getdashboard_servicecatalogue/",
    GetserviceimagegalleryByServicerefno: "getserviceimagegallery_by_servicerefno/",
    Getgotoestimation: "getgotoestimation/",

    PostNewDesignRefNoCheck: "postnewdesignrefnocheck/",
    PostNewDesignCreate: "postnewdesigncreate/",
    PostNewDesignUpdate: "postnewdesignupdate/",

    DealerBrandMasterRefNoCheck: "dealerbrandmasterrefnocheck/",
    DealerBrandMasterCreate: "dealerbrandmastercreate/",
    DealerBrandMasterUpdate: "dealerbrandmasterupdate/",

    DealerBuyerCategoryRefNoCheck: "dealerbuyercategoryrefnocheck/",
    DealerBuyerCategoryCreate: "dealerbuyercategorycreate/",
    DealerBuyerCategoryUpdate: "dealerbuyercategoryupdate/",

    DesignGalleryRefNoCheck: "designgalleryrefnocheck/",
    NewDesignCreate: "newdesigncreate/",
    NewDesignUpdate: "newdesignupdate/",
    AutoDesignNoNewDesign: "getautodesignnonewdesignform/",
    ActivityRoleNameNewDesign: "getgroupnamenewdesignform/",
    ServiceNameNewDesign: "getservicenamenewdesignform/",
    CategoryNameNewDesign: "getcategorynamenewdesignform/",
    ProductNameNewDesign: "getproductnamenewdesignform/",
    ProductDesignTypeNewDesign: "getproductdesigntypenewdesignform/",
    ProductDataNewDesign: "getproductdatanewdesignform/",
    WorkLocationNameNewDesign: "getworklocationnamenewdesignform/",
    AlternativeUnitOfSalesServiceProduct: "getalternativeunitofsalesserviceproductform/",
    GetscEstimation: "getsc_estimation/",

    MyDepartmentRefnocheck: "mydepartmentrefnocheck/",
    DepartmentCreate: "departmentcreate/",
    DepartmentUpdate: "departmentupdate/",
    GetUserApprovelist: "getuserapprovelist/",

    MyDesignationRefnocheck: "mydesignationrefnocheck/",
    DesignationCreate: "designationcreate/",
    DesignationUpdate: "designationupdate/",
     
    MyBranchRefnocheck: "mydesignationrefnocheck/",

    AadharnoAutocomplete: "aadharnoautocomplete/",
    MobilenoAutocomplete: "mobilenoautocomplete/",
    EmployeeSearch: "employeesearch/",
    EmployeeAdd: "employeeadd/",
    EmployeeCreate: "employeecreate/",
    SendotptoEmployee: "sendotptoemployee/",
    EmployeeotpVerify: "employeeotpverify/",
    MyemployeeList: "myemployeelist/",
    GetEmployeeBasicData: "getemployeebasicdata/",
    EmployeeBasicDataUpdate: "employeebasicdataupdate/",
    GetBranchNameEmployeeWorkForm: "getbranchnameemployeeworkform/",
    GetDepartmentNameEmployeeWorkForm: "getdepartmentnameemployeeworkform/",
    GetDesignationnamEemployeeWorkForm: "getdesignationnameemployeeworkform/",
    GetReportingToEmployeeWorkForm: "getreportingtoemployeeworkform/",
    GetEmptypeNameEmployeeWorkForm: "getemptypenameemployeeworkform/",
    GetEmployeeWorkData: "getemployeeworkdata/",
    EmployeeWorkDataUpdate: "employeeworkdataupdate/",
    GetWagesTypeNameEmployeeWorkForm: "getwagestypenameemployeeworkform/",
    GetEmployeePaydata: "getemployeepaydata/",
    EmployeePaydataUpdate: "employeepaydataupdate/",
  };
  getAll(resource: string) {
    return axios.get<Array<any>>(`${BASE_URL_OLD}/${resource}`, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
    });
  }
  get(resource: string, id: string) {
    return axios.get<any>(`${BASE_URL_OLD}/${resource}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
    });
  }
  create(resource: string, params: any) {
    return axios.post<any>(`${BASE_URL_OLD}/${resource}`, params, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
    });
  }
  createDFCommon(resource: string, params: any) {
    return axios.post<any>(`${BASE_URL}/${resource}`, params);
  }

  createDFF(resource: string) {
    return axios.post<any>(`${BASE_URL}/${resource}`);
  }

  update(resource: string, params: any, id: any) {
    return axios.put<any>(
      `${BASE_URL_OLD}/${resource}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
        },
      },
      params
    );
  }
  delete(resource: string, id: any) {
    return axios.delete<any>(`${BASE_URL_OLD}/${resource}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
    });
  }
  deleteAll(resource: string) {
    return axios.delete<any>(`${BASE_URL_OLD}/${resource}`, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
    });
  }

  deleteAllParams(resource: string, params: any) {
    return axios.delete(`${BASE_URL_OLD}/${resource}`, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
      data: params,
    });
  }
  createDFAdmin(resource: string, params: any = null) {
    if (params) {
      return axios.post(`${BASE_URL_Admin}/${resource}`, params);
    } else {
      return axios.post(`${BASE_URL_Admin}/${resource}`);
    }
  }
  createDFDashboard(resource: string, params: any = null) {
    if (params) {
      return axios.post(`${BASE_URL_Dashboard}/${resource}`, params);
    } else {
      return axios.post(`${BASE_URL_Dashboard}/${resource}`);
    }
  }
  createDFAdminWithHeader(resource, params) {
    if (params) {
      return axios.post(`${BASE_URL_Admin}/${resource}`, params, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      return axios.post(`${BASE_URL_Admin}/${resource}`, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  }
}

export default new Provider();

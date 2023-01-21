import axios from "axios";

const BASE_URL_OLD = "https://api.starselector.com/api";
// const BASE_URL_OLD = "https://dfsolutions.in/api/apicommon/spawu7S4urax/tYjD/";
const BASE_URL = "https://dfsolutions.in/api/apicommon/spawu7S4urax/tYjD";

const BASE_URL_Admin =
  "https://dfsolutions.in/api/apiappadmin/spawu7S4urax/tYjD";
const BASE_URL_Dashboard =
  "https://dfsolutions.in/api/apidashboard/spawu7S4urax/tYjD";
const BASE_URL_Contractor =
  "https://dfsolutions.in/api/apicontractor/spawu7S4urax/tYjD/";
const BASE_URL_PocketDiary =
  "https://dfsolutions.in/api/apipocketdiary/spawu7S4urax/tYjD/";

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

    MyBranchRefnocheck: "branchrefnocheck/",
    MyFetchBranchtype: "getbranchtypebranchform/",
    MyFetchBranchAssign: "getassignbranchadminbranchform/",
    AddBranch: "branchcreate/",
    EditBranch: "branchupdate/",
    MyFetchRegionalOffice: "getparentbranchrefnobranchform/",
    CompanyBranchForm: "getcompanynamebranchform/",
    FetchBranchAssignContactNo: "getassignbranchadmin_contactno_branchform/",

    ServiceNameDealerBrandSetup: "getservicenamedealerbrandsetupform/",
    CategoryNameDealerBrandSetup: "getcategorynamedealerbrandsetupform/",
    CategoryDataDealerBrandSetup: "getcategorydatadealerbrandsetupform/",
    UnitOfSaleDealerBrandSetup: "getunitofsaledealerbrandsetupform/",
    BrandNameDealerBrandSetup: "getbrandnamedealerbrandsetupform/",
    BuyerCategoryDiscountDealerBrandSetup: "getbuyercategorydiscountdealerbrandsetupform/",
    DealerBrandRefNoCheck: "dealerbrandrefnocheck/",
    DealerBrandSetupCreate: "dealerbrandsetupcreate/",
    DealerBrandSetupUpdate: "dealerbrandsetupupdate/",

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

    MyClientUserRefNoCheck: "myclientuserrefnocheck/",
    CompanyNameAutocompleteClientSearch: "companynameautocompleteclientsearch/",
    MobileNoAutocompleteClientSearch: "mobilenoautocompleteclientsearch/",
    ClientSearch: "clientsearch/",
    ClientAdd: "clientadd/",
    ClientCreate: "clientcreate/",
    ClientUpdate: "clientupdate/",

    getservicenamedealermyserviceform: "getservicenamedealermyserviceform/",
    dealermyservicecreate: "dealermyservicecreate/",
    dealermyserviceupdate: "dealermyserviceupdate/",
    dealermyservicerefnocheck: "dealermyservicerefnocheck/",
    DealerCompanyProductRefNo: "dealercompanyproductrefnocheck/",
    GetBrandnameDealerProductform: "getbrandnamedealerproductform/",
    GetProductDealerProductform: "getproductnamedealerproductform/",
    GetProductDataDealerProductform: "getproductdatadealerproductform/",
    DealerProductSetUpCreate: "dealerproductsetupcreate/",
    DealerProductSetupUpdate: "dealerproductsetupupdate/",
    getassignbranchadminedit_branchform: "getassignbranchadminedit_branchform/",

    getservicenameratecardform: "getservicenameratecardform/",
    getcategorynameratecardform: "getcategorynameratecardform/",
    getcategorydataratecardform: "getcategorydataratecardform/",
    getproductnameratecardform: "getproductnameratecardform/",
    getunitofsaleratecardform: "getunitofsaleratecardform/",
    getmaterialratedataratecardform: "getmaterialratedataratecardform/",
    getmaterialratedata_unitofsaleonchange_ratecardform: "getmaterialratedata_unitofsaleonchange_ratecardform/",
    getmaterialratedata_withmaterialrateblur_ratecardform: "getmaterialratedata_withmaterialrateblur_ratecardform/",
    getmaterialratedata_withoutmaterialrateblur_ratecardform: "getmaterialratedata_withoutmaterialrateblur_ratecardform/",
    ratecardcreate: "ratecardcreate/",
    ratecardupdate: "ratecardupdate/",
    getuserprofile: "getuserprofile/",
    userprofileupdate: "userprofileupdate/",

    pckcategoryrefnocheck: "pckcategoryrefnocheck_appadmin/",
    pckcategorynamecreate: "pckcategorynamecreate_appadmin/",
    pckcategorynameupdate: "pckcategorynameupdate_appadmin/",

    pcksubcategoryrefnocheck: "pcksubcategoryrefnocheck_appadmin/",
    gettransactiontype_pcksubcategoryform: "gettransactiontype_pcksubcategoryform_appadmin/",
    gettransactiontype_pckcategoryform_appadmin: "gettransactiontype_pckcategoryform_appadmin/",
    getpckcategoryname_pcksubcategoryform_appadmin: "getpckcategoryname_pcksubcategoryform_appadmin/",
    pcksubcategorynamecreate_appadmin: "pcksubcategorynamecreate_appadmin/",
    pcksubcategorynameupdate_appadmin: "pcksubcategorynameupdate_appadmin/",
    gettransactiontype_pckcategoryform_user: "gettransactiontype_pckcategoryform_user/",
    pckcategoryrefnocheck_user: "pckcategoryrefnocheck_user/",
    pckcategorynamecreate_user: "pckcategorynamecreate_user/",
    pckcategorynameupdate_user: "pckcategorynameupdate_user/",
    pcksubcategoryrefnocheck_user: "pcksubcategoryrefnocheck_user/",
    gettransactiontype_pcksubcategoryform_user: "gettransactiontype_pcksubcategoryform_user/",
    getpckcategoryname_pcksubcategoryform_user: "getpckcategoryname_pcksubcategoryform_user/",
    pcksubcategorynamecreate_user: "pcksubcategorynamecreate_user/",
    pcksubcategorynameupdate_user: "pcksubcategorynameupdate_user/",

    pckmycontactrefnocheck: "pckmycontactrefnocheck/",
    pckmycontactscreate: "pckmycontactscreate/",
    pckmycontactsupdate: "pckmycontactsupdate/",
    contractorproductrefnocheck: "contractorproductrefnocheck/",
    get_pckentrytype:"get_pckentrytype/",

    get_pckpaymentmodetype:"get_pckpaymentmodetype/",
    getcategoryname_pckaddexpensesform:"getcategoryname_pckaddexpensesform/",

    userbankrefnocheck:"userbankrefnocheck/",
    userbankcreate:"userbankcreate/",
    userbankupdate:"userbankupdate/",	
    getcardtype_pckmypersonalbankform:"getcardtype_pckmypersonalbankform/",

    getbranchnamebankform:"getbranchnamebankform/",
    branchbankrefnocheck:"branchbankrefnocheck/",
    branchbankcreate:"branchbankcreate/",
    branchbankupdate:"branchbankupdate/",

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
  createDFPocketDairy(resource: string, params: any) {
    return axios.post<any>(`${BASE_URL_PocketDiary}/${resource}`, params);
  }

  createDFCommon(resource: string, params: any) {
    return axios.post<any>(`${BASE_URL}/${resource}`, params);
  }

  createDFCommonWithouParam(resource: string) {
    return axios.post<any>(`${BASE_URL}/${resource}`);
  }
  createDFCommonWithHeader(resource, params) {
    if (params) {
      return axios.post(`${BASE_URL}/${resource}`, params, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      return axios.post(`${BASE_URL}/${resource}`, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  }

  createDFContractor(resource: string, params: any) {
    return axios.post<any>(`${BASE_URL_Contractor}/${resource}`, params);
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

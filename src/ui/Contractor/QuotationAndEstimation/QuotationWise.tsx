import {
  Alert, AlertColor, Autocomplete, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel,
  FormHelperText, Grid, IconButton, InputAdornment, MenuItem, Paper, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, Tab, Tabs, TextField, Typography,
  List, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, DialogContentText
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import ShowsGrid from "../../../components/GridStructure";
import Header from "../../../components/Header";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { QuotationProductDetailsModel, SendRateCardModel, ButtonSettings, ProductDetailsModel, EstimationCostDetails, ImageGalleryEstimation, MaterialSetupModel, QuotationDataModel, QuotationWiseProductModel } from "../../../models/Model";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { theme } from "../../../theme/AppTheme";
import { contractorApprovedQuotation, contractorPendingQuotation, contractorRejectedQuotation, materialSetupColumns } from "../../../utils/tablecolumns";
import { ArrowBack } from "@mui/icons-material";
import PrismaZoom from "react-prismazoom";
import { LoadingButton, useTabContext } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import Provider from "../../../api/Provider";
import { communication } from "../../../utils/communication";
import { CalculateSqfeet, GetStringifyJson } from "../../../utils/CommonFunctions";
import { retrunValueFromLocation } from "../../../utils/JSCommonFunction";
import { UploadImageToS3WithNativeSdk } from "../../../utils/AWSFileUpload";
import uuid from "react-uuid";
import AddIcon from '@mui/icons-material/Add';
import { TextareaAutosize } from '@mui/base';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import SearchIcon from "@mui/icons-material/Search";
import {
  QuotationSendPendingModel, QuotationApprovePendingModel, QuotationApprovedModel, QuotationCancellationModel,
  QuotationRejectedModel, ClientModel, ServiceNameModel, CategoryModel
} from "../../../models/Model";
import { quotationSendPendingColumns, quotationApprovePendingColumns, quotationApprovedColumns, quotationRejectedColumns, quotationCancellationColumns } from "../../../utils/tablecolumns";
import CreateClient from "../../../components/Client";

interface ProductItemModel {
  productID: number;
  serviceID: number;
  categoryID: number;
  unitOfSalesID: number;
  selectedUnitID: number;
  productName: string;
  serviceName: string;
  categoryName: string;
  unit: string;
  altUnit: string;
  rate: string;
  altRate: string;
  amount: string;
  quantity: string;
  remarks: string;
  footConversion: string;
  meterConversion: string;
  unit1ID: number;
  unit2ID: number;
}


interface BrandProductItemModel {
  brandID: number;
  brandName: string;
  productID: number;
  price: number;
  unitValue: number;
  categoryName: string;
}

interface BrandItemModel {
  brandID: number;
  brandName: string;
  categoryName: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const buttonSetting: ButtonSettings = {
  isActionButton: false,
  actionButtons: [],
};

const QuotationWise = () => {
  //#region Variables

  let dummyClient: ClientModel = null;
  let navigate = useNavigate();
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmQuotationCancel, setConfirmQuotationCancel] = useState(false);
  const [confirmQuotationToClient, setConfirmQuotationToClient] = useState(false);

  const [value, setValue] = useState(0);
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cancelID, SetCancelID] = useState(0);
  const [quotationToClientID, SetQuotationToClientID] = useState(0);
  const [clientName, setClientName] = useState("--Select--");
  const [clientNameID, setClientNameID] = useState<number>(0);
  const [clientNameError, SetClientNameError] = useState("");
  const [isClientNameError, IsSetClientNameError] = useState(false);
  const [clientNameList, setClientNameList] = useState<Array<ClientModel>>([]);
  const [clientNameFullData, setClientNameFullData] = useState([]);

  const [cName, setCName] = useState("");
  const [clientNo, setClientNo] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectNameError, setProjectNameError] = useState("");
  const [isProjectNameError, setIsProjectNameError] = useState(false);

  const [contactPerson, setContactPerson] = useState("");
  const [isContactPersonError, setIsContactPersonError] = useState(false);

  const [contactNo, setContactNo] = useState("");

  const [projectDescription, setProjectDescription] = React.useState("");
  const [termsConditions, setTermsConditions] = React.useState("");

  const [projectSiteAddress, setProjectSiteAddress] = React.useState("");
  const [projectSiteAddressErrorText, setProjectSiteAddressErrorText] = useState("");
  const [isProjectSiteAddressError, setIsProjectSiteAddressError] = useState(false);

  const [stateError, setStateError] = useState("");
  const [isStateError, setIsStateError] = useState(false);
  const [selectedStateName, setSelectedStateName] = useState("");
  const [selectedStateID, setSelectedStateID] = useState(0);
  const [statesFullData, setStatesFullData] = useState([]);

  const [cityError, setCityError] = useState("");
  const [isCityError, setIsCityError] = useState(false);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedCityID, setSelectedCityID] = useState(0);
  const [cityFullData, setCityFullData] = useState([]);

  const [unitOfSales, setUnitOfSales] = useState("--Select--");
  const [unitOfSalesID, setUnitOfSalesID] = useState<number>(0);
  const [unitOfSalesError, SetUnitOfSalesError] = useState("");
  const [isUnitOfSalesError, IsSetUnitOfSalesError] = useState(false);

  const [checkInclusiveMaterial, setCheckInclusiveMaterial] = useState(false);
  const [sendToClient, setSendToClient] = useState(false);

  const [quotationSendPendingList, setQuotationSendPendingList] = useState<Array<QuotationSendPendingModel>>([]);
  const [quotationSendPendingListTemp, setQuotationSendPendingListTemp] = React.useState<Array<any>>([]);

  const [quotationCancellationList, setQuotationCancellationList] = useState<Array<QuotationCancellationModel>>([]);
  const [quotationCancellationListTemp, setQuotationCancellationListTemp] = React.useState<Array<any>>([]);

  const [quotationApprovePendingList, setQuotationApprovePendingList] = useState<Array<QuotationApprovePendingModel>>([]);
  const [quotationApprovePendingListTemp, setQuotationApprovePendingListTemp] = React.useState<Array<any>>([]);

  const [quotationApprovedList, setQuotationApprovedList] = useState<Array<QuotationApprovedModel>>([]);
  const [quotationApprovedListTemp, setQuotationApprovedListTemp] = React.useState<Array<any>>([]);

  const [quotationRejectedList, setQuotationRejectedList] = useState<Array<QuotationRejectedModel>>([]);
  const [quotationRejectedListTemp, setQuotationRejectedListTemp] = React.useState<Array<any>>([]);

  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [searchQuery, setSearchQuery] = useState("");

  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [quotationNo, setQuotationNo] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");

  const [sn, setSn] = useState("--Select--");
  const [snID, setSnID] = useState<number>(0);
  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);

  const [cn, setCn] = useState("--Select--");
  const [cnID, setCnID] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<Array<CategoryModel>>([]);

  const [productItem, setProductItem] = useState<Array<ProductItemModel>>([]);
  const [brandProductList, setBrandProductList] = useState<Array<BrandProductItemModel>>([]);
  const [brandList, setBrandList] = useState<Array<BrandItemModel>>([]);

  const [pn, setPn] = useState("--Select--");
  const [pnID, setPnID] = useState(0);
  const [productError, setProductError] = useState("");
  const [isProductError, setIsProductError] = useState(false);
  const [productList, setProductList] = useState<Array<QuotationWiseProductModel>>([]);
  const [productFullData, setProductFullData] = useState([]);
  const [showNote, setShowNote] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [arnID, setArnID] = useState<number>(0);
  const [subTotal, setSubTotal] = React.useState<number>(0);
  let sTotal = 0;



  //#endregion 

  //#region Functions

  useEffect(() => {
    let id = window.location.pathname.split('/').at(-1);
    if (!isNaN(parseInt(id))) {
      setSelectedID(parseInt(id));
      //FetchRateCardByID(parseInt(id));
      FetchActvityRoles();
    }
    else {
      FetchCompanyName(0);
      FetchActvityRoles();
    }

    FetchStates();

  }, []);

  const handleConfirmDialogueClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmQuotationDialogueClose = () => {
    setConfirmQuotationCancel(false);
  };

  const handleConfirmQuotationToClientDialogueClose = () => {
    setConfirmQuotationToClient(false);
  };

  const FetchActvityRoles = () => {
    Provider.getAll("master/getmainactivities")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            let contractorData = response.data.data.find((el) => {
              return el.display && el.activityRoleName === "Contractor";
            });
            setArnID(contractorData.id);
            FetchServicesFromActivity();
          }
        }
      })
      .catch((e) => { });
  };

  const updateProducts = () => {

    let updatedUnit = "";
    if (unitOfSales === "foot") {
      setUnitOfSales("meter");
      updatedUnit = "meter";
    }
    else {
      setUnitOfSales("foot");
      updatedUnit = "foot";
    }
    debugger;
    productItem.find(function (item, i) {
      let rate = item.rate;
      let unit = item.unit;
      let selUnit = item.selectedUnitID;
      item.rate = item.altRate;
      item.unit = item.altUnit;
      item.altRate = rate;
      item.altUnit = unit;
      item.quantity = (updatedUnit === "meter") ? (parseFloat(item.quantity) * parseFloat(item.footConversion)).toFixed(3).toString() : (parseFloat(item.quantity) * parseFloat(item.meterConversion)).toFixed(3).toString();
      item.selectedUnitID = (updatedUnit === "meter") ? item.unit2ID : item.unit1ID
    });

    setProductItem(productItem);
    setConfirmOpen(false);
  };

  const CancelQuotation = () => {

    UpdateQuotationEstimation(cancelID, 2);

    setConfirmQuotationCancel(false);
  };

  const QuotationToCient = () => {

    UpdateQuotationEstimation(quotationToClientID, 1);
    setConfirmQuotationToClient(false);

  };

  const FetchServicesFromActivity = () => {
    let params = {
      ContractorID: cookies.dfc.UserID,
    };
    Provider.getAll(`master/getcontractoractiveservices?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setServiceNameList(response.data.data);
          }
        }
      })
      .catch((e) => { });
  };

  //#region Done

  const handleProductDialogClose = () => {
    setOpenProductDialog(false);
    SetResetServiceName();
    SetResetCategoryName();
    SetResetProductName(true);
    //FetchProductBrandFromProductID("");
  };

  const SetResetServiceName = () => {
    setSn("--Select--");
    setSnID(0);
  };

  const SetResetCategoryName = () => {
    setCn("--Select--");
    setCnID(0);
    setCategoryList([]);
  };

  const SetResetProductName = (isBlank: boolean) => {
    if (isBlank) {
      setPn("--Select--");
      setPnID(0);
      setProductList([]);
      setProductFullData([]);
    }
    setProductError("");
    setIsProductError(false);
  };

  const handleToggle = (value: QuotationWiseProductModel) => {
    let dataIndex = -1;
    var currentIndex = productItem.findIndex((x) => x.productID === value.productID);
    if (currentIndex > -1) {
      dataIndex = currentIndex;
    }

    let tempProductList = [...productList];
    var itemIndex = tempProductList.findIndex((x) => x.productID === value.productID);
    const newChecked = [...productItem];
    let newRate = "", newUnit = "", altRate = "", altUnit = "", selectedUnit = 0;

    if (unitOfSales === "foot") {
      newRate = value.footRate;
      newUnit = value.unit1Name;
      altRate = value.meterRate;
      altUnit = value.unit2Name;
      selectedUnit = value.unit1ID;
    }
    else {
      newRate = value.meterRate;
      newUnit = value.unit2Name;
      altRate = value.footRate;
      altUnit = value.unit1Name;
      selectedUnit = value.unit2ID;
    }


    if (currentIndex === undefined || currentIndex === null || currentIndex === -1) {

      newChecked.push({
        productID: value.productID,
        productName: value.productName,
        serviceName: value.serviceName,
        categoryName: value.categoryName,
        serviceID: value.serviceID,
        categoryID: value.categoryID,
        selectedUnitID: selectedUnit,
        unitOfSalesID: value.unitOfSalesID,
        rate: newRate,
        unit: newUnit,
        altRate: altRate,
        altUnit: altUnit,
        amount: value.amount,
        quantity: value.quantity,
        remarks: value.remarks,
        footConversion: value.footConversion,
        meterConversion: value.meterConversion,
        unit1ID: value.unit1ID,
        unit2ID: value.unit2ID
      });

      tempProductList[itemIndex] = { ...tempProductList[itemIndex], isChecked: true };
    } else {
      newChecked.splice(dataIndex, 1);
      tempProductList[itemIndex] = { ...tempProductList[itemIndex], isChecked: false };
    }

    setProductItem(newChecked);
    setProductList(tempProductList);
    if (newChecked.length > 0) {
      setShowNote(true);
      setShowButton(true);
    }
    else {
      setShowNote(false);
      setShowButton(false);
    }
  };

  const UpdateSubTotal = (productList) => {
    if (productList.length > 0) {
      let subTotal = 0;
      productList.map((data: any, i: number) => {
        subTotal += parseFloat(data.amount);
      });
      setSubTotal(parseInt(subTotal.toFixed(0)));
    }

    return parseInt(subTotal.toFixed(0));
  };

  const UpdateListItem = (value: QuotationWiseProductModel) => {
    let dataIndex = -1;
    var currentIndex = productItem.findIndex((x) => x.productID === value.productID);
    if (currentIndex > -1) {
      dataIndex = currentIndex;
    }

    let tempProductList = [...productList];
    var itemIndex = tempProductList.findIndex((x) => x.productID === value.productID);
    const newChecked = [...productItem];
    let newRate = "", newUnit = "", altRate = "", altUnit = "", selectedUnit = 0;

    // if (unitOfSales === "foot") {
    //   newRate = value.footRate;
    //   newUnit = value.unit1Name;
    //   altRate = value.meterRate;
    //   altUnit = value.unit2Name;
    //   selectedUnit = value.unit1ID;
    // }
    // else {
    //   newRate = value.meterRate;
    //   newUnit = value.unit2Name;
    //   altRate = value.footRate;
    //   altUnit = value.unit1Name;
    //   selectedUnit = value.unit2ID;
    // }

    if (currentIndex === undefined || currentIndex === null || currentIndex === -1) {
      // newChecked.push({
      //   productID: value.productID,
      //   productName: value.productName,
      //   serviceName: value.serviceName,
      //   categoryName: value.categoryName,
      //   serviceID: value.serviceID,
      //   categoryID: value.categoryID,
      //   selectedUnitID: selectedUnit,
      //   unitOfSalesID: value.unitOfSalesID,
      //   rate: newRate,
      //   unit: newUnit,
      //   altRate: altRate,
      //   altUnit: altUnit
      // });
      tempProductList[itemIndex] = { ...tempProductList[itemIndex], isChecked: true };
    } else {
      //newChecked.splice(dataIndex, 1);
      tempProductList[itemIndex] = { ...tempProductList[itemIndex], isChecked: false };
    }

    setProductItem(newChecked);
    setProductList(tempProductList);
    // if (newChecked.length > 0) {
    //   setShowNote(true);
    //   setShowButton(true);
    // }
    // else {
    //   setShowNote(false);
    //   setShowButton(false);
    // }
    if (productItem.length > 0) {
      productItem.map((data: any, i: number) => {

      });
    }

  };

  const FetchCompanyName = (clientID) => {
    let params = {
      AddedByUserID: cookies.dfc.UserID,
    };
    Provider.getAll(`master/getcontractorclientlist?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        const clientdata: any = [];
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setClientNameFullData(response.data.data);
            response.data.data.map((data: any, i: number) => {
              clientdata.push({
                id: data.id,
                companyName: data.companyName,
              });
            });
            setClientNameList(clientdata);
            if (clientID !== "") {
              let d = response.data.data.filter((el: any) => {
                return el.id == clientID;
              });
              setClientName(d[0].companyName);
              setClientNameID(d[0].id);
              setCName(d[0].contactPerson);
              setClientNo(d[0].contactMobileNumber);
            }
          }
        }
      })
      .catch((e) => { });
  };

  const handleClientNameChange = (event: SelectChangeEvent) => {
    let companyName: string = event.target.value;
    let ac = clientNameFullData.find((el) => el.companyName === companyName);
    if (ac !== undefined) {
      setClientName(companyName);
      setClientNameID(ac?.id);
      IsSetClientNameError(false);
      SetClientNameError("");
      setCName(ac?.contactPerson);
      setClientNo(ac?.contactMobileNumber);
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCNChange = (event: SelectChangeEvent) => {
    let categoryName: number = parseInt(event.target.value);
    let ac = categoryList.find((el) => el.id === categoryName);
    if (ac !== undefined) {
      setCn(ac.categoryName);
      setCnID(categoryName);
      FetchProductsFromCategory(arnID, snID, ac.id);
    }
  };

  const FetchProductsFromCategory = (selectedActivitryID: number, selectedServiceID: number, selectedCategoryID: number) => {
    let params = {
      ActivityID: selectedActivitryID,
      ServiceID: selectedServiceID,
      CategoryID: selectedCategoryID,
      ContractorID: cookies.dfc.UserID,
      InclusiveMaterial: checkInclusiveMaterial
    };
    Provider.getAll(`master/getcontractorratecardproductsbycategoryid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const fullData = response.data.data.map((o) => ({
              ...o,
              isChecked: productItem.find((el) => {
                return el.productID === o.productID;
              })
                ? true
                : false,
              amount: "",
              quantity: "",
            }));
            setProductList(fullData);
            setProductFullData(fullData);
          }
        }
      })
      .catch((e) => { });
  };

  const handleDialogueClose = () => {
    setDialogueOpen(false);
  };


  //#endregion

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        //FetchData_sendpending();
        break;
      case 1:
        FetchData_sendpending();
        break;
      case 2:
        FetchData_approvepending();
        break;
      case 3:
        FetchData_sendpending();
        break;
      case 4:
        FetchData_Cancellation();
        break;
      case 5:
        FetchData_Cancellation();
        break;

    }
    setValue(newValue);
  };

  const checkboxhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (productItem.length === 0) {
      setCheckInclusiveMaterial(event.target.checked);
    }
  };

  const sendToClienthandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (productItem.length > 0) {
      setSendToClient(event.target.checked);
    }
  };



  const FetchStates = () => {

    Provider.getAll("master/getstates")
      .then((response: any) => {

        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const stateData: any = [];
            response.data.data.map((data: any, i: number) => {
              stateData.push({
                id: data.id,
                label: data.stateName,
                // setStateNameList(response.data.data);
              });
            });
            setStatesFullData(stateData);
          }
        }
      })
      .catch((e) => { });
  };

  const FetchCities = (stateID: number, selectedCityID) => {
    let params = {
      ID: stateID,
    };
    Provider.getAll(`master/getcitiesbyid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {

        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const cityData: any = [];
            response.data.data.map((data: any, i: number) => {
              cityData.push({
                id: data.id,
                label: data.cityName,
              });
            });
            setCityFullData(cityData);
            if (selectedCityID > 0) {
              let ct = response.data.data.find((el) => el.id === selectedCityID);
              if (ct !== undefined) {
                setSelectedCityName(ct.cityName);
                setSelectedCityID(ct.id);
              }
            }
          }
        }
      })
      .catch((e) => { });
  };

  const handleUnitOfSalesChange = (event: SelectChangeEvent) => {
    if (productItem.length == 0) {
      let unitOfSales: string = event.target.value;
      setUnitOfSales(unitOfSales);
    }
    else {
      setConfirmOpen(true);
    }
  };

  const handleEdit = (type: string | null, a: QuotationSendPendingModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setSelectedID(a.id);
      setButtonDisplay("unset");
      setActionStatus("edit");
      setQuotationNo(a.quotationNo);
      setProjectName(a.projectName);
      setContactPerson(a.contactPerson);
      setContactNo(a.contactNumber);
      setProjectDescription(a.projectDescription);
      setProjectSiteAddress(a.projectSiteAddress);
      setTermsConditions(a.termsNCondition);
      let ac = clientNameFullData.find((el) => el.id === a?.clientID);
      if (ac !== undefined) {
        setClientName(ac.companyName);
        setClientNameID(ac?.id);
        IsSetClientNameError(false);
        SetClientNameError("");
        setCName(ac?.contactPerson);
        setClientNo(ac?.contactMobileNumber);
      }

      let st = statesFullData.find((el) => el.id === a?.stateID);
      if (st !== undefined) {
        setSelectedStateName(st.label);
        setSelectedStateID(st?.id);
        FetchCities(st?.id, a?.cityID);
      }

      debugger;
      setUnitOfSales(a.selectedUnitID === 1 ? "foot" : "meter");
      setCheckInclusiveMaterial(a.inclusiveMaterials);
      FetchProductsByID(a.id, a.selectedUnitID === 1 ? "foot" : "meter");
      setValue(0);
    }
  };

  const handleCancel = (type: string | null, a: QuotationCancellationModel | undefined) => {
    debugger;
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setSelectedID(a.id);
      setButtonDisplay("unset");
      setActionStatus("edit");
      setQuotationNo(a.quotationNo);
      setProjectName(a.projectName);
      setContactPerson(a.contactPerson);
      setContactNo(a.contactNumber);
      setProjectDescription(a.projectDescription);
      setProjectSiteAddress(a.projectSiteAddress);
      setTermsConditions(a.termsNCondition);
      let ac = clientNameFullData.find((el) => el.id === a?.clientID);
      if (ac !== undefined) {
        setClientName(ac.companyName);
        setClientNameID(ac?.id);
        IsSetClientNameError(false);
        SetClientNameError("");
        setCName(ac?.contactPerson);
        setClientNo(ac?.contactMobileNumber);
      }

      let st = statesFullData.find((el) => el.id === a?.stateID);
      if (st !== undefined) {
        setSelectedStateName(st.label);
        setSelectedStateID(st?.id);
        FetchCities(st?.id, a?.cityID);
      }

      debugger;
      setUnitOfSales(a.selectedUnitID === 1 ? "foot" : "meter");
      setCheckInclusiveMaterial(a.inclusiveMaterials);
      FetchProductsByID(a.id, a.selectedUnitID === 1 ? "foot" : "meter");
      setValue(0);
    }
  };

  const FetchProductsByID = (selectedID: number, selectedUnit) => {
    debugger;
    let params = {
      AddedByUserID: cookies.dfc.UserID,
      ID: selectedID
    };
    Provider.getAll(`master/getquotationwiseestimationproductsbyid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            let arr = [];
            response.data.data.find(function (item, i) {
              arr.push({
                productID: item.productID,
                serviceID: item.serviceID,
                categoryID: item.categoryID,
                unitOfSalesID: item.unitOfSalesID,
                productName: item.productName,
                serviceName: item.serviceName,
                categoryName: item.categoryName,
                selectedUnitID: selectedUnit == "foot" ? item.unit1ID : item.unit2ID,
                unit: selectedUnit == "foot" ? item.unit1Name : item.unit2Name,
                altUnit: selectedUnit == "foot" ? item.unit2Name : item.unit1Name,
                rate: selectedUnit == "foot" ? item.footRate : item.meterRate,
                altRate: selectedUnit == "foot" ? (parseFloat(item.footRate) * parseFloat(item.meterConversion)).toFixed(2) : (parseFloat(item.meterRate) * parseFloat(item.footConversion)).toFixed(2),
                quantity: item.quantity,
                remarks: item.remarks,
                amount: ((selectedUnit == "foot" ? item.footRate : item.meterRate) * item.quantity).toFixed(0).toString(),
                footConversion: item.footConversion,
                meterConversion: item.meterConversion,
                unit1ID: item.unit1ID,
                unit2ID: item.unit2ID

              });
            });
            debugger;
            setProductItem(arr);
            setShowButton(true);
            setShowNote(true);
          }
        }
      })
      .catch((e) => { });
  };

  const FetchPendingEstimationByID = (id: number) => {
    let params = {
      ID: id,
      AddedByUserID: cookies.dfc.UserID
    };
    Provider.getAll(`master/getquotationwiseestimationbyid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setClientNameID(response.data.data[0].clientID);

            setUnitOfSales(response.data.data[0].selectedUnitID == 1 ? "foot" : "meter");
            setCheckInclusiveMaterial(response.data.data[0].inclusiveMaterials);
          }
          setLoading(false);
          //FetchCompanyName(response.data.data[0].clientID);
          //FetchProductsByID(id, response.data.data[0].selectedUnitID == 1 ? "foot" : "meter");
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const onChangeSearch_SendPending = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setQuotationSendPendingListTemp(quotationSendPendingList);
    } else {
      setQuotationSendPendingListTemp(
        quotationSendPendingList.filter((el: QuotationSendPendingModel) => {
          return el.quotationNo.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const onChangeSearch_ApprovePending = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setQuotationApprovePendingListTemp(quotationApprovePendingList);
    } else {
      setQuotationApprovePendingListTemp(
        quotationApprovePendingList.filter((el: QuotationApprovePendingModel) => {
          return el.quotationNo.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const onChangeSearch_ApprovedList = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setQuotationApprovedListTemp(quotationApprovedList);
    } else {
      setQuotationApprovedListTemp(
        quotationApprovedList.filter((el: QuotationApprovedModel) => {
          return el.quotationNo.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const onChangeSearch_Rejected = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setQuotationRejectedListTemp(quotationRejectedList);
    } else {
      setQuotationRejectedListTemp(
        quotationRejectedList.filter((el: QuotationRejectedModel) => {
          return el.quotationNo.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
    setClientNameID(0);
    setClientNameList([]);
    setClientName("--Select--");
    IsSetClientNameError(false);
    SetClientNameError("");
    setCName("");
    setClientNo("");
    setProjectName("");
    setIsProjectNameError(false);
    setProjectNameError("");
    setContactPerson("");
    setContactNo("");
    setProjectDescription("");
    setProjectSiteAddress("");
    setIsProjectSiteAddressError(false);
    setProjectSiteAddressErrorText("");

    setSelectedStateName("");
    setSelectedStateID(0);
    setCityFullData([]);
    setStatesFullData([]);
    setSelectedCityName("");
    setSelectedCityID(0);
    setIsCityError(false);
    setCityError("");
    setUnitOfSales("--Select--");
    SetUnitOfSalesError("");
    IsSetUnitOfSalesError(false);
    setShowNote(false);
    setProductItem([]);
    setTermsConditions("");
  };

  const FetchData_sendpending = () => {
    let params = {
      AddedByUserID: cookies.dfc.UserID,
      Status: 0,
    };
    Provider.getAll(`master/getquotationwiseestimationstatus?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.unit = a.selectedUnitID == 1 ? "Foot" : "Meter";
              a.materials = a.inclusiveMaterials ? "Yes" : "No";
              a.status = a.status == 0 ? "Pending" : "";
              a.clientContactPersonNumber = a.contactPerson + ' & ' + a.contactNumber;

              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setQuotationSendPendingList(arrList);
            setQuotationSendPendingListTemp(arrList);

          }
        } else {
          setSnackbarType("info");
          setSnackMsg(communication.NoData);
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarType("error");
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const FetchData_Cancellation = () => {
    let params = {
      AddedByUserID: cookies.dfc.UserID,
      Status: 2,
    };
    Provider.getAll(`master/getquotationwiseestimationstatus?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.unit = a.selectedUnitID == 1 ? "Foot" : "Meter";
              a.materials = a.inclusiveMaterials ? "Yes" : "No";
              a.status = a.status == 0 ? "Pending" : a.status == 2 ? "Cancelled" : "";
              a.clientContactPersonNumber = a.contactPerson + ' & ' + a.contactNumber;

              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setQuotationCancellationList(arrList);
            setQuotationCancellationListTemp(arrList);

          }
        } else {
          setSnackbarType("info");
          setSnackMsg(communication.NoData);
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarType("error");
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const FetchData_approvepending = () => {
    let params = {
      AddedByUserID: cookies.dfc.UserID,
      Status: 1,
    };
    Provider.getAll(`master/getquotationwiseestimationstatus?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.unit = a.selectedUnitID == 1 ? "Foot" : "Meter";
              a.materials = a.inclusiveMaterials ? "Yes" : "No";
              a.status = a.status == 0 ? "Pending" : "";
              a.clientContactPersonNumber = a.contactPerson + ' & ' + a.contactNumber;



              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setQuotationApprovePendingList(arrList);
            setQuotationApprovePendingListTemp(arrList);

          }
        } else {
          setSnackbarType("info");
          setSnackMsg(communication.NoData);
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarType("error");
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };



  const handleSubmitClick = () => {
    debugger;
    let isValid = true;


    if (clientName === "--Select--") {
      isValid = false;
      SetClientNameError("Please select Client name");
      IsSetClientNameError(true);
    }

    if (projectName === "") {
      isValid = false;
      setProjectNameError("Please enter project name");
      setIsProjectNameError(true);
    }

    if (projectSiteAddress === "") {
      isValid = false;
      setProjectSiteAddressErrorText("Please enter project site address");
      setIsProjectSiteAddressError(true);
    }

    if (productItem.length !== 0 && isValid) {
      InsertUpdateData();
    }
    else {
      setSnackMsg("Please select all mandatory fields");
      setOpen(true);
      setSnackbarType("error");
    }
  };

  const InsertUpdateData = () => {
    let productArr = [];
    productItem.find(function (item, i) {
      productArr.push({
        ID: 0,
        QuotationID: selectedID,
        ProductID: parseInt(item.productID.toString()),
        ServiceID: item.serviceID,
        CategoryID: parseInt(item.categoryID.toString()),
        SelectedUnitID: item.selectedUnitID,
        UnitOfSalesID: item.unitOfSalesID,
        Rate: item.rate,
        Quantity: parseFloat(item.quantity),
        Remarks: item.remarks === undefined ? "" : item.remarks
      });
    });

    let quotationWiseEstimations = [{
      ID: selectedID,
      ClientID: clientNameID,
      ProjectName: projectName,
      ContactPerson: contactPerson,
      ContactNumber: contactNo,
      ProjectDescription: projectDescription,
      ProjectSiteAddress: projectSiteAddress,
      StateID: selectedStateID,
      CityID: selectedCityID,
      SelectedUnitID: unitOfSales === "foot" ? 1 : 2,
      InclusiveMaterials: checkInclusiveMaterial,
      TermsNCondition: termsConditions,
      Status: sendToClient ? 1 : 0,
      AddedByUserID: cookies.dfc.UserID,
      quotationNo: quotationNo
    }];

    let quotationWiseEstimationItems = productArr;
    let params = {
      quotationWiseEstimations: quotationWiseEstimations,
      quotationWiseEstimationItems: quotationWiseEstimationItems
    };
    debugger;
    Provider.create("master/insertupdatequotationwiseestimation", params)
      .then((response) => {
        debugger;
        if (response.data && response.data.code === 200) {
          ResetFields();
          if (selectedID > 0) {
            setSnackMsg("Record updated Successfully");
          }
          else {
            setSnackMsg("Record inserted Successfully");
          }
          setOpen(true);
          setSnackbarType("success");
          //navigate(`/contractor/ratecard/sendratecardlist`);
        } else if (response.data.code === 304) {
          setSnackMsg(communication.ExistsError);
          setOpen(true);
          setSnackbarType("error");
          ResetFields();
        } else {
          ResetFields();
          setSnackMsg(communication.Error);
          setSnackbarType("error");
          setOpen(true);
        }
      })
      .catch((e) => {
        //ResetFields();
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
  };

  const UpdateQuotationEstimation = (id: number, status: number) => {
    debugger;
    let params = {
      ID: id,
      Status: status
    };
    debugger;
    Provider.create("master/updatequotationestimationstatus", params)
      .then((response) => {
        debugger;
        if (response.data && response.data.code === 200) {

          if (status == 1) {

          }
          else if (status == 2) {

          }


        } else if (response.data.code === 304) {
          setSnackMsg(communication.ExistsError);
          setOpen(true);
          setSnackbarType("error");
          ResetFields();
        } else {
          ResetFields();
          setSnackMsg(communication.Error);
          setSnackbarType("error");
          setOpen(true);
        }
      })
      .catch((e) => {
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
  };

  const FetchData_approved = (type: string) => {
    ResetFields();
    Provider.getAll("master/getactivityroles")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setQuotationApprovedList(arrList);
            setQuotationApprovedListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Activity role " + type);
              setOpen(true);
              setSnackbarType("success");
            }
          }
        } else {
          setSnackbarType("info");
          setSnackMsg(communication.NoData);
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarType("error");
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: number = parseInt(event.target.value);
    let ac = serviceNameList.find((el) => el.id === serviceName);
    if (ac !== undefined) {
      setSn(ac.serviceName);
      setSnID(serviceName);
      SetResetCategoryName();
      SetResetProductName(true);
      FetchCategoriesFromServices(arnID, serviceName);
    }
  };

  const FetchCategoriesFromServices = (selectedActivityID: number, selectedServiceID: number) => {
    let params = {
      ActivityID: selectedActivityID,
      ServiceID: selectedServiceID,
    };

    Provider.getAll(`master/getcategoriesbyserviceid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el: any) => {
              return el.display;
            });
            setCategoryList(response.data.data);
          }
        }
      })
      .catch((e) => { });
  };

  const FetchData_rejected = (type: string) => {
    ResetFields();
    Provider.getAll("master/getactivityroles")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setQuotationRejectedList(arrList);
            setQuotationRejectedListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Activity role " + type);
              setOpen(true);
              setSnackbarType("success");
            }
          }
        } else {
          setSnackbarType("info");
          setSnackMsg(communication.NoData);
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarType("error");
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  //#endregion 

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Quotation Add / Edit</Typography>
          </Grid>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Quotation Add/ Edit" {...a11yProps(0)} />
              <Tab label="Quotation Send pending List" {...a11yProps(1)} />
              <Tab label="Quotation Approve Pending List" {...a11yProps(2)} />
              <Tab label="Quotation Approved List" {...a11yProps(3)} />
              <Tab label="Rejected" {...a11yProps(3)} />
              <Tab label="Quotation Cencelled" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <Grid item xs={4} sm={8} md={12}>
            <TabPanel value={value} index={0}>
              {/* <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={4} sm={8} md={12}>
                  {loading ? (
                    <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <CreateGallery screenType={currentScreen} />
                  )}
                </Grid>
              </Grid> */}
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                <Typography variant="h6">Client Deatils</Typography>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={3}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'right', }}>  <label style={{ color: "#ff0000" }}>*</label>Client Name</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={6}>
                        <FormControl fullWidth size="small" error={isClientNameError}>
                          <Select value={clientName} onChange={handleClientNameChange} >
                            <MenuItem disabled={true} value="--Select--">
                              --Select--
                            </MenuItem>
                            {clientNameList.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.companyName}>
                                  {item.companyName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          <FormHelperText>{clientNameError}</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item sm={1}>
                        <Button variant="contained" onClick={() => {
                          setDialogueOpen(true);
                        }} style={{ marginTop: "-4px" }} sx={{ mr: 1, backgroundColor: theme.palette.success.main }}>
                          <AddIcon />
                        </Button>
                      </Grid>
                    </Grid>

                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={2}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'right', }}>Client Name</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={4}>
                        <TextField
                          fullWidth
                          disabled={true}
                          sx={{ background: "#e5e5e5" }}

                          variant="outlined"
                          size="small"
                          value={cName}
                        />
                      </Grid>
                      <Grid item sm={2}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'right', }}>Client No</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={4}>
                        <TextField
                          fullWidth
                          disabled={true}
                          sx={{ background: "#e5e5e5" }}
                          inputProps={{
                            maxLength: 10,
                          }}
                          variant="outlined"
                          size="small"
                          type="number"
                          value={clientNo}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)", marginTop: "15px" }}>
                <Typography variant="h6">Project Deatils</Typography>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid item xs={4}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}>  <label style={{ color: "#ff0000" }}>*</label>Project Name</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
                        <TextField
                          fullWidth

                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setProjectName((e.target as HTMLInputElement).value);
                            setIsProjectNameError(false);
                            setProjectNameError("");
                          }}
                          error={isProjectNameError}
                          helperText={projectNameError}
                          value={projectName}
                        />
                      </Grid>

                    </Grid>

                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}>Contact Person</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
                        <TextField
                          fullWidth

                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setContactPerson((e.target as HTMLInputElement).value);
                          }}
                          value={contactPerson}
                        />
                      </Grid>

                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={5}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}>Contact Number</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={7}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          inputProps={{
                            maxLength: 10,
                          }}
                          onChange={(e) => {
                            setContactNo((e.target as HTMLInputElement).value);
                          }}
                          value={contactNo}
                        />
                      </Grid>

                    </Grid>

                  </Grid>
                </Grid>
              </Grid>

              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}> Project Description</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
                        <TextField
                          fullWidth
                          id="filled-textarea"
                          placeholder=""
                          multiline
                          maxRows={3}
                          variant="outlined"
                          onChange={(e) => {
                            setProjectDescription((e.target as HTMLInputElement).value);
                          }}
                          value={projectDescription}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}><label style={{ color: "#ff0000" }}>*</label>Project Site Address</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
                        <TextField
                          fullWidth
                          id="filled-textarea"
                          placeholder=""
                          multiline
                          maxRows={3}
                          variant="outlined"
                          onChange={(e) => {
                            setProjectSiteAddress((e.target as HTMLInputElement).value);
                            setIsProjectSiteAddressError(false);
                            setProjectSiteAddressErrorText("");
                          }}
                          error={isProjectSiteAddressError}
                          helperText={projectSiteAddressErrorText}
                          value={projectSiteAddress}

                        />
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}> State</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
                        <Autocomplete
                          disablePortal
                          fullWidth
                          options={statesFullData}
                          //sx={{ width: 300 }}
                          onChange={(event: React.SyntheticEvent, value: any) => {
                            setIsStateError(false);
                            setStateError("");
                            if (value !== null) {
                              setSelectedStateName(value.label);
                              setSelectedStateID(value.id);
                              setCityFullData([]);
                              setSelectedCityName("");
                              setSelectedCityID(0);
                              FetchCities(value.id, 0);
                            }
                          }}
                          value={selectedStateName}
                          renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isStateError} helperText={stateError} />}
                        />
                      </Grid>

                    </Grid>

                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}>City</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
                        <Autocomplete
                          disablePortal
                          fullWidth
                          options={cityFullData}
                          // sx={{ width: 300 }}
                          onChange={(event: React.SyntheticEvent, value: any) => {
                            setIsCityError(false);
                            setCityError("");
                            if (value !== null) {
                              setSelectedCityName(value.label);
                              setSelectedCityID(value.id);
                            }
                          }}
                          value={selectedCityName}
                          renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isCityError} helperText={cityError} />}
                        />
                      </Grid>

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)", marginTop: "15px" }}>
                <Typography variant="h6">Quatation Preparation Type</Typography>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid item xs={5}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'right', }}>  <label style={{ color: "#ff0000" }}>*</label>Unit of Sales</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={7}>
                        <FormControl fullWidth size="small" error={isUnitOfSalesError}>
                          <Select value={unitOfSales} onChange={handleUnitOfSalesChange} >
                            <MenuItem disabled={true} value="--Select--">
                              --Select--
                            </MenuItem>
                            <MenuItem value="foot">Foot</MenuItem>
                            <MenuItem value="meter">Meter</MenuItem>
                          </Select>
                          <FormHelperText>{unitOfSalesError}</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={8}>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox checked={checkInclusiveMaterial} onChange={checkboxhandleChange} />}
                            labelPlacement="start" label="Inclusive Materials" />
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={9}>
                        <Button variant="contained" style={{ marginTop: "-4px" }}
                          onClick={() => {
                            if (unitOfSales !== "--Select--") {
                              setOpenProductDialog(true);
                            }
                            else {
                              setSnackMsg(communication.BlankUnitOfSales);
                              setSnackbarType("error");
                              setOpen(true);
                            }
                          }}
                          sx={{ mr: 1, backgroundColor: theme.palette.success.main }}>
                          <AddIcon />     Add Product
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  {showNote &&
                    <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} sx={{ mt: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                      <Grid item xs={8}>
                        <Typography style={{ color: "red", textAlign: "center" }}>
                          Note:- Once product added you can't change Inclusive Materials option. If you want to change the Inclusive Materials check box tick option, please remove all product and try again!
                        </Typography>
                      </Grid>
                    </Grid>
                  }
                </Grid>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)", marginTop: "15px" }}>
                <Typography variant="h6">Product Details</Typography>
              </Grid>
              <Grid>
                {productItem.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
                      <TableContainer component={Paper} sx={{ width: "100%" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead style={{ backgroundColor: theme.palette.success.main, color: "white" }}>
                            <TableRow>
                              <TableCell sx={{ width: "200px", color: "white" }}>Product Name</TableCell>
                              <TableCell sx={{ width: "80px", color: "white" }}>Unit</TableCell>
                              <TableCell sx={{ width: "96px", color: "white" }}>Quantity</TableCell>
                              <TableCell sx={{ width: "96px", color: "white" }}>Rate</TableCell>
                              <TableCell sx={{ width: "96px", color: "white" }}>Amount</TableCell>
                              <TableCell sx={{ width: "200px", color: "white" }}>Remarks</TableCell>
                              <TableCell sx={{ width: "80px", color: "white" }}>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {productItem.map((row: QuotationWiseProductModel, index: number) => (

                              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  {row.productName}
                                </TableCell>
                                <TableCell align="center">
                                  {row.unit}
                                </TableCell>
                                <TableCell align="center">
                                  <TextField sx={{ width: "96px" }} disabled placeholder="" variant="outlined" size="small" value={row.quantity} />
                                </TableCell>
                                <TableCell align="center">
                                  <TextField sx={{ width: "96px" }} disabled placeholder="" variant="outlined" size="small" value={row.rate} />
                                </TableCell>
                                <TableCell align="center">
                                  <TextField sx={{ width: "96px" }} disabled placeholder="" variant="outlined" size="small" value={row.amount} />
                                </TableCell>
                                <TableCell align="center">
                                  <TextField sx={{ width: "220px" }} disabled placeholder="" variant="outlined" size="small" value={row.remarks} />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
                                    onClick={() => {
                                      let NewArr = [...productItem];
                                      NewArr.splice(index, 1);
                                      setProductItem(NewArr);
                                      if (NewArr.length === 0) {
                                        setShowNote(false);
                                        setShowButton(false);
                                      }
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                          {/* <TableRow>
                            <TableCell align="right" colSpan={4}>Sub Total</TableCell>
                            <TableCell align="center">
                              <TextField sx={{ width: "96px" }} disabled placeholder="" variant="outlined" size="small" value={UpdateSubTotal(productItem)} />
                            </TableCell>
                          </TableRow> */}
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={4} sm={4} md={3} sx={{ mt: 1, display: "flex", justifyContent: "center" }}>

                      {/* take button here */}

                    </Grid>
                  </>
                )}

              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)", marginTop: "15px" }}>
                <Typography variant="h6">Terms & Condition</Typography>
              </Grid>
              <Grid container rowSpacing={1} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} >
                  <TextField
                    fullWidth
                    id="filled-textarea"
                    placeholder=""
                    multiline
                    minRows={5}
                    maxRows={10}
                    variant="outlined"
                    onChange={(e) => {
                      setTermsConditions((e.target as HTMLInputElement).value);
                    }}
                    value={termsConditions}
                  />
                </Grid>
              </Grid>
              {showButton &&
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} sx={{ mt: 3 }} >
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={8}>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox checked={sendToClient} onChange={sendToClienthandleChange} />}
                            labelPlacement="start" label="Send to Client" />
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" onClick={handleSubmitClick} style={{ marginTop: "-4px" }} sx={{ mr: 1, backgroundColor: theme.palette.success.main }}>
                      {selectedID > 0 ? "Update" : "Submit"}
                    </Button>
                  </Grid>
                </Grid>
              }
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Grid item xs={4} sm={8} md={12}>
                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {quotationSendPendingList.length === 0 ? (
                      <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                    ) : (
                      <>
                        <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                          <TextField
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                              onChangeSearch_SendPending((e.target as HTMLInputElement).value);
                            }}
                            value={searchQuery}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <DataGrid
                          style={{
                            opacity: dataGridOpacity,
                            pointerEvents: dataGridPointer,
                          }}
                          autoHeight={true}
                          rowHeight={100}
                          rows={quotationSendPendingListTemp}
                          columns={quotationSendPendingColumns}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            if (param.field === "action") {
                              debugger;

                              var ele = (e.target as any).className;
                              const arrActivity = [...quotationSendPendingList];
                              let a: QuotationSendPendingModel | undefined = arrActivity.find((el) => el.id === param.row.id);

                              if (ele.includes("edit") === true) {
                                debugger;
                                handleEdit((e.target as any).textContent, a);
                              }
                              else if (ele.includes("cancelQuotation") == true) {
                                SetCancelID(a.id);
                                setConfirmQuotationCancel(true);
                              }
                              else if (ele.includes("sendQuotationToClient") == true) {
                                SetQuotationToClientID(a.id);
                                setConfirmQuotationToClient(true);
                              }
                            }
                          }}
                          sx={{
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                            },
                            mb: 1,
                          }}
                        />
                      </>
                    )}
                  </div>
                )}
              </Grid>

            </TabPanel>

            <TabPanel value={value} index={2}>
              <Grid item xs={4} sm={8} md={12}>
                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {quotationApprovePendingList.length === 0 ? (
                      <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                    ) : (
                      <>
                        <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                          <TextField
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                              onChangeSearch_ApprovePending((e.target as HTMLInputElement).value);
                            }}
                            value={searchQuery}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <DataGrid
                          style={{
                            opacity: dataGridOpacity,
                            pointerEvents: dataGridPointer,
                          }}
                          autoHeight={true}
                          rows={quotationApprovePendingListTemp}
                          columns={quotationApprovePendingColumns}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            const arrActivity = [...quotationApprovePendingList];
                            let a: QuotationApprovePendingModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                            // handelEditAndDelete((e.target as any).textContent, a);
                          }}
                          sx={{
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                            },
                            mb: 1,
                          }}
                        />
                      </>
                    )}
                  </div>
                )}
              </Grid>
            </TabPanel>

            <TabPanel value={value} index={3}>
              <Grid item xs={4} sm={8} md={12}>
                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {quotationApprovedList.length === 0 ? (
                      <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                    ) : (
                      <>
                        <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                          <TextField
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                              onChangeSearch_ApprovedList((e.target as HTMLInputElement).value);
                            }}
                            value={searchQuery}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <DataGrid
                          style={{
                            opacity: dataGridOpacity,
                            pointerEvents: dataGridPointer,
                          }}
                          autoHeight={true}
                          rows={quotationApprovedListTemp}
                          columns={quotationApprovedColumns}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            const arrActivity = [...quotationApprovedList];
                            let a: QuotationApprovedModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                            // handelEditAndDelete((e.target as any).textContent, a);
                          }}
                          sx={{
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                            },
                            mb: 1,
                          }}
                        />
                      </>
                    )}
                  </div>
                )}
              </Grid>
            </TabPanel>

            <TabPanel value={value} index={4}>
              <Grid item xs={4} sm={8} md={12}>
                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {quotationRejectedList.length === 0 ? (
                      <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                    ) : (
                      <>
                        <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                          <TextField
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                              onChangeSearch_Rejected((e.target as HTMLInputElement).value);
                            }}
                            value={searchQuery}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <DataGrid
                          style={{
                            opacity: dataGridOpacity,
                            pointerEvents: dataGridPointer,
                          }}
                          autoHeight={true}
                          rows={quotationRejectedListTemp}
                          columns={quotationRejectedColumns}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            const arrActivity = [...quotationRejectedList];
                            let a: QuotationRejectedModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                            // handelEditAndDelete((e.target as any).textContent, a);
                          }}
                          sx={{
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                            },
                            mb: 1,
                          }}
                        />
                      </>
                    )}
                  </div>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Grid item xs={4} sm={8} md={12}>
                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {quotationCancellationList.length === 0 ? (
                      <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                    ) : (
                      <>
                        <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                          <TextField
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                              onChangeSearch_SendPending((e.target as HTMLInputElement).value);
                            }}
                            value={searchQuery}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <DataGrid
                          style={{
                            opacity: dataGridOpacity,
                            pointerEvents: dataGridPointer,
                          }}
                          autoHeight={true}
                          rowHeight={100}
                          rows={quotationCancellationListTemp}
                          columns={quotationCancellationColumns}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            if (param.field === "action") {
                              debugger;

                              var ele = (e.target as any).className;
                              const arrActivity = [...quotationCancellationList];
                              let a: QuotationCancellationModel | undefined = arrActivity.find((el) => el.id === param.row.id);

                              if (ele.includes("edit") === true) {
                                debugger;
                                handleCancel((e.target as any).textContent, a);
                              }
                            }
                          }}
                          sx={{
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                            },
                            mb: 1,
                          }}
                        />
                      </>
                    )}
                  </div>
                )}
              </Grid>

            </TabPanel>

          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
      <Dialog open={dialogueOpen} onClose={handleDialogueClose}>
        <DialogTitle>Client</DialogTitle>
        <DialogContent>
          <div style={{ minWidth: "640px" }}>
            <CreateClient
              client={dummyClient}
              saveCallBack={() => {
                handleDialogueClose();
                setSnackMsg("Client Added");
                setSnackbarType("success");
                setOpen(true);
                FetchCompanyName(0);
              }}
              cancelCallBack={() => {
                FetchCompanyName(0);
                handleDialogueClose();
              }}
              type={"client"}
              cardDisplay={"block"}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog maxWidth="lg"
        open={openProductDialog}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleProductDialogClose();
          }
        }}
        disableEscapeKeyDown
      >
        <DialogTitle>Choose Product</DialogTitle>
        <DialogContent sx={{ width: 1024 }}>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={4} sm={5} md={6}>
              <FormControl fullWidth size="small">
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Service Name</b>
                  <label style={{ color: "#ff0000" }}>*</label>
                </Typography>
                <Select value={snID.toString()} onChange={handleSNChange}>
                  <MenuItem disabled={true} value="0">
                    --Select--
                  </MenuItem>
                  {serviceNameList.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.serviceID}>
                        {item.serviceName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={5} md={6}>
              <FormControl fullWidth size="small">
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Category Name</b>
                  <label style={{ color: "#ff0000" }}>*</label>
                </Typography>
                <Select value={cnID.toString()} onChange={handleCNChange}>
                  <MenuItem disabled={true} value="0">
                    --Select--
                  </MenuItem>
                  {categoryList.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.categoryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={8} md={12}>
              <List sx={{ width: "100%", maxWidth: 1024, height: 240, bgcolor: "background.paper" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 480 }} aria-label="simple table">
                    <TableHead style={{ backgroundColor: theme.palette.success.main, color: "white" }}>
                      <TableRow>
                        <TableCell style={{ color: "white" }} align="center">Service Product Name</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Unit</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Quantity</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Rate</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Amount</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Remarks</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productList.map((value: QuotationWiseProductModel, index: number) => {
                        return (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">{value.productName}</TableCell>
                            <TableCell component="th" scope="row">
                              {unitOfSales === "foot" ? value.unit1Name : value.unit2Name}
                            </TableCell>
                            {/*quantity*/}
                            <TableCell align="center">
                              <TextField sx={{ width: "80px" }} placeholder="" variant="outlined" size="small" defaultValue={value.quantity} type="text"
                                onChange={(e) => {
                                  if (parseFloat(e.target.value.trim()) > 0) {
                                    value.quantity = e.target.value.trim();
                                    if (unitOfSales === "foot") {
                                      if (parseInt(e.target.value.trim()) > 0) {
                                        value.amount = (parseFloat(value.footRate) * parseFloat(e.target.value)).toFixed(0).toString();
                                      }
                                      else {
                                        value.amount = "";
                                      }
                                    }
                                    else {
                                      if (parseInt(e.target.value.trim()) > 0) {
                                        value.amount = (parseFloat(value.meterRate) * parseFloat(e.target.value)).toFixed(0).toString();
                                      }
                                      else {
                                        value.amount = "";
                                      }
                                    }
                                  }
                                  else {
                                    value.amount = "";
                                    value.quantity = "";
                                  }
                                  UpdateListItem(value);
                                }}
                              />
                            </TableCell>
                            {/*rate*/}
                            <TableCell align="center">
                              <TextField sx={{ width: "80px" }} placeholder="" variant="outlined"
                                size="small"
                                defaultValue={unitOfSales === "foot" ? value.footRate : value.meterRate}
                                type="text"
                                onChange={(e) => {
                                  if (unitOfSales === "foot") {
                                    if (parseInt(e.target.value.trim()) > 0) {
                                      value.footRate = e.target.value;
                                      value.meterRate = (parseFloat(e.target.value) * parseFloat(value.meterConversion)).toFixed(0).toString();
                                      value.amount = (parseFloat(value.quantity) * parseFloat(e.target.value)).toFixed(0).toString();
                                    }
                                    else {
                                      value.meterRate = ""; value.footRate = ""; value.amount = "";
                                    }
                                  }
                                  else {
                                    if (parseInt(e.target.value.trim()) > 0) {
                                      value.meterRate = e.target.value;
                                      value.footRate = (parseFloat(e.target.value) * parseFloat(value.footConversion)).toFixed(0).toString();
                                      value.amount = (parseFloat(value.quantity) * parseFloat(e.target.value)).toFixed(0).toString();
                                    }
                                    else {
                                      value.meterRate = ""; value.footRate = ""; value.amount = "";
                                    }
                                  }
                                  UpdateListItem(value);
                                }}
                              />
                            </TableCell>
                            {/*amount*/}
                            <TableCell align="center">
                              <TextField disabled sx={{ width: "80px", backgroundColor: "#cdcdcd" }} placeholder="" variant="outlined"
                                size="small" value={value.amount} type="text"
                              />
                            </TableCell>
                            {/*remarks*/}
                            <TableCell align="center">
                              <TextField sx={{ width: "80px" }} placeholder="" variant="outlined"
                                size="small"
                                onChange={(e) => {
                                  value.remarks = e.target.value;
                                  UpdateListItem(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                startIcon={<AddIcon />}
                                variant="contained"
                                sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
                                onClick={() => {
                                  let newPrice = "", newQty = "";
                                  newQty = value.quantity;
                                  if (unitOfSales === "foot") {
                                    newPrice = value.footRate;
                                  }
                                  else {
                                    newPrice = value.meterRate;
                                  }
                                  if (parseInt(newPrice) > 0 && parseInt(newQty) > 0) {
                                    handleToggle(value);
                                  }
                                  else {
                                    alert("Price enter a valid price and valid quantity");
                                  }
                                }}
                              >
                                Add
                              </Button>
                            </TableCell>
                          </TableRow>

                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProductDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmDialogueClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you confirm to change the Unit Of Sales? If OK, then your already added all products values automatically changed.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogueClose}>Cancel</Button>
          <Button
            onClick={() => {
              updateProducts();
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmQuotationCancel} onClose={handleConfirmQuotationDialogueClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to Cancel ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmQuotationDialogueClose}>Cancel</Button>
          <Button
            onClick={() => {
              CancelQuotation();
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmQuotationToClient} onClose={handleConfirmQuotationToClientDialogueClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to send client ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmQuotationToClientDialogueClose}>Cancel</Button>
          <Button
            onClick={() => {
              QuotationToCient();
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuotationWise;

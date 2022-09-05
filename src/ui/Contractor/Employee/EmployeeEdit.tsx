import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Typography,
  Select,
  Grid,
  Menu,
  Snackbar,
  MenuItem,
  Tabs,
  Tab,
  Autocomplete,
  RadioGroup,
  Radio,
  FormHelperText,
  Alert,
  AlertColor,
  CircularProgress,
  Chip,
  InputLabel,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Theme,
  OutlinedInput,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { theme } from "../../../theme/AppTheme";
import { useCookies } from "react-cookie";
import ModeIcon from "@mui/icons-material/Mode";
import CheckIcon from "@mui/icons-material/Check";
import { ArrowDropDown, FormatAlignJustify } from "@mui/icons-material";
import { border } from "@mui/system";
import Provider from "../../../api/Provider";
import { LoadingButton } from "@mui/lab";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { AWSImagePath } from "../../../utils/paths";
import { communication } from "../../../utils/communication";
import { UploadImageToS3WithNativeSdk } from "../../../utils/AWSFileUpload";
import uuid from "react-uuid";
import { CityModel, StateModel, BloodGroupModel, DOBModel, DOJModel, BranchModel, DepartmentNameModel, DesignationNameModel, IdCardModel, ReportNameModel } from "../../../models/Model";
import { SelectChangeEvent } from "@mui/material";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { BloodGroup } from "../../../utils/JSCommonFunction";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  debugger;
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  debugger;
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EmployeeEdit = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [value, setValue] = useState(0);
  const [CookieUserID, SetCookieUseID] = useState(0);

  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    debugger;
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
      setDOB(new Date());
      setDOJ(new Date());
      setCardValidity(new Date());
      setLastWorkingDate(new Date());
      setBloodGroupList(BloodGroup);
    }
  }, []);

  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [isCompanyNameError, setIsCompanyNameError] = useState(false);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeNameError, setEmployeeNameError] = useState("");
  const [isEmployeeNameError, setIsEmployeeNameError] = useState(false);

  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeCodeError, setEmployeeCodeError] = useState("");
  const [isEmployeeCodeError, setIsEmployeeCodeError] = useState(false);

  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [isMobileError, setIsMobileError] = useState(false);

  const [aadhar, setAadhar] = useState("");
  const [aadharError, setAadharError] = useState("");
  const [isAadharError, setIsAadharError] = useState(false);

  const [fatherName, setFatherName] = useState("");
  const [fatherNameError, setFatherNameError] = useState("");
  const [isFatherNameError, setIsFatherNameError] = useState(false);

  const [emergencyCName, setEmergencyCName] = useState("");
  const [emergencyCNameError, setEmergencyCNameError] = useState("");
  const [isEmergencyCNameError, setIsEmergencyCNameError] = useState(false);

  const [emergencyCNo, setEmergencyCNo] = useState("");
  const [emergencyCNoError, setEmergencyCNoError] = useState("");
  const [isEmergencyCNoError, setIsEmergencyCNoError] = useState(false);

  const [cardValid, setCardValid] = useState("");
  const [cardValidError, setCardValidError] = useState("");
  const [isCardValidError, setIsCardValidError] = useState(false);

  const [employeeType, setEmployeeType] = useState("");
  const [employeeTypeError, setEmployeeTypeError] = useState("");
  const [isEmployeeTypeError, setIsEmployeeTypeError] = useState(false);

  const [wagesType, setWagesType] = useState("");
  const [wagesTypeError, setWagesTypeError] = useState("");
  const [isWagesTypeError, setIsWagesTypeError] = useState(false);

  const [salary, setSalary] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [isSalaryError, setIsSalaryError] = useState(false);

  const [bankDetails, setBankDetails] = useState("");
  const [bankDetailsError, setBankDetailsError] = useState("");
  const [isBankDetailsError, setIsBankDetailsError] = useState(false);

  const [accountHName, setAccountHName] = useState("");
  const [accountHNameError, setAccountHNameError] = useState("");
  const [isAccountHNameError, setIsAccountHNameError] = useState(false);

  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");
  const [isContactError, setIsContactError] = useState(false);

  const [contactNo, setContactNo] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [isContactNoError, setIsContactNoError] = useState(false);

  const [gstNo, setGSTNo] = useState("");
  const [gstNoError, setGSTNoError] = useState("");
  const [isGSTNoError, setIsGSTNoError] = useState(false);

  const [panNo, setPanNo] = useState("");
  const [panNoError, setPanNoError] = useState("");
  const [isPanNoError, setIsPanNoError] = useState(false);

  const [locationName, setLocationName] = useState("");
  const [locatoinNameError, setLocationNameError] = useState("");
  const [isLocationNameError, setIsLocationNameError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isAddressError, setIsAddressError] = useState(false);

  const [selectedStateName, setSelectedStateName] = useState("");
  const [selectedStateID, setSelectedStateID] = useState(0);
  const [statesFullData, setStatesFullData] = useState([]);
  const [stateList, setStateList] = useState<Array<StateModel>>([]);

  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedCityID, setSelectedCityID] = useState(0);
  const [cityFullData, setCityFullData] = useState([]);
  const [cityList, setCityList] = useState<Array<CityModel>>([]);

  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isPincodeError, setIsPincodeError] = useState(false);

  const [accountNo, setAccountNo] = useState("");
  const [accountNoError, setAccountNoError] = useState("");
  const [isAccountNoError, setIsAccountNoError] = useState(false);

  const [bankName, setBankName] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [isBankNameError, setIsBankNameError] = useState(false);

  const [bankBranchName, setBankBranchName] = useState("");
  const [bankBranchNameError, setBankBranchNameError] = useState("");
  const [isBankBranchNameError, setIsBankBranchNameError] = useState(false);

  const [ifscCode, setIFSCCode] = useState("");
  const [ifscCodeError, setIFSCCodeError] = useState("");
  const [isIFSCCodeError, setIsIFSCCodeError] = useState(false);

  const [display, setDisplay] = useState("Yes");
  const [wages, setWages] = useState("Yes");
  const [login, setLogin] = useState("Yes");

  const [cnp, setCNP] = useState("");
  const [cnpError, setCNPError] = useState("");
  const [isCNPError, setIsCNPError] = useState(false);

  const [qbnp, setQBNP] = useState("");
  const [qbnpError, setQBNPError] = useState("");
  const [isqbnpError, setIsQBNPError] = useState(false);

  const [ecp, setECP] = useState("");
  const [ecpError, setECPError] = useState("");
  const [isECPError, setIsECPError] = useState(false);

  const [pop, setPOP] = useState("");
  const [popError, setPOPError] = useState("");
  const [isPOPError, setIsPOPError] = useState(false);

  const [sop, setSOP] = useState("");
  const [sopError, setSOPError] = useState("");
  const [isSOPError, setIsSOPError] = useState(false);

  const [errorDIText, setDIErrorText] = useState("");
  const [designButtonText, setDesignButtonText] = useState("Upload Photo");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadFileUpload, setUploadFileUpload] = useState<any>();

  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);

  const [state, setState] = useState("--Select--");
  const [stateID, setStateID] = useState<number>(0);
  const [stateError, setStateError] = useState("");
  const [isStateError, setIsStateError] = useState(false);
  const [stateNameList, setStateNameList] = useState<Array<StateModel>>([]);

  const [city, setCity] = useState("--Select--");
  const [cityID, setCityID] = useState<number>(0);
  const [cityError, setCityError] = useState("");
  const [isCityError, setIsCityError] = useState(false);
  const [cityNameList, setCityNameList] = useState<Array<CityModel>>([]);

  const [bloodgroup, setBloodGroup] = useState("--Select--");
  const [bloodGroupID, setBloodGroupID] = useState<number>(0);
  const [bloodGroupError, setBloodGroupError] = useState("");
  const [isBloodGroupError, setIsBloodGroupError] = useState(false);
  const [bloodGroupList, setBloodGroupList] = useState<Array<BloodGroupModel>>([]);

  const [branch, setBranch] = useState("--Select--");
  const [branchID, setBranchID] = useState<number>(0);
  const [branchError, setBranchError] = useState("");
  const [isBranchError, setIsBranchError] = useState(false);
  const [branchList, setBranchList] = useState<Array<BranchModel>>([]);

  const [department, setDepartment] = useState("--Select--");
  const [departmentID, setDepartmentID] = useState<number>(0);
  const [departmentError, setDepartmentError] = useState("");
  const [isDepartmentError, setIsDeapartmentError] = useState(false);
  const [departmentList, setDepartmentList] = useState<Array<DepartmentNameModel>>([]);

  const [designation, setDesignation] = useState("--Select--");
  const [designationID, setDesignationID] = useState<number>(0);
  const [designationError, setDesignationError] = useState("");
  const [isDesignationError, setIsDesignationError] = useState(false);
  const [designationList, setDesignationList] = useState<Array<DesignationNameModel>>([]);

  const [idcard, setIdCard] = useState("--Select--");
  const [idCardID, setIdCardID] = useState<number>(0);
  const [idCardError, setIdCardError] = useState("");
  const [isIdCardError, setIsIdCardError] = useState(false);
  const [idCardList, setIdCardList] = useState<Array<IdCardModel>>([]);

  const [reportList, setReportList] = useState<string[]>([]);
  const [reportListID, setReportListID] = useState<number[]>([]);
  const [reportError, setReportError] = useState<boolean>(false);
  const [reportErrorText, setReportErrorText] = useState<string>("");
  const [reportNameList, setReportNameList] = useState<Array<ReportNameModel>>([]);
  const [reportSelectAll, setReportSelectAll] = useState<string>("Select All");

  const [DOB, setDOB] = useState<Date | null>(new Date("2022-08-25 T 17:20:54"));
  const [DOJ, setDOJ] = useState<Date | null>(new Date("2022-08-25 T 17:20:54"));
  const [CardValidity, setCardValidity] = useState<Date | null>(new Date("2022-08-25 T 17:20:54"));
  const [LastWorkingDate, setLastWorkingDate] = useState<Date | null>(new Date("2022-08-25 T 17:20:54"));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 },
    },
  };

  function getStyles(name: string, unitSales: readonly string[], theme: Theme) {
    return {
      fontWeight: unitSales.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
  }

  useEffect(() => {
    debugger;
    FetchBasicDetails();
    FetchStates();
    FetchBranch();
    FetchDepartment();
    FetchDesignation();
    FetchReport();
  }, []);

  const FetchBranch = () => {
    debugger;
    Provider.getAll("master/getuserbranchforemployee")
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setBranchList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchReport =() =>{
    debugger;
    Provider.getAll("master/getreportingemployee")
    .then((response:any)=> {
      debugger;
      if(response.data && response.data.code === 200){
        if (response.data.data){
          setReportNameList(response.data.data);
        }
      }
    })
    .catch((e)=>{});
  };

  const handleBranchChange = (event: SelectChangeEvent) => {
    debugger;
    let locationName: string = event.target.value;
    let ac = branchList.find((el) => el.locationName === locationName);
    if (ac !== undefined) {
      setBranch(locationName);
      setBranchID(ac?.id);
      setIsBranchError(false);
      setBranchError("");
    }
  };

  const FetchDepartment = () => {
    debugger;
    Provider.getAll("master/getuserdepartmentforbranchemployee")
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setDepartmentList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    debugger;
    let departmentName: string = event.target.value;
    let ac = departmentList.find((el) => el.departmentName === departmentName);
    if (ac !== undefined) {
      setDepartment(departmentName);
      setDepartmentID(ac?.id);
      setIsDeapartmentError(false);
      setDepartmentError("");
    }
  };

  const FetchDesignation = () => {
    debugger;
    Provider.getAll("master/getuserdesignationforbranchemployee")
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setDesignationList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const handleDesignationChange = (event: SelectChangeEvent) => {
    debugger;
    let designationName: string = event.target.value;
    let ac = designationList.find((el) => el.designationName === designationName);
    if (ac !== undefined) {
      setDesignation(designationName);
      setDesignationID(ac?.id);
      setIsDesignationError(false);
      setDesignationError("");
    }
  };

  const handleReportChange = (event: SelectChangeEvent<typeof reportList>) => {
    const {
      target: { value },
    } = event;
    let un: any = event.target.value;

    if (un.indexOf("Select All") !== -1) {
      //navigate(`/master/unit`);
      let arrAct: any = [];
      reportNameList.map(function (a: ReportNameModel) {
        arrAct.push(a.reportName);
      });
      setReportList(arrAct);
      let aID: any = reportNameList.filter((el: ReportNameModel) => {
        return arrAct.indexOf(el.reportName) !== -1;
      });

      const unitID = aID.map((data: any) => data.id);
      setReportListID(unitID.join(","));
      setReportSelectAll("Unselect All");
    } else if (un.indexOf("Unselect All") !== -1) {
      setReportList([]);
      setReportListID([]);
      setReportSelectAll("Select All");
    } else {
      let a: any = reportNameList.filter((el: ReportNameModel) => {
        return un.indexOf(el.reportName) !== -1;
      });

      const unitID = a.map((data: any) => data.id);
      setReportList(typeof value === "string" ? value.split(",") : value);
      setReportListID(unitID.join(","));
      setReportSelectAll("Select All");
    }
    setReportError(false);
    setReportErrorText("");
  };

  const handleDOBChange = (newValueDate: Date | null) => {
    debugger;
    setDOB(newValueDate);
  };

  const handleDOJChange = (newValueDate: Date | null) => {
    debugger;
    setDOJ(newValueDate);
  };

  const handleCardValidityChange = (newValueDate: Date | null) => {
    debugger;
    setCardValidity(newValueDate);
  };

  const handleLastWorkingDateChange = (newValueDate: Date | null) => {
    debugger;
    setLastWorkingDate(newValueDate);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const FetchBasicDetails = () => {
    let params = {
      UserID: cookies.dfc.UserID,
    };
    Provider.getAll(`master/getuserprofile?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            console.log(response.data.data);
            setCompanyName(response.data.data[0].companyName ? response.data.data[0].companyName : "");
            setContact(response.data.data[0].contactPersonName ? response.data.data[0].contactPersonName : "");
            setContactNo(response.data.data[0].contactPersonNumber ? response.data.data[0].contactPersonNumber : "");
            setGSTNo(response.data.data[0].gstNumber ? response.data.data[0].gstNumber : "");
            setPanNo(response.data.data[0].pan ? response.data.data[0].pan : "");
            setLocationName(response.data.data[0].locationName ? response.data.data[0].locationName : "");
            setAddress(response.data.data[0].addressLine ? response.data.data[0].addressLine : "");
            setSelectedStateName(response.data.data[0].stateName === null ? "" : response.data.data[0].stateName);
            setSelectedStateID(response.data.data[0].stateID);
            setSelectedCityName(response.data.data[0].cityName === null ? "" : response.data.data[0].cityName);
            setSelectedCityID(response.data.data[0].cityID);
            debugger;
            setPincode(response.data.data[0].pincode !== 0 ? response.data.data[0].pincode.toString() : "");
            debugger;
            setAccountNo(response.data.data[0].accountNumber !== 0 ? response.data.data[0].accountNumber.toString() : "");
            setBankName(response.data.data[0].bankName ? response.data.data[0].bankName : "");
            //setBankBranchName(response.data.data[0].branchName ? response.data.data[0].branchName : "");
            setIFSCCode(response.data.data[0].ifscCode ? response.data.data[0].ifscCode : "");
            setCNP(response.data.data[0].companyNamePrefix ? response.data.data[0].companyNamePrefix : "");
            setQBNP(response.data.data[0].quotationBudgetPrefix ? response.data.data[0].quotationBudgetPrefix : "");
            setECP(response.data.data[0].employeeCodePrefix ? response.data.data[0].employeeCodePrefix : "");
            setPOP(response.data.data[0].purchaseOrderPrefix ? response.data.data[0].purchaseOrderPrefix : "");
            setSOP(response.data.data[0].salesOrderPrefix ? response.data.data[0].salesOrderPrefix : "");
            setDisplay(response.data.data[0].showBrand ? "Yes" : "No");
            setUploadedImage(response.data.data[0].companyLogo);
            setImage(response.data.data[0].companyLogo ? response.data.data[0].companyLogo : AWSImagePath + "placeholder-image.png");
            // setFilePath(response.data.data[0].companyLogo ? response.data.data[0].companyLogo : null);
            if (response.data.data[0].stateID !== 0) {
              FetchCity(response.data.data[0].stateID);
            }
          }

          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const FetchStates = () => {
    Provider.getAll("master/getstates")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setStateNameList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchCity = (stateID) => {
    let params = {
      ID: stateID,
    };
    Provider.getAll(`master/getcitiesbyid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setCityNameList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const handleSNChange = (event: SelectChangeEvent) => {
    debugger;
    let stateName: string = event.target.value;
    let ac = stateNameList.find((el) => el.stateName === stateName);
    if (ac !== undefined) {
      setState(stateName);
      setStateID(ac?.id);
      setIsStateError(false);
      setStateError("");
      FetchCity(ac.id);
    }
  };

  const handleCNChange = (event: SelectChangeEvent) => {
    debugger;
    let cityName: string = event.target.value;
    let ac = cityNameList.find((el) => el.cityName === cityName);
    if (ac !== undefined) {
      setCity(cityName);
      setCityID(ac?.id);
      setIsCityError(false);
      setCityError("");
    }
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleEmpTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeType((event.target as HTMLInputElement).value);
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleWagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWages((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    setButtonLoading(true);
    if (uploadFileUpload !== null && uploadFileUpload !== undefined) {
      uploadImage();
    } else {
      InsertData("Success", uploadedImage);
    }
  };

  const uploadImage = () => {
    let imageName: string = uuid();
    let fileExtension = uploadedImage.split(".").pop();
    setUploadedImage(imageName + "." + fileExtension);
    UploadImageToS3WithNativeSdk(uploadFileUpload, imageName + "." + fileExtension, InsertData);
  };

  const InsertData = (status: string, fileName: string) => {
    debugger;
    if (status.toLowerCase() === "success") {
      const params = {
        UserID: CookieUserID,
        CompanyName: companyName,
        CompanyLogo: fileName ? AWSImagePath + fileName : "",
        ContactPersonName: contact,
        ContactPersonNumber: contactNo,
        AddressLine: address,
        LocationName: locationName,
        StateID: selectedStateID,
        CityID: selectedCityID,
        Pincode: pincode ? pincode : 0,
        GSTNumber: gstNo,
        PAN: panNo,
        AccountNumber: accountNo ? accountNo : 0,
        BankName: bankName,
        BranchName: bankBranchName,
        IFSCCode: ifscCode,
        CompanyNamePrefix: cnp,
        EmployeeCodePrefix: ecp,
        PurchaseOrderPrefix: pop,
        SalesOrderPrefix: sop,
        ShowBrand: display === "Yes",
      };
      Provider.create("master/insertuserprofile", params)
        .then((response) => {
          if (response.data && response.data.code === 200) {
            if (uploadFileUpload !== null && uploadFileUpload !== undefined) {
              setImage(fileName ? AWSImagePath + fileName : "");
              setUploadFileUpload(undefined);
            }
            setSnackbarType("success");

            setSnackMsg("Data updated successfully");

            setOpen(true);
          } else {
            setSnackbarType("error");
            setSnackMsg(communication.Error);
            setOpen(true);
          }
          setButtonLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setSnackbarType("error");
          setSnackMsg(communication.NetworkError);
          setOpen(true);
          setButtonLoading(false);
        });
    } else {
      setSnackbarType("error");
      setSnackMsg(communication.Error);
      setOpen(true);
      setButtonLoading(false);
    }
  };

  // const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDisplay((event.target as HTMLInputElement).value);
  // };

  const handleBNChange = (event: SelectChangeEvent) => {
    debugger;
    let bloodGroup: string = event.target.value;
    let ac = bloodGroupList.find((el) => el.Name === bloodGroup);
    if (ac !== undefined) {
      setBloodGroup(bloodgroup);
      setBloodGroupID(ac?.ID);
      setIsBloodGroupError(false);
      setBloodGroupError("");
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}></Grid>
        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
          <Typography variant="h4">Employee Basic Edit</Typography>
        </Grid>
        {loading ? (
          <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Basic Details" {...a11yProps(0)} />
                <Tab label="Work Details" {...a11yProps(1)} />
                <Tab label="Pay Deatails" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={5}>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Employee Name</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setEmployeeName((e.target as HTMLInputElement).value);
                          setIsEmployeeNameError(false);
                          setEmployeeNameError("");
                        }}
                        error={isEmployeeNameError}
                        helperText={employeeNameError}
                        value={employeeName}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Employee Code</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setEmployeeCode((e.target as HTMLInputElement).value);
                          setIsEmployeeCodeError(false);
                          setEmployeeCodeError("");
                        }}
                        error={isEmployeeCodeError}
                        helperText={employeeCodeError}
                        value={employeeCode}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Mobile No</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setMobile((e.target as HTMLInputElement).value);
                          setIsMobileError(false);
                          setMobileError("");
                        }}
                        error={isMobileError}
                        helperText={mobileError}
                        value={mobile}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Aadhar no</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setAadhar((e.target as HTMLInputElement).value);
                          setIsAadharError(false);
                          setAadharError("");
                        }}
                        error={isAadharError}
                        helperText={aadharError}
                        value={aadhar}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Father Name</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setFatherName((e.target as HTMLInputElement).value);
                          setIsFatherNameError(false);
                          setFatherNameError("");
                        }}
                        error={isFatherNameError}
                        helperText={fatherNameError}
                        value={fatherName}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>State</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl fullWidth size="small" error={isStateError}>
                        <Select value={state} onChange={handleSNChange}>
                          <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem>
                          {stateNameList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.stateName}>
                                {item.stateName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <FormHelperText>{stateError}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>City</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl fullWidth size="small" error={isCityError}>
                        <Select value={city} onChange={handleCNChange}>
                          <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem>
                          {cityNameList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.cityName}>
                                {item.cityName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <FormHelperText>{cityError}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Pin Code</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setPincode((e.target as HTMLInputElement).value);
                          setIsPincodeError(false);
                          setPincodeError("");
                        }}
                        error={isPincodeError}
                        helperText={pincodeError}
                        value={pincode}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={5}>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Attach Photo</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl fullWidth size="small">
                        <Grid style={{ display: "flex" }}>
                          <Button size="small" variant="contained" component="label" sx={{ mr: 2 }}>
                            {designButtonText}
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={(e) => {
                                if (e.currentTarget !== null && e.currentTarget.files !== null) {
                                  setUploadFileUpload(e.currentTarget.files[0]);
                                  let FileName = e.currentTarget.files[0].name;
                                  if (FileName !== undefined) {
                                    setDIErrorText(FileName.trim());
                                    setUploadedImage(FileName);
                                  }
                                  setDesignButtonText("Change");
                                }
                              }}
                            />
                          </Button>
                        </Grid>
                        <FormHelperText>{errorDIText}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Blood Group</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl fullWidth size="small" error={isBloodGroupError}>
                        <Select value={bloodgroup} onChange={handleBNChange}>
                          <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem>
                          {bloodGroupList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.Name}>
                                {item.Name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Date of Birth</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker inputFormat="MM/dd/yyyy" value={DOB} onChange={handleDOBChange} renderInput={(params) => <TextField size="small" {...params} />}></DesktopDatePicker>
                      </LocalizationProvider> */}
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Date of Joining</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker inputFormat="MM/dd/yyyy" value={DOJ} onChange={handleDOJChange} renderInput={(params) => <TextField size="small" {...params} />}></DesktopDatePicker>
                      </LocalizationProvider> */}
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Emergency Contact Name</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setEmergencyCName((e.target as HTMLInputElement).value);
                          setIsEmergencyCNameError(false);
                          setEmergencyCNameError("");
                        }}
                        error={isEmergencyCNameError}
                        helperText={emergencyCNameError}
                        value={emergencyCName}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Emergency Contact No</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setEmergencyCNo((e.target as HTMLInputElement).value);
                          setIsEmergencyCNoError(false);
                          setEmergencyCNoError("");
                        }}
                        error={isEmergencyCNoError}
                        helperText={emergencyCNoError}
                        value={emergencyCNo}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Id Card Valid upto</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat="MM/dd/yyyy"
                          value={CardValidity}
                          onChange={handleCardValidityChange}
                          renderInput={(params) => <TextField size="small" {...params} />}
                        ></DesktopDatePicker>
                      </LocalizationProvider> */}
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Login Active</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl>
                        <RadioGroup row name="row-radio-buttons-group" value={login} onChange={handleLoginChange}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={3}>
                      <img src={image} alt="" style={{ width: "100px", height: "100px" }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Employee Name</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setEmployeeName((e.target as HTMLInputElement).value);
                          setIsEmployeeNameError(false);
                          setEmployeeNameError("");
                        }}
                        error={isEmployeeNameError}
                        helperText={employeeNameError}
                        value={employeeName}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Branch</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl fullWidth size="small" error={isBranchError}>
                        <Select value={branch} onChange={handleBranchChange}>
                          <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem>
                          {branchList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.locationName}>
                                {item.locationName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Designation</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl fullWidth size="small" error={isDesignationError}>
                        <Select value={designation} onChange={handleDesignationChange}>
                          <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem>
                          {designationList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.designationName}>
                                {item.designationName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Employee Type</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={9}>
                      <FormControl>
                        <RadioGroup row name="row-radio-buttons-group" value={employeeType} onChange={handleEmpTypeChange}>
                          <FormControlLabel value="Permanent" control={<Radio />} label="Permanent" />
                          <FormControlLabel value="Temporary" control={<Radio />} label="Temporary" />
                          <FormControlLabel value="Releave" control={<Radio />} label="Releave" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Employee Code</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setEmployeeCode((e.target as HTMLInputElement).value);
                          setIsEmployeeCodeError(false);
                          setEmployeeCodeError("");
                        }}
                        error={isEmployeeCodeError}
                        helperText={employeeCodeError}
                        value={employeeCode}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Deapartment</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl fullWidth size="small" error={isDepartmentError}>
                        <Select value={department} onChange={handleDepartmentChange}>
                          <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem>
                          {departmentList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.departmentName}>
                                {item.departmentName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Reporting To</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Select
                        size="small"
                        multiple
                        fullWidth
                        value={reportList}
                        onChange={handleReportChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        <MenuItem
                          //selected={true}
                          key="0"
                          value={reportSelectAll}
                          style={getStyles(reportSelectAll, reportList, theme)}
                        >
                          <b>{reportSelectAll}</b>
                        </MenuItem>
                        {reportNameList.map((units: ReportNameModel) => (
                          <MenuItem selected={true} key={units.id} value={units.reportName} style={getStyles(units.reportName, reportList, theme)}>
                            {units.reportName}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Last Work Date</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6} style={{ height: "30" }}>
                      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat="MM/dd/yyyy"
                          value={LastWorkingDate}
                          onChange={handleLastWorkingDateChange}
                          renderInput={(params) => <TextField size="small" {...params} />}
                        ></DesktopDatePicker>
                      </LocalizationProvider> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                    <Typography variant="h6">PAY DEATAILS</Typography>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Employee Name</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={5}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setEmployeeName((e.target as HTMLInputElement).value);
                          setIsEmployeeNameError(false);
                          setEmployeeNameError("");
                        }}
                        error={isEmployeeNameError}
                        helperText={employeeNameError}
                        value={employeeName}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Employee Code</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={5}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setEmployeeCode((e.target as HTMLInputElement).value);
                          setIsEmployeeCodeError(false);
                          setEmployeeCodeError("");
                        }}
                        error={isEmployeeCodeError}
                        helperText={employeeCodeError}
                        value={employeeCode}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Wages Type</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={5}>
                      <FormControl>
                        <RadioGroup row name="row-radio-buttons-group" value={wages} onChange={handleWagesChange}>
                          <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
                          <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Salary</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={5}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setSalary((e.target as HTMLInputElement).value);
                          setIsSalaryError(false);
                          setSalaryError("");
                        }}
                        error={isSalaryError}
                        helperText={salaryError}
                        value={salary}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                    <Typography variant="h6">BANK DETALILS</Typography>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Account Holder Name </b>
                      </Typography>
                    </Grid>
                    <Grid item sm={5}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setAccountHName((e.target as HTMLInputElement).value);
                          setIsAccountHNameError(false);
                          setAccountHNameError("");
                        }}
                        error={isAccountHNameError}
                        helperText={accountHNameError}
                        value={accountHName}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Account No</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={5}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setAccountNo((e.target as HTMLInputElement).value);
                          setIsAccountNoError(false);
                          setAccountNoError("");
                        }}
                        error={isAccountNoError}
                        helperText={accountNoError}
                        value={accountNo}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Bank Name </b>
                      </Typography>
                    </Grid>
                    <Grid item sm={5}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setBankName((e.target as HTMLInputElement).value);
                          setIsBankNameError(false);
                          setBankNameError("");
                        }}
                        error={isBankNameError}
                        helperText={bankNameError}
                        value={bankName}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>Branch Name</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={5}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setBankBranchName((e.target as HTMLInputElement).value);
                          setIsBankBranchNameError(false);
                          setBankBranchNameError("");
                        }}
                        error={isBankBranchNameError}
                        helperText={bankBranchNameError}
                        value={bankBranchName}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b style={{ float: "right" }}>IFSC Code</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={5}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setIFSCCode((e.target as HTMLInputElement).value);
                          setIsIFSCCodeError(false);
                          setIFSCCodeError("");
                        }}
                        error={isIFSCCodeError}
                        helperText={ifscCodeError}
                        value={ifscCode}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>

            <Grid item xs={4} sm={8} md={12}>
              <Grid item xs={4} sm={8} md={12}>
                <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </>
        )}
        {/* </Grid> */}
      </Container>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeEdit;

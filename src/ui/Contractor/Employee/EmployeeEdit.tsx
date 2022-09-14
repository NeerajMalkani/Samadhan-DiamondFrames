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
import { AWSImagePath } from "../../../utils/paths";
import { communication } from "../../../utils/communication";
import { UploadImageToS3WithNativeSdk } from "../../../utils/AWSFileUpload";
import uuid from "react-uuid";
import { CityModel, StateModel, BloodGroupModel, DOBModel, DOJModel, BranchModel, DepartmentNameModel, DesignationNameModel, IdCardModel, ReportNameModel } from "../../../models/Model";
import { SelectChangeEvent } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { BloodGroup } from "../../../utils/JSCommonFunction";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { NullOrEmpty } from "../../../utils/CommonFunctions";

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
          <Typography>{children}</Typography>
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

let st_ID = 0, ct_ID = 0, bg_ID = 0, b_ID = 0, d_ID = 0, de_ID = 0;

const EmployeeEdit = () => {

  const [cookies, setCookie] = useCookies(["dfc"]);
  const [value, setValue] = useState(0);
  const [CookieUserID, SetCookieUseID] = useState(0);

  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
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

  //#region Variables

  const [employeeID, setEmployeeID] = React.useState<number>(0);

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

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isAddressError, setIsAddressError] = useState(false);

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

  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isPincodeError, setIsPincodeError] = useState(false);

  const [bloodgroup, setBloodGroup] = useState("--Select--");
  const [bloodGroupID, setBloodGroupID] = useState<number>(0);
  const [bloodGroupError, setBloodGroupError] = useState("");
  const [isBloodGroupError, setIsBloodGroupError] = useState(false);
  const [bloodGroupList, setBloodGroupList] = useState<Array<BloodGroupModel>>([]);

  const [DOB, setDOB] = useState<Date | null>(new Date("2022-08-25 T 17:20:54"));
  const [DOJ, setDOJ] = useState<Date | null>(new Date("2022-08-25 T 17:20:54"));
  const [CardValidity, setCardValidity] = useState<Date | null>(new Date("2022-08-25 T 17:20:54"));
  const [LastWorkingDate, setLastWorkingDate] = useState<Date | null>(new Date("2022-08-25 T 17:20:54"));

  const [emergencyCName, setEmergencyCName] = useState("");
  const [emergencyCNameError, setEmergencyCNameError] = useState("");
  const [isEmergencyCNameError, setIsEmergencyCNameError] = useState(false);

  const [emergencyCNo, setEmergencyCNo] = useState("");
  const [emergencyCNoError, setEmergencyCNoError] = useState("");
  const [isEmergencyCNoError, setIsEmergencyCNoError] = useState(false);

  const [idcard, setIdCard] = useState("--Select--");
  const [idCardID, setIdCardID] = useState<number>(0);
  const [idCardError, setIdCardError] = useState("");
  const [isIdCardError, setIsIdCardError] = useState(false);
  const [idCardList, setIdCardList] = useState<Array<IdCardModel>>([]);

  const [login, setLogin] = useState("Yes");

  const [branch, setBranch] = useState("--Select--");
  const [branchID, setBranchID] = useState<number>(0);
  const [branchError, setBranchError] = useState("");
  const [isBranchError, setIsBranchError] = useState(false);
  //const [branchList, setBranchList] = useState<Array<BranchModel>>([]);
  const [selectedBranchName, setSelectedBranchName] = useState("");
  const [selectedBranchID, setSelectedBranchID] = useState(0);
  const [BranchFullData, setBranchFullData] = useState([]);


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

  const [reportList, setReportList] = useState<string[]>([]);
  const [reportListID, setReportListID] = useState<number[]>([]);
  const [reportError, setReportError] = useState<boolean>(false);
  const [reportErrorText, setReportErrorText] = useState<string>("");
  const [reportNameList, setReportNameList] = useState<Array<ReportNameModel>>([]);
  const [reportSelectAll, setReportSelectAll] = useState<string>("Select All");

  const [reporting, setReporting] = useState("");
  const [reportingError, setReportingError] = useState("");
  const [isReportingError, setIsReportingError] = useState(false);

  const [employeeType, setEmployeeType] = useState("");
  const [employeeTypeError, setEmployeeTypeError] = useState("");
  const [isEmployeeTypeError, setIsEmployeeTypeError] = useState(false);

  const [wagesType, setWagesType] = useState("");
  const [wagesTypeError, setWagesTypeError] = useState("");
  const [isWagesTypeError, setIsWagesTypeError] = useState(false);

  const [salary, setSalary] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [isSalaryError, setIsSalaryError] = useState(false);

  const [accountHName, setAccountHName] = useState("");
  const [accountHNameError, setAccountHNameError] = useState("");
  const [isAccountHNameError, setIsAccountHNameError] = useState(false);

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

  const [errorDIText, setDIErrorText] = useState("");
  const [designButtonText, setDesignButtonText] = useState("Upload Photo");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadFileUpload, setUploadFileUpload] = useState<any>();

  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);
  //#endregion 

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
    let id = window.location.pathname.split('/').at(-1);
    if (!NullOrEmpty(id)) {
      setEmployeeID(parseInt(id));
      FetchEmployeeDetails(parseInt(id));
    }
    else {
      setEmployeeID(0);
      FetchEmployeeDetails(0);
    }
  }, []);

  //#region Functions

  const FetchBranch = () => {
    let params = {
      AddedByUserID: cookies.dfc.UserID,
    };

    Provider.getAll(`master/getuserbranchforemployee?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const branchData: any = [];
            response.data.data.map((data: any, i: number) => {
              branchData.push({
                id: data.id,
                label: data.branchName,
              });
            });
            console.log(branchData);
            setBranchFullData(branchData);

            if (b_ID > 0) {
              let a = branchData.filter((el) => {
                return el.id === b_ID;
              });
              setSelectedBranchName(a[0].label);
            }
          }
        }
      })
      .catch((e) => { });
  };

  const FetchReport = () => {
    let params = {
      AddedByUserID: cookies.dfc.UserID,
    };
    Provider.getAll(`master/getreportingemployee?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setReportNameList(response.data.data);
          }
        }
      })
      .catch((e) => { });
  };

  const handleBranchChange = (event: SelectChangeEvent) => {
    let locationName: string = event.target.value;
    let ac = BranchFullData.find((el) => el.locationName === locationName);
    if (ac !== undefined) {
      setBranch(locationName);
      setBranchID(ac?.id);
      setIsBranchError(false);
      setBranchError("");
    }
  };

  const FetchDepartment = () => {
    let params = {
      UserID: cookies.dfc.UserID,
      UserType: 3,
    };

    Provider.getAll(`master/getuserdepartmentforbranchemployee?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setDepartmentList(response.data.data);
          }
        }
      })
      .catch((e) => { });
  };

  const handleDepartmentChange = (event: SelectChangeEvent) => {
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
    let params = {
      UserID: cookies.dfc.UserID,
      UserType: 3,
    };
    Provider.getAll(`master/getuserdesignationforbranchemployee?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setDesignationList(response.data.data);
          }
        }
      })
      .catch((e) => { });
  };

  const handleDesignationChange = (event: SelectChangeEvent) => {
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
    setDOB(newValueDate);
  };

  const handleDOJChange = (newValueDate: Date | null) => {
    setDOJ(newValueDate);
  };

  const handleCardValidityChange = (newValueDate: Date | null) => {
    setCardValidity(newValueDate);
  };

  const handleLastWorkingDateChange = (newValueDate: Date | null) => {
    setLastWorkingDate(newValueDate);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const FetchEmployeeDetails = (id: number) => {
    let params = {
      ID: 1,
    };
    Provider.getAll(`master/getemployeedetailsbyid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {

            var employee_data = response.data.data[0].employee[0];
            var bankDetails_data = response.data.data[0].bankDetails[0];
            var reporting_data = response.data.data[0].employeeReportingAuthority[0];

            setEmployeeName(!NullOrEmpty(employee_data.employeeName) ? employee_data.employeeName : "");
            setEmployeeCode(!NullOrEmpty(employee_data.employeeCode) ? employee_data.employeeCode : "");
            setMobile(!NullOrEmpty(employee_data.mobileNo) ? employee_data.mobileNo : "");
            setAadhar(!NullOrEmpty(employee_data.aadharNo) ? employee_data.aadharNo : "");
            setFatherName(!NullOrEmpty(employee_data.fatherName) ? employee_data.fatherName : "");
            setAddress(!NullOrEmpty(employee_data.address) ? employee_data.address : "");

            debugger;
            if (!NullOrEmpty(employee_data.stateID)) {
              setSelectedStateID(employee_data.stateID);
              st_ID = employee_data.stateID;
            }

            if (!NullOrEmpty(employee_data.cityID)) {
              setSelectedCityID(employee_data.cityID);
              ct_ID = employee_data.cityID;
            }

            if (!NullOrEmpty(employee_data.bloodGroup)) {
              setBloodGroupID(employee_data.bloodGroup);
              bg_ID = employee_data.bloodGroup;
            }

            if (!NullOrEmpty(employee_data.branchID)) {
              setBranchID(employee_data.branchID);
              b_ID = employee_data.branchID;
            }

            if (!NullOrEmpty(employee_data.departmentID)) {
              setDepartmentID(employee_data.departmentID);
              d_ID = employee_data.departmentID;
            }

            if (!NullOrEmpty(employee_data.designationID)) {
              setDesignationID(employee_data.designationID);
              de_ID = employee_data.designationID;
            }

            setPincode(!NullOrEmpty(employee_data.pincode) ? employee_data.pincode.toString() : "");
            // setBloodGroup(employee_data.bloodGroup === null ? "" : employee_data.bloodGroup);
            setDOB(!NullOrEmpty(employee_data.dob) === null ? "" : employee_data.dob);
            setDOJ(!NullOrEmpty(employee_data.doj) === null ? "" : employee_data.doj);
            setEmergencyCName(!NullOrEmpty(employee_data.emergencyContactName) ? employee_data.emergencyContactName : "");
            setEmergencyCNo(!NullOrEmpty(employee_data.emergencyContactNo) ? employee_data.emergencyContactNo : "");
            setIdCard(!NullOrEmpty(employee_data.idCardValidity) ? employee_data.idCardValidity : "");
            setLogin(!NullOrEmpty(employee_data.loginActiveStatus) ? employee_data.loginActiveStatus : "");
            setBranch(!NullOrEmpty(employee_data.branchID) ? employee_data.branchID : "");
            setDepartment(!NullOrEmpty(employee_data.department) ? employee_data.department : "");
            setDesignation(!NullOrEmpty(employee_data.designation) ? employee_data.designation : "");
            setReporting(!NullOrEmpty(employee_data.reporting) ? employee_data.reporting : "");
            setEmployeeType(!NullOrEmpty(employee_data.employeeType) ? employee_data.employeeType : "");
            setLastWorkingDate(!NullOrEmpty(employee_data.LastWorkingDate) ? employee_data.LastWorkingDate : "");
            setWagesType(!NullOrEmpty(employee_data.wagesType) ? employee_data.wagesType : "");
            setSalary(!NullOrEmpty(employee_data.salary) ? employee_data.salary : "");

            setAccountHName(!NullOrEmpty(bankDetails_data) ? !NullOrEmpty(bankDetails_data.accountHolderName) ? bankDetails_data.accountHolderName : "" : "");

            setAccountNo(!NullOrEmpty(bankDetails_data) ? !NullOrEmpty(bankDetails_data.accountNumber) ? bankDetails_data.accountNumber : "" : "");
            setBankName(!NullOrEmpty(bankDetails_data) ? !NullOrEmpty(bankDetails_data.bankName) ? bankDetails_data.bankName : "" : "");
            setBankBranchName(!NullOrEmpty(bankDetails_data) ? !NullOrEmpty(bankDetails_data.branchName) ? bankDetails_data.branchName : "" : "");
            setIFSCCode(!NullOrEmpty(bankDetails_data) ? !NullOrEmpty(bankDetails_data.ifscCode) ? bankDetails_data.ifscCode : "" : "");
            setUploadedImage(employee_data.profilePhoto);
            setImage(!NullOrEmpty(employee_data.profilePhoto) ? employee_data.profilePhoto : AWSImagePath + "placeholder-image.png");
            // setFilePath(response.data.data[0].profilePhoto ? response.data.data[0].profilePhoto : null);
            // if (!NullOrEmpty(employee_data.stateID !== 0)) {
            //   FetchCities(employee_data.stateID);
            // }
          }
          setLoading(false);
          FetchStates();
          FetchBranch();
          FetchDepartment();
          FetchDesignation();
          FetchReport();
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const FetchStates = () => {

    Provider.getAll("master/getstates")
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const stateData: any = [];
            response.data.data.map((data: any, i: number) => {
              stateData.push({
                id: data.id,
                label: data.stateName,
              });
            });
            setStatesFullData(stateData);
            if (st_ID > 0) {
              let a = stateData.filter((el) => {
                return el.id === st_ID;
              });
              setSelectedStateName(a[0].label);
            }
          }
          FetchCities(st_ID);
        }
      })
      .catch((e) => { });
  };

  const FetchCities = (stateID: number) => {
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
            if (ct_ID > 0) {
              let a = cityData.filter((el) => {
                return el.id === ct_ID;
              });
              setSelectedCityName(a[0].label);
            }
          }
        }
      })
      .catch((e) => { });
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleEmpTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeType((event.target as HTMLInputElement).value);
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((event.target as HTMLInputElement).value);
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
    if (status.toLowerCase() === "success") {
      const params = {
        //UserID: CookieUserID,

        CompanyLogo: fileName ? AWSImagePath + fileName : "",
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

  const handleBNChange = (event: SelectChangeEvent) => {
    let Name: string = event.target.value;
    let ac = bloodGroupList.find((el) => el.Name === Name);
    if (ac !== undefined) {
      setBloodGroup(Name);
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
  //#endregion

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
                        <b style={{ float: "right" }}>Address</b>
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setAddress((e.target as HTMLInputElement).value);
                          setIsAddressError(false);
                          setAddressError("");
                        }}
                        error={isAddressError}
                        helperText={addressError}
                        value={address}
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
                        {/* <Select value={state} onChange={handleSNChange}>
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
                        </Select> */}
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
                              FetchCities(value.id);
                            }
                          }}
                          value={selectedStateName}
                          renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isStateError} helperText={stateError} />}
                        />
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

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat="MM/dd/yyyy"
                          value={DOB}
                          onChange={handleDOBChange}
                          renderInput={(params) => <TextField size="small" {...params} />}></DesktopDatePicker>
                      </LocalizationProvider>

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
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat="MM/dd/yyyy"
                          value={DOJ}
                          onChange={handleDOJChange}
                          renderInput={(params) => <TextField size="small"{...params} />}></DesktopDatePicker>
                      </LocalizationProvider>
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
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat="MM/dd/yyyy"
                          value={CardValidity}
                          onChange={handleCardValidityChange}
                          renderInput={(params) => <TextField size="small" {...params} />}></DesktopDatePicker>

                      </LocalizationProvider>
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
                          {BranchFullData.map((item, index) => {
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
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat="MM/dd/yyyy"
                          value={LastWorkingDate}
                          onChange={handleLastWorkingDateChange}
                          renderInput={(params) => <TextField size="small" {...params} />}
                        ></DesktopDatePicker>
                      </LocalizationProvider>
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

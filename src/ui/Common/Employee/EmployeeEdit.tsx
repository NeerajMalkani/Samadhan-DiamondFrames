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
let rpt_ID = [];

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

  const [bloodgroup, setBloodGroup] = React.useState("--Select--");
  const [bloodGroupID, setBloodGroupID] = React.useState<number>(0);
  const [bloodGroupError, setBloodGroupError] = React.useState("");
  const [isBloodGroupError, setIsBloodGroupError] = React.useState(false);
  const [bloodGroupList, setBloodGroupList] = React.useState<Array<BloodGroupModel>>([]);

  const [DOB, setDOB] = useState<Date | null>(new Date());
  const [DOJ, setDOJ] = useState<Date | null>(new Date());
  const [CardValidity, setCardValidity] = useState<Date | null>(new Date());
  const [LastWorkingDate, setLastWorkingDate] = useState<Date | null>(new Date());

  const [emergencyCName, setEmergencyCName] = useState("");
  const [emergencyCNameError, setEmergencyCNameError] = useState("");
  const [isEmergencyCNameError, setIsEmergencyCNameError] = useState(false);

  const [emergencyCNo, setEmergencyCNo] = useState("");
  const [emergencyCNoError, setEmergencyCNoError] = useState("");
  const [isEmergencyCNoError, setIsEmergencyCNoError] = useState(false);

  const [login, setLogin] = useState("Yes");

  const [branch, setBranch] = useState("--Select--");
  const [branchID, setBranchID] = useState<number>(0);
  const [branchError, setBranchError] = useState("");
  const [isBranchError, isSetBranchError] = useState(false);
  const [selectedBranchName, setSelectedBranchName] = useState("");
  const [selectedBranchID, setSelectedBranchID] = useState(0);
  const [branchFullData, setBranchFullData] = useState([]);

  const [department, setDepartment] = useState("--Select--");
  const [departmentID, setDepartmentID] = useState<number>(0);
  const [departmentError, setDepartmentError] = useState("");
  const [isDepartmentError, setIsDeapartmentError] = useState(false);
  const [selectedDepartmentName, setSelectedDepartmentName] = useState("");
  const [departmentFullData, setDepartmentFullData] = useState([]);

  const [designation, setDesignation] = useState("--Select--");
  const [designationID, setDesignationID] = useState<number>(0);
  const [designationError, setDesignationError] = useState("");
  const [selectedDesignationName, setSelectedDesignationName] = useState("");
  const [isDesignationError, isSetDesignationError] = useState(false);
  const [designationFullData, setDesignationFullData] = useState([]);

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
      setDOB(null);
      setDOJ(null);
      setCardValidity(null);
      setLastWorkingDate(null);
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
                label: data.locationName,
              });
            });
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
    Provider.getAll(`master/getreportingemployeelist?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {

            const report: any = [];
            let arrAct: any = [];
            response.data.data.map((data: any, i: number) => {
              report.push({
                id: data.id,
                label: data.employee,
              });
            });

            let a = report.filter((el) => {
              return el.id === 1;
            });
            arrAct.push(a[0].label);

            setReportNameList(response.data.data);
            setReportList(arrAct);
          }
        }
      })
      .catch((e) => { });
  };

  const handleBranchChange = (event: SelectChangeEvent) => {
    let locationName: string = event.target.value;
    let ac = branchFullData.find((el) => el.locationName === locationName);
    if (ac !== undefined) {
      setBranch(locationName);
      setBranchID(ac?.id);
      isSetBranchError(false);
      setBranchError("");
    }
  };

  const FetchDepartment = () => {
    let params = {
      AddedByUserID: cookies.dfc.UserID,
    };
    Provider.getAll(`master/getuserdepartmentforbranchemployee?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {

        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const deptData: any = [];
            response.data.data.map((data: any, i: number) => {
              deptData.push({
                id: data.departmentID,
                label: data.departmentName,
              });
            });
            setDepartmentFullData(deptData);
            if (d_ID > 0) {
              let a = deptData.filter((el) => {
                return el.id === d_ID;
              });
              setSelectedDepartmentName(a[0].label);
            }
          }
        }
      })
      .catch((e) => { });
  };

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    let departmentName: string = event.target.value;
    let ac = departmentFullData.find((el) => el.departmentName === departmentName);
    if (ac !== undefined) {
      setDepartment(departmentName);
      setDepartmentID(ac?.id);
      setIsDeapartmentError(false);
      setDepartmentError("");
    }
  };

  const FetchDesignation = () => {
    let params = {
      AddedByUserID: cookies.dfc.UserID,
    };
    Provider.getAll(`master/getuserdesignationforbranchemployee?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {

        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const desgData: any = [];
            response.data.data.map((data: any, i: number) => {
              desgData.push({
                id: data.designationID,
                label: data.designationName,
              });
            });
            setDesignationFullData(desgData);
            if (de_ID > 0) {
              let a = desgData.filter((el) => {
                return el.id === de_ID;
              });
              setSelectedDesignationName(a[0].label);
            }
          }
        }
      })
      .catch((e) => { });
  };

  const handleDesignationChange = (event: SelectChangeEvent) => {
    let designationName: string = event.target.value;
    let ac = designationFullData.find((el) => el.designationName === designationName);
    if (ac !== undefined) {
      setDesignation(designationName);
      setDesignationID(ac?.id);
      isSetDesignationError(false);
      setDesignationError("");
    }
  };

  const handleReportChange = (event: SelectChangeEvent<typeof reportList>) => {
    debugger;
    const {
      target: { value },
    } = event;
    let un: any = event.target.value;

    if (un.indexOf("Select All") !== -1) {
      //navigate(`/master/unit`);
      let arrAct: any = [];
      reportNameList.map(function (a: ReportNameModel) {
        arrAct.push(a.employee);
      });
      setReportList(arrAct);
      let aID: any = reportNameList.filter((el: ReportNameModel) => {
        return arrAct.indexOf(el.employee) !== -1;
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
        return un.indexOf(el.employee) !== -1;
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
      ID: id,
      AddedByUserID: cookies.dfc.UserID
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

            setDOB(NullOrEmpty(employee_data.dob) ? null : employee_data.dob);
            setDOJ(NullOrEmpty(employee_data.doj) ? null : employee_data.doj);
            setLastWorkingDate(NullOrEmpty(employee_data.LastWorkingDate) ? null : employee_data.LastWorkingDate);
            setCardValidity(NullOrEmpty(employee_data.idCardValidity) ? null : employee_data.idCardValidity);

            setEmergencyCName(!NullOrEmpty(employee_data.emergencyContactName) ? employee_data.emergencyContactName : "");
            setEmergencyCNo(!NullOrEmpty(employee_data.emergencyContactNo) ? employee_data.emergencyContactNo : "");
            setLogin(!NullOrEmpty(employee_data.loginActiveStatus) ? (employee_data.loginActiveStatus === true) ? "Yes" : "No" : "");
            setBranch(!NullOrEmpty(employee_data.branchID) ? employee_data.branchID : "");
            setDepartment(!NullOrEmpty(employee_data.department) ? employee_data.department : "");
            setDesignation(!NullOrEmpty(employee_data.designation) ? employee_data.designation : "");
            setReporting(!NullOrEmpty(reporting_data.reportingAuthorityID) ? reporting_data.reportingAuthorityID : "");
            setReportListID(!NullOrEmpty(reporting_data.reportingAuthorityID) ? reporting_data.reportingAuthorityID : "");
            rpt_ID = reporting_data.reportingAuthorityID;
            setEmployeeType(!NullOrEmpty(employee_data.employeeType) ? employee_data.employeeType : "");
            debugger;
            setWagesType(!NullOrEmpty(employee_data.wagesType) ? employee_data.wagesType === 1 ? "Daily" : "Monthly" : "");
            setSalary(!NullOrEmpty(employee_data.salary) ? employee_data.salary : "");

            setAccountHName(!NullOrEmpty(bankDetails_data) ? !NullOrEmpty(bankDetails_data.accountHolderName) ? bankDetails_data.accountHolderName : "" : "");

            setAccountNo(!NullOrEmpty(bankDetails_data) ? !NullOrEmpty(bankDetails_data.accountNumber) ? bankDetails_data.accountNumber : "" : "");
            setBankName(!NullOrEmpty(bankDetails_data) ? !NullOrEmpty(bankDetails_data.bankName) ? bankDetails_data.bankName : "" : "");
            setBankBranchName(!NullOrEmpty(bankDetails_data) ? !NullOrEmpty(bankDetails_data.branchName) ? bankDetails_data.branchName : "" : "");
            setIFSCCode(!NullOrEmpty(bankDetails_data) ? !NullOrEmpty(bankDetails_data.ifscCode) ? bankDetails_data.ifscCode : "" : "");
            setUploadedImage(employee_data.profilePhoto);
            setImage(!NullOrEmpty(employee_data.profilePhoto) ? employee_data.profilePhoto : AWSImagePath + "placeholder-image.png");
          }

          setLoading(false);
          FetchStates();
          BloodGroupDropdown();
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

  const BloodGroupDropdown = () => {
    let b = BloodGroup.filter((el) => {
      return el.ID.toString() === bg_ID.toString();
    });

    const bg = BloodGroup.map((data) => data.Name);
    if (!NullOrEmpty(b[0])) {
      setBloodGroup(b[0].Name);
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
              });
            });
            setStatesFullData(stateData);
            setSelectedStateID(st_ID);
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
            setSelectedCityID(ct_ID);
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
    setWagesType((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    setButtonLoading(true);
    if (uploadFileUpload !== null && uploadFileUpload !== undefined) {
      uploadImage();
    } else {
      let img = (SplitImageName(uploadedImage));
      InsertData("Success", img);
    }
  };

  const uploadImage = () => {
    let imageName: string = uuid();
    let fileExtension = uploadedImage.split(".").pop();
    setUploadedImage(imageName + "." + fileExtension);
    UploadImageToS3WithNativeSdk(uploadFileUpload, imageName + "." + fileExtension, InsertData);
  };

  const SplitImageName = (fullName: string) => {
    let imgName = "";
    if (!NullOrEmpty(fullName)) {
      if (fullName.includes(AWSImagePath)) {
        imgName = fullName.replace(AWSImagePath, '');
      }
      else {
        imgName = fullName;
      }
    }
    return imgName;
  }

  const InsertData = (status: string, fileName: string) => {
    debugger;
    if (status.toLowerCase() === "success") {
      const params = {
        ID: employeeID,
        MobileNo: mobile.trim(),
        AadharNo: aadhar.trim(),
        FatherName: fatherName,
        Address: address,
        StateID: selectedStateID,
        CityID: selectedCityID,
        Pincode: pincode,
        ProfilePhoto: fileName ? AWSImagePath + fileName : "",
        BloodGroup: bloodGroupID,
        DOB: DOB,
        DOJ: DOJ,
        EmergencyContactName: emergencyCName,
        EmergencyContactNo: emergencyCNo,
        IDCardValidity: CardValidity,
        LoginActiveStatus: (login === "Yes") ? true : false,
        BranchID: branchID,
        DepartmentID: departmentID,
        DesignationID: designationID,
        EmployeeType: employeeType,
        LastWorkDate: LastWorkingDate,
        WagesType: NullOrEmpty(wagesType) ? 0 : wagesType === "Daily" ? 1 : 2,
        Salary: salary,
        AccountHolderName: accountHName,
        AccountNumber: NullOrEmpty(accountNo) ? 0 : parseInt(accountNo),
        BankName: bankName,
        BranchName: bankBranchName,
        IFSCCode: ifscCode,
      };
      debugger;
      Provider.create("master/updateemployeedetails", params)
        .then((response) => {
          debugger;
          if (response.data && response.data.code === 200) {

            setSnackbarType("success");
            setSnackMsg("Data updated successfully");

            setOpen(false);
            UpdateReportingAuthority();
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

  const UpdateReportingAuthority = () => {
    debugger;
    const params = {
      EmployeeID: employeeID,
      AddedByUserID: cookies.dfc.UserID,
      ReportingAuthorityID: NullOrEmpty(reportListID) ? "" : reportListID.toString(),
    };

    Provider.create("master/updateemployeereportingauthority", params)
      .then((response) => {
        debugger;
        if (response.data && response.data.code === 200) {

        }
      })
      .catch((e) => {
        console.log(e);
        setSnackbarType("error");
        setSnackMsg(communication.NetworkError);
        setOpen(true);
        setButtonLoading(false);
      });
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
        <Grid  item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
        <Typography className="float-left" variant="h4">Employee Basic Edit</Typography>
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
                        disabled={true}
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
                          clearable
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
                          clearable
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
                          clearable
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
                        disabled={true}
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
                        <Autocomplete
                          disablePortal
                          fullWidth
                          options={branchFullData}
                          //sx={{ width: 300 }}
                          onChange={(event: React.SyntheticEvent, value: any) => {
                            isSetBranchError(false);
                            setBranchError("");
                            if (value !== null) {
                              setSelectedBranchName(value.label);
                              setSelectedBranchID(value.id);
                            }
                          }}
                          value={selectedBranchName}
                          renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isBranchError} helperText={branchError} />}
                        />
                        <FormHelperText>{branchError}</FormHelperText>
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
                        <Autocomplete
                          disablePortal
                          fullWidth
                          options={designationFullData}
                          //sx={{ width: 300 }}
                          onChange={(event: React.SyntheticEvent, value: any) => {
                            isSetDesignationError(false);
                            setDesignationError("");
                            if (value !== null) {
                              setDesignation(value.label);
                              setDesignationID(value.id);
                              setSelectedDesignationName(value.label);
                            }
                          }}
                          value={selectedDesignationName}
                          renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isDesignationError} helperText={designationError} />}
                        />
                        <FormHelperText>{designationError}</FormHelperText>
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
                          <FormControlLabel value="1" control={<Radio />} label="Permanent" />
                          <FormControlLabel value="2" control={<Radio />} label="Temporary" />
                          <FormControlLabel value="3" control={<Radio />} label="Releave" />
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
                        disabled={true}
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
                        <Autocomplete
                          disablePortal
                          fullWidth
                          options={departmentFullData}
                          //sx={{ width: 300 }}
                          onChange={(event: React.SyntheticEvent, value: any) => {
                            setIsDeapartmentError(false);
                            setDepartmentError("");
                            if (value !== null) {
                              setDepartment(value.label);
                              setDepartmentID(value.id);
                              setSelectedDepartmentName(value.label);
                            }
                          }}
                          value={selectedDepartmentName}
                          renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isDepartmentError} helperText={departmentError} />}
                        />
                        <FormHelperText>{departmentError}</FormHelperText>
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
                        multiple={true}
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
                          <MenuItem selected={true} key={units.id} value={units.employee} style={getStyles(units.employee, reportList, theme)}>
                            {units.employee}
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
                          clearable
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
                        disabled={true}
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
                        disabled={true}
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
                        <RadioGroup row name="row-radio-buttons-group" value={wagesType} onChange={handleWagesChange}>
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
                  Update
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

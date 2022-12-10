import {
  Alert,
  Box,
  TextField,
  Button,
  Container,
  NativeSelect,
  Typography,
  Select,
  Grid,
  CircularProgress,
  MenuItem,
  InputAdornment,
  Checkbox,
  FormControl,
  FormHelperText,
  AlertColor,
  RadioGroup,
  FormControlLabel,
  Snackbar,
  Radio
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "../../../theme/AppTheme";
import { useCookies } from "react-cookie";
import Header from "../../../components/Header";
import DataContexts from "../../../contexts/DataContexts"
import Provider from "../../../api/Provider";
import { branchColumns } from "../../../utils/tablecolumns";
import { BranchModel, RegionalOfficeModel, } from "../../../models/Model";
import { communication } from "../../../utils/communication";
import { CityModel, BranchTypeModel, StateModel, EmployeeModel, ContactModel } from "../../../models/Model";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { SelectChangeEvent } from "@mui/material";
import { ForkRight } from "@mui/icons-material";
import { APIConverter } from "../../../utils/apiconverter";
// import id from "date-fns/esm/locale/id";

const AddBranch = () => {

  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/login`);
  }, []);

  //#region Variables
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");

  const [branchList, setBranchList] = useState<Array<BranchModel>>([]);
  const [branchListTemp, setBranchListTemp] = React.useState<Array<any>>([]);

  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [state, setState] = useState("--Select--");
  const [stateID, setStateID] = useState("");
  const [stateError, setStateError] = useState("");
  const [isStateError, setIsStateError] = useState(false);
  const [stateNameList, setStateNameList] = useState<Array<StateModel>>([]);

  const [city, setCity] = useState("--Select--");
  const [cityID, setCityID] = useState("");
  const [cityError, setCityError] = useState("");
  const [isCityError, setIsCityError] = useState(false);
  const [cityNameList, setCityNameList] = useState<Array<CityModel>>([]);

  const [branchType, setBranchType] = useState("--Select--");
  const [branchTypeID, setBranchTypeID] = useState<number>(0);
  const [branchTypeError, setBranchTypeError] = useState("");
  const [isbranchTypeError, setIsBranchTypeError] = useState(false);
  const [branchTypeList, setBranchTypeList] = useState<Array<BranchTypeModel>>([]);

  // const [id, setId] = useState("--Select--");
  // const [locationId, setLocationId] = useState<number>(0);
  // const [locationTypeError, setLocationTypeError] = useState("");
  // const [isLocationTypeError, setisLocationTypeError] = useState(false);
  // const [locationTypeList, setlocationTypeList] = useState<Array<BranchTypeModel>>([]);

  const [regionalOffice, setRegionalOffice] = useState("--Select--");
  const [regionalOfficeID, setRegionalOfficeID] = useState<number>(0);
  const [regionalOfficeError, setRegionalOfficeError] = useState("");
  const [isRegionalOfficeError, setIsRegionalOfficeError] = useState(false);
  const [regionalOfficeList, setRegionalOfficeList] = useState<Array<RegionalOfficeModel>>([]);
  const [regionalOfficeFullData, setRegionalOfficeFullData] = useState([]);

  const [assignBranchAdmin, setAssignBranchAdmin] = useState("--Select--");
  const [assignBranchAdminID, setAssignBranchAdminID] = useState<number>(0);
  const [assignBranchAdminError, setAssignBranchAdminError] = useState("");
  const [isAssignBranchAdminError, setIsAssignBranchAdminError] = useState(false);
  const [assignBranchAdminList, setAssignBranchAdminList] = useState<Array<EmployeeModel>>([]);
  const [assignBranchAdminFullData, setAssignBranchAdminFullData] = useState([]);

  const [companyName, setCompanyName] = useState("");
  const [companyNameID, setCompanyNameID] = useState("")
  const [companyError, setCompanyError] = useState("");
  const [isCompanyError, setIsCompanyError] = useState(false);

  const [branchName, setBranchName] = useState("");
  const [branchError, setBranchError] = useState("");
  const [isBranchError, setIsBranchError] = useState(false);

  const [accountNo, setAccountNo] = useState("");
  const [accountNoError, setAccountNoError] = useState("");
  const [isAccountNoError, setIsAccountNoError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isAddressError, setIsAddressError] = useState(false);

  const [bankName, setBankName] = useState("");
  const [bankNameError, setbankNameError] = useState("");
  const [isBankNameError, setIsBankNameError] = useState(false);

  const [bankBranchName, setBankBranchName] = useState("");
  const [bankBranchNameError, setBankBranchNameError] = useState("");
  const [isBankBranchNameError, setIsBankBranchNameError] = useState(false);

  const [contactFullList, setContactPerson] = useState("");
  const [contactPersonNo, setContactPersonNo] = useState<number>(0);
  const [contactPersonError, setContactPersonError] = useState("");
  const [isContactPersonError, setIsContactPersonError] = useState(false);


  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isPincodeError, setIsPincodeError] = useState(false);

  const [gst, setGst] = useState("");
  const [gstError, setGstError] = useState("");
  const [isGstError, setIsGstError] = useState(false);

  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");
  const [isPanError, setIsPanError] = useState(false);

  const [ifsc, setIfsc] = useState("");
  const [ifscError, setIfscError] = useState("");
  const [isIfscError, setIsIfscError] = useState(false);

  const [showRO, setShowRO] = useState(false);

  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const [gridBranchList, setGridBranchList] = useState<Array<BranchModel>>([]);
  const [gridBranchListTemp, setGridBranchListTemp] = useState<Array<BranchModel>>([]);

  const [arnID, setArnID] = useState<number>(0);

  //#endregion 

  //#region Functions

  useEffect(() => {

    GetCompanyName();
    FetchData("");
    FetchActvityRoles();
    FetchStates();
    FetchAssignBranchAdmin();
  }, []);

  const FetchStates = () => {

    Provider.createDFCommonWithouParam(Provider.API_URLS.StateDetails)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setStateNameList(response.data.data);


          }
        }
      })
      .catch((e) => { });
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const FetchCity = (stateID, cid) => {

    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        state_refno: stateID
      }
    };
    Provider.createDFCommon(Provider.API_URLS.DistrictDetails, params)
      .then((response: any) => {

        if (response.data && response.data.code === 200) {
          if (response.data.data) {

            response.data.data = APIConverter(response.data.data);
            setCityNameList(response.data.data);

            if (cid != "") {
              let c = response.data.data.filter((el: any) => {
                return el.cityID === cid;
              });

              if (c != null) {

                setCity(c[0].cityName);
                setCityID(c[0].cityID);
              }
            }
          }
        }
      })
      .catch((e) => { });
  };
  const FetchBranchInchargeContactNo = (assignBranchAdminID) => {

    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_company_refno: cookies.dfc.Sess_company_refno,
        incharge_user_refno: assignBranchAdminID,
      }
    };
    Provider.createDFCommon(Provider.API_URLS.FetchBranchAssignContactNo, params)
      .then((response: any) => {

        if (response.data && response.data.code === 200) {
          if (response.data.data) {

            //response.data.data = APIConverter(response.data.data);
            setContactPersonNo(response.data.data[0].incharge_mobile_no);

            // if (cid != "") {
            //   let c = response.data.data.filter((el: any) => {
            //     return el.cityID === cid;
            //   });

            //   if (c != null) {

            //     setCity(c[0].cityName);
            //     setCityID(c[0].cityID);
            //   }
            // }
          }
        }
      })
      .catch((e) => { });
  };
  const FetchActvityRoles = () => {
    Provider.getAll("master/getmainactivities")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el: any) => {
              return el.display && el.activityRoleName === "Contractor";
            });
            setArnID(response.data.data[0].id);
          }
          FetchBranchType(response.data.data[0].id);
        }
      })
      .catch((e) => { });
  };

  const FetchBranchType = (arnID) => {
    let params = {
      // ActivityID: arnID,
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_company_refno: cookies.dfc.Sess_company_refno,
        Sess_group_refno: cookies.dfc.Sess_group_refno
      }
    };
    Provider.createDFCommon(Provider.API_URLS.MyFetchBranchtype, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setBranchTypeList(response.data.data);
          }
        }
      })
      .catch((e) => { });
  };

  const FetchRegionalOffice = (branchTypeID) => {

    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_company_refno: cookies.dfc.Sess_company_refno,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
        locationtype_refno: branchTypeID

      }
    };

    Provider.createDFCommon(Provider.API_URLS.MyFetchRegionalOffice, params)
      .then((response: any) => {

        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            // debugger;
            response.data.data = APIConverter(response.data.data);
            setRegionalOfficeList(response.data.data);
            if (branchTypeID != "") {
              let ro = response.data.data.filter((el: any) => {
                return el.id === branchTypeID;
              });

              if (ro != null) {
                setRegionalOffice(ro[0].locationName);
                setRegionalOfficeID(ro[0].id);
              }
            }
          }
        }
      })
      .catch((e) => { });
  };

  const FetchCompanyName = () => {
    let params = {
      AddedByUserID: cookies.dfc.UserID,
    };

    Provider.getAll(`master/getusercompany?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {

        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setCompanyName(response.data.data[0].companyName);
            setPan(response.data.data[0].pan);
            setCompanyNameID(response.data.data[0].companyID);
          }
        }
      })
      .catch((e) => { });
  };

  const FetchAssignBranchAdmin = () => {

    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_company_refno: cookies.dfc.Sess_company_refno,
      }
    };
    // debugger;
    Provider.createDFCommon(Provider.API_URLS.MyFetchBranchAssign, params)
      .then((response: any) => {
        const admindata: any = [];

        if (response.data && response.data.code === 200) {
          if (response.data.data) {

            response.data.data = APIConverter(response.data.data);

            setAssignBranchAdminFullData(response.data.data);
            response.data.data.map((data: any, i: number) => {
              admindata.push({
                id: data.id,
                employeeName: data.employeeName,
              });
            });
            setAssignBranchAdminList(admindata);
          }
        }
      })
      .catch((e) => { });
  };

  const FetchData = (type: string) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        branch_refno: "all",
        Sess_company_refno: cookies.dfc.Sess_company_refno,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
      }
    }

    Provider.createDFCommon(Provider.API_URLS.MyBranchRefnocheck, params)
      .then((response: any) => {

        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            debugger;
            response.data.data = APIConverter(response.data.data, "addbranch");
            debugger;
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setGridBranchList(arrList);
            setGridBranchListTemp(arrList);
            if (type !== "") {
              if (type == "insert") {
                setSnackMsg("Item Inserted Successfully");
              }
              else {
                setSnackMsg("Item updated Successfully");
              }
              setOpen(true);
              setSnackbarType("success");
            }
          }
        } else {
          setSnackMsg(communication.NoData);
          setOpen(true);
          setSnackbarType("info");
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });


    // eslint-disable-next-line react-hooks/exhaustive-deps
  };


  const handleSubmitClick = () => {

    let isValid: boolean = true;

    if (companyName.trim() === "") {
      isValid = false;
      setIsCompanyError(true);
      setCompanyError(communication.BlankCompanyName);
    }
    if (branchType.trim() === "") {
      isValid = false;
      setIsCompanyError(true);
      setIsBranchTypeError(true);
      setBranchTypeError(communication.BlankBranchType);
    }

    if (showRO && regionalOffice.trim() === "") {
      isValid = false;
      setIsRegionalOfficeError(true);
      setRegionalOfficeError("Please select regional office");
    }

    if (branchName.trim() === "") {
      isValid = false;
      setIsCompanyError(true);
      setIsBranchError(true);
      setBranchError(communication.BlankBranchName);
    }

    if (state.trim() === "--Select--") {
      isValid = false;
      setIsStateError(true);
      setStateError(communication.BlankState);
    }

    if (city.trim() === "--Select--") {
      isValid = false;
      setIsCityError(true);
      setCityError(communication.BlankCity);
    }

    if (isValid) {

      InsertUpdateData();
    }
  };

  const GetCompanyName = () => {


    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_company_refno: cookies.dfc.Sess_company_refno
      }
    }
    Provider.createDFCommon(Provider.API_URLS.CompanyBranchForm, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setCompanyName(response.data.data[0].companyName);
            setCompanyNameID(response.data.data[0].companyID);
          }
        }
      })
      .catch((e) => { });

  }
  const InsertUpdateData = () => {
    debugger;
    setButtonLoading(true);

    if (actionStatus === "new") {

      let params = {
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          company_refno: companyNameID,
          parent_branch_refno: regionalOffice == "" ? "0" : regionalOffice,
          incharge_user_refno: assignBranchAdminID,
          locationtype_refno: branchTypeID,
          location_name: branchName,
          address: address,
          pincode: pincode == "" ? 0 : pincode,
          district_refno: cityID,
          state_refno: stateID,
          gst_no: gst,
          pan_no: pan,
          bank_account_no: accountNo,
          bank_name: bankName,
          bank_branch_name: bankBranchName,
          ifsc_code: ifsc,
          view_status: display == "Yes" ? "1" : "0",
        }
      }
      debugger;
      Provider.createDFCommon(Provider.API_URLS.AddBranch, params)
        .then((response) => {
          debugger;

          if (response.data && response.data.code === 200) {
            // debugger;
            if (response.data.data.Created == 1) {
              // debugger;
              ResetFields();
              FetchData("insert");
            }
            else {
              setSnackMsg(response.data.message);
              setOpen(true);
              setSnackbarType("error");
            }
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
          // handleCancelClick();
        })
        .catch((e) => {

          // handleCancelClick();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    } else if (actionStatus === "edit") {
      let params = {
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          branch_refno: selectedID,
          company_refno: companyNameID,
          parent_branch_refno: regionalOffice == "" ? "0" : regionalOffice,
          incharge_user_refno: assignBranchAdminID,
          locationtype_refno: branchTypeID,
          location_name: branchName,
          address: address,
          pincode: pincode == "" ? 0 : pincode,
          district_refno: cityID,
          state_refno: stateID,
          gst_no: gst,
          pan_no: pan,
          bank_account_no: accountNo,
          bank_name: bankName,
          bank_branch_name: bankBranchName,
          ifsc_code: ifsc,
          view_status: display == "Yes" ? "1" : "0",

        }
      }
      debugger;

      Provider.createDFCommon(Provider.API_URLS.EditBranch, params)
        .then((response) => {
          debugger;
          if (response.data && response.data.code === 200) {
            response.data.data = APIConverter(response.data.data);
            FetchData("update");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
          //handleCancelClick();
        })
        .catch((e) => {
          //handleCancelClick();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    }
  };

  const handleSNChange = (event: SelectChangeEvent) => {

    let stateName: string = event.target.value;
    let ac = stateNameList.find((el) => el.stateName === stateName);
    if (ac !== undefined) {
      setState(stateName);
      setStateID(ac?.stateID);
      setIsStateError(false);
      setStateError("");
      FetchCity(ac.stateID, "");
    }
  };

  const handleCNChange = (event: SelectChangeEvent) => {

    let cityName: string = event.target.value;
    let ac = cityNameList.find((el) => el.cityName === cityName);
    if (ac !== undefined) {
      setCity(cityName);
      setCityID(ac?.cityID);
      setIsCityError(false);
      setCityError("");
    }
  };

  const handleBTChange = (event: SelectChangeEvent) => {

    let branchType: string = event.target.value;
    let ac = branchTypeList.find((el) => el.branchType === branchType);
    if (ac !== undefined) {
      setBranchType(branchType);
      setBranchTypeID(ac?.id);
      setIsBranchTypeError(false);
      setBranchTypeError("");
      setIsRegionalOfficeError(false);
      setRegionalOfficeError("");
      if (ac?.id == 3) {
        setShowRO(true);
        FetchRegionalOffice(ac?.id);
      }
      else {
        setShowRO(false);
        setRegionalOfficeID(0);
        setRegionalOffice("");
      }
    }
  };

  const handleABAdminChange = (event: SelectChangeEvent) => {

    let assignBranchAdmin: string = event.target.value;
    let ac = assignBranchAdminFullData.find((el) => el.employeeName === assignBranchAdmin);
    console.log(ac)
    if (ac !== undefined) {
      setAssignBranchAdmin(assignBranchAdmin);
      setAssignBranchAdminID(ac?.id);
      setIsAssignBranchAdminError(false);
      setAssignBranchAdminError("");
      FetchBranchInchargeContactNo(ac?.id);
    }
  };

  const handleROChange = (event: SelectChangeEvent) => {

    let regionaloffice: string = event.target.value;
    let ac = regionalOfficeList.find((el) => el.locationName === regionaloffice);
    if (ac !== undefined) {
      setRegionalOfficeID(ac.id);
      setRegionalOffice(ac.locationName);
      setIsRegionalOfficeError(false);
      setRegionalOfficeError("");
    }
  };

  // const handleSelectedReginalChange = (event: SelectChangeEvent) => {
  //   
  //   let selectedRegional: string = event.target.value;
  //   let ac = selectedRegionalList.find((el) => el.regionaloffice === selectedRegional);
  //   if (ac !== undefined) {
  //     setSelectedRegional(selectedRegional);
  //     setSelectedRegionalID(ac?.id);
  //     IsSetSelectedRegionalError(false);
  //     setSelectedRegionalError("");
  //   }
  // };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
    setBranchType("");
    setBranchTypeID(0);

    setRegionalOffice("");
    setRegionalOfficeID(0);

    setAssignBranchAdmin("");
    setAssignBranchAdminID(0);

    setDisplay("Yes");
    setContactPerson("");
    setGst("");
    setPan("");
    setBranchName("");
    setAddress("");
    setPincode("");
    setAccountNo("");
    setBankName("");
    setBankBranchName("");
    setIfsc("");

    setState("");
    setStateID("");
    setCity("");
    setCityID("");
  };


  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      // setBranchListTemp(branchList);
    } else {
      // setBranchListTemp(
      //   branchList.filter((el: BranchModel) => {
      //     return el.BranchModel.toString().toLowerCase().includes(query.toLowerCase());
      //   })
      // );
    }
  };

  const handelEditAndDelete = (type: string | null, a: BranchModel | undefined) => {
    debugger;
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setSelectedID(a.id);
      setButtonDisplay("unset");
      setActionStatus("edit");
      setBranchType(a.branchType);
      setBranchTypeID(a?.branchTypeID);

      if (a.branchTypeID == 3) {
        setShowRO(true);
        FetchRegionalOffice(a?.regionalOfficeID);
      }

      //let e = assignBranchAdminFullData.find((el) => el.id === a.branchAdminID);
      setAssignBranchAdmin(a.branchInchargeName);
      setAssignBranchAdminID(a?.branchAdminID);
      setContactPerson(a?.branchInchargeContactNo);
      setGst(a.gstNo);
      setPan(a.panNo);
      setBranchName(a.locationName);
      setAddress(a.address);

      //let s = stateNameList.find((el) => el.stateID === a.stateID);
      //if (s != null) {
      setState(a?.stateName);
      setStateID(a?.stateID);
      if (a?.cityID != "") {
        FetchCity(a.stateID, a.cityID);
      }
      //}
      setPincode(a.pincode.toString() == "0" ? "" : a.pincode.toString());
      setAccountNo(a.accountNo);
      setBankName(a.bankName);
      setBankBranchName(a.bankBranchName);
      setIfsc(a.ifscCode);

      setDisplay(a.display ? "Yes" : "No");
    }
  };

  //#endregion 

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4" >Add Branch</Typography>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
          <Grid item sm={4}>
            <Typography variant="h6">BRANCH DETAILS </Typography>
            <hr style={{ width: '360px', borderRadius: 1, borderWidth: 1, borderColor: '#000000', borderStyle: "solid", }} />
          </Grid>
          <Grid item sm={4}>
            <Typography variant="h6">LOCATION DETAILS </Typography>
            <hr style={{ width: '360px', borderRadius: 1, borderWidth: 1, borderColor: '#000000', borderStyle: "solid", }} />
          </Grid>
          <Grid item sm={4}>
            <Typography variant="h6">BANK DETAILS </Typography>
            <hr style={{ width: '360px', borderRadius: 1, borderWidth: 1, borderColor: '#000000', borderStyle: "solid", }} />
          </Grid>
        </Grid>
        <br></br>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>

                <label style={{ float: 'right', }}><label style={{ color: "#ff0000" }}>*</label> Company/Firm Name</label>
              </Grid>
              <Grid item sm={6}>
                <TextField value={companyName} error={isCompanyError}
                  helperText={companyError} variant="outlined" size="small"
                  disabled={true} sx={{ background: "#e5e5e5" }}></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}><label style={{ color: "#ff0000" }}>*</label> Branch Type</label>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth size="small" error={isbranchTypeError}>
                  <Select value={branchType} onChange={handleBTChange}>
                    <MenuItem disabled={true} value="--Select--">
                      --Select--
                    </MenuItem>
                    {branchTypeList.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.branchType}>
                          {item.branchType}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>{branchTypeError}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <br></br>
            <Grid>
              {
                showRO &&
                <><Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                  <Grid item sm={6}>
                    <label style={{ float: 'right', }}><label style={{ color: "#ff0000" }}>*</label> Select Regional Office</label>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth size="small" error={isbranchTypeError}>
                      <Select value={regionalOffice} onChange={handleROChange}>
                        <MenuItem disabled={true} value="--Select--">
                          --Select--
                        </MenuItem>
                        {regionalOfficeList.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.locationName}>
                              {item.locationName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText>{regionalOfficeError}</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid><br></br></>

              }
            </Grid>

            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}> Assign Branch Admin</label>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth size="small" error={isAssignBranchAdminError}>
                  <Select value={assignBranchAdmin} onChange={handleABAdminChange}>
                    <MenuItem disabled={true} value="--Select--">
                      --Select--
                    </MenuItem>
                    {assignBranchAdminList.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.employeeName}>
                          {item.employeeName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>{assignBranchAdminError}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}> Contact Person No</label>
              </Grid>
              <Grid item sm={6}>
                <TextField value={contactPersonNo} error={isContactPersonError} helperText={contactPersonError}
                  disabled={true} sx={{ background: "#e5e5e5" }}
                  variant="outlined" size="small"></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}> GST No</label>
              </Grid>
              <Grid item sm={6}>
                <TextField value={gst} error={isGstError} helperText={gstError}
                  variant="outlined" size="small" onChange={(e) => {
                    setGst((e.target as HTMLInputElement).value);
                  }}></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}> PAN No</label>
              </Grid>
              <Grid item sm={6}>
                <TextField value={pan} error={isPanError} helperText={panError}
                  variant="outlined" size="small" onChange={(e) => {
                    setPan((e.target as HTMLInputElement).value)
                  }}></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}> Display</label>
              </Grid>
              <Grid item sm={6}>
                {/* <Checkbox></Checkbox> */}
                <FormControl>
                  <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </Grid>

            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', textAlign: 'right' }}><label style={{ color: "#ff0000" }}>*</label> Branch/Location Name</label>
              </Grid>
              <Grid item sm={6}>
                <TextField value={branchName} error={isBranchError} helperText={branchError}
                  variant="outlined" size="small" onChange={(e) => {
                    setBranchName((e.target as HTMLInputElement).value)
                  }} ></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}>Address</label>
              </Grid>
              <Grid item sm={6}>
                <TextField value={address} error={isAddressError} helperText={addressError}
                  variant="outlined" size="small" onChange={(e) => {
                    setAddress((e.target as HTMLInputElement).value)
                  }}></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}><label style={{ color: "#ff0000" }}>*</label>State</label>
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
              <Grid item sm={6}>
                <label style={{ float: 'right', }}><label style={{ color: "#ff0000" }}>*</label> City</label>
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
              <Grid item sm={6}>
                <label style={{ float: 'right', }}> Pincode</label>
              </Grid>
              <Grid item sm={6}>
                <TextField value={pincode} error={isPincodeError} helperText={pincodeError}
                  variant="outlined" size="small" onChange={(e) => {
                    setPincode((e.target as HTMLInputElement).value)
                  }}></TextField>
              </Grid>
            </Grid>

          </Grid>

          <Grid item xs={4}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}> Account No</label>
              </Grid>
              <Grid item sm={6}>
                <TextField value={accountNo} error={isAccountNoError} helperText={accountNoError}
                  variant="outlined" size="small" onChange={(e) => {
                    setAccountNo((e.target as HTMLInputElement).value)
                  }}></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}> Bank Name</label>
              </Grid>
              <Grid item sm={6}>
                <TextField value={bankName} error={isBankNameError} helperText={bankNameError}
                  variant="outlined" size="small" onChange={(e) => {
                    setBankName((e.target as HTMLInputElement).value)
                  }}></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}> Bank Branch Name</label>
              </Grid>
              <Grid item sm={6}>
                <TextField value={bankBranchName} error={isBankBranchNameError} helperText={bankBranchNameError}
                  variant="outlined" size="small" onChange={(e) => {
                    setBankBranchName((e.target as HTMLInputElement).value)
                  }}></TextField>
              </Grid>
            </Grid>

            <br></br>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={6}>
                <label style={{ float: 'right', }}> IFSC Code</label>
              </Grid>
              <Grid item sm={6}>
                <TextField value={ifsc} error={isIfscError} helperText={ifscError}
                  variant="outlined" size="small" onChange={(e) => {
                    setIfsc((e.target as HTMLInputElement).value)
                  }}></TextField>
              </Grid>

            </Grid>

          </Grid>

        </Grid>

        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
          <Grid >
            <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.success.main }} onClick={handleSubmitClick} >Submit</Button>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">My Branch List</Typography>
            <hr style={{ width: '360', borderRadius: 1, borderWidth: 1, borderColor: '#000000', borderStyle: "solid" }}></hr>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
          {/* <Grid item sm={4}>
        <Typography variant="h6"><b>Show</b>&nbsp;<NativeSelect></NativeSelect>&nbsp;entries</Typography>
    </Grid> */}
        </Grid>
        <Grid item xs={4} sm={8} md={12}>
          {loading ? (
            <Box
              height="300px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ m: 2 }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
              {gridBranchList.length === 0 ? (
                <></>
              ) : (
                <>
                  <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                    <TextField
                      placeholder="Search"
                      variant="outlined"
                      size="small"
                      //sx={{justifySelf:"flex-end"}}
                      onChange={(e) => {
                        onChangeSearch((e.target as HTMLInputElement).value);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            < SearchIcon />
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
                    rows={gridBranchListTemp}
                    columns={branchColumns}
                    pageSize={pageSize}
                    rowHeight={90}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    disableSelectionOnClick
                    onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                      const arrActivity = [...gridBranchList];
                      let a: BranchModel | undefined =
                        arrActivity.find((el) => el.id === param.row.id);
                      handelEditAndDelete((e.target as any).textContent, a);
                    }}
                    sx={{
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                      },
                      mb: 1
                    }}
                  />
                </>
              )}
            </div>
          )}
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  )
};


export default AddBranch;

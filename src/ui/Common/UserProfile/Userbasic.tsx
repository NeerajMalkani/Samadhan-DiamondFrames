import {
  Box, TextField, Button, Container, Tabs, Radio, InputAdornment,
  RadioGroup, Tab, FormControl, CircularProgress, FormControlLabel, Typography, Select, Grid, Menu, Snackbar, MenuItem, AlertColor, FormHelperText, Alert
} from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { theme } from "../../../theme/AppTheme";
import { useCookies } from "react-cookie";
import ModeIcon from "@mui/icons-material/Mode";
import { communication } from "../../../utils/communication";
import CheckIcon from "@mui/icons-material/Check";
import { ArrowDropDown, FormatAlignJustify } from "@mui/icons-material";
import { border } from "@mui/system";
import { GetStringifyJson, NullOrEmpty } from "../../../utils/CommonFunctions";
import { CityModel, CompanyModel, StateModel, UserModel, UserProfile } from "../../../models/Model";
import Provider from "../../../api/Provider";
import { SelectChangeEvent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { APIConverter } from "../../../utils/apiconverter";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import NoData from "../../../components/NoData";
import { UserBankListModel } from "../../../models/Model";
import { DataGrid } from "@mui/x-data-grid";
import { userBankDetailsColumns } from "../../../utils/tablecolumns";

let st_ID = 0, ct_ID = 0;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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


const Userbasic = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [value, setValue] = useState(0);
  const [CookieUserID, SetCookieUseID] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);


  //#region Variables
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [myUserNameList, setMyUserNameList] = useState<Array<UserModel>>([]);
  const [myUserNameListTemp, setMyUserNameListTemp] = useState<Array<UserModel>>([]);

  const [snackMsg, setSnackMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [loading, setLoading] = useState(true);

  const [userID, setUserID] = useState(0);

  const [companyName, setCompanyName] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [isCompanyError, setIsCompanyError] = useState(false);

  const [contactPerson, setContactPerson] = useState("");
  const [contactPersonError, setContactPersonError] = useState("");
  const [isContactPersonError, setIsContactPersonError] = useState(false);

  const [mobile, setMobile] = useState<string>("");
  const [mobileError, setMobileError] = useState("");
  const [isMobileError, setIsMobileError] = useState(false);

  const [profileAddress, setProfileAddress] = useState<string>("");
  const [addressError, setAddressError] = useState("");
  const [isAddressError, setIsAddressError] = useState(false);

  const [sn, setSn] = useState("--Select--");
  const [snId, setSnID] = useState<number>(0);

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

  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isPincodeError, setIsPincodeError] = useState(false);

  const [gst, setGst] = useState("");
  const [gstError, setGstError] = useState("");
  const [isGstError, setIsGstError] = useState(false);

  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");
  const [isPanError, setIsPanError] = useState(false);

  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [display, setDisplay] = React.useState("Yes");


  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountHolderNameError, setAccountHolderNameError] = useState("");
  const [isAccountHolderNameError, setIsAccountHolderNameError] = useState(false);
  const [accountHolderNameText, setAccountHolderNameText] = useState<string>("");

  const [accountNo, setAccountNo] = useState("");
  const [accountNoError, setAccountNoError] = useState("");
  const [isAccountNoError, setIsAccountNoError] = useState(false);

  const [bankName, setBankName] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [isBankNameError, setIsBankNameError] = useState(false);
  const [ankNameText, setBankNameText] = useState<string>("");

  const [bankBranchName, setBankBranchName] = useState("");
  const [bankBranchNameError, setBankBranchNameError] = useState("");
  const [isBankBranchNameError, setIsBankBranchNameError] = useState(false);

  const [ifscCode, setIFSCCode] = useState("");
  const [ifscCodeError, setIFSCCodeError] = useState("");
  const [isIFSCCodeError, setIsIFSCCodeError] = useState(false);

  const cardType = useState([
    { key: "Debit Card", isSelected: false, id: 1 },
    { key: "Credit Card", isSelected: false, id: 2 },
  ]);

  const isCardTypeError = useState(false);
  const cardTypeError = useState("");

  const [openingBalance, setOpeningBalance] = useState("");
  const [openingBalanceError, setOpeningBalanceError] = useState("");
  const [isOpeningBalanceError, setIsOpeningBalanceError] = useState(false);

  const [remarks, setRemarks] = useState("");
  const [remarksError, setRemarksError] = useState("");
  const [isRemarksError, setIsRemarksError] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = React.useState<number>(5);

  const [bankList, setBankList] = React.useState("");

  const [bankNamesList, setBankNamesList] = useState<Array<UserBankListModel>>([]);
  const [bankNamesListTemp, setBankNamesListTemp] = React.useState<Array<any>>([]);
  const [bankListError, setBankListError] = useState("");
  const [isBankListError, setIsBankListError] = useState(false);




  //#endregion

  //#region Functions

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  useEffect(() => {
    FetchUserData("");
    FetchBankData("");
    FetchCardType();
  }, []);

  const FetchStates = () => {
    Provider.createDFCommonWithouParam(Provider.API_URLS.StateDetails)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {

            response.data.data = APIConverter(response.data.data);
            const stateData: any = [];
            response.data.data.map((data: any, i: number) => {
              stateData.push({
                id: data.stateID,
                label: data.stateName,
              });
            });
            setStateNameList(response.data.data);

            if (st_ID > 0) {
              let a = stateData.filter((el) => {
                return el.id === st_ID;
              });
              setState(a[0].label);
              FetchCity(st_ID);
            }
          }
        }
      })
      .catch((e) => { });
  };

  const FetchCity = (stateID) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        state_refno: stateID,
      }
    };
    Provider.createDFCommon(Provider.API_URLS.DistrictDetails, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const cityData: any = [];
            response.data.data.map((data: any, i: number) => {
              cityData.push({
                id: data.cityID,
                label: data.cityName,
              });
            });

            setCityNameList(response.data.data);
            if (ct_ID > 0) {
              let a = cityData.filter((el) => {
                return el.id === ct_ID;
              });
              setCity(a[0].label);
            }
          }
          else {
            setCityNameList([]);
            setCity("");
            ct_ID = 0;
            setCityID(0);
          }
        }
        else {
          setCityNameList([]);
          setCity("");
          ct_ID = 0;
          setCityID(0);
        }
      })
      .catch((e) => { });
  };

  const FetchUserData = (type: string) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno
      }
    };
    Provider.createDFCommon(Provider.API_URLS.getuserprofile, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            if (response.data.data[0] != null) {
              const arrList = [...response.data.data];
              setUserID(arrList[0].userID);
              setCompanyName(!NullOrEmpty(arrList[0].companyName) ? arrList[0].companyName : "");
              setContactPerson(!NullOrEmpty(arrList[0].contactPersonName) ? arrList[0].contactPersonName : "");
              setMobile(!NullOrEmpty(arrList[0].Mobile) ? arrList[0].Mobile : "");
              setProfileAddress(!NullOrEmpty(arrList[0].addressLine) ? arrList[0].addressLine : "");
              // setState(arrList[0].stateName);
              if (!NullOrEmpty(arrList[0].stateID)) {
                setStateID(arrList[0].stateID);
                st_ID = arrList[0].stateID;
              }

              if (!NullOrEmpty(arrList[0].cityID)) {
                setCityID(arrList[0].cityID);
                ct_ID = arrList[0].cityID;
              }

              setCityID(arrList[0].cityID);

              // if (arrList[0].stateID > 0) {
              //   FetchCity(arrList[0].stateID);
              //   setCity(arrList[0].cityName);
              //   setCityID(arrList[0].cityID);
              // }

              setPincode(!NullOrEmpty(arrList[0].pincode) ? arrList[0].pincode : "");
              setGst(!NullOrEmpty(arrList[0].gstNumber) ? arrList[0].gstNumber : "");
              setPan(!NullOrEmpty(arrList[0].pan) ? arrList[0].pan : "");

              if (type !== "") {
                setSnackMsg("User " + type);
                setOpen(true);
                setSnackbarType("success");
              }
            }
          }
        } else {
          setSnackMsg(communication.NoData);
          setOpen(true);
          setSnackbarType("info");
        }

        FetchStates();
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

  const handleSNChange = (event: SelectChangeEvent) => {
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

  const handleSubmitClick = () => {
    let isValid: Boolean = true;

    if (companyName.trim() === "") {
      isValid = false;
      setIsCompanyError(true);
      setCompanyError(communication.BlankCompanyName);
    }

    if (contactPerson.trim() === "") {
      isValid = false;
      setIsContactPersonError(true);
      setContactPersonError(communication.BlankContactPerson);
    }

    if (mobile.trim() === "") {
      isValid = false;
      setIsMobileError(true);
      setMobileError(communication.BlankMobile);
    }

    if (profileAddress.trim() === "") {
      isValid = false;
      setIsAddressError(true);
      setAddressError(communication.BlankAddress);
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

    if (pincode.toString().trim() === "") {
      isValid = false;
      setIsPincodeError(true);
      setPincodeError(communication.BlankBrandPrefix);
    }

    if (gst.trim() === "") {
      isValid = false;
      setIsGstError(true);
      setGstError(communication.BlankGst);
    }

    if (pan.trim() === "") {
      isValid = false;
      setIsPanError(true);
      setPanError(communication.BlankPan);
    }
    if (isValid) {
      InsertUpdateData();
    }
  };

  const InsertUpdateData = () => {
    if (actionStatus === "new") {

      let params = {
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          Sess_group_refno: cookies.dfc.Sess_group_refno,
          company_name: companyName,
          contact_person: contactPerson,
          contact_person_mobile_no: mobile,
          address: profileAddress,
          state_refno: stateID,
          district_refno: cityID,
          pincode: pincode,
          gst_no: gst,
          pan_no: pan
        }
      }
      Provider.createDFCommon(Provider.API_URLS.userprofileupdate, params)
        .then((response) => {
          if (response.data && response.data.code === 200) {
            setSnackMsg("Profile Updated Successfully!.");
            setSnackbarType("success");
            setOpen(true);
          } else {
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
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handelEditAndDelete = (
    type: string | null,
    a: UserBankListModel | undefined
  ) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setAccountHolderName(a.accountHolderName);
      setAccountNo(a.accountNumber);
      setBankName(a.bankName);
      setBankBranchName(a.branchName);
      setIFSCCode(a.ifscCode);
      
      const stateData: any = [];
      cardType[0].map((data: any, i: number) => {
        if (a.cardTypeName.includes(data.key)) {
          stateData.push({
            key: data.key,
            isSelected: true,
            id: data.id
          });
        }
        else {
          stateData.push({
            key: data.key,
            isSelected: false,
            id: data.id
          });
        }
        cardType[1](stateData);
      });

      setOpeningBalance(a.openingBalance);
      setRemarks(a.remarks);
      setSelectedID(a.bank_refno);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setBankNamesListTemp(bankNamesList);
    } else {
      setBankNamesListTemp(
        bankNamesList.filter((el: UserBankListModel) => {
          return el.bankName
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase());
        })
      );
    }
  };

  const FetchBankData = (type: string) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_company_refno: "all",
        bank_refno: "all"
      },
    };
    ///
    Provider.createDFCommon(Provider.API_URLS.userbankrefnocheck, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.id = index + 1;
              a.cardType = a.cardType ? "Debit" : "Credit";
              a.display = a.display == "1" ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setBankNamesList(arrList);
            setBankNamesListTemp(arrList);
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

  const FetchCardType = () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
      },
    };
    Provider.createDFPocketDairy(Provider.API_URLS.getcardtype_pckmypersonalbankform, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          debugger;
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);

            const stateData: any = [];
            response.data.data.map((data: any, i: number) => {
              stateData.push({
                key: data.cardTypeName,
                isSelected: false,
                id: data.cardTypeID
              });
            });
            cardType[1](stateData);

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
  const handleSubmitBankClick = () => {
    debugger;
    let isValid: boolean = true;

    if (accountHolderName.trim() === "") {
      isValid = false;
      setIsAccountHolderNameError(true);
      setAccountHolderName(communication.AccountHolderName);
    }

    if (bankName.trim() === "") {
      isValid = false;
      setIsBankNameError(true);
      setBankName(communication.BlankBankName);
    }

    let blankData = cardType[0].filter((el) => el.isSelected);
    if (blankData.length === 0) {
      isValid = false;
      isCardTypeError[1](true);
      cardTypeError[1]("Please select Card Type ");
    }

    if (isValid) {

      const ct = blankData.map((data) => data.id);
      InsertUpdateBankData(accountHolderName, display === "Yes", ct);
    }
    setDisplay("Yes");
    setAccountHolderName("");
    setAccountHolderNameError("");
    setIsAccountHolderNameError(false);
  };


  const InsertUpdateBankData = (accountHolderName: string, checked: boolean, ct) => {
    setButtonLoading(true);
    if (actionStatus === "new") {
      debugger;
      let params = {
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          Sess_company_refno: cookies.dfc.Sess_company_refno.toString(),
          Sess_branch_refno: cookies.dfc.Sess_branch_refno.toString(),
          bank_ac_holder_name: accountHolderName,
          bank_account_no: accountNo,
          bank_name: bankName,
          bank_branch_name: bankBranchName,
          ifsc_code: ifscCode,
          cardtype_refno: ct,
          opening_balance: openingBalance,
          remarks: remarks,
          view_status: display === "Yes" ? 1 : 0,
        },
      }
      Provider.createDFCommon(Provider.API_URLS.userbankcreate, params)
        .then((response) => {
          debugger;
          if (response.data && response.data.code === 200) {
            debugger;
            FetchBankData("added");
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
      debugger;
      let params = {
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          Sess_company_refno: cookies.dfc.Sess_company_refno.toString(),
          Sess_branch_refno: cookies.dfc.Sess_branch_refno.toString(),
          bank_refno: selectedID,
          bank_ac_holder_name: accountHolderName,
          bank_account_no: accountNo,
          bank_name: bankName,
          bank_branch_name: bankBranchName,
          ifsc_code: ifscCode,
          cardtype_refno: ct,
          opening_balance: openingBalance,
          remarks: remarks,
          view_status: display === "Yes" ? 1 : 0,
        },
      }
      Provider.createDFCommon(Provider.API_URLS.userbankupdate, params)
        .then((response) => {
          debugger;
          if (response.data && response.data.code === 200) {
            debugger;
            FetchBankData("updated");
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
    }
  };



  //#endregion 


  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid
            item
            xs={4}
            sm={8}
            md={12}
            sx={{
              borderBottom: 1,
              paddingBottom: "8px",
              borderColor: "rgba(0,0,0,0.12)",
            }}
          >
            <Typography variant="h4">Basic details</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
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
              <>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="Basic Details" {...a11yProps(0)} />
                    <Tab label="Bank Details" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <Grid item xs={4} sm={8} md={12}>
                  <TabPanel value={value} index={0}>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                      <Grid item sm={4}>
                        <label>Name / Company Name</label>
                      </Grid>
                      <Grid item sm={4}>
                        <TextField
                          variant="outlined"
                          size="small"
                          error={isCompanyError}
                          helperText={companyError}
                          value={companyName}
                          onChange={(e) => {
                            setCompanyName((e.target as HTMLInputElement).value);
                            setIsCompanyError(false);
                            setCompanyError("");
                          }}
                        ></TextField>
                      </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                      <Grid item sm={4}>
                        <label>
                          <label style={{ color: "#ff0000" }}>*</label> Contact Person
                        </label>
                      </Grid>
                      <Grid item sm={4}>
                        <TextField
                          variant="outlined"
                          size="small"
                          error={isContactPersonError}
                          helperText={contactPersonError}
                          value={contactPerson}
                          onChange={(e) => {
                            setContactPerson((e.target as HTMLInputElement).value);
                            setIsContactPersonError(false);
                            setContactPersonError("");
                          }}
                        ></TextField>
                      </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                      <Grid item sm={4}>
                        <label>
                          <label style={{ color: "#ff0000" }}>*</label> Contact Mobile No
                        </label>
                      </Grid>
                      <Grid item sm={4}>
                        <TextField
                          variant="outlined"
                          size="small"
                          error={isMobileError}
                          helperText={mobileError}
                          value={mobile}
                          onChange={(e) => {
                            setMobile((e.target as HTMLInputElement).value);
                            setIsMobileError(false);
                            setMobileError("");
                          }}
                        ></TextField>
                      </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                      <Grid item sm={4}>
                        <label>
                          <label style={{ color: "#ff0000" }}>*</label> Address 1
                        </label>
                      </Grid>
                      <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
                        <TextField
                          variant="outlined"
                          size="small"
                          error={isAddressError}
                          helperText={addressError}
                          value={profileAddress}
                          onChange={(e) => {
                            setProfileAddress((e.target as HTMLInputElement).value);
                            setIsAddressError(false);
                            setAddressError("");
                          }}
                        ></TextField>
                      </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                      <Grid item sm={4}>
                        <label>
                          <label style={{ color: "#ff0000" }}>*</label> State
                        </label>
                      </Grid>
                      <Grid item sm={3}>
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
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                      <Grid item sm={4}>
                        <label>
                          <label style={{ color: "#ff0000" }}>*</label> City
                        </label>
                      </Grid>
                      <Grid item sm={3}>
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
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                      <Grid item sm={4}>
                        <label>Pincode</label>
                      </Grid>
                      <Grid item sm={4}>
                        <TextField
                          variant="outlined"
                          size="small"
                          error={isPincodeError}
                          helperText={pincodeError}
                          value={pincode}
                          onChange={(e) => {
                            setPincode((e.target as HTMLInputElement).value);
                            setIsPincodeError(false);
                            setPincodeError("");
                          }}
                        ></TextField>
                      </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                      <Grid item sm={4}>
                        <label>GST No</label>
                      </Grid>
                      <Grid item sm={4}>
                        <TextField
                          variant="outlined"
                          size="small"
                          error={isGstError}
                          helperText={gstError}
                          value={gst}
                          onChange={(e) => {
                            setGst((e.target as HTMLInputElement).value);
                            setIsGstError(false);
                            setGstError("");
                          }}
                        ></TextField>
                      </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                      <Grid item sm={4}>
                        <label>PAN No</label>
                      </Grid>
                      <Grid item sm={4}>
                        <TextField
                          variant="outlined"
                          size="small"
                          error={isPanError}
                          helperText={panError}
                          value={pan}
                          onChange={(e) => {
                            setPan((e.target as HTMLInputElement).value);
                            setIsPanError(false);
                            setPanError("");
                          }}
                        ></TextField>
                      </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                      <Grid>
                        <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
                          Update
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </TabPanel>


                  <TabPanel value={value} index={1}>
                    <Grid container xs={4} sm={8} md={12} spacing={{ xs: 1, md: 2 }}>
                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Account Holder Number</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setAccountHolderName((e.target as HTMLInputElement).value);
                            setIsAccountHolderNameError(false);
                            setAccountHolderNameError("");
                          }}
                          error={isAccountHolderNameError}
                          helperText={accountHolderNameError}
                          value={accountHolderName}
                        />
                      </Grid>
                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Account Number</b>
                        </Typography>
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

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Bank Name</b>
                        </Typography>
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

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Bank Branch Name</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setBankBranchName(
                              (e.target as HTMLInputElement).value
                            );
                            setIsBankBranchNameError(false);
                            setBankBranchNameError("");
                          }}
                          error={isBankBranchNameError}
                          helperText={bankBranchNameError}
                          value={bankBranchName}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>IFSC Code</b>
                        </Typography>
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

                      <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Card Type</b>
                        </Typography>
                        <FormControl component="fieldset" error={isCardTypeError[0]}>
                          <FormGroup aria-label="position" row>
                            {cardType[0].map((data, index) => {
                              return (
                                <FormControlLabel
                                  value={data.id}
                                  control={
                                    <Checkbox
                                      checked={data.isSelected}
                                      tabIndex={-1}
                                      onClick={() => {
                                        isCardTypeError[1](false);
                                        cardTypeError[1]("");
                                        const newChecked = [...cardType[0]];
                                        newChecked.find((item, i) => {
                                          if (item.id === data.id) {
                                            item.isSelected = !item.isSelected;
                                          }
                                        });
                                        cardType[1](newChecked);
                                      }}
                                    />
                                  }
                                  label={data.key}
                                  labelPlacement="end"
                                />
                              );
                            })}
                          </FormGroup>
                          <FormHelperText>{cardTypeError[0]}</FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Opening Balance</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setOpeningBalance((e.target as HTMLInputElement).value);
                            setIsOpeningBalanceError(false);
                            setOpeningBalanceError("");
                          }}
                          error={isOpeningBalanceError}
                          helperText={openingBalanceError}
                          value={openingBalance}
                        />
                      </Grid>
                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Remarks</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setRemarks((e.target as HTMLInputElement).value);
                            setIsRemarksError(false);
                            setRemarksError("");
                          }}
                          error={isRemarksError}
                          helperText={remarksError}
                          value={remarks}
                        />
                      </Grid>


                      <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Display</b>
                        </Typography>
                        <FormControl>

                          <RadioGroup
                            row
                            name="row-radio-buttons-group"
                            value={display}
                            onChange={handleDisplayChange}
                          >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} sm={8} md={12}>
                        <LoadingButton
                          loading={buttonLoading}
                          variant="contained"
                          sx={{ mt: 1 }}
                          onClick={handleSubmitBankClick}
                        >
                          Submit
                        </LoadingButton>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={4}
                      sm={8}
                      md={12}
                      sx={{
                        borderBottom: 1,
                        paddingBottom: "8px",
                        borderColor: "rgba(0,0,0,0.12)",
                      }}
                    >
                      <Typography variant="h6">Bank List</Typography>
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
                          {bankNamesList.length === 0 ? (
                            <NoData
                              Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />}
                              height="auto"
                              text="No data found"
                              secondaryText=""
                              isButton={false}
                            />
                          ) : (
                            <>
                              <Grid
                                item
                                xs={4}
                                sm={8}
                                md={12}
                                sx={{
                                  alignItems: "flex-end",
                                  justifyContent: "flex-end",
                                  mb: 1,
                                  display: "flex",
                                  mr: 1,
                                }}
                              >
                                <TextField
                                  placeholder="Search"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => {
                                    onChangeSearch((e.target as HTMLInputElement).value);
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
                                rows={bankNamesListTemp}
                                columns={userBankDetailsColumns}
                                pageSize={pageSize}
                                rowsPerPageOptions={[5, 10, 20]}
                                onPageSizeChange={(newPageSize) =>
                                  setPageSize(newPageSize)
                                }
                                disableSelectionOnClick
                                onCellClick={(
                                  param,
                                  e: React.MouseEvent<HTMLElement>
                                ) => {
                                  const arrActivity = [...bankNamesList];
                                  let a: UserBankListModel | undefined =
                                    arrActivity.find((el) => el.id === param.row.id);
                                  handelEditAndDelete((e.target as any).textContent, a);
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
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );


  // return (
  //   <Box sx={{ mt: 11 }}>
  //     <Header />
  //     <Container maxWidth="lg">
  //       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  //         <Grid item xs={2} sm={4}>
  //           <Typography variant="h4">Update Profile</Typography>
  //         </Grid>
  //       </Grid>
  //       <br></br>
  //       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
  //         <Grid item sm={4}>
  //           <label>Name / Company Name</label>
  //         </Grid>
  //         <Grid item sm={4}>
  //           <TextField
  //             variant="outlined"
  //             size="small"
  //             error={isCompanyError}
  //             helperText={companyError}
  //             value={companyName}
  //             onChange={(e) => {
  //               setCompanyName((e.target as HTMLInputElement).value);
  //               setIsCompanyError(false);
  //               setCompanyError("");
  //             }}
  //           ></TextField>
  //         </Grid>
  //       </Grid>
  //       <br></br>
  //       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
  //         <Grid item sm={4}>
  //           <label>
  //             <label style={{ color: "#ff0000" }}>*</label> Contact Person
  //           </label>
  //         </Grid>
  //         <Grid item sm={4}>
  //           <TextField
  //             variant="outlined"
  //             size="small"
  //             error={isContactPersonError}
  //             helperText={contactPersonError}
  //             value={contactPerson}
  //             onChange={(e) => {
  //               setContactPerson((e.target as HTMLInputElement).value);
  //               setIsContactPersonError(false);
  //               setContactPersonError("");
  //             }}
  //           ></TextField>
  //         </Grid>
  //       </Grid>
  //       <br></br>
  //       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
  //         <Grid item sm={4}>
  //           <label>
  //             <label style={{ color: "#ff0000" }}>*</label> Contact Mobile No
  //           </label>
  //         </Grid>
  //         <Grid item sm={4}>
  //           <TextField
  //             variant="outlined"
  //             size="small"
  //             error={isMobileError}
  //             helperText={mobileError}
  //             value={mobile}
  //             onChange={(e) => {
  //               setMobile((e.target as HTMLInputElement).value);
  //               setIsMobileError(false);
  //               setMobileError("");
  //             }}
  //           ></TextField>
  //         </Grid>
  //       </Grid>
  //       <br></br>
  //       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
  //         <Grid item sm={4}>
  //           <label>
  //             <label style={{ color: "#ff0000" }}>*</label> Address 1
  //           </label>
  //         </Grid>
  //         <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
  //           <TextField
  //             variant="outlined"
  //             size="small"
  //             error={isAddressError}
  //             helperText={addressError}
  //             value={profileAddress}
  //             onChange={(e) => {
  //               setProfileAddress((e.target as HTMLInputElement).value);
  //               setIsAddressError(false);
  //               setAddressError("");
  //             }}
  //           ></TextField>
  //         </Grid>
  //       </Grid>
  //       <br></br>
  //       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
  //         <Grid item sm={4}>
  //           <label>
  //             <label style={{ color: "#ff0000" }}>*</label> State
  //           </label>
  //         </Grid>
  //         <Grid item sm={3}>
  //           <FormControl fullWidth size="small" error={isStateError}>
  //             <Select value={state} onChange={handleSNChange}>
  //               <MenuItem disabled={true} value="--Select--">
  //                 --Select--
  //               </MenuItem>
  //               {stateNameList.map((item, index) => {
  //                 return (
  //                   <MenuItem key={index} value={item.stateName}>
  //                     {item.stateName}
  //                   </MenuItem>
  //                 );
  //               })}
  //             </Select>
  //             <FormHelperText>{stateError}</FormHelperText>
  //           </FormControl>
  //         </Grid>
  //       </Grid>
  //       <br></br>
  //       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
  //         <Grid item sm={4}>
  //           <label>
  //             <label style={{ color: "#ff0000" }}>*</label> City
  //           </label>
  //         </Grid>
  //         <Grid item sm={3}>
  //           <FormControl fullWidth size="small" error={isCityError}>
  //             <Select value={city} onChange={handleCNChange}>
  //               <MenuItem disabled={true} value="--Select--">
  //                 --Select--
  //               </MenuItem>
  //               {cityNameList.map((item, index) => {
  //                 return (
  //                   <MenuItem key={index} value={item.cityName}>
  //                     {item.cityName}
  //                   </MenuItem>
  //                 );
  //               })}
  //             </Select>
  //             <FormHelperText>{cityError}</FormHelperText>
  //           </FormControl>
  //         </Grid>
  //       </Grid>
  //       <br></br>
  //       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
  //         <Grid item sm={4}>
  //           <label>Pincode</label>
  //         </Grid>
  //         <Grid item sm={4}>
  //           <TextField
  //             variant="outlined"
  //             size="small"
  //             error={isPincodeError}
  //             helperText={pincodeError}
  //             value={pincode}
  //             onChange={(e) => {
  //               setPincode((e.target as HTMLInputElement).value);
  //               setIsPincodeError(false);
  //               setPincodeError("");
  //             }}
  //           ></TextField>
  //         </Grid>
  //       </Grid>
  //       <br></br>
  //       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
  //         <Grid item sm={4}>
  //           <label>GST No</label>
  //         </Grid>
  //         <Grid item sm={4}>
  //           <TextField
  //             variant="outlined"
  //             size="small"
  //             error={isGstError}
  //             helperText={gstError}
  //             value={gst}
  //             onChange={(e) => {
  //               setGst((e.target as HTMLInputElement).value);
  //               setIsGstError(false);
  //               setGstError("");
  //             }}
  //           ></TextField>
  //         </Grid>
  //       </Grid>
  //       <br></br>
  //       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
  //         <Grid item sm={4}>
  //           <label>PAN No</label>
  //         </Grid>
  //         <Grid item sm={4}>
  //           <TextField
  //             variant="outlined"
  //             size="small"
  //             error={isPanError}
  //             helperText={panError}
  //             value={pan}
  //             onChange={(e) => {
  //               setPan((e.target as HTMLInputElement).value);
  //               setIsPanError(false);
  //               setPanError("");
  //             }}
  //           ></TextField>
  //         </Grid>
  //       </Grid>
  //       <br></br>
  //       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
  //         <Grid>
  //           <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
  //             Update
  //           </LoadingButton>
  //         </Grid>
  //       </Grid>
  //     </Container>
  //     <Snackbar
  //       open={open}
  //       autoHideDuration={6000}
  //       onClose={handleSnackbarClose}
  //     >
  //       <Alert severity={snackbarType} sx={{ width: "100%" }}>
  //         {snackMsg}
  //       </Alert>
  //     </Snackbar>
  //   </Box>
  // );
};

export default Userbasic;

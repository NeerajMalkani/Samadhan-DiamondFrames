import {
    Alert, AlertColor, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, Icon,
    InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography, Autocomplete,
    FormHelperText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack
} from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../utils/communication";
import { clientListColumns, clientSearchResult } from "../../../utils/tablecolumns";
import { theme } from "../../../theme/AppTheme";
import { ClientModel, StateModel, CityModel, EmployeeModel } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { NullOrEmpty } from "../../../utils/CommonFunctions";

const ClientList = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
    const [CookieUserID, SetCookieUseID] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    }, []);

    //  #region variable
    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = React.useState("Yes");

    const [clientList, setClientList] = useState<Array<ClientModel>>([]);
    const [clientListTemp, setClientListTemp] = React.useState<Array<any>>([]);

    const [gridClientList, setGridClientList] = useState<Array<ClientModel>>([]);
    const [gridClientListTemp, setGridClientListTemp] = useState<Array<ClientModel>>([]);


    const [clientSearchList, setClientSearchList] = useState<Array<ClientModel>>([]);
    const [clientSearchListTemp, setClientSearchListTemp] = React.useState<Array<any>>([]);

    const [gridClientSearchList, setGridClientSearchList] = useState<Array<ClientModel>>([]);
    const [gridClientSearchListTemp, setGridClientSearchListTemp] = useState<Array<ClientModel>>([]);

    const [mobileNo, setMobileNo] = React.useState("");
    const [mobileErrorText, setMobileErrorText] = useState("");
    const [isMobileNoError, isSetMobileNoError] = useState(false);

    const [companyName, SetCompanyName] = React.useState("");
    const [companyNameErrorText, setCompanyNameErrorText] = useState("");
    const [isComapnyNameError, isSetComapnyNameError] = useState(false);

    const [addCompanyName, setAddCompanyName] = React.useState("");
    const [addComapnyNameErrorText, setAddCompanyNameErrorText] = useState("");
    const [isAddCompanyNameError, isSetAddCompanyNameError] = useState(false);

    const [contactPerson, setContactPerson] = useState("");
    const [contactPersonErroText, setContactPersonErrorText] = useState("");
    const [isContactPersonError, isSetContactPersonError] = useState(false);

    const [address, setAddress] = useState("");
    const [addressErrorText, setAddressErrorText] = useState("");
    const [isAddressError, isSetAddressError] = useState(false);

    const [contactMobileNo, setContactMobileNo] = React.useState("");
    const [contactMobileNoErrorText, setContactMobileNoErrorText] = useState("");
    const [isConatctMobileNoError, isSetContactMobileNoError] = useState(false);

    const [state , setState]=useState("");
    const [stateError, setStateError] = useState("");
    const [isStateError, setIsStateError] = useState(false);
    const [selectedStateName, setSelectedStateName] = useState("");
    const [selectedStateID, setSelectedStateID] = useState(0);
    const [statesFullData, setStatesFullData] = useState([]);

    const [city , setCity]=useState("");
    const [cityError, setCityError] = useState("");
    const [isCityError, setIsCityError] = useState(false);
    const [selectedCityName, setSelectedCityName] = useState("");
    const [selectedCityID, setSelectedCityID] = useState(0);
    const [cityFullData, setCityFullData] = useState([]);

    const [pincode, setPincode] = useState("");
    const [pincodeError, setPincodeError] = useState("");
    const [isPincodeError, setIsPincodeError] = useState(false);

    const [gst, setGst] = useState("");
    const [gstError, setGstError] = useState("");
    const [isGstError, setIsGstError] = useState(false);

    const [pan, setPan] = useState("");
    const [panError, setPanError] = useState("");
    const [isPanError, setIsPanError] = useState(false);

    const [serviceProvider, setServiceProvider] = useState("Yes");

    const [otp, setOtp] = React.useState<string>("");
    const [otpErrorText, setOtpErrorText] = useState("");
    const [isOtpError, isSetOtpError] = useState(false);

    const [clientID, setClientID] = React.useState<number>();

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
    const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
    //#endregion

    useEffect(() => {
        FetchData("");
    }, []);

    const ResetFields = () => {
        setSelectedID(0);
        setActionStatus("new");
        setDataGridOpacity(1);
        setDataGridPointer("auto");
        setButtonDisplay("none");
        setButtonLoading(false);
        setAddCompanyName("");
        setContactPerson("");
        setContactMobileNo("");
        setAddress("");
        setState("");
        setCity("");
        setPincode("");
        setGst("");
        setPan("");
        setDisplay("");
        setServiceProvider("");

        setOpen(false);
    };

    const FetchData = (type: string) => {
        let params = {
            AddedByUserID: cookies.dfc.UserID,
        };
        ResetFields();
        Provider.getAll(`contractorquotationestimation/getclients?${new URLSearchParams(GetStringifyJson(params))}`)

            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        const arrList = [...response.data.data];
                        arrList.map(function (a: any, index: number) {
                            a.profileStatus = a.profileStatus ? "complete" : "Incomplete";
                            a.loginStatus = a.loginStatus ? "Yes" : "No";
                            let sr = { srno: index + 1 };
                            a = Object.assign(a, sr);
                        });
                        setClientList(arrList);
                        setClientListTemp(arrList);
                        // if (type !== "") {
                        //   setSnackMsg("Activity role " + type);
                        //   setOpen(true);
                        //   setSnackbarType("success");
                        // }
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

    const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplay((event.target as HTMLInputElement).value);
    };

    const handleServiceProviderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServiceProvider((event.target as HTMLInputElement).value);
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
                    }
                }
            })
            .catch((e) => { });
    };

    const FetchSearchData = () => {
        debugger;
        let params = {
            AddedByUserID: cookies.dfc.UserID,
            CompanyName:companyName,
            MobileNo: mobileNo
        };
        ResetFields();
        Provider.getAll(`contractorquotationestimation/getotherclients?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                debugger;
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        const arrList = [...response.data.data];
                        arrList.map(function (a: any, index: number) {
                            let sr = { srno: index + 1 };
                            a = Object.assign(a, sr);
                        });
                        debugger;
                        setGridClientSearchList(arrList);
                        debugger;
                        setGridClientSearchListTemp(arrList);
                    }
                } else {
                    setSnackbarType("info");
                    setSnackMsg(communication.NoData);
                    setOpen(true);
                }
                debugger;
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
                setSnackbarType("error");
                debugger
                setSnackMsg(communication.NetworkError);
                setOpen(true);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const handleSearchClick = () => {
        debugger;
        let isValid: boolean = true;

        if (companyName.trim () === "" &&  mobileNo.trim() === "") {
            isValid = false;
            isSetMobileNoError(true);
            setMobileErrorText("Please Enter Mobile No");
            setActive("none");

            isSetComapnyNameError(true);
            setCompanyNameErrorText("Please Enter Company Name");
            setActive("none");
        }

        if (isValid) {
            FetchSearchData();
            setSearchActive("inline");
        }

    };


    const handleSubmitClick = () => {
        debugger;
        let isValid: boolean = true;

        if (addCompanyName.trim() === "" && contactPerson.trim() === "" && contactMobileNo.trim() === ""
         && address.trim() === "" && state.trim() === "" && city.trim() === "" && pincode.trim() === "" 
         && gst.trim() === "" && pan.trim() === "") {
            isValid = false;
            isSetAddCompanyNameError(true);
            setAddCompanyNameErrorText("Please Enter Company Name");

            isValid = false;
            isSetContactPersonError(true);
            setContactPersonErrorText("Please Enter Conatct Person Name");

            isValid = false;
            isSetContactMobileNoError(true);
            setContactMobileNoErrorText("please Enter Mobile No");

            isValid = false;
            isSetAddressError(true);
            setAddressErrorText("please Enter Address ");

            isValid = false;
            setIsStateError(true);
            setStateError("please Enter State");

            isValid = false;
            setIsCityError(true);
            setCityError("please Enter City");

            isValid = false;
            setIsPincodeError(true);
            setPincodeError("please Enter Pincode");

            isValid = false;
            setIsGstError(true);
            setGstError("please Enter Gst No");

            isValid = false;
            setIsPanError(true);
            setPanError("please Enter Pan No");

        }
        if (isValid) {
            InsertUpdateData();
        }
    };


    const InsertUpdateData = () => {
        if (actionStatus === "new") {
          Provider.create("contractorquotationestimation/insertotherclient", {
            AddedByUserID: cookies.dfc.UserID,
            CompanyName: addCompanyName,
            ContactPerson:contactPerson,
            ContactMobileNumber:contactMobileNo,
            Address1:address,
            StateID:state,
            CityID:city,
            Pincode:pincode,
            GSTNumber:gst,
            PAN:pan,
            ServiceType:serviceProvider,
            Display:display,
    
          })
            .then((response) => {
              debugger;
              if (response.data && response.data.code === 200) {
                FetchData("added");
              }else if (response.data.code === 304) {
                setSnackMsg(response.data.message);
                setSnackbarType("error");
                ResetFields();
              } else {
                ResetFields();
                setSnackMsg(communication.Error);
                setSnackbarType("error");
              }
            })
            .catch((e) => {
              ResetFields();
              setSnackMsg(communication.NetworkError);
              setSnackbarType("error");
            });
          }
      };

    // const SubmitVerify = () => {
    //     if (actionStatus === "new") {
    //         Provider.create("master/updateemployeeverification", {
    //             ClientID:clientID,
    //             OTP: otp,
    //         })
    //             .then((response) => {
    //                 debugger;
    //                 if (response.data && response.data.code === 200) {
    //                     FetchData("updated");
    //                 } else if (response.data.code === 304) {
    //                     setSnackMsg(response.data.message);
    //                     setSnackbarType("error");
    //                     ResetFields();
    //                 } else {
    //                     ResetFields();
    //                     setSnackMsg(communication.Error);
    //                     setSnackbarType("error");
    //                 }
    //             })
    //             .catch((e) => {
    //                 ResetFields();
    //                 setSnackMsg(communication.NetworkError);
    //                 setSnackbarType("error");
    //             });
    //     }
    // };

    // const handleSubmitVerify = () => {
    //     debugger;
    //     SubmitVerify();
    // };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const onChangeSearch = (query: string) => {
        // setSearchQuery(query);
        // if (query === "") {
        //   setActivityNamesListTemp(activityNamesList);
        // } else {
        //   setActivityNamesListTemp(
        //     activityNamesList.filter((el: ActivityRoleNameModel) => {
        //       return el.activityRoleName.toString().toLowerCase().includes(query.toLowerCase());
        //     })
        //   );
        // }
    };



    const setOTPDialog = () => {
        setOpen(true);
    };

    /*coding creat button toggle */
    const [active, setActive] = useState("none");
    const toggle = () => {
        if (active === "none") {
            setActive("inline")
        }
        else {
            setActive("none")
        }
    }
    /*end create button toggle*/
    /*start search toggle coding*/
    const [searchActive, setSearchActive] = useState("none");
    // const searchToggle = () =>{
    //     if(searchActive === "none")
    //     {
    //       setSearchActive("inline")
    //     }
    //     else{
    //       setSearchActive("none")
    //     }
    //   }
    /*end search toggle coding*/

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h4">CLIENT</Typography>
                    </Grid>

                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">CLIENT SEARCH</Typography>
                    </Grid>

                </Grid>
                <br></br>
                <br></br>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={4}>
                            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                <Grid item sm={6}>

                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        <b style={{ float: 'right', }}>Name /Company Name</b>
                                    </Typography>

                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        inputProps={{
                                            maxLength: 11,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        onChange={(e) => {
                                            SetCompanyName((e.target as HTMLInputElement).value);
                                            isSetComapnyNameError(false);
                                            setCompanyNameErrorText("");
                                        }}
                                        error={isComapnyNameError}
                                        helperText={companyNameErrorText}
                                        value={companyName}


                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} direction="row" justifyContent="center" alignItems="center">
                                <Grid item sm={4}>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        <b style={{ float: 'right', }}><label style={{ color: "#ff0000" }}>*</label>Mobile No</b>
                                    </Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        inputProps={{
                                            maxLength: 10,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        onChange={(e) => {
                                            setMobileNo((e.target as HTMLInputElement).value);
                                            isSetMobileNoError(false);
                                            setMobileErrorText("");
                                        }}
                                        error={isMobileNoError}
                                        helperText={mobileErrorText}
                                        value={mobileNo}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4} direction="row" justifyContent="center" alignItems="center" >
                            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                <Grid item sm={5}>
                                    <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} onClick={() => { handleSearchClick() }}>
                                        Search
                                    </Button>
                                </Grid>
                                <Grid item sm={2}>
                                    <Typography variant="h6">[OR]</Typography>
                                </Grid>
                                <Grid item sm={5}>
                                    <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} onClick={toggle}>
                                        Create New
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
                <br></br>
                <br></br>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >

                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)", display: `${searchActive}` }} >
                        <Typography variant="h6">CLIENT SEARCH  RESULT</Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} >
                        {loading ? (
                            <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <div style={{ height: "auto", width: "100%", marginBottom: "20px" }}>
                                {gridClientSearchList.length === 0 ? (
                                    // <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                                    <div></div>
                                ) : (
                                    <>
                                        {/* <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                        
                      </Grid> */}
                                        <DataGrid
                                            style={{
                                                opacity: dataGridOpacity,
                                                pointerEvents: dataGridPointer,
                                            }}
                                            autoHeight={true}
                                            rows={gridClientSearchListTemp}
                                            columns={clientSearchResult}
                                            pageSize={pageSize}
                                            rowsPerPageOptions={[5, 10, 20]}
                                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                            disableSelectionOnClick
                                            onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                                                debugger;
                                                const arrActivity = [...gridClientSearchList];
                                                let a: ClientModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                                                //handelEditAndDelete((e.target as any).textContent, a);

                                                //InsertUpdateData();

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
                </Grid>
                <br></br>


                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)", display: `${active}` }} >
                    <Typography variant="h6"> CLIENT(ADD NEW / EDIT)</Typography>
                </Grid>
                <br></br>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{display:`${active}`}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={6}>
                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b style={{ float: "right" }}>Name /Company Name</b>
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setAddCompanyName((e.target as HTMLInputElement).value);
                                        isSetAddCompanyNameError(false);
                                        setAddCompanyNameErrorText("");
                                    }}
                                    error={isAddCompanyNameError}
                                    helperText={addComapnyNameErrorText}
                                    value={addCompanyName}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b style={{ float: "right" }}>Contact Mobile No</b>
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setContactMobileNo((e.target as HTMLInputElement).value);
                                        isSetContactMobileNoError(false);
                                        setContactMobileNoErrorText("");
                                    }}
                                    error={isConatctMobileNoError}
                                    helperText={contactMobileNoErrorText}
                                    value={contactMobileNo}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                            <Grid item sm={6}>
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
                            <Grid item sm={6}>
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
                        <br></br>
                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b style={{ float: "right" }}>PAN No</b>
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setPan((e.target as HTMLInputElement).value);
                                        setIsPanError(false);
                                        setPanError("");
                                    }}
                                    error={isPanError}
                                    helperText={panError}
                                    value={pan}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b style={{ float: "right" }}>Dispaly</b>
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <FormControl>
                                    <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                            <Grid item sm={5}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b style={{ float: "right" }}>Contact Person</b>
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setContactPerson((e.target as HTMLInputElement).value);
                                        isSetContactPersonError(false);
                                        setContactPersonErrorText("");
                                    }}
                                    error={isContactPersonError}
                                    // helperText={setContactPersonErrorText}
                                    value={contactPerson}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                            <Grid item sm={5}>
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
                                        isSetAddressError(false);
                                        setAddressErrorText("");
                                    }}
                                    error={isAddressError}
                                    helperText={addressErrorText}
                                    value={address}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                            <Grid item sm={5}>
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
                            <Grid item sm={5}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b style={{ float: "right" }}>GST No</b>
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setGst((e.target as HTMLInputElement).value);
                                        setIsGstError(false);
                                        setGstError("");
                                    }}
                                    error={isGstError}
                                    helperText={gstError}
                                    value={gst}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                            <Grid item sm={5}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b style={{ float: "right" }}>Service Provider</b>
                                </Typography>
                            </Grid>
                            <Grid item sm={7}>
                                <FormControl>
                                    <RadioGroup row name="row-radio-buttons-group" value={serviceProvider} onChange={handleServiceProviderChange}>
                                        <FormControlLabel value="vendor" control={<Radio />} label="Vendor" />
                                        <FormControlLabel value="supplier" control={<Radio />} label="Supplier" />
                                        <FormControlLabel value="client" control={<Radio />} label="Client" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={4} sm={8} md={12}>
                        <Grid item xs={4} sm={8} md={12}>
                            <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick} >
                                Submit
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>









                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                    <Typography variant="h6">
                        MY CLIENT LIST
                    </Typography>
                </Grid>
                <br></br>
                <Grid item xs={4} sm={8} md={12}>
                    {loading ? (
                        <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                            {clientList.length === 0 ? (
                                // <Grid>
                                //   <Icon fontSize="inherit"><ListIcon/></Icon>
                                //   <Typography>No records found.</Typography>
                                // </Grid>
                                <></>
                            ) : (
                                <>
                                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
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
                                        rows={clientListTemp}
                                        columns={clientListColumns}
                                        pageSize={pageSize}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        disableSelectionOnClick
                                        onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {


                                            if (param.field === 'action') {
                                                const arrActivity = [...clientList];
                                                let a: ClientModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                                                // handelEditAndDelete((e.target as any).textContent, a);
                                            }
                                            else if (param.field === 'verifyStatus') {

                                                const arrActivity = [...clientList];
                                                let a: ClientModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                                                // setOtp(NullOrEmpty(a.otp) ? "" : a.otp.toString());
                                                setClientID(a.id);
                                                setOTPDialog();
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

            </Container>
            <div>
                {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>EMPLOYEE OTP NO VERIFICATION & LOGIN ACTIVATION
                    </DialogTitle>
                    <DialogContent>
                                    <DialogContentText>Confirm to Decline?</DialogContentText>

                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                            <Grid item sm={5}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b style={{ float: "right" }}><label style={{ color: "#ff0000" }}>*</label>Enter OTP No</b>
                                </Typography>
                            </Grid>
                            <Grid item sm={5}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setOtp((e.target as HTMLInputElement).value);
                                        isSetOtpError(false);
                                        setOtpErrorText("");
                                    }}
                                    error={isOtpError}
                                    helperText={otpErrorText}
                                    value={otp}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

                            <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} onClick={handleSubmitVerify}>
                                Submit & Verify
                            </Button>

                        </Grid>


                    </DialogContent>

                </Dialog> */}
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert severity={snackbarType} sx={{ width: "100%" }}>
                    {snackMsg}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ClientList;

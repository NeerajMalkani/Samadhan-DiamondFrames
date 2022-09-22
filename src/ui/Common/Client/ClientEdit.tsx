import { Box, TextField, Button, Container, FormControl, FormControlLabel, Typography,Radio, 
    RadioGroup,Select,Autocomplete, Grid, Menu, Snackbar, MenuItem, AlertColor,CircularProgress , InputAdornment,
    FormHelperText } from "@mui/material";
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
import { CityModel, CompanyModel, StateModel, UserModel, UserProfile,ClientModel } from "../../../models/Model";
import Provider from "../../../api/Provider";
import { SelectChangeEvent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { clientListColumns, clientSearchResult } from "../../../utils/tablecolumns";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

let st_ID = 0, ct_ID = 0;


const ClientEdit = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
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

    const [clientList, setClientList] = useState<Array<ClientModel>>([]);
    const [clientListTemp, setClientListTemp] = React.useState<Array<any>>([]);

    const [gridClientList, setGridClientList] = useState<Array<ClientModel>>([]);
    const [gridClientListTemp, setGridClientListTemp] = useState<Array<ClientModel>>([]);

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

    const [state, setState] = useState("");
    const [stateError, setStateError] = useState("");
    const [isStateError, setIsStateError] = useState(false);
    const [selectedStateName, setSelectedStateName] = useState("");
    const [selectedStateID, setSelectedStateID] = useState(0);
    const [statesFullData, setStatesFullData] = useState([]);

    const [city, setCity] = useState("");
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

    const [pageSize, setPageSize] = React.useState<number>(5);
    const [actionStatus, setActionStatus] = React.useState<string>("new");
    const [selectedID, setSelectedID] = React.useState<number>(0);
    const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [display, setDisplay] = React.useState("Yes");
    const [searchQuery, setSearchQuery] = useState("");
    //#endregion

    useEffect(() => {
        // FetchUserData("");
        // FetchStates();
        //FetchCity();
    }, []);

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

    // const FetchUserData = (type: string) => {
    //     debugger;
    //     let params = {
    //         UserID: cookies.dfc.UserID,
    //     };
    //     Provider.getAll(`master/getusergeneralprofile?${new URLSearchParams(GetStringifyJson(params))}`)
    //         .then((response: any) => {
    //             debugger;
    //             if (response.data && response.data.code === 200) {
    //                 if (response.data.data) {
    //                     if (response.data.data[0] != null) {
    //                         debugger;
    //                         const arrList = [...response.data.data];
    //                         debugger;
    //                         setUserID(arrList[0].userID);
    //                         setCompanyName(!NullOrEmpty(arrList[0].companyName) ? arrList[0].CompanyName : "");
    //                         setContactPerson(!NullOrEmpty(arrList[0].contactPersonName) ? arrList[0].contactPersonName : "");
    //                         setMobile(!NullOrEmpty(arrList[0].contactPersonNumber) ? arrList[0].Mobile : "");
    //                         setProfileAddress(!NullOrEmpty(arrList[0].addressLine) ? arrList[0].addressLine : "");
    //                         // setState(arrList[0].stateName);

    //                         if (!NullOrEmpty(arrList[0].stateID)) {
    //                             setStateID(arrList[0].stateID);
    //                             st_ID = arrList[0].stateID;
    //                         }

    //                         if (!NullOrEmpty(arrList[0].cityID)) {
    //                             setStateID(arrList[0].cityID);
    //                             ct_ID = arrList[0].cityID;
    //                         }

    //                         setCityID(arrList[0].cityID);

    //                         // if (arrList[0].stateID > 0) {
    //                         //   debugger;
    //                         //   FetchCity(arrList[0].stateID);
    //                         //   setCity(arrList[0].cityName);
    //                         //   setCityID(arrList[0].cityID);
    //                         // }

    //                         setPincode(!NullOrEmpty(arrList[0].pincode) ? arrList[0].pincode : "");
    //                         setGst(!NullOrEmpty(arrList[0].gstNumber) ? arrList[0].gstNumber : "");
    //                         setPan(!NullOrEmpty(arrList[0].pan) ? arrList[0].pan : "");

    //                         if (type !== "") {
    //                             setSnackMsg("User " + type);
    //                             setOpen(true);
    //                             setSnackbarType("success");
    //                         }
    //                     }
    //                 }
    //             } else {
    //                 setSnackMsg(communication.NoData);
    //                 setOpen(true);
    //                 setSnackbarType("info");
    //             }

    //             FetchStates();
    //             setLoading(false);
    //         })
    //         .catch((e) => {
    //             setLoading(false);
    //             setSnackMsg(communication.NetworkError);
    //             setSnackbarType("error");
    //             setOpen(true);
    //         });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // };

    // const handleSNChange = (event: SelectChangeEvent) => {
    //     debugger;
    //     let stateName: string = event.target.value;
    //     let ac = stateNameList.find((el) => el.stateName === stateName);
    //     if (ac !== undefined) {
    //         setState(stateName);
    //         setStateID(ac?.id);
    //         setIsStateError(false);
    //         setStateError("");
    //         FetchCity(ac.id);
    //     }
    // };

    // const handleCNChange = (event: SelectChangeEvent) => {
    //     debugger;
    //     let cityName: string = event.target.value;
    //     let ac = cityNameList.find((el) => el.cityName === cityName);
    //     if (ac !== undefined) {
    //         setCity(cityName);
    //         setCityID(ac?.id);
    //         setIsCityError(false);
    //         setCityError("");
    //     }
    // };

    // const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setDisplay((event.target as HTMLInputElement).value);
    // };

    // const handleSubmitClick = () => {
    //     debugger;
    //     let isValid: Boolean = true;

    //     if (companyName.trim() === "") {
    //         isValid = false;
    //         setIsCompanyError(true);
    //         setCompanyError(communication.BlankCompanyName);
    //     }

    //     if (contactPerson.trim() === "") {
    //         isValid = false;
    //         setIsContactPersonError(true);
    //         setContactPersonError(communication.BlankContactPerson);
    //     }

    //     if (mobile.trim() === "") {
    //         isValid = false;
    //         setIsMobileError(true);
    //         setMobileError(communication.BlankMobile);
    //     }

    //     if (profileAddress.trim() === "") {
    //         isValid = false;
    //         isSetAddressError(true);
    //         setAddressError(communication.BlankAddress);
    //     }

    //     if (state.trim() === "--Select--") {
    //         isValid = false;
    //         setIsStateError(true);
    //         setStateError(communication.BlankState);
    //     }

    //     if (city.trim() === "--Select--") {
    //         isValid = false;
    //         setIsCityError(true);
    //         setCityError(communication.BlankCity);
    //     }

    //     if (pincode.toString().trim() === "") {
    //         isValid = false;
    //         setIsPincodeError(true);
    //         setPincodeError(communication.BlankBrandPrefix);
    //     }

    //     if (gst.trim() === "") {
    //         isValid = false;
    //         setIsGstError(true);
    //         setGstError(communication.BlankGst);
    //     }

    //     if (pan.trim() === "") {
    //         isValid = false;
    //         setIsPanError(true);
    //         setPanError(communication.BlankPan);
    //     }
    //     debugger;
    //     if (isValid) {
    //         InsertUpdateData();
    //     }
    // };

    // const InsertUpdateData = () => {
    //     debugger;
    //     if (actionStatus === "new") {
    //         Provider.create("master/updategeneraluserprofile", {
    //             UserID: CookieUserID,
    //            
    //         })
    //             .then((response) => {
    //                 debugger;
    //                 if (response.data && response.data.code === 200) {
    //                     FetchUserData("added");
    //                 } else {
    //                     setSnackMsg(communication.Error);
    //                     setSnackbarType("error");
    //                     setOpen(true);
    //                 }
    //             })
    //             .catch((e) => {
    //                 debugger;

    //                 setSnackMsg(communication.NetworkError);
    //                 setSnackbarType("error");
    //                 setOpen(true);
    //             });
    //     }
    // };

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={4}>
                        <Typography variant="h4"> CLIENT</Typography>
                    </Grid>
                </Grid>
                <br></br>
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)"}} >
                    <Typography variant="h6"> CLIENT(ADD NEW / EDIT)</Typography>
                </Grid>
                <br></br>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >
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
                                        <RadioGroup row name="row-radio-buttons-group" value={display} >
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
                                        <RadioGroup row name="row-radio-buttons-group" value={serviceProvider} >
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
                                <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }}  >
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
                                                // onChangeSearch((e.target as HTMLInputElement).value);
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
                                                // setClientID(a.id);
                                                // setOTPDialog();
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
        </Box>
    );
};

export default ClientEdit;

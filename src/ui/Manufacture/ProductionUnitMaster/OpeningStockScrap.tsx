import { Box, TextField, Button, Container, FormControl, InputAdornment, CircularProgress, FormControlLabel, Typography, Select, Grid, Menu, Snackbar, MenuItem, AlertColor, FormHelperText } from "@mui/material";
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
import { OpeningStockScrapModel } from "../../../models/Model";
import Provider from "../../../api/Provider";
import { SelectChangeEvent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ListIcon from '@mui/icons-material/List';
import NoData from '../../../components/NoData';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { openingStockScrapColumns } from '../../../utils/tablecolumns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';



let st_ID = 0, ct_ID = 0;


const OpeningStockScrap = () => {
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


    const [snackMsg, setSnackMsg] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = React.useState<number>(5);

    const [userID, setUserID] = useState(0);

    const [date, setDate] = useState<Date | null>(new Date());

    const [totalOpeningStock, setTotalOpeningStock] = useState("");
    const [totalOpeningStockError, setTotalOpeningStockError] = useState("");
    const [isTotalOpeningStockError, setIsTotalOpeningStockError] = useState(false);

    const [actionStatus, setActionStatus] = React.useState<string>("new");
    const [selectedID, setSelectedID] = React.useState<number>(0);
    const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [display, setDisplay] = React.useState("Yes");

    const [openingStockList, setOpeningStockList] = useState<Array<OpeningStockScrapModel>>([]);
    const [openingStockListTemp, setOpeningStockListTemp] = React.useState<Array<any>>([]);
    //#endregion


    //#region Functions
    useEffect(() => {
        // FetchUserData("");

    }, []);



    //   const FetchUserData = (type: string) => {
    //     debugger;
    //     let params = {
    //       UserID: cookies.dfc.UserID,
    //     };
    //     Provider.getAll(`master/getusergeneralprofile?${new URLSearchParams(GetStringifyJson(params))}`)
    //       .then((response: any) => {
    //         debugger;
    //         if (response.data && response.data.code === 200) {
    //           if (response.data.data) {
    //             const arrList = [...response.data.data];
    //             debugger;
    //             setUserID(arrList[0].userID);
    //             setCompanyName(arrList[0].companyName);
    //             setContactPerson(arrList[0].contactPersonName);
    //             setMobile(arrList[0].contactPersonNumber);
    //             setProfileAddress(arrList[0].addressLine);
    //             // setState(arrList[0].stateName);

    //             if (!NullOrEmpty(arrList[0].stateID)) {
    //               setStateID(arrList[0].stateID);
    //               st_ID = arrList[0].stateID;
    //             }

    //             if (!NullOrEmpty(arrList[0].cityID)) {
    //               setStateID(arrList[0].cityID);
    //               ct_ID = arrList[0].cityID;
    //             }

    //             setCityID(arrList[0].cityID);

    //             // if (arrList[0].stateID > 0) {
    //             //   debugger;
    //             //   FetchCity(arrList[0].stateID);
    //             //   setCity(arrList[0].cityName);
    //             //   setCityID(arrList[0].cityID);
    //             // }

    //             setPincode(arrList[0].pincode);
    //             setGst(arrList[0].gstNumber);
    //             setPan(arrList[0].pan);

    //             if (type !== "") {
    //               setSnackMsg("User " + type);
    //               setOpen(true);
    //               setSnackbarType("success");
    //             }
    //           }
    //         } else {
    //           setSnackMsg(communication.NoData);
    //           setOpen(true);
    //           setSnackbarType("info");
    //         }

    //         FetchStates();
    //         setLoading(false);
    //       })
    //       .catch((e) => {
    //         setLoading(false);
    //         setSnackMsg(communication.NetworkError);
    //         setSnackbarType("error");
    //         setOpen(true);
    //       });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   };

    const handleDateChange = (newValueDate: Date | null) => {
        debugger;
        setDate(newValueDate);
    };

    const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplay((event.target as HTMLInputElement).value);
    };

    //   const handleSubmitClick = () => {
    //     debugger;
    //     let isValid: Boolean = true;

    //     if (companyName.trim() === "") {
    //       isValid = false;
    //       setIsCompanyError(true);
    //       setCompanyError(communication.BlankCompanyName);
    //     }

    //     if (contactPerson.trim() === "") {
    //       isValid = false;
    //       setIsContactPersonError(true);
    //       setContactPersonError(communication.BlankContactPerson);
    //     }

    //     if (mobile.trim() === "") {
    //       isValid = false;
    //       setIsMobileError(true);
    //       setMobileError(communication.BlankMobile);
    //     }

    //     if (profileAddress.trim() === "") {
    //       isValid = false;
    //       setIsAddressError(true);
    //       setAddressError(communication.BlankAddress);
    //     }

    //     if (state.trim() === "--Select--") {
    //       isValid = false;
    //       setIsStateError(true);
    //       setStateError(communication.BlankState);
    //     }

    //     if (city.trim() === "--Select--") {
    //       isValid = false;
    //       setIsCityError(true);
    //       setCityError(communication.BlankCity);
    //     }

    //     if (pincode.toString().trim() === "") {
    //       isValid = false;
    //       setIsPincodeError(true);
    //       setPincodeError(communication.BlankBrandPrefix);
    //     }

    //     if (gst.trim() === "") {
    //       isValid = false;
    //       setIsGstError(true);
    //       setGstError(communication.BlankGst);
    //     }

    //     if (pan.trim() === "") {
    //       isValid = false;
    //       setIsPanError(true);
    //       setPanError(communication.BlankPan);
    //     }
    //     debugger;
    //     if (isValid) {
    //       InsertUpdateData();
    //     }
    //   };

    //   const InsertUpdateData = () => {
    //     debugger;
    //     if (actionStatus === "new") {
    //       Provider.create("master/updategeneraluserprofile", {
    //         UserID: userID,
    //         CompanyName: companyName,
    //         ContactPersonName: contactPerson,
    //         ContactPersonNumber: mobile,
    //         AddressLine: profileAddress,
    //         StateID: stateID,
    //         CityID: cityID,
    //         Pincode: pincode,
    //         GSTNumber: gst,
    //         PAN: pan,
    //       })
    //         .then((response) => {
    //           debugger;
    //           if (response.data && response.data.code === 200) {
    //             //FetchData("added");
    //           } else {
    //             setSnackMsg(communication.Error);
    //             setSnackbarType("error");
    //             setOpen(true);
    //           }
    //         })
    //         .catch((e) => {
    //           debugger;

    //           setSnackMsg(communication.NetworkError);
    //           setSnackbarType("error");
    //           setOpen(true);
    //         });
    //     }
    //   };

    //   const onChangeSearch = (query: string) => {
    //     setSearchQuery(query);
    //     if (query === '') {
    //       setBrandConversionValueListTemp(brandConversionValueList);
    //     } else {
    //       setBrandConversionValueListTemp(
    //           brandConversionValueList.filter((el: BrandConversionValueModel) => {
    //           return el.serviceName
    //             .toString()
    //             .toLowerCase()
    //             .includes(query.toLowerCase());
    //         })
    //       );
    //     }
    //   };

    //   const handelEditAndDelete = (
    //     type: string | null,
    //     a: BrandConversionValueModel | undefined
    //   ) => {
    //     if (type?.toLowerCase() === 'edit' && a !== undefined) {
    //       setDataGridOpacity(0.3);
    //       setDataGridPointer('none');
    //       // setDisplay(a.view_status);
    //       // setActivityName(a?.group_name);
    //       setSelectedID(a.id);
    //       setactivitynameError('');
    //       setIsActivitynameError(false);
    //       setButtonDisplay('unset');
    //       setActionStatus('edit');
    //     }
    //     // else if (type?.toLowerCase() === "delete" && a !== undefined) {
    //     //   setSelectedID(a.id);
    //     //   Provider.deleteAllParams("master/deleteactivityroles", { ID: a.id })
    //     //     .then((response) => {
    //     //       if (response.data && response.data.code === 200) {
    //     //         FetchData();
    //     //       } else {
    //     //         setSnackMsg("your request cannot be processed");
    //     //         setOpen(true);
    //     //       }
    //     //     })
    //     //     .catch((e) => {
    //     //       console.log(e);
    //     //       setSnackMsg("your request cannot be processed");
    //     //       setOpen(true);
    //     //     });
    //     // }
    //   };
    //#endregion 

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant='h4'>Opening Stock Scrap</Typography>
                    </Grid>
                    <Grid item xs={2} sm={8} sx={{
                        borderBottom: 1,
                        paddingBottom: '8px',
                        borderColor: 'rgba(0,0,0,0.12)',
                    }}>
                        <Typography variant="h4">Opening Stock  Scrap (Add/Edit)</Typography>
                    </Grid>
                </Grid>
                <br></br>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                    <Grid item sm={4}>
                        <label><label style={{ color: "#ff0000" }}>*</label>Date</label>
                    </Grid>
                    <Grid item sm={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                inputFormat="MM/dd/yyyy"
                                clearable
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField size="small" {...params} />}></DesktopDatePicker>
                        </LocalizationProvider>

                    </Grid>
                </Grid>
                <br></br>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                    <Grid item sm={4}>
                        <label>
                            <label style={{ color: "#ff0000" }}>*</label> Toatal Opening Stock Scrap (Kg)
                        </label>
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            variant="outlined"
                            size="small"
                            error={isTotalOpeningStockError}
                            helperText={totalOpeningStockError}
                            value={totalOpeningStock}
                            onChange={(e) => {
                                setTotalOpeningStock((e.target as HTMLInputElement).value);
                                setIsTotalOpeningStockError(false);
                                setTotalOpeningStockError("");
                            }}
                        ></TextField>
                    </Grid>
                </Grid>
                <br></br>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Grid>
                        <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} >
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
                        paddingBottom: '8px',
                        borderColor: 'rgba(0,0,0,0.12)',
                    }}
                >
                    <Typography variant='h6'>Opening Stock Scrap List</Typography>
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                    {loading ? (
                        <Box
                            height='300px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            sx={{ m: 2 }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <div style={{ height: 500, width: '100%', marginBottom: '20px' }}>
                            {openingStockList.length === 0 ? (
                                <NoData
                                    Icon={<ListIcon sx={{ fontSize: 72, color: 'red' }} />}
                                    height='auto'
                                    text='No data found'
                                    secondaryText=''
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
                                            alignItems: 'flex-end',
                                            justifyContent: 'flex-end',
                                            mb: 1,
                                            display: 'flex',
                                            mr: 1,
                                        }}
                                    >
                                        <TextField
                                            placeholder='Search'
                                            variant='outlined'
                                            size='small'
                                            onChange={(e) => {
                                                // onChangeSearch((e.target as HTMLInputElement).value);
                                            }}
                                            value={searchQuery}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
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
                                        rows={openingStockListTemp}
                                        columns={openingStockScrapColumns}
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
                                            const arrActivity = [...openingStockList];
                                            let a: OpeningStockScrapModel | undefined =
                                                arrActivity.find((el) => el.id === param.row.id);
                                            // handelEditAndDelete((e.target as any).textContent, a);
                                        }}
                                        sx={{
                                            '& .MuiDataGrid-columnHeaders': {
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

export default OpeningStockScrap;

import {
    Box,
    TextField,
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
    InputAdornment,
} from "@mui/material";
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
import { GetStringifyJson, NullOrEmpty } from "../../../utils/CommonFunctions";
import { AWSImagePath } from "../../../utils/paths";
import { communication } from "../../../utils/communication";
import { UploadImageToS3WithNativeSdk } from "../../../utils/AWSFileUpload";
import uuid from "react-uuid";
import { InboxSttelementModel, InboxLendingModel, InboxCompanyModel } from "../../../models/Model";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from '@mui/icons-material/List';
import NoData from "../../../components/NoData";
import { DataGrid } from "@mui/x-data-grid";
import { InboxSettlementListColumns, InboxLendingListColumns, InboxComapnyListColumns } from "../../../utils/tablecolumns";

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
const Inbox = () => {
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
        }
    }, []);

    //#region Variables

    const [inboxSettlementList, setInboxSettlementList] = useState<Array<InboxSttelementModel>>([]);
    const [inboxSettlementListTemp, setInboxSettlemetListTemp] = React.useState<Array<any>>([]);

    const [lendingtList, setLendingList] = useState<Array<InboxLendingModel>>([]);
    const [lendingListTemp, setLendingListTemp] = React.useState<Array<any>>([]);

    const [pageSize, setPageSize] = React.useState<number>(5);
    const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
    const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");

    const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    //#endregion 

    //#region Functions

    useEffect(() => {
        // FetchBasicDetails();
        setLoading(false);
    }, []);

    // const FetchBasicDetails = () => {
    //     let params = {
    //         UserID: cookies.dfc.UserID,
    //     };
    //     Provider.getAll(`master/getuserprofile?${new URLSearchParams(GetStringifyJson(params))}`)
    //         .then((response: any) => {
    //             if (response.data && response.data.code === 200) {
    //                 if (response.data.data) {

    //                     if (response.data.data[0] != null) {

    //                         setCompanyName(!NullOrEmpty(response.data.data[0].companyName) ? response.data.data[0].companyName : "");
    //                         setContact(!NullOrEmpty(response.data.data[0].contactPersonName) ? response.data.data[0].contactPersonName : "");
    //                         setContactNo(!NullOrEmpty(response.data.data[0].contactPersonNumber) ? response.data.data[0].contactPersonNumber : "");
    //                         setGSTNo(!NullOrEmpty(response.data.data[0].gstNumber) ? response.data.data[0].gstNumber : "");
    //                         setPanNo(!NullOrEmpty(response.data.data[0].pan) ? response.data.data[0].pan : "");
    //                         setLocationName(!NullOrEmpty(response.data.data[0].locationName) ? response.data.data[0].locationName : "");
    //                         setAddress(!NullOrEmpty(response.data.data[0].addressLine) ? response.data.data[0].addressLine : "");
    //                         setSelectedStateName(NullOrEmpty(response.data.data[0].stateName) ? "" : response.data.data[0].stateName);
    //                         setSelectedStateID(NullOrEmpty(response.data.data[0].stateID) ? 0 : response.data.data[0].stateID);
    //                         setSelectedCityName(NullOrEmpty(response.data.data[0].cityName) ? "" : response.data.data[0].cityName);
    //                         setSelectedCityID(NullOrEmpty(response.data.data[0].cityID) ? 0 : response.data.data[0].cityID);
    //                         setPincode(NullOrEmpty(response.data.data[0].pincode) ? "" : response.data.data[0].pincode.toString());
    //                         setAccountNo(NullOrEmpty(response.data.data[0].accountNumber) ? "" : response.data.data[0].accountNumber.toString());
    //                         setBankName(!NullOrEmpty(response.data.data[0].bankName) ? response.data.data[0].bankName : "");
    //                         setBankBranchName(!NullOrEmpty(response.data.data[0].branchName) ? response.data.data[0].branchName : "");
    //                         setIFSCCode(!NullOrEmpty(response.data.data[0].ifscCode) ? response.data.data[0].ifscCode : "");
    //                         setCNP(!NullOrEmpty(response.data.data[0].companyNamePrefix) ? response.data.data[0].companyNamePrefix : "");
    //                         setQBNP(!NullOrEmpty(response.data.data[0].quotationBudgetPrefix) ? response.data.data[0].quotationBudgetPrefix : "");
    //                         setECP(!NullOrEmpty(response.data.data[0].employeeCodePrefix) ? response.data.data[0].employeeCodePrefix : "");
    //                         setPOP(!NullOrEmpty(response.data.data[0].purchaseOrderPrefix) ? response.data.data[0].purchaseOrderPrefix : "");
    //                         setSOP(!NullOrEmpty(response.data.data[0].salesOrderPrefix) ? response.data.data[0].salesOrderPrefix : "");
    //                         setDisplay(NullOrEmpty(response.data.data[0].showBrand) ? "No" : response.data.data[0].showBrand ? "Yes" : "No");
    //                         setUploadedImage(response.data.data[0].companyLogo);
    //                         setImage(!NullOrEmpty(response.data.data[0].companyLogo) ? response.data.data[0].companyLogo : AWSImagePath + "placeholder-image.png");
    //                         // setFilePath(response.data.data[0].companyLogo ? response.data.data[0].companyLogo : null);
    //                         if (!NullOrEmpty(response.data.data[0].stateID) && response.data.data[0].stateID != 0) {
    //                             FetchCities(response.data.data[0].stateID);
    //                         }
    //                     }
    //                 }
    //                 setLoading(false);
    //             }
    //         })
    //         .catch((e) => {
    //             setLoading(false);
    //         });
    // };

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const onChangeInboxSearch = (query: string) => {
        setSearchQuery(query);
        if (query === "") {
            setInboxSettlemetListTemp(inboxSettlementList);
        } else {
            setInboxSettlemetListTemp(
                inboxSettlementList.filter((el: InboxSttelementModel) => {
                    return el.inbox.toString().toLowerCase().includes(query.toLowerCase());
                })
            );
        }
    };

    const onChangelendingSearch = (query: string) => {
        setSearchQuery(query);
        if (query === "") {
            setLendingListTemp(lendingtList,);
        } else {
            setLendingListTemp(
                lendingtList.filter((el: InboxLendingModel) => {
                    return el.lending.toString().toLowerCase().includes(query.toLowerCase());
                })
            );
        }
    };

    
    // const handelEditAndDelete = (type: string | null, a: InboxSttelementModel | undefined) => {
    //     if (type?.toLowerCase() === "edit" && a !== undefined) {
    //         setDataGridOpacity(0.3);
    //         setDataGridPointer("none");
    //         setDisplay(a.display);
    //         setActivityName(a?.activityRoleName);
    //         setSelectedID(a.id);
    //         setactivitynameError("");
    //         setIsActivitynameError(false);
    //         setButtonDisplay("unset");
    //         setActionStatus("edit");
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
    // };

    //#endregion 

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h4">Inbox</Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
                        {loading ? (
                            <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <Tabs value={value} onChange={handleChange}>
                                        <Tab label="Settlement" {...a11yProps(0)} />
                                        <Tab label="Lending" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <Grid item xs={4} sm={8} md={12}>
                                    <TabPanel value={value} index={0}>
                                        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                                            <Typography variant="h6">
                                                Inbox-Settlement List
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={12}>
                                            {loading ? (
                                                <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                                                    <CircularProgress />
                                                </Box>
                                            ) : (
                                                <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                                                    {inboxSettlementList.length === 0 ? (
                                                        <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                                                    ) : (
                                                        <>
                                                            <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                                                                <TextField
                                                                    placeholder="Search"
                                                                    variant="outlined"
                                                                    size="small"
                                                                    onChange={(e) => {
                                                                        onChangeInboxSearch((e.target as HTMLInputElement).value);
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
                                                                rows={inboxSettlementListTemp}
                                                                columns={InboxSettlementListColumns}
                                                                pageSize={pageSize}
                                                                rowsPerPageOptions={[5, 10, 20]}
                                                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                                                disableSelectionOnClick
                                                                onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                                                                    const arrActivity = [...inboxSettlementList];
                                                                    let a: InboxSttelementModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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

                                    <TabPanel value={value} index={1}>
                                        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                                            <Typography variant="h6">
                                                Inbox-Lending List
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={12}>
                                            {loading ? (
                                                <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                                                    <CircularProgress />
                                                </Box>
                                            ) : (
                                                <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                                                    {lendingtList.length === 0 ? (
                                                        <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                                                    ) : (
                                                        <>
                                                            <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                                                                <TextField
                                                                    placeholder="Search"
                                                                    variant="outlined"
                                                                    size="small"
                                                                    onChange={(e) => {
                                                                        onChangelendingSearch((e.target as HTMLInputElement).value);
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
                                                                rows={lendingListTemp}
                                                                columns={InboxLendingListColumns}
                                                                pageSize={pageSize}
                                                                rowsPerPageOptions={[5, 10, 20]}
                                                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                                                disableSelectionOnClick
                                                                onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                                                                    const arrActivity = [...lendingtList];
                                                                    let a: InboxLendingModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert severity={snackbarType} sx={{ width: "100%" }}>
                    {snackMsg}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Inbox;

import {
    Alert, AlertColor, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, Icon, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack
} from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../utils/communication";
import { employeeMarkAvailabilityEntryColumns } from "../../../utils/tablecolumns";
import { theme } from "../../../theme/AppTheme";
import { EmployeeMarkAvailabilityEntryModel } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { NullOrEmpty } from "../../../utils/CommonFunctions";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const EmployeeAvailabilityEntryList = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
    const [CookieUserID, SetCookieUseID] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    }, []);

    //#region Variables
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = React.useState("Yes");

    const [employeeMarkAvailabilityEntryList, setEmployeeMarkAvailabilityEntryList] = useState<Array<EmployeeMarkAvailabilityEntryModel>>([]);
    const [employeeMarkAvailabilityEntryListTemp, setEmployeeMarkAvailabilityEntryListTemp] = React.useState<Array<any>>([]);

    const [employeeID, setEmployeeID] = React.useState<number>();

    const [date, setDate] = useState<Date | null>(new Date());

    const [pageSize, setPageSize] = React.useState<number>(5);
    const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
    const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
    const [actionStatus, setActionStatus] = React.useState<string>("new");
    const [selectedID, setSelectedID] = React.useState<number>(0);
    const [open, setOpen] = React.useState(false);
    const [snackMsg, setSnackMsg] = React.useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    // const [searchQuery, setSearchQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
    const [acitvityNameListTemp, setActivityNamesListTemp] = React.useState<Array<any>>([]);
    //#endregion 

    //#region Functions

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
        setOpen(false);
    };

    const FetchData = (type: string) => {
        let params = {
            AddedByUserID: cookies.dfc.UserID,
        };
        ResetFields();
        Provider.getAll(`master/getuseremployeelist?${new URLSearchParams(GetStringifyJson(params))}`)

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
                        setEmployeeMarkAvailabilityEntryList(arrList);
                        setEmployeeMarkAvailabilityEntryListTemp(arrList);
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

    const InsertUpdateData = (employeeName: string, mobileNo: string, aadharNo: string) => {
        if (actionStatus === "new") {
            Provider.create("master/insertuseremployees", {
                AddedByUserID: cookies.dfc.UserID,
                EmployeeName: employeeName,
                MobileNo: mobileNo,
                AadharNo: aadharNo,

            })
                .then((response) => {
                    debugger;
                    if (response.data && response.data.code === 200) {
                        FetchData("added");
                    } else if (response.data.code === 304) {
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

    const SubmitVerify = () => {
        if (actionStatus === "new") {
            Provider.create("master/updateemployeeverification", {
                EmployeeID: employeeID,
            })
                .then((response) => {
                    debugger;
                    if (response.data && response.data.code === 200) {
                        FetchData("updated");
                    } else if (response.data.code === 304) {
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

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    
    const handleDateChange = (newValueDate: Date | null) => {
        debugger;
        setDate(newValueDate);
    };
    // const onChangeSearch = (query: string) => {
    //   // setSearchQuery(query);
    //   // if (query === "") {
    //   //   setActivityNamesListTemp(activityNamesList);
    //   // } else {
    //   //   setActivityNamesListTemp(
    //   //     activityNamesList.filter((el: ActivityRoleNameModel) => {
    //   //       return el.activityRoleName.toString().toLowerCase().includes(query.toLowerCase());
    //   //     })
    //   //   );
    //   // }
    // };


    //#endregion 

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h4">EMPLOYEE AVAILABILITY ENTRY LIST</Typography>
                    </Grid>
                </Grid>
                
                <br></br>
                <br></br>
              
                <Grid item xs={4} sm={8} md={12}>
                    {loading ? (
                        <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                            {employeeMarkAvailabilityEntryList.length === 0 ? (
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
                                        rows={employeeMarkAvailabilityEntryListTemp}
                                        columns={employeeMarkAvailabilityEntryColumns}
                                        pageSize={pageSize}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        disableSelectionOnClick
                                        onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {

                                            if (param.field === 'action') {
                                                // const arrActivity = [...employeeList];
                                                // let a: EmployeeModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                                                // handelEditAndDelete((e.target as any).textContent, a);
                                            }
                                            else if (param.field === 'verifyStatus') {

                                                const arrActivity = [...employeeMarkAvailabilityEntryList];
                                                let a: EmployeeMarkAvailabilityEntryModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert severity={snackbarType} sx={{ width: "100%" }}>
                    {snackMsg}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EmployeeAvailabilityEntryList;

import { LoadingButton } from "@mui/lab";
import { Alert, Autocomplete, Box, Button, CircularProgress, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../api/Provider";
import Header from "../components/Header";
import DataContext from "../contexts/DataContexts";
import { theme } from "../theme/AppTheme";
import { communication } from "../utils/communication";

const EWayBillPage = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
    let navigate = useNavigate();
    useEffect(() => {
        if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
            navigate(`/Samadhan-DiamondFrames/login`);
    }, []);

    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = useState("Yes");

    const [departmentNameList, setDepartmentNameList] =
        useContext(DataContext).departmentNamesList;

    const [pageSize, setPageSize] = useState<number>(5);
    const [buttonDisplay, setButtonDisplay] = useState<string>("none");
    const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">(
        "auto"
    );
    const [actionStatus, setActionStatus] = useState<string>("new");
    const [selectedID, setSelectedID] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);

    const [selectedStateName, setSelectedStateName] = useState("");
    const [stateError, setStateError] = useState("");
    const [isStateError, setIsStateError] = useState(false);

    const [selectedInStateLimit, setSelectedInStateLimit] = useState("");
    const [inStateError, setInStateError] = useState("");
    const [isInStateError, setIsInStateError] = useState(false);

    const [selectedInterStateLimit, setSelectedInterStateLimit] = useState("");
    const [interStateError, setInterStateError] = useState("");
    const [isInterStateError, setIsInterStateError] = useState(false);

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
    };


    const FetchData = () => {
        ResetFields();
        Provider.getAll("master/getdepartments")
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        const arrList = [...response.data.data];
                        arrList.map(function (a: any, index: number) {
                            a.display = a.display ? "Yes" : "No";
                            let sr = { srno: index + 1 };
                            a = Object.assign(a, sr);
                        });
                        setDepartmentNameList(response.data.data);
                    }
                } else {
                    // setSnackMsg(communication.Error);
                    // setOpen(true);
                }
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
                setSnackMsg(communication.NetworkError);
                setOpen(true);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const handelEditAndDelete = (
        type: string | null,
        a: DepartmentNameModel | undefined
    ) => {
        if (type?.toLowerCase() === "edit" && a !== undefined) {
            setDataGridOpacity(0.3);
            setDataGridPointer("none");
            setDisplay(a.display);
            setDepartmentName(a?.departmentName);
            setSelectedID(a.id);
            setDepartmentNameError("");
            setIsDepartmentNameError(false);
            setButtonDisplay("unset");
            setActionStatus("edit");
        }

    };

    const handleCancelClick = () => {
        setDisplay("Yes");
        setSelectedStateName("");
        setDepartmentNameError("");
        setIsDepartmentNameError(false);
        setButtonDisplay("none");
        setDataGridOpacity(1);
        setDataGridPointer("auto");
        setActionStatus("new");
    };

    const handleSubmitClick = () => {
        const IsTextFiledError = departmentName.trim() === "";
        setDepartmentNameError(
            IsTextFiledError ? communication.BlankActivityName : ""
        );
        setIsDepartmentNameError(IsTextFiledError);
        if (!IsTextFiledError) {
            setButtonLoading(true);
            InsertUpdateData(departmentName, display === "Yes");
            setDisplay("Yes");
            setDepartmentName("");
            setDepartmentNameError("");
            setIsDepartmentNameError(false);
        }
    };

    const InsertUpdateData = (paramActivityName: string, checked: boolean) => {
        if (actionStatus === "new") {
            Provider.create("master/insertdepartment", {
                DepartmentName: paramActivityName,
                Display: checked,
            })
                .then((response: any) => {
                    if (response.data && response.data.code === 200) {
                        FetchData();
                    } else {
                        ResetFields();
                        setSnackMsg(communication.Error);
                        setOpen(true);
                    }
                })
                .catch((e) => {
                    ResetFields();
                    setSnackMsg(communication.NetworkError);
                    setOpen(true);
                });
        } else if (actionStatus === "edit") {
            Provider.create("master/updatedepartment", {
                id: selectedID,
                DepartmentName: paramActivityName,
                Display: checked,
            })
                .then((response) => {
                    if (response.data && response.data.code === 200) {
                        FetchData();
                    } else {
                        ResetFields();
                        setSnackMsg(communication.Error);
                        setOpen(true);
                    }
                })
                .catch((e) => {
                    ResetFields();
                    setSnackMsg(communication.NetworkError);
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

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={{ xs: 1, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h4">Department</Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h6">Add Department</Typography>
                    </Grid>
                    <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            <b>Department Name</b>
                            <label style={{ color: "#ff0000" }}>*</label>
                        </Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={departmentNameList}
                            sx={{ width: 300 }}
                            onChange={()=>{

                            }}
                            renderInput={(params) => <TextField variant="outlined" {...params} label="EWayBill" />}
                        />
                    </Grid>
                    <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            <b>In State Limit</b>
                            <label style={{ color: "#ff0000" }}>*</label>
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="In State Limit"
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                                setSelectedInStateLimit((e.target as HTMLInputElement).value);
                                setIsInStateError(false);
                                setInStateError("");
                            }}
                            error={isInStateError}
                            helperText={inStateError}
                            value={selectedInStateLimit}
                        />
                    </Grid>
                    <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            <b>Inter State Limit</b>
                            <label style={{ color: "#ff0000" }}>*</label>
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Inter State Limit"
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                                setSelectedInterStateLimit((e.target as HTMLInputElement).value);
                                setIsInterStateError(false);
                                setInterStateError("");
                            }}
                            error={isInterStateError}
                            helperText={interStateError}
                            value={selectedInterStateLimit}
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
                        <Button
                            variant="contained"
                            sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
                            style={{ display: buttonDisplay }}
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </Button>
                        <LoadingButton
                            loading={buttonLoading}
                            variant="contained"
                            sx={{ mt: 1 }}
                            onClick={handleSubmitClick}
                        >
                            Submit
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Department List
                        </Typography>
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
                                {departmentNameList.length === 0 ? (
                                    <></>
                                ) : (
                                    <DataGrid
                                        style={{
                                            opacity: dataGridOpacity,
                                            pointerEvents: dataGridPointer,
                                        }}
                                        rows={departmentNameList}
                                        columns={departmentColumns}
                                        pageSize={pageSize}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        disableSelectionOnClick
                                        onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                                            const arrActivity = [...departmentNameList];
                                            let a: DepartmentNameModel | undefined =
                                                arrActivity.find((el) => el.id === param.row.id);

                                            handelEditAndDelete((e.target as any).textContent, a);
                                        }}
                                        sx={{
                                            "& .MuiDataGrid-columnHeaders": {
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                            },
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert severity="error" sx={{ width: "100%" }}>
                    {snackMsg}
                </Alert>
            </Snackbar>
        </Box>
    );

}

export default EWayBillPage;
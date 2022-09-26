import { Box, Alert, AlertColor, Container, Grid, Typography, Stack, Button, CircularProgress, InputAdornment, Snackbar } from "@mui/material";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from '@mui/icons-material/List';
import NoData from "../../../components/NoData";
import { DataGrid } from "@mui/x-data-grid";
import { rateCardListColumns } from "../../../utils/tablecolumns";
import { RateCardModel} from "../../../models/Model";
import { theme } from "../../../theme/AppTheme";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { communication } from "../../../utils/communication";
import Provider from "../../../api/Provider";
import { useCookies } from "react-cookie";


const RateCard = () => {
    // const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["dfc"]);
    const [CookieUserID, SetCookieUseID] = useState(0);
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
    const [pageSize, setPageSize] = React.useState<number>(5);
    const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
    const [snackMsg, setSnackMsg] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [gridRateCardList, setGridRateCardList] = useState<Array<RateCardModel>>([]);
    const [gridRateCardListTemp, setGridRAteCardListTemp] = useState<Array<RateCardModel>>([]);
    const [rateCardList, setRateCardList] =useState<Array<RateCardModel>>([]);

    const [rateCardListTemp, setRateCardListTemp] = React.useState<Array<any>>([]);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        FetchData("");
    }, []);
    
    function ResetFields() {
        // setSelectedID(0);
        // setActionStatus("new");
        // setDataGridOpacity(1);
        // setDataGridPointer("auto");
        // setButtonDisplay("none");
        // setButtonLoading(false);
        // setAddCompanyName("");
        // setContactPerson("");
        // setContactMobileNo("");
        // setAddress("");
        // setPincode("");
        // setGst("");
        // setPan("");
        // setDisplay("");
        // serviceType[1]([
        //     { key: "Vendor", isSelected: false, id: 1 },
        //     { key: "Supplier", isSelected: false, id: 2 },
        //     { key: "Client", isSelected: false, id: 3 },
        // ]);
        // setServiceProvider("");
        setOpen(false);


    }


    const FetchData = (type: string) => {
        debugger;
        let params = {
            AddedByUserID: cookies.dfc.UserID,
        };
        ResetFields();
        Provider.getAll(`contractorquotationestimation/getclients?${new URLSearchParams(GetStringifyJson(params))}`)

            .then((response: any) => {
                debugger;
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        const arrList = [...response.data.data];
                        arrList.map(function (a: any, index: number) {
                            a.display = a.display ? "Yes" : "No";
                            a.material = a.material ? "Create" : "Add";
                            let sr = { srno: index + 1 };
                            a = Object.assign(a, sr);
                        });
                        setRateCardList(arrList);
                        setRateCardListTemp(arrList);
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
        }

        const UpdateData = (status: string, fileName: string) => {
            debugger;
            if (status.toLowerCase() === "success") {
              const params = {
                // ID: employeeID,
                // MobileNo: mobile.trim(),
                // AadharNo: aadhar.trim(),
                // FatherName: fatherName,
                // Address: address,
                // StateID: selectedStateID,
                // CityID: selectedCityID,
                // Pincode: pincode,
                // ProfilePhoto: fileName ? AWSImagePath + fileName : "",
                // BloodGroup: bloodGroupID,
                // DOB: DOB,
                // DOJ: DOJ,
                // EmergencyContactName: emergencyCName,
                // EmergencyContactNo: emergencyCNo,
                // IDCardValidity: CardValidity,
                // LoginActiveStatus: (login === "Yes") ? true : false,
                // BranchID: branchID,
                // DepartmentID: departmentID,
                // DesignationID: designationID,
                // EmployeeType: employeeType,
                // LastWorkDate: LastWorkingDate,
                // WagesType: NullOrEmpty(wagesType) ? 0 : wagesType === "Daily" ? 1 : 2,
                // Salary: salary,
                // AccountHolderName: accountHName,
                // AccountNumber: NullOrEmpty(accountNo) ? 0 : parseInt(accountNo),
                // BankName: bankName,
                // BranchName: bankBranchName,
                // IFSCCode: ifscCode,
              };
              debugger;
              Provider.create("master/updateemployeedetails", params)
                .then((response) => {
                  debugger;
                  if (response.data && response.data.code === 200) {
        
                    setSnackbarType("success");
                    setSnackMsg("Data updated successfully");
        
                    setOpen(false);
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


    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {/* <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h4">RATE CARD SETUP</Typography>
                        <Button variant="contained" startIcon={<AddIcon sx={{marginRight:1}} />} onClick={()=>navigate("/master/addratecard")}>View</Button>
                    </Grid> */}
                      <Grid item xs={4} sm={8} md={12}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4">RATE CARD SETUP</Typography>
                            <Button variant="contained" startIcon={<AddIcon sx={{marginRight:1}} />} onClick={()=>navigate("/master/addratecard")}>View</Button>
                        </Stack>
                        
                    </Grid>

                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">
                            VIEW RATE CARD LIST (CONTRACTOR)
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12}>
                        {loading ? (
                            <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                                 { gridRateCardList.length === 0 ? (
                                // <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} /> 
                                <div></div>
                                ) : (
                                <>
                                    {/* <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                                        <TextField
                                            placeholder="Search"
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) => {
                                                //   onChangeSearch((e.target as HTMLInputElement).value);
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
                                    </Grid> */}
                                    <DataGrid
                                        style={{
                                            opacity: dataGridOpacity,
                                            pointerEvents: dataGridPointer,
                                        }}
                                        autoHeight={true}
                                        rows={gridRateCardListTemp}
                                        columns={rateCardListColumns}
                                        pageSize={pageSize}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        disableSelectionOnClick
                                        onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                                            const arrActivity = [...rateCardList];
                                            let a: RateCardModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
                </Grid>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} >
                <Alert severity={snackbarType} sx={{ width: "100%" }}>
                    {snackMsg}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RateCard;
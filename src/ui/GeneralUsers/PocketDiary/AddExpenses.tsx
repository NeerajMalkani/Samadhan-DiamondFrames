import { Alert, AlertColor, Box, Button, CircularProgress, Container,Select,MenuItem,FormHelperText, FormControl, FormControlLabel, Grid, Icon, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../utils/communication";
import { ExpensesColumns } from "../../../utils/tablecolumns";
import { theme } from "../../../theme/AppTheme";
import { ModeTypeModel,CategoryNameModel,SubCategoryNameModel,EntryTypeModel,BudgetModel,PayModeModel,ExpensesModel } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from '@mui/icons-material/List';
import NoData from "../../../components/NoData";
import { SelectChangeEvent } from "@mui/material";
import { APIConverter } from "../../../utils/apiconverter";

let p_ID = 0;

const AddExpenses = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
    let navigate = useNavigate();
  
    useEffect(() => {
      if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    }, []);

    //#region Variables
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
  const [recurring, setRecurring] = React.useState("Yes");
 
  const [expenseList, setExpenseList] =useState<Array<ExpensesModel>>([]);
  const [expenseListTemp, setExpenseListTemp] = React.useState<Array<any>>([]);
 
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const [entryType, setEntryType] = useState("");
  const [entryTypeError, setEntryTypeError] = useState("");
  const [isEntryTypeError, setIsEntryTypeError] = useState(false);

  const [payMode, setPayMode] = useState("--Select--");
  const [payModeID, setPayModeID] = useState<number>(0);
  const [payModeError, setPayModeError] = useState("");
  const [ispayModeError, setIsPayModeError] = useState(false);
  const [payModeList, setPayModeList] = useState<Array<PayModeModel>>([]);
  const [payModeFullData, setPayModeFullData] = useState([]);
  const [selectedPayMode, setSelectedPayMode] = useState("");

  const [subCategoryName, setSubCategoryName] = useState("--Select--");
  const [subCategoryNameID, setSubCategoryNameID] = useState<number>(0);
  const [subCategoryNameError, setSubCategoryNameError] = useState("");
  const [isSubCategoryNameError, setIsSubCategoryNameError] = useState(false);
  const [subCategoryNameList, setSubCategoryNameList] = useState<Array<SubCategoryNameModel>>([]);

  const [expenses, setExpenses] = useState("--Select--");
  const [expensesID, setExpensesID] = useState<number>(0);
  const [expensesError, setExpensesError] = useState("");
  const [isExpensesError, setIsExpensesError] = useState(false);
  const [ExpensesList, setExpensesList] = useState<Array<ExpensesModel>>([]);
 
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isAmountError, setIsAmountError] = useState(false);

 //#endregion 

  //#region Functions
  useEffect(() => {
    // FetchData("");
    FetchPaymentMode();
  }, []);

  const ResetFields = () => {
    // setSelectedID(0);
    // setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
  };

  
//   const FetchData = (type: string) => {
//     ResetFields();
//     Provider.getAll("master/getactivityroles")
//       .then((response: any) => {
//         if (response.data && response.data.code === 200) {
//           if (response.data.data) {
//             const arrList = [...response.data.data];
//             arrList.map(function (a: any, index: number) {
//               a.display = a.display ? "Yes" : "No";
//               let sr = { srno: index + 1 };
//               a = Object.assign(a, sr);
//             });
//             setActivityNamesList(arrList);
//             setActivityNamesListTemp(arrList);
//             if (type !== "") {
//               setSnackMsg("Activity role " + type);
//               setOpen(true);
//               setSnackbarType("success");
//             }
//           }
//         } else {
//           setSnackbarType("info");
//           setSnackMsg(communication.NoData);
//           setOpen(true);
//         }
//         setLoading(false);
//       })
//       .catch((e) => {
//         setLoading(false);
//         setSnackbarType("error");
//         setSnackMsg(communication.NetworkError);
//         setOpen(true);
//       });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   };

 

//   const handleSubmitClick = () => {
//     const IsTextFiledError = activityName.trim() === "";
//     setactivitynameError(IsTextFiledError ? communication.BlankActivityName : "");
//     setIsActivitynameError(IsTextFiledError);
//     if (!IsTextFiledError) {
//       setButtonLoading(true);
//     //   InsertUpdateData(activityName, display === "Yes");
//       setDisplay("Yes");
//       setActivityName("");
//       setactivitynameError("");
//       setIsActivitynameError(false);
//     }
//   };

//   const handleCancelClick = () => {
//     setDisplay("Yes");
//     // setActivityName("");
//     setactivitynameError("");
//     setIsActivitynameError(false);
//     setButtonDisplay("none");
//     setDataGridOpacity(1);
//     setDataGridPointer("auto");
//     setActionStatus("new");
//   };


const FetchPaymentMode = async () => {
  let params = {
    data: {
            Sess_UserRefno:  cookies.dfc.UserID,
            pck_transtype_refno: 2,
        },
  };
  setLoading(true);
  await Provider.createDFPocketDairy(Provider.API_URLS.get_pckpaymentmodetype, params)
    .then((response: any) => {
      if (response.data && response.data.code === 200) {
        if (response.data.data) {
          response.data.data = APIConverter(response.data.data);
          setPayModeList(response.data.data);
        }
      }
      setLoading(false);
      FetchExpenses();
    })
    .catch((e) => {
      setLoading(false);
      //Show snackbar
    });
};

const FetchExpenses = async () => {
  debugger;
  let params = {
    data: {
      Sess_UserRefno: cookies.dfc.UserID,
      Sess_group_refno: cookies.dfc.Sess_group_refno,
      pck_mode_refno: 1,
      pck_entrytype_refno: 1
  },
  };
  debugger;
  setLoading(true);
  await Provider.createDFPocketDairy(Provider.API_URLS.getcategoryname_pckaddexpensesform, params)
    .then((response: any) => {
      debugger;
      if (response.data && response.data.code === 200) {
        if (response.data.data) {
          debugger;
          response.data.data = APIConverter(response.data.data);
          setExpensesList(response.data.data);
        }
      }
      setLoading(false);
    })
    .catch((e) => {
      setLoading(false);
      //Show snackbar
    });
};



  const handleSCNChange = (event: SelectChangeEvent) => {
    debugger;
    let subCategoryName: string = event.target.value;
    let ac = subCategoryNameList.find((el) => el.subCategoryName === subCategoryName);
    if (ac !== undefined) {
        setSubCategoryName(subCategoryName);
        setSubCategoryNameID(ac?.id);
        setIsSubCategoryNameError(false);
        setSubCategoryNameError("");
    }
  };

  const handlePMChange = (event: SelectChangeEvent) => {
    let payMode: string = event.target.value;
    let ac = payModeList.find((el) => el.pckModeName === payMode);
    if (ac !== undefined) {
        setPayMode(payMode);
        setPayModeID(ac?.pckModeID);
        setIsPayModeError(false);
        setPayModeError("");
    }
  };
//   const handelEditAndDelete = (type: string | null, a: ActivityRoleNameModel | undefined) => {
//     if (type?.toLowerCase() === "edit" && a !== undefined) {
//       setDataGridOpacity(0.3);
//       setDataGridPointer("none");
//       setDisplay(a.display);
//       setActivityName(a?.activityRoleName);
//       setSelectedID(a.id);
//       setactivitynameError("");
//       setIsActivitynameError(false);
//       setButtonDisplay("unset");
//       setActionStatus("edit");
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

//   const InsertUpdateData = (paramActivityName: string, checked: boolean) => {
//     if (actionStatus === "new") {
//       Provider.create("master/insertactivityroles", {
//         ActivityRoleName: paramActivityName,
//         Display: checked,
//       })
//         .then((response) => {
//           if (response.data && response.data.code === 200) {
//             FetchData("added");
//           }else if (response.data.code === 304) {
//             setSnackMsg(communication.ExistsError);
//             setOpen(true);
//             setSnackbarType("error");
//             ResetFields();
//           } else {
//             ResetFields();
//             setSnackMsg(communication.Error);
//             setSnackbarType("error");
//             setOpen(true);
//           }
//         })
//         .catch((e) => {
//           ResetFields();
//           setSnackMsg(communication.NetworkError);
//           setSnackbarType("error");
//           setOpen(true);
//         });
//     } else if (actionStatus === "edit") {
//       Provider.create("master/updateactivityroles", {
//         id: selectedID,
//         ActivityRoleName: paramActivityName,
//         Display: checked,
//       })
//         .then((response) => {
//           if (response.data && response.data.code === 200) {
//             FetchData("updated");
//           }else if (response.data.code === 304) {
//             setSnackMsg(communication.ExistsError);
//             setOpen(true);
//             setSnackbarType("error");
//             ResetFields();
//           } else {
//             ResetFields();
//             setSnackMsg(communication.Error);
//             setSnackbarType("error");
//             setOpen(true);
//           }
//         })
//         .catch((e) => {
//           ResetFields();
//           setSnackMsg(communication.NetworkError);
//           setSnackbarType("error");
//           setOpen(true);
//         });
//     }
//   };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

//   const onChangeSearch = (query: string) => {
//     setSearchQuery(query);
//     if (query === "") {
//       setActivityNamesListTemp(activityNamesList);
//     } else {
//       setActivityNamesListTemp(
//         activityNamesList.filter((el: ActivityRoleNameModel) => {
//           return el.activityRoleName.toString().toLowerCase().includes(query.toLowerCase());
//         })
//       );
//     }
//   };
//#endregion 
    return (
        <Box sx={{ mt: 11 }}>
          <Header />
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={4} sm={8} md={12}>
                <Typography variant="h4">Add Expenses</Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                <Typography variant="h6">Add Expenses</Typography>
              </Grid>
            
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b><label style={{ color: "#ff0000" }}>*</label> Entry Type</b>
                </Typography>
                <TextField
              fullWidth
              placeholder="Entry Type"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setEntryType((e.target as HTMLInputElement).value);
                setIsEntryTypeError(false);
                setEntryTypeError("");
              }}
              error={isEntryTypeError}
              helperText={entryTypeError}
              value={entryType}
            />
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b><label style={{ color: "#ff0000" }}>*</label> Amount</b>
                </Typography>
                <TextField
              fullWidth
              placeholder="Amount"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setAmount((e.target as HTMLInputElement).value);
                setIsAmountError(false);
                setAmountError("");
              }}
              error={isAmountError}
              helperText={amountError}
              value={amount}
            />
            </Grid>
            <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b><label style={{ color: "#ff0000" }}>*</label> Payment Mode</b>
                </Typography>
                <FormControl fullWidth size="small" error={ispayModeError}>
              <Select value={payMode} onChange={handlePMChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {payModeList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.pckModeID}>
                      {item.pckModeName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{payModeError}</FormHelperText> 
              </FormControl>
            </Grid>
            <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b><label style={{ color: "#ff0000" }}>*</label>Expenses /Payment</b>
                </Typography>
                <FormControl fullWidth size="small" error={isExpensesError}>
              <Select value={expenses} onChange={handleSCNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {ExpensesList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.pckCategoryID}>
                      {item.pckCategoryID}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{expensesError}</FormHelperText>
            </FormControl>
            </Grid>
            <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b><label style={{ color: "#ff0000" }}>*</label>Sub Category Name</b>
                </Typography>
                <FormControl fullWidth size="small" error={isSubCategoryNameError}>
              <Select value={subCategoryName} onChange={handleSCNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {subCategoryNameList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.subCategoryName}>
                      {item.subCategoryName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{subCategoryNameError}</FormHelperText>
            </FormControl>
            </Grid>
              <Grid item xs={3} sm={8} md={12}>
                <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} style={{ display: buttonDisplay }} >
                  Cancel
                </Button>
                <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} >
                  Submit
                </LoadingButton>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                <Typography variant="h6">
            Expenses List
                </Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {expenseList.length === 0 ? (
                     <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                    ) : (
                      <>
                        <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
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
                        </Grid>
                        <DataGrid
                          style={{
                            opacity: dataGridOpacity,
                            pointerEvents: dataGridPointer,
                          }}
                          autoHeight={true}
                          rows={expenseListTemp}
                          columns={ExpensesColumns}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            const arrActivity = [...expenseList];
                            // let a: ExpensesModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        //    handelEditAndDelete((e.target as any).textContent, a);
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
          <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert severity={snackbarType} sx={{ width: "100%" }}>
              {snackMsg}
            </Alert>
          </Snackbar>
        </Box>
      );

};

export default AddExpenses;
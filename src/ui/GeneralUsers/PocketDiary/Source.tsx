import { Alert, AlertColor, Box, Button, CircularProgress, Container,Select,MenuItem,FormHelperText,Stack, FormControl, FormControlLabel, Grid, Icon, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { theme } from "../../../theme/AppTheme";
import {ReceiptModeNameModel,SubCategoryNameModel,SourceNameModel} from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import { SelectChangeEvent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Sources = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
    let navigate = useNavigate();
  
    useEffect(() => {
      if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    }, []);

    //#region Variables
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
 

  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
 
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const [entryType, setEntryType] = useState("");
  const [entryTypeError, setEntryTypeError] = useState("");
  const [isEntryTypeError, setIsEntryTypeError] = useState(false);

  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isAmountError, setIsAmountError] = useState(false);

  const [receiptMode, setReceiptMode] = useState("--Select--");
  const [receiptModeID, setReceiptModeID] = useState<number>(0);
  const [receiptModeError, setReceiptModeError] = useState("");
  const [isReceiptModeeError, setIsReceiptModeError] = useState(false);
  const [receiptModeList, setReceiptModeList] = useState<Array<ReceiptModeNameModel>>([]);
 
  const [source, setSource] = useState("--Select--");
  const [sourceID, setSourceID] = useState<number>(0);
  const [sourceError, setSourceError] = useState("");
  const [isSourceError, setIsSourceError] = useState(false);
  const [sourceList, setSourceList] = useState<Array<SourceNameModel>>([]);
 
  const [subCategoryName, setSubCategoryName] = useState("--Select--");
  const [subCategoryNameID, setSubCategoryNameID] = useState<number>(0);
  const [subCategoryNameError, setSubCategoryNameError] = useState("");
  const [isSubCategoryNameError, setIsSubCategoryNameError] = useState(false);
  const [subCategoryNameList, setSubCategoryNameList] = useState<Array<SubCategoryNameModel>>([]);

  const [errorDIText, setDIErrorText] = useState("");
  const [designButtonText, setDesignButtonText] = useState("Choose File");
  
 
 //#endregion 

  //#region Functions
  useEffect(() => {
    // FetchData("");
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

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

 
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
 
  const handleSourceChange = (event: SelectChangeEvent) => {
    // debugger;
    // let subCategoryName: string = event.target.value;
    // let ac = subCategoryNameList.find((el) => el.subCategoryName === subCategoryName);
    // if (ac !== undefined) {
    //     setSubCategoryName(subCategoryName);
    //     setSubCategoryNameID(ac?.id);
    //     setIsSubCategoryNameError(false);
    //     setSubCategoryNameError("");
    // }
  };
 
  const handleReceiptChange = (event: SelectChangeEvent) => {
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
                <Typography variant="h4">Add Sources</Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h4">Add/Edit Service Product</Typography>
              <Button variant="contained" startIcon={<AddIcon sx={{ marginRight: 1 }} />} onClick={() => navigate("/generalusers/pocketdiary/addsource")}>
                View List
              </Button>
            </Stack>
          </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                <Typography variant="h6">Add Sources</Typography>
              </Grid>
             
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b><label style={{ color: "#ff0000" }}>*</label> Entry Type</b>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="self"
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
                <b><label style={{ color: "#ff0000" }}>*</label>Receipt Mode</b>
                </Typography>
                <FormControl fullWidth size="small" error={isReceiptModeeError}>
              <Select value={receiptMode} onChange={handleSCNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {receiptModeList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.receiptMode}>
                      {item.receiptMode}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{receiptModeError}</FormHelperText>
            </FormControl>
            </Grid>
            <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b><label style={{ color: "#ff0000" }}>*</label> Source / Receipt</b>
                </Typography>
                <FormControl fullWidth size="small" error={isSourceError}>
              <Select value={source} onChange={handleSourceChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {sourceList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.source}>
                      {item.source}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{sourceError}</FormHelperText> 
              </FormControl>
            </Grid>
            <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b><label style={{ color: "#ff0000" }}>*</label> Sub Category</b>
                </Typography>
                <FormControl fullWidth size="small" error={isSubCategoryNameError}>
              <Select value={subCategoryName} onChange={handleReceiptChange}>
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

export default Sources;
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
import { UploadImageToS3WithNativeSdk } from "../../../utils/AWSFileUpload";
import uuid from "react-uuid";
import { AWSImagePath } from "../../../utils/paths";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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

  const [entryType, setEntryType] = useState("--Select--");
  const [entryTypeID, setEntryTypeID] = useState<number>(0);
  const [entryTypeError, setEntryTypeError] = useState("");
  const [isEntryTypeError, setIsEntryTypeError] = useState(false);
  const [entryTypeList, setEntryTypeList] = useState<Array<EntryTypeModel>>([]);

  const [categoryName, setCategoryName] = useState("--Select--");
  const [categoryNameID, setCategoryNameID] = useState<number>(0);
  const [categoryNameError, setCategoryNameError] = useState("");
  const [isCategoryNameError, setIsCategoryNameError] = useState(false);
  const [categoryNameList, setCategoryNameList] = useState<Array<CategoryNameModel>>([]);

  const [payMode, setPayMode] = useState("--Select--");
  const [payModeID, setPayModeID] = useState<number>(0);
  const [payModeError, setPayModeError] = useState("");
  const [ispayModeError, setIsPayModeError] = useState(false);
  const [payModeList, setPayModeList] = useState<Array<PayModeModel>>([]);

  const [subCategoryName, setSubCategoryName] = useState("--Select--");
  const [subCategoryNameID, setSubCategoryNameID] = useState<number>(0);
  const [subCategoryNameError, setSubCategoryNameError] = useState("");
  const [isSubCategoryNameError, setIsSubCategoryNameError] = useState(false);
  const [subCategoryNameList, setSubCategoryNameList] = useState<Array<SubCategoryNameModel>>([]);
 
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isAmountError, setIsAmountError] = useState(false);

  const [notes, setNotes] = useState("");
  const [notesError, setNotesError] = useState("");
  const [isNotesError, setIsNotesError] = useState(false);

  const [errorDIText, setDIErrorText] = useState("");
  const [designButtonText, setDesignButtonText] = useState("Choose File");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadFileUpload, setUploadFileUpload] = useState<any>();

  const [date, setDate] = useState<Date | null>(new Date());
 
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

  const handleRecurringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecurring((event.target as HTMLInputElement).value);
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

const handleETChange = (event: SelectChangeEvent) => {
    debugger;
    let entryType: string = event.target.value;
    let ac = entryTypeList.find((el) => el.entryType === entryType);
    if (ac !== undefined) {
        setEntryType(entryType);
        setEntryTypeID(ac?.id);
        setIsEntryTypeError(false);
        setEntryTypeError("");
    }
  };

  const handleCNChange = (event: SelectChangeEvent) => {
    debugger;
    let categoryName: string = event.target.value;
    let ac = categoryNameList.find((el) => el.categoryName === categoryName);
    if (ac !== undefined) {
      setCategoryName(categoryName);
      setCategoryNameID(ac?.id);
      setIsCategoryNameError(false);
      setCategoryNameError("");
    }
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
    debugger;
    let payMode: string = event.target.value;
    let ac = payModeList.find((el) => el.payMode === payMode);
    if (ac !== undefined) {
        setPayMode(payMode);
        setPayModeID(ac?.id);
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

  const handleSubmitClick = () => {
    debugger;
    setButtonLoading(true);
    if (uploadFileUpload !== null && uploadFileUpload !== undefined) {
      uploadImage();
    } else {
    //   InsertData("Success", uploadedImage);
    }
  };

  const uploadImage = () => {
    let imageName: string = uuid();
    let fileExtension = uploadedImage.split(".").pop();
    setUploadedImage(imageName + "." + fileExtension);
    // UploadImageToS3WithNativeSdk(uploadFileUpload, imageName + "." + fileExtension, InsertData);
  };

  const handleDateChange = (newValueDate: Date | null) => {
    debugger;
    setDate(newValueDate);
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
                  <b><label style={{ color: "#ff0000" }}>*</label>Date</b>
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat="MM/dd/yyyy"
                          clearable
                          value={date}
                          onChange={handleDateChange}
                          renderInput={(params) => <TextField size="small" {...params} />}></DesktopDatePicker>
                      </LocalizationProvider>
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b><label style={{ color: "#ff0000" }}>*</label> Entry Type</b>
                </Typography>
                <FormControl fullWidth size="small" error={isEntryTypeError }>
              <Select value={entryType} onChange={handleETChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {entryTypeList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.entryType}>
                      {item.entryType}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{entryTypeError}</FormHelperText>
            </FormControl>
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b><label style={{ color: "#ff0000" }}>*</label> Category Name</b>
                </Typography>
                <FormControl fullWidth size="small" error={isCategoryNameError}>
              <Select value={categoryName} onChange={handleCNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {categoryNameList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.categoryName}>
                      {item.categoryName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{categoryNameError}</FormHelperText>
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
            <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b><label style={{ color: "#ff0000" }}>*</label> Pay Mode</b>
                </Typography>
                <FormControl fullWidth size="small" error={ispayModeError}>
              <Select value={payMode} onChange={handlePMChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {payModeList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.payMode}>
                      {item.payMode}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{payModeError}</FormHelperText> 
              </FormControl>
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
                <b>Notes</b>
                </Typography>
                <TextField
              fullWidth
              placeholder="Notes"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setNotes((e.target as HTMLInputElement).value);
                setIsNotesError(false);
                setNotesError("");
              }}
              error={isNotesError}
              helperText={notesError}
              value={notes}
            />
            </Grid>
            <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Attachment</b>
                </Typography>
                <FormControl fullWidth size="small">
                          <Grid style={{ display: "flex" }}>
                            <Button size="small" variant="contained" component="label" sx={{ mr: 2 }}>
                              {designButtonText}
                              <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.currentTarget !== null && e.currentTarget.files !== null) {
                                    setUploadFileUpload(e.currentTarget.files[0]);
                                    let FileName = e.currentTarget.files[0].name;
                                    if (FileName !== undefined) {
                                      setDIErrorText(FileName.trim());
                                      setUploadedImage(FileName);
                                    }
                                    setDesignButtonText("Change");
                                  }
                                }}
                              />
                            </Button>
                          </Grid>
                          <FormHelperText>{errorDIText}</FormHelperText>
                        </FormControl>
            </Grid>
            <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Reccuring</b>
                </Typography>
                <FormControl>
                  <RadioGroup row name="row-radio-buttons-group" value={recurring} onChange={handleRecurringChange}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Display</b>
                </Typography>
                <FormControl>
                  <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
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
                            let a: ExpensesModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
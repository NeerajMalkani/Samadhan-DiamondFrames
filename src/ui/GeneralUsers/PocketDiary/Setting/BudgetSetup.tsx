import { Alert, AlertColor, Box, Button, CircularProgress, Container,Select,MenuItem,FormHelperText, FormControl, FormControlLabel, Grid, Icon, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../../utils/communication";
import { BudgetColumns } from "../../../../utils/tablecolumns";
import { theme } from "../../../../theme/AppTheme";
import { ModeTypeModel,CategoryNameModel,SubCategoryNameModel,EntryTypeModel,BudgetModel } from "../../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from '@mui/icons-material/List';
import NoData from "../../../../components/NoData";
import { SelectChangeEvent } from "@mui/material";

const BudgetSetup = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
    let navigate = useNavigate();
  
    useEffect(() => {
      if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    }, []);

    //#region Variables
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
 
  const [budgetList, setBudgetList] =useState<Array<BudgetModel>>([]);//React.useContext(DataContext).activityNamesList;
  const [budgetListTemp, setBudgetListTemp] = React.useState<Array<any>>([]);
 
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

  const [modeType, setModeType] = useState("--Select--");
  const [modeTypeID, setModeTypeID] = useState<number>(0);
  const [modeTypeError, setModeTypeError] = useState("");
  const [isModeTypeError, setIsModeTypeError] = useState(false);
  const [modeTypeList, setModeTypeList] = useState<Array<ModeTypeModel>>([]);

  const [categoryName, setCategoryName] = useState("--Select--");
  const [categoryNameID, setCategoryNameID] = useState<number>(0);
  const [categoryNameError, setCategoryNameError] = useState("");
  const [isCategoryNameError, setIsCategoryNameError] = useState(false);
  const [categoryNameList, setCategoryNameList] = useState<Array<CategoryNameModel>>([]);

  const [subCategoryName, setSubCategoryName] = useState("--Select--");
  const [subCategoryNameID, setSubCategoryNameID] = useState<number>(0);
  const [subCategoryNameError, setSubCategoryNameError] = useState("");
  const [isSubCategoryNameError, setIsSubCategoryNameError] = useState(false);
  const [subCategoryNameList, setSubCategoryNameList] = useState<Array<SubCategoryNameModel>>([]);
 
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetAmountError, setBudgetAmountError] = useState("");
  const [isBudgetAmountError, setIsBudgetAmountError] = useState(false);
 
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

  const handleMTChange = (event: SelectChangeEvent) => {
    debugger;
    let modeType: string = event.target.value;
    let ac = modeTypeList.find((el) => el.modeType === modeType);
    if (ac !== undefined) {
        setModeType(modeType);
        setModeTypeID(ac?.id);
        setIsModeTypeError(false);
        setModeTypeError("");
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
                <Typography variant="h4">Budget Setup</Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                <Typography variant="h6">Budget Setup (Add /Edit)</Typography>
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
                  <b><label style={{ color: "#ff0000" }}>*</label> Mode Type</b>
                </Typography>
                <FormControl fullWidth size="small" error={isModeTypeError}>
              <Select value={modeType} onChange={handleMTChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {modeTypeList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.modeType}>
                      {item.modeType}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{modeTypeError}</FormHelperText>
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
                <b><label style={{ color: "#ff0000" }}>*</label>Budget Amount</b>
                </Typography>
                <TextField
              fullWidth
              placeholder="Budget Amount"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setBudgetAmount((e.target as HTMLInputElement).value);
                setIsBudgetAmountError(false);
                setBudgetAmountError("");
              }}
              error={isBudgetAmountError}
              helperText={budgetAmountError}
              value={budgetAmount}
            />
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
            Budget Setting List
                </Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {budgetList.length === 0 ? (
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
                          rows={budgetListTemp}
                          columns={BudgetColumns}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            const arrActivity = [...budgetList];
                            let a: BudgetModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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

export default BudgetSetup;
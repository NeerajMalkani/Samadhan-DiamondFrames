import { Alert, AlertColor, Box, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../../../api/Provider";
import Header from "../../../components/Header";
import NoData from "../../../components/NoData";
import { communication } from "../../../utils/communication";
import ListIcon from "@mui/icons-material/List";
import { APIConverter } from "../../../utils/apiconverter";
import SearchIcon from "@mui/icons-material/Search";
import { ExpensesColumns } from "../../../utils/tablecolumns";
import { theme } from "../../../theme/AppTheme";
import {  ExpensesModel } from "../../../models/Model";

const AddExpensesList = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
    let navigate = useNavigate();
  
    useEffect(() => {
      if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    }, []);
  
 //#region Variables
 const [loading, setLoading] = useState(true);
 const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
 const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
 const [pageSize, setPageSize] = useState<number>(5);
 const [snackbarMessage, setSnackbarMessage] = useState("");
 const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
 const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
 const [searchQuery, setSearchQuery] = useState("");

 const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  

 const [expenseList, setExpenseList] = useState<Array<ExpensesModel>>([]);
 const [expenseListTemp, setExpenseListTemp] = React.useState<Array<any>>([]);

//#endregion


//#region Fuction


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
const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
//#endregion


    return (
        <Box sx={{ mt: 11 }}>
          <Header />
          <Container maxWidth="lg">
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
       
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );

};

export default AddExpensesList;
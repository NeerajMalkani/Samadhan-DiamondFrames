import { Alert, AlertColor, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, Icon, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../utils/communication";
import { activityColumns, employeeColumns,employeeSearchResult } from "../../../utils/tablecolumns";
import { theme } from "../../../theme/AppTheme";
import { ActivityRoleNameModel, EmployeeModel } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";

const EmployeeListPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
  
  const [employeeList, setEmployeeList] =useState<Array<EmployeeModel>>([]);
  const [employeeListTemp, setEmployeeListTemp] = React.useState<Array<any>>([]);

  const [gridEmployeeList, setGridEmployeeList] = useState<Array<EmployeeModel>>([]);
  const [gridEmployeeListTemp, setGridEmployeeListTemp] = useState<Array<EmployeeModel>>([]);

  const [mobileNo, setMobileNo] = React.useState("");
  const [mobileErrorText, setMobileErrorText] = useState("");
  const [isMobileNoError, isSetMobileNoError] = useState(false);

  const [aadharNo, setAadharNo] = React.useState("");
  const [aadharNoErrorText, setAadharNoErrorText] = useState("");
  const [isAadharNoError, isSetAadharNoError] = useState(false);

  const [employeeName, SetEmployeeName] = React.useState("");
  const [employeeNameErrorText, setEmployeeNameErrorText] = useState("");
  const [isEmployeeNameError, isSetemployeeNameError] = useState(false);

  const [addEmployeeName, setAddEmployeeName] = React.useState("");
  const [addEmployeeNameErrorText, setAddEmployeeNameErrorText] = useState("");
  const [addEmployeeNameError, setAddEmployeeNameError] = useState(false);

  const [addAadharNo, setaddAadharNo] = React.useState("");
  const [addAadharNoErrorText, setAddAadharNoErrorText] = useState("");
  const [isAddAadharNoError, isSetAddAadharNoError] = useState(false);

  const [addMobileNo, setAddMobileNo] = React.useState("");
  const [addMobileErrorText, setAddMobileErrorText] = useState("");
  const [isAddMobileNoError, isSetAddMobileNoError] = useState(false);

  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  

  useEffect(() => {
    FetchData("");
   // FetchSearchData("");
  }, []);

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
  };

  const FetchData = (type: string) => {
    let params = {
      UserId:cookies.dfc.UserID,
      UserType:7, 
    };
    ResetFields();
    Provider.getAll("master/getuseremployeelist")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setEmployeeList(arrList);
            setEmployeeListTemp(arrList);
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

  const FetchSearchData= () => {
    let params = {
      UserId:cookies.dfc.UserID,
      UserType:7,
      AadharNo:aadharNo,
      MobileNo:mobileNo
    };
    ResetFields();
    Provider.getAll("master/getemployeesearchlist")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            setGridEmployeeList(arrList);
            setGridEmployeeListTemp(arrList);
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

  const handleSearchClick = () => {
    debugger;
    let isValid: boolean = true;

    if(aadharNo.trim() === "" && mobileNo.trim() === "")
    {
      isValid = false;
      isSetAadharNoError(true);
      setAadharNoErrorText("Please Enter Aadhar No");
      
      isValid = false;
      isSetMobileNoError(true);
      setMobileErrorText("Please Enter Mobile No");


    }
    if (isValid){
      //InsertUpdateData(addAadharNo,addMobileNo);
    }

     };




  const handleSubmitClick = () => {
    let isValid: boolean = true;

    if (addEmployeeName === "") {
      isValid = false;
      setAddEmployeeNameError(true);
      setAddEmployeeNameErrorText(communication.BlankEmployeeName);
    }

    if (addMobileNo === "") {
      isValid = false;
      isSetAddMobileNoError(true);
      setAddMobileErrorText(communication.BlankMobileNo);
    }

    if (addAadharNo === "") {
      isValid = false;
      isSetAddAadharNoError(true);
      setAddAadharNoErrorText(communication.BlankAadharNo);
    }

    if (isValid) {
      InsertUpdateData();
      setAddEmployeeName("");
      setAddEmployeeNameErrorText("");
      setAddEmployeeNameError(false);

      setaddAadharNo("");
      setAddAadharNoErrorText("");
      isSetAddAadharNoError(false);

      setAddMobileNo("");
      setAddMobileErrorText("");
      isSetAddMobileNoError(false);
    }
  };


  const InsertUpdateData = () => {
    if (actionStatus === "new") {
      Provider.create("master/insertuseremployees", {
        // ActivityRoleName: paramActivityName,
        // Display: checked,

      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("added");
          }else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
            ResetFields();
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    } else if (actionStatus === "edit") {
      Provider.create("master/updateactivityroles", {
        id: selectedID,
        // ActivityRoleName: paramActivityName,
        // Display: checked,
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("updated");
          }else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
            ResetFields();
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onChangeSearch = (query: string) => {
    // setSearchQuery(query);
    // if (query === "") {
    //   setActivityNamesListTemp(activityNamesList);
    // } else {
    //   setActivityNamesListTemp(
    //     activityNamesList.filter((el: ActivityRoleNameModel) => {
    //       return el.activityRoleName.toString().toLowerCase().includes(query.toLowerCase());
    //     })
    //   );
    // }
  };

  
  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">EMPLOYEE</Typography>
          </Grid>

          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
          <Typography variant="h6">EMPLOYEE SEARCH</Typography>
          <br></br>

          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
            <Grid item sm={6}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b style={{float:'right',}}>Employee Aadhar No</b>
            </Typography>
            </Grid>
            <Grid item sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              onChange={(e) => {
                setAadharNo((e.target as HTMLInputElement).value);
                isSetAadharNoError(false);
                setAadharNoErrorText("");
              }}
              error={isAadharNoError}
              helperText={aadharNoErrorText}
              value={aadharNo}
            />
            </Grid>
      </Grid>
</Grid>

<Grid item xs={4}>
<Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
      <Grid item sm={4}>
<Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b style={{float:'right',}}><label style={{ color: "#ff0000" }}>*</label>Mobile No</b>
            </Typography>
        </Grid>
        <Grid item sm={6}>
  <TextField
              fullWidth
              variant="outlined"
              size="small"
              onChange={(e) => {
                setMobileNo((e.target as HTMLInputElement).value);
                isSetMobileNoError(false);
                setMobileErrorText("");
              }}
              error={isMobileNoError}
              helperText={mobileErrorText}
              value={mobileNo}
            />
        </Grid>
</Grid>
</Grid>

<Grid item xs={4}>
<Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
            <Grid item sm={5}>
            <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} onClick={handleSearchClick}>
              Search
            </Button>
              </Grid>
              <Grid item sm={2}>
              <Typography variant="h6">[OR]</Typography>
              </Grid>
              <Grid item sm={5}>
              <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} >
              Create New
            </Button>
              </Grid>
              </Grid>
</Grid>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
          <Typography variant="h6">EMPLOYEE SEARCH  RESULT</Typography>
          </Grid><Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {gridEmployeeList.length === 0 ? (
                    <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    {/* <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      
                    </Grid> */}
                    <DataGrid
                      style={{
                        opacity: dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      autoHeight={true}
                      rows={gridEmployeeListTemp}
                      columns={employeeSearchResult}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...gridEmployeeList];
                        let a: EmployeeModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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

          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
          <Typography variant="h6">EMPLOYEE (ADD NEW / EDIT)</Typography>

          <Grid item xs={4} sm={5} md={12} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Employee Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              onChange={(e) => {
                setAddEmployeeName((e.target as HTMLInputElement).value);
                setAddEmployeeNameError(false);
                setAddEmployeeNameErrorText("");
              }}
              error={isAddAadharNoError}
              helperText={aadharNoErrorText}
              value={aadharNo}
            />
          </Grid>

          <Grid item xs={4} sm={5} md={12} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Mobile No</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              onChange={(e) => {
                setAddMobileNo((e.target as HTMLInputElement).value);
                isSetAddMobileNoError(false);
                setAddMobileErrorText("");
              }}
              error={isAddMobileNoError}
              helperText={addMobileErrorText}
              value={addMobileNo}
            />
          </Grid>

          <Grid item xs={4} sm={5} md={12} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Aadhar No</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              onChange={(e) => {
                setaddAadharNo((e.target as HTMLInputElement).value);
                isSetAddAadharNoError(false);
                setAddAadharNoErrorText("");
              }}
              error={isAddAadharNoError}
              helperText={addAadharNoErrorText}
              value={addAadharNo}
            />
          </Grid>

          <Grid item xs={4} sm={8} md={12}>
            
            <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
                Validate & Generate Employee ID
            </LoadingButton>
          </Grid>

          </Grid>


          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">
            MY EMPLOYEE LIST
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {employeeList.length === 0 ? (
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
                          onChangeSearch((e.target as HTMLInputElement).value);
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
                      rows={employeeListTemp}
                      columns={employeeColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        // const arrActivity = [...employeeList];
                        // let a: EmployeeModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeListPage;

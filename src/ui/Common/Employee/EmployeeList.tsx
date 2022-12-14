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
import { activityColumns, employeeColumns, employeeSearchResult } from "../../../utils/tablecolumns";
import { theme } from "../../../theme/AppTheme";
import { ActivityRoleNameModel, EmployeeModel } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { NullOrEmpty } from "../../../utils/CommonFunctions";
import { APIConverter } from "../../../utils/apiconverter";

const EmployeeListPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");

  const [employeeList, setEmployeeList] = useState<Array<EmployeeModel>>([]);
  const [employeeListTemp, setEmployeeListTemp] = React.useState<Array<any>>([]);

  const [gridEmployeeList, setGridEmployeeList] = useState<Array<EmployeeModel>>([]);
  const [gridEmployeeListTemp, setGridEmployeeListTemp] = useState<Array<EmployeeModel>>([]);


  const [employeeSearchList, setEmployeeSearchList] = useState<Array<EmployeeModel>>([]);
  const [employeeSearchListTemp, setEmployeeSearchListTemp] = React.useState<Array<any>>([]);

  const [gridEmployeeSearchList, setGridEmployeeSearchList] = useState<Array<EmployeeModel>>([]);
  const [gridEmployeeSearchListTemp, setGridEmployeeSearchListTemp] = useState<Array<EmployeeModel>>([]);

  const [mobileNo, setMobileNo] = React.useState("");
  const [mobileErrorText, setMobileErrorText] = useState("");
  const [isMobileNoError, isSetMobileNoError] = useState(false);

  const [aadharNo, setAadharNo] = React.useState("");
  const [aadharNoErrorText, setAadharNoErrorText] = useState("");
  const [isAadharNoError, isSetAadharNoError] = useState(false);

  const [employeeName, SetEmployeeName] = React.useState("");
  const [employeeNameErrorText, setEmployeeNameErrorText] = useState("");
  const [isEmployeeNameError, isSetEmployeeNameError] = useState(false);

  const [addEmployeeName, setAddEmployeeName] = React.useState("");
  const [addEmployeeNameErrorText, setAddEmployeeNameErrorText] = useState("");
  const [isAddEmployeeNameError, isSetAddEmployeeNameError] = useState(false);

  const [addAadharNo, setAddAadharNo] = React.useState("");
  const [addAadharNoErrorText, setAddAadharNoErrorText] = useState("");
  const [isAddAadharNoError, isSetAddAadharNoError] = useState(false);

  const [addMobileNo, setAddMobileNo] = React.useState("");
  const [addMobileErrorText, setAddMobileErrorText] = useState("");
  const [isAddMobileNoError, isSetAddMobileNoError] = useState(false);

  const [otp, setOtp] = React.useState<string>("");
  const [otpErrorText, setOtpErrorText] = useState("");
  const [isOtpError, isSetOtpError] = useState(false);

  const [employeeID, setEmployeeID] = React.useState<number>();

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
    setAddEmployeeName("");
    setAddMobileNo("");
    setAddAadharNo("");
    setOpen(false);
  };

  const FetchData = (type: string) => {
    // debugger;
    let params = {
      //AddedByUserID: cookies.dfc.UserID,
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_company_refno: cookies.dfc.Sess_company_refno,
        Sess_branch_refno: cookies.dfc.Sess_branch_refno,
        Sess_designation_refno: cookies.dfc.Sess_designation_refno
      }
    };
    ResetFields();
    Provider.createDFCommon(Provider.API_URLS.MyemployeeList, params)
      .then((response: any) => {
        // debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            // debugger;
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.profileStatus = a.profileStatus == 1 ? "complete" : "Incomplete";
              a.loginStatus = a.loginStatus == 1 ? "Yes" : "No";
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

  const FetchSearchData = () => {
    // debugger;
    let params = {
      // AddedByUserID: cookies.dfc.UserID,
      // AadharNo: aadharNo,
      // MobileNo: mobileNo
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        aadhar_no_s: aadharNo,
        mobile_no_s: mobileNo,
        Sess_company_refno:cookies.dfc.Sess_company_refno
      }
    };
    // debugger;
    ResetFields();
    Provider.createDFCommon(Provider.API_URLS.EmployeeSearch, params)
      .then((response: any) => {
        // debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
             debugger
            response.data.data = APIConverter(response.data.data);
            
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
            
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setGridEmployeeSearchList(arrList);
            setGridEmployeeSearchListTemp(arrList);
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
    // debugger;
    let isValid: boolean = true;

    if (aadharNo.trim() === "" && mobileNo.trim() === "") {
      isValid = false;
      isSetMobileNoError(true);
      setMobileErrorText("Please Enter Mobile No");

      isSetAadharNoError(true);
      setAadharNoErrorText("Please Enter Aadhar No");
      setActive("none");

    }

    if (isValid) {
      FetchSearchData();
      setSearchActive("inline");
    }

  };

  const handleValidateClick = () => {
    let isValid: boolean = true;

    if (addEmployeeName.trim() === "" && addMobileNo.trim() === "" && addAadharNo.trim() === "") {
      isValid = false;
      isSetAddEmployeeNameError(true);
      setAddEmployeeNameErrorText("Please Enter Employee Name");

      isValid = false;
      isSetAddMobileNoError(true);
      setAddMobileErrorText("Please Enter Mobile No");

      isValid = false;
      isSetAddAadharNoError(true);
      setAddAadharNoErrorText("please Enter Aadhar No");
    }
    if (isValid) {
      InsertUpdateData(addEmployeeName, addMobileNo, addAadharNo);
    }
  };


  const InsertUpdateData = (employeeName: string, mobileNo: string, aadharNo: string) => {
    if (actionStatus === "new") {
      let params={
        data:{
          Sess_UserRefno:  cookies.dfc.UserID,
          aadhar_no: aadharNo,
          employee_mobile_no: mobileNo,
          Sess_company_refno:  cookies.dfc.Sess_company_refno,
          Sess_branch_refno: cookies.dfc.Sess_branch_refno
        }
      }
      debugger
      Provider.createDFCommon(Provider.API_URLS.EmployeeCreate,params)
        .then((response) => {
          debugger;
          if (response.data && response.data.code === 200) {
            debugger;
            response.data.data = APIConverter(response.data.data);
            debugger;
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

  const InsertExistingEmployee = (employeeID: number) => {
    debugger;
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        employee_user_refno: employeeID,
        Sess_company_refno: cookies.dfc.Sess_company_refno,
        Sess_branch_refno: cookies.dfc.Sess_branch_refno
      }
    }
    debugger;
    Provider.createDFCommon(Provider.API_URLS.EmployeeAdd, params)
      .then((response) => {
        debugger;
        if (response.data && response.data.code === 200) {
         // response.data.data = APIConverter(response.data.data);
          debugger;
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
  };

  const SendOTP = () => {
    if (actionStatus === "new") {
      let params = {
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          employee_user_refno: employeeID,
          Sess_company_refno: cookies.dfc.Sess_company_refno,
          Sess_branch_refno: cookies.dfc.Sess_branch_refno
        }
      }
      Provider.createDFCommon(Provider.API_URLS.SendotptoEmployee, params)
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


  const SubmitVerify = () => {
    if (actionStatus === "new") {
      let params = {
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          employee_otp_no: otp,
          employee_mobile_no: 0,
          myemployee_refno: 0,
          Sess_company_refno: 0,
          Sess_branch_refno: 0
        }
      }
      Provider.createDFCommon(Provider.API_URLS.EmployeeotpVerify, {
        EmployeeID: employeeID,  
        OTP: otp,
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

  const handleSubmitVerify = () => {
    debugger;
    SubmitVerify();
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setEmployeeListTemp(employeeList);
    } else {
      setEmployeeListTemp(
        employeeList.filter((el: EmployeeModel) => {
          return el.employeeName.toString().toLowerCase().includes(query.toLowerCase()) ||
            el.mobileNo.toString().toLowerCase().includes(query.toLowerCase())
          // ||
          // el.branchName.toString().toLowerCase().includes(query.toLowerCase()) ||
          // el.departmentName.toString().toLowerCase().includes(query.toLowerCase()) ||
          // el.designationName.toString().toLowerCase().includes(query.toLowerCase())

        })
      );
    }
  };


  const setOTPDialog = () => {
    setOpen(true);
  };

  /*coding creat button toggle */
  const [active, setActive] = useState("none");
  const toggle = () => {
    if (active === "none") {
      setActive("inline")
    }
    else {
      setActive("none")
    }
  }
  /*end create button toggle*/
  /*start search toggle coding*/
  const [searchActive, setSearchActive] = useState("none");
  // const searchToggle = () =>{
  //     if(searchActive === "none")
  //     {
  //       setSearchActive("inline")
  //     }
  //     else{
  //       setSearchActive("none")
  //     }
  //   }
  /*end search toggle coding*/
  //#endregion 

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">EMPLOYEE</Typography>
          </Grid>

          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">EMPLOYEE SEARCH</Typography>
          </Grid>

        </Grid>
        <br></br>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
            <Grid item xs={4}>
              <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                <Grid item sm={6}>

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: 'right', }}>Employee Aadhar No</b>
                  </Typography>

                </Grid>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    inputProps={{
                      maxLength: 11,
                    }}
                    variant="outlined"
                    size="small"
                    type="number"
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
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} direction="row" justifyContent="center" alignItems="center">
                <Grid item sm={4}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: 'right', }}><label style={{ color: "#ff0000" }}>*</label>Mobile No</b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    inputProps={{
                      maxLength: 10,
                    }}
                    variant="outlined"
                    size="small"
                    type="number"
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

            <Grid item xs={4} direction="row" justifyContent="center" alignItems="center" >
              <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                <Grid item sm={5}>
                  <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} 
                 onClick={() => { handleSearchClick() }}
                  >
                     {/* onChange={(event)=> searchMobileNo(event.target.value)} */}
                  
                    {/* {data.map((item)=>(
                      
                    ))} */}
                  </Button>
                </Grid>
                <Grid item sm={2}>
                  <Typography variant="h6">[OR]</Typography>
                </Grid>
                <Grid item sm={5}>
                  <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} onClick={toggle}>
                    Create New
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>


        </Grid>
        <br></br>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >

          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)", display: `${searchActive}` }} >
            <Typography variant="h6">EMPLOYEE SEARCH  RESULT</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} >
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: "auto", width: "100%", marginBottom: "20px" }}>
                {gridEmployeeSearchList.length === 0 ? (
                  // <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                  <div></div>
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
                      rows={gridEmployeeSearchListTemp}
                      columns={employeeSearchResult}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                         debugger;
                        const arrActivity = [...gridEmployeeSearchList];
                        let a: EmployeeModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        InsertExistingEmployee(a.id);
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
        <br></br>


        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)", display: `${active}` }} >
          <Typography variant="h6">EMPLOYEE (ADD NEW / EDIT)</Typography>
        </Grid>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ display: `${active}` }}>
          <Grid container direction="row" alignItems="center" justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={4}>
              <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={5}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}><label style={{ color: "#ff0000" }}>*</label>Employee Name</b>
                  </Typography>
                </Grid>
                <Grid item sm={7}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setAddEmployeeName((e.target as HTMLInputElement).value);
                      isSetAddEmployeeNameError(false);
                      setAddEmployeeNameErrorText("");
                    }}
                    error={isAddEmployeeNameError}
                    helperText={addEmployeeNameErrorText}
                    value={addEmployeeName}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={5}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }} >
                    <b style={{ float: "right" }}><label style={{ color: "#ff0000" }}>*</label>Mobile No</b>
                  </Typography>
                </Grid>
                <Grid item sm={7}>
                  <TextField
                    fullWidth
                    inputProps={{
                      maxLength: 10,
                    }}
                    variant="outlined"
                    size="small"
                    type="number"
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
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={5}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}><label style={{ color: "#ff0000" }}>*</label>Aadhar No</b>
                  </Typography>
                </Grid>
                <Grid item sm={7}>
                  <TextField
                    fullWidth
                    inputProps={{
                      maxLength: 12,
                    }}
                    variant="outlined"
                    size="small"
                    // type="number"
                    onChange={(e) => {
                      setAddAadharNo((e.target as HTMLInputElement).value);
                      isSetAddAadharNoError(false);
                      setAddAadharNoErrorText("");
                    }}
                    error={isAddAadharNoError}
                    helperText={addAadharNoErrorText}
                    value={addAadharNo}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4} sm={8} md={12}>
              <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleValidateClick}>
                Validate & Generate Employee ID
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
          <Typography variant="h6">
            MY EMPLOYEE LIST
          </Typography>
        </Grid>
        <br></br>
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

                      if (param.field === 'action') {
                        // const arrActivity = [...employeeList];
                        // let a: EmployeeModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        // handelEditAndDelete((e.target as any).textContent, a);
                      }
                      else if (param.field === 'verifyStatus') {

                        const arrActivity = [...employeeList];
                        let a: EmployeeModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        setOtp(NullOrEmpty(a.otp) ? "" : a.otp.toString());
                        setEmployeeID(a.id);
                        setOTPDialog();
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
      <div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>EMPLOYEE OTP NO VERIFICATION & LOGIN ACTIVATION
          </DialogTitle>
          <DialogContent>
            {/*             <DialogContentText>Confirm to Decline?</DialogContentText> */}

            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
              <Grid item sm={5}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b style={{ float: "right" }}><label style={{ color: "#ff0000" }}>*</label>Enter OTP No</b>
                </Typography>
              </Grid>
              <Grid item sm={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    setOtp((e.target as HTMLInputElement).value);
                    isSetOtpError(false);
                    setOtpErrorText("");
                  }}
                  error={isOtpError}
                  helperText={otpErrorText}
                  value={otp}
                />
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

              <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} onClick={handleSubmitVerify}>
                Submit & Verify
              </Button>

            </Grid>


          </DialogContent>

        </Dialog>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeListPage;

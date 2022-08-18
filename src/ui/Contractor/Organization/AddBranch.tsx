import{
    Box,
    TextField,
    Button,
    Container,
    NativeSelect,
    Typography,
    Select,
    Grid,
    CircularProgress,
    MenuItem,
    InputAdornment,
    Checkbox,
    FormControl,
    FormHelperText,
    AlertColor,
    RadioGroup,
    FormControlLabel,
    Radio
    } from "@mui/material";
    import { useNavigate } from "react-router-dom";
import React, {useEffect,useState} from "react";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "../../../theme/AppTheme";
import { useCookies } from "react-cookie";
import Header from "../../../components/Header";
import DataContexts from "../../../contexts/DataContexts"
import Provider from "../../../api/Provider";
import { branchColumns } from "../../../utils/tablecolumns";
import { BranchModel } from "../../../models/Model";
import { communication } from "../../../utils/communication";
import { CityModel,BranchTypeModel,  StateModel,  } from "../../../models/Model";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { SelectChangeEvent } from "@mui/material";
    const AddBranch = () => {
        debugger;
        const [cookies, setCookie] = useCookies(["dfc"]);
        let navigate = useNavigate();
      
        useEffect(() => {
            if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
              navigate(`/login`);
          }, []);
    
    const [loading, setLoading]=useState(true);
    const [display, setDisplay ]= React.useState("Yes");
    
    // const [activityNamesList, setActivityNamesList] = React.useContext(DataContexts).activityNamesList;
    // const [activityNamesListTemp,setActivityNamesListTemp]=React.useState<Array<any>>([]);
   // const [activityNamesList, setActivityNamesList] =useState<Array<ActivityRoleNameModel>>([]);
    const [branchList, setBranchList] = useState<Array<BranchModel>>([]);
    const [branchListTemp,setBranchListTemp]=React.useState<Array<any>>([]);
  
    const [pageSize,setPageSize] =React.useState<number>(5);
    const [buttonDisplay,setButtonDisplay] = React.useState<string>("none");
    const [dataGridOpacity,setDataGridOpacity]=React.useState<number>(1);
    const [dataGridPointer,setDataGridPointer]= React.useState<"auto"|"none">("auto");
    const [actionStatus, setActionStatus]=React.useState<string>("new");
    const [selectedID,setSelectedID] = React.useState<number>(0);
    const [open,setOpen]=React.useState(false);
    const [snackMsg,setSnackMsg] =React.useState("");
    const [buttonLoading,setButtonLoading] =useState(false);
    const [searchQuery, setSearchQuery] =useState("");

    const [state, setState] = useState("--Select--");
  const [stateID, setStateID] = useState<number>(0);
  const [stateError, setStateError] = useState("");
  const [isStateError, setIsStateError] = useState(false);
  const [stateNameList, setStateNameList] = useState<Array<StateModel>>([]);

  const [city, setCity] = useState("--Select--");
  const [cityID, setCityID] = useState<number>(0);
  const [cityError, setCityError] = useState("");
  const [isCityError, setIsCityError] = useState(false);
  const [cityNameList, setCityNameList] = useState<Array<CityModel>>([]);

  const [branchType, setBranchType] = useState("--Select--");
  const [branchTypeID, setBranchTypeID] = useState<number>(0);
  const [branchTypeError, setBranchTypeError] = useState("");
  const [isbranchTypeError, isSetBranchTypeError] = useState(false);
  const [branchTypeList, setBranchTypeList] = useState<Array<BranchTypeModel>>([]);

  const [assignBranchAdmin, setAssignBranchAdmin] = useState("--Select--");
  const [assignBranchAdminID, setAssignBranchAdminID] = useState<number>(0);
  const [assignBranchAdminError, setAssignBranchAdminError] = useState("");
  const [isAssignBranchAdminError, isSetAssignBranchAdminError] = useState(false);
  const [assignBranchAdminList, setAssignBranchAdminList] = useState<Array<BranchTypeModel>>([]);

  const [companyName, setCompanyName] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [isCompanyError, setIsCompanyError] = useState(false);

  const [branchName, setBranchName] = useState("");
  const [branchError, setBranchError] = useState("");
  const [isBranchError, setIsBranchError] = useState(false);

  const [accountNo, setAccountNo] = useState("");
  const [accountNoError, setAccountNoError] = useState("");
  const [isAccountNoError, setIsAccountNoError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isAddressError, setIsAddressError] = useState(false);

  const [bankName, setBankName] = useState("");
  const [bankNameError, setbankNameError] = useState("");
  const [isBankNameError, setIsBankNameError] = useState(false);

  const [bankBranchName, setBankBranchName] = useState("");
  const [bankBranchNameError, setBankBranchNameError] = useState("");
  const [isBankBranchNameError, setIsBankBranchNameError] = useState(false);

  const [contactPerson, setContactPerson] = useState("");
  const [contactPersonError, setContactPersonError] = useState("");
  const [isContactPersonError, setIsContactPersonError] = useState(false);

  const [mobile, setMobile] = useState<string>("");
  const [mobileError, setMobileError] = useState("");
  const [isMobileError, setIsMobileError] = useState(false);

  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isPincodeError, setIsPincodeError] = useState(false);

  const [gst, setGst] = useState("");
  const [gstError, setGstError] = useState("");
  const [isGstError, setIsGstError] = useState(false);

  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");
  const [isPanError, setIsPanError] = useState(false);

  const [ifsc, setIfsc] = useState("");
  const [ifscError, setIfscError] = useState("");
  const [isIfscError, setIsIfscError] = useState(false);

  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  

  
  useEffect(() => {
    //FetchBranchData();
    FetchStates();
    //FetchCity();
  }, []);
  
    
      const FetchStates = () => {
        Provider.getAll("master/getstates")
          .then((response: any) => {
            if (response.data && response.data.code === 200) {
              if (response.data.data) {
                setStateNameList(response.data.data);
              }
            }
          })
          .catch((e) => {});
      };
    
      const FetchCity = (stateID) => {
        let params = {
          ID: stateID,
        };
        Provider.getAll(`master/getcitiesbyid?${new URLSearchParams(GetStringifyJson(params))}`)
          .then((response: any) => {
            debugger;
            if (response.data && response.data.code === 200) {
              if (response.data.data) {
                setCityNameList(response.data.data);
              }
            }
          })
          .catch((e) => {});
      };
    
      // const FetchBranchData = () => {
      //   ResetFields();
      //   Provider.getAll("master/getactivityroles") 
      //     .then((response: any) => {
      //       if (response.data && response.data.code === 200) {
      //         if (response.data.data) {
      //           const arrList = [...response.data.data];
      //           arrList.map(function (a: any, index: number) {
      //             a.display = a.display ? "Yes" : "No";
      //             let sr = { srno: index + 1 };
      //             a = Object.assign(a, sr);
      //           });
      //           setBranchList(response.data.data);
      //           setBranchListTemp(response.data.data);
      //         }
      //       } else {
      //         // setSnackMsg(communication.Error);
      //         // setOpen(true);
      //       }
      //       setLoading(false);
      //     })
      //     .catch((e) => {
      //       setLoading(false);
      //       setSnackMsg(communication.NetworkError);
      //       setOpen(true);
      //     });
      //   // eslint-disable-next-line react-hooks/exhaustive-deps
      // };

      const FetchBranchData = (type: string) => {
        let params = {
          UserID: cookies.dfc.UserID,
        };
        Provider.getAll(`master/getuserprofile?${new URLSearchParams(GetStringifyJson(params))}`)
          .then((response: any) => {
            debugger;
            if (response.data && response.data.code === 200) {
              if (response.data.data) {
                const arrList = [...response.data.data];
    
                // setUserID(arrList[0].userID);
                setCompanyName(arrList[0].companyName);
                setBranchName(arrList[0].branchName)
                setAccountNo(arrList[0].accountNo)
                setAddress(arrList[0].address)
                setBankName(arrList[0].bankname)
                setBankBranchName(arrList[0].profileA)
                setContactPerson(arrList[0].contactPersonName);
                setState(arrList[0].stateName);
                setStateID(arrList[0].stateID);
                if (arrList[0].stateID > 0) {
                  debugger;
                  FetchCity(arrList[0].stateID);
                  setCity(arrList[0].cityName);
                  setCityID(arrList[0].cityID);
                }
                setIfsc(arrList[0].ifsc);
                setGst(arrList[0].gstNumber);
                setPan(arrList[0].pan);
                setPincode(arrList[0].pincode);
              
                if (type !== "") {
                  setSnackMsg("Branch" + type);
                  setOpen(true);
                  setSnackbarType("success");
                }
              }
            } else {
              setSnackMsg(communication.NoData);
              setOpen(true);
              setSnackbarType("info");
            }
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            setSnackMsg(communication.NetworkError);
            setSnackbarType("error");
            setOpen(true);
          });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      };

      const handleSubmitClick = () => {
        debugger;
        let isValid: Boolean = true;
    
        if (companyName.trim() === "") {
          isValid = false;
          setIsCompanyError(true);
          setCompanyError(communication.BlankCompanyName);
        }
        if (branchName.trim() === "") {
          isValid = false;
          setIsCompanyError(true);
          setCompanyError(communication.BlankBranchName);
        }

        if (accountNo.trim() === "") {
          isValid = false;
          setIsCompanyError(true);
          setCompanyError(communication.BlankAccountNo);
        }

        if (branchType.trim() === "") {
          isValid = false;
          setIsCompanyError(true);
          setCompanyError(communication.BlankBranchType);
        }
        if (assignBranchAdmin.trim() === "") {
          isValid = false;
          setIsCompanyError(true);
          setCompanyError(communication.BlankAssignBranchAdmin);
        }

        if (address.trim() === "") {
          isValid = false;
          setIsCompanyError(true);
          setCompanyError(communication.BlankAddress);
        }

        if (bankName.trim() === "") {
          isValid = false;
          setIsCompanyError(true);
          setCompanyError(communication.BlankBankName);
        }

        if (bankBranchName.trim() === "") {
          isValid = false;
          setIsCompanyError(true);
          setCompanyError(communication.BlankBankName);
        }

        if (contactPerson.trim() === "") {
          isValid = false;
          setIsContactPersonError(true);
          setContactPersonError(communication.BlankContactPerson);
        }
    
        if (ifsc.trim() === "") {
          isValid = false;
          setIsMobileError(true);
          setMobileError(communication.BlankIfscCode);
        }
    
        if (state.trim() === "--Select--") {
          isValid = false;
          setIsStateError(true);
          setStateError(communication.BlankState);
        }
    
        if (city.trim() === "--Select--") {
          isValid = false;
          setIsCityError(true);
          setCityError(communication.BlankCity);
        }
    
        if (pincode.toString().trim() === "") {
          isValid = false;
          setIsPincodeError(true);
          setPincodeError(communication.BlankBrandPrefix);
        }
    
        if (gst.trim() === "") {
          isValid = false;
          setIsGstError(true);
          setGstError(communication.BlankGst);
        }
    
        if (pan.trim() === "") {
          isValid = false;
          setIsPanError(true);
          setPanError(communication.BlankPan);
        }
        debugger;
        if (isValid) {
          //InsertUpdateData();
        }
      };

      // const InsertUpdateData = () => {
      //   debugger;
      //   if (actionStatus === "new") {
      //     Provider.create("master/insertuserprofile", {
      //       UserType:userType,
      //       UserID: userID,
      //       CompanyID:,
      //       BranchTypeID:,
      //       BranchAdminID:,
      //       ContactpersonNo:,
      //       GSTNo:,
      //       PANNo:,
      //       Dispaly:,
      //       LocationName:,
      //       Address:,
      //       StateID:,
      //       CityId:,
      //       Pincode:,
      //       AccountNo:,
      //       BankName:,
      //       bankBranchName:,
            
      //     })
      //       .then((response) => {
      //         debugger;
      //         if (response.data && response.data.code === 200) {
      //           //FetchData("added");
      //         } else {
      //           setSnackMsg(communication.Error);
      //           setSnackbarType("error");
      //           setOpen(true);
      //         }
      //       })
      //       .catch((e) => {
      //         debugger;
    
      //         setSnackMsg(communication.NetworkError);
      //         setSnackbarType("error");
      //         setOpen(true);
      //       });
      //   }
      // };
     
      const handleSNChange = (event: SelectChangeEvent) => {
        debugger;
        let stateName: string = event.target.value;
        let ac = stateNameList.find((el) => el.stateName === stateName);
        if (ac !== undefined) {
          setState(stateName);
          setStateID(ac?.id);
          setIsStateError(false);
          setStateError("");
          FetchCity(ac.id);
        }
      };
    
      const handleCNChange = (event: SelectChangeEvent) => {
        debugger;
        let cityName: string = event.target.value;
        let ac = cityNameList.find((el) => el.cityName === cityName);
        if (ac !== undefined) {
          setCity(cityName);
          setCityID(ac?.id);
          setIsCityError(false);
          setCityError("");
        }
      };

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
    
     
      const onChangeSearch = (query: string) => { 
        setSearchQuery(query);
        if (query === "") {
          // setBranchListTemp(branchList);
        } else {
          // setBranchListTemp(
          //   branchList.filter((el: BranchModel) => {
          //     return el.BranchModel.toString().toLowerCase().includes(query.toLowerCase());
          //   })
          // );
        }
      };
    
      //   const handelEditAndDelete = (
      //     type: string | null,
      //     a: BranchModel | undefined
      //   ) => {
      //     if (type?.toLowerCase() === "edit" && a !== undefined) {
      //       setDataGridOpacity(0.3);
      //       setDataGridPointer("none");
      //       setDisplay(a.display);
      //       setBranchList(a?.BranchModel);
      //       setSelectedID(a.id);
      //       setBranchError("");
      //       isSetBranchError(false);
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
      // };
     
return(
    <Box sx={{mt:11}}>
        <Header/>
        <Container maxWidth="lg">
            <Grid container spacing={{ xs:1,md:2}} columns={{xs:4,sm:9,md:12}}>
                <Grid item xs={4} sm={8} md={12}>
                    <Typography variant="h4" >Add Branch</Typography>
                </Grid>
            </Grid>
            <br></br>
           <Grid container spacing={{ xs:1,md:2}} columns={{xs:4,sm:9,md:12}}>
                <Grid item sm={4}>
                    <Typography variant="h6">BRANCH DETAILS </Typography>
                    <hr style={{width:'360px',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:"solid",}}/>
                </Grid>
                <Grid item sm={4}>
                    <Typography variant="h6">LOCATION DETAILS </Typography>
                    <hr style={{width:'360px',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:"solid",}}/>
                </Grid>
                <Grid item sm={4}>
                    <Typography variant="h6">BANK DETAILS </Typography>
                    <hr style={{width:'360px',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:"solid",}}/>
                </Grid>
           </Grid>
           <br></br>
           <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:9,md:12}}>
           <Grid item sm={2}> 
            <label><label style={{ color: "#ff0000" }}>*</label> Company/Firm Name</label>
          </Grid>
          <Grid item sm={2}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            <Grid item sm={2}> 
            <label><label style={{ color: "#ff0000" }}>*</label> Branch / location name</label>
          </Grid>
          <Grid item sm={2}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            <Grid item sm={2}> 
            <label> Account No</label>
          </Grid>
          <Grid item sm={2}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:9,md:12}}>
           <Grid item sm={2}> 
            <label><label style={{ color: "#ff0000" }}>*</label> Branch Type</label>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth size="small" error={isbranchTypeError}>
              <Select value={branchType} onChange={handleCNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {branchTypeList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.branchType}>
                      {item.branchType}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{branchTypeError}</FormHelperText>
            </FormControl>
            </Grid>
            <Grid item sm={2}> 
            <label>Address</label>
          </Grid>
          <Grid item sm={2}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            <Grid item sm={2}> 
            <label> Bank Name</label>
          </Grid>
          <Grid item sm={2}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:9,md:12}}>
           <Grid item sm={2}> 
            <label> Assign Branch Admin</label>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth size="small" error={isAssignBranchAdminError}>
              <Select value={city} onChange={handleCNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {assignBranchAdminList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.assignBranch}>
                      {item.assignBranch}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{assignBranchAdminError}</FormHelperText>
            </FormControl>
            </Grid>
            <Grid item sm={2}> 
            <label>State</label>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth size="small" error={isStateError}>
              <Select value={city} onChange={handleCNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {stateNameList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.stateName}>
                      {item.stateName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{stateError}</FormHelperText>
            </FormControl>
            </Grid>
            <Grid item sm={2}> 
            <label> Bank  Branch Name</label>
          </Grid>
          <Grid item sm={2}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:9,md:12}}>
           <Grid item sm={2}> 
            <label> Contact Person No</label>
          </Grid>
          <Grid item sm={2}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            <Grid item sm={2}> 
            <label> City</label>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth size="small" error={isCityError}>
              <Select value={city} onChange={handleCNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {cityNameList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.cityName}>
                      {item.cityName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{cityError}</FormHelperText>
            </FormControl>
            </Grid>
            <Grid item sm={2}> 
            <label> IFSC Code</label>
          </Grid>
          <Grid item sm={2}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:9,md:12}}>
           <Grid item sm={2}> 
            <label> GST No</label>
          </Grid>
          <Grid item sm={2}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            <Grid item sm={2}> 
            <label> Pincode</label>
          </Grid>
          <Grid item sm={2}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:9,md:12}}>
           <Grid item sm={2}> 
            <label> PAN No</label>
          </Grid>
          <Grid item sm={2}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:9,md:12}}>
           <Grid item sm={2}> 
            <label> Display</label>
          </Grid>
          <Grid item sm={2}>
               {/* <Checkbox></Checkbox> */}
               <FormControl>
              <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:10,md:15}} style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
        <Grid > 
          <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}>Submit</Button>
        </Grid>
            </Grid>  
            <br></br>
            <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:9,md:12}}>
            <Grid item xs={4} sm={8} md={12}>           
                <Typography variant="h6">My Branch List</Typography>
                <hr style={{width:'360',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:"solid"}}></hr>
            </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:9,md:12}}>
    {/* <Grid item sm={4}>
        <Typography variant="h6"><b>Show</b>&nbsp;<NativeSelect></NativeSelect>&nbsp;entries</Typography>
    </Grid> */}
</Grid>
        <Grid item xs={4} sm={8} md={12}>
            {loading ? (
                <Box
                height="300px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{m:2}}
                >
                    <CircularProgress/>
                </Box>
            ) : (
                <div style={{height:500, width:"100%",marginBottom:"20px"}}>
                    {branchList.length === 0 ? (
                        <></>
                    ) :(
                        <>
                        <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        //sx={{justifySelf:"flex-end"}}
                        onChange={(e) => {
                          onChangeSearch((e.target as HTMLInputElement).value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              < SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                       </Grid>
                      <DataGrid
                      style={{
                        opacity:dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      rows={branchListTemp}
                      columns={branchColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      // onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                      //   const arrActivity = [...branchList];
                      //   let a: BranchModel | undefined =
                      //     arrActivity.find((el) => el.id === param.row.id);
                        //handelEditAndDelete((e.target as any).textContent, a);
                      // }}
                      sx={{
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        },
                        mb: 1
                      }}  
                    />
                </>
                )}
            </div>
            )}
            </Grid>
        </Container>

    </Box>
)
        };


export default AddBranch;
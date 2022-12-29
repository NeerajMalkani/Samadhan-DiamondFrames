import { Alert, AlertColor, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography, Autocomplete, FormHelperText, FormGroup, Checkbox } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../api/Provider";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { communication } from "../../../utils/communication";
import { clientListColumns, clientSearchResult } from "../../../utils/tablecolumns";
import { theme } from "../../../theme/AppTheme";
import { ClientModel, ClientSearchModel } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { NullOrEmpty } from "../../../utils/CommonFunctions";
import { retrunSumID } from "../../../utils/JSCommonFunction";
import { APIConverter } from "../../../utils/apiconverter";
import { Cookie } from "@mui/icons-material";

let st_ID = 0,
  ct_ID = 0;

const ClientList = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, [cookies, navigate]);

  //  #region variable

  const [loading, setLoading] = useState(true);

  const [companyName, setCompanyName] = React.useState("");
  const [companyNameErrorText, setCompanyNameErrorText] = useState("");
  const [isCompanyNameError, isSetCompanyNameError] = useState(false);

  const [contactPerson, setContactPerson] = useState("");
  const [contactPersonErrorText, setContactPersonErrorText] = useState("");
  const [isContactPersonError, isSetContactPersonError] = useState(false);

  const [contactMobileNo, setContactMobileNo] = React.useState("");
  const [contactMobileNoErrorText, setContactMobileNoErrorText] = useState("");
  const [isContactMobileNoError, isSetContactMobileNoError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressErrorText, setAddressErrorText] = useState("");
  const [isAddressError, isSetAddressError] = useState(false);

  const [stateError, setStateError] = useState("");
  const [isStateError, setIsStateError] = useState(false);
  const [selectedStateName, setSelectedStateName] = useState("");
  const [selectedStateID, setSelectedStateID] = useState(0);
  const [statesFullData, setStatesFullData] = useState([]);

  const [cityError, setCityError] = useState("");
  const [isCityError, setIsCityError] = useState(false);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedCityID, setSelectedCityID] = useState(0);
  const [cityFullData, setCityFullData] = useState([]);

  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isPincodeError, setIsPincodeError] = useState(false);

  const [gst, setGst] = useState("");
  const [gstError, setGstError] = useState("");
  const [isGstError, setIsGstError] = useState(false);

  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");
  const [isPanError, setIsPanError] = useState(false);

  const serviceType = useState([
    { key: "Vendor", isSelected: false, id: 14 },
    { key: "Supplier", isSelected: false, id: 13 },
    { key: "Client", isSelected: false, id: 8 },
  ]);

  const isSPRError = useState(false);
  const sprError = useState("");

  const [display, setDisplay] = React.useState("Yes");

  // reseting variables up
  const [clientList, setClientList] = useState<Array<ClientModel>>([]);
  const [clientListTemp, setClientListTemp] = React.useState<Array<any>>([]);

  const [gridClientSearchList, setGridClientSearchList] = useState<Array<ClientSearchModel>>([]);
  const [gridClientSearchListTemp, setGridClientSearchListTemp] = useState<Array<ClientSearchModel>>([]);

  const [mobileNo, setMobileNo] = React.useState("");
  const [mobileNOErrorText, setMobileNOErrorText] = useState("");
  const [isMobileNoError, isSetMobileNoError] = useState(false);

  const [addCompanyName, setAddCompanyName] = React.useState("");
  const [addCompanyNameErrorText, setAddCompanyNameErrorText] = useState("");
  const [isAddCompanyNameError, isSetAddCompanyNameError] = useState(false);

  const [serviceProvider, setServiceProvider] = useState("Yes");

  const [clientID, setClientID] = React.useState<number>();

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
  //#endregion

  //#region Functions
  useEffect(() => {
    FetchData("");
    FetchStates();
  }, []);

  const ResetFields = () => {
    setCompanyName("");
    setMobileNo("");
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
    setAddCompanyName("");
    setContactPerson("");
    setContactMobileNo("");
    setAddress("");
    setPincode("");
    setGst("");
    setPan("");
    setDisplay("");
    serviceType[1]([
      { key: "Vendor", isSelected: false, id: 14 },
      { key: "Supplier", isSelected: false, id: 13 },
      { key: "Client", isSelected: false, id: 8 },
    ]);
    setServiceProvider("");
    setOpen(false);

    setSelectedStateName("");
    setSelectedStateID(0);
    setCityFullData([]);
    setSelectedCityName("");
    setSelectedCityID(0);
    setStatesFullData([]);
  };

  const FetchData = (type: string) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
        client_user_refno: "all",
      },
    };
    ResetFields();
    Provider.createDFCommon(Provider.API_URLS.MyClientUserRefNoCheck, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.id = a.myclient_refno;
              a.display = a.display ? "Yes" : "No";
              a.addedBy = a.createbyID !== "0" ? "Create" : "Add";
              a.serviceType = a.client_role_refno;
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
              return a;
            });
            setClientList(arrList);
            setClientListTemp(arrList);
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
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const FetchStates = () => {
    Provider.createDFAdmin(Provider.API_URLS.GetStateEWayBillForm)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const stateData: any = [];
            response.data.data.map((data: any, i: number) => {
              stateData.push({
                id: data.stateID,
                label: data.stateName,
              });
            });

            setStatesFullData(stateData);
            setSelectedStateID(st_ID);
            if (st_ID > 0) {
              let a = stateData.filter((el) => {
                return el.id === st_ID;
              });
              setSelectedStateName(a[0].label);
            }
          }

          FetchCities(st_ID);
        }
      })
      .catch((e) => {});
  };

  const FetchCities = (stateID: number) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        state_refno: stateID,
      },
    };
    Provider.createDFCommon(Provider.API_URLS.DistrictDetails, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const cityData: any = [];
            response.data.data.map((data: any, i: number) => {
              cityData.push({
                id: data.cityID,
                label: data.cityName,
              });
              return null;
            });
            setCityFullData(cityData);
            setSelectedCityID(ct_ID);
            if (ct_ID > 0) {
              let a = cityData.filter((el) => {
                return el.id === ct_ID;
              });
              setSelectedCityName(a[0].label);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchSearchData = () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        mobile_no_s: mobileNo,
        company_name_s: companyName,
      },
    };
    ResetFields();
    Provider.createDFCommon(Provider.API_URLS.ClientSearch, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.id = index;
              a.companyName = a.Search_company_name;
              a.contactMobileNumber = a.Search_mobile_no;
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
              return null;
            });

            setGridClientSearchList(arrList);
            setGridClientSearchListTemp(arrList);
          }
        } else {
          setSnackbarType("info");
          setSnackMsg(communication.NoData);
          setOpen(true);
          setGridClientSearchList([]);
          setGridClientSearchListTemp([]);
        }

        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarType("error");
        setSnackMsg(communication.NetworkError);
        setOpen(true);
        setGridClientSearchList([]);
        setGridClientSearchListTemp([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleSearchClick = () => {
    let isValid: boolean = true;

    if (companyName.trim() === "" && mobileNo.trim() === "") {
      isValid = false;
      isSetCompanyNameError(true);
      setCompanyNameErrorText("Please Enter Company Name");

      isSetMobileNoError(true);
      setMobileNOErrorText("Please Enter Mobile No");
      setActive("none");
    }

    if (isValid) {
      FetchSearchData();
      setSearchActive("inline");
    }
  };

  const handleSubmitClick = () => {
    let isValid: boolean = true;

    if (addCompanyName.trim() === "") {
      isValid = false;
      isSetAddCompanyNameError(true);
      setAddCompanyNameErrorText("Please Enter Company Name");
    }

    if (contactMobileNo.trim() === "") {
      isValid = false;
      isSetContactMobileNoError(true);
      setContactMobileNoErrorText("please Enter Mobile No");
    }

    if (address.trim() === "") {
      isValid = false;
      isSetAddressError(true);
      setAddressErrorText("please Enter Address ");
    }

    if (NullOrEmpty(selectedStateID) === true || selectedStateID === 0) {
      isValid = false;
      setIsStateError(true);
      setStateError("please Enter State");
    }

    if (NullOrEmpty(selectedCityID) === true || selectedCityID === 0) {
      isValid = false;
      setIsCityError(true);
      setCityError("please Enter City");
    }

    let blankData = serviceType[0].filter((el) => el.isSelected);

    if (isValid) {
      InsertUpdateData(blankData.length === 0 ? "" : blankData);
    }
  };

  const InsertUpdateData = (serviceType: any) => {
    let arrServiceTypeRole = [];
    serviceType.map((k) => {
      if (k.isSelected) {
        arrServiceTypeRole.push(k.id);
      }
    });
    const params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        company_name: addCompanyName,
        contact_person: contactPerson,
        contact_person_mobile_no: contactMobileNo,
        address: address,
        state_refno: selectedStateID,
        district_refno: selectedCityID,
        pincode: pincode,
        gst_no: gst,
        pan_no: pan,
        client_role_refno: arrServiceTypeRole.join(","),
        buyercategory_refno: "0",
        view_status: NullOrEmpty(display) ? false : display === "Yes" ? true : false,
      },
    };
    if (actionStatus === "new") {
      Provider.createDFCommon(Provider.API_URLS.ClientCreate, params)
        .then((response) => {
          if (response.data && response.data.code === 200) {
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

  const InsertExistingClient = (ID: string) => {
    const params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        client_user_refno: ID,
      },
    };
    Provider.createDFCommon(Provider.API_URLS.ClientAdd, params)
      .then((response) => {
        ResetFields();
        if (response.data && response.data.code === 200) {
          setGridClientSearchList([]);
          setGridClientSearchListTemp([]);
          FetchData("added");
          setSnackMsg("Client added successfully");
          setSnackbarType("success");
        } else {
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
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setClientListTemp(clientList);
    } else {
      setClientListTemp(
        clientList.filter((el: ClientModel) => {
          return (
            el.pan.toString().toLowerCase().includes(query.toLowerCase()) ||
            el.addressLine.toString().toLowerCase().includes(query.toLowerCase()) ||
            el.gstNumber.toString().toLowerCase().includes(query.toLowerCase()) ||
            el.companyName.toString().toLowerCase().includes(query.toLowerCase()) ||
            el.contactPersonName.toString().toLowerCase().includes(query.toLowerCase()) ||
            el.Mobile.toString().toLowerCase().includes(query.toLowerCase()) ||
            el.addedBy.toString().toLowerCase().includes(query.toLowerCase())
          );
        })
      );
    }
  };

  const setOTPDialog = () => {
    setOpen(true);
  };

  const [active, setActive] = useState("none");
  const toggle = () => {
    if (active === "none") {
      setActive("inline");
    } else {
      setActive("none");
    }
  };

  const [searchActive, setSearchActive] = useState("none");

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">CLIENT</Typography>
          </Grid>

          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">CLIENT SEARCH</Typography>
          </Grid>
        </Grid>
        <br></br>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4}>
              <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>Name /Company Name</b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setCompanyName((e.target as HTMLInputElement).value);
                      isSetCompanyNameError(false);
                      setCompanyNameErrorText("");
                    }}
                    error={isCompanyNameError}
                    helperText={companyNameErrorText}
                    value={companyName}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} direction="row" justifyContent="center" alignItems="center">
                <Grid item sm={4}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>
                      <label style={{ color: "#ff0000" }}>*</label>Mobile No
                    </b>
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
                      setMobileNOErrorText("");
                    }}
                    error={isMobileNoError}
                    helperText={mobileNOErrorText}
                    value={mobileNo}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4} direction="row" justifyContent="center" alignItems="center">
              <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={5}>
                  <Button
                    variant="contained"
                    sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
                    onClick={() => {
                      handleSearchClick();
                    }}
                  >
                    Search
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
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)", display: `${searchActive}` }}>
            <Typography variant="h6">CLIENT SEARCH RESULT</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: "auto", width: "100%", marginBottom: "20px" }}>
                {gridClientSearchList.length === 0 ? (
                  <div></div>
                ) : (
                  <>
                    <DataGrid
                      style={{
                        opacity: dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      autoHeight={true}
                      rows={gridClientSearchListTemp}
                      columns={clientSearchResult}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...gridClientSearchList];
                        let a: ClientSearchModel | undefined = arrActivity.find((el) => el.Search_user_refno === param.row.Search_user_refno);
                        InsertExistingClient(a.Search_user_refno);
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

        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)", display: `${active}` }}>
          <Typography variant="h6"> CLIENT(ADD NEW / EDIT)</Typography>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ display: `${active}` }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>
                      <label style={{ color: "#ff0000" }}>*</label>Name /Company Name
                    </b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setAddCompanyName((e.target as HTMLInputElement).value);
                      isSetAddCompanyNameError(false);
                      setAddCompanyNameErrorText("");
                    }}
                    error={isAddCompanyNameError}
                    helperText={addCompanyNameErrorText}
                    value={addCompanyName}
                  />
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>
                      <label style={{ color: "#ff0000" }}>*</label>Contact Mobile No
                    </b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setContactMobileNo((e.target as HTMLInputElement).value);
                      isSetContactMobileNoError(false);
                      setContactMobileNoErrorText("");
                    }}
                    error={isContactMobileNoError}
                    helperText={contactMobileNoErrorText}
                    value={contactMobileNo}
                  />
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>
                      <label style={{ color: "#ff0000" }}>*</label>State
                    </b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <FormControl fullWidth size="small" error={isStateError}>
                    <Autocomplete
                      disablePortal
                      fullWidth
                      options={statesFullData}
                      onChange={(event: React.SyntheticEvent, value: any) => {
                        setIsStateError(false);
                        setStateError("");
                        if (value !== null) {
                          setSelectedStateName(value.label);
                          setSelectedStateID(value.id);
                          setCityFullData([]);
                          setSelectedCityName("");
                          setSelectedCityID(0);
                          FetchCities(value.id);
                        }
                      }}
                      value={selectedStateName}
                      renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isStateError} helperText={stateError} />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>Pin Code</b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setPincode((e.target as HTMLInputElement).value);
                      setIsPincodeError(false);
                      setPincodeError("");
                    }}
                    error={isPincodeError}
                    helperText={pincodeError}
                    value={pincode}
                  />
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>PAN No</b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setPan((e.target as HTMLInputElement).value);
                      setIsPanError(false);
                      setPanError("");
                    }}
                    error={isPanError}
                    helperText={panError}
                    value={pan}
                  />
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>Dispaly</b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <FormControl>
                    <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={5}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>Contact Person</b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setContactPerson((e.target as HTMLInputElement).value);
                      isSetContactPersonError(false);
                      setContactPersonErrorText("");
                    }}
                    error={isContactPersonError}
                    helperText={contactPersonErrorText}
                    value={contactPerson}
                  />
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={5}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>
                      <label style={{ color: "#ff0000" }}>*</label>Address
                    </b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setAddress((e.target as HTMLInputElement).value);
                      isSetAddressError(false);
                      setAddressErrorText("");
                    }}
                    error={isAddressError}
                    helperText={addressErrorText}
                    value={address}
                  />
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={5}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>
                      <label style={{ color: "#ff0000" }}>*</label>City
                    </b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <FormControl fullWidth size="small" error={isCityError}>
                    <Autocomplete
                      disablePortal
                      fullWidth
                      options={cityFullData}
                      // sx={{ width: 300 }}
                      onChange={(event: React.SyntheticEvent, value: any) => {
                        setIsCityError(false);
                        setCityError("");
                        if (value !== null) {
                          setSelectedCityName(value.label);
                          setSelectedCityID(value.id);
                        }
                      }}
                      value={selectedCityName}
                      renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isCityError} helperText={cityError} />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={5}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>GST No</b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setGst((e.target as HTMLInputElement).value);
                      setIsGstError(false);
                      setGstError("");
                    }}
                    error={isGstError}
                    helperText={gstError}
                    value={gst}
                  />
                </Grid>
              </Grid>
              <br></br>

              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                <Grid item sm={5}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b style={{ float: "right" }}>Service Provider Role</b>
                  </Typography>
                </Grid>
                <Grid item sm={7}>
                  <FormControl component="fieldset" error={isSPRError[0]}>
                    <FormGroup aria-label="position" row>
                      {serviceType[0].map((data, index) => {
                        return (
                          <FormControlLabel
                            value={data.id}
                            control={
                              <Checkbox
                                checked={data.isSelected}
                                tabIndex={-1}
                                onClick={() => {
                                  isSPRError[1](false);
                                  sprError[1]("");
                                  const newChecked = [...serviceType[0]];
                                  newChecked.find((item) => {
                                    if (item.id === data.id) {
                                      item.isSelected = !item.isSelected;
                                    }
                                  });
                                  serviceType[1](newChecked);
                                }}
                              />
                            }
                            label={data.key}
                            labelPlacement="end"
                          />
                        );
                      })}
                    </FormGroup>
                    <FormHelperText>{sprError[0]}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4} sm={8} md={12}>
              <Grid item xs={4} sm={8} md={12}>
                <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
          <Typography variant="h6">MY CLIENT LIST</Typography>
        </Grid>
        <br></br>
        <Grid item xs={4} sm={8} md={12}>
          {loading ? (
            <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
              {clientList.length === 0 ? (
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
                            <GridSearchIcon />
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
                    rowHeight={80}
                    rows={clientListTemp}
                    columns={clientListColumns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    disableSelectionOnClick
                    onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                      if (param.field === "action") {
                        const arrActivity = [...clientList];
                        let a: ClientModel | undefined = arrActivity.find((el) => el.client_user_refno === param.row.client_user_refno);
                        // handelEditAndDelete((e.target as any).textContent, a);
                      } else if (param.field === "verifyStatus") {
                        const arrActivity = [...clientList];
                        let a: ClientModel | undefined = arrActivity.find((el) => el.client_user_refno === param.row.client_user_refno);
                        // setOtp(NullOrEmpty(a.otp) ? "" : a.otp.toString());
                        setClientID(a.client_user_refno);
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
        {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>EMPLOYEE OTP NO VERIFICATION & LOGIN ACTIVATION
                    </DialogTitle>
                    <DialogContent>
                                    <DialogContentText>Confirm to Decline?</DialogContentText>

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

                </Dialog> */}
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientList;

import { Box, TextField, Button, Container, FormControl, FormControlLabel, Typography, Radio, RadioGroup, Select, Autocomplete, Grid, Menu, Snackbar, MenuItem, AlertColor, CircularProgress, Checkbox, FormGroup, InputAdornment, FormHelperText } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { theme } from "../../../theme/AppTheme";
import { useCookies } from "react-cookie";
import ModeIcon from "@mui/icons-material/Mode";
import { communication } from "../../../utils/communication";
import CheckIcon from "@mui/icons-material/Check";
import { ArrowDropDown, FormatAlignJustify } from "@mui/icons-material";
import { border } from "@mui/system";
import { GetStringifyJson, NullOrEmpty } from "../../../utils/CommonFunctions";
import { CityModel, CompanyModel, StateModel, UserModel, UserProfile, ClientModel } from "../../../models/Model";
import Provider from "../../../api/Provider";
import { SelectChangeEvent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { clientListColumns, clientSearchResult } from "../../../utils/tablecolumns";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { retrunSumID } from "../../../utils/JSCommonFunction";
import { APIConverter } from "../../../utils/apiconverter";

let st_ID = 0,
  ct_ID = 0;

const ClientEdit = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);

  //#region Variables
  const [loading, setLoading] = useState(true);
  const [clientID, setClientID] = React.useState<number>(0);

  const [addCompanyName, setAddCompanyName] = React.useState("");
  const [addCompanyNameErrorText, setAddCompanyNameErrorText] = useState("");
  const [isAddCompanyNameError, isSetAddCompanyNameError] = useState(false);

  let [inputEnable, setInputEnable] = useState(false);

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
  const [isGstError, isSetGstError] = useState(false);

  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");
  const [isPanError, isSetPanError] = useState(false);

  const serviceType = useState([
    { key: "Vendor", isSelected: false, id: 1 },
    { key: "Supplier", isSelected: false, id: 2 },
    { key: "Client", isSelected: false, id: 3 },
  ]);

  const isSPRError = useState(false);
  const sprError = useState("");

  const [display, setDisplay] = React.useState("Yes");

  //variables rearrange
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [myUserNameList, setMyUserNameList] = useState<Array<UserModel>>([]);
  const [myUserNameListTemp, setMyUserNameListTemp] = useState<Array<UserModel>>([]);

  const [snackMsg, setSnackMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const [clientList, setClientList] = useState<Array<ClientModel>>([]);
  const [clientListTemp, setClientListTemp] = React.useState<Array<any>>([]);

  const [gridClientList, setGridClientList] = useState<Array<ClientModel>>([]);
  const [gridClientListTemp, setGridClientListTemp] = useState<Array<ClientModel>>([]);

  const [pageSize, setPageSize] = React.useState<number>(5);
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  //#endregion

  //#region Functions
  useEffect(() => {
    let id = window.location.pathname.split("/").at(-1);
    if (!NullOrEmpty(id)) {
      setClientID(parseInt(id));
      FetchUserData(parseInt(id));
    } else {
      setClientID(0);
      FetchUserData(0);
    }
  }, []);

  const FetchStates = () => {
    Provider.getAll("master/getstates")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const stateData: any = [];
            response.data.data.map((data: any, i: number) => {
              stateData.push({
                id: data.id,
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
      ID: stateID,
    };
    Provider.getAll(`master/getcitiesbyid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const cityData: any = [];
            response.data.data.map((data: any, i: number) => {
              cityData.push({
                id: data.id,
                label: data.cityName,
              });
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

  const FetchUserData = (id: number) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
        client_user_refno: id,
      },
    };
    Provider.createDFCommon(Provider.API_URLS.MyClientUserRefNoCheck, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            if (response.data.data[0] != null) {
              const arrList = [...response.data.data];
              setAddCompanyName(!NullOrEmpty(arrList[0].companyName) ? arrList[0].companyName : "");
              setContactPerson(!NullOrEmpty(arrList[0].contactPersonName) ? arrList[0].contactPersonName : "");
              setContactMobileNo(!NullOrEmpty(arrList[0].Mobile) ? arrList[0].Mobile : "");
              setAddress(!NullOrEmpty(arrList[0].addressLine) ? arrList[0].addressLine : "");

              if (!NullOrEmpty(arrList[0].stateID)) {
                setSelectedStateName(!NullOrEmpty(arrList[0].stateName) ? arrList[0].stateName : "");
                setSelectedStateID(!NullOrEmpty(arrList[0].stateID) ? arrList[0].stateID : 0);
                st_ID = arrList[0].stateID;
              }

              if (!NullOrEmpty(arrList[0].cityID)) {
                setSelectedCityName(!NullOrEmpty(arrList[0].cityName) ? arrList[0].cityName : "");
                setSelectedCityID(!NullOrEmpty(arrList[0].cityID) ? arrList[0].cityID : 0);
                ct_ID = arrList[0].cityID;
              }

              setPincode(!NullOrEmpty(arrList[0].pincode) ? arrList[0].pincode : "");
              setGst(!NullOrEmpty(arrList[0].gstNumber) ? arrList[0].gstNumber : "");
              setPan(!NullOrEmpty(arrList[0].pan) ? arrList[0].pan : "");
              SetServiceType(!NullOrEmpty(arrList[0].client_role_refno) ? arrList[0].client_role_refno : []);

              setInputEnable(!NullOrEmpty(arrList[0].addedBy) ? !arrList[0].addedBy : false);
              setDisplay(!NullOrEmpty(arrList[0].display) ? (arrList[0].display ? "Yes" : "No") : "No");
            }
          }
          FetchStates();
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

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    let isValid: Boolean = true;

    if (addCompanyName.trim() === "") {
      isValid = false;
      isSetAddCompanyNameError(true);
      setAddCompanyNameErrorText(communication.BlankCompanyName);
    }

    if (contactMobileNo.trim() === "") {
      isValid = false;
      isSetContactMobileNoError(true);
      setContactMobileNoErrorText(communication.BlankMobile);
    }

    if (address.trim() === "") {
      isValid = false;
      isSetAddressError(true);
      setAddressErrorText(communication.BlankAddress);
    }

    if (selectedStateName.trim() === "--Select--") {
      isValid = false;
      setIsStateError(true);
      setStateError(communication.BlankState);
    }

    if (selectedCityName.trim() === "--Select--") {
      isValid = false;
      setIsCityError(true);
      setCityError(communication.BlankCity);
    }

    let blankData = serviceType[0].filter((el) => el.isSelected);

    if (isValid) {
      InsertUpdateData(blankData.length === 0 ? 0 : blankData);
    }
  };

  const InsertUpdateData = (serviceType: any) => {
    if (actionStatus === "new") {
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
      Provider.createDFCommon(Provider.API_URLS.ClientUpdate, params)
        .then((response) => {
          if (response.data && response.data.code === 200) {
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e) => {
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    }
  };

  const SetServiceType = (st: any) => {
    debugger;
    let arrService = [...serviceType[0]];
    switch (true) {
      case st.indexOf("14") !== -1 && st.indexOf("13") !== -1 && st.indexOf("8") !== -1:
        arrService[0].isSelected = true;
        arrService[1].isSelected = true;
        arrService[2].isSelected = true;
        break;
      case st.indexOf("14") !== -1 && st.indexOf("13") !== -1:
        arrService[0].isSelected = true;
        arrService[1].isSelected = true;
        break;
      case st.indexOf("8") !== -1 && st.indexOf("14") !== -1:
        arrService[0].isSelected = true;
        arrService[2].isSelected = true;
        break;
      case st.indexOf("8") !== -1 && st.indexOf("13") !== -1:
        arrService[2].isSelected = true;
        arrService[1].isSelected = true;
        break;
      case st.indexOf("14") !== -1:
        arrService[0].isSelected = true;
        break;
      case st.indexOf("13") !== -1:
        arrService[1].isSelected = true;
        break;
      case st.indexOf("8") !== -1:
        arrService[2].isSelected = true;
        break;
    }

    serviceType[1](arrService);
  };
  //#endregion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4}>
            <Typography variant="h4"> CLIENT</Typography>
          </Grid>
        </Grid>
        <br></br>
        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
          <Typography variant="h6"> CLIENT(ADD NEW / EDIT)</Typography>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
                    disabled={inputEnable}
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
                    disabled={inputEnable}
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
                      disabled={inputEnable}
                      options={statesFullData}
                      //sx={{ width: 300 }}
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
                    <FormHelperText>{stateError}</FormHelperText>
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
                    disabled={inputEnable}
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
                    disabled={inputEnable}
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setPan((e.target as HTMLInputElement).value);
                      isSetPanError(false);
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
                    disabled={inputEnable}
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
                    disabled={inputEnable}
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
                      disabled={inputEnable}
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
                    <FormHelperText>{cityError}</FormHelperText>
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
                    disabled={inputEnable}
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setGst((e.target as HTMLInputElement).value);
                      isSetGstError(false);
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
                                  newChecked.find((item, i) => {
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
                  Update
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ClientEdit;

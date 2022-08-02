import { Box, TextField, Button, Container, FormControl, FormControlLabel, Typography, Select, Grid, Menu, Snackbar, MenuItem, AlertColor, FormHelperText } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { theme } from "../../theme/AppTheme";
import { useCookies } from "react-cookie";
import ModeIcon from "@mui/icons-material/Mode";
import { communication } from "../../utils/communication";
import CheckIcon from "@mui/icons-material/Check";
import { ArrowDropDown, FormatAlignJustify } from "@mui/icons-material";
import { border } from "@mui/system";
import { GetStringifyJson } from "../../utils/CommonFunctions";
import { CityModel, CompanyModel, StateModel, UserModel, UserProfile } from "../../models/Model";
import Provider from "../../api/Provider";
import { SelectChangeEvent } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Userbasic = () => {
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

  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [myUserNameList, setMyUserNameList] = useState<Array<UserModel>>([]);
  const [myUserNameListTemp, setMyUserNameListTemp] = useState<Array<UserModel>>([]);

  const [snackMsg, setSnackMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [loading, setLoading] = useState(true);

  const [userID, setUserID] = useState(0);

  const [companyName, setCompanyName] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [isCompanyError, setIsCompanyError] = useState(false);

  const [contactPerson, setContactPerson] = useState("");
  const [contactPersonError, setContactPersonError] = useState("");
  const [isContactPersonError, setIsContactPersonError] = useState(false);

  const [mobile, setMobile] = useState<string>("");
  const [mobileError, setMobileError] = useState("");
  const [isMobileError, setIsMobileError] = useState(false);

  const [profileAddress, setProfileAddress] = useState<string>("");
  const [addressError, setAddressError] = useState("");
  const [isAddressError, setIsAddressError] = useState(false);

  const [sn, setSn] = useState("--Select--");
  const [snId, setSnID] = useState<number>(0);

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

  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isPincodeError, setIsPincodeError] = useState(false);

  const [gst, setGst] = useState("");
  const [gstError, setGstError] = useState("");
  const [isGstError, setIsGstError] = useState(false);

  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");
  const [isPanError, setIsPanError] = useState(false);

  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [display, setDisplay] = React.useState("Yes");

  useEffect(() => {
    FetchUserData("");
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

  const FetchUserData = (type: string) => {
    let params = {
      UserID: cookies.dfc.UserID,
    };
    Provider.getAll(`master/getuserprofile?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];

            setUserID(arrList[0].userID);
            setCompanyName(arrList[0].companyName);
            setContactPerson(arrList[0].contactPersonName);
            setMobile(arrList[0].contactPersonNumber);
            setProfileAddress(arrList[0].addressLine);
            setState(arrList[0].stateName);
            setStateID(arrList[0].stateID);
            if (arrList[0].stateID > 0) {
              debugger;
              FetchCity(arrList[0].stateID);
              setCity(arrList[0].cityName);
              setCityID(arrList[0].cityID);
            }

            setPincode(arrList[0].pincode);
            setGst(arrList[0].gstNumber);
            setPan(arrList[0].pan);

            if (type !== "") {
              setSnackMsg("User " + type);
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

  const handleSubmitClick = () => {
    debugger;
    let isValid: Boolean = true;

    if (companyName.trim() === "") {
      isValid = false;
      setIsCompanyError(true);
      setCompanyError(communication.BlankCompanyName);
    }

    if (contactPerson.trim() === "") {
      isValid = false;
      setIsContactPersonError(true);
      setContactPersonError(communication.BlankContactPerson);
    }

    if (mobile.trim() === "") {
      isValid = false;
      setIsMobileError(true);
      setMobileError(communication.BlankMobile);
    }

    if (profileAddress.trim() === "") {
      isValid = false;
      setIsAddressError(true);
      setAddressError(communication.BlankAddress);
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
      InsertUpdateData();
    }
  };

  const InsertUpdateData = () => {
    debugger;
    if (actionStatus === "new") {
      Provider.create("master/insertuserprofile", {
        UserID: userID,
        CompanyName: companyName,
        ContactPersonName: contactPerson,
        ContactPersonNumber: mobile,
        AddressLine: profileAddress,
        StateID: stateID,
        CityID: cityID,
        Pincode: pincode,
        GSTNumber: gst,
        PAN: pan,
      })
        .then((response) => {
          debugger;
          if (response.data && response.data.code === 200) {
            //FetchData("added");
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e) => {
          debugger;

          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    }
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4}>
            <Typography variant="h4"> Update Profile</Typography>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
          <Grid item sm={4}>
            <label>Name / Company Name</label>
          </Grid>
          <Grid item sm={4}>
            <TextField
              variant="outlined"
              size="small"
              error={isCompanyError}
              helperText={companyError}
              value={companyName}
              onChange={(e) => {
                setCompanyName((e.target as HTMLInputElement).value);
                setIsCompanyError(false);
                setCompanyError("");
              }}
            ></TextField>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
          <Grid item sm={4}>
            <label>
              <label style={{ color: "#ff0000" }}>*</label> Contact Person
            </label>
          </Grid>
          <Grid item sm={4}>
            <TextField
              variant="outlined"
              size="small"
              error={isContactPersonError}
              helperText={contactPersonError}
              value={contactPerson}
              onChange={(e) => {
                setContactPerson((e.target as HTMLInputElement).value);
                setIsContactPersonError(false);
                setContactPersonError("");
              }}
            ></TextField>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
          <Grid item sm={4}>
            <label>
              <label style={{ color: "#ff0000" }}>*</label> Contact Mobile No
            </label>
          </Grid>
          <Grid item sm={4}>
            <TextField
              variant="outlined"
              size="small"
              error={isMobileError}
              helperText={mobileError}
              value={mobile}
              onChange={(e) => {
                setMobile((e.target as HTMLInputElement).value);
                setIsMobileError(false);
                setMobileError("");
              }}
            ></TextField>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
          <Grid item sm={4}>
            <label>
              <label style={{ color: "#ff0000" }}>*</label> Address 1
            </label>
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              error={isAddressError}
              helperText={addressError}
              value={profileAddress}
              onChange={(e) => {
                setProfileAddress((e.target as HTMLInputElement).value);
                setIsAddressError(false);
                setAddressError("");
              }}
            ></TextField>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
          <Grid item sm={4}>
            <label>
              <label style={{ color: "#ff0000" }}>*</label> State
            </label>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth size="small" error={isStateError}>
              <Select value={state} onChange={handleSNChange}>
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
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
          <Grid item sm={4}>
            <label>
              <label style={{ color: "#ff0000" }}>*</label> City
            </label>
          </Grid>
          <Grid item sm={6}>
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
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
          <Grid item sm={4}>
            <label>Pincode</label>
          </Grid>
          <Grid item sm={4}>
            <TextField
              variant="outlined"
              size="small"
              error={isPincodeError}
              helperText={pincodeError}
              value={pincode}
              onChange={(e) => {
                setPincode((e.target as HTMLInputElement).value);
                setIsPincodeError(false);
                setPincodeError("");
              }}
            ></TextField>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
          <Grid item sm={4}>
            <label>GST No</label>
          </Grid>
          <Grid item sm={4}>
            <TextField
              variant="outlined"
              size="small"
              error={isGstError}
              helperText={gstError}
              value={gst}
              onChange={(e) => {
                setGst((e.target as HTMLInputElement).value);
                setIsGstError(false);
                setGstError("");
              }}
            ></TextField>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
          <Grid item sm={4}>
            <label>PAN No</label>
          </Grid>
          <Grid item sm={4}>
            <TextField
              variant="outlined"
              size="small"
              error={isPanError}
              helperText={panError}
              value={pan}
              onChange={(e) => {
                setPan((e.target as HTMLInputElement).value);
                setIsPanError(false);
                setPanError("");
              }}
            ></TextField>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Grid>
            <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
              Update
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Userbasic;

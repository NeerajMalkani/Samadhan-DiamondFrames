import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";
import Provider from "../api/Provider";
import { ClientModel } from "../models/Model";
import { theme } from "../theme/AppTheme";
import { GetStringifyJson } from "../utils/CommonFunctions";
import { communication } from "../utils/communication";
import { retrunSumID } from "../utils/JSCommonFunction";
import { restrictNumericMobile, ValidateGSTNumber, ValidatePanNumber } from "../utils/validations";

interface props {
  client: ClientModel;
  cancelCallBack: Function;
  saveCallBack: Function;
  type: string;
  cardDisplay: string;
}

const CreateClient = ({ client, cancelCallBack, saveCallBack, type, cardDisplay }: props) => {
  const [CookieUserID, SetCookieUseID] = useState(0);
  const [cookies, setCookie] = useCookies(["dfc"]);
  const id = useState(0);
  const name = useState("");
  const isNameError = useState(false);
  const nameError = useState("");

  const contactName = useState("");
  const isContactNameError = useState(false);
  const contactNameError = useState("");

  const cmn = useState("");
  const isCMNError = useState(false);
  const cmnError = useState("");

  const address = useState("");
  const isAddressError = useState(false);
  const addressError = useState("");

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

  const pc = useState("");
  const isPCError = useState(false);
  const pcError = useState("");

  const gst = useState("");
  const isGSTError = useState(false);
  const gstError = useState("");

  const pan = useState("");
  const isPANError = useState(false);
  const panError = useState("");

  const isSPRError = useState(false);
  const sprError = useState("");

  const editValues = useState(false);

  const [display, setDisplay] = useState("Yes");
  // const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [buttonLoading, setButtonLoading] = useState(false);

  const serviceType = useState([
    { key: "Vendor", isSelected: false, id: 1 },
    { key: "Supplier", isSelected: false, id: 2 },
    { key: "Client", isSelected: false, id: 3 },
  ]);

  useEffect(() => {
    SetCookieUseID(cookies.dfc.UserID);
    if (type === "edit") {
      PrefillData(client);
    } else {
      FetchStates();
    }
  }, [client, type]);

  const PrefillData = (data: ClientModel) => {
    editValues[1](!data.addedBy);

    id[1](data.id);
    isNameError[1](false);
    nameError[1]("");
    name[1](data.companyName);

    isContactNameError[1](false);
    contactName[1](data.companyName);
    contactNameError[1]("");

    isCMNError[1](false);
    cmnError[1]("");
    cmn[1](data.contactMobileNumber);

    isAddressError[1](false);
    addressError[1]("");
    address[1](data.contactMobileNumber);

    setIsStateError(false);
    setStateError("");
    setSelectedStateID(data.stateID);
    setSelectedStateName(data.stateName);

    setIsCityError(false);
    setCityError("");
    setSelectedCityID(data.cityID);
    setSelectedCityName(data.cityName);

    pc[1](data.pincode);
    isPCError[1](false);
    pcError[1]("");

    pan[1](data.pan);
    isPANError[1](false);
    panError[1]("");

    gst[1](data.gstNumber);
    isGSTError[1](false);
    gstError[1]("");

    let arrService = [...serviceType[0]];
    switch (data.serviceType) {
      case 1:
        arrService[0].isSelected = true;
        break;
      case 2:
        arrService[1].isSelected = true;
        break;
      case 3:
        arrService[2].isSelected = true;
        break;
      case 12:
        arrService[0].isSelected = true;
        arrService[1].isSelected = true;
        break;
      case 13:
        arrService[0].isSelected = true;
        arrService[2].isSelected = true;
        break;
      case 23:
        arrService[2].isSelected = true;
        arrService[1].isSelected = true;
        break;
      case 123:
        arrService[0].isSelected = true;
        arrService[1].isSelected = true;
        arrService[2].isSelected = true;
        break;
    }

    serviceType[1](arrService);
  };

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
          }
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
          }
        }
      })
      .catch((e) => {});
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleCancelClick = () => {
    setButtonLoading(false);

    isNameError[1](false);
    nameError[1]("");
    name[1]("");

    isContactNameError[1](false);
    contactName[1]("");
    contactNameError[1]("");

    isCMNError[1](false);
    cmnError[1]("");
    cmn[1]("");

    isAddressError[1](false);
    addressError[1]("");
    address[1]("");

    setIsStateError(false);
    setStateError("");
    setSelectedStateID(0);
    setSelectedStateName("");

    setIsCityError(false);
    setCityError("");
    setSelectedCityID(0);
    setSelectedCityName("");

    pc[1]("");
    isPCError[1](false);
    pcError[1]("");

    pan[1]("");
    isPANError[1](false);
    panError[1]("");

    gst[1]("");
    isGSTError[1](false);
    gstError[1]("");
    editValues[1](true);

    isSPRError[1](false);
    sprError[1]("");
    serviceType[1]([
      { key: "Vendor", isSelected: false, id: 1 },
      { key: "Supplier", isSelected: false, id: 2 },
      { key: "Client", isSelected: false, id: 3 },
    ]);

    cancelCallBack();
  };

  const handleSubmitClick = () => {
    let isValid = true;

    if (name[0].trim() === "") {
      isValid = false;
      isNameError[1](true);
      nameError[1]("Please enter Name");
    }

    if (cmn[0].trim() === "" || cmn[0].length < 10) {
      isValid = false;
      isCMNError[1](true);
      cmnError[1](communication.BlankMobile);
    }

    if (address[0].trim() === "") {
      isValid = false;
      isAddressError[1](true);
      addressError[1]("Please enter Address");
    }

    if (selectedStateName.trim() === "" || selectedStateID === 0) {
      isValid = false;
      setIsStateError(true);
      setStateError(communication.BlankState);
    }

    if (selectedCityName.trim() === "" || selectedCityID === 0) {
      isValid = false;
      setIsCityError(true);
      setCityError(communication.BlankCity);
    }

    if (pc[0].toString().trim() === "") {
      isValid = false;
      isPCError[1](true);
      pcError[1]("Please enter Pincode");
    }

    if (pan[0].trim() !== "" && !ValidatePanNumber(pan[0])) {
      isValid = false;
      isPANError[1](true);
      panError[1]("Please enter valid PAN No.");
    }

    if (gst[0].trim() !== "" && !ValidateGSTNumber(gst[0])) {
      isValid = false;
      isGSTError[1](true);
      gstError[1]("Please enter valid GST No.");
    }

    let blankData = serviceType[0].filter((el) => el.isSelected);
    if (blankData.length === 0) {
      isValid = false;
      isSPRError[1](true);
      sprError[1]("Please select Service Provider Role");
    }

    if (isValid) {
      setButtonLoading(true);
      InsertUpdateData(retrunSumID(blankData));
    }
  };

  const InsertUpdateData = (serviceType: number) => {
    if (type === "add") {
      Provider.create("contractorquotationestimation/insertclient", {
        AddedByUserID: CookieUserID,
        CompanyName: name[0],
        ContactPerson: contactName[0],
        ContactMobileNumber: cmn[0],
        Address1: address[0],
        StateID: selectedStateID,
        CityID: selectedCityID,
        Pincode: pc[0],
        GSTNumber: gst[0],
        PAN: pan[0],
        ServiceType: serviceType,
        Display: display === "Yes",
      })
        .then((response) => {
          saveCallBack(response, "added");
          setButtonLoading(false);
        })
        .catch((e) => {
          saveCallBack(e);
          setButtonLoading(false);
        });
    } else if (type === "edit") {
      Provider.create("contractorquotationestimation/updateclient", {
        ID: id[0],
        AddedByUserID: CookieUserID,
        CompanyName: name[0],
        ContactPerson: contactName[0],
        ContactMobileNumber: cmn[0],
        Address1: address[0],
        StateID: selectedStateID,
        CityID: selectedCityID,
        Pincode: pc[0],
        GSTNumber: gst[0],
        PAN: pan[0],
        ServiceType: serviceType,
        Display: display === "Yes",
      })
        .then((response) => {
          saveCallBack(response, "updated");
          setButtonLoading(false);
        })
        .catch((e) => {
          saveCallBack(e);
          setButtonLoading(false);
        });
    }
  };

  return (
    <Box sx={{ mt: 1, display: cardDisplay }}>
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1, borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Client (Add New / Edit)</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Name / Company Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              disabled={editValues[0]}
              fullWidth
              placeholder="Name"
              variant="outlined"
              size="small"
              error={isNameError[0]}
              helperText={nameError[0]}
              value={name[0]}
              onChange={(e) => {
                name[1]((e.target as HTMLInputElement).value);
                isNameError[1](false);
                nameError[1]("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Contact Person</b>
            </Typography>
            <TextField
              disabled={editValues[0]}
              fullWidth
              placeholder="Name"
              variant="outlined"
              size="small"
              error={isContactNameError[0]}
              helperText={contactNameError[0]}
              value={contactName[0]}
              onChange={(e) => {
                contactName[1]((e.target as HTMLInputElement).value);
                isContactNameError[1](false);
                contactNameError[1]("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Contact Mobile Number</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              disabled={editValues[0]}
              fullWidth
              placeholder="Mobile No."
              variant="outlined"
              size="small"
              error={isCMNError[0]}
              helperText={cmnError[0]}
              value={cmn[0]}
              inputProps={{
                maxLength: 10,
                onKeyDown: (e) => {
                  restrictNumericMobile(e);
                },
              }}
              onChange={(e) => {
                cmn[1]((e.target as HTMLInputElement).value);
                isCMNError[1](false);
                cmnError[1]("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Address</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              disabled={editValues[0]}
              fullWidth
              placeholder="Address"
              variant="outlined"
              size="small"
              error={isAddressError[0]}
              helperText={addressError[0]}
              value={address[0]}
              onChange={(e) => {
                address[1]((e.target as HTMLInputElement).value);
                isAddressError[1](false);
                addressError[1]("");
              }}
            />
          </Grid>

          <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>State Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <Autocomplete
              disabled={editValues[0]}
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
          </Grid>

          <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>City Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <Autocomplete
              disabled={editValues[0]}
              disablePortal
              fullWidth
              options={cityFullData}
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
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Pincode Number</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              disabled={editValues[0]}
              fullWidth
              placeholder="Pincode"
              variant="outlined"
              size="small"
              error={isPCError[0]}
              helperText={pcError[0]}
              value={pc[0]}
              inputProps={{
                maxLength: 6,
                onKeyDown: (e) => {
                  restrictNumericMobile(e);
                },
              }}
              onChange={(e) => {
                pc[1]((e.target as HTMLInputElement).value);
                isPCError[1](false);
                pcError[1]("");
              }}
            />
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>GST Number</b>
            </Typography>
            <TextField
              disabled={editValues[0]}
              fullWidth
              placeholder="GST"
              variant="outlined"
              size="small"
              error={isGSTError[0]}
              helperText={gstError[0]}
              value={gst[0]}
              onChange={(e) => {
                gst[1]((e.target as HTMLInputElement).value);
                isGSTError[1](false);
                gstError[1]("");
              }}
            />
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>PAN Number</b>
            </Typography>
            <TextField
              disabled={editValues[0]}
              fullWidth
              placeholder="PAN"
              variant="outlined"
              size="small"
              error={isPANError[0]}
              helperText={panError[0]}
              value={pan[0]}
              onChange={(e) => {
                pan[1]((e.target as HTMLInputElement).value);
                isPANError[1](false);
                panError[1]("");
              }}
            />
          </Grid>

          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
            <FormControl component="fieldset" error={isSPRError[0]}>
              <FormLabel component="legend">Service Provider Role</FormLabel>
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

          <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
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

          <Grid item xs={4} sm={8} md={12}>
            <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} onClick={handleCancelClick}>
              Cancel
            </Button>
            <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default CreateClient;

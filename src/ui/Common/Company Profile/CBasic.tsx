import {
  Box,
  TextField,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Typography,
  Select,
  Grid,
  Menu,
  Snackbar,
  MenuItem,
  Tabs,
  Tab,
  Autocomplete,
  RadioGroup,
  Radio,
  FormHelperText,
  Alert,
  AlertColor,
  CircularProgress,
} from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { theme } from "../../../theme/AppTheme";
import { useCookies } from "react-cookie";
import ModeIcon from "@mui/icons-material/Mode";
import CheckIcon from "@mui/icons-material/Check";
import { ArrowDropDown, FormatAlignJustify } from "@mui/icons-material";
import { border } from "@mui/system";
import Provider from "../../../api/Provider";
import { LoadingButton } from "@mui/lab";
import { GetStringifyJson, NullOrEmpty } from "../../../utils/CommonFunctions";
import { AWSImagePath } from "../../../utils/paths";
import { communication } from "../../../utils/communication";
import { UploadImageToS3WithNativeSdk } from "../../../utils/AWSFileUpload";
import uuid from "react-uuid";
import { CityModel, CompanyModel, StateModel, UserModel, UserProfile } from "../../../models/Model";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CBasic = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [value, setValue] = useState(0);
  const [CookieUserID, SetCookieUseID] = useState(0);

  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);

   //#region Variables
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [isCompanyNameError, setIsCompanyNameError] = useState(false);

  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");
  const [isContactError, setIsContactError] = useState(false);

  const [contactNo, setContactNo] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [isContactNoError, setIsContactNoError] = useState(false);

  const [gstNo, setGSTNo] = useState("");
  const [gstNoError, setGSTNoError] = useState("");
  const [isGSTNoError, setIsGSTNoError] = useState(false);

  const [panNo, setPanNo] = useState("");
  const [panNoError, setPanNoError] = useState("");
  const [isPanNoError, setIsPanNoError] = useState(false);

  const [locationName, setLocationName] = useState("");
  const [locatoinNameError, setLocationNameError] = useState("");
  const [isLocationNameError, setIsLocationNameError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isAddressError, setIsAddressError] = useState(false);

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
  // const [stateNameList, setStateNameList] = useState<Array<StateModel>>([]);

  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isPincodeError, setIsPincodeError] = useState(false);

  const [accountNo, setAccountNo] = useState("");
  const [accountNoError, setAccountNoError] = useState("");
  const [isAccountNoError, setIsAccountNoError] = useState(false);

  const [bankName, setBankName] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [isBankNameError, setIsBankNameError] = useState(false);

  const [bankBranchName, setBankBranchName] = useState("");
  const [bankBranchNameError, setBankBranchNameError] = useState("");
  const [isBankBranchNameError, setIsBankBranchNameError] = useState(false);

  const [IFSCCode, setIFSCCode] = useState("");
  const [IFSCCodeError, setIFSCCodeError] = useState("");
  const [isIFSCCodeError, setIsIFSCCodeError] = useState(false);

  const [display, setDisplay] = useState("Yes");

  const [cnp, setCNP] = useState("");
  const [cnpError, setCNPError] = useState("");
  const [isCNPError, setIsCNPError] = useState(false);

  const [qbnp, setQBNP] = useState("");
  const [qbnpError, setQBNPError] = useState("");
  const [isqbnpError, setIsQBNPError] = useState(false);

  const [ecp, setECP] = useState("");
  const [ecpError, setECPError] = useState("");
  const [isECPError, setIsECPError] = useState(false);

  const [pop, setPOP] = useState("");
  const [popError, setPOPError] = useState("");
  const [isPOPError, setIsPOPError] = useState(false);

  const [sop, setSOP] = useState("");
  const [sopError, setSOPError] = useState("");
  const [isSOPError, setIsSOPError] = useState(false);

  const [errorDIText, setDIErrorText] = useState("");
  const [designButtonText, setDesignButtonText] = useState("Upload Logo");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadFileUpload, setUploadFileUpload] = useState<any>();

  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);
 //#endregion 

 //#region Functions

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    FetchBasicDetails();
    FetchStates();
  }, []);

  const FetchBasicDetails = () => {
    let params = {
      UserID: cookies.dfc.UserID,
    };
    Provider.getAll(`master/getuserprofile?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            
            if (response.data.data[0] != null) {

              setCompanyName(!NullOrEmpty(response.data.data[0].companyName) ? response.data.data[0].companyName : "");
              setContact(!NullOrEmpty(response.data.data[0].contactPersonName) ? response.data.data[0].contactPersonName : "");
              setContactNo(!NullOrEmpty(response.data.data[0].contactPersonNumber) ? response.data.data[0].contactPersonNumber : "");
              setGSTNo(!NullOrEmpty(response.data.data[0].gstNumber) ? response.data.data[0].gstNumber : "");
              setPanNo(!NullOrEmpty(response.data.data[0].pan) ? response.data.data[0].pan : "");
              setLocationName(!NullOrEmpty(response.data.data[0].locationName) ? response.data.data[0].locationName : "");
              setAddress(!NullOrEmpty(response.data.data[0].addressLine) ? response.data.data[0].addressLine : "");
              setSelectedStateName(NullOrEmpty(response.data.data[0].stateName) ? "" : response.data.data[0].stateName);
              setSelectedStateID(NullOrEmpty(response.data.data[0].stateID) ? 0 : response.data.data[0].stateID);
              setSelectedCityName(NullOrEmpty(response.data.data[0].cityName) ? "" : response.data.data[0].cityName);
              setSelectedCityID(NullOrEmpty(response.data.data[0].cityID) ? 0 : response.data.data[0].cityID);
              setPincode(NullOrEmpty(response.data.data[0].pincode) ? "" : response.data.data[0].pincode.toString());
              setAccountNo(NullOrEmpty(response.data.data[0].accountNumber) ? "" : response.data.data[0].accountNumber.toString());
              setBankName(!NullOrEmpty(response.data.data[0].bankName) ? response.data.data[0].bankName : "");
              setBankBranchName(!NullOrEmpty(response.data.data[0].branchName) ? response.data.data[0].branchName : "");
              setIFSCCode(!NullOrEmpty(response.data.data[0].ifscCode) ? response.data.data[0].ifscCode : "");
              setCNP(!NullOrEmpty(response.data.data[0].companyNamePrefix) ? response.data.data[0].companyNamePrefix : "");
              setQBNP(!NullOrEmpty(response.data.data[0].quotationBudgetPrefix) ? response.data.data[0].quotationBudgetPrefix : "");
              setECP(!NullOrEmpty(response.data.data[0].employeeCodePrefix) ? response.data.data[0].employeeCodePrefix : "");
              setPOP(!NullOrEmpty(response.data.data[0].purchaseOrderPrefix) ? response.data.data[0].purchaseOrderPrefix : "");
              setSOP(!NullOrEmpty(response.data.data[0].salesOrderPrefix) ? response.data.data[0].salesOrderPrefix : "");
              setDisplay(NullOrEmpty(response.data.data[0].showBrand) ? "No" : response.data.data[0].showBrand ? "Yes" : "No");
              setUploadedImage(response.data.data[0].companyLogo);
              setImage(!NullOrEmpty(response.data.data[0].companyLogo) ? response.data.data[0].companyLogo : AWSImagePath + "placeholder-image.png");
              // setFilePath(response.data.data[0].companyLogo ? response.data.data[0].companyLogo : null);
              if (!NullOrEmpty(response.data.data[0].stateID) && response.data.data[0].stateID != 0) {
                FetchCities(response.data.data[0].stateID);
              }
            }
          }
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
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
                // setStateNameList(response.data.data);
              });
            });
            setStatesFullData(stateData);
          }
        }
      })
      .catch((e) => { });
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
      .catch((e) => { });
  };

  const handleSubmitClick = () => {
    debugger;
    setButtonLoading(true);
    if (uploadFileUpload !== null && uploadFileUpload !== undefined) {
      uploadImage();
    } else {
      InsertData("Success", uploadedImage);
    }
  };

  const uploadImage = () => {
    let imageName: string = uuid();
    let fileExtension = uploadedImage.split(".").pop();
    setUploadedImage(imageName + "." + fileExtension);
    UploadImageToS3WithNativeSdk(uploadFileUpload, imageName + "." + fileExtension, InsertData);
  };

  const InsertData = (status: string, fileName: string) => {

    if (status.toLowerCase() === "success") {
      debugger;
      const params = {
        UserID: CookieUserID,
        CompanyName: companyName,
        CompanyLogo: fileName ? AWSImagePath + fileName : "",
        ContactPersonName: contact,
        ContactPersonNumber: contactNo,
        AddressLine: address,
        LocationName: locationName,
        StateID: selectedStateID,
        CityID: selectedCityID,
        Pincode: pincode ? pincode : 0,
        GSTNumber: gstNo,
        PAN: panNo,
        AccountNumber: accountNo ? accountNo : 0,
        BankName: bankName,
        BranchName: bankBranchName,
        IFSCCode: IFSCCode,
        CompanyNamePrefix: cnp,
        QuotationBudgetPrefix:qbnp,
        EmployeeCodePrefix: ecp,
        PurchaseOrderPrefix: pop,
        SalesOrderPrefix: sop,
        ShowBrand: display === "Yes",
      };
      Provider.create("master/insertuserprofile", params)
        .then((response) => {
          debugger;
          if (response.data && response.data.code === 200) {
            if (uploadFileUpload !== null && uploadFileUpload !== undefined) {
              setImage(fileName ? AWSImagePath + fileName : "");
              setUploadFileUpload(undefined);
            }
            setSnackbarType("success");

            setSnackMsg("Data updated successfully");

            setOpen(true);
          } else {
            setSnackbarType("error");
            setSnackMsg(communication.Error);
            setOpen(true);
          }
          setButtonLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setSnackbarType("error");
          setSnackMsg(communication.NetworkError);
          setOpen(true);
          setButtonLoading(false);
        });
    } else {
      setSnackbarType("error");
      setSnackMsg(communication.Error);
      setOpen(true);
      setButtonLoading(false);
    }
  };

  // const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDisplay((event.target as HTMLInputElement).value);
  // };

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
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h4">Basic details</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="Company" {...a11yProps(0)} />
                    <Tab label="Bank" {...a11yProps(1)} />
                    <Tab label="Common" {...a11yProps(2)} />
                    <Tab label="Logo" {...a11yProps(3)} />
                  </Tabs>
                </Box>
                <Grid item xs={4} sm={8} md={12}>
                  <TabPanel value={value} index={0}>
                    <Grid container xs={4} sm={8} md={12} spacing={{ xs: 1, md: 2 }}>
                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Company / Frim Name</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setCompanyName((e.target as HTMLInputElement).value);
                            setIsCompanyNameError(false);
                            setCompanyNameError("");
                          }}
                          error={isCompanyNameError}
                          helperText={companyNameError}
                          value={companyName}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Contact person Name</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setContact((e.target as HTMLInputElement).value);
                            setIsContactError(false);
                            setContactError("");
                          }}
                          error={isContactError}
                          helperText={contactError}
                          value={contact}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Contact No.</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setContactNo((e.target as HTMLInputElement).value);
                            setIsContactNoError(false);
                            setContactNoError("");
                          }}
                          error={isContactNoError}
                          helperText={contactNoError}
                          value={contactNo}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>GST No.</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setGSTNo((e.target as HTMLInputElement).value);
                            setIsGSTNoError(false);
                            setGSTNoError("");
                          }}
                          error={isGSTNoError}
                          helperText={gstNoError}
                          value={gstNo}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>PAN No.</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setPanNo((e.target as HTMLInputElement).value);
                            setIsPanNoError(false);
                            setPanNoError("");
                          }}
                          error={isPanNoError}
                          helperText={panNoError}
                          value={panNo}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Location Name</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setLocationName((e.target as HTMLInputElement).value);
                            setIsLocationNameError(false);
                            setLocationNameError("");
                          }}
                          error={isLocationNameError}
                          helperText={locatoinNameError}
                          value={locationName}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Address</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setAddress((e.target as HTMLInputElement).value);
                            setIsAddressError(false);
                            setAddressError("");
                          }}
                          error={isAddressError}
                          helperText={addressError}
                          value={address}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>State Name</b>
                        </Typography>
                        <Autocomplete
                          disablePortal
                          fullWidth
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
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>City Name</b>
                        </Typography>
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
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Pincode</b>
                        </Typography>
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
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Grid container xs={4} sm={8} md={12} spacing={{ xs: 1, md: 2 }}>
                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Account Number</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setAccountNo((e.target as HTMLInputElement).value);
                            setIsAccountNoError(false);
                            setAccountNoError("");
                          }}
                          error={isAccountNoError}
                          helperText={accountNoError}
                          value={accountNo}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Bank Name</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setBankName((e.target as HTMLInputElement).value);
                            setIsBankNameError(false);
                            setBankNameError("");
                          }}
                          error={isBankNameError}
                          helperText={bankNameError}
                          value={bankName}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Bank Branch Name</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setBankBranchName((e.target as HTMLInputElement).value);
                            setIsBankBranchNameError(false);
                            setBankBranchNameError("");
                          }}
                          error={isBankBranchNameError}
                          helperText={bankBranchNameError}
                          value={bankBranchName}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>IFSC Code</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setIFSCCode((e.target as HTMLInputElement).value);
                            setIsIFSCCodeError(false);
                            setIFSCCodeError("");
                          }}
                          error={isIFSCCodeError}
                          helperText={IFSCCodeError}
                          value={IFSCCode}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    {/* <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <b>Create Brand & Product</b>
                      </Typography>
                      <FormControl>
                        <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </Grid> */}
                    <Grid container xs={4} sm={8} md={12} spacing={{ xs: 1, md: 2 }}>
                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Company Name Prefix</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setCNP((e.target as HTMLInputElement).value);
                            setIsCNPError(false);
                            setCNPError("");
                          }}
                          error={isCNPError}
                          helperText={cnpError}
                          value={cnp}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Quotation / Budget No Prefix</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setQBNP((e.target as HTMLInputElement).value);
                            setIsQBNPError(false);
                            setQBNPError("");
                          }}
                          error={isqbnpError}
                          helperText={qbnpError}
                          value={qbnp}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Employee Code Prefix</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setECP((e.target as HTMLInputElement).value);
                            setIsECPError(false);
                            setECPError("");
                          }}
                          error={isECPError}
                          helperText={ecpError}
                          value={ecp}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Purchase Order Prefix</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setPOP((e.target as HTMLInputElement).value);
                            setIsPOPError(false);
                            setPOPError("");
                          }}
                          error={isPOPError}
                          helperText={popError}
                          value={pop}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Sales Order Prefix</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setSOP((e.target as HTMLInputElement).value);
                            setIsSOPError(false);
                            setSOPError("");
                          }}
                          error={isSOPError}
                          helperText={sopError}
                          value={sop}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <Grid container xs={4} sm={8} md={12} spacing={{ xs: 1, md: 2 }}>
                      <img src={image} alt="" style={{ width: "48px", height: "48px" }} />
                      <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b> Logo</b>
                          <label style={{ color: "#ff0000" }}>*</label>
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
                    </Grid>
                  </TabPanel>

                  <Grid item xs={4} sm={8} md={12}>
                    <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
                      Submit
                    </LoadingButton>
                  </Grid>
                </Grid>
              </>
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

export default CBasic;

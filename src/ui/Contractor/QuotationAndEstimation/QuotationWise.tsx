import {
  Alert,
  AlertColor,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import ShowsGrid from "../../../components/GridStructure";
import Header from "../../../components/Header";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { QuotationProductDetailsModel,SendRateCardModel, ButtonSettings,ProductDetailsModel, EstimationCostDetails, ImageGalleryEstimation, MaterialSetupModel, QuotationDataModel } from "../../../models/Model";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { theme } from "../../../theme/AppTheme";
import { contractorApprovedQuotation, contractorPendingQuotation, contractorRejectedQuotation, materialSetupColumns } from "../../../utils/tablecolumns";
import { ArrowBack } from "@mui/icons-material";
import PrismaZoom from "react-prismazoom";
import { LoadingButton, useTabContext } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import Provider from "../../../api/Provider";
import { communication } from "../../../utils/communication";
import { CalculateSqfeet, GetStringifyJson } from "../../../utils/CommonFunctions";
import { retrunValueFromLocation } from "../../../utils/JSCommonFunction";
import { UploadImageToS3WithNativeSdk } from "../../../utils/AWSFileUpload";
import uuid from "react-uuid";
import AddIcon from '@mui/icons-material/Add';
import { TextareaAutosize } from '@mui/base';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import SearchIcon from "@mui/icons-material/Search";
import { QuotationSendPendingModel, QuotationApprovePendingModel,QuotationApprovedModel,QuotationRejectedModel} from "../../../models/Model";
import { quotationSendPendingColumns,quotationApprovePendingColumns,quotationApprovedColumns,quotationRejectedColumns} from "../../../utils/tablecolumns";


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

const buttonSetting: ButtonSettings = {
  isActionButton: false,
  actionButtons: [],
};

const QuotationWise = () => {
  //#region Variables
  const [value, setValue] = useState(0);
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  const [loading, setLoading] = useState(true);

  const [clientName, setClientName] = useState("--Select--");
  const [clientNameID, setClientNameID] = useState<number>(0);
  const [clientNameError, SetClientNameError] = useState("");
  const [isClientNameError, IsSetClientNameError] = useState(false);
  const [clientNameList, setClientNameList] = useState<Array<SendRateCardModel>>([]);
  const [clientNameFullData, setClientNameFullData] = useState([]);

  const [cName, setCName] = useState("");
  const [clientNo, setClientNo] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectNameError, setProjectNameError] = useState("");
  const [isProjectNameError, setIsProjectNameError] = useState(false);

  const [contactPerson, setContactPerson] = useState("");
  const [contactPersonError, setContactPersonError] = useState("");
  const [isContactPersonError, setIsContactPersonError] = useState(false);

  const [contactNo, setContactNo] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [isContactNoError, setIsContactNoError] = useState(false);

  const [projectDescription, setProjectDescription] = React.useState("");
  const [projectDescriptionErrorText, setProjectDescriptionErrorText] = useState("");
  const [isProjectDescriptionError, setIsProjectDescriptionError] = useState(false);

  const [projectSiteAddress, setProjectSiteAddress] = React.useState("");
  const [projectSiteAddressErrorText, setProjectSiteAddressErrorText] = useState("");
  const [isProjectSiteAddressError, setIsProjectSiteAddressError] = useState(false);

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

  const [unitOfSales, setUnitOfSales] = useState("--Select--");
  const [unitOfSalesID, setUnitOfSalesID] = useState<number>(0);
  const [unitOfSalesError, SetUnitOfSalesError] = useState("");
  const [isUnitOfSalesError, IsSetUnitOfSalesError] = useState(false);
  const [unitOfSalesList, setUnitOfSalesList] = useState<Array<SendRateCardModel>>([]);
  const [UnitOfSalesFullData, setUnitOfSalesFullData] = useState([]);

  const [checkInclusiveMaterial, setCheckInclusiveMaterial] = useState(false);

  const [quotationSendPendingList, setQuotationSendPendingList] =useState<Array<QuotationSendPendingModel>>([]);
  const [quotationSendPendingListTemp, setQuotationSendPendingListTemp] = React.useState<Array<any>>([]);

  const [quotationApprovePendingList, setQuotationApprovePendingList] =useState<Array<QuotationApprovePendingModel>>([]);
  const [quotationApprovePendingListTemp, setQuotationApprovePendingListTemp] = React.useState<Array<any>>([]);

  const [quotationApprovedList, setQuotationApprovedList] =useState<Array<QuotationApprovedModel>>([]);
  const [quotationApprovedListTemp, setQuotationApprovedListTemp] = React.useState<Array<any>>([]);

  const [quotationRejectedList, setQuotationRejectedList] =useState<Array<QuotationRejectedModel>>([]);
  const [quotationRejectedListTemp, setQuotationRejectedListTemp] = React.useState<Array<any>>([]);

  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [searchQuery, setSearchQuery] = useState("");

  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");

//#endregion 

  //#region Functions

  useEffect(() => {
    FetchStates();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const FetchCompanyName = () => {
    let params = {
        AddedByUserID: cookies.dfc.UserID,
    };
    Provider.getAll(`master/getbranchadmins?${new URLSearchParams(GetStringifyJson(params))}`)
        .then((response: any) => {
            const clientdata: any = [];
            if (response.data && response.data.code === 200) {
                if (response.data.data) {
                    setClientNameFullData(response.data.data);
                    response.data.data.map((data: any, i: number) => {
                        clientdata.push({
                            id: data.id,
                            companyName: data.companyName,
                        });
                    });
                    setClientNameList(clientdata);
                }
            }
        })
        .catch((e) => { });
};


const checkboxhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // if (productItem.length == 0) {
  //     setCheckInclusiveMaterial(event.target.checked);
  // }
};

  const handleClientNameChange = (event: SelectChangeEvent) => {

    let clientName: string = event.target.value;
    let ac = clientNameFullData.find((el) => el.clientName === clientName);
    if (ac !== undefined) {
      setClientName(clientName);
      setClientNameID(ac?.id);
      IsSetClientNameError(false);
      SetClientNameError("");
      setCName(ac?.cName);
      setClientNo(ac?.clientNo);

    }
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

  const handleUnitOfSalesChange = (event: SelectChangeEvent) => {

    let unitOfSales: string = event.target.value;
    let ac = UnitOfSalesFullData.find((el) => el.unit === unitOfSales);
    if (ac !== undefined) {
        setUnitOfSales(unitOfSales);
        setUnitOfSalesID(ac?.id);
        IsSetUnitOfSalesError(false);
        SetUnitOfSalesError("");
    }
};

// const handelEditAndDelete = (type: string | null, a: QuotationSendPendingModel | undefined) => {
//   if (type?.toLowerCase() === "edit" && a !== undefined) {
//     setDataGridOpacity(0.3);
//     setDataGridPointer("none");
//     setDisplay(a.display);
//     setActivityName(a?.activityRoleName);
//     setSelectedID(a.id);
//     setactivitynameError("");
//     setIsActivitynameError(false);
//     setButtonDisplay("unset");
//     setActionStatus("edit");
//   }
//   // else if (type?.toLowerCase() === "delete" && a !== undefined) {
//   //   setSelectedID(a.id);
//   //   Provider.deleteAllParams("master/deleteactivityroles", { ID: a.id })
//   //     .then((response) => {
//   //       if (response.data && response.data.code === 200) {
//   //         FetchData();
//   //       } else {
//   //         setSnackMsg("your request cannot be processed");
//   //         setOpen(true);
//   //       }
//   //     })
//   //     .catch((e) => {
//   //       console.log(e);
//   //       setSnackMsg("your request cannot be processed");
//   //       setOpen(true);
//   //     });
//   // }
// };

const onChangeSearch_SendPending = (query: string) => {
  setSearchQuery(query);
  if (query === "") {
    setQuotationSendPendingListTemp(quotationSendPendingList);
  } else {
    setQuotationSendPendingListTemp(
      quotationSendPendingList.filter((el: QuotationSendPendingModel) => {
        return el.quotationNo.toString().toLowerCase().includes(query.toLowerCase());
      })
    );
  }
};

const onChangeSearch_ApprovePending = (query: string) => {
  setSearchQuery(query);
  if (query === "") {
    setQuotationApprovePendingListTemp(quotationApprovePendingList);
  } else {
    setQuotationApprovePendingListTemp(
      quotationApprovePendingList.filter((el: QuotationApprovePendingModel) => {
        return el.quotationNo.toString().toLowerCase().includes(query.toLowerCase());
      })
    );
  }
};

const onChangeSearch_ApprovedList = (query: string) => {
  setSearchQuery(query);
  if (query === "") {
    setQuotationApprovedListTemp(quotationApprovedList);
  } else {
    setQuotationApprovedListTemp(
      quotationApprovedList.filter((el: QuotationApprovedModel) => {
        return el.quotationNo.toString().toLowerCase().includes(query.toLowerCase());
      })
    );
  }
};

const onChangeSearch_Rejected = (query: string) => {
  setSearchQuery(query);
  if (query === "") {
    setQuotationRejectedListTemp(quotationRejectedList);
  } else {
    setQuotationRejectedListTemp(
      quotationRejectedList.filter((el: QuotationRejectedModel) => {
        return el.quotationNo.toString().toLowerCase().includes(query.toLowerCase());
      })
    );
  }
};

const ResetFields = () => {
  setSelectedID(0);
  setActionStatus("new");
  setDataGridOpacity(1);
  setDataGridPointer("auto");
  setButtonDisplay("none");
  setButtonLoading(false);
};

const FetchData_sendpending = (type: string) => {
  ResetFields();
  Provider.getAll("master/getactivityroles")
    .then((response: any) => {
      if (response.data && response.data.code === 200) {
        if (response.data.data) {
          const arrList = [...response.data.data];
          arrList.map(function (a: any, index: number) {
            a.display = a.display ? "Yes" : "No";
            let sr = { srno: index + 1 };
            a = Object.assign(a, sr);
          });
          setQuotationSendPendingList(arrList);
          setQuotationSendPendingListTemp(arrList);
          if (type !== "") {
            setSnackMsg("Activity role " + type);
            setOpen(true);
            setSnackbarType("success");
          }
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

const FetchData_approvepending = (type: string) => {
  ResetFields();
  Provider.getAll("master/getactivityroles")
    .then((response: any) => {
      if (response.data && response.data.code === 200) {
        if (response.data.data) {
          const arrList = [...response.data.data];
          arrList.map(function (a: any, index: number) {
            a.display = a.display ? "Yes" : "No";
            let sr = { srno: index + 1 };
            a = Object.assign(a, sr);
          });
          setQuotationApprovePendingList(arrList);
          setQuotationApprovePendingListTemp(arrList);
          if (type !== "") {
            setSnackMsg("Activity role " + type);
            setOpen(true);
            setSnackbarType("success");
          }
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

const FetchData_approved = (type: string) => {
  ResetFields();
  Provider.getAll("master/getactivityroles")
    .then((response: any) => {
      if (response.data && response.data.code === 200) {
        if (response.data.data) {
          const arrList = [...response.data.data];
          arrList.map(function (a: any, index: number) {
            a.display = a.display ? "Yes" : "No";
            let sr = { srno: index + 1 };
            a = Object.assign(a, sr);
          });
          setQuotationApprovedList(arrList);
          setQuotationApprovedListTemp(arrList);
          if (type !== "") {
            setSnackMsg("Activity role " + type);
            setOpen(true);
            setSnackbarType("success");
          }
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

const FetchData_rejected = (type: string) => {
  ResetFields();
  Provider.getAll("master/getactivityroles")
    .then((response: any) => {
      if (response.data && response.data.code === 200) {
        if (response.data.data) {
          const arrList = [...response.data.data];
          arrList.map(function (a: any, index: number) {
            a.display = a.display ? "Yes" : "No";
            let sr = { srno: index + 1 };
            a = Object.assign(a, sr);
          });
          setQuotationRejectedList(arrList);
          setQuotationRejectedListTemp(arrList);
          if (type !== "") {
            setSnackMsg("Activity role " + type);
            setOpen(true);
            setSnackbarType("success");
          }
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

 //#endregion 


  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Quotation Add / Edit</Typography>
          </Grid>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Quotation Add/ Edit" {...a11yProps(0)} />
              <Tab label="Quotation Send pending List" {...a11yProps(1)} />
              <Tab label="Quotation Approve Pending List" {...a11yProps(2)} />
              <Tab label="Quotation Approved List" {...a11yProps(3)} />
              <Tab label="Rejected" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <Grid item xs={4} sm={8} md={12}>
            <TabPanel value={value} index={0}>
              {/* <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={4} sm={8} md={12}>
                  {loading ? (
                    <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <CreateGallery screenType={currentScreen} />
                  )}
                </Grid>
              </Grid> */}
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                <Typography variant="h6">Client Deatils</Typography>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={3}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'right', }}>  <label style={{ color: "#ff0000" }}>*</label>Client Name</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={6}>
                        <FormControl fullWidth size="small" error={isClientNameError}>
                          <Select value={clientName} onChange={handleClientNameChange} >
                            <MenuItem disabled={true} value="--Select--">
                              --Select--
                            </MenuItem>
                            {clientNameList.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.clientName}>
                                  {item.clientName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          <FormHelperText>{clientNameError}</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item sm={1}>
                        <Button variant="contained" style={{ marginTop: "-4px" }} sx={{ mr: 1, backgroundColor: theme.palette.success.main }}>
                          <AddIcon />
                        </Button>
                      </Grid>
                    </Grid>

                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={2}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'right', }}>Client Name</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={4}>
                        <TextField
                          fullWidth
                          disabled={true}
                          sx={{ background: "#e5e5e5" }}
                          inputProps={{
                            maxLength: 10,
                          }}
                          variant="outlined"
                          size="small"
                          type="number"
                          onChange={(e) => {
                            setCName((e.target as HTMLInputElement).value);
                          }}
                          value={cName}
                        />
                      </Grid>
                      <Grid item sm={2}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'right', }}>Client No</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={4}>
                        <TextField
                          fullWidth
                          disabled={true}
                          sx={{ background: "#e5e5e5" }}
                          inputProps={{
                            maxLength: 10,
                          }}
                          variant="outlined"
                          size="small"
                          type="number"
                          onChange={(e) => {
                            setClientNo((e.target as HTMLInputElement).value);
                          }}
                          value={clientNo}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)",marginTop: "15px" }}>
                <Typography variant="h6">Project Deatils</Typography>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid item xs={4}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}>  <label style={{ color: "#ff0000" }}>*</label>Project Name</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
                        <TextField
                          fullWidth
                          inputProps={{
                            maxLength: 10,
                          }}
                          variant="outlined"
                          size="small"
                          type="number"
                          onChange={(e) => {
                            setProjectName((e.target as HTMLInputElement).value);
                            setIsProjectNameError(false);
                            setProjectNameError("");
                          }}
                          error={isProjectNameError}
                          helperText={projectNameError}
                          value={projectName}
                        />
                      </Grid>

                    </Grid>

                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}>Contact Person</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
                        <TextField
                          fullWidth
                          inputProps={{
                            maxLength: 10,
                          }}
                          variant="outlined"
                          size="small"
                          type="number"
                          onChange={(e) => {
                            setContactPerson((e.target as HTMLInputElement).value);
                            setIsContactPersonError(false);
                            setContactPersonError("");
                          }}
                          error={isContactPersonError}
                          helperText={contactPersonError}
                          value={contactPerson}
                        />
                      </Grid>
                     
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                  <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                  <Grid item sm={5}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}>Contact Number</b>
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
                            setContactNo((e.target as HTMLInputElement).value);
                            setIsContactNoError(false);
                            setContactNoError("");
                          }}
                          error={isContactNoError}
                          helperText={contactNoError}
                          value={contactNo}
                        />
                      </Grid>

                    </Grid>

                </Grid>
              </Grid>
              </Grid>



              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}> Project Description</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
                        <TextField
                          fullWidth
                          id="filled-textarea"
                          placeholder=""
                          multiline
                          maxRows={3}
                          variant="outlined"
                          onChange={(e) => {
                            setProjectDescription((e.target as HTMLInputElement).value);
                            setIsProjectDescriptionError(false);
                            setProjectDescriptionErrorText("");
                          }}
                          error={isProjectDescriptionError}
                          helperText={projectDescriptionErrorText}
                          value={projectDescription}

                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}><label style={{ color: "#ff0000" }}>*</label>Project Site Address</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
                        <TextField
                          fullWidth
                          id="filled-textarea"
                          placeholder=""
                          multiline
                          maxRows={3}
                          variant="outlined"
                          onChange={(e) => {
                            setProjectSiteAddress((e.target as HTMLInputElement).value);
                            setIsProjectSiteAddressError(false);
                            setProjectSiteAddressErrorText("");
                          }}
                          error={isProjectSiteAddressError}
                          helperText={projectSiteAddressErrorText}
                          value={projectSiteAddress}

                        />
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}> State</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
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

                    </Grid>

                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'left', }}>City</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={8}>
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

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)",marginTop: "15px"}}>
                <Typography variant="h6">Quatation Preparation Type</Typography>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid item xs={5}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                      <Grid item sm={4}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b style={{ float: 'right', }}>  <label style={{ color: "#ff0000" }}>*</label>Unit of Sales</b>
                        </Typography>
                      </Grid>
                      <Grid item sm={7}>
                        <FormControl fullWidth size="small" error={isUnitOfSalesError}>
                          <Select value={unitOfSales} onChange={handleUnitOfSalesChange} >
                            <MenuItem disabled={true} value="--Select--">
                              --Select--

                            </MenuItem>
                            <MenuItem value="foot">Foot</MenuItem>
                            <MenuItem value="Meter">Meter</MenuItem>
                            {unitOfSalesList.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.unit}>
                                  {item.unit}

                                </MenuItem>
                              );
                            })}
                          </Select>
                          <FormHelperText>{unitOfSalesError}</FormHelperText>
                        </FormControl>
                      </Grid>

                    </Grid>

                  </Grid>
                  <Grid item xs={4}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={8}>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox checked={checkInclusiveMaterial} onChange={checkboxhandleChange} />}
                                                labelPlacement="start" label="Inclusive Materials" />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                  <Grid item xs={3}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={9}>
                                        <Button variant="contained" style={{ marginTop: "-4px" }} sx={{ mr: 1, backgroundColor: theme.palette.success.main }}>
                                            <AddIcon />     Add Product
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" ,marginTop: "15px" }}>
                <Typography variant="h6">Product Details</Typography>
              </Grid>
              <Grid>
                <Typography>  ---------  Grid ------------  </Typography>
             
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" ,marginTop: "15px"}}>
                <Typography variant="h6">Terms & Condition</Typography>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >


                </Grid>
            </Grid>
          

            </TabPanel>

            <TabPanel value={value} index={1}>
            <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {quotationSendPendingList.length === 0 ? (
                 <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          onChangeSearch_SendPending((e.target as HTMLInputElement).value);
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
                      rows={quotationSendPendingListTemp}
                      columns={quotationSendPendingColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...quotationSendPendingList];
                        let a: QuotationSendPendingModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
              
            </TabPanel>

            <TabPanel value={value} index={2}>
            <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {quotationApprovePendingList.length === 0 ? (
                 <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          onChangeSearch_ApprovePending((e.target as HTMLInputElement).value);
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
                      rows={quotationApprovePendingListTemp}
                      columns={quotationApprovePendingColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...quotationApprovePendingList];
                        let a: QuotationApprovePendingModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
            </TabPanel>

            <TabPanel value={value} index={3}>
            <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {quotationApprovedList.length === 0 ? (
                 <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          onChangeSearch_ApprovedList((e.target as HTMLInputElement).value);
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
                      rows={quotationApprovedListTemp}
                      columns={quotationApprovedColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...quotationApprovedList];
                        let a: QuotationApprovedModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
            </TabPanel>

            <TabPanel value={value} index={4}>
            <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {quotationRejectedList.length === 0 ? (
                 <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          onChangeSearch_Rejected((e.target as HTMLInputElement).value);
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
                      rows={quotationRejectedListTemp}
                      columns={quotationRejectedColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...quotationRejectedList];
                        let a: QuotationRejectedModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
             </TabPanel>

          </Grid>
        </Grid>
      </Container>
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar> */}

      {/* <Dialog open={imageOpen} onClose={handleImageClose} fullScreen={currentScreen === "second" ? true : false}>
        <DialogTitle>{currentScreen === "second" ? "Catalogue Images" : ""}</DialogTitle>
        <DialogContent>
          {currentScreen === "second" ? (
            <PrismaZoom allowPan={false} style={{ height: 640, display: "flex", justifyContent: "center" }}>
              <img alt="" style={{ height: 640 }} src={selectedImage} />
            </PrismaZoom>
          ) : (
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Remarks/Reason</b>
                  <label style={{ color: "#ff0000" }}>*</label>
                </Typography>
                <TextField
                  multiline={true}
                  fullWidth
                  placeholder=""
                  variant="outlined"
                  size="small"
                  value={reason[0]}
                  error={reasonError[0]}
                  helperText={reasonErrorText[0]}
                  onChange={(e) => {
                    reason[1](e.currentTarget.value);
                    reasonError[1](false);
                    reasonErrorText[1]("");
                  }}
                />
              </Grid>

              <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Client Approved through</b>
                  <label style={{ color: "#ff0000" }}>*</label>
                </Typography>
                <FormControl error={isApprovedThroughError[0]}>
                  <RadioGroup row name="row-radio-buttons-group" value={approvedThrough[0]} onChange={handleDisplayChange}>
                    <FormControlLabel value="1" control={<Radio />} label="WhatApp" />
                    <FormControlLabel value="2" control={<Radio />} label="Email" />
                    <FormControlLabel value="3" control={<Radio />} label="SMS" />
                    <FormControlLabel value="4" control={<Radio />} label="Other" />
                    <FormControlLabel value="5" control={<Radio />} label="Own Approve" />
                  </RadioGroup>
                </FormControl>
                <FormHelperText>{approvedThroughErrorText[0]}</FormHelperText>
              </Grid>

              <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b> Upload proof</b>
                </Typography>
                <FormControl fullWidth size="small" error={errorDI}>
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
                              setImage(FileName);
                              setUploadedImage(FileName);
                            }
                            setDesignButtonText("Change");
                            setDIError(false);
                          }
                        }}
                      />
                    </Button>
                  </Grid>
                  <FormHelperText>{errorDIText}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (currentScreen === "second") {
                selectedData["type"] = "contractor";
                navigate(`/generaluser/imagegallery/productdetails`, { state: selectedData });
              } else {
                handleConfirmApprove();
              }
            }}
          >
            {currentScreen === "second" ? "Go to Estimation" : estStatus[0] === 1 ? "Confirm Approve" : "Confirm Reject"}
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default QuotationWise;

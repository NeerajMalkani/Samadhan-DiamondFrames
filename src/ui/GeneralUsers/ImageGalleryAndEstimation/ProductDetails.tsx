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
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/Header";
import { ArrowBack } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Provider from "../../../api/Provider";
import { GetStringifyJson, CalculateSqfeet } from "../../../utils/CommonFunctions";
import { communication } from "../../../utils/communication";
import { retrunValueFromLocation } from "../../../utils/JSCommonFunction";
import { theme } from "../../../theme/AppTheme";
import { ClientModel, MaterialSetupModel, ProductItemModel } from "../../../models/Model";
import { restrictNumericMobile } from "../../../utils/validations";
import { DataGrid } from "@mui/x-data-grid";
import { materialSetupColumns, searchClientColumns } from "../../../utils/tablecolumns";
import CreateClient from "../../../components/Client";
import { APIConverter } from "../../../utils/apiconverter";

const ImageGalleryProductDetailsPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  const [selectedData, setSelectedData] = useState<any>();

  const [productData, SetproductData] = useState<any>();

  const [imageOpen, setImageOpen] = useState(false);
  let dummyClient: ClientModel = null;
  const location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      debugger;
      SetCookieUseID(cookies.dfc.UserID);
      setSelectedData(retrunValueFromLocation(location, "", true));
      FetchImageGalleryProductDetail(retrunValueFromLocation(location, "", true));

      SetproductData(retrunValueFromLocation(location, "", true));

      let TotalArea = CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(widthHeightInches));
      setTotalSqFt(TotalArea);

      if (retrunValueFromLocation(location, "type") === "contractor") {
        FetchClients(cookies.dfc.UserID);
        FetchOtherClients(cookies.dfc.UserID);
      }
    }
  }, []);
  //#region Variables
  const [loading, setLoading] = useState(true);
  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [lengthFeet, setLengthFeet] = useState("1");
  const [lengthInches, setLengthInches] = useState("0");
  const [widthHeightFeet, setWidthHeightFeet] = useState("1");
  const [widthHeightInches, setWidthHeightInches] = useState("0");
  const [totalSqFt, setTotalSqFt] = useState<number>(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [pageSize, setPageSize] = useState<number>(5);

  const [searchClientList, setSearchClientList] = useState<Array<ClientModel>>([]);
  const searchResult = useState("none");

  const [selectedOtherName, setSelectedOtherName] = useState("");
  const [selectedOtherPhoneNo, setSelectedOtherPhoneNo] = useState("");

  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUserNameID, setSelectedUserNameID] = useState("");

  const [searchDisplay, setSearchDisplay] = useState("none");

  const [clientsFullData, setClientsFullData] = useState<Array<ClientModel>>([]);
  const [otherClientsFullData, setOtherClientsFullData] = useState<Array<ClientModel>>([]);

  const [otherClientsNameData, setOtherClientsNameData] = useState<Array<any>>([]);
  const [otherClientsPhoneNoData, setOtherClientsPhoneNoData] = useState<Array<any>>([]);

  const [userClientError, setUserClientError] = useState("");
  const [isUserClientError, setIsUserClientError] = useState(false);
  //#endregion 

  //#region Functions
  const CreateLengthFeet = (count: number) => {
    let menuItems = [];
    for (let i = 0; i < count; i++) {
      menuItems.push(
        <MenuItem key={i} value={i + 1}>
          {i + 1}
        </MenuItem>
      );
    }
    return menuItems;
  };

  const handleLFChange = (event: SelectChangeEvent, type: string) => {
    let lf: string = event.target.value;
    let TotalArea = 0;
    if (parseInt(lf) > 0) {
      if (type === "lengthFeet") {
        setLengthFeet(event.target.value as string);
        TotalArea = CalculateSqfeet(parseInt(lf), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(widthHeightInches));
      } else if (type === "lengthInches") {
        setLengthInches(event.target.value as string);
        TotalArea = CalculateSqfeet(parseInt(lengthFeet), parseInt(lf), parseInt(widthHeightFeet), parseInt(widthHeightInches));
      } else if (type === "widthFeet") {
        setWidthHeightFeet(event.target.value as string);
        TotalArea = CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(lf), parseInt(widthHeightInches));
      } else if (type === "widthInches") {
        setWidthHeightInches(event.target.value as string);
        TotalArea = CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(lf));
      }
      setTotalSqFt(TotalArea);
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const FetchImageGalleryProductDetail = (data: any) => {
    debugger;
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
        service_refno: data.id,
        designtype_refno: data.designTypeID,
        "product_refno": data.productID,
        designgallery_refno: data.designgallery_refno
      },
    };
    Provider.createDF(Provider.API_URLS.Getgotoestimation, params)
      //Provider.getAll(`generaluserenquiryestimations/getimagegallerybycategoryid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setSelectedData(response.data.data[0]);
            setLoading(false);
          }
        } else {
          setSnackMsg(communication.NoData);
          setSnackbarType("info");
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
  };

  const FetchEstimationMaterialSetupData = (materialSetupID, from, userDesignEstimationID, labourCost) => {
    let params = {
      MaterialSetupID: materialSetupID,
    };
    Provider.getAll(`generaluserenquiryestimations/getdesignestimateenquiriesformaterialsetup?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const targetSqFt = totalSqFt;
            let subtotalCal = 0;
            response.data.data.map((k: ProductItemModel, i) => {
              let length = k.length.toString().split(".");
              let width = k.width.toString().split(".");
              const destinationSqFt = CalculateSqfeet(parseInt(length[0]), parseInt(length[1] === undefined ? "0" : length[1]), parseInt(width[0]), parseInt(width[1] === undefined ? "0" : width[1]));
              let newAmount = (targetSqFt * parseFloat(k.amount)) / destinationSqFt;
              newAmount = newAmount - newAmount * (k.generalDiscount / 100);
              subtotalCal += newAmount;
            });
            InsertDesignEstimationEnquiry(from, 2, subtotalCal, userDesignEstimationID, labourCost);
          }
        }
      })
      .catch((e) => { });
  };

  const FetchEstimationData = (userDesignEstimationID, from) => {
    let params = {
      UserDesignEstimationID: userDesignEstimationID,
    };
    Provider.getAll(`generaluserenquiryestimations/getdesignestimateenquiries?${new URLSearchParams(params)}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            FetchEstimationMaterialSetupData(response.data.data[0].id, from, userDesignEstimationID, response.data.data[0].labourCost);
          }
        }
      })
      .catch((e) => { });
  };

  const AddMoreDesigns = (addMore) => {
    debugger;
    const params = {
      data: {

        "Sess_UserRefno": CookieUserID,
        "Sess_group_refno": cookies.dfc.Sess_group_refno,
        "clickaddmorecheck": addMore,
        "service_refno": productData.id,
        "designtype_refno": productData.designTypeID,
        "product_refno": productData.productID,
        "designgallery_refno": productData.designgallery_refno,
        "lengthfoot": lengthFeet,
        "lengthinches": lengthInches,
        "widthheightfoot": widthHeightFeet,
        "widthheightinches": widthHeightInches,
        "totalfoot": totalSqFt
      }
    };

    Provider.createDF(Provider.API_URLS.GetscEstimation, params)
      .then((response) => {
        debugger;
        if (response.data && response.data.code === 200) {
          debugger;
          navigate(`/generaluser/imagegallery/category`);
          // if (fromCount === 2) {
          //   if (from === "add") {
          //     if (selectedData.type === "gallery") {
          //       navigate(`/generaluser/imagegallery/category`);
          //     } else if (selectedData.type === "contractor") {
          //       navigate(`/contractor/quotationandestimation/designwise`, { state: { type: "pending" } });
          //     } else {
          //       navigate(`/dashboard`);
          //     }
          //   } else {
          //     navigate(`/generaluser/imagegallery/productestimationdetails`, { state: { userDesignEstimationID: response.data.data[0].userDesignEstimationID, type: selectedData.type } });
          //   }
          // } else {
          //   FetchEstimationData(response.data.data[0].userDesignEstimationID, from);
          // }
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

  };

  const InsertDesignEstimationEnquiry = (from: string, fromCount: number, subtotal: number, userDesignEstimationID: number, labourCost) => {
    const params = {
      UserID: CookieUserID,
      DesignTypeID: selectedData.designTypeID,
      WorkLocationID: selectedData.workLocationID,
      Length: parseFloat(lengthFeet + "." + lengthInches),
      Width: parseFloat(widthHeightFeet + "." + widthHeightInches),
      Status: false,
      TotalAmount: subtotal + subtotal * (5 / 100),
      SubtotalAmount: subtotal ? subtotal : 0,
      LabourCost: subtotal ? totalSqFt * labourCost : 0,
    };

    if (fromCount === 2) {
      params["ID"] = userDesignEstimationID;
    }

    if (selectedData.type === "contractor") {
      params["ClientID"] = selectedUserNameID;
      params["ApprovalStatus"] = 0;
    }

    Provider.create("generaluserenquiryestimations/insertdesignestimateenquiries", params)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          if (fromCount === 2) {
            if (from === "add") {
              if (selectedData.type === "gallery") {
                navigate(`/generaluser/imagegallery/category`);
              } else if (selectedData.type === "contractor") {
                navigate(`/contractor/quotationandestimation/designwise`, { state: { type: "pending" } });
              } else {
                navigate(`/dashboard`);
              }
            } else {
              navigate(`/generaluser/imagegallery/productestimationdetails`, { state: { userDesignEstimationID: response.data.data[0].userDesignEstimationID, type: selectedData.type } });
            }
          } else {
            FetchEstimationData(response.data.data[0].userDesignEstimationID, from);
          }
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
  };

  const handleClientSearch = () => {
    if (selectedOtherName === "" && selectedOtherPhoneNo === "") {
      setSearchClientList([]);
      searchResult[1]("none");
    } else {
      setSearchClientList(
        otherClientsFullData.filter((el: ClientModel) => {
          if (selectedOtherPhoneNo === "" && selectedOtherName !== "") return el.companyName.toString().toLowerCase().includes(selectedOtherName.toLowerCase());
          else if (selectedOtherPhoneNo !== "" && selectedOtherName === "") return el.contactMobileNumber.toString().toLowerCase().includes(selectedOtherPhoneNo.toLowerCase());
          else {
            return el.companyName.toString().toLowerCase().includes(selectedOtherName.toLowerCase()) || el.contactMobileNumber.toString().toLowerCase().includes(selectedOtherPhoneNo.toLowerCase());
          }
        })
      );
      searchResult[1]("block");
    }
  };
  const handleImageClose = () => {
    setImageOpen(false);
  };

  const FetchClients = (userID: number) => {
    let params = {
      AddedByUserID: userID,
    };
    Provider.getAll(`contractorquotationestimation/getclients?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const userClientData: any = [];
            response.data.data.map((el: any, i: number) => {
              if (el.serviceType === 3 || el.serviceType === 13 || el.serviceType === 23 || el.serviceType === 123) {
                userClientData.push({
                  id: el.id,
                  label: el.companyName,
                });
              }
            });
            setClientsFullData(userClientData);
          }
        } else {
          setClientsFullData([]);
        }
      })
      .catch((e) => {
        setClientsFullData([]);
      });
  };

  const FetchOtherClients = (userID: number) => {
    let params = {
      AddedByUserID: userID,
    };
    Provider.getAll(`contractorquotationestimation/getotherclients?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setOtherClientsFullData(response.data.data);
            let NameData = [];
            let PhoneData = [];
            response.data.data.map((data, i) => {
              let sr = { srno: i + 1 };
              data = Object.assign(data, sr);

              NameData.push({
                id: data.id,
                label: data.companyName,
              });

              PhoneData.push({
                id: data.id,
                label: data.contactMobileNumber,
              });
            });
            setOtherClientsNameData(NameData);
            setOtherClientsPhoneNoData(PhoneData);
          }
        } else {
          setOtherClientsNameData([]);
          setOtherClientsPhoneNoData([]);
          setOtherClientsFullData([]);
        }
      })
      .catch((e) => {
        setOtherClientsNameData([]);
        setOtherClientsPhoneNoData([]);
        setOtherClientsFullData([]);
      });
  };

  const InsertOtherClient = (clientID: number) => {
    const params = {
      ID: clientID,
      AddedByUserID: CookieUserID,
    };
    Provider.create("contractorquotationestimation/insertotherclient", params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          FetchClients(CookieUserID);
          FetchOtherClients(CookieUserID);
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
  };
  //#endregion 

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <IconButton
              aria-label="back"
              size="large"
              sx={{ marginTop: "-8px" }}
              onClick={() => {
                if (selectedData.type === "contractor") {
                  navigate(`/contractor/quotationandestimation/designwise`);
                } else {
                  navigate(`/generaluser/imagegallery/product`, { state: { id: selectedData.serviceID, name: selectedData.serviceName, type: selectedData.type } });
                }
              }}
            >
              <ArrowBack fontSize="small" />
            </IconButton>
            <Typography sx={{ ml: 1, display: "inline" }} variant="h4">
              Design Estimation
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ padding: "8px", border: "1px solid rgba(0,0,0,0.54)" }}>
                  <Grid item xs={4} sm={4} md={5} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ maxWidth: 360, maxHeight: 360, overflow: "hidden", padding: "4px", border: "1px solid rgba(0,0,0,0.12)" }}>
                      <img
                        src={selectedData.designImage}
                        alt={selectedData.designTypeName}
                        style={{ display: "block", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={4} sm={4} md={6}>
                    <Grid item xs={4} sm={4} md={6} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2">
                        <b>{selectedData.designNumber}</b>
                      </Typography>
                      <Typography variant="subtitle2">Design Code</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2">
                        <b>{selectedData.designTypeName}</b>
                      </Typography>
                      <Typography variant="subtitle2">Design Type</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2">
                        <b>{selectedData.categoryName}</b>
                      </Typography>
                      <Typography variant="subtitle2">Category Name</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2">
                        <b>{selectedData.productName}</b>
                      </Typography>
                      <Typography variant="subtitle2">Product Name</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {selectedData.type === "contractor" ? (
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ mt: 3 }}>
                    <Grid item xs={4} sm={8} md={12} sx={{ mt: 3 }}>
                      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={4} sm={8} md={12}>
                          <Typography variant="h6" sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                            Client Details
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            <b>Name / Company Name</b>
                          </Typography>
                          <Autocomplete
                            disablePortal
                            fullWidth
                            options={clientsFullData}
                            onChange={(event: React.SyntheticEvent, value: any) => {
                              setIsUserClientError(false);
                              setUserClientError("");
                              if (value !== null) {
                                setSelectedUserName(value.label);
                                setSelectedUserNameID(value.id);
                              }
                            }}
                            value={selectedUserName}
                            renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isUserClientError} helperText={userClientError} />}
                          />
                        </Grid>
                        <Grid item xs={4} sm={4} md={6} sx={{ mt: "37px" }}>
                          <Button
                            sx={{ float: "left" }}
                            variant="contained"
                            onClick={() => {
                              setImageOpen(true);
                            }}
                          >
                            Create Client
                          </Button>
                          <Typography sx={{ float: "left", ml: 2, mt: "8px" }}>OR</Typography>
                          <Button
                            sx={{ float: "left", ml: 2 }}
                            variant="contained"
                            onClick={() => {
                              setSearchDisplay("block");
                            }}
                          >
                            Search & Add
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={4} sm={8} md={12} sx={{ mt: 2, display: searchDisplay }}>
                      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={4} sm={8} md={12}>
                          <Typography variant="h6" sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                            Search Client
                          </Typography>
                        </Grid>

                        <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            <b>Name / Company Name</b>
                          </Typography>
                          <Autocomplete
                            disablePortal
                            fullWidth
                            options={otherClientsNameData}
                            onChange={(event: React.SyntheticEvent, value: any) => {
                              if (value !== null) {
                                setSelectedOtherName(value.label);
                              }
                            }}
                            value={selectedOtherName}
                            renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" />}
                          />
                        </Grid>

                        <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            <b>Phone Number</b>
                          </Typography>
                          <Autocomplete
                            disablePortal
                            fullWidth
                            options={otherClientsPhoneNoData}
                            onChange={(event: React.SyntheticEvent, value: any) => {
                              if (value !== null) {
                                setSelectedOtherPhoneNo(value.label);
                              }
                            }}
                            value={selectedOtherPhoneNo}
                            renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" />}
                          />
                        </Grid>

                        <Grid item xs={4} sm={4} md={4} sx={{ mt: "36px" }}>
                          <Button variant="contained" onClick={handleClientSearch}>
                            Search
                          </Button>
                        </Grid>

                        <Grid item xs={4} sm={8} md={12} style={{ display: searchResult[0] }}>
                          <DataGrid
                            autoHeight={true}
                            getRowHeight={() => "auto"}
                            rows={searchClientList}
                            columns={searchClientColumns}
                            pageSize={pageSize}
                            rowsPerPageOptions={[5, 10, 20]}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            disableSelectionOnClick
                            onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                              const arrActivity = [...searchClientList];
                              let a: ClientModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                              InsertOtherClient(a.id);
                            }}
                            sx={{
                              "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <></>
                )}
                <Grid item xs={4} sm={8} md={12} sx={{ mt: 3 }}>
                  <Typography sx={{ ml: 1, borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }} variant="h6">
                    AREA SQ.FT Calculation & Get Estimation
                  </Typography>
                  <Grid container columns={{ xs: 4, sm: 8, md: 12 }} sx={{ mt: 1 }}>
                    <Grid container xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, width: "100%" }}>
                        <b>Length</b>
                        <label style={{ color: "#ff0000" }}>*</label>
                      </Typography>
                      <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Feet</b>
                        </Typography>
                        <Select
                          value={lengthFeet}
                          onChange={(e) => {
                            handleLFChange(e, "lengthFeet");
                          }}
                        >
                          {CreateLengthFeet(50)}
                        </Select>
                      </Grid>
                      <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Inches</b>
                        </Typography>
                        <Select
                          value={lengthInches}
                          onChange={(e) => {
                            handleLFChange(e, "lengthInches");
                          }}
                        >
                          <MenuItem value="0">0</MenuItem>
                          {CreateLengthFeet(11)}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, width: "100%" }}>
                        <b>Width / Height</b>
                        <label style={{ color: "#ff0000" }}>*</label>
                      </Typography>
                      <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Feet</b>
                        </Typography>
                        <Select
                          value={widthHeightFeet}
                          onChange={(e) => {
                            handleLFChange(e, "widthFeet");
                          }}
                        >
                          {CreateLengthFeet(50)}
                        </Select>
                      </Grid>
                      <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Inches</b>
                        </Typography>
                        <Select
                          value={widthHeightInches}
                          onChange={(e) => {
                            handleLFChange(e, "widthInches");
                          }}
                        >
                          <MenuItem value="0">0</MenuItem>
                          {CreateLengthFeet(11)}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} sm={4} md={3} sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                      <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <b style={{ padding: 8 }}>Total (Sq.Ft)</b>
                        <label style={{ color: "#ff0000", marginLeft: "16px", border: "2px solid rgba(0,0,0,0.12)", padding: 8, borderRadius: "4px" }}>{totalSqFt}</label>
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={3} sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {selectedData.type !== "contractor" ? (
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: theme.palette.error.main }}
                            onClick={() => {
                              AddMoreDesigns("1");
                              //InsertDesignEstimationEnquiry("add", 1, 0, 0, 0);
                              // navigate(`/generaluser/imagegallery/category`);
                            }}
                          >
                            Add more Rooms & Design
                          </Button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
                    <LoadingButton
                      loading={buttonLoading}
                      variant="contained"
                      sx={{ mt: 1 }}
                      onClick={() => {
                        AddMoreDesigns("0");
                        //InsertDesignEstimationEnquiry("", 1, 0, 0, 0);
                      }}
                    >
                      {selectedData.type !== "contractor" ? "Submit" : "Create Quote"}
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
      {selectedData && selectedData.type === "contractor" ? (
        <Dialog open={imageOpen} onClose={handleImageClose}>
          <DialogTitle>Client</DialogTitle>
          <DialogContent>
            <div style={{ minWidth: "640px" }}>
              <CreateClient
                client={dummyClient}
                saveCallBack={() => {
                  handleImageClose();
                  setSnackMsg("Client Added");
                  setSnackbarType("success");
                  setOpen(true);
                  FetchClients(CookieUserID);
                }}
                cancelCallBack={() => {
                  FetchClients(CookieUserID);
                  handleImageClose();
                }}
                type={"add"}
                cardDisplay={"block"}
              />
            </div>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleImageClose}>Cancel</Button>
            <Button onClick={handleImageClose}>Add</Button>
          </DialogActions> */}
        </Dialog>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ImageGalleryProductDetailsPage;

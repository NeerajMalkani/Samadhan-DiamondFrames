import {
  Alert,
  AlertColor,
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
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import ShowsGrid from "../../../../components/GridStructure";
import Header from "../../../../components/Header";
import NoData from "../../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { ButtonSettings, EstimationCostDetails, ImageGalleryEstimation, MaterialSetupModel, QuotationDataModel } from "../../../../models/Model";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { theme } from "../../../../theme/AppTheme";
import { contractorApprovedQuotation, contractorPendingQuotation, contractorRejectedQuotation, materialSetupColumns } from "../../../../utils/tablecolumns";
import { ArrowBack } from "@mui/icons-material";
import PrismaZoom from "react-prismazoom";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import Provider from "../../../../api/Provider";
import { communication } from "../../../../utils/communication";
import { CalculateSqfeet, GetStringifyJson } from "../../../../utils/CommonFunctions";
import { retrunValueFromLocation } from "../../../../utils/JSCommonFunction";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface BrandItemModel {
  brandID: number;
  brandName: string;
  categoryName: string;
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

const DesignWisePage = () => {
  const [value, setValue] = useState(0);
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageGalleryData, setImageGalleryData] = useState<Array<ImageGalleryEstimation>>([]);
  const [imageGalleryDesignTypeData, setImageGalleryDesignTypeData] = useState<Array<ImageGalleryEstimation>>([]);
  const [currentScreen, setCurrentScreen] = useState("first");

  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [serviceName, setServiceName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<ImageGalleryEstimation>();

  const [buttonLoading, setButtonLoading] = useState(false);
  const [isShowDeatils, setIsShowDeatils] = useState<Boolean>(false);
  const [estimationData, setEstimationData] = useState<Array<EstimationCostDetails>>([]);

  const [isBrandError, setIsBrandError] = useState(false);
  const [brandError, setBrandError] = useState("");

  const [brandList, setBrandList] = useState<Array<BrandItemModel>>([]);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);

  const [searchQueryPending, setSearchQueryPending] = useState("");
  const [searchQueryApproved, setSearchQueryApproved] = useState("");
  const [searchQueryRejected, setSearchQueryRejected] = useState("");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [pageSize, setPageSize] = useState<number>(5);

  const pendingData = useState<Array<QuotationDataModel>>([]);
  const approvedData = useState<Array<QuotationDataModel>>([]);
  const rejectedData = useState<Array<QuotationDataModel>>([]);

  const pendingSearchData = useState<Array<QuotationDataModel>>([]);
  const approvedSearchData = useState<Array<QuotationDataModel>>([]);
  const rejectedSearchData = useState<Array<QuotationDataModel>>([]);

  const selectedItem = useState<QuotationDataModel>();

  const reason = useState("");
  const reasonError = useState(false);
  const reasonErrorText = useState("");

  const approvedThrough = useState("");

  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadFileUpload, setUploadFileUpload] = useState<any>();
  const [errorDI, setDIError] = useState(false);
  const [errorDIText, setDIErrorText] = useState("");
  const [designButtonText, setDesignButtonText] = useState("Upload Proof");

  let navigate = useNavigate();
  const location = useLocation();

  const buttonSettingProduct: ButtonSettings = {
    isActionButton: false,
    actionButtons: [
      {
        title: "Zoom",
        type: "text",
        callBack: (data: ImageGalleryEstimation) => {
          setSelectedImage(data.designImage);
          setImageOpen(true);
        },
      },
      {
        title: "Go to Estimation",
        type: "text",
        callBack: (data: ImageGalleryEstimation) => {
          data["type"] = "contractor";
          navigate(`/generaluser/imagegallery/productdetails`, { state: data });
        },
      },
    ],
  };

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
      let Type = retrunValueFromLocation(location, "type");
      if (Type === "pending") {
        setValue(1);
      }
      FetchImageGalleryData();
      FetchData(cookies.dfc.UserID);
    }
  }, []);

  const FetchImageGalleryData = () => {
    Provider.getAll("generaluserenquiryestimations/getimagegallery")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setImageGalleryData(response.data.data);
          }
        } else {
          setImageGalleryData([]);
          setSnackMsg(communication.NoData);
          setSnackbarType("info");
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setImageGalleryData([]);
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
  };

  const FetchImageGalleryDesignType = (id: number) => {
    let params = {
      CategoryID: id,
    };

    Provider.getAll(`generaluserenquiryestimations/getimagegallerybycategoryid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setImageGalleryDesignTypeData(response.data.data);
          }
        } else {
          setImageGalleryDesignTypeData([]);
          setSnackMsg(communication.NoData);
          setSnackbarType("info");
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setImageGalleryDesignTypeData([]);
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
  };

  const handleCardClickFirst = (data: ImageGalleryEstimation) => {
    setCurrentScreen("second");

    FetchImageGalleryDesignType(data.serviceID);
    setServiceName(data.serviceName);
  };

  const handleCardClickSecond = (data: ImageGalleryEstimation) => {
    setSelectedData(data);
    setSelectedImage(data.designImage);
    setImageOpen(true);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onChangeSearch = (query: string, type: string) => {
    switch (type) {
      case "pending":
        setSearchQueryPending(query);
        if (query === "") {
          pendingSearchData[1](pendingData[0]);
        } else {
          pendingSearchData[1](
            pendingData[0].filter((el: QuotationDataModel) => {
              return el.fullName.toString().toLowerCase().includes(query.toLowerCase());
            })
          );
        }
        break;
      case "approved":
        setSearchQueryApproved(query);
        if (query === "") {
          approvedSearchData[1](approvedData[0]);
        } else {
          approvedSearchData[1](
            approvedData[0].filter((el: QuotationDataModel) => {
              return el.fullName.toString().toLowerCase().includes(query.toLowerCase());
            })
          );
        }
        break;
      case "rejected":
        setSearchQueryRejected(query);
        if (query === "") {
          rejectedSearchData[1](rejectedData[0]);
        } else {
          rejectedSearchData[1](
            rejectedData[0].filter((el: QuotationDataModel) => {
              return el.fullName.toString().toLowerCase().includes(query.toLowerCase());
            })
          );
        }
        break;
    }
  };

  const InsertDesignEstimationEnquiry = () => {
    setButtonLoading(true);
    // const params = {
    //   ID: selectedID,
    //   Status: true,
    //   TotalAmount: materialCost + materialCost * (5 / 100),
    // };

    Provider.create("generaluserenquiryestimations/insertdesignestimateenquiries", {})
      .then((response) => {
        if (response.data && response.data.code === 200) {
          navigate(`/generaluser/userestimation`);
        } else {
          setSnackMsg(communication.Error);
          setSnackbarType("error");
          setOpen(true);
          setButtonLoading(false);
        }
      })
      .catch((e) => {
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
        setButtonLoading(false);
      });
  };

  const CreateGallery = (props) => {
    if (props.screenType === "first") {
      return (
        <div>
          {imageGalleryData.length === 0 ? (
            <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
          ) : (
            <ShowsGrid shows={imageGalleryData} buttonSettings={buttonSetting} cardCallback={handleCardClickFirst} type="category" />
          )}
        </div>
      );
    } else if (props.screenType === "second") {
      return (
        <div>
          {imageGalleryDesignTypeData.length === 0 ? (
            <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
          ) : (
            <Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                <IconButton
                  aria-label="back"
                  size="large"
                  sx={{ marginTop: "-8px" }}
                  onClick={() => {
                    setCurrentScreen("first");
                  }}
                >
                  <ArrowBack fontSize="small" />
                </IconButton>
                <Typography sx={{ ml: 1, display: "inline" }} variant="h4">
                  {"Image Gallery » " + serviceName}
                </Typography>
              </Grid>
              <ShowsGrid shows={imageGalleryDesignTypeData} buttonSettings={buttonSettingProduct} cardCallback={handleCardClickSecond} type="category" />
            </Grid>
          )}
        </div>
      );
    } else if (props.screenType === "pending") {
      let length = selectedItem[0].length.toString().split(".");
      let width = selectedItem[0].width.toString().split(".");
      const destinationSqFt = CalculateSqfeet(parseInt(length[0]), parseInt(length[1] === undefined ? "0" : length[1]), parseInt(width[0]), parseInt(width[1] === undefined ? "0" : width[1]));

      return (
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={3} sx={{ mt: 2 }}>
            <Paper className="flex-column flex-center padding-16">
              <Typography variant="h6" sx={{ mt: 1, color: "rgba(0,0,0,0.54)" }}>
                Total Sq.Ft
              </Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {destinationSqFt.toFixed(4)}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={3} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Paper className="flex-column flex-center padding-16">
              <Typography variant="h6" sx={{ mt: 1, color: "rgba(0,0,0,0.54)" }}>
                Total Amount
              </Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {(selectedItem[0].subtotalAmount + selectedItem[0].subtotalAmount * (5 / 100) + selectedItem[0].labourCost).toFixed(4)}0
              </Typography>
              <Button
                startIcon={<VisibilityIcon />}
                variant="text"
                onClick={() => {
                  setIsShowDeatils(true);
                }}
              >
                View details
              </Button>
            </Paper>
            {isShowDeatils ? <Typography sx={{ fontSize: 48, ml: "48px" }}>=</Typography> : <></>}
          </Grid>

          {isShowDeatils ? (
            <>
              <Grid item xs={2} sm={4} md={3} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Paper className="flex-column flex-center padding-16">
                  <Typography variant="h6" sx={{ mt: 1, color: "rgba(0,0,0,0.54)" }}>
                    Material Cost
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {(selectedItem[0].subtotalAmount + selectedItem[0].subtotalAmount * (5 / 100)).toFixed(4)}0
                  </Typography>
                </Paper>
                <Typography sx={{ fontSize: 48, ml: "48px" }}>+</Typography>
              </Grid>
              <Grid item xs={2} sm={4} md={3} sx={{ mt: 2 }}>
                <Paper className="flex-column flex-center padding-16">
                  <Typography variant="h6" sx={{ mt: 1, color: "rgba(0,0,0,0.54)" }}>
                    Labour Cost
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {selectedItem[0].labourCost.toFixed(4)}0
                  </Typography>
                </Paper>
              </Grid>
            </>
          ) : (
            <></>
          )}

          <Grid item xs={4} sm={4} md={12} sx={{ mt: 1 }}>
            <FormControl style={{ width: 240 }} size="small" error={isBrandError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Brand Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={selectedBrand.toString()} onChange={handleBrandChange}>
                <MenuItem disabled={true} value="0">
                  --Select--
                </MenuItem>
                {brandList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.brandID}>
                      {item.brandName + " (" + item.categoryName + ")"}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{brandError}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={8} md={12} sx={{ textAlign: "center", mt: 2 }}>
            <LoadingButton startIcon={<EmailIcon />} loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={InsertDesignEstimationEnquiry}>
              Update & Send Quote
            </LoadingButton>
          </Grid>
        </Grid>
      );
    }
  };

  const handleImageClose = () => {
    setImageOpen(false);
  };

  const handleBrandChange = (event: SelectChangeEvent) => {
    // let brandData: number = parseInt(event.target.value);
    // if (brandData > 0) {
    //   setSelectedBrand(brandData);
    //   let ProductData1 = brandProductList.filter((el: BrandProductItemModel) => el.brandID === brandData);
    //   let ProductData: Array<ProductItemModel> = [...productItem];
    //   ProductData.map((value: ProductItemModel, index: number) => {
    //     ProductData1.find(function (item: BrandProductItemModel, i: number) {
    //       if (item.productID === value.productID) {
    //         value.brandName = item.brandName;
    //         value.brandID = item.brandID;
    //         value.rate = item.price.toFixed(4);
    //         if (parseFloat(value.formula) !== 0) {
    //           value.quantity = (parseFloat(totalSqFt.toString()) / parseFloat(value.formula)).toFixed(4);
    //           value.amount = (parseFloat(value.quantity) * parseFloat(value.rate === "0" ? "1" : value.rate)).toFixed(4);
    //         }
    //         return i;
    //       }
    //     });
    //   });
    //   const newChecked = [...ProductData];
    //   const productids = newChecked.map((data) => data.amount);
    //   setSubTotal(productids.reduce((a, b) => a + parseFloat(b), 0).toFixed(4));
    //   setProductItem(ProductData);
    //   setIsBrandError(false);
    //   setBrandError("");
    // }
  };

  const FetchData = (userID: number) => {
    let params = {
      UserID: userID,
    };
    Provider.getAll(`contractorquotationestimation/getcontractorallestimation?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          console.log(response.data);
          if (response.data.data) {
            let pendData = [],
              apprData = [],
              rejData = [];
            response.data.data.map((data, index) => {
              if (data.approvalStatus === 0) {
                data["srno"] = pendData.length + 1;
                pendData.push(data);
              } else if (data.approvalStatus === 1) {
                data["srno"] = apprData.length + 1;
                apprData.push(data);
              } else if (data.approvalStatus === 2) {
                data["srno"] = rejData.length + 1;
                rejData.push(data);
              }
            });

            pendingData[1](pendData);
            pendingSearchData[1](pendData);

            approvedData[1](apprData);
            approvedSearchData[1](apprData);

            rejectedData[1](rejData);
            rejectedSearchData[1](rejData);
          }
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    approvedThrough[1]((event.target as HTMLInputElement).value);
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Material Setup</Typography>
          </Grid>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Design Gallery" {...a11yProps(0)} />
              <Tab label="Pending" {...a11yProps(1)} />
              <Tab label="Approved" {...a11yProps(2)} />
              <Tab label="Rejected" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <Grid item xs={4} sm={8} md={12}>
            <TabPanel value={value} index={0}>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={4} sm={8} md={12}>
                  {loading ? (
                    <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <CreateGallery screenType={currentScreen} />
                  )}
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                  <Typography variant="h6">Pending list</Typography>
                </Grid>

                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {imageGalleryData.length === 0 ? (
                      <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                    ) : (
                      <>
                        <Grid item xs={4} sm={8} md={12} sx={{ mt: 1, alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                          <TextField
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                              onChangeSearch((e.target as HTMLInputElement).value, "pending");
                            }}
                            value={searchQueryPending}
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
                          getRowHeight={() => "auto"}
                          rows={pendingSearchData[0]}
                          columns={contractorPendingQuotation}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            const arrActivity = [...pendingData[0]];
                            let a: QuotationDataModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                            if (a) {
                              const clickType = (e.target as any).textContent;
                              if (clickType.toLowerCase() === "edit") {
                                selectedItem[1](a);
                                setValue(0);
                                setCurrentScreen("pending");
                              } else if (clickType.toLowerCase() === "self approve") {
                                setImageOpen(true);
                              }
                            }
                          }}
                          sx={{
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                            },
                          }}
                        />
                      </>
                    )}
                  </div>
                )}
              </Grid>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                  <Typography variant="h6">Approved list</Typography>
                </Grid>

                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {imageGalleryData.length === 0 ? (
                      <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                    ) : (
                      <>
                        <Grid item xs={4} sm={8} md={12} sx={{ mt: 1, alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                          <TextField
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                              onChangeSearch((e.target as HTMLInputElement).value, "approved");
                            }}
                            value={searchQueryApproved}
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
                          getRowHeight={() => "auto"}
                          rows={approvedSearchData[0]}
                          columns={contractorApprovedQuotation}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            const arrActivity = [...approvedData[0]];
                            let a: QuotationDataModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                            if (a) {
                              const clickType = (e.target as any).textContent;
                              if (clickType.toLowerCase() === "edit") {
                                selectedItem[1](a);
                                setValue(0);
                                setCurrentScreen("pending");
                              } //handelEditAndDelete(clickType, a);
                            }
                          }}
                          sx={{
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                            },
                          }}
                        />
                      </>
                    )}
                  </div>
                )}
              </Grid>
            </TabPanel>

            <TabPanel value={value} index={3}>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                  <Typography variant="h6">Rejected list</Typography>
                </Grid>

                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {imageGalleryData.length === 0 ? (
                      <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                    ) : (
                      <>
                        <Grid item xs={4} sm={8} md={12} sx={{ mt: 1, alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                          <TextField
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                              onChangeSearch((e.target as HTMLInputElement).value, "rejected");
                            }}
                            value={searchQueryRejected}
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
                          getRowHeight={() => "auto"}
                          rows={rejectedSearchData[0]}
                          columns={contractorRejectedQuotation}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {}}
                          sx={{
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                            },
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>

      <Dialog open={imageOpen} onClose={handleImageClose} fullScreen={currentScreen === "second" ? true : false}>
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
                <FormControl>
                  <RadioGroup row name="row-radio-buttons-group" value={approvedThrough[0]} onChange={handleDisplayChange}>
                    <FormControlLabel value="1" control={<Radio />} label="WhatApp" />
                    <FormControlLabel value="2" control={<Radio />} label="Email" />
                    <FormControlLabel value="3" control={<Radio />} label="SMS" />
                    <FormControlLabel value="4" control={<Radio />} label="Other" />
                    <FormControlLabel value="5" control={<Radio />} label="Own Approve" />
                  </RadioGroup>
                </FormControl>
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
              }
            }}
          >
            {currentScreen === "second" ? "Go to Estimation" : "Confirm Approve"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DesignWisePage;

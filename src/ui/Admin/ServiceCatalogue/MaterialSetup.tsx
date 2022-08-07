import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertColor,
  Autocomplete,
  Box,
  Button,
  Checkbox,
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
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Snackbar,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../../../api/Provider";
import Header from "../../../components/Header";
import { BrandModel, CategoryModel, DesignTypeModel, ProductModel, ServiceNameModel } from "../../../models/Model";
import { theme } from "../../../theme/AppTheme";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { brandColumns } from "../../../utils/tablecolumns";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
          <Typography>{children}</Typography>
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

interface ProductItemModel {
  serviceID: number;
  categoryID: number;
  productID: number;
  productName: string;
  brandID: number;
  brandName: string;
  quantity: number;
  rate: number;
  amount: number;
  formula: number;
}

const MaterialSetup = () => {
  const [value, setValue] = useState(0);
  const [cookies, setCookie] = useCookies(["dfc"]);
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

  const [sn, setSn] = useState("--Select--");
  const [snID, setSnID] = useState<number>(0);
  const [servicenameError, setServicenameError] = useState("");
  const [isServicenameError, setIsServicenameError] = useState(false);
  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);

  const [cn, setCn] = useState("--Select--");
  const [cnID, setCnID] = useState<number>(0);
  const [categorynameError, setCategorynameError] = useState("");
  const [isCategorynameError, setIsCategorynameError] = useState(false);
  const [categoryList, setCategoryList] = useState<Array<CategoryModel>>([]);

  const [pn, setPn] = useState("--Select--");
  const [pnID, setPnID] = useState(0);
  const [productError, setProductError] = useState("");
  const [isProductError, setIsProductError] = useState(false);
  const [productList, setProductList] = useState<Array<ProductModel>>([]);

  const [pdt, setPdt] = useState("--Select--");
  const [pdtID, setPdtID] = useState(0);
  const [productDesignTypeError, setProductDesignTypeError] = useState("");
  const [isProductDesignTypeError, setIsProductDesignTypeError] = useState(false);
  const [productDesignTypeList, setProductDesignTypeList] = useState<Array<DesignTypeModel>>([]);

  const [materialSetupList, setMaterialSetupList] = useState<Array<any>>([]);
  const [materialSetupListTemp, setMaterialSetupListTemp] = useState<Array<any>>([]);

  const [display, setDisplay] = useState("Yes");

  const [lengthFeet, setLengthFeet] = useState("8");
  const [isLengthFeetError, setIsLengthFeetError] = useState<boolean>(false);
  const [lengthFeetError, setLengthFeetError] = useState("");

  const [lengthInches, setLengthInches] = useState("0");
  const [isLengthInchesError, setIsLengthInchesError] = useState<boolean>(false);
  const [lengthInchesError, setLengthInchesError] = useState("");

  const [widthHeightFeet, setWidthHeightFeet] = useState("8");
  const [isWidthHeightFeetError, setIsWidthHeightFeetError] = useState<boolean>(false);
  const [widthHeightFeetError, setWidthHeightFeetError] = useState("");

  const [widthHeightInches, setWidthHeightInches] = useState("0");
  const [isWidthHeightInchesError, setIsWidthHeightInchesError] = useState<boolean>(false);
  const [widthHeightInchesError, setWidthHeightInchesError] = useState("");

  const [productItem, setProductItem] = useState<Array<ProductItemModel>>([]);

  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [pageSize, setPageSize] = useState<number>(5);

  const [arnID, setArnID] = useState<number>(0);
  const [arnDealerID, setArnDealerID] = useState<number>(0);
  const [totalSqFt, setTotalSqFt] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);

  const [openDialog, setOpenDialog] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");

  const [snDealer, setDealerSn] = useState("--Select--");
  const [snDealerID, setSnDealerID] = useState<number>(0);
  const [serviceNameDealerList, setServiceNameDealerList] = useState<Array<ServiceNameModel>>([]);

  const [cnDealer, setDealerCn] = useState("--Select--");
  const [cnDealerID, setCnDealerID] = useState<number>(0);
  const [categoryDealerList, setCategoryDealerList] = useState<Array<CategoryModel>>([]);

  const [pnDealer, setPnDealer] = useState("--Select--");
  const [pnDealerID, setPnDealerID] = useState(0);
  const [productDealerList, setProductDealerList] = useState<Array<ProductModel>>([]);

  const [brandList, setBrandList] = useState<Array<BrandModel>>([]);

  useEffect(() => {
    // setProductItem([
    //   {
    //     serviceID: 0,
    //     categoryID: 0,
    //     productID: 0,
    //     productName: "Suraj",
    //     brandID: 0,
    //     brandName: "",
    //     quantity: 1,
    //     rate: 2.5,
    //     amount: 0,
    //     formula: 2,
    //   },
    // ]);
    FetchActvityRoles();
    CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(widthHeightInches));
  }, []);

  const FetchActvityRoles = () => {
    Provider.getAll("master/getmainactivities")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            let contractorData = response.data.data.find((el) => {
              return el.display && el.activityRoleName === "Contractor";
            });
            setArnID(contractorData.id);

            let dealerData = response.data.data.find((el) => {
              return el.display && el.activityRoleName === "Dealer";
            });
            setArnDealerID(dealerData.id);

            FetchServicesFromActivity(contractorData.id, "contractor");
            FetchServicesFromActivity(contractorData.id, "dealer");
          }
        }
      })
      .catch((e) => {});
  };

  const FetchServicesFromActivity = (selectedItemID: number, type: string) => {
    let params = {
      ID: selectedItemID,
    };
    Provider.getAll(`master/getservicesbyroleid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el) => {
              return el.display;
            });
            if (type === "contractor") setServiceNameList(response.data.data);
            else if (type === "dealer") setServiceNameDealerList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchCategoriesFromServices = (selectedActivityID: number, selectedServiceID: number, type: string) => {
    let params = {
      ActivityID: selectedActivityID,
      ServiceID: selectedServiceID,
    };

    Provider.getAll(`master/getcategoriesbyserviceid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el: any) => {
              return el.display;
            });
            if (type === "contractor") setCategoryList(response.data.data);
            else if (type === "dealer") setCategoryDealerList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchProductsFromCategory = (selectedActivitryID: number, selectedServiceID: number, selectedCategoryID: number, type: string) => {
    let params = {
      ActivityID: selectedActivitryID,
      ServiceID: selectedServiceID,
      CategoryID: selectedCategoryID,
    };
    Provider.getAll(`master/getproductsbycategoryid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el: any) => {
              return el.display;
            });
            if (type === "contractor") setProductList(response.data.data);
            else if (type === "dealer") setProductDealerList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchDesignTypeFromProduct = (selectedItem: number) => {
    let params = {
      ActivityID: arnID,
      ServiceID: snID,
      CategoryID: cnID,
      ProductID: selectedItem,
    };
    Provider.getAll(`master/getdesigntypebyproductid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el) => {
              return el.display;
            });
            setProductDesignTypeList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: number = parseInt(event.target.value);
    let ac = serviceNameList.find((el) => el.id === serviceName);
    if (ac !== undefined) {
      setSn(ac.serviceName);
      setSnID(serviceName);
      SetResetServiceName(false);
      SetResetCategoryName(true);
      SetResetProductName(true);
      FetchCategoriesFromServices(arnID, serviceName, "contractor");
    }
  };

  const handleSNDealerChange = (event: SelectChangeEvent) => {
    let serviceName: number = parseInt(event.target.value);
    let ac = serviceNameDealerList.find((el) => el.id === serviceName);
    if (ac !== undefined) {
      setDealerSn(ac.serviceName);
      setSnDealerID(serviceName);
      SetResetCategoryDealerName();
      SetResetProductDealerName();
      FetchCategoriesFromServices(arnDealerID, serviceName, "dealer");
    }
  };

  const handleCNChange = (event: SelectChangeEvent) => {
    let categoryName: number = parseInt(event.target.value);
    let ac = categoryList.find((el) => el.id === categoryName);
    if (ac !== undefined) {
      setCn(ac.categoryName);
      setCnID(categoryName);
      SetResetCategoryName(false);
      SetResetProductName(true);

      FetchProductsFromCategory(arnID, snID, ac.id, "contractor");
    }
  };

  const handleCNDealerChange = (event: SelectChangeEvent) => {
    let categoryName: number = parseInt(event.target.value);
    let ac = categoryDealerList.find((el) => el.id === categoryName);
    if (ac !== undefined) {
      setDealerCn(ac.categoryName);
      setCnDealerID(categoryName);
      SetResetProductDealerName();

      FetchProductsFromCategory(arnDealerID, snDealerID, ac.id, "dealer");
    }
  };

  const handlePNChange = (event: SelectChangeEvent) => {
    let productName: number = parseInt(event.target.value);
    let ac = productList.find((el) => el.productID === productName);
    if (ac !== undefined) {
      setPn(ac.productName);
      setPnID(productName);
      SetResetProductName(false);

      FetchDesignTypeFromProduct(productName);
    }
  };

  const handlePDTchange = (event: SelectChangeEvent) => {
    let productName: number = parseInt(event.target.value);
    let ac = productDesignTypeList.find((el) => el.id === productName);
    if (ac !== undefined) {
      setPdt(ac.designTypeName);
      setPdtID(productName);
      SetResetProductDesignType(false);
    }
  };

  const SetResetServiceName = (isBlank: boolean) => {
    if (isBlank) {
      setSn("--Select--");
      setSnID(0);
    }
    setServicenameError("");
    setIsServicenameError(false);
  };

  const SetResetServiceDealerName = () => {
    setDealerSn("--Select--");
    setSnDealerID(0);
  };

  const SetResetCategoryName = (isBlank: boolean) => {
    if (isBlank) {
      setCn("--Select--");
      setCnID(0);
      setCategoryList([]);
    }
    setCategorynameError("");
    setIsCategorynameError(false);
  };

  const SetResetCategoryDealerName = () => {
    setDealerCn("--Select--");
    setCnDealerID(0);
    setCategoryDealerList([]);
  };

  const SetResetProductName = (isBlank: boolean) => {
    if (isBlank) {
      setPn("--Select--");
      setPnID(0);
      setProductList([]);
    }
    setProductError("");
    setIsProductError(false);
  };

  const SetResetProductDealerName = () => {
    setPnDealer("--Select--");
    setPnDealerID(0);
    setProductDealerList([]);
  };

  const SetResetProductDesignType = (isBlank: boolean) => {
    if (isBlank) {
      setPdt("--Select--");
      setPdtID(0);
      setProductDesignTypeList([]);
    }
    setProductDesignTypeError("");
    setIsProductDesignTypeError(false);
  };

  const handleLFChange = (event: SelectChangeEvent) => {
    let lf: string = event.target.value;
    if (parseInt(lf) > 0) {
      setLengthFeet(event.target.value as string);
      setLengthFeetError("");
      setIsLengthFeetError(false);
      CalculateSqfeet(parseInt(lf), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(widthHeightInches));
    }
  };

  const handleLIChange = (event: SelectChangeEvent) => {
    let lf: string = event.target.value;
    if (parseInt(lf) > -1) {
      setLengthInches(event.target.value as string);
      setLengthInchesError("");
      setIsLengthInchesError(false);
      CalculateSqfeet(parseInt(lengthFeet), parseInt(lf), parseInt(widthHeightFeet), parseInt(widthHeightInches));
    }
  };

  const handleWHFChange = (event: SelectChangeEvent) => {
    let lf: string = event.target.value;
    if (parseInt(lf) > 0) {
      setWidthHeightFeet(event.target.value as string);
      setWidthHeightFeetError("");
      setIsWidthHeightFeetError(false);
      CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(lf), parseInt(widthHeightInches));
    }
  };

  const handleWHIChange = (event: SelectChangeEvent) => {
    let lf: string = event.target.value;
    if (parseInt(lf) > -1) {
      setWidthHeightInches(event.target.value as string);
      setWidthHeightInchesError("");
      setIsWidthHeightInchesError(false);
      CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(lf));
    }
  };

  const CalculateSqfeet = (lf: number, li: number, whf: number, whi: number) => {
    if (lf > 0 && li > -1 && whf > 0 && whi > -1) {
      setTotalSqFt(parseFloat((parseFloat(lf + "." + li) * parseFloat(whf + "." + whi)).toFixed(2)));
    } else {
      setTotalSqFt(0);
    }
  };

  const handleCancelClick = () => {};

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

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

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setMaterialSetupListTemp(materialSetupList);
    } else {
      setMaterialSetupListTemp(
        materialSetupList.filter((el: any) => {
          return el.brandName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    SetResetServiceDealerName();
    SetResetCategoryDealerName();
    SetResetProductDealerName();
  };

  const handleSubmitClick = () => {};

  const handleBrandChange = () => {};
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
              <Tab label="Add/Edit Material Setup" {...a11yProps(0)} />
              <Tab label="View List" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Grid item xs={4} sm={8} md={12}>
            <TabPanel value={value} index={0}>
              <Grid container xs={4} sm={8} md={12} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isServicenameError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Service Name</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={snID.toString()} onChange={handleSNChange}>
                      <MenuItem disabled={true} value="0">
                        --Select--
                      </MenuItem>
                      {serviceNameList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.serviceName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{servicenameError}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isCategorynameError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Category Name</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={cnID.toString()} onChange={handleCNChange}>
                      <MenuItem disabled={true} value="0">
                        --Select--
                      </MenuItem>
                      {categoryList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.categoryName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{categorynameError}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isProductError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Product Name</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={pnID.toString()} onChange={handlePNChange}>
                      <MenuItem disabled={true} value="0">
                        --Select--
                      </MenuItem>
                      {productList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.productID}>
                            {item.productName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{productError}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isProductDesignTypeError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Product Design Type</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={pdtID.toString()} onChange={handlePDTchange}>
                      <MenuItem disabled={true} value="0">
                        --Select--
                      </MenuItem>
                      {productDesignTypeList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.designTypeName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{productDesignTypeError}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={5} md={8} sx={{ mt: 2 }}>
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
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)", mt: 3 }}>
                  <Typography variant="h6">Dealers Materials Setup For Service Product</Typography>
                </Grid>
                <Grid container xs={4} sm={8} md={12} sx={{ mt: 1 }}>
                  <Grid container xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, width: "100%" }}>
                      <b>Length</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <FormControl fullWidth size="small" error={isLengthFeetError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Feet</b>
                        </Typography>
                        <Select value={lengthFeet} onChange={handleLFChange}>
                          {/* <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem> */}
                          {CreateLengthFeet(50)}
                        </Select>
                        <FormHelperText>{lengthFeetError}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <FormControl fullWidth size="small" error={isLengthInchesError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Inches</b>
                        </Typography>
                        <Select value={lengthInches} onChange={handleLIChange}>
                          <MenuItem value="0">0</MenuItem>
                          {CreateLengthFeet(11)}
                        </Select>
                        <FormHelperText>{lengthInchesError}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, width: "100%" }}>
                      <b>Width / Height</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <FormControl fullWidth size="small" error={isWidthHeightFeetError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Feet</b>
                        </Typography>
                        <Select value={widthHeightFeet} onChange={handleWHFChange}>
                          {/* <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem> */}
                          {CreateLengthFeet(50)}
                        </Select>
                        <FormHelperText>{widthHeightFeetError}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <FormControl fullWidth size="small" error={isWidthHeightInchesError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Inches</b>
                        </Typography>
                        <Select value={widthHeightInches} onChange={handleWHIChange}>
                          <MenuItem value="0">0</MenuItem>
                          {CreateLengthFeet(11)}
                        </Select>
                        <FormHelperText>{widthHeightInchesError}</FormHelperText>
                      </FormControl>
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
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpenDialog(true);
                        }}
                      >
                        Add Product
                      </Button>
                    </div>
                  </Grid>
                </Grid>

                {productItem.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
                      <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Product Name</TableCell>
                              <TableCell>Brand Name</TableCell>
                              <TableCell sx={{ width: "96px" }}>Quantity</TableCell>
                              <TableCell sx={{ width: "96px" }}>Rate</TableCell>
                              <TableCell sx={{ width: "96px" }}>Amount</TableCell>
                              <TableCell sx={{ width: "96px" }}>Formula</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {productItem.map((row: ProductItemModel, index: number) => (
                              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  {row.productName}
                                </TableCell>
                                <TableCell>
                                  {/* <FormControl fullWidth size="small" error={isCategorynameError}>
                                  <Select value={row.brandName} onChange={handleCNChange}>
                                    <MenuItem disabled={true} value="--Select--">
                                      --Select--
                                    </MenuItem>
                                    {categoryList.map((item, index) => {
                                      return (
                                        <MenuItem key={index} value={item.id}>
                                          {item.categoryName}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </FormControl> */}
                                  {row.brandName}
                                </TableCell>
                                <TableCell align="right">
                                  <TextField sx={{ width: "96px" }} placeholder="" variant="outlined" size="small" value={row.quantity} onChange={(e) => {}} />
                                </TableCell>
                                <TableCell align="right">
                                  <TextField sx={{ width: "96px" }} placeholder="" variant="outlined" size="small" value={row.rate} onChange={(e) => {}} />
                                </TableCell>
                                <TableCell align="right">
                                  <TextField sx={{ width: "96px" }} placeholder="" variant="outlined" size="small" value={row.amount} onChange={(e) => {}} />
                                </TableCell>
                                <TableCell align="right">
                                  <TextField
                                    sx={{ width: "96px" }}
                                    placeholder=""
                                    variant="outlined"
                                    size="small"
                                    value={row.formula}
                                    onChange={(e: React.SyntheticEvent) => {
                                      row.formula = parseFloat((e.target as HTMLInputElement).value);
                                      let NewArr = [...productItem];
                                      NewArr.splice(index, 1, row);
                                      setProductItem(NewArr);
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
                                    onClick={() => {
                                      let NewArr = [...productItem];
                                      NewArr.splice(index, 1);
                                      setProductItem(NewArr);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={4} sm={4} md={3} sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                      <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <b style={{ padding: 8 }}>Sub Total</b>
                        <label style={{ color: "#ff0000", marginLeft: "16px", border: "2px solid rgba(0,0,0,0.12)", padding: 8, borderRadius: "4px" }}>{subTotal}</label>
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={12} sx={{ mt: 1 }}>
                      <FormControl style={{ width: 240 }} size="small" error={isProductDesignTypeError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Brand Name</b>
                          <label style={{ color: "#ff0000" }}>*</label>
                        </Typography>
                        <Select value={pdtID.toString()} onChange={handleBrandChange}>
                          <MenuItem disabled={true} value="0">
                            --Select--
                          </MenuItem>
                          {brandList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.id}>
                                {item.brandName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <FormHelperText>{productDesignTypeError}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </>
                )}

                <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
                  <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} style={{ display: buttonDisplay }} onClick={handleCancelClick}>
                    Cancel
                  </Button>
                  <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid item xs={4} sm={8} md={12}>
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                  <Typography variant="h6">Material Setup list</Typography>
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                  {loading ? (
                    <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                      {materialSetupListTemp.length === 0 ? (
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
                              value={searchQuery}
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
                            rows={materialSetupListTemp}
                            columns={brandColumns}
                            pageSize={pageSize}
                            rowsPerPageOptions={[5, 10, 20]}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            disableSelectionOnClick
                            onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                              //   const arrActivity = [...brandList];
                              //   let a: BrandModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                              //   if (a) {
                              //     const clickType = (e.target as any).textContent;
                              //     if (clickType.toLowerCase() === "edit") handelEditAndDelete(clickType, a);
                              //   }
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
      <Dialog open={openDialog} onClose={handleClose} disableEscapeKeyDown>
        <DialogTitle>Choose Product</DialogTitle>
        <DialogContent sx={{ width: 480 }}>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={4} sm={5} md={6}>
              <FormControl fullWidth size="small">
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Service Name</b>
                  <label style={{ color: "#ff0000" }}>*</label>
                </Typography>
                <Select value={snDealerID.toString()} onChange={handleSNDealerChange}>
                  <MenuItem disabled={true} value="0">
                    --Select--
                  </MenuItem>
                  {serviceNameDealerList.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.serviceName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={5} md={6}>
              <FormControl fullWidth size="small">
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Category Name</b>
                  <label style={{ color: "#ff0000" }}>*</label>
                </Typography>
                <Select value={cnDealerID.toString()} onChange={handleCNDealerChange}>
                  <MenuItem disabled={true} value="0">
                    --Select--
                  </MenuItem>
                  {categoryDealerList.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.categoryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <Autocomplete
                multiple
                id="checkboxes-tags"
                options={productDealerList}
                disableCloseOnSelect
                getOptionLabel={(option: ProductModel) => option.productName}
                renderOption={(props, option) => {
                  let selected: boolean = false;
                  let data = productItem.find((el: ProductItemModel) => {
                    return el.productID === option.productID;
                  });
                  if (data != null) {
                    selected = true;
                  }
                  return (
                    <li {...props}>
                      <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                      {option.productName}
                    </li>
                  );
                }}
                onChange={(event: React.SyntheticEvent, value: any) => {
                  let PItem: Array<ProductItemModel> = [];
                  value.map((item: ProductModel) => {
                    PItem.push({ serviceID: 0, categoryID: 0, productID: item.productID, productName: item.productName, brandID: 0, brandName: "ads", quantity: 0, rate: 0, amount: 0, formula: 0 });
                  });

                  setProductItem(PItem);
                  console.log(JSON.stringify(PItem));
                }}
                //style={{ width: 240 }}
                renderInput={(params) => <TextField {...params} label="Products" placeholder="Products" />}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaterialSetup;

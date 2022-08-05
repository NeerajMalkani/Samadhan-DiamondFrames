import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
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
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { CategoryModel, DesignTypeModel, ProductModel, ServiceNameModel } from "../../../models/Model";
import { theme } from "../../../theme/AppTheme";

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

  const [display, setDisplay] = useState("Yes");

  const [lengthFeet, setLengthFeet] = useState("--Select--");
  const [isLengthFeetError, setIsLengthFeetError] = useState<boolean>(false);
  const [lengthFeetError, setLengthFeetError] = useState("");

  const [lengthInches, setLengthInches] = useState("--Select--");
  const [isLengthInchesError, setIsLengthInchesError] = useState<boolean>(false);
  const [lengthInchesError, setLengthInchesError] = useState("");

  const [widthHeightFeet, setWidthHeightFeet] = useState("--Select--");
  const [isWidthHeightFeetError, setIsWidthHeightFeetError] = useState<boolean>(false);
  const [widthHeightFeetError, setWidthHeightFeetError] = useState("");

  const [widthHeightInches, setWidthHeightInches] = useState("--Select--");
  const [isWidthHeightInchesError, setIsWidthHeightInchesError] = useState<boolean>(false);
  const [widthHeightInchesError, setWidthHeightInchesError] = useState("");

  const [productItem, setProductItem] = useState<Array<ProductItemModel>>([]);

  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: string = event.target.value;
    let ac = serviceNameList.find((el) => el.serviceName === serviceName);
    if (ac !== undefined) {
      setSn(event.target.value as string);
      setSnID(ac.serviceID);
      SetResetServiceName(false);
      SetResetCategoryName(true);
      SetResetProductName(true);

      // FetchCategoriesFromServices(ac.serviceID);
    }
  };

  const handleCNChange = (event: SelectChangeEvent) => {
    let categoryName: string = event.target.value;
    let ac = categoryList.find((el) => el.categoryName === categoryName);
    if (ac !== undefined) {
      setCn(event.target.value as string);
      setCnID(ac.id);
      SetResetCategoryName(false);
      SetResetProductName(true);

      // FetchUnitsFromCategory(ac.id);
    }
  };

  const handlePNChnage = (event: SelectChangeEvent) => {
    let productName: string = event.target.value;
    let ac = productList.find((el) => el.productName === productName);
    if (ac !== undefined) {
      setPn(event.target.value as string);
      setPnID(ac.productID);
      SetResetProductName(false);

      // FetchUnitsFromProduct(ac.productID);
    }
  };

  const handlePDTChnage = (event: SelectChangeEvent) => {
    let productName: string = event.target.value;
    let ac = productDesignTypeList.find((el) => el.designTypeName === productName);
    if (ac !== undefined) {
      setPdt(event.target.value as string);
      setPdtID(ac.productID);
      SetResetProductDesignType(false);

      // FetchUnitsFromProduct(ac.productID);
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

  const SetResetCategoryName = (isBlank: boolean) => {
    if (isBlank) {
      setCn("--Select--");
      setCnID(0);
      setCategoryList([]);
    }
    setCategorynameError("");
    setIsCategorynameError(false);
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
    let lengthFeet: string = event.target.value;
    if (parseInt(lengthFeet) > 0) {
      setLengthFeet(event.target.value as string);
      setLengthFeetError("");
      setIsLengthFeetError(false);
    }
  };

  const handleLIChange = (event: SelectChangeEvent) => {
    let lengthFeet: string = event.target.value;
    if (parseInt(lengthFeet) > 0) {
      setLengthInches(event.target.value as string);
      setLengthInchesError("");
      setIsLengthInchesError(false);
    }
  };

  const handleWHFChange = (event: SelectChangeEvent) => {
    let lengthFeet: string = event.target.value;
    if (parseInt(lengthFeet) > 0) {
      setWidthHeightFeet(event.target.value as string);
      setWidthHeightFeetError("");
      setIsWidthHeightFeetError(false);
    }
  };

  const handleWHIChange = (event: SelectChangeEvent) => {
    let lengthFeet: string = event.target.value;
    if (parseInt(lengthFeet) > 0) {
      setWidthHeightInches(event.target.value as string);
      setWidthHeightInchesError("");
      setIsWidthHeightInchesError(false);
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

  const handleSubmitClick = () => {};

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
              <Tab label="Show Material Setup" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Grid item xs={4} sm={8} md={12}>
            <TabPanel value={value} index={0}>
              <Grid item xs={4} sm={8} md={12}>
                <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isServicenameError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Service Name</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={sn} onChange={handleSNChange}>
                      <MenuItem disabled={true} value="--Select--">
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

                <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isCategorynameError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Category Name</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={cn} onChange={handleCNChange}>
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
                    <FormHelperText>{categorynameError}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isProductError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Product Name</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={pn} onChange={handlePNChnage}>
                      <MenuItem disabled={true} value="--Select--">
                        --Select--
                      </MenuItem>
                      {productList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.productName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{productError}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isProductDesignTypeError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Product Design Type</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={pdt} onChange={handlePDTChnage}>
                      <MenuItem disabled={true} value="--Select--">
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
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                  <Typography variant="h6">Dealers Materials Setup For Service Product</Typography>
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                  <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Length</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Grid item sx={{ mt: 1 }}>
                      <FormControl fullWidth size="small" error={isLengthFeetError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Feet</b>
                        </Typography>
                        <Select value={lengthFeet} onChange={handleLFChange}>
                          <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem>
                          {CreateLengthFeet(50)}
                          {/* {categoryList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.id}>
                                {item.categoryName}
                              </MenuItem>
                            );
                          })} */}
                        </Select>
                        <FormHelperText>{lengthFeetError}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ mt: 1 }}>
                      <FormControl fullWidth size="small" error={isLengthInchesError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Inches</b>
                        </Typography>
                        <Select value={lengthInches} onChange={handleLIChange}>
                          <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem>
                          {CreateLengthFeet(50)}
                          {/* {categoryList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.id}>
                                {item.categoryName}
                              </MenuItem>
                            );
                          })} */}
                        </Select>
                        <FormHelperText>{lengthInchesError}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Width / Height</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Grid item sx={{ mt: 1 }}>
                      <FormControl fullWidth size="small" error={isWidthHeightFeetError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Feet</b>
                        </Typography>
                        <Select value={widthHeightFeet} onChange={handleWHFChange}>
                          <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem>
                          {CreateLengthFeet(11)}
                          {/* {categoryList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.id}>
                                {item.categoryName}
                              </MenuItem>
                            );
                          })} */}
                        </Select>
                        <FormHelperText>{widthHeightFeetError}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ mt: 1 }}>
                      <FormControl fullWidth size="small" error={isWidthHeightInchesError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Inches</b>
                        </Typography>
                        <Select value={widthHeightInches} onChange={handleWHIChange}>
                          <MenuItem disabled={true} value="--Select--">
                            --Select--
                          </MenuItem>
                          {CreateLengthFeet(11)}
                          {/* {categoryList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.id}>
                                {item.categoryName}
                              </MenuItem>
                            );
                          })} */}
                        </Select>
                        <FormHelperText>{widthHeightInchesError}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                    <Typography>
                      <b>Total (Sq.Ft)</b>
                      <label style={{ color: "#ff0000" }}>{540}</label>
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                    <Button variant="contained" sx={{ mt: 1 }} onClick={handleCancelClick}>
                      Add Product
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                  <TableContainer component={Paper} sx={{ maxWidth: 960 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product Name</TableCell>
                          <TableCell>Brand Name</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Rate</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">Formula</TableCell>
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
                              <FormControl fullWidth size="small" error={isCategorynameError}>
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
                              </FormControl>
                            </TableCell>
                            <TableCell align="right">
                              <TextField fullWidth placeholder="" variant="outlined" size="small" value={row.quantity} onChange={(e) => {}} />
                            </TableCell>
                            <TableCell align="right">
                              <TextField
                                fullWidth
                                placeholder=""
                                variant="outlined"
                                size="small"
                                value={row.rate}
                                onChange={(e) => {}}
                                // error={isWorkfloornameError}
                                // helperText={workfloornameError}
                                // value={workfloorName}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <TextField
                                fullWidth
                                placeholder=""
                                variant="outlined"
                                size="small"
                                value={row.amount}
                                onChange={(e) => {}}
                                // error={isWorkfloornameError}
                                // helperText={workfloornameError}
                                // value={workfloorName}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <TextField
                                fullWidth
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
                                // error={isWorkfloornameError}
                                // helperText={workfloornameError}
                                // value={workfloorName}
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
                <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <b>Sub Total</b>
                    <label style={{ color: "#ff0000" }}>56565</label>
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                  <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid item xs={4} sm={8} md={12}></Grid>
            </TabPanel>
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

export default MaterialSetup;

import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DataContext from "../contexts/DataContexts";
import { ProductModel } from "../models/Model";
import { communication } from "../utils/communication";
import { productColumns } from "../utils/tablecolumns";

function getStyles(name: string, unitSales: readonly string[], theme: Theme) {
  return {
    fontWeight:
      unitSales.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ServiceProductPage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  const theme = useTheme();

  useEffect(() => {
    // if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
    //   navigate(`/Samadhan-DiamondFrames/login`);
  }, []);

  
  const [pID, setPID] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [arn, setArn] = useState("");
  const [arnID, setArnID] = useState<number>(0);

  const [sn, setSn] = useState("--Select--");
  const [snID, setSnID] = useState<number>(0);
  const [servicenameError, setServicenameError] = useState("");
  const [isServicenameError, setIsServicenameError] = useState(false);

  const [cn, setCn] = useState("--Select--");
  const [cnID, setCnID] = useState<number>(0);
  const [categorynameError, setCategorynameError] = useState("");
  const [isCategorynameError, setIsCategorynameError] = useState(false);

  const [pn, setPn] = useState("--Select--");
  const [pnID, setPnID] = useState(0);
  const [productError, setProductError] = useState("");
  const [isProductError, setIsProductError] = useState(false);

  const [hsn, setHsn] = useState("");
  const [gst, setGst] = useState("");

  const [unitsOfSales, setUnitsOfSales] = useState<string>("--Select--");
  const [unitsOfSalesID, setUnitsOfSalesID] = useState<number>(0);
  const [unitError, setUnitError] = useState<boolean>(false);
  const [unitErrorText, setUnitErrorText] = useState<string>("");

  const [rateWithMaterial, setRateWithMaterial] = useState<string>("");
  const [isRateWithMaterialError, setIsRateWithMaterialError] =
    useState<boolean>(false);
  const [rateWithMaterialErrorText, setRateWithMaterialErrorText] =
    useState<string>("Materials + Labour cost");

  const [rateWithoutMaterial, setRateWithoutMaterial] = useState<string>("");
  const [isRateWithoutMaterialError, setIsRateWithoutMaterialError] =
    useState<boolean>(false);
  const [rateWithoutMaterialErrorText, setRateWithoutMaterialErrorText] =
    useState<string>("Only Labour cost");

  const [alternateUnit, setAlternateUnit] = useState<string>("");
  const [isAlternateUnitError, setIsAlternateUnitError] =
    useState<boolean>(false);
  const [alternateUnitErrorText, setAlternateUnitErrorText] =
    useState<string>("");

    //
    const [specification, setSpecification] = useState<string>("");
    const [shortSpecification, setShortSpecification] = useState<string>("");

  const [display, setDisplay] = useState("Yes");

  const [serviceNameList, setServiceNameList] =
    useContext(DataContext).serviceNameList;
  const [unitOfSalesList, setUnitOfSalesList] =
    useContext(DataContext).unitOfSalesList;
  const [categoryList, setCategoryList] = useContext(DataContext).categoryList;
  const [productList, setProductList] = useContext(DataContext).productList;
  const [pageSize, setPageSize] = useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">(
    "auto"
  );
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [actionStatus, setActionStatus] = useState<string>("new");

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: string = event.target.value;
    let ac = serviceNameList.find((el) => el.serviceName === serviceName);
    if (ac !== undefined) {
      setSn(event.target.value as string);
      setSnID(ac.id);
      //  SetResetServiceName(false);
      //  SetResetCategoryName(true);
      //  SetResetUnitName(true);
      //  FetchCategoriesFromServices(ac.id);
    }
  };

  const handleCNChange = (event: SelectChangeEvent) => {
    let categoryName: string = event.target.value;
    let ac = categoryList.find((el) => el.categoryName === categoryName);
    if (ac !== undefined) {
      setCn(event.target.value as string);
      setCnID(ac.id);
      SetResetCategoryName(false);
      SetResetUnitName(true);
      setGst(ac.gstRate + "%");
      setHsn(ac.hsnsacCode);
      //FetchUnitsFromCategory(ac.id);
    }
  };

  const handlePNChnage=(event: SelectChangeEvent)=>{
    let productName: string = event.target.value;
    let ac = productList.find((el) => el.productName === productName);
    if (ac !== undefined) {
      setPn(event.target.value as string);
      setPnID(ac.id);
      SetResetProductName(false);
      SetResetUnitName(true);
     
      //FetchUnitsFromCategory(ac.id);
    }
  }

  const handleUnitChange = (event: SelectChangeEvent<typeof unitsOfSales>) => {
    let unitName: string = event.target.value;
    let ac = unitOfSalesList.find((el) => el.unitName === unitName);
    if (ac !== undefined) {
      setUnitsOfSales(event.target.value as string);
      setUnitsOfSalesID(ac.id);
      SetResetUnitName(false);
    }
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const handleSubmitClick = () => {
    let isValid: boolean = true;
    if (sn === "--Select--") {
      isValid = false;
      setIsServicenameError(true);
      setServicenameError(communication.SelectServiceName);
    }

    if (cn.trim() === "--Select--") {
      isValid = false;
      setIsCategorynameError(true);
      setCategorynameError(communication.SelectCategoryName);
    }

    if (hsn.trim() === "") {
      isValid = false;
    }
    if (gst.toString().trim() === "") {
      isValid = false;
    }

    if (pn.trim() === "--Select--") {
      isValid = false;
      setIsProductError(true);
      setProductError(communication.SelectProductName);
    }

    if (unitsOfSales === "--Select--") {
      isValid = false;
      setUnitError(true);
      setUnitErrorText(communication.SelectUnitName);
    }

    if (rateWithMaterial === "") {
      isValid = false;
      setIsRateWithMaterialError(true);
      setRateWithMaterialErrorText(communication.BlankRateWithMaterial);
    }

    if (rateWithoutMaterial === "") {
      isValid = false;
      setIsRateWithoutMaterialError(true);
      setRateWithoutMaterialErrorText(communication.BlankRateWithoutMaterial);
    }

    if (alternateUnit === "") {
      isValid = false;
      setIsAlternateUnitError(true);
      setAlternateUnitErrorText(communication.BlankAlternateUnit);
    }
  };

  const handleCancelClick = () => {
    setDisplay("Yes");

    // SetResetActivityName(true);

    SetResetServiceName(true);

    SetResetCategoryName(true);

    SetResetProductName(true);

    SetResetUnitName(true);
    SetResetRateWithMaterial(true);
    SetResetRateWithoutMaterial(true);
    SetResetAlternateUnit(true);

    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setActionStatus("new");
  };

  const handelEditAndDelete = (
    type: string | null,
    a: ProductModel | undefined
  ) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);

      setPID(a.productID);

    //   setArn(a?.activityRoleName);
    //   setArnID(a?.activityID);
    //   SetResetActivityName(false);

      setSn(a?.serviceName);
      setSnID(a?.serviceID);
      SetResetServiceName(false);
     // FetchServicesFromActivity(a?.activityID);

      setCn(a?.categoryName);
      setCnID(a?.categoryID);

      SetResetCategoryName(false);
    //   FetchCategoriesFromServices(a?.serviceID, (acategoryList: any) => {
    //     let ca: CategoryModel | undefined = acategoryList.find(
    //       (el: any) => el.id === a?.categoryID
    //     );
    //     if (ca !== undefined) {
    //       setHsn(ca.hsnsacCode);
    //       setGst(ca.gstRate + "%");
    //     }
    //   });

      setPn(a?.productName);
      SetResetProductName(false);

      setUnitsOfSales(a?.unitName);
      setUnitsOfSalesID(a?.unitOfSalesID);
      SetResetUnitName(false);
      //FetchUnitsFromCategory(a?.categoryID);

      setDisplay(a?.display);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }

  };

  //   const SetResetActivityName = (isBlank: boolean) => {
  //     if (isBlank) {
  //       setArn("--Select--");
  //       setArnID(0);
  //     }
  //     setactivitynameError("");
  //     setIsActivitynameError(false);
  //   };

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
      setGst("");
      setHsn("");
    }
    setCategorynameError("");
    setIsCategorynameError(false);
  };

  const SetResetUnitName = (isBlank: boolean) => {
    if (isBlank) {
      setUnitsOfSales("--Select--");
      setUnitsOfSalesID(0);
    }
    setUnitError(false);
    setUnitErrorText("");
  };

  const SetResetProductName = (isBlank: boolean) => {
    if (isBlank) {
      setPn("--Select--");
      setPnID(0);
    }
    setProductError("");
    setIsProductError(false);
  };

  const SetResetRateWithMaterial = (isBlank: boolean) => {
    if (isBlank) {
      setRateWithMaterial("");
    }
    setRateWithMaterialErrorText("Materials + Labour cost");
    setIsRateWithMaterialError(false);
  };

  const SetResetRateWithoutMaterial = (isBlank: boolean) => {
    if (isBlank) {
      setRateWithoutMaterial("");
    }
    setRateWithoutMaterialErrorText("Only Labour cost");
    setIsRateWithoutMaterialError(false);
  };

  const SetResetAlternateUnit = (isBlank: boolean) => {
    if (isBlank) {
      setAlternateUnit("");
    }
    setAlternateUnitErrorText("");
    setIsAlternateUnitError(false);
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Service Product</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Add Service Product</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small">
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Activity Role Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={arn}></Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
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
                    <MenuItem key={index} value={item.serviceName}>
                      {item.serviceName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{servicenameError}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={3} md={5} sx={{ mt: 1 }}>
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
                    <MenuItem key={index} value={item.categoryName}>
                      {item.categoryName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{categorynameError}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>HSN / SAC Code</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              disabled
              fullWidth
              placeholder="HSN / SAC Code"
              variant="outlined"
              size="small"
              value={hsn}
              onChange={(e) => {
                setHsn(e.currentTarget.value);
              }}
            />
          </Grid>
          <Grid item xs={4} sm={2} md={3} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>GST Rate (%)</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              disabled
              placeholder="GST Rate (%)"
              variant="outlined"
              size="small"
              value={gst}
              onChange={(e) => {
                setGst(e.currentTarget.value);
              }}
            />
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
                    <MenuItem key={index} value={item.productName}>
                      {item.productName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{productError}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <FormControl
              fullWidth
              size="small"
              sx={{ paddingRight: { xs: 0, sm: 4 } }}
              error={unitError}
            >
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Unit Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={unitsOfSales} onChange={handleUnitChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {unitOfSalesList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.unitName}>
                      {item.unitName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{unitErrorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Rate / Unit (with Materials)</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Rate / Unit (with materials)"
              variant="outlined"
              size="small"
              value={rateWithMaterial}
              error={isRateWithMaterialError}
              helperText={rateWithMaterialErrorText}
              onChange={(e) => {
                setRateWithMaterial((e.target as HTMLInputElement).value);
                SetResetRateWithMaterial(false);
              }}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Rate / Unit (without Materials)</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Rate / Unit (without Materials)"
              variant="outlined"
              size="small"
              value={rateWithoutMaterial}
              error={isRateWithoutMaterialError}
              helperText={rateWithoutMaterialErrorText}
              onChange={(e) => {
                setRateWithoutMaterial((e.target as HTMLInputElement).value);
                SetResetRateWithoutMaterial(false);
              }}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Alternative Unit of Sales</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Alternative Unit of Sales"
              variant="outlined"
              size="small"
              value={alternateUnit}
              error={isAlternateUnitError}
              helperText={alternateUnitErrorText}
              onChange={(e) => {
                setAlternateUnit((e.target as HTMLInputElement).value);
                SetResetAlternateUnit(false);
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Short Specification</b>
            </Typography>
            <TextField
              fullWidth
              // placeholder="HSN / SAC Code"
              variant="outlined"
              size="small"
              multiline
              rows={5}
               value={shortSpecification}
              onChange={(e) => {
                  setShortSpecification(e.currentTarget.value);
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Specification</b>
            </Typography>
            <TextField
              fullWidth
              //placeholder="HSN / SAC Code"
              variant="outlined"
              size="small"
              multiline
              rows={5}
               value={specification}
              onChange={(e) => {
                  setSpecification(e.currentTarget.value);
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}></Grid>
          <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Display</b>
            </Typography>
            <FormControl>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                value={display}
                onChange={handleDisplayChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={5} md={8}>
            <Button
              variant="contained"
              sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
              style={{ display: buttonDisplay }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={buttonLoading}
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleSubmitClick}
            >
              Submit
            </LoadingButton>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Product List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box
                height="300px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ m: 2 }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                <DataGrid
                  style={{
                    opacity: dataGridOpacity,
                    pointerEvents: dataGridPointer,
                  }}
                  rows={productList}
                  columns={productColumns}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 20]}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  disableSelectionOnClick
                  onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                    const arrActivity = [...productList];
                    let a: ProductModel | undefined = arrActivity.find(
                      (el) => el.id === param.row.id
                    );
                    handelEditAndDelete((e.target as any).textContent, a);
                  }}
                  sx={{
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ServiceProductPage;

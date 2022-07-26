import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { BrandModel, ProductModel, ProductSetupModel } from "../../models/Model";
import { AWSImagePath } from "../../utils/paths";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { productSetupColumns } from "../../utils/tablecolumns";
import { communication } from "../../utils/communication";
import { ValidateGSTRate } from "../../utils/validations";
import uuid from "react-uuid";
import { UploadImageToS3WithNativeSdk } from "../../utils/AWSFileUpload";

const ProductListPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("Yes");
  const [pageSize, setPageSize] = useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [selectedID, setSelectedID] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const [productSetupList, setProductSetupList] = useState<Array<ProductSetupModel>>([]);
  const [productSetupListTemp, setProductSetupListTemp] = useState<Array<ProductSetupModel>>([]);

  const [bn, setBn] = useState("--Select--");
  const [bnID, setBnID] = useState<number>(0);
  const [brandError, setbrandError] = useState("");
  const [isBrandError, setIsBrandError] = useState(false);
  const [brandList, setBrandList] = useState<Array<BrandModel>>([]);

  const [pn, setPn] = useState("--Select--");
  const [pnID, setPnID] = useState(0);
  const [productError, setProductError] = useState("");
  const [isProductError, setIsProductError] = useState(false);
  const [productList, setProductList] = useState<Array<ProductModel>>([]);

  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadFileUpload, setUploadFileUpload] = useState<any>();
  const [errorDI, setDIError] = useState(false);
  const [errorDIText, setDIErrorText] = useState("");
  const [designButtonText, setDesignButtonText] = useState("Upload Design");

  const [price, setPrice] = useState<string>("");
  const [isPriceError, setIsPriceError] = useState<boolean>(false);
  const [priceErrorText, setPriceErrorText] = useState<string>("");

  const [conversionValue, setConversionValue] = useState<string>("");
  const [isConversionValueError, setIsConversionValueError] = useState<boolean>(false);
  const [conversionValueErrorText, setConversionValueErrorText] = useState<string>("");

  const [description, setDescription] = useState<string>("");
  const [isDescriptionError, setIsDescriptionError] = useState<boolean>(false);
  const [descriptionErrorText, setDescriptionErrorText] = useState<string>("");

  //
  const [saleUnitwith1, setSaleUnitwith1] = useState<string>("");
  const [saleUnit, setSaleUnit] = useState<string>("");
  const [otherSaleUnit, setOtherSaleUnit] = useState<string>("");

  const handleBNChange = (event: SelectChangeEvent) => {
    let bName: string = event.target.value;
    let ac = brandList.find((el) => el.brandName === bName);
    if (ac !== undefined) {
      setBn(event.target.value as string);
      setBnID(ac.id);
      setIsBrandError(false);
      setbrandError("");
    }
  };

  const handlePNChnage = (event: SelectChangeEvent) => {
    let productName: string = event.target.value;
    let ac = productList.find((el) => el.productName === productName);
    if (ac !== undefined) {
      setPn(event.target.value as string);
      setPnID(ac.productID);
      setIsProductError(false);
      setProductError("");
    }
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmitClick = () => {
    let isValid: Boolean = true;

    if (bn.trim() === "--Select--") {
      isValid = false;
      setIsBrandError(true);
      setbrandError(communication.SelectBrandName);
    }

    if (pn.trim() === "--Select--") {
      isValid = false;
      setIsProductError(true);
      setProductError(communication.SelectProductName);
    }

    if (uploadFileUpload === undefined || uploadFileUpload === null) {
      isValid = false;
      setDIError(true);
      setDIErrorText(communication.SelectImage);
    }

    if (price.trim() === "" || !ValidateGSTRate(price)) {
      isValid = false;
      setIsPriceError(true);
      setPriceErrorText(communication.BlankPrice);
    }

    if (saleUnit.trim() === "") {
      isValid = false;
    }

    if (conversionValue.trim() === "" || !ValidateGSTRate(conversionValue)) {
      isValid = false;
      setIsConversionValueError(true);
      setConversionValueErrorText(communication.BlankConversionRate);
    }

    if (description.trim() === "") {
      isValid = false;
      setIsDescriptionError(true);
      setDescriptionErrorText(communication.BlankDescription);
    }

    if (isValid) {
      if (uploadedImage === "") {
        uploadImage();
      }
    }
  };

  const uploadImage = () => {
    let imageName: string = uuid();
    setUploadedImage(imageName);
    UploadImageToS3WithNativeSdk(uploadFileUpload, imageName, InsertUpdateData);
  };

  const InsertUpdateData = () => {
    if (actionStatus === "new") {
    } else if (actionStatus === "edit") {
    }
  };

  const handelEditAndDelete = (type: string | null, a: ProductSetupModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setBn(a.brandName);
      setBnID(a.brandID);
      setPn(a.productName);
      setPnID(a.productID);
      setUploadedImage(a.imageName);
      setPrice(a.price);
      setConversionValue(a.conversionPrice);
      setSaleUnit(a.unitOfSale);
      setDescription(a.description);

      setbrandError("");
      setIsBrandError(false);
      setProductError("");
      setIsPriceError(false);
      setDIError(false);
      setDIErrorText("");
      setPriceErrorText("");
      setIsPriceError(false);
      setConversionValueErrorText("");
      setIsConversionValueError(false);
      setDescriptionErrorText("");
      setIsDescriptionError(false);
    }
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);

    if (query === "") {
      setProductSetupListTemp(productSetupList);
    } else {
      setProductSetupListTemp(
        productSetupList.filter((el: ProductSetupModel) => {
          return el.productName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const handleCancelClick = () => {
    setDisplay("Yes");
    setButtonLoading(false);
    setImage("");
    setUploadedImage("");
    setBn("");
    setBnID(0);
    setPn("");
    setPnID(0);
    setUploadFileUpload(null);
    setDesignButtonText("Upload Design");
    setOtherSaleUnit("");
    setSaleUnitwith1("");
    setPrice("");
    setSaleUnit("");
    setConversionValue("");
    setDescription("");
    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setActionStatus("new");

    setbrandError("");
    setIsBrandError(false);
    setProductError("");
    setIsPriceError(false);
    setDIError(false);
    setDIErrorText("");
    setPriceErrorText("");
    setIsPriceError(false);
    setConversionValueErrorText("");
    setIsConversionValueError(false);
    setDescriptionErrorText("");
    setIsDescriptionError(false);
  };
  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Product</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Add/Edit Product</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={isBrandError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Brand Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={bn} onChange={handleBNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {brandList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.brandName}>
                      {item.brandName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{brandError}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={isProductError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Product</b>
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
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b> Product Image</b>
              <label style={{ color: "#ff0000" }}>*</label>
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
                        // setImage(e.target.value);
                      }
                    }}
                  />
                </Button>
              </Grid>
              <FormHelperText>{errorDIText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Price</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Price"
              variant="outlined"
              size="small"
              value={price}
              error={isPriceError}
              helperText={priceErrorText}
              onChange={(e) => {
                setPrice((e.target as HTMLInputElement).value);
                setIsPriceError(false);
                setPriceErrorText("");
              }}
            />
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Sales Unit</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              sx={{ background: "#e5e5e5" }}
              fullWidth
              disabled
              placeholder="Sales Unit"
              variant="outlined"
              size="small"
              value={saleUnit}
              onChange={(e) => {
                setSaleUnit(e.currentTarget.value);
                setSaleUnitwith1("1 nos");
                setOtherSaleUnit("kg");
              }}
            />
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Unit Value</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <Grid>
              <label style={{ color: "#ff0000", float: "left", marginRight: 8, marginTop: 8 }}>{saleUnitwith1}</label>
              <TextField
                style={{ float: "left" }}
                //fullWidth
                placeholder="Price"
                variant="outlined"
                size="small"
                value={conversionValue}
                error={isConversionValueError}
                helperText={conversionValueErrorText}
                onChange={(e) => {
                  setConversionValue((e.target as HTMLInputElement).value);
                  setIsConversionValueError(false);
                  setConversionValueErrorText("");
                }}
              />
              <label style={{ color: "#ff0000", float: "left", marginLeft: 8, marginTop: 8 }}>{otherSaleUnit}</label>
            </Grid>
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Description</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Description"
              variant="outlined"
              size="small"
              value={description}
              error={isDescriptionError}
              helperText={descriptionErrorText}
              onChange={(e) => {
                setDescription((e.target as HTMLInputElement).value);
                setIsDescriptionError(false);
                setDescriptionErrorText("");
              }}
            />
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
          <Grid item xs={4} sm={5} md={8}>
            <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} style={{ display: buttonDisplay }} onClick={handleCancelClick}>
              Cancel
            </Button>
            <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
              Submit
            </LoadingButton>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Product Setup List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {productSetupList.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1, borderWidth: 1, borderColor: theme.palette.divider }}>
                      <Grid item xs={4} sm={4} md={4} sx={{ mt: 1, mr: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Product Name</b>
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="Search Product Name"
                          variant="outlined"
                          size="medium"
                          value={searchQuery}
                          onChange={(e) => {
                            onChangeSearch((e.target as HTMLInputElement).value);
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <GridSearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                    <DataGrid
                      style={{
                        opacity: dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      autoHeight={true}
                      getRowHeight={() => "auto"}
                      rows={productSetupListTemp}
                      columns={productSetupColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...productSetupList];
                        let a: ProductSetupModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        if (a) {
                          const clickType = (e.target as any).textContent;
                          if (clickType.toLowerCase() === "edit") handelEditAndDelete(clickType, a);
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

export default ProductListPage;

import { LoadingButton } from "@mui/lab";
import { Alert, AlertColor, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { BrandModel, ProductModel, ProductSetupModel } from "../../../models/Model";
import { AWSImagePath } from "../../../utils/paths";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { productSetupColumns } from "../../../utils/tablecolumns";
import { communication } from "../../../utils/communication";
import { ValidateGSTRate } from "../../../utils/validations";
import uuid from "react-uuid";
import { UploadImageToS3WithNativeSdk } from "../../../utils/AWSFileUpload";
import Provider from "../../../api/Provider";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import SearchIcon from "@mui/icons-material/Search";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { APIConverter } from "../../../utils/apiconverter";

const ProductListPage = () => {
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

  const theme = useTheme();
  //#region Variables
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("Yes");
  const [isApprove, setisApprove] = useState("Yes");
  const [isPublish, setisPublish] = useState("Approved");
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
  const [unitID, setUnitID] = useState<string>("")
  const [convertedUnitID, setConvertedUnitID] = useState<string>("")

  // const [actualName, setActualName] = useState<string>("");
  // const [isActualNameValueError, setIsActualNameValueError] = useState<boolean>(false);
  // const [ActualNameValueErrorText, setisActualNameErrorText] = useState<string>("");




  const [description, setDescription] = useState<string>("");
  const [isDescriptionError, setIsDescriptionError] = useState<boolean>(false);
  const [descriptionErrorText, setDescriptionErrorText] = useState<string>("");

  const [saleUnitwith1, setSaleUnitwith1] = useState<string>("");
  const [saleUnit, setSaleUnit] = useState<string>("");
  const [otherSaleUnit, setOtherSaleUnit] = useState<string>("");
  const [arnID, setArnID] = useState<number>(0);
  //const [isBrandApproved, setIsBrandApproved] = useState<Boolean>(true);
  //#endregion 

  //#region Functions
  useEffect(() => {
    FetchData("", cookies.dfc.UserID);
    FetchBrands(cookies.dfc.UserID);
    FetchActvityRoles();
  }, []);

  const FetchShowBrand = (UserID) => {
    let params = {
      DealerID: UserID,
    };
    Provider.getAll(`dealerbrand/getshowbrand?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {

            //  setIsBrandApproved(response.data.data[0].showBrand);
            if (response.data.data[0].showBrand) {
              FetchData("", UserID);
              FetchBrands(UserID);
              FetchActvityRoles();
            }
          }
        }
      })
      .catch((e) => { });
  };

  const FetchActvityRoles = () => {
    Provider.getAll("master/getmainactivities")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el: any) => {
              return el.display && el.activityRoleName === "Dealer";
            });
            setArnID(response.data.data[0].id);
          }
        }
      })
      .catch((e) => { });
  };

  const APIConverterProductScreen = (response) => {
    function renameKey(obj, oldKey, newKey) {
      if (obj.hasOwnProperty(oldKey)) {
        obj[newKey] = obj[oldKey];
        if (newKey === "display") {
          obj[newKey] = obj[newKey] == "1" ? true : false;
        }
        delete obj[oldKey];
      }
    }
  
    response.forEach((obj) => {
  
      renameKey(obj, "actual_unit_name", "unitOfSale");
      renameKey(obj, "actual_unit_name_txt", "unitOfSaleText");
      renameKey(obj, "actual_unit_refno", "unitID");
      renameKey(obj, "brand_name", "brandName");
      renameKey(obj, "brand_refno", "brandID");
      renameKey(obj, "company_product_refno", "id");
      renameKey(obj, "convert_unit_name", "convertUnitName");
      renameKey(obj, "product_refno", "productID");
      renameKey(obj, "product_name", "productName");

      renameKey(obj, "brand_prefixname", "brandPrefix");
      renameKey(obj, "convert_unit_refno", "convertedUnitID");
      renameKey(obj, "converted_unit_value", "convertedUnitValue");
      renameKey(obj, "isapprove", "isApprove");
      renameKey(obj, "ispublish", "isPublish");
      renameKey(obj, "product_image_url", "image");
      renameKey(obj, "sales_unit", "unitOfSale");
      renameKey(obj, "view_status", "display");

      
    });
  
    return response;
  };

  const FetchData = (type: string, UserID: number) => {
    handleCancelClick();
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        company_product_refno: "all",
        Sess_if_create_brand: cookies.dfc.Sess_if_create_brand,
      }
    };
    // debugger;
    Provider.createDFCommon(Provider.API_URLS.DealerCompanyProductRefNo, params)
      .then((response: any) => {
        // debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            debugger;
            response.data.data = APIConverterProductScreen(response.data.data);
            debugger;
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              a.isApprove = a.isApprove ? "Yes" : "No";
              a.isPublish = a.isPublish ? "Approved" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setProductSetupList(arrList);
            setProductSetupListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Product " + type);
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

  const FetchBrands = (UserID: number) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID
      }
    };
    Provider.createDFCommon(Provider.API_URLS.GetBrandnameDealerProductform, params)
      .then((response: any) => {

        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            // debugger;
            response.data.data = APIConverter(response.data.data);
            // debugger;
            const brandData: any = [];

            response.data.data.map((data: any, i: number) => {

              brandData.push({
                brandID: data.brandID,
                brandName: data.brandName,
                brandNameDisplay: `${data.brandName} (${data.categoryName})`
              });
            });


            setBrandList(brandData);
          }
        }
      })
      .catch((e) => { });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleBNChange = (event: SelectChangeEvent) => {
    // debugger
    let bName: string = event.target.value;
    let ac = brandList.find((el) => el.brandName === bName);
    if (ac !== undefined) {
      setBn(event.target.value as string);
      setBnID(ac.brandID);
      setIsBrandError(false);
      setbrandError("");
      setProductList([]);
      setPn("--Select--");
      setPnID(0);
      setIsProductError(false);
      setProductError("");
      setSaleUnit("");
      setSaleUnitwith1("");
      setOtherSaleUnit("");
      setIsProductError(false);
      setProductError("");
      FetchProductsFromCategory(ac.brandID);
      FetchUnitsFromProduct(ac.brandID);
    }
  };

  const FetchProductsFromCategory = (brandID) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
        brand_refno: brandID
      }
    };

    Provider.createDFCommon(Provider.API_URLS.GetProductDealerProductform, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            // debugger;
            response.data.data = APIConverter(response.data.data);
            // debugger;
            // response.data.data = response.data.data.filter((el: any) => {
            //   return el.display;
            // });
            setProductList(response.data.data);
            // if (callbackFunction !== null) {
            //   callbackFunction(response.data.data);
            // }
          }
        }
      })
      .catch((e) => { });
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

  const FetchUnitsFromProduct = (brandID) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
        brand_refno: brandID
      }
    };

    Provider.createDFCommon(Provider.API_URLS.GetProductDataDealerProductform, params)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            // debugger;
            response.data.data = APIConverter(response.data.data);
            //  debugger;
            setUnitID(response.data.data[0].unitID);
            setConvertedUnitID(response.data.data[0].convertedUnitID);
            setSaleUnit(response.data.data[0].unitOfSale);
            setSaleUnitwith1(response.data.data[0].selectedUnit);
            setOtherSaleUnit(response.data.data[0].convertedUnit);
          }
        }
      })
      .catch((e) => { });
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
    setisApprove((event.target as HTMLInputElement).value);
    setisPublish((event.target as HTMLInputElement).value);

  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmitClick = () => {
    debugger;
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

    if (price.toString().trim() === "" || !ValidateGSTRate(price)) {
      isValid = false;
      setIsPriceError(true);
      setPriceErrorText(communication.BlankPrice);
    }

    if (saleUnit.trim() === "") {
      isValid = false;
    }

    if (conversionValue.toString().trim() === "" || !ValidateGSTRate(conversionValue)) {
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
      setButtonLoading(true);
      if (uploadFileUpload !== null) {
        uploadImage();
      } else {
        InsertUpdateData("Success", uploadedImage);
      }
    }
  };

  const uploadImage = () => {
    let imageName: string = uuid();
    let fileExtension = uploadedImage.split(".").pop();
    setUploadedImage(imageName + "." + fileExtension);
    //  setUploadedImage(imageName);
    UploadImageToS3WithNativeSdk(uploadFileUpload, imageName + "." + fileExtension, InsertUpdateData);
  };

  const InsertUpdateData = (Status: string, fileName: string) => {
    debugger;
    const datas = new FormData();
    if (Status.toLowerCase() === "success") {
      if (actionStatus === "new") {

        let params = {
          Sess_UserRefno: cookies.dfc.UserID,
          brand_refno: bnID,
          product_refno: pnID,
          price: price,
          sales_unit: saleUnit,
          converted_unit_value: conversionValue,
          actual_unit_refno: unitID,
          convert_unit_refno: convertedUnitID,
          description: description,
          view_status: display == "Yes" ? "1" : "0",
        };
        debugger;
        datas.append("data", JSON.stringify(params));
        datas.append("product_image", uploadFileUpload ? uploadFileUpload : "");
        debugger;
        console.log(datas);
        Provider.createDFCommonWithHeader(Provider.API_URLS.DealerProductSetUpCreate, datas)
          .then((response: any) => {
            debugger;
            if (response.data && response.data.code === 200) {
              debugger;
              FetchData("added", CookieUserID);
            } else if (response.data.code === 304) {
              setSnackMsg(communication.AlreadyExists);
              setSnackbarType("error");
              setOpen(true);
            } else {
              setSnackMsg(communication.Error);
              setSnackbarType("error");
              setOpen(true);
            }
            handleCancelClick();
          })
          .catch((e) => {
            debugger;
            setSnackMsg(communication.NetworkError);
            setSnackbarType("error");
            setOpen(true);
            handleCancelClick();
          });
      } else if (actionStatus === "edit") {
        const params = {
          // ID: selectedID,
          // DealerID: CookieUserID,
          // BrandID: bnID,
          // ProductID: pnID,
          // Image: AWSImagePath + fileName,
          // Price: price,
          // UnitValue: conversionValue,
          // Description: description,
          // Display: display === "Yes",

          Sess_UserRefno: cookies.dfc.UserID,
          company_product_refno: selectedID,
          brand_refno: bnID,
          product_refno: pnID,
          price: price,
          sales_unit: saleUnit,
          converted_unit_value: conversionValue,
          actual_unit_refno: unitID,
          convert_unit_refno: convertedUnitID,
          description: description,
          view_status: display ? "1" : "0",
        };

        datas.append("data", JSON.stringify(params));
        datas.append("product_image", uploadFileUpload ? uploadFileUpload[0] : "");
        debugger;
        Provider.createDFCommonWithHeader(Provider.API_URLS.DealerProductSetUpCreate, datas)
          .then((response: any) => {
            if (response.data && response.data.code === 200) {
              FetchData("updated", CookieUserID);
            } else if (response.data.code === 304) {
              setSnackMsg(communication.AlreadyExists);
              setSnackbarType("error");
              setOpen(true);
            } else {
              setSnackMsg(communication.Error);
              setSnackbarType("error");
              setOpen(true);
            }
            handleCancelClick();
          })
          .catch((e) => {
            setSnackMsg(communication.NetworkError);
            setSnackbarType("error");
            setOpen(true);
            handleCancelClick();
          });
      }
    } else {
      setSnackMsg(communication.Error);
      setSnackbarType("error");
      setOpen(true);
      handleCancelClick();
    }
  };

  const handelEditAndDelete = (type: string | null, a: ProductSetupModel | undefined) => {
    debugger;
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setButtonDisplay("unset");
      setActionStatus("edit");

      setDisplay(a.display);
      setisApprove(a.isApprove);
      setisPublish(a.isPublish);

      setBn(a.brandName);
      setBnID(a.brandID);
      setPn(a.productName);
      setPnID(a.productID);
      setUploadedImage(a.image.split("/").pop());
      setPrice(a.price);

      setConversionValue(a.convertedUnitValue);
      setUnitID(a.unitID)
      setConvertedUnitID(a.convertedUnitID)
      setSaleUnit(a.unitOfSale);
      setDescription(a.description);
      setSelectedID(a.id);

      setbrandError("");
      setIsBrandError(false);
      setProductError("");
      setIsPriceError(false);
      setDIError(false);
      setDIErrorText(a.image.split("/").pop());
      setPriceErrorText("");
      setIsPriceError(false);
      setConversionValueErrorText("");
      setIsConversionValueError(false);
      setDescriptionErrorText("");
      setIsDescriptionError(false);

      let brandData = brandList.find((el) => el.brandID === a.brandID);
      if (brandData !== undefined) {
        FetchProductsFromCategory(a.brandID);
        FetchUnitsFromProduct(a.productID);
      }
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
    setisApprove("Yes");
    setisPublish("Approved");
    setButtonLoading(false);
    setImage("");
    setUploadedImage("");
    setBn("--Select--");
    setBnID(0);
    setPn("--Select--");
    setPnID(0);
    setUploadFileUpload(null);
    setDesignButtonText("Upload Design");
    setOtherSaleUnit("");
    setSaleUnitwith1("");
    setPrice("");
    setSaleUnit("");
    setConversionValue("");
    setUnitID("");
    setConvertedUnitID("");
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
  //#endregion 

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
                      {item.brandNameDisplay}
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
                placeholder="Unit value"
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
                  <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
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
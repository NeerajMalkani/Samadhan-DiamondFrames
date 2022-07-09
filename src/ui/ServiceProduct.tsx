import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { Theme, useTheme } from "@mui/material/styles";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../api/Provider";
import Header from "../components/Header";
import DataContext from "../contexts/DataContexts";
import { CategoryModel, ProductModel } from "../models/Model";
import { communication } from "../utils/communication";
import { serviceProductColumns } from "../utils/tablecolumns";
import { ValidateGSTRate } from "../utils/validations";

function getStyles(name: string, unitSales: readonly string[], theme: Theme) {
  return {
    fontWeight: unitSales.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const ServiceProductPage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  const theme = useTheme();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
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
  const [isRateWithMaterialError, setIsRateWithMaterialError] = useState<boolean>(false);
  const [rateWithMaterialErrorText, setRateWithMaterialErrorText] = useState<string>("Materials + Labour cost");

  const [rateWithoutMaterial, setRateWithoutMaterial] = useState<string>("");
  const [isRateWithoutMaterialError, setIsRateWithoutMaterialError] = useState<boolean>(false);
  const [rateWithoutMaterialErrorText, setRateWithoutMaterialErrorText] = useState<string>("Only Labour cost");

  const [alternateUnit, setAlternateUnit] = useState<string>("");
  const [isAlternateUnitError, setIsAlternateUnitError] = useState<boolean>(false);
  const [alternateUnitErrorText, setAlternateUnitErrorText] = useState<string>("");

  //
  const [specification, setSpecification] = useState<string>("");
  const [shortSpecification, setShortSpecification] = useState<string>("");

  const [display, setDisplay] = useState("Yes");

  const [activityNamesList, setActivityNamesList] = useContext(DataContext).activityNamesList;
  const [serviceNameList, setServiceNameList] = useContext(DataContext).serviceNameList;
  const [unitOfSalesList, setUnitOfSalesList] = useContext(DataContext).unitOfSalesList;
  const [unitList, setUnitList] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useContext(DataContext).categoryList;
  const [productList, setProductList] = useContext(DataContext).productList;
  const [productListTemp, setProductListTemp] = useState<Array<ProductModel>>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [showauos, setShowauos] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState<string>("");
  const [dialogText, setDialogText] = useState<string>("");

  const [categoryListFilter, setCategoryListFilter] = useContext(DataContext).categoryList;
  const [snFilter, setSnFilter] = useState("--Select--");
  // const [snIDFilter, setSnIDFilter] = useState<number>(0);

  const [cnFilter, setCnFilter] = useState("--Select--");
  //const [cnIDFilter, setCnIDFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [selectedUnitID, setSelectedUnitID] = useState<number>(0);

  const FetchData = () => {
    Provider.getAll("master/getserviceproducts")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              let id = { id: index + 1 };
              a = Object.assign(a, sr);
              a = Object.assign(a, id);
              return a;
            });
            setProductList(arrList);
            setProductListTemp(arrList);
          }
        } else {
          setSnackbarMessage("No data found");
          setIsSnackbarOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarMessage(e.message);
        setIsSnackbarOpen(true);
      });
  };

  const FetchActvityRoles = () => {
    Provider.getAll("master/getmainactivities")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el: any) => {
              return el.display && el.activityRoleName === "Contractor";
            });
            setActivityNamesList(response.data.data);
            setArn(response.data.data[0].activityRoleName);
            setArnID(response.data.data[0].id);
            FetchServicesFromActivity(response.data.data[0].id);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchServicesFromActivity = (selectedID: number) => {
    let params = {
      ID: selectedID,
    };

    Provider.getAll(`master/getservicesbyroleid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el: any) => {
              return el.display;
            });
            setServiceNameList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchCategoriesFromServices = (selectedActivityID: number, selectedServiceID: number, callbackFunction: any = null) => {
    //, callbackFunction: any = null
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
            setCategoryList(response.data.data);
            if (callbackFunction !== null) {
              callbackFunction(response.data.data);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchCategoriesFromServicesFilter = (selectedActivityID: number, selectedServiceID: number) => {
    //, callbackFunction: any = null
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
            setCategoryListFilter(response.data.data);
            // if (callbackFunction !== null) {
            //   callbackFunction(response.data.data);
            // }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchProductsFromCategory = (selectedActivityID: number, selectedServiceID: number, selectedCategoryID: number, callbackFunction: any = null) => {
    let params = {
      ActivityID: selectedActivityID,
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
            setProductList(response.data.data);
            if (callbackFunction !== null) {
              callbackFunction(response.data.data);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchUnitsFromProduct = (selectedID: number) => {
    let params = {
      ProductID: selectedID,
    };

    Provider.getAll(`master/getunitbyproductid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el: any) => {
              return el.display;
            });
            setUnitOfSalesList(response.data.data);
            const units = response.data.data.map((data: any) => data.displayUnit);
            setUnitList(units[0].split(" / "));
          }
        }
      })
      .catch((e) => {});
  };

  useEffect(() => {
    FetchData();
    FetchActvityRoles();
  }, []);

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: string = event.target.value;
    let ac = serviceNameList.find((el) => el.serviceName === serviceName);
    if (ac !== undefined) {
      setSn(event.target.value as string);
      setSnID(ac.id);
      FetchCategoriesFromServices(arnID, ac.id);
      //  SetResetServiceName(false);
      //  SetResetCategoryName(true);
      //  SetResetUnitName(true);
      //  FetchCategoriesFromServices(ac.id);
    }
  };

  const handleSNChangeFilter = (event: SelectChangeEvent) => {
    let serviceName: string = event.target.value;
    let ac = serviceNameList.find((el) => el.serviceName === serviceName);
    if (ac !== undefined) {
      setSnFilter(serviceName);
      //setSnIDFilter(ac.id);
      SetFilters(serviceName, cnFilter, searchQuery);
      FetchCategoriesFromServicesFilter(arnID, ac.id);
    } else {
      setSnFilter("--Select--");
      setCategoryListFilter([]);
      setCnFilter("--Select--");
      SetFilters(serviceName, "--Select--", searchQuery);
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
      SetResetUnitName(true);
      setGst(parseFloat(ac.gstRate).toFixed(2) + "%");
      setHsn(ac.hsnsacCode);
      FetchProductsFromCategory(arnID, snID, ac.id);
    }
  };

  const handleCNChangeFilter = (event: SelectChangeEvent) => {
    let categoryName: string = event.target.value;
    let ac = categoryListFilter.find((el) => el.categoryName === categoryName);
    if (ac !== undefined) {
      setCnFilter(categoryName);
      // setCnIDFilter(ac.id);
      SetFilters(snFilter, categoryName, searchQuery);
    } else {
      setCnFilter("--Select--");
      SetFilters(snFilter, categoryName, searchQuery);
    }
  };

  const handlePNChnage = (event: SelectChangeEvent) => {
    let productName: string = event.target.value;
    let ac = productList.find((el) => el.productName === productName);
    if (ac !== undefined) {
      setPn(event.target.value as string);
      setPnID(ac.productID);
      SetResetProductName(false);
      SetResetUnitName(true);
      FetchUnitsFromProduct(ac.productID);
    }
  };

  const handleUnitChange = (event: SelectChangeEvent<typeof unitsOfSales>) => {
    setUnitsOfSales(event.target.value);
    if (unitOfSalesList[0].unit1Name === event.target.value) {
      setSelectedUnit(unitOfSalesList[0].unit2Name);
      setSelectedUnitID(unitOfSalesList[0].unit1ID);
    } else {
      setSelectedUnit(unitOfSalesList[0].unit1Name);
      setSelectedUnitID(unitOfSalesList[0].unit2ID);
    }

    setShowauos(true);
    SetResetUnitName(false);
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
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

    if (rateWithMaterial === "" || !ValidateGSTRate(rateWithMaterial)) {
      isValid = false;
      setIsRateWithMaterialError(true);
      setRateWithMaterialErrorText(communication.BlankRateWithMaterial);
    }

    if (rateWithoutMaterial === "" || !ValidateGSTRate(rateWithoutMaterial)) {
      isValid = false;
      setIsRateWithoutMaterialError(true);
      setRateWithoutMaterialErrorText(communication.BlankRateWithoutMaterial);
    }

    if (alternateUnit === "" || !ValidateGSTRate(alternateUnit)) {
      isValid = false;
      setIsAlternateUnitError(true);
      setAlternateUnitErrorText(communication.BlankAlternateUnit);
    }

    if (isValid) {
      UpdateData();
    }
  };

  const UpdateData = () => {
    Provider.create("master/updateproduct", {
      ProductID: pnID,
      RateWithMaterials: rateWithMaterial,
      RateWithoutMaterials: rateWithoutMaterial,
      AlternateUnitOfSales: alternateUnit,
      ShortSpecification: shortSpecification,
      Specification: specification,
      ServiceDisplay: display === "Yes",
      SelectedUnitID: selectedUnitID,
    })
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          FetchData();
          handleCancelClick();
        } else {
          setSnackbarMessage(communication.Error);
          setIsSnackbarOpen(true);
        }
      })
      .catch((e) => {
        setSnackbarMessage(communication.NetworkError);
        setIsSnackbarOpen(true);
      });
  };

  const handleCancelClick = () => {
    setDisplay("Yes");

    // SetResetActivityName(true);

    SetResetServiceName(true);
    //setServiceNameList([]);

    SetResetCategoryName(true);
    setCategoryList([]);

    SetResetProductName(true);
    setProductList([]);

    SetResetUnitName(true);
    SetResetRateWithMaterial(true);
    SetResetRateWithoutMaterial(true);
    SetResetAlternateUnit(true);

    setShortSpecification("");
    setSpecification("");

    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setActionStatus("new");
  };

  const handelEditAndDelete = (type: string | null, a: ProductModel | undefined) => {
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
      FetchCategoriesFromServices(arnID, a?.serviceID, (acategoryList: any) => {
        let ca: CategoryModel | undefined = acategoryList.find((el: any) => el.id === a?.categoryID);
        if (ca !== undefined) {
          setHsn(ca.hsnsacCode);
          setGst(parseFloat(ca.gstRate).toFixed(2) + "%");
        }
      });

      setPn(a?.productName);
      SetResetProductName(false);
      FetchUnitsFromProduct(a.productID);
      // setUnitsOfSales(a?.unitName);
      // if (a !== undefined) {
      //   setUnitList(a.unitName.split(" / "));
      //  // setUnitList([a.unit1Name.toString(), a.unit2Name.toString()]);
      // }
      if (a?.selectedUnitID === a?.unit1ID) {
        setUnitsOfSales(a?.unit1Name);
        setSelectedUnitID(a?.unit1ID);
        setSelectedUnit(a?.unit2Name);
      } else {
        setUnitsOfSales(a?.unit2Name);
        setSelectedUnitID(a?.unit2ID);
        setSelectedUnit(a?.unit1Name);
      }
      setShowauos(true);
      // setUnitsOfSalesID(a?.unitOfSalesID);
      SetResetUnitName(false);
      //FetchUnitsFromCategory(a?.categoryID);
      setAlternateUnit(a?.alternateUnitOfSales.toString());
      setRateWithMaterial(a?.rateWithMaterials.toString());
      setRateWithoutMaterial(a?.rateWithoutMaterials.toString());
      setShortSpecification(a?.shortSpecification);
      setSpecification(a?.specification);

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
      setShowauos(false);
      setUnitList([]);
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

  const GetStringifyJson = (params: any) => {
    var string_ = JSON.stringify(params);

    string_ = string_.replace(/{/g, "");
    string_ = string_.replace(/}/g, "");
    string_ = string_.replace(/:/g, "=");
    string_ = string_.replace(/,/g, "&");
    string_ = string_.replace(/"/g, "");

    return string_;
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    SetFilters(snFilter, cnFilter, query);
    // if (query === "") {
    //   setProductListTemp(productList);
    // } else {
    //   setProductListTemp(
    //     productList.filter((el: ProductModel) => {
    //       return el.productName.toString().toLowerCase().includes(query.toLowerCase());
    //     })
    //   );
    // }
  };

  const SetFilters = (snText: string, cnText: string, searcText: string) => {
    setProductListTemp(productList);
    let ArrOfData: any = [];

    if (snText === "--Select--" && cnText === "--Select--" && searcText === "") {
      ArrOfData = productList;
    }

    if (snText !== "--Select--") {
      ArrOfData = productList.filter((el: ProductModel) => {
        return el.serviceName.toString().toLowerCase().includes(snText.toLowerCase());
      });
    }

    if (cnText !== "--Select--") {
      ArrOfData = ArrOfData.filter((el: ProductModel) => {
        return el.categoryName.toString().toLowerCase().includes(cnText.toLowerCase());
      });
    }

    if (searchQuery !== "") {
      if (snText === "--Select--" || cnText === "--Select--") {
        ArrOfData = productList.filter((el: ProductModel) => {
          return el.productName.toString().toLowerCase().includes(searcText.toLowerCase());
        });
      } else {
        ArrOfData = ArrOfData.filter((el: ProductModel) => {
          return el.productName.toString().toLowerCase().includes(searcText.toLowerCase());
        });
      }
    }

    setProductListTemp(ArrOfData);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
              <Select value={arn}>
                <MenuItem disabled={true} value={arn}>
                  {arn}
                </MenuItem>
              </Select>
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
              sx={{ background: "#e5e5e5" }}
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
              sx={{ background: "#e5e5e5" }}
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
            <FormControl fullWidth size="small" error={unitError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Unit Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={unitsOfSales} onChange={handleUnitChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {unitList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{unitErrorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
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
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
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
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Alternative Unit of Sales</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  width: "80px",
                  marginRight: 1,
                  textAlign: "left",
                  display: showauos ? "block" : "none",
                }}
              >
                {unitList.length > 0 && showauos ? "1 " + unitsOfSales + " =" : ""}
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
              <Typography
                variant="subtitle2"
                sx={{
                  width: "64px",
                  marginLeft: 1,
                  textAlign: "center",
                  display: showauos ? "block" : "none",
                }}
              >
                {unitList.length > 0 && showauos ? selectedUnit : ""}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Short Specification</b>
            </Typography>
            <TextField
              fullWidth
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
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Product List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {productList.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <Grid item xs={4} sm={4} md={4} sx={{ mt: 1, mr: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Service Name</b>
                        </Typography>
                        <Select fullWidth value={snFilter} onChange={handleSNChangeFilter}>
                          <MenuItem key={0} value="--Select--">
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
                      </Grid>

                      <Grid item xs={4} sm={4} md={4} sx={{ mt: 1, mr: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Category Name</b>
                        </Typography>
                        <Select fullWidth value={cnFilter} onChange={handleCNChangeFilter}>
                          <MenuItem key={0} value="--Select--">
                            --Select--
                          </MenuItem>
                          {categoryListFilter.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.categoryName}>
                                {item.categoryName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} sx={{ mt: 1, mr: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Product Name</b>
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="Search Product name"
                          variant="outlined"
                          size="medium"
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
                      rowHeight={80}
                      rows={productListTemp}
                      columns={serviceProductColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...productList];
                        let a: ProductModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        if (a) {
                          const clickType = (e.target as any).textContent;

                          if (clickType.toLowerCase() === "edit") handelEditAndDelete(clickType, a);

                          if (clickType.toLowerCase() === "view specification" && a.specification !== "") {
                            setDialogText(a.specification);
                            setDialogHeader("Specification");
                            setOpenDialog(true);
                          }

                          if (clickType.toLowerCase() === "view short specification" && a.specification !== "") {
                            setDialogText(a.shortSpecification);
                            setDialogHeader("Short Specification");
                            setOpenDialog(true);
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
        </Grid>
      </Container>
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{dialogHeader}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServiceProductPage;

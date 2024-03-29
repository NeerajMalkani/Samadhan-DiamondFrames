import { LoadingButton } from "@mui/lab";
import { Alert, AlertColor, Box, Button, Container, FormControl, FormControlLabel, FormHelperText, Grid, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, TextField, Typography, Stack } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../../../api/Provider";
import Header from "../../../components/Header";
import { ActivityRoleNameModel, CategoryModel, productModel, ProductModel, ServiceNameModel, UnitModel, UnitWithConversionModel } from "../../../models/Model";
import { communication } from "../../../utils/communication";
import { ValidateGSTRate } from "../../../utils/validations";
import AddIcon from "@mui/icons-material/Add";
import { APIConverter } from "../../../utils/apiconverter";

const ServiceProductPage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  const theme = useTheme();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables
  // const [loading, setLoading] = useState(true);
  const [type, setType] = useState("New");
  const [selectedID, setSelectedID] = useState("");
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
  const [unitsOfSalesConverted, setUnitsOfSalesConverted] = useState<string>("");

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

  const [activityNamesList, setActivityNamesList] = useState<Array<ActivityRoleNameModel>>([]);
  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);
  const [unitOfSalesList, setUnitOfSalesList] = useState<Array<UnitWithConversionModel>>([]);
  const [unitList, setUnitList] = useState<Array<UnitModel>>([]);
  const [categoryList, setCategoryList] = useState<Array<CategoryModel>>([]);
  const [productList, setProductList] = useState<Array<ProductModel>>([]);
  const [serviceProductList, setServiceProductList] = useState<Array<ProductModel>>([]);
  // const [productListTemp, setProductListTemp] = useState<Array<ProductModel>>([]);
  // const [pageSize, setPageSize] = useState<number>(5);
  const [showauos, setShowauos] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = useState<string>("new");

  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [selectedUnitID, setSelectedUnitID] = useState<number>(0);
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  //#endregion

  //#region Functions
  const FetchData = (id: string) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        service_product_refno: id,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ServiceProductrefNoCheck, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display === "1" ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
              return a;
            });

            setServiceProductList(arrList);
            FetchActvityRoles((arnData) => {
              FetchServicesFromActivity(arnData, (list) => {
                let srid = list.find((el: any) => {
                  return el.serviceName === arrList[0].serviceName;
                }).id;
                setSnID(srid);
                setSn(arrList[0].serviceName);

                FetchCategoriesFromServices(arnData, srid, (categoryList: any) => {
                  let ca: CategoryModel | undefined = categoryList.find((el: any) => el.categoryName === arrList[0]?.categoryName);
                  if (ca !== undefined) {
                    setCnID(ca.id);
                    setCn(ca.categoryName);
                    FetchCategoryDataFromCategory(ca.id);

                    FetchProductsFromCategory(arnData, ca.id, (productList) => {
                      let pa: ProductModel | undefined = productList.find((el: any) => el.productName === arrList[0]?.productName);
                      if (pa !== undefined) {
                        setPnID(pa.productID);
                        setPn(pa.productName);
                        FetchAlternativeUnitOfSalesFromUnit(arrList[0].unitId);
                        FetchUnitsFromProduct(pa.productID, (unitList) => {
                          let unit: UnitModel | undefined = unitList.find((el: any) => el.unitName === arrList[0]?.selectedUnit);
                          if (unit !== undefined) {
                            setSelectedUnitID(unit?.unitId);
                            setSelectedUnit(unit?.unitName);
                          }
                        });
                      }
                    });
                  }
                });
              });
            });

            setRateWithMaterial(arrList[0].rateWithMaterials);
            setRateWithoutMaterial(arrList[0].rateWithoutMaterials);
            setAlternateUnit(arrList[0].conversionRate);
            setShortSpecification(arrList[0].shortSpecification);
            setSpecification(arrList[0].specification);
          }
        } else {
          setSnackbarMessage(communication.NoData);
          setIsSnackbarOpen(true);
          setSnackbarType("info");
        }
        //   setLoading(false);
      })
      .catch((e) => {
        // setLoading(false);
        setSnackbarMessage(e.message);
        setSnackbarType("error");
        setIsSnackbarOpen(true);
      });
  };

  const FetchActvityRoles = (callback = null) => {
    Provider.createDFAdmin(Provider.API_URLS.ActivityRoleServiceProduct)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setActivityNamesList(response.data.data);
            setArn(response.data.data[0].activityRoleName);
            setArnID(response.data.data[0].id);

            if (type === "New") {
              FetchServicesFromActivity(response.data.data[0].id);
            }

            if (callback) {
              callback(response.data.data[0].id);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchServicesFromActivity = (selectedID: number, callback = null) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: selectedID,
      },
    };

    Provider.createDFAdmin(Provider.API_URLS.ServiceNameServiceProduct, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setServiceNameList(response.data.data);
            if (callback) {
              callback(response.data.data);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchCategoriesFromServices = (selectedActivityID: number, selectedServiceID: number, callbackFunction: any = null) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: selectedActivityID,
        service_refno: selectedServiceID,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.CategoryNameServiceProduct, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setCategoryList(response.data.data);
            if (callbackFunction !== null) {
              callbackFunction(response.data.data);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchProductsFromCategory = (selectedActivityID: number, selectedCategoryID: number, callbackFunction: any = null) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: selectedActivityID,
        category_refno: selectedCategoryID,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ProductServiceProduct, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setProductList(response.data.data);
            if (callbackFunction) {
              callbackFunction(response.data.data);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchUnitsFromProduct = (selectedID: number, callbackFunction: any = null) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        product_refno: selectedID,
      },
    };

    Provider.createDFAdmin(Provider.API_URLS.UnitNameSelectedForProduct, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);

            setUnitOfSalesList(response.data.data);
            const units = [];
            response.data.data.forEach((el: any) => {
              units.push({
                unitId: el.unitId,
                unitName: el.displayUnit,
              });
            });
            setUnitList(units);
            if (callbackFunction) {
              callbackFunction(units);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchCategoryDataFromCategory = (selectedItem) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        category_refno: selectedItem,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.CategoryDataForProduct, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setHsn(response.data.data[0].hsnsacCode);
            setGst(response.data.data[0].gstRate + "%");
          }
        }
      })
      .catch((e) => {});
  };

  const FetchAlternativeUnitOfSalesFromUnit = (unitID) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        unitcategoryrefno_unitrefno: unitID,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.AlternativeUnitOfSalesServiceProduct, params)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setUnitsOfSalesConverted(response.data.data[0].actual_unitname.split(" ")[1].split("=")[0]);
            setSelectedUnit(response.data.data[0].convert_unitname);
            setAlternateUnit(response.data.data[0].actual_unit_value);
            setShowauos(true);
          }
        }
      })
      .catch((e) => {});
  };

  useEffect(() => {
    let paramVal: string = window.location.pathname.split("/").pop();
    if (!isNaN(parseInt(paramVal))) {
      setType("edit");
      setSelectedID(paramVal);
      FetchData(paramVal);
    } else {
      FetchActvityRoles();
    }
  }, []);

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: string = event.target.value;
    let ac = serviceNameList.find((el) => el.serviceName === serviceName);
    if (ac !== undefined) {
      setSn(event.target.value as string);
      setSnID(ac.id);
      FetchCategoriesFromServices(arnID, ac.id);
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
      FetchCategoryDataFromCategory(ac.id);
      FetchProductsFromCategory(arnID, ac.id);
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
    let unitName: string = event.target.value;
    let ac = unitList.find((el) => el.unitName === unitName);
    setSelectedUnitID(ac.unitId);
    FetchAlternativeUnitOfSalesFromUnit(ac.unitId);
    // if (unitOfSalesList[0].displayUnit === event.target.value) {
    //   setSelectedUnit(unitOfSalesList[1].displayUnit);
    //   setSelectedUnitID(unitOfSalesList[1].id);
    //   // if (unitOfSalesList[0].conversionRate != null) {
    //   //   setAlternateUnit(unitOfSalesList[0].conversionRate.toString());
    //   // }
    // } else {
    //   setSelectedUnit(unitOfSalesList[0].displayUnit);
    //   setSelectedUnitID(unitOfSalesList[0].id);
    //   // if (unitOfSalesList[1].conversionRate != null) {
    //   //   setAlternateUnit(unitOfSalesList[1].conversionRate.toString());
    //   // }
    // }
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
    setButtonLoading(true);

    const params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: arnID,
        service_refno: snID,
        category_refno: cnID,
        product_refno: pnID,
        unitcategoryrefno_unitrefno: selectedUnitID,
        with_material_rate: rateWithMaterial,
        without_material_rate: rateWithoutMaterial,
        unit_conversion_value: alternateUnit,
        short_desc: shortSpecification,
        specification: specification,
        view_status: display === "Yes" ? 1 : 0,
      },
    };

    if (type === "edit") {
      params.data["service_product_refno"] = selectedID;
    }

    Provider.createDFAdmin(type === "edit" ? Provider.API_URLS.ServiceProductUpdate : Provider.API_URLS.ServiceProductCreate, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          //FetchData("updated");
          handleCancelClick();
          if (type === "edit") {
            navigate("/master/addserviceproduct");
          }else{
            setSnackbarMessage("Service product added");
            setIsSnackbarOpen(true);
            setSnackbarType("success");
          }
        } else if (response.data.code === 304) {
          setSnackbarMessage(communication.ExistsError);
          setIsSnackbarOpen(true);
          setSnackbarType("error");
        } else {
          setSnackbarMessage(communication.Error);
          setSnackbarType("error");
          setIsSnackbarOpen(true);
        }
        setButtonLoading(false);
      })
      .catch((e) => {
        debugger;
        setSnackbarMessage(communication.NetworkError);
        setSnackbarType("error");
        setIsSnackbarOpen(true);
        setButtonLoading(false);
      });
  };

  const handleCancelClick = () => {
    setDisplay("Yes");
    setButtonLoading(false);
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
      //  setUnitsOfSalesID(0);
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

  //#endregion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Service Product</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h4">Add/Edit Service Product</Typography>
              <Button variant="contained" startIcon={<AddIcon sx={{ marginRight: 1 }} />} onClick={() => navigate("/master/addserviceproduct")}>
                View List
              </Button>
            </Stack>
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
                    <MenuItem key={index} value={item.unitName}>
                      {item.unitName}
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
                {unitList.length > 0 && showauos ? "1 " + unitsOfSalesConverted + " =" : ""}
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
        </Grid>
      </Container>
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ServiceProductPage;

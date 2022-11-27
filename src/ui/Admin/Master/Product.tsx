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
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { Theme, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { productColumns } from "../../../utils/tablecolumns";
import Provider from "../../../api/Provider";
import { ActivityRoleNameModel, CategoryModel, ProductModel, ServiceNameModel, UnitOfSalesModel } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { communication } from "../../../utils/communication";
import { LoadingButton } from "@mui/lab";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { APIConverter } from "../../../utils/apiconverter";

const ProductPage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [pID, setPID] = React.useState<number>(0);

  const [arn, setArn] = React.useState("--Select--");
  const [arnID, setArnID] = React.useState<number>(0);
  const [activitynameError, setactivitynameError] = useState("");
  const [isActivitynameError, setIsActivitynameError] = useState(false);

  const [sn, setSn] = React.useState("--Select--");
  const [snID, setSnID] = React.useState<number>(0);
  const [servicenameError, setServicenameError] = useState("");
  const [isServicenameError, setIsServicenameError] = useState(false);

  const [cn, setCn] = React.useState("--Select--");
  const [cnID, setCnID] = React.useState<number>(0);
  const [categorynameError, setCategorynameError] = useState("");
  const [isCategorynameError, setIsCategorynameError] = useState(false);

  const [productName, setProductName] = React.useState("");
  const [productError, setProductError] = useState("");
  const [isProductError, setIsProductError] = useState(false);

  const [hsn, setHsn] = React.useState("");
  const [gst, setGst] = React.useState("");

  const [unitsOfSales, setUnitsOfSales] = React.useState<string>("");
  const [unitsOfSalesID, setUnitsOfSalesID] = React.useState<number>(0);
  const [unitError, setUnitError] = React.useState<boolean>(false);
  const [unitErrorText, setUnitErrorText] = React.useState<string>("");

  const [display, setDisplay] = React.useState("Yes");
  const [activityNamesList, setActivityNamesList] = useState<Array<ActivityRoleNameModel>>([]);
  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);
  const [unitOfSalesList, setUnitOfSalesList] = useState<Array<UnitOfSalesModel>>([]);
  const [categoryList, setCategoryList] = useState<Array<CategoryModel>>([]);
  const [productList, setProductList] = useState<Array<ProductModel>>([]);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [actionStatus, setActionStatus] = React.useState<string>("new");

  const [productListTemp, setProductListTemp] = useState<Array<ProductModel>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const theme = useTheme();
  //#endregion

  //#region Functions
  const FetchActvityRoles = () => {
    Provider.createDFAdmin(Provider.API_URLS.ActivityRoleForProduct)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            // response.data.data = response.data.data.filter((el: any) => {
            //   return el.display;
            // });
            setActivityNamesList(response.data.data);
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

    Provider.createDFAdmin(Provider.API_URLS.ServiceForProduct, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            // response.data.data = response.data.data.filter((el: any) => {
            //   return el.display;
            // });
            setServiceNameList(response.data.data);
            if (callback) {
              callback(response.data.data);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchCategoriesFromServices = (activityID: number, selectedItem: number, callbackFunction: any = null) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: activityID,
        service_refno: selectedItem,
      },
    };

    Provider.createDFAdmin(Provider.API_URLS.CategoryForProduct, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            // response.data.data = response.data.data.filter((el: any) => {
            //   return el.display;
            // });
            setCategoryList(response.data.data);
            if (callbackFunction) {
              callbackFunction(response.data.data);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchUnitsFromCategory = (selectedItem: number, callback = null) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        category_refno: selectedItem,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.UnitNameForProduct, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            // response.data.data = response.data.data.filter((el: any) => {
            //   return el.display;
            // });
            setUnitOfSalesList(response.data.data);
            if (callback) {
              callback(response.data.data);
            }
          }
        }
      })
      .catch((e) => {});
  };

  useEffect(() => {
    GetProductData("");
    FetchActvityRoles();
  }, []);

  const GetProductData = (type: string) => {
    handleCancelClick();
    if (type !== "") {
      setSnackbarMessage("Product " + type);
      setIsSnackbarOpen(true);
      setSnackbarType("success");
    }
    let params = {
      data: {
        Sess_UserRefno: "2",
        product_refno: "all",
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ProductFromRefNo, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display === "1" ? "Yes" : "No";
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
          setIsSnackbarOpen(true);
          setSnackbarMessage(communication.NoData);
          setSnackbarType("info");
        }
        setLoading(false);
      })
      .catch((e: Error) => {
        setLoading(false);
        setIsSnackbarOpen(true);
        setSnackbarMessage(communication.NetworkError);
        setSnackbarType("error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleARNChange = (event: SelectChangeEvent) => {
    let activityName: string = event.target.value;
    let ac = activityNamesList.find((el) => el.activityRoleName === activityName);
    if (ac !== undefined) {
      setArn(activityName);
      setArnID(ac.id);
      SetResetActivityName(false);
      SetResetServiceName(true);
      SetResetCategoryName(true);
      SetResetUnitName(true);
      // SetResetProductName(true);
      setGst("");
      setHsn("");
      FetchServicesFromActivity(ac.id);
    }
  };

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: string = event.target.value;
    let ac = serviceNameList.find((el) => el.serviceName === serviceName);
    if (ac !== undefined) {
      setSn(event.target.value as string);
      setSnID(ac.id);
      SetResetServiceName(false);
      SetResetCategoryName(true);
      SetResetUnitName(true);
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
      SetResetUnitName(true);
      // setGst(parseFloat(ac.gstRate).toFixed(2) + "%");
      // setHsn(ac.hsnsacCode);
      FetchCategoryDataFromCategory(ac.id);
      FetchUnitsFromCategory(ac.id);
    }
  };

  const handleUnitChange = (event: SelectChangeEvent<typeof unitsOfSales>) => {
    let unitName: string = event.target.value;
    let ac = unitOfSalesList.find((el) => el.displayUnit === unitName);
    if (ac !== undefined) {
      setUnitsOfSales(event.target.value as string);
      setUnitsOfSalesID(ac.id);
      SetResetUnitName(false);
    }
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    let isValid: boolean = true;
    if (arn === "--Select--") {
      isValid = false;
      setIsActivitynameError(true);
      setactivitynameError(communication.SelectActivityName);
    }

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

    if (productName.trim() === "") {
      isValid = false;
      setIsProductError(true);
      setProductError(communication.BlankProductName);
    }

    if (unitsOfSales === "--Select--") {
      isValid = false;
      setUnitError(true);
      setUnitErrorText(communication.SelectUnitName);
    }

    if (isValid) {
      setButtonLoading(true);
      if (actionStatus === "new") {
        InsertData();
      } else if (actionStatus === "edit") {
        UpdateData();
      }
    }
  };

  const InsertData = () => {
    const params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: arnID,
        service_refno: snID,
        category_refno: cnID,
        unitcategoryrefno_unitrefno: unitsOfSalesID,
        product_name: productName,
        view_status: display === "Yes" ? 1 : 0,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ProductNameCreate, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          GetProductData("added");
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
        setSnackbarMessage(communication.NetworkError);
        setSnackbarType("error");
        setIsSnackbarOpen(true);
        setButtonLoading(false);
      });
  };

  const UpdateData = () => {
    const params = {
      data: {
        Sess_UserRefno: "2",
        product_refno: pID,
        group_refno: arnID,
        service_refno: snID,
        category_refno: cnID,
        unitcategoryrefno_unitrefno: unitsOfSalesID,
        product_name: productName,
        view_status: display === "Yes" ? 1 : 0,
      },
    };

    Provider.createDFAdmin(Provider.API_URLS.ProductNameUpdate, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          GetProductData("updated");
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
        setButtonLoading(false);
        setSnackbarMessage(communication.NetworkError);
        setSnackbarType("error");
        setIsSnackbarOpen(true);
      });
  };

  const handleCancelClick = () => {
    setDisplay("Yes");

    SetResetActivityName(true);

    SetResetServiceName(true);

    SetResetCategoryName(true);

    SetResetProductName(true);

    SetResetUnitName(true);

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

      let acid = activityNamesList.find((el) => {
        return el.activityRoleName === a?.activityRoleName;
      }).id;

      setArn(a?.activityRoleName);
      setArnID(acid);
      SetResetActivityName(false);

      FetchServicesFromActivity(acid, (list) => {
        let srid = list.find((el: any) => {
          return el.serviceName === a?.serviceName;
        }).id;
        setSnID(srid);

        FetchCategoriesFromServices(acid, srid, (acategoryList: any) => {
          let ca: CategoryModel | undefined = acategoryList.find((el: any) => el.categoryName === a?.categoryName);
          if (ca !== undefined) {
            setCnID(ca.id);
            FetchCategoryDataFromCategory(ca.id);
            FetchUnitsFromCategory(ca.id, (list) => {
              let unit: UnitOfSalesModel | undefined = list.find((el: any) => el.unitName === a?.unitName);
              setUnitsOfSalesID(unit.id);
            });
          }
        });
      });

      setSn(a?.serviceName);
      SetResetServiceName(false);

      setCn(a?.categoryName);
      // setCnID(a?.categoryID);

      SetResetCategoryName(false);
 
      setProductName(a?.productName);
      SetResetProductName(false);

      setUnitsOfSales(a?.unitName);
      //setUnitsOfSalesID(a?.unitOfSalesID);
      SetResetUnitName(false);

      setDisplay(a?.display);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
    //  else if (type?.toLowerCase() === "delete") {
    // }
  };

  const SetResetActivityName = (isBlank: boolean) => {
    if (isBlank) {
      setArn("--Select--");
      setArnID(0);
    }
    setactivitynameError("");
    setIsActivitynameError(false);
  };

  const SetResetServiceName = (isBlank: boolean) => {
    if (isBlank) {
      setSn("--Select--");
      setServiceNameList([]);
      setSnID(0);
    }
    setServicenameError("");
    setIsServicenameError(false);
  };

  const SetResetCategoryName = (isBlank: boolean) => {
    if (isBlank) {
      setCn("--Select--");
      setCategoryList([]);
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
      setUnitOfSalesList([]);
      setUnitsOfSalesID(0);
    }
    setUnitError(false);
    setUnitErrorText("");
  };

  const SetResetProductName = (isBlank: boolean) => {
    if (isBlank) {
      setProductName("");
    }
    setProductError("");
    setIsProductError(false);
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setProductListTemp(productList);
    } else {
      setProductListTemp(
        productList.filter((el: ProductModel) => {
          return el.productName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };
  //#endregion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Product List</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Add/Edit Product</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={isActivitynameError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Activity Role Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={arn} onChange={handleARNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {activityNamesList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.activityRoleName}>
                      {item.activityRoleName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{activitynameError}</FormHelperText>
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
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Product Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Product Name"
              variant="outlined"
              size="small"
              error={isProductError}
              helperText={productError}
              value={productName}
              onChange={(e) => {
                setProductName((e.target as HTMLInputElement).value);
                setIsProductError(false);
                setProductError("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" sx={{ paddingRight: { xs: 0, sm: 4 } }} error={unitError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Unit of Sales</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={unitsOfSales} onChange={handleUnitChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {unitOfSalesList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.displayUnit}>
                      {item.displayUnit}
                    </MenuItem>
                  );
                })}
              </Select>

              <FormHelperText>{unitErrorText}</FormHelperText>
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
          <Grid item xs={4} sm={5} md={8}>
            <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} style={{ display: buttonDisplay }} onClick={handleCancelClick}>
              Cancel
            </Button>
            <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
              Submit
            </LoadingButton>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Product List</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {productList.length === 0 ? (
                  <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        value={searchQuery}
                        size="small"
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
                    <DataGrid
                      style={{
                        opacity: dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      autoHeight={true}
                      rows={productListTemp}
                      columns={productColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...productList];
                        let a: ProductModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        handelEditAndDelete((e.target as any).textContent, a);
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
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductPage;

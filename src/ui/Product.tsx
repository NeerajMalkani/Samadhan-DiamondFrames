import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
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
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { productColumns } from "../utils/tablecolumns";
import DataContext from "../contexts/DataContexts";
import Provider from "../api/Provider";
import { CategoryModel, ProductModel } from "../models/Model";
import { useCookies } from "react-cookie";
import { communication } from "../utils/communication";
import { LoadingButton } from "@mui/lab";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 },
  },
};

function getStyles(name: string, unitSales: readonly string[], theme: Theme) {
  return {
    fontWeight:
      unitSales.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ProductPage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/Samadhan-DiamondFrames/login`);
  }, []);

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
  const [activityNamesList, setActivityNamesList] =
    React.useContext(DataContext).activityNamesList;
  const [serviceNameList, setServiceNameList] =
    React.useContext(DataContext).serviceNameList;
  const [unitOfSalesList, setUnitOfSalesList] =
    React.useContext(DataContext).unitOfSalesList;
  const [categoryList, setCategoryList] =
    React.useContext(DataContext).categoryList;
  const [productList, setProductList] =
    React.useContext(DataContext).productList;
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">(
    "auto"
  );
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [actionStatus, setActionStatus] = React.useState<string>("new");


  const [productListTemp, setProductListTemp] = useState<Array<ProductModel>>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();

  const FetchActvityRoles = () => {
    Provider.getAll("master/getmainactivities")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el: any) => {
              return el.display;
            });
            setActivityNamesList(response.data.data);
          }
        }
      })
      .catch((e) => { });
  };

  const FetchServicesFromActivity = (selectedID: number) => {
    let params = {
      ID: selectedID,
    };

    Provider.getAll(
      `master/getservicesbyroleid?${new URLSearchParams(
        GetStringifyJson(params)
      )}`
    )
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
      .catch((e) => { });
  };

  const FetchCategoriesFromServices = (
    selectedItem: number,
    callbackFunction: any = null
  ) => {
    let params = {
      ID: selectedItem,
    };
    Provider.getAll(
      `master/getcategoriesbyserviceid?${new URLSearchParams(
        GetStringifyJson(params)
      )}`
    )
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
      .catch((e) => { });
  };

  const FetchUnitsFromCategory = (selectedItem: number) => {
    let params = {
      ID: selectedItem,
    };
    Provider.getAll(
      `master/getunitbycategoryid?${new URLSearchParams(
        GetStringifyJson(params)
      )}`
    )
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el: any) => {
              return el.display;
            });
            setUnitOfSalesList(response.data.data);
          }
        }
      })
      .catch((e) => { });
  };

  useEffect(() => {
    GetProductData();
    FetchActvityRoles();
  }, []);

  const GetProductData = () => {
    handleCancelClick();
    Provider.getAll("master/getproducts")
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
            setProductList(response.data.data);
            setProductListTemp(response.data.data);
          }
        } else {
          setIsSnackbarOpen(true);
          setSnackbarMessage(communication.NoData);
        }
        setLoading(false);
      })
      .catch((e: Error) => {
        setLoading(false);
        setIsSnackbarOpen(true);
        setSnackbarMessage(communication.NetworkError);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleARNChange = (event: SelectChangeEvent) => {
    let activityName: string = event.target.value;
    let ac = activityNamesList.find(
      (el) => el.activityRoleName === activityName
    );
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
      FetchCategoriesFromServices(ac.id);
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
      FetchUnitsFromCategory(ac.id);
    }
  };

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
    Provider.create("master/insertproduct", {
      ProductName: productName,
      ActivityID: arnID,
      ServiceID: snID,
      CategoryID: cnID,
      UnitOfSalesID: unitsOfSalesID,
      Display: display === "Yes",
    })
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          GetProductData();
        } else {
          setSnackbarMessage(communication.NetworkError);
          setIsSnackbarOpen(true);
        }
        setButtonLoading(false);
      })
      .catch((e) => {
        setSnackbarMessage(communication.NetworkError);
        setIsSnackbarOpen(true);
        setButtonLoading(false);
      });
  };

  const UpdateData = () => {
    Provider.create("master/updateproduct", {
      ProductID: pID,
      ProductName: productName,
      ActivityID: arnID,
      ServiceID: snID,
      CategoryID: cnID,
      UnitOfSalesID: unitsOfSalesID,
      Display: display === "Yes",
    })
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          GetProductData();
        } else {
          setSnackbarMessage(communication.NetworkError);
          setIsSnackbarOpen(true);
        }
        setButtonLoading(false);
      })
      .catch((e) => {
        setButtonLoading(false);
        setSnackbarMessage(communication.NetworkError);
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

  const handelEditAndDelete = (
    type: string | null,
    a: ProductModel | undefined
  ) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);

      setPID(a.productID);

      setArn(a?.activityRoleName);
      setArnID(a?.activityID);
      SetResetActivityName(false);

      setSn(a?.serviceName);
      setSnID(a?.serviceID);
      SetResetServiceName(false);
      FetchServicesFromActivity(a?.activityID);

      setCn(a?.categoryName);
      setCnID(a?.categoryID);

      SetResetCategoryName(false);
      FetchCategoriesFromServices(a?.serviceID, (acategoryList: any) => {
        let ca: CategoryModel | undefined = acategoryList.find(
          (el: any) => el.id === a?.categoryID
        );
        if (ca !== undefined) {
          setHsn(ca.hsnsacCode);
          setGst(ca.gstRate + "%");
        }
      });

      setProductName(a?.productName);
      SetResetProductName(false);

      setUnitsOfSales(a?.unitName);
      setUnitsOfSalesID(a?.unitOfSalesID);
      SetResetUnitName(false);
      FetchUnitsFromCategory(a?.categoryID);

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
      setProductName("");
    }
    setProductError("");
    setIsProductError(false);
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
            <Typography variant="h4">Product</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Add Product</Typography>
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
            <FormControl
              fullWidth
              size="small"
              sx={{ paddingRight: { xs: 0, sm: 4 } }}
              error={unitError}
            >
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
                    <MenuItem key={index} value={item.unitName}>
                      {item.unitName}
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
                {productList.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search Product name"
                        variant="outlined"
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
                      rows={productListTemp}
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
                  </>
                )}

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

export default ProductPage;

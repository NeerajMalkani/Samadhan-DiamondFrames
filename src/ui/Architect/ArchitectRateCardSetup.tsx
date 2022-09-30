import { LoadingButton } from "@mui/lab";
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
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../../api/Provider";
import Header from "../../components/Header";
import NoData from "../../components/NoData";
import { ActivityRoleNameModel, CategoryModel, ProductModel, ServiceNameModel, UnitOfSalesModel } from "../../models/Model";
import { communication } from "../../utils/communication";
import { architechRateCArdSetupColumns } from "../../utils/tablecolumns";
import { ValidateGSTRate } from "../../utils/validations";
import ListIcon from "@mui/icons-material/List";

function getStyles(name: string, unitSales: readonly string[], theme: Theme) {
  return {
    fontWeight: unitSales.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const ArchitectRateCardSetup = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  const theme = useTheme();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //const [pID, setPID] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [arn, setArn] = useState("");
  const [arnID, setArnID] = useState<number>(0);

  const [pn, setPn] = useState("--Select--");
  const [pnID, setPnID] = useState(0);
  const [productError, setProductError] = useState("");
  const [isProductError, setIsProductError] = useState(false);



  const [activityNamesList, setActivityNamesList] = useState<Array<ActivityRoleNameModel>>([]); // useContext(DataContext).activityNamesList;
  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]); // useContext(DataContext).serviceNameList;
  const [unitOfSalesList, setUnitOfSalesList] = useState<Array<UnitOfSalesModel>>([]); //useContext(DataContext).unitOfSalesList;
  const [unitList, setUnitList] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState<Array<CategoryModel>>([]); //useContext(DataContext).categoryList;
  const [productList, setProductList] = useState<Array<ProductModel>>([]); // useContext(DataContext).productList;
  const [serviceProductList, setServiceProductList] = useState<Array<ProductModel>>([]);
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

  const [categoryListFilter, setCategoryListFilter] = useState<Array<CategoryModel>>([]); // useContext(DataContext).categoryList;
  const [snFilter, setSnFilter] = useState("--Select--");

  const [cnFilter, setCnFilter] = useState("--Select--");
  const [searchQuery, setSearchQuery] = useState("");

 
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const FetchData = (type: string) => {
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
            
            setServiceProductList(arrList);
            setProductListTemp(arrList);
            if (type !== "") {
              setSnackbarMessage("Service product " + type);
              setIsSnackbarOpen(true);
              setSnackbarType("success");
            }
          }
        } else {
          setSnackbarMessage(communication.NoData);
          setIsSnackbarOpen(true);
          setSnackbarType("info");
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarMessage(e.message);
        setSnackbarType("error");
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
    FetchData("");
    FetchActvityRoles();
  }, []);

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

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
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
    setProductListTemp(serviceProductList);
    let ArrOfData: any = [];

    if (snText === "--Select--" && cnText === "--Select--" && searcText === "") {
      ArrOfData = serviceProductList;
    }

    if (snText !== "--Select--") {
      ArrOfData = serviceProductList.filter((el: ProductModel) => {
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
        ArrOfData = serviceProductList.filter((el: ProductModel) => {
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
            <Typography variant="h4">Architect Rate Card Setup</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Service Product (Search & Filter)</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1, borderWidth: 1, borderColor: theme.palette.divider }}>
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
                          placeholder="Search"
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
                      <Button
                        // sx={{ mt: 0.5 }}
                        variant="text"
                        onClick={() => {
                          setSnFilter("--Select--");
                          setCategoryListFilter([]);
                          setCnFilter("--Select--");
                          setSearchQuery("");
                          SetFilters("--Select--", "--Select--", "");
                        }}
                      >
                        Clear
                      </Button>
                    </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Service Product List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {serviceProductList.length === 0 ? (
                  <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <DataGrid
                      style={{
                        opacity: dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      autoHeight={true}
                      getRowHeight={() => "auto"}
                      rows={productListTemp}
                      columns={architechRateCArdSetupColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...serviceProductList];
                        let a: ProductModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        if (a) {
                          const clickType = (e.target as any).textContent;

                        //   if (clickType.toLowerCase() === "edit") handelEditAndDelete(clickType, a);

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
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
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

export default ArchitectRateCardSetup;

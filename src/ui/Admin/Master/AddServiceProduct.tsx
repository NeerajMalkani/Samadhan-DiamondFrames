import { Alert, AlertColor, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../../../api/Provider";
import Header from "../../../components/Header";
import NoData from "../../../components/NoData";
import { ActivityRoleNameModel, CategoryModel, ProductModel, ServiceNameModel, UnitModel, UnitOfSalesModel, UnitWithConversionModel } from "../../../models/Model";
import { communication } from "../../../utils/communication";
import { serviceProductColumns } from "../../../utils/tablecolumns";
import ListIcon from "@mui/icons-material/List";
import { APIConverter } from "../../../utils/apiconverter";

const AddServiceProduct = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  const theme = useTheme();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables
  const [loading, setLoading] = useState(true);
  const [serviceProductList, setServiceProductList] = useState<Array<ProductModel>>([]);
  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);
  const [snFilter, setSnFilter] = useState("--Select--");
  const [cnFilter, setCnFilter] = useState("--Select--");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryListFilter, setCategoryListFilter] = useState<Array<CategoryModel>>([]);
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [productListTemp, setProductListTemp] = useState<Array<ProductModel>>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [dialogText, setDialogText] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState<string>("");
  const [arnID, setArnID] = useState<number>(0);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const [activityNamesList, setActivityNamesList] = useState<Array<ActivityRoleNameModel>>([]);
  const [arn, setArn] = useState("");

  //#endredgion

  //#region Functions

  useEffect(() => {
    FetchData("");
    FetchActvityRoles();
  }, []);

  const FetchData = (type: string) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        service_product_refno: "all",
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
              //let id = { id: index + 1 };
              a = Object.assign(a, sr);
             // a = Object.assign(a, id);
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
    Provider.createDFAdmin(Provider.API_URLS.ActivityRoleServiceProduct)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
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
          }
        }
      })
      .catch((e) => {});
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

  const FetchCategoriesFromServicesFilter = (selectedActivityID: number, selectedServiceID: number) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno:selectedActivityID,
        service_refno: selectedServiceID,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.CategoryNameServiceProduct, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setCategoryListFilter(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };


  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    SetFilters(snFilter, cnFilter, query);
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

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const handleEditAndDelete = (type: string | null, a: ProductModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  //#endredgion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Service Product List
          </Typography>
        </Grid>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
                    <DataGrid
                      style={{
                        opacity: dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      autoHeight={true}
                      getRowHeight={() => "auto"}
                      rows={productListTemp}
                      columns={serviceProductColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...serviceProductList];
                        let a: ProductModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        if (a) {
                          const clickType = (e.target as any).textContent;

                          if (clickType.toLowerCase() === "edit") handleEditAndDelete(clickType, a);

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

export default AddServiceProduct;

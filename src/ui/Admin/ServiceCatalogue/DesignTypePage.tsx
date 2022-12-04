import { LoadingButton } from "@mui/lab";
import { Alert, AlertColor, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../../../api/Provider";
import Header from "../../../components/Header";
import NoData from "../../../components/NoData";
import { CategoryModel, DesignTypeModel, productModel, ProductModel, ServiceNameModel } from "../../../models/Model";
import { communication } from "../../../utils/communication";
import { designTypeColumns } from "../../../utils/tablecolumns";
import ListIcon from "@mui/icons-material/List";
import uuid from "react-uuid";
import { UploadImageToS3WithNativeSdk } from "../../../utils/AWSFileUpload";
import { APIConverter } from "../../../utils/apiconverter";
import FormData from "form-data";

const DesignTypePage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  const theme = useTheme();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [arnID, setArnID] = useState<number>(0);

  const [dtID, setdtID] = useState<number>(0);

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

  const [display, setDisplay] = useState("Yes");

  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);
  const [categoryList, setCategoryList] = useState<Array<CategoryModel>>([]);
  const [productList, setProductList] = useState<Array<ProductModel>>([]);
  const [designTypeList, setDesignTypeListList] = useState<Array<DesignTypeModel>>([]);
  const [designTypeListTemp, setDesignTypeListTemp] = useState<Array<DesignTypeModel>>([]);

  const [pageSize, setPageSize] = useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const [isDesignTypeError, setIsDesignTypeError] = useState(false);
  const [designTypeError, setDesignTypeError] = useState<string>("");
  const [designTypeName, setDesignTypeName] = useState<string>("");

  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadFileUpload, setUploadFileUpload] = useState<any>();
  const [designButtonText, setDesignButtonText] = useState("Upload Design");
  const [errorDI, setDIError] = useState(false);
  const [errorDIText, setDIErrorText] = useState("");
  //#endregion

  //#region Functions
  useEffect(() => {
    FetchData("");
    FetchActvityRoles();
  }, []);

  const FetchData = (type: string) => {
    if (type !== "") {
      setSnackbarMessage("Design Type " + type);
      setIsSnackbarOpen(true);
      setSnackbarType("success");
    }

    let params = {
      data: {
        Sess_UserRefno: "2",
        designtype_refno: "all",
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.DesignTypeRefNoCheck, params)
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
            setDesignTypeListList(arrList);
            setDesignTypeListTemp(arrList);
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
    Provider.createDFAdmin(Provider.API_URLS.ActivityRolesDesignType)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            // response.data.data = response.data.data.filter((el: any) => {
            //   return el.display && el.activityRoleName === "Contractor";
            // });
            setArnID(response.data.data[0].id);
            FetchServicesFromActivity(response.data.data[0].id);
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
    Provider.createDFAdmin(Provider.API_URLS.ServiceNameDesignType, params)
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

  const FetchCategoriesFromServices = (selectedActivityID: number, selectedServiceID: number, callback = null) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: selectedActivityID,
        service_refno: selectedServiceID,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.CategoryNameDesignType, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
           
            setCategoryList(response.data.data);
            if (callback) {
              callback(response.data.data);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchProductsFromCategory = (selectedActivityID: number, selectedCategoryID: number, callback = null) => {
   
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: selectedActivityID,
        category_refno: selectedCategoryID,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ProductNameDesignType, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
           
            setProductList(response.data.data);
            if (callback) {
              callback(response.data.data);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: string = event.target.value;
    let ac = serviceNameList.find((el) => el.serviceName === serviceName);
    if (ac !== undefined) {
      setSn(event.target.value as string);
      setSnID(ac.id);
      SetResetServiceName(false);
      SetResetCategoryName(true);
      SetResetProductName(true);
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
    }
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

    if (pn.trim() === "--Select--") {
      isValid = false;
      setIsProductError(true);
      setProductError(communication.SelectProductName);
    }

    if (designTypeName.trim() === "") {
      isValid = false;
      setIsDesignTypeError(true);
      setDesignTypeError(communication.BlankDesignType);
    }

    if (uploadedImage.trim() === "") {
      isValid = false;
      setDIError(true);
      setDIErrorText(communication.SelectImage);
    }

    if (isValid) {
      // if (uploadFileUpload !== null) {
      //   uploadImage();
      // } else {
      UpdateData("Success");
      //}
    }
  };

  const uploadImage = () => {
    let imageName: string = uuid();
    let fileExtension = uploadedImage.split(".").pop();
    setUploadedImage(imageName + "." + fileExtension);
    UploadImageToS3WithNativeSdk(uploadFileUpload, imageName + "." + fileExtension, UpdateData);
  };

  const UpdateData = (Status: string) => {
    if (Status.toLowerCase() === "success") {
      setButtonLoading(true);
      const datas=new FormData();
      if (actionStatus === "new") {
        const params = {
            Sess_UserRefno: "2",
            designtype_name: designTypeName,
            group_refno: arnID,
            service_refno: snID,
            category_refno: cnID,
            product_refno: pnID,
            view_status: display === "Yes" ? 1 : 0,
        };

        datas.append("data", JSON.stringify(params));
        datas.append("designtype_image", uploadFileUpload[0]);

        Provider.createDFAdminWithHeader(Provider.API_URLS.DesignTypeCreate, datas)
          .then((response: any) => {
            if (response.data && response.data.code === 200) {
              FetchData("added");
              handleCancelClick();
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
      } else if (actionStatus === "edit") {
        const params = {
            Sess_UserRefno: "2",
            designtype_refno: dtID,
            designtype_name: designTypeName,
            group_refno: arnID,
            service_refno: snID,
            category_refno: cnID,
            product_refno: pnID,
            view_status: display === "Yes" ? 1 : 0,
        };

        datas.append("data", JSON.stringify(params));
        datas.append("designtype_image", uploadFileUpload ? uploadFileUpload[0] : "");

        Provider.createDFAdminWithHeader(Provider.API_URLS.DesignTypeUpdate, datas)
          .then((response: any) => {
            if (response.data && response.data.code === 200) {
              FetchData("updated");
              handleCancelClick();
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
      }
    } else {
      setSnackbarMessage(communication.Error);
      setSnackbarType("error");
      setIsSnackbarOpen(true);
      setButtonLoading(false);
    }
  };

  const handleCancelClick = () => {
    setDisplay("Yes");
    setButtonLoading(false);

    SetResetServiceName(true);

    SetResetCategoryName(true);
    setCategoryList([]);

    SetResetProductName(true);
    setProductList([]);

    setDesignTypeError("");
    setIsDesignTypeError(false);
    setDesignTypeName("");

    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setActionStatus("new");

    setDesignButtonText("Upload Design");
    setUploadedImage("");
    setUploadFileUpload(null);
  };

  const handelEditAndDelete = (type: string | null, a: DesignTypeModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setdtID(a.id);
      setSn(a?.serviceName);
      FetchServicesFromActivity(arnID, (list) => {
        let srid = list.find((el: any) => {
          return el.serviceName === a?.serviceName;
        }).id;
        setSnID(srid);

        FetchCategoriesFromServices(arnID, srid, (categoryList: any) => {
          let ca: CategoryModel | undefined = categoryList.find((el: any) => el.categoryName === a?.categoryName);
          if (ca !== undefined) {
            setCnID(ca.id);
            FetchProductsFromCategory(arnID, ca.id, (productList) => {
              let pa: ProductModel | undefined = productList.find((el: any) => el.productName === a?.productName);
              if (pa !== undefined) setPnID(pa?.productID);
            });
          }
        });
      });

      //setSnID(a?.serviceID);
      SetResetServiceName(false);

      setCn(a?.categoryName);
      // setCnID(a?.categoryID);

      SetResetCategoryName(false);
      //  FetchCategoriesFromServices(arnID, a?.serviceID);

      setPn(a?.productName);
      SetResetProductName(false);

      setDesignTypeName(a.designTypeName);

      setDisplay(a?.display);
      setButtonDisplay("unset");
      setActionStatus("edit");
      setUploadedImage(a.designImage.split("/").pop());
      setDIError(false);
      setDIErrorText(a.designImage.split("/").pop());
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
    }
    setCategorynameError("");
    setIsCategorynameError(false);
  };

  const SetResetProductName = (isBlank: boolean) => {
    if (isBlank) {
      setPn("--Select--");
      setPnID(0);
    }
    setProductError("");
    setIsProductError(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setDesignTypeListTemp(designTypeList);
    } else {
      setDesignTypeListTemp(
        designTypeList.filter((el: DesignTypeModel) => {
          return el.designTypeName.toString().toLowerCase().includes(query.toLowerCase());
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
            <Typography variant="h4">Design Type</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Add/Edit Design Type</Typography>
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
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
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

          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
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
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Design Type Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Design Type Name"
              variant="outlined"
              size="small"
              error={isDesignTypeError}
              helperText={designTypeError}
              value={designTypeName}
              onChange={(e) => {
                setDesignTypeName((e.target as HTMLInputElement).value);
                setIsDesignTypeError(false);
                setDesignTypeError("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b> Upload Design</b>
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
                        let FileName = e.currentTarget.files[0].name;
                           setUploadFileUpload(e.currentTarget.files);
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
                {/* <img alt="" src={image} style={{ width: "48px", height: "36px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "4px" }} /> */}
              </Grid>
              <FormHelperText>{errorDIText}</FormHelperText>
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
            <Typography variant="h6">Design Type Product List</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%" }}>
                {designTypeList.length === 0 ? (
                  <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <Grid item xs={4} sm={4} md={4} sx={{ mr: 1 }}>
                        <TextField
                          fullWidth
                          placeholder="Search"
                          variant="outlined"
                          size="small"
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
                      rows={designTypeListTemp}
                      columns={designTypeColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...designTypeList];
                        let a: DesignTypeModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DesignTypePage;

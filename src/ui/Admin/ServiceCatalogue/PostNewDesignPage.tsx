import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { Alert, AlertColor, Button, CircularProgress, Container, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { CategoryModel, DesignTypeModel, PostNewDesignModel, ProductDetailsModel, productModel, ProductModel, ServiceNameModel, WorkLocationNameModel } from "../../../models/Model";
import { postNewDesignColumns } from "../../../utils/tablecolumns";
import { communication } from "../../../utils/communication";
import { AWSImagePath } from "../../../utils/paths";
import Provider from "../../../api/Provider";
import { ValidateGSTRate } from "../../../utils/validations";
import uuid from "react-uuid";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { UploadImageToS3WithNativeSdk } from "../../../utils/AWSFileUpload";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { APIConverter } from "../../../utils/apiconverter";

const PostNewDesignPage = () => {
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

  const [pdt, setPdt] = useState("--Select--");
  const [pdtID, setPdtID] = useState(0);
  const [productDesignTypeError, setProductDesignTypeError] = useState("");
  const [isProductDesignTypeError, setIsProductDesignTypeError] = useState(false);

  const [wl, setWl] = useState("--Select--");
  const [wlID, setWlID] = useState(0);
  const [workLocationError, setWorkLocationError] = useState("");
  const [isWorkLocationError, setIsWorkLocationError] = useState(false);

  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);
  const [categoryList, setCategoryList] = useState<Array<CategoryModel>>([]);
  const [productList, setProductList] = useState<Array<ProductModel>>([]);
  const [productDesignTypeList, setProductDesignTypeList] = useState<Array<DesignTypeModel>>([]);
  const [workLocationList, setWorkLocationList] = useState<Array<WorkLocationNameModel>>([]);
  const [postNewDesign, setPostNewDesign] = useState<Array<PostNewDesignModel>>([]);
  const [postNewDesignTemp, setPostNewDesignTemp] = useState<Array<PostNewDesignModel>>([]);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const [designNo, setDesignNo] = useState("");
  const [designNoError, setDesignNoError] = useState<boolean>(false);
  const [designNoErrorText, setDesignNoErrorText] = useState<string>("");

  const [labourCost, setLabourCost] = useState("");
  const [labourCostError, setLabourCostError] = useState<boolean>(false);
  const [labourCostTextError, setLabourCostTextError] = useState<string>("");
  //
  const [pageSize, setPageSize] = useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [display, setDisplay] = useState("Yes");

  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadFileUpload, setUploadFileUpload] = useState<any>();
  const [errorDI, setDIError] = useState(false);
  const [errorDIText, setDIErrorText] = useState("");
  const [designButtonText, setDesignButtonText] = useState("Upload Design");
  const [selectedID, setSelectedID] = useState<number>(0);
  //#endregion

  //#region Functions
  useEffect(() => {
    FetchData("");
    FetchActvityRoles();
    FetchWorkLocation();
    FetchDesignNumber();
  }, []);

  const FetchDesignNumber = () => {
    Provider.createDFAdmin(Provider.API_URLS.AutoDesignNoNewDesign)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setDesignNo("DC-" + response.data.data[0].autoincrement_design_no.toString().padStart(4, "0"));
          }
        }
      })
      .catch((e) => {});
  };

  const FetchData = (type: string) => {
    handleCancelClick();
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
    Provider.createDFAdmin(Provider.API_URLS.DesignGalleryRefNoCheck, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
              return a;
            });
            setPostNewDesign(arrList);
            setPostNewDesignTemp(arrList);
            setDesignNo("DS-" + (arrList.length + 1).toString());
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
    Provider.createDFAdmin(Provider.API_URLS.ActivityRoleNameNewDesign)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
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
    Provider.createDFAdmin(Provider.API_URLS.ServiceNameNewDesign, params)
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
    Provider.createDFAdmin(Provider.API_URLS.CategoryNameNewDesign, params)
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
    Provider.createDFAdmin(Provider.API_URLS.ProductNameNewDesign, params)
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

  const FetchProductDataFromProduct = (selectedItem) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        product_refno: selectedItem,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ProductDataNewDesign, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setLabourCost(response.data.data[0].labourCost);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchDesignTypeFromProductID = (selectedProductID: number,callback = null) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        product_refno: selectedProductID,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ProductDesignTypeNewDesign, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setProductDesignTypeList(response.data.data);
            if (callback) {
              callback(response.data.data);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const FetchWorkLocation = (callback=null) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        worklocation_refno: "all",
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.WorkLocationNameNewDesign, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setWorkLocationList(response.data.data);
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

  const handlePNChange = (event: SelectChangeEvent) => {
    let productName: string = event.target.value;
    let ac = productList.find((el) => el.productName === productName);
    if (ac !== undefined) {
      setPn(event.target.value as string);
      setPnID(ac.productID);
      FetchProductDataFromProduct(ac.productID);
      SetResetProductName(false);
      SetResetProductDesignType(true);
      FetchDesignTypeFromProductID(ac.productID);
    }
  };

  const handlePDTChange = (event: SelectChangeEvent) => {
    let productName: string = event.target.value;
    let ac = productDesignTypeList.find((el) => el.designTypeName === productName);
    if (ac !== undefined) {
      setPdt(event.target.value as string);
      setPdtID(ac.id);
      SetResetProductDesignType(false);
    }
  };

  const handleWLChange = (event: SelectChangeEvent) => {
    let productName: string = event.target.value;
    let ac = workLocationList.find((el) => el.workLocationName === productName);
    if (ac !== undefined) {
      setWl(event.target.value as string);
      setWlID(ac.id);
      SetResetworkLocation(false);
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

  const SetResetProductDesignType = (isBlank: boolean) => {
    if (isBlank) {
      setPdt("--Select--");
      setPdtID(0);
    }
    setProductDesignTypeError("");
    setIsProductDesignTypeError(false);
  };

  const SetResetworkLocation = (isBlank: boolean) => {
    if (isBlank) {
      setWl("--Select--");
      setWlID(0);
    }
    setWorkLocationError("");
    setIsWorkLocationError(false);
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
      setPostNewDesignTemp(postNewDesign);
    } else {
      setPostNewDesignTemp(
        postNewDesign.filter((el: PostNewDesignModel) => {
          return el.designTypeName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
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

    if (pdt.trim() === "--Select--") {
      isValid = false;
      setIsProductDesignTypeError(true);
      setProductDesignTypeError(communication.SelectProductName);
    }
    if (wl.trim() === "--Select--") {
      isValid = false;
      setIsWorkLocationError(true);
      setWorkLocationError(communication.SelectProductName);
    }
    if (designNo.trim() === "") {
      isValid = false;
      setDesignNoError(true);
      setDesignNoErrorText(communication.SelectProductName);
    }

    if (labourCost.toString().trim() === "" || !ValidateGSTRate(labourCost)) {
      isValid = false;
      setLabourCostError(true);
      setLabourCostTextError(communication.SelectProductName);
    }

    if (uploadedImage.trim() === "") {
      isValid = false;
      setDIError(true);
      setDIErrorText(communication.SelectImage);
    }

    if (isValid) {
      setButtonLoading(true);
      // if (uploadFileUpload !== null) {
      //   uploadImage();
      // } else {
        InsertData("Success", uploadedImage);
      //}
    }
  };

  const uploadImage = () => {
    let imageName: string = uuid();
    let fileExtension = uploadedImage.split(".").pop();
    setUploadedImage(imageName + "." + fileExtension);
    UploadImageToS3WithNativeSdk(uploadFileUpload, imageName + "." + fileExtension, InsertData);
  };

  const InsertData = (Status: string, fileName: string) => {
    if (Status.toLowerCase() === "success") {
      if (actionStatus === "new") {
        
        const params = {
          data: {
            Sess_UserRefno: "2",
            group_refno: arnID,
            service_refno: snID,
            category_refno: cnID,
            product_refno:pnID,
            designtype_refno:pdtID,
            worklocation_refno: wlID,
            design_no: parseInt(designNo.split("-")[1]),
            labour_cost: labourCost,
            view_status: display === "Yes" ? 1 : 0
          },
          design_image: uploadFileUpload
        }

        Provider.createDFAdmin(Provider.API_URLS.NewDesignCreate, params)
          .then((response) => {
            if (response.data && response.data.code === 200) {
              FetchData("added");
            } else if (response.data.code === 304) {
              setSnackbarMessage(communication.AlreadyExists);
              setSnackbarType("error");
              setIsSnackbarOpen(true);
              setButtonLoading(false);
            } else {
              setSnackbarMessage(communication.Error);
              setSnackbarType("error");
              setIsSnackbarOpen(true);
              setButtonLoading(false);
            }
          })
          .catch((e) => {
            setSnackbarMessage(communication.NetworkError);
            setSnackbarType("error");
            setIsSnackbarOpen(true);
            setButtonLoading(false);
          });
      } else if (actionStatus === "edit") {
         const params = {
          data: {
            Sess_UserRefno: "2",
            designgallery_refno: selectedID,
            group_refno: arnID,
            service_refno: snID,
            category_refno: cnID,
            product_refno: pnID,
            designtype_refno: pdtID,
            worklocation_refno: wlID,
            design_no: parseInt(designNo.split("-")[1]),
            labour_cost: labourCost,
            view_status: display === "Yes" ? 1 : 0
          },
          design_image:  uploadFileUpload ? uploadFileUpload : "",
        }
        Provider.createDFAdmin(Provider.API_URLS.NewDesignCreate, params)
          .then((response) => {
            if (response.data && response.data.code === 200) {
              FetchData("updated");
            } else if (response.data.code === 304) {
              setSnackbarMessage(communication.AlreadyExists);
              setSnackbarType("error");
              setIsSnackbarOpen(true);
              setButtonLoading(false);
            } else {
              setSnackbarMessage(communication.Error);
              setSnackbarType("error");
              setIsSnackbarOpen(true);
              setButtonLoading(false);
            }
          })
          .catch((e) => {
            console.log(e);
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

    SetResetProductDesignType(true);
    setProductDesignTypeList([]);

    SetResetworkLocation(true);
    setWorkLocationList([]);

    setLabourCost("");
    setLabourCostError(false);
    setLabourCostTextError("");

    setDesignButtonText("Upload Design");
    setUploadedImage("");
    setUploadFileUpload(null);

    setDIError(false);
    setDIErrorText("");

    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setActionStatus("new");
  };

  const handelEditAndDelete = (type: string | null, a: PostNewDesignModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setButtonDisplay("unset");
      setActionStatus("edit");

      setSelectedID(a.id);
      setSn(a.serviceName);
      //setSnID(a.serviceID);
     // setCnID(a.categoryID);
      setCn(a.categoryName);
      setPn(a.productName);
     // setPnID(a.productID);
      setPdt(a.designTypeName);
      //setPdtID(a.designTypeID);
      setDesignNo(a.designNumber);
      setLabourCost(a.labourCost);
      setWl(a.workLocationName);
     // setWlID(a.workLocationID);
      setUploadedImage(a.designImage.split("/").pop());
      setDIError(false);
      setDIErrorText(a.designImage.split("/").pop());

      FetchServicesFromActivity(arnID,(list)=>{
        let srid = list.find((el: any) => {
          return el.serviceName === a?.serviceName;
        }).id;
        setSnID(srid);

        FetchCategoriesFromServices(arnID, srid, (categoryList: any) => {
          let ca: CategoryModel | undefined = categoryList.find((el: any) => el.categoryName === a?.categoryName);
          if (ca !== undefined) {
            setCnID(ca.id);
            FetchProductsFromCategory(arnID, ca.id, (productList) => {
              let pa: productModel | undefined = productList.find((el: any) => el.productName === a?.productName);
              if (pa !== undefined) {setPnID(pa?.id);
                FetchProductDataFromProduct(pa?.id);
                FetchDesignTypeFromProductID(pa?.id, ()=>{
                  let pa1: ProductDetailsModel | undefined = productList.find((el: any) => el.designTypeName === a?.designTypeName);
                  if (pa1 !== undefined) setPdtID(pa1?.id);
                })
              }
            }); 
          }
        });
      });

      FetchWorkLocation((list:any)=>{
        let wl: WorkLocationNameModel | undefined = list.find((el: any) => el.workLocationName === a?.workLocationName);
        if (wl !== undefined) setWlID(wl?.id);
      })

     // FetchCategoriesFromServices(arnID, a.serviceID);
     // FetchProductsFromCategory(arnID, a.categoryID);
     // FetchDesignTypeFromProductID(a.productID);
    //  FetchWorkLocation();
    }
  };
  //#endregion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Post New Design</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Add/Edit Post New Design</Typography>
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
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

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
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

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={isProductError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Product Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={pn} onChange={handlePNChange}>
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
            <FormControl fullWidth size="small" error={isProductDesignTypeError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Product Design Type</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={pdt} onChange={handlePDTChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {productDesignTypeList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.designTypeName}>
                      {item.designTypeName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{productDesignTypeError}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={isWorkLocationError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Working Location Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={wl} onChange={handleWLChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {workLocationList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.workLocationName}>
                      {item.workLocationName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{workLocationError}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Design No.</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              sx={{ background: "#e5e5e5" }}
              fullWidth
              disabled
              placeholder="Design No"
              variant="outlined"
              size="small"
              value={designNo}
              error={designNoError}
              helperText={designNoErrorText}
              onChange={(e) => {
                setDesignNo(e.currentTarget.value);
                setDesignNoError(false);
                setDesignNoErrorText("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Labour Cost</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Labour Cost"
              variant="outlined"
              size="small"
              value={labourCost}
              error={labourCostError}
              helperText={labourCostTextError}
              onChange={(e) => {
                setLabourCost(e.currentTarget.value);
                setLabourCostError(false);
                setLabourCostTextError("");
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
                    //ref={fileInput}
                    onChange={(e) => {
                      if (e.currentTarget !== null && e.currentTarget.files !== null) {
                        let FileName = e.currentTarget.files[0].name;
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          console.log(evt.target.result);
                          setUploadFileUpload(evt.target.result);
                        };
                        reader.readAsDataURL(e.currentTarget.files[0]);
                       
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

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
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
            <Typography variant="h6" sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
              Post New Design List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%" }}>
                {postNewDesign.length === 0 ? (
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
                      rows={postNewDesignTemp}
                      columns={postNewDesignColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...postNewDesign];
                        let a: PostNewDesignModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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

export default PostNewDesignPage;

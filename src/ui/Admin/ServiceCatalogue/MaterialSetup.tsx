import { LoadingButton } from "@mui/lab";
import { Alert, AlertColor, Box, Button, Checkbox, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../../../api/Provider";
import Header from "../../../components/Header";
import { CategoryModel, DesignTypeModel, MaterialSetupModel, ProductModel, ServiceNameModel } from "../../../models/Model";
import { theme } from "../../../theme/AppTheme";
import { materialSetupColumns } from "../../../utils/tablecolumns";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { communication } from "../../../utils/communication";
import { uniqueByKey } from "../../../utils/JSCommonFunction";
import ListIcon from "@mui/icons-material/List";
import NoData from "../../../components/NoData";
import { APIConverter } from "../../../utils/apiconverter";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface ProductItemModel {
  productID: number;
  productName: string;
  brandID: number;
  brandName: string;
  quantity: string;
  rate: string;
  amount: string;
  formula: string;
}

interface BrandProductItemModel {
  brandID: number;
  brandName: string;
  productID: number;
  price: number;
  unitValue: number;
  categoryName: string;
}

interface BrandItemModel {
  brandID: number;
  brandName: string;
  categoryName: string;
}

const MaterialSetup = () => {
  const [value, setValue] = useState(0);
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);

  //#region Variables
  const [sn, setSn] = useState("--Select--");
  const [snID, setSnID] = useState<number>(0);
  const [servicenameError, setServicenameError] = useState("");
  const [isServicenameError, setIsServicenameError] = useState(false);
  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);

  const [cn, setCn] = useState("--Select--");
  const [cnID, setCnID] = useState<number>(0);
  const [categorynameError, setCategorynameError] = useState("");
  const [isCategorynameError, setIsCategorynameError] = useState(false);
  const [categoryList, setCategoryList] = useState<Array<CategoryModel>>([]);

  const [pn, setPn] = useState("--Select--");
  const [pnID, setPnID] = useState(0);
  const [productError, setProductError] = useState("");
  const [isProductError, setIsProductError] = useState(false);
  const [productList, setProductList] = useState<Array<ProductModel>>([]);

  const [pdt, setPdt] = useState("--Select--");
  const [pdtID, setPdtID] = useState(0);
  const [productDesignTypeError, setProductDesignTypeError] = useState("");
  const [isProductDesignTypeError, setIsProductDesignTypeError] = useState(false);
  const [productDesignTypeList, setProductDesignTypeList] = useState<Array<DesignTypeModel>>([]);

  const [materialSetupList, setMaterialSetupList] = useState<Array<MaterialSetupModel>>([]);
  const [materialSetupListTemp, setMaterialSetupListTemp] = useState<Array<MaterialSetupModel>>([]);

  const [display, setDisplay] = useState("Yes");

  const [lengthFeet, setLengthFeet] = useState("1");
  const [isLengthFeetError, setIsLengthFeetError] = useState<boolean>(false);
  const [lengthFeetError, setLengthFeetError] = useState("");

  const [lengthInches, setLengthInches] = useState("0");
  const [isLengthInchesError, setIsLengthInchesError] = useState<boolean>(false);
  const [lengthInchesError, setLengthInchesError] = useState("");

  const [widthHeightFeet, setWidthHeightFeet] = useState("1");
  const [isWidthHeightFeetError, setIsWidthHeightFeetError] = useState<boolean>(false);
  const [widthHeightFeetError, setWidthHeightFeetError] = useState("");

  const [widthHeightInches, setWidthHeightInches] = useState("0");
  const [isWidthHeightInchesError, setIsWidthHeightInchesError] = useState<boolean>(false);
  const [widthHeightInchesError, setWidthHeightInchesError] = useState("");

  const [productItem, setProductItem] = useState<Array<ProductItemModel>>([]);

  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [pageSize, setPageSize] = useState<number>(5);

  const [arnID, setArnID] = useState<number>(0);
  const [arnDealerID, setArnDealerID] = useState<number>(0);
  const [totalSqFt, setTotalSqFt] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<string>("0");

  const [openDialog, setOpenDialog] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");

  const [snDealer, setDealerSn] = useState("--Select--");
  const [snDealerID, setSnDealerID] = useState<number>(0);
  const [serviceNameDealerList, setServiceNameDealerList] = useState<Array<ServiceNameModel>>([]);

  const [cnDealer, setDealerCn] = useState("--Select--");
  const [cnDealerID, setCnDealerID] = useState<number>(0);
  const [categoryDealerList, setCategoryDealerList] = useState<Array<CategoryModel>>([]);

  const [pnDealer, setPnDealer] = useState("--Select--");
  const [pnDealerID, setPnDealerID] = useState(0);
  const [productDealerList, setProductDealerList] = useState<Array<ProductModel>>([]);

  const [brandProductList, setBrandProductList] = useState<Array<BrandProductItemModel>>([]);
  const [brandList, setBrandList] = useState<Array<BrandItemModel>>([]);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);

  const [isBrandError, setIsBrandError] = useState(false);
  const [brandError, setBrandError] = useState("");

  const [selectedID, setSelectedID] = useState<number>(0);
  //#endregion

  //#region Functions
  useEffect(() => {
    FetchData("");
    FetchActvityRoles();
    FetchServices();
    CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(widthHeightInches));
  }, []);

  const FetchData = (type: string) => {
    handleCancelClick();

    if (type !== "") {
      setSnackMsg("Material setup " + type);
      setOpen(true);
      setSnackbarType("success");
    }

    let params = {
      data: {
        Sess_UserRefno: "2",
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.MaterialsSetupList, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display === "1" ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setMaterialSetupList(arrList);
            setMaterialSetupListTemp(arrList);
          }
        } else {
          setSnackMsg(communication.NoData);
          setSnackbarType("info");
          setOpen(true);
        }
      })
      .catch((e) => {
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
  };


  const FetchDataForProduct = (id: number, a:any) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        materials_setup_refno: id,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.MaterialsSetupRefNoCheck, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            let designID=response.data.data[0].designtype_refno;
          
            response.data.data = APIConverter(response.data.data);
            if (response.data.data[0].productlist_data !== null) {
              response.data.data[0].productlist_data = APIConverter(response.data.data[0].productlist_data);
            }

            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display === "1" ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
           
     
            SetResetServiceName(true);
            SetResetCategoryName(true);
            SetResetProductName(true);
            SetResetProductDesignType(true);
            setLengthFeet(parseInt(arrList[0].lengthfoot).toString());
            setLengthInches(parseInt(arrList[0].lengthinches).toString());
            setWidthHeightFeet(parseInt(arrList[0].widthheightfoot).toString());
            setWidthHeightInches(parseInt(arrList[0].widthheightinches).toString());
            setLengthFeetError("");
            setIsLengthFeetError(false);
            setWidthHeightFeetError("");
            setIsWidthHeightFeetError(false);
            CalculateSqfeet(parseInt(arrList[0].lengthfoot), parseInt(arrList[0].lengthinches), parseInt(arrList[0].widthheightfoot), parseInt(arrList[0].widthheightinches));
            setSubTotal(arrList[0].totalfoot);
      
         
      
          setProductItem(arrList[0].productlist_data);
            setSnID(arrList[0].cont_service_refno);
             setCnID(arrList[0].cont_category_refno);
             setPnID(arrList[0].cont_product_refno);
             setPdtID(designID);
             FetchProductBrandFromProductID(arrList[0].productlist_data);
            // setPdtID(a.designTypeID);
      
         
             setSn(a.serviceName);
             setCn(a.categoryName);
             setPn(a.productName);
             setPdt(a.designTypeName);

             FetchServicesFromActivity(arnID);
             FetchCategoriesFromServices(arnID, arrList[0].cont_service_refno);
             FetchProductsFromCategory(arnID,  arrList[0].cont_category_refno);
             FetchDesignTypeFromProduct(arrList[0].cont_product_refno);

          }
        } else {
          setSnackMsg(communication.NoData);
          setSnackbarType("info");
          setOpen(true);
        }
      })
      .catch((e) => {
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
  };

  const FetchActvityRoles = () => {
    Provider.createDFAdmin(Provider.API_URLS.ActivityRolesMaterialSetup)
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

  const FetchServicesFromActivity = (selectedItemID: number, callback=null) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: selectedItemID,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ServiceNameMaterialSetup, params)
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

  const FetchCategoriesFromServices = (selectedActivityID: number, selectedServiceID: number) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: selectedActivityID,
        service_refno: selectedServiceID,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.CategoryNameMaterialSetup, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setCategoryList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchProductsFromCategory = (selectedActivitryID: number, selectedCategoryID: number) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: selectedActivitryID,
        category_refno: selectedCategoryID,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ProductNameMaterialSetup, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setProductList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchDesignTypeFromProduct = ( selectedItem: number) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        product_refno: selectedItem,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ProductDesignTypeMaterialSetup, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setProductDesignTypeList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchProductBrandFromProductID = (data: any) => {
    let productids = null;
    if (data === "") productids = productItem.map((data1) => data1.productID);
    else productids = data.map((data1) => data1.productID);

    let params = {
      data: {
        Sess_UserRefno: "2",
        product_refno_Array: productids.join(","),
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.BrandNamelistPopupMaterialSetup, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setBrandProductList(response.data.data);
            let BrandData: Array<BrandItemModel> = uniqueByKey(response.data.data, "brandID");
            setBrandList(BrandData);
          }
        }
      })
      .catch((e) => {});
  };

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: number = parseInt(event.target.value);
    let ac = serviceNameList.find((el) => el.id == serviceName);
    if (ac !== undefined) {
      setSn(ac.serviceName);
      setSnID(serviceName);
      SetResetServiceName(false);
      SetResetCategoryName(true);
      SetResetProductName(true);
      SetResetProductDesignType(true);
      FetchCategoriesFromServices(arnID, serviceName);
    }
  };

  
  const handleSNDealerChange = (event: SelectChangeEvent) => {
    let serviceName: number = parseInt(event.target.value);
    let ac = serviceNameDealerList.find((el) => el.id == serviceName);
    if (ac !== undefined) {
      setDealerSn(ac.serviceName);
      setSnDealerID(serviceName);
      SetResetCategoryDealerName();
      SetResetProductDealerName();
      FetchCategoriesFromServicesPopup(serviceName);
    }
  };

  const handleCNChange = (event: SelectChangeEvent) => {
    let categoryName: number = parseInt(event.target.value);
    let ac = categoryList.find((el) => el.id == categoryName);
    if (ac !== undefined) {
      setCn(ac.categoryName);
      setCnID(categoryName);
      SetResetCategoryName(false);
      SetResetProductName(true);
      SetResetProductDesignType(true);

      FetchProductsFromCategory(arnID,  ac.id);
    }
  };

  const handleCNDealerChange = (event: SelectChangeEvent) => {
    let categoryName: number = parseInt(event.target.value);
    let ac = categoryDealerList.find((el) => el.id == categoryName);
    if (ac !== undefined) {
      setDealerCn(ac.categoryName);
      setCnDealerID(categoryName);
      SetResetProductDealerName();

      FetchProductsFromCategoryPopup(categoryName);
    }
  };

  const handlePNChange = (event: SelectChangeEvent) => {
    let productName: number = parseInt(event.target.value);
    let ac = productList.find((el) => el.productID == productName);
    if (ac !== undefined) {
      setPn(ac.productName);
      setPnID(productName);
      SetResetProductName(false);
      SetResetProductDesignType(true);
      FetchDesignTypeFromProduct(productName);
    }
  };

  const handlePDTchange = (event: SelectChangeEvent) => {
    let productName: number = parseInt(event.target.value);
    let ac = productDesignTypeList.find((el) => el.id == productName);
    if (ac !== undefined) {
      setPdt(ac.designTypeName);
      setPdtID(productName);
      SetResetProductDesignType(false);
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

  const SetResetServiceDealerName = () => {
    setDealerSn("--Select--");
    setSnDealerID(0);
  };

  const SetResetCategoryName = (isBlank: boolean) => {
    if (isBlank) {
      setCn("--Select--");
      setCnID(0);
      setCategoryList([]);
    }
    setCategorynameError("");
    setIsCategorynameError(false);
  };

  const SetResetCategoryDealerName = () => {
    setDealerCn("--Select--");
    setCnDealerID(0);
    setCategoryDealerList([]);
  };

  const SetResetProductName = (isBlank: boolean) => {
    if (isBlank) {
      setPn("--Select--");
      setPnID(0);
      setProductList([]);
    }
    setProductError("");
    setIsProductError(false);
  };

  const SetResetProductDealerName = () => {
    setPnDealer("--Select--");
    setPnDealerID(0);
    setProductDealerList([]);
  };

  const SetResetProductDesignType = (isBlank: boolean) => {
    if (isBlank) {
      setPdt("--Select--");
      setPdtID(0);
      setProductDesignTypeList([]);
    }
    setProductDesignTypeError("");
    setIsProductDesignTypeError(false);
  };

  const handleLFChange = (event: SelectChangeEvent) => {
    let lf: string = event.target.value;
    if (parseInt(lf) > 0) {
      setLengthFeet(event.target.value as string);
      setLengthFeetError("");
      setIsLengthFeetError(false);
      CalculateSqfeet(parseInt(lf), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(widthHeightInches));
    }
  };

  const handleLIChange = (event: SelectChangeEvent) => {
    let lf: string = event.target.value;
    if (parseInt(lf) > -1) {
      setLengthInches(event.target.value as string);
      setLengthInchesError("");
      setIsLengthInchesError(false);
      CalculateSqfeet(parseInt(lengthFeet), parseInt(lf), parseInt(widthHeightFeet), parseInt(widthHeightInches));
    }
  };

  const handleWHFChange = (event: SelectChangeEvent) => {
    let lf: string = event.target.value;
    if (parseInt(lf) > 0) {
      setWidthHeightFeet(event.target.value as string);
      setWidthHeightFeetError("");
      setIsWidthHeightFeetError(false);
      CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(lf), parseInt(widthHeightInches));
    }
  };

  const handleWHIChange = (event: SelectChangeEvent) => {
    let lf: string = event.target.value;
    if (parseInt(lf) > -1) {
      setWidthHeightInches(event.target.value as string);
      setWidthHeightInchesError("");
      setIsWidthHeightInchesError(false);
      CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(lf));
    }
  };

  const CalculateSqfeet = (lf: number, li: number, whf: number, whi: number) => {
    if (lf > 0 && li > -1 && whf > 0 && whi > -1) {
      let lengthInches = ((lf * 12 + li) * (whf * 12 + whi)) / 144;
      setTotalSqFt(parseFloat(lengthInches.toFixed(4)));
      if (productItem.length > 0) {
        let total = 0;
        const arrMaterialProducts = [...productItem];
        arrMaterialProducts.map((k) => {
          if (parseFloat(k.formula) !== 0) {
            k.quantity = (parseFloat(lengthInches.toString()) / parseFloat(k.formula)).toFixed(4);
            k.amount = (parseFloat(k.quantity) * parseFloat(k.rate === "0" ? "1" : k.rate)).toFixed(4);
            total += parseFloat(k.amount);
          }
        });
        setProductItem(arrMaterialProducts);
        setSubTotal(total.toFixed(4));
      }
    } else {
      setTotalSqFt(0);
    }
  };

  const handleCancelClick = () => {
    setLoading(false);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);

    SetResetServiceName(true);
    SetResetCategoryName(true);
    SetResetProductName(true);
    SetResetProductDesignType(true);
    setLengthFeet("1");
    setLengthInches("0");
    setWidthHeightFeet("1");
    setWidthHeightInches("0");
    setLengthFeetError("");
    setIsLengthFeetError(false);
    setWidthHeightFeetError("");
    setIsWidthHeightFeetError(false);
    CalculateSqfeet(1, 0, 1, 0);
    setSubTotal("0");
    setProductItem([]);
    setBrandList([]);
    setBrandProductList([]);
    setSelectedID(0);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const CreateLengthFeet = (count: number) => {
    let menuItems = [];
    for (let i = 0; i < count; i++) {
      menuItems.push(
        <MenuItem key={i} value={i + 1}>
          {i + 1}
        </MenuItem>
      );
    }
    return menuItems;
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setMaterialSetupListTemp(materialSetupList);
    } else {
      setMaterialSetupListTemp(
        materialSetupList.filter((el: MaterialSetupModel) => {
          return el.designTypeName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    SetResetServiceDealerName();
    SetResetCategoryDealerName();
    SetResetProductDealerName();
    FetchProductBrandFromProductID("");
  };

  const handleSubmitClick = () => {
    let isValid = true;
    if (snID === 0) {
      isValid = false;
      setIsServicenameError(true);
      setServicenameError(communication.SelectServiceName);
    }
    if (cnID === 0) {
      isValid = false;
      setIsCategorynameError(true);
      setCategorynameError(communication.SelectCategoryName);
    }
    if (pnID === 0) {
      isValid = false;
      setIsProductError(true);
      setProductError(communication.SelectProductName);
    }

    if (pdtID === 0) {
      isValid = false;
      setIsProductDesignTypeError(true);
      setProductDesignTypeError(communication.SelectProductName);
    }

    if (parseInt(lengthFeet) === 0) {
      isValid = false;
      setIsLengthFeetError(true);
      setLengthFeetError("Please select length");
    }

    if (parseInt(widthHeightFeet) === 0) {
      isValid = false;
      setIsWidthHeightFeetError(true);
      setWidthHeightFeet("Please select width");
    }

    if (productItem.length === 0) {
      isValid = false;
      setOpen(true);
      setSnackMsg("error");
      setSnackMsg("Please add product");
    } else {
      let blankData = productItem.find((el) => !el.formula || el.formula === "0");
      if (blankData !== undefined && blankData !== null) {
        isValid = false;
        setOpen(true);
        setSnackMsg("error");
        setSnackMsg("All product fields are compulsary");
      }
    }

    if (selectedBrand === 0) {
      isValid = false;
      setIsBrandError(true);
      setBrandError(communication.SelectBrandName);
    }

    if (isValid) {
      InsertData();
    }
  };


  const FetchServices = () => {
    Provider.createDFAdmin(Provider.API_URLS.ServiceNamePopupMaterialSetup)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setServiceNameDealerList(response.data.data);

          }
        }
      })
      .catch((e) => {});
  };

  const FetchCategoriesFromServicesPopup = (selectedItem) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        service_refno: selectedItem,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.CategoryNamePopupMaterialSetup, params)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setCategoryDealerList(response.data.data);
           
          }
        }
      })
      .catch((e) => {});
  };

  const FetchProductsFromCategoryPopup = (selectedItem) => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        category_refno: selectedItem,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ProductListPopupMaterialSetup, params)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setProductDealerList( response.data.data );
          }
        }
      })
      .catch((e) => {});
  };


  const InsertData = () => {
    
    let product_refno = new Object();
    let product_name = new Object();
    let brand_name = new Object();
    let brand_refno = new Object();
    let qty = new Object();
    let rate = new Object();
    let amount = new Object();
    let formula_parameter1 = new Object();

    productItem.map((k, i) => {
      product_refno[(i + 1).toString()] = k.productID;
      product_name[(i + 1).toString()] = k.productName;
      brand_name[(i + 1).toString()] = k.brandName;
      brand_refno[(i + 1).toString()] = k.brandID;
      qty[(i + 1).toString()] = k.quantity;
      rate[(i + 1).toString()] = k.rate;
      amount[(i + 1).toString()] = k.amount;
      formula_parameter1[(i + 1).toString()] = k.formula;
    });

    const params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: arnID,
        cont_service_refno: snID,
        cont_category_refno: cnID,
        cont_product_refno: pnID,
        designtype_refno: pdtID,
        view_status: display==="Yes" ? 1 : 0,
        lengthfoot: lengthFeet,
        lengthinches: lengthInches,
        widthheightfoot: widthHeightFeet,
        widthheightinches: widthHeightInches,
        totalfoot: totalSqFt,
        product_refno: product_refno,
        product_name: product_name,
        brand_name: brand_name,
        brand_refno: brand_refno,
        qty: qty,
        rate: rate,
        amount: amount,
        formula_parameter1: formula_parameter1,
        subtotal: subTotal
      },
    };
    if (actionStatus === "new") {
  
      Provider.createDFAdmin(Provider.API_URLS.MaterialsSetupCreate, params)
        .then((response: any) => {
          if (response.data && response.data.code === 200) {
            FetchData("added");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
            handleCancelClick();
          }
        })
        .catch((e) => {
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
          handleCancelClick();
        });
    } else if (actionStatus === "edit") {
      params.data["materials_setup_refno"]=selectedID;
      Provider.createDFAdmin(Provider.API_URLS.MaterialsSetupUpdate, params)
        .then((response: any) => {
          if (response.data && response.data.code === 200) {
            FetchData("updated");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
            handleCancelClick();
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
            handleCancelClick();
          }
        })
        .catch((e) => {
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
          handleCancelClick();
        });
    }
  };

  const handleBrandChange = (event: SelectChangeEvent) => {

    let brandData: number = parseInt(event.target.value);
    if (brandData > 0) {

       let brandName: number = parseInt(event.target.value);
      let ac = brandProductList.find((el) => el.brandID == brandName);
       if (ac !== undefined) {
        setSelectedBrand(brandData);
        const productids = productItem.map((data) => data.productID);
        GetProductRateFromMaterialSetup(brandData,productids.toString());
       }

      setIsBrandError(false);
      setBrandError("");
    }
  };

  const handleToggle = (value: ProductModel) => () => {
    let dataIndex = -1;
    const currentIndex = productItem.find(function (item, i) {
      if (item.productID === value.productID) {
        dataIndex = i;
        return i;
      }
    });
    let tempProductDealerList = [...productDealerList];
    var itemIndex = tempProductDealerList.findIndex((x) => x.productID == value.productID);
    const newChecked = [...productItem];

    if (currentIndex === undefined || currentIndex === null) {
      newChecked.push({ productID: value.productID, productName: value.productName, brandID: 0, brandName: "", quantity: "0", rate: "0", amount: "0", formula: "0" });
      tempProductDealerList[itemIndex] = { ...tempProductDealerList[itemIndex], isChecked: true };
    } else {
      newChecked.splice(dataIndex, 1);
      tempProductDealerList[itemIndex] = { ...tempProductDealerList[itemIndex], isChecked: false };
    }
    //const productids = newChecked.map((data) => data.amount);
    //setSubTotal(productids.reduce((a, b) => a + parseFloat(b), 0).toFixed(4));

    setProductItem(newChecked);
   // setProductDealerList(tempProductDealerList);
  };

  const GetProductRateFromMaterialSetup = (brandID:number, productIDs:string) => {
   
    let params = {
      data: {
        Sess_UserRefno: "2",
        dealer_brand_refno: brandID,
        product_refno_Array: productIDs,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ProductRateBrandRefNoMaterialSetup, params)
      .then((response:any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const appliedProducts = response.data.data;
            const newData = [...productItem];
            newData.map((k) => {
              const foundProduct = appliedProducts.find((el) => el.productID == k.productID);
              if (foundProduct) {
                k.brandID = foundProduct.brandID;
                k.brandName = foundProduct.brandName;
                k.rate = parseFloat(foundProduct.price).toFixed(4);
                if (k.formula!="0") {
                  const quants = parseFloat(totalSqFt.toString()) / parseFloat(k.formula);
                  k.quantity = quants.toFixed(4);
                  if (k.rate) {
                    k.amount = (parseFloat(k.quantity) * parseFloat(k.rate)).toFixed(4);
                  } else {
                    k.amount = "0.0000";
                  }
                } else {
                  k.quantity = "";
                  k.amount = "0.0000";
                }
              }
            });

            const amounts = appliedProducts.map((data) => data.amount);
            setSubTotal(amounts.reduce((a, b) => (a ? a : 0 + parseFloat(b ? b : 0)), 0).toFixed(4));
            setProductItem(newData);
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handelEditAndDelete = (type: string | null, a: MaterialSetupModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setValue(0);
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setButtonDisplay("unset");
      setActionStatus("edit");

      setSelectedID(a.id);
      FetchDataForProduct(a.id, a);
     
    }
  };

  //#endregion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Material Setup</Typography>
          </Grid>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Add/Edit Material Setup" {...a11yProps(0)} />
              <Tab label="View List" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Grid item xs={4} sm={8} md={12}>
            <TabPanel value={value} index={0}>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isServicenameError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Service Name</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={snID.toString()} onChange={handleSNChange}>
                      <MenuItem disabled={true} value="0">
                        --Select--
                      </MenuItem>
                      {serviceNameList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.serviceName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{servicenameError}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isCategorynameError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Category Name</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={cnID.toString()} onChange={handleCNChange}>
                      <MenuItem disabled={true} value="0">
                        --Select--
                      </MenuItem>
                      {categoryList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.categoryName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{categorynameError}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isProductError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Product Name</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={pnID.toString()} onChange={handlePNChange}>
                      <MenuItem disabled={true} value="0">
                        --Select--
                      </MenuItem>
                      {productList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.productID}>
                            {item.productName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{productError}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={isProductDesignTypeError}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Product Design Type</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value={pdtID.toString()} onChange={handlePDTchange}>
                      <MenuItem disabled={true} value="0">
                        --Select--
                      </MenuItem>
                      {productDesignTypeList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id.toString()}>
                            {item.designTypeName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{productDesignTypeError}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={5} md={8} sx={{ mt: 2 }}>
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
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)", mt: 3 }}>
                  <Typography variant="h6">Dealers Materials Setup For Service Product</Typography>
                </Grid>
                <Grid container columns={{ xs: 4, sm: 8, md: 12 }} sx={{ mt: 1 }}>
                  <Grid container xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, width: "100%" }}>
                      <b>Length</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <FormControl fullWidth size="small" error={isLengthFeetError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Feet</b>
                        </Typography>
                        <Select value={lengthFeet} onChange={handleLFChange}>
                          {CreateLengthFeet(50)}
                        </Select>
                        <FormHelperText>{lengthFeetError}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <FormControl fullWidth size="small" error={isLengthInchesError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Inches</b>
                        </Typography>
                        <Select value={lengthInches} onChange={handleLIChange}>
                          <MenuItem value="0">0</MenuItem>
                          {CreateLengthFeet(11)}
                        </Select>
                        <FormHelperText>{lengthInchesError}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, width: "100%" }}>
                      <b>Width / Height</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <FormControl fullWidth size="small" error={isWidthHeightFeetError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Feet</b>
                        </Typography>
                        <Select value={widthHeightFeet} onChange={handleWHFChange}>
                          {CreateLengthFeet(50)}
                        </Select>
                        <FormHelperText>{widthHeightFeetError}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                      <FormControl fullWidth size="small" error={isWidthHeightInchesError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Inches</b>
                        </Typography>
                        <Select value={widthHeightInches} onChange={handleWHIChange}>
                          <MenuItem value="0">0</MenuItem>
                          {CreateLengthFeet(11)}
                        </Select>
                        <FormHelperText>{widthHeightInchesError}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} sm={4} md={3} sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                    <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <b style={{ padding: 8 }}>Total (Sq.Ft)</b>
                      <label style={{ color: "#ff0000", marginLeft: "16px", border: "2px solid rgba(0,0,0,0.12)", padding: 8, borderRadius: "4px" }}>{totalSqFt}</label>
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={3} sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpenDialog(true);
                        }}
                      >
                        Add Product
                      </Button>
                    </div>
                  </Grid>
                </Grid>

                {productItem.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
                      <TableContainer component={Paper} sx={{ width: "100%" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Product Name</TableCell>
                              <TableCell>Brand Name</TableCell>
                              <TableCell sx={{ width: "96px" }}>Quantity</TableCell>
                              <TableCell sx={{ width: "96px" }}>Rate</TableCell>
                              <TableCell sx={{ width: "96px" }}>Amount</TableCell>
                              <TableCell sx={{ width: "96px" }}>Formula</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {productItem.map((row: ProductItemModel, index: number) => (
                              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  {row.productName}
                                </TableCell>
                                <TableCell>{row.brandName}</TableCell>
                                <TableCell align="right">
                                  <TextField sx={{ width: "96px" }} disabled placeholder="" variant="outlined" size="small" value={row.quantity} onChange={(e) => {}} />
                                </TableCell>
                                <TableCell align="right">
                                  <TextField
                                    sx={{ width: "96px" }}
                                    placeholder=""
                                    variant="outlined"
                                    size="small"
                                    value={row.rate}
                                    onChange={(e: React.SyntheticEvent) => {
                                      row.rate = (e.target as HTMLInputElement).value;
                                      if (parseFloat(row.formula) !== 0) {
                                        row.quantity = (parseFloat(totalSqFt.toString()) / parseFloat(row.formula)).toFixed(4);
                                        row.amount = (parseFloat(row.quantity) * parseFloat(row.rate)).toFixed(4);
                                      }
                                      let NewArr = [...productItem];
                                      NewArr.splice(index, 1, row);
                                      setProductItem(NewArr);
                                      const productids = NewArr.map((data) => data.amount);
                                      setSubTotal(productids.reduce((a, b) => a + parseFloat(b), 0).toFixed(4));
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  <TextField sx={{ width: "96px" }} disabled placeholder="" variant="outlined" size="small" value={row.amount} onChange={(e) => {}} />
                                </TableCell>
                                <TableCell align="right">
                                  <TextField
                                    sx={{ width: "96px" }}
                                    placeholder=""
                                    variant="outlined"
                                    size="small"
                                    value={row.formula}
                                    onChange={(e: React.SyntheticEvent) => {
                                      row.formula = (e.target as HTMLInputElement).value;
                                      if (row.formula) {
                                        row.quantity = (parseFloat(totalSqFt.toString()) / parseFloat(row.formula)).toFixed(4);
                                        if (parseFloat(row.rate) !== 0) {
                                          row.amount = (parseFloat(row.quantity) * parseFloat(row.rate)).toFixed(4);
                                        } else {
                                          row.amount = "0.0000";
                                        }
                                      } else {
                                        row.amount = "";
                                        row.quantity = "";
                                      }
                                      let NewArr = [...productItem];
                                      NewArr.splice(index, 1, row);
                                      setProductItem(NewArr);
                                      const productids = NewArr.map((data) => data.amount);
                                      setSubTotal(productids.reduce((a, b) => a + parseFloat(b), 0).toFixed(4));
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
                                    onClick={() => {
                                      let NewArr = [...productItem];
                                      NewArr.splice(index, 1);
                                      setProductItem(NewArr);
                                      const productids = NewArr.map((data) => data.amount);
                                      setSubTotal(productids.reduce((a, b) => a + parseFloat(b), 0).toFixed(4));
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={4} sm={4} md={3} sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                      <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <b style={{ padding: 8 }}>Sub Total</b>
                        <label style={{ color: "#ff0000", marginLeft: "16px", border: "2px solid rgba(0,0,0,0.12)", padding: 8, borderRadius: "4px" }}>{subTotal}</label>
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={12} sx={{ mt: 1 }}>
                      <FormControl style={{ width: 240 }} size="small" error={isBrandError}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Brand Name</b>
                          <label style={{ color: "#ff0000" }}>*</label>
                        </Typography>
                        <Select value={selectedBrand.toString()} onChange={handleBrandChange}>
                          <MenuItem disabled={true} value="0">
                            --Select--
                          </MenuItem>
                          {brandList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.brandID}>
                                {item.brandName + " (" + item.categoryName + ")"}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <FormHelperText>{brandError}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </>
                )}

                <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
                    style={{ display: buttonDisplay }}
                    onClick={() => {
                      setValue(1);
                      handleCancelClick();
                    }}
                  >
                    Cancel
                  </Button>
                  <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid item xs={4} sm={8} md={12}>
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                  <Typography variant="h6">Material Setup list</Typography>
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                  {loading ? (
                    <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                      {materialSetupList.length === 0 ? (
                        <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                      ) : (
                        <>
                          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1, alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
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
                            getRowHeight={() => "auto"}
                            rows={materialSetupListTemp}
                            columns={materialSetupColumns}
                            pageSize={pageSize}
                            rowsPerPageOptions={[5, 10, 20]}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            disableSelectionOnClick
                            onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                              const arrActivity = [...materialSetupList];
                              let a: MaterialSetupModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        disableEscapeKeyDown
      >
        <DialogTitle>Choose Product</DialogTitle>
        <DialogContent sx={{ width: 480 }}>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={4} sm={5} md={6}>
              <FormControl fullWidth size="small">
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Service Name</b>
                  <label style={{ color: "#ff0000" }}>*</label>
                </Typography>
                <Select value={snDealerID.toString()} onChange={handleSNDealerChange}>
                  <MenuItem disabled={true} value="0">
                    --Select--
                  </MenuItem>
                  {serviceNameDealerList.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.serviceName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={5} md={6}>
              <FormControl fullWidth size="small">
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Category Name</b>
                  <label style={{ color: "#ff0000" }}>*</label>
                </Typography>
                <Select value={cnDealerID.toString()} onChange={handleCNDealerChange}>
                  <MenuItem disabled={true} value="0">
                    --Select--
                  </MenuItem>
                  {categoryDealerList.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.categoryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <List sx={{ width: "100%", maxWidth: 360, height: 240, bgcolor: "background.paper" }}>
                {productDealerList.map((value: ProductModel, index: number) => {
                  const labelId = `checkbox-list-label-${index}`;
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                          <Checkbox edge="start" checked={value.isChecked} tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": labelId }} />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.productName} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaterialSetup;

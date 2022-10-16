import {
    Box, Alert, AlertColor, Container, Grid, Select, MenuItem, FormControl,
    FormHelperText, Typography, Stack, Button, CircularProgress, InputAdornment, Snackbar,
    Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    colors
} from "@mui/material";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from '@mui/icons-material/List';
import NoData from "../../../components/NoData";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../../utils/tablecolumns";
import {
    ProductDetailsModel, SendRateCardModel, ClientModel, ServiceNameModel, ProductModel, CategoryModel, RateCardProductModel,

} from "../../../models/Model";
import { theme } from "../../../theme/AppTheme";
import { GetStringifyJson, NullOrEmpty } from "../../../utils/CommonFunctions";
import { communication } from "../../../utils/communication";
import Provider from "../../../api/Provider";
import { useCookies } from "react-cookie";
import { Style } from "@mui/icons-material";
import { border } from "@mui/system";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CreateClient from "../../../components/Client";
import { uniqueByKey } from "../../../utils/JSCommonFunction";

interface ProductItemModel {
    productID: number;
    serviceID: number;
    categoryID: number;
    unitOfSalesID: number;
    selectedUnitID: number;
    productName: string;
    serviceName: string;
    categoryName: string;
    unit: string;
    altUnit: string;
    rate: string;
    altRate: string;
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

const SendRateCard = () => {

    //#region Variables
    // const navigate = useNavigate();
    const [dialogueOpen, setDialogueOpen] = useState(false);
    const [openProductDialog, setOpenProductDialog] = useState(false);

    let dummyClient: ClientModel = null;

    const [selectedID, setSelectedID] = React.useState<number>(0);
    const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [snackMsg, setSnackMsg] = useState("");

    const [cookies, setCookie] = useCookies(["dfc"]);
    const [CookieUserID, SetCookieUseID] = useState(0);
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [clientName, setClientName] = useState("--Select--");
    const [clientNameID, setClientNameID] = useState<number>(0);
    const [clientNameError, SetClientNameError] = useState("");
    const [isClientNameError, IsSetClientNameError] = useState(false);
    const [clientNameList, setClientNameList] = useState<Array<ClientModel>>([]);
    const [clientNameFullData, setClientNameFullData] = useState([]);

    const [cName, setCName] = useState("");
    const [clientNo, setClientNo] = useState("");

    const [unitOfSales, setUnitOfSales] = useState("--Select--");

    const [productDetailList, setProductDetailList] = useState<Array<ProductDetailsModel>>([]);
    const [productDetailListTemp, setProductDetailListTemp] = React.useState<Array<any>>([]);

    const [pageSize, setPageSize] = React.useState<number>(5);
    const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");

    const [sn, setSn] = useState("--Select--");
    const [snID, setSnID] = useState<number>(0);
    const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);

    const [cn, setCn] = useState("--Select--");
    const [cnID, setCnID] = useState<number>(0);
    const [categoryList, setCategoryList] = useState<Array<CategoryModel>>([]);

    const [productItem, setProductItem] = useState<Array<ProductItemModel>>([]);
    const [brandProductList, setBrandProductList] = useState<Array<BrandProductItemModel>>([]);
    const [brandList, setBrandList] = useState<Array<BrandItemModel>>([]);

    const [arnID, setArnID] = useState<number>(0);
    const [totalSqFt, setTotalSqFt] = useState<number>(0);

    const [pn, setPn] = useState("--Select--");
    const [pnID, setPnID] = useState(0);
    const [productError, setProductError] = useState("");
    const [isProductError, setIsProductError] = useState(false);
    const [productList, setProductList] = useState<Array<RateCardProductModel>>([]);
    const [productFullData, setProductFullData] = useState([]);

    const [checkInclusiveMaterial, setCheckInclusiveMaterial] = useState(false);

    const [showNote, setShowNote] = useState(false);
    const [showButton, setShowButton] = useState(false);


    //#endregion

    //#regionFunction
    useEffect(() => {
        let id = window.location.pathname.split('/').at(-1);
        if (!isNaN(parseInt(id))) {
            setSelectedID(parseInt(id));
            FetchRateCardByID(parseInt(id));

            FetchActvityRoles();
        }
        else {
            FetchCompanyName(0);
            FetchActvityRoles();
        }

    }, []);

    const FetchRateCardByID = (id: number) => {
        let params = {
            ID: id,
            AddedByUserID: cookies.dfc.UserID
        };
        Provider.getAll(`master/getcontractorsentratecardbyid?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        setClientNameID(response.data.data[0].clientID);
                        setUnitOfSales(response.data.data[0].selectedUnitID == 1 ? "foot" : "meter");
                        setCheckInclusiveMaterial(response.data.data[0].inclusiveMaterials);
                    }
                    setLoading(false);
                    FetchCompanyName(response.data.data[0].clientID);
                    FetchProductsByID(id, response.data.data[0].selectedUnitID == 1 ? "foot" : "meter");
                }
            })
            .catch((e) => {
                setLoading(false);
            });
    };

    const handleClientNameChange = (event: SelectChangeEvent) => {
        let companyName: string = event.target.value;
        let ac = clientNameFullData.find((el) => el.companyName === companyName);
        if (ac !== undefined) {
            setClientName(companyName);
            setClientNameID(ac?.id);
            IsSetClientNameError(false);
            SetClientNameError("");
            setCName(ac?.contactPerson);
            setClientNo(ac?.contactMobileNumber);

        }
    };

    const handleDialogueClose = () => {
        setDialogueOpen(false);
    };

    const handleConfirmDialogueClose = () => {
        setConfirmOpen(false);
    };

    const handleUnitOfSalesChange = (event: SelectChangeEvent) => {
        if (productItem.length == 0) {
            let unitOfSales: string = event.target.value;
            setUnitOfSales(unitOfSales);
        }
        else {
            setConfirmOpen(true);
        }

    };

    const FetchCompanyName = (clientID) => {
        let params = {
            AddedByUserID: cookies.dfc.UserID,
        };
        Provider.getAll(`master/getcontractorclientlist?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                const clientdata: any = [];
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        setClientNameFullData(response.data.data);
                        response.data.data.map((data: any, i: number) => {
                            clientdata.push({
                                id: data.id,
                                companyName: data.companyName,
                            });
                        });
                        setClientNameList(clientdata);
                        if (clientID !== "") {
                            let d = response.data.data.filter((el: any) => {
                                return el.id == clientID;
                            });
                            setClientName(d[0].companyName);
                            setClientNameID(d[0].id);
                            setCName(d[0].contactPerson);
                            setClientNo(d[0].contactMobileNumber);
                        }
                    }
                }
            })
            .catch((e) => { });
    };

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    /////////////////////////////////////////////

    const FetchActvityRoles = () => {
        Provider.getAll("master/getmainactivities")
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        let contractorData = response.data.data.find((el) => {
                            return el.display && el.activityRoleName === "Contractor";
                        });
                        setArnID(contractorData.id);
                        FetchServicesFromActivity();
                    }
                }
            })
            .catch((e) => { });
    };

    const FetchServicesFromActivity = () => {
        let params = {
            ContractorID: cookies.dfc.UserID,
        };
        Provider.getAll(`master/getcontractoractiveservices?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        setServiceNameList(response.data.data);
                    }
                }
            })
            .catch((e) => { });
    };

    const handleSNChange = (event: SelectChangeEvent) => {
        let serviceName: number = parseInt(event.target.value);
        let ac = serviceNameList.find((el) => el.id === serviceName);
        if (ac !== undefined) {
            setSn(ac.serviceName);
            setSnID(serviceName);
            SetResetCategoryName();
            SetResetProductName(true);
            FetchCategoriesFromServices(arnID, serviceName);
        }
    };

    const FetchCategoriesFromServices = (selectedActivityID: number, selectedServiceID: number) => {
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
                    }
                }
            })
            .catch((e) => { });
    };

    const handleProductDialogClose = () => {
        setOpenProductDialog(false);
        SetResetServiceName();
        SetResetCategoryName();
        SetResetProductName(true);
        FetchProductBrandFromProductID("");
    };


    const FetchProductBrandFromProductID = (data: any) => {
        let productids = null;
        if (data === "") productids = productItem.map((data1) => data1.productID);
        else productids = data.map((data1) => data1.productID);

        let params = {
            ProductID: productids.join(","),
        };

        Provider.getAll(`servicecatalogue/getbrandsbyproductids?${new URLSearchParams(params)}`)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        setBrandProductList(response.data.data);
                        let BrandData: Array<BrandItemModel> = uniqueByKey(response.data.data, "brandID");
                        setBrandList(BrandData);
                    }
                }
            })
            .catch((e) => { });
    };

    const SetResetServiceName = () => {
        setSn("--Select--");
        setSnID(0);
    };

    const SetResetCategoryName = () => {
        setCn("--Select--");
        setCnID(0);
        setCategoryList([]);
    };

    const SetResetProductName = (isBlank: boolean) => {
        if (isBlank) {
            setPn("--Select--");
            setPnID(0);
            setProductList([]);
            debugger;
            setProductFullData([]);
        }
        setProductError("");
        setIsProductError(false);
    };


    const handleCNChange = (event: SelectChangeEvent) => {
        debugger;
        let categoryName: number = parseInt(event.target.value);
        let ac = categoryList.find((el) => el.id === categoryName);
        if (ac !== undefined) {
            setCn(ac.categoryName);
            setCnID(categoryName);
            FetchProductsFromCategory(arnID, snID, ac.id);
        }
    };

    const FetchProductsFromCategory = (selectedActivitryID: number, selectedServiceID: number, selectedCategoryID: number) => {
        let params = {
            ActivityID: selectedActivitryID,
            ServiceID: selectedServiceID,
            CategoryID: selectedCategoryID,
            ContractorID: cookies.dfc.UserID,
            InclusiveMaterial: checkInclusiveMaterial
        };
        Provider.getAll(`master/getcontractorratecardproductsbycategoryid?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                debugger;
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        const fullData = response.data.data.map((o) => ({
                            ...o,
                            isChecked: productItem.find((el) => {
                                return el.productID === o.productID;
                            })
                                ? true
                                : false,
                        }));
                        setProductList(fullData);
                        setProductFullData(fullData);
                    }
                }
            })
            .catch((e) => { });
    };

    const FetchProductsByID = (selectedID: number, selectedUnit) => {
        let params = {
            ContractorID: cookies.dfc.UserID,
            RateCardMappingID: selectedID
        };
        Provider.getAll(`master/getcontractorratecardproductsbyid?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        let arr = [];
                        response.data.data.find(function (item, i) {
                            arr.push({
                                productID: item.productID,
                                serviceID: item.serviceID,
                                categoryID: item.categoryID,
                                unitOfSalesID: item.unitOfSalesID,
                                selectedUnitID: item.selectedUnitID,
                                productName: item.productName,
                                serviceName: item.serviceName,
                                categoryName: item.categoryName,
                                unit: selectedUnit == "foot" ? item.unit1Name : item.unit2Name,
                                altUnit: selectedUnit == "foot" ? item.unit2Name : item.unit1Name,
                                rate: selectedUnit == "foot" ? item.footRate : item.meterRate,
                                altRate: selectedUnit == "foot" ? item.meterRate : item.footRate
                            });
                        });
                        debugger;
                        setProductItem(arr);
                        setShowButton(true);
                        setShowNote(true);
                    }
                }
            })
            .catch((e) => { });
    };

    const updateProducts = () => {
        let updatedUnit = "";
        if (unitOfSales === "foot") {
            setUnitOfSales("meter");
            updatedUnit = "meter";
        }
        else {
            setUnitOfSales("foot");
            updatedUnit = "foot";
        }

        productItem.find(function (item, i) {
            let rate = item.rate;
            let unit = item.unit;
            item.rate = item.altRate;
            item.unit = item.altUnit;
            item.altRate = rate;
            item.altUnit = unit;
        });

        setProductItem(productItem);
        setConfirmOpen(false);
    };

    const handleToggle = (value: RateCardProductModel) => () => {
        debugger;
        let dataIndex = -1;
        const currentIndex = productItem.find(function (item, i) {
            if (item.productID === value.productID) {
                dataIndex = i;
                return i;
            }
        });
        let tempProductList = [...productList];
        var itemIndex = tempProductList.findIndex((x) => x.productID == value.productID);
        const newChecked = [...productItem];
        let newRate = "", newUnit = "", altRate = "", altUnit = "";

        if (unitOfSales == "foot") {
            newRate = value.footRate;
            newUnit = value.unit1Name;
            altRate = value.meterRate;
            altUnit = value.unit2Name;
        }
        else {
            newRate = value.meterRate;
            newUnit = value.unit2Name;
            altRate = value.footRate;
            altUnit = value.unit1Name;
        }

        if (currentIndex === undefined || currentIndex === null) {
            newChecked.push({
                productID: value.productID,
                productName: value.productName,
                serviceName: value.serviceName,
                categoryName: value.categoryName,
                serviceID: value.serviceID,
                categoryID: value.categoryID,
                selectedUnitID: value.selectedUnitID,
                unitOfSalesID: value.unitOfSalesID,
                rate: newRate,
                unit: newUnit,
                altRate: altRate,
                altUnit: altUnit
            });
            tempProductList[itemIndex] = { ...tempProductList[itemIndex], isChecked: true };
        } else {
            newChecked.splice(dataIndex, 1);
            tempProductList[itemIndex] = { ...tempProductList[itemIndex], isChecked: false };
        }

        setProductItem(newChecked);
        setProductList(tempProductList);
        setShowNote(true);
        setShowButton(true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (productItem.length == 0) {
            setCheckInclusiveMaterial(event.target.checked);
        }
    };

    const handleSubmitClick = () => {
        if (productItem.length !== 0) {
            InsertUpdateData();
        }
        else {
            setSnackMsg("Please select all mandatory fields");
            setOpen(true);
            setSnackbarType("error");
        }
    };

    const InsertUpdateData = () => {
        debugger;
        let productArr = [];

        productItem.find(function (item, i) {
            productArr.push({
                ID: 0,
                RateCardMappingID: selectedID,
                ProductID: item.productID,
                ServiceID: item.serviceID,
                CategoryID: item.categoryID,
                SelectedUnitID: item.selectedUnitID,
                UnitOfSalesID: item.unitOfSalesID,
                Rate: item.rate,
            });
        });

        let contractorRateCardMapping = [{
            ID: selectedID,
            ClientID: clientNameID,
            SelectedUnitID: unitOfSales == "foot" ? 1 : 2,
            UnitOfSalesID: 0,
            InclusiveMaterials: checkInclusiveMaterial,
            AddedByUserID: cookies.dfc.UserID
        }];

        let contractorRateCardMappingItems = productArr;

        let params = {
            contractorRateCardMapping: contractorRateCardMapping,
            contractorRateCardMappingItems: contractorRateCardMappingItems
        };
        debugger;
        Provider.create("master/insertupdatesendratecard", params)
            .then((response) => {
                debugger;
                if (response.data && response.data.code === 200) {
                    navigate(`/contractor/ratecard/sendratecardlist`);
                } else if (response.data.code === 304) {
                    setSnackMsg(communication.ExistsError);
                    setOpen(true);
                    setSnackbarType("error");
                    //ResetFields();
                } else {
                    //ResetFields();
                    setSnackMsg(communication.Error);
                    setSnackbarType("error");
                    setOpen(true);
                }
            })
            .catch((e) => {
                //ResetFields();
                setSnackMsg(communication.NetworkError);
                setSnackbarType("error");
                setOpen(true);
            });
    };



    //#endregion

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4">RATE CARD SETUP</Typography>
                            <Button variant="contained" startIcon={<ListIcon sx={{ marginRight: 1 }} />} onClick={() => navigate("/contractor/ratecard/sendratecardlist")}>View List</Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">Client Deatils</Typography>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                        <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={6}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={3}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            <b style={{ float: 'right', }}>  <label style={{ color: "#ff0000" }}>*</label>Client Name</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <FormControl fullWidth size="small" error={isClientNameError}>
                                            <Select value={clientName} onChange={handleClientNameChange} >
                                                <MenuItem disabled={true} value="--Select--">
                                                    --Select--
                                                </MenuItem>
                                                {clientNameList.map((item, index) => {
                                                    return (
                                                        <MenuItem key={index} value={item.companyName}>
                                                            {item.companyName}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                            <FormHelperText>{clientNameError}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={1}>
                                        <Button variant="contained" onClick={() => {
                                            setDialogueOpen(true);
                                        }} style={{ marginTop: "-4px" }} sx={{ mr: 1, backgroundColor: theme.palette.success.main }}>
                                            <AddIcon />
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={6}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={2}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            <b style={{ float: 'right', }}>Client Name</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <TextField
                                            fullWidth
                                            disabled={true}
                                            sx={{ background: "#e5e5e5" }}
                                            inputProps={{
                                                maxLength: 10,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) => {
                                                setCName((e.target as HTMLInputElement).value);
                                            }}
                                            value={cName}
                                        />
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            <b style={{ float: 'right', }}>Client No</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <TextField
                                            fullWidth
                                            disabled={true}
                                            sx={{ background: "#e5e5e5" }}
                                            inputProps={{
                                                maxLength: 10,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                            onChange={(e) => {
                                                setClientNo((e.target as HTMLInputElement).value);
                                            }}
                                            value={clientNo}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">Rate Card Preparation Type</Typography>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                        <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={5}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={4}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            <b style={{ float: 'right', }}>  <label style={{ color: "#ff0000" }}>*</label>Unit of Sales</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={7}>
                                        <FormControl fullWidth size="small">
                                            <Select value={unitOfSales} onChange={handleUnitOfSalesChange} >
                                                <MenuItem disabled={true} value="--Select--">
                                                    --Select--
                                                </MenuItem>
                                                <MenuItem value="foot">Foot</MenuItem>
                                                <MenuItem value="meter">Meter</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>

                            </Grid>
                            <Grid item xs={4}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={6}>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox checked={checkInclusiveMaterial} onChange={handleChange} />}
                                                labelPlacement="start" label="Inclusive Materials" />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={8}>
                                        <Button variant="contained" onClick={() => {
                                            if (unitOfSales !== "--Select--") {
                                                setOpenProductDialog(true);
                                            }
                                            else {
                                                setSnackMsg(communication.BlankUnitOfSales);
                                                setSnackbarType("error");
                                                setOpen(true);
                                            }
                                        }} style={{ marginTop: "-4px" }} sx={{ mr: 1, backgroundColor: theme.palette.success.main }}>
                                            <AddIcon />     Add Product
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {showNote &&
                                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} sx={{ mt: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                    <Grid item xs={8}>
                                        <Typography style={{ color: "red", textAlign: "center" }}>
                                            Note:- Once product added you can't change Inclusive Materials option. If you want to change the Inclusive Materials check box tick option, please remove all product and try again!
                                        </Typography>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">Product Details</Typography>
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
                                                <TableCell>Service Name</TableCell>
                                                <TableCell>Category Name</TableCell>
                                                <TableCell>Product Name</TableCell>
                                                <TableCell>Unit</TableCell>
                                                <TableCell sx={{ width: "96px" }}>Rate</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {productItem.map((row: ProductItemModel, index: number) => (
                                                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                                    <TableCell component="th" scope="row">
                                                        {row.serviceName}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.categoryName}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.productName}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.unit}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <TextField sx={{ width: "96px" }} disabled placeholder="" variant="outlined" size="small" value={row.rate} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="contained"
                                                            sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
                                                            onClick={() => {
                                                                let NewArr = [...productItem];
                                                                NewArr.splice(index, 1);
                                                                setProductItem(NewArr);
                                                                if (NewArr.length == 0) {
                                                                    setShowNote(false);
                                                                    setShowButton(false);
                                                                }
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

                                {/* take button here */}

                            </Grid>
                        </>
                    )}

                    {showButton &&
                        <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} sx={{ mt: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={8}>
                                <Button variant="contained" onClick={handleSubmitClick} style={{ marginTop: "-4px" }} sx={{ mr: 1, backgroundColor: theme.palette.success.main }}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Container>
            <Dialog open={dialogueOpen} onClose={handleDialogueClose}>
                <DialogTitle>Client</DialogTitle>
                <DialogContent>
                    <div style={{ minWidth: "640px" }}>
                        <CreateClient
                            client={dummyClient}
                            saveCallBack={() => {
                                handleDialogueClose();
                                setSnackMsg("Client Added");
                                setSnackbarType("success");
                                setOpen(true);
                                FetchCompanyName(0);
                            }}
                            cancelCallBack={() => {
                                FetchCompanyName(0);
                                handleDialogueClose();
                            }}
                            type={"client"}
                            cardDisplay={"block"}
                        />
                    </div>
                </DialogContent>

            </Dialog>
            <Dialog
                open={openProductDialog}
                onClose={(event, reason) => {
                    if (reason !== "backdropClick") {
                        handleProductDialogClose();
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
                                <Select value={snID.toString()} onChange={handleSNChange}>
                                    <MenuItem disabled={true} value="0">
                                        --Select--
                                    </MenuItem>
                                    {serviceNameList.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item.serviceID}>
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
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} sm={8} md={12}>
                            <List sx={{ width: "100%", maxWidth: 360, height: 240, bgcolor: "background.paper" }}>
                                {productList.map((value: RateCardProductModel, index: number) => {
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
                    <Button onClick={handleProductDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={confirmOpen} onClose={handleConfirmDialogueClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Do you confirm to change the Unit Of Sales? If OK, then your already added all products values automatically changed.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDialogueClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            updateProducts();
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert severity={snackbarType} sx={{ width: "100%" }}>
                    {snackMsg}
                </Alert>
            </Snackbar>
        </Box >
    )
};

export default SendRateCard;
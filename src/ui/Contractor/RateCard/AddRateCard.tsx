
import {
    Box, Container, Grid, Typography, Stack, Button, TextField, AlertColor,
    Autocomplete, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio, FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TextareaAutosize } from '@mui/base';
import { useNavigate } from "react-router-dom";
import { theme } from "../../../theme/AppTheme";
import { useCookies } from "react-cookie";
import { SelectChangeEvent } from "@mui/material";
import Provider from "../../../api/Provider";
import { communication } from "../../../utils/communication";
import { GetStringifyJson, NullOrEmpty } from "../../../utils/CommonFunctions";
import { APIConverter } from "../../../utils/apiconverter";

let s_ID = 0, c_ID = 0, p_ID = 0, u_ID = 0;

const AddRateCard = () => {

    const [cookies, setCookie] = useCookies(["dfc"]);
    const [value, setValue] = useState(0);
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


    // #region Variable
    const [serviceNameID, setServiceNameID] = useState<number>(0);
    const [serviceNameError, setServiceNameError] = useState("");
    const [selectedServiceName, setSelectedServiceName] = useState("");
    const [isServiceNameError, isSetServiceNameError] = useState(false);
    const [serviceNameErrorText, setServiceNameErrorText] = useState("");
    const [serviceNameFullData, setServiceNameFullData] = useState([]);

    const [categoryID, setCategoryID] = useState<number>(0);
    const [categoryError, setCategoryError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isCategoryError, isSetCategoryError] = useState(false);
    const [categoryErrorText, setCategoryErrorText] = useState("");
    const [categoryFullData, setCategoryFullData] = useState([]);
    const [categoryDDData, setCategoryDDData] = useState([]);

    const [hsn, setHSN] = React.useState("");
    const [hsnErrorText, setHSNErrorText] = useState("");
    const [isHsnError, isSetHSNError] = useState(false);

    const [gstRate, setGstRate] = React.useState("");
    const [gstRateErrorText, setGstRateErrorText] = useState("");
    const [isGstRateError, isSetGstRateError] = useState(false);


    const [serviceProductName, setServiceProductName] = useState("--Select--");
    const [serviceProductNameID, setServiceProductNameID] = useState<number>(0);
    const [serviceProductNameError, setServiceProductNameError] = useState("");
    const [selectedServiceProductName, setSelectedServiceProductName] = useState("");
    const [isServiceProductNameError, isSetServiceProductNameError] = useState(false);
    const [serviceProductNameErrorText, setServiceProductNameErrorText] = useState("");
    const [serviceProductNameFullData, setServiceProductNameFullData] = useState([]);
    const [serviceProductNameDDData, setServiceProductNameDDData] = useState([]);

    const [unitOfSales, setUnitOfSales] = useState("--Select--");
    const [unitOfSalesID, setUnitOfSalesID] = useState<number>(0);
    const [selectedUnitID, setSelectedUnitID] = useState(0);

    const [unitOfSalesError, setUnitOfSalesError] = useState("");
    const [selectedUnitOfSales, setSelectedUnitOfSales] = useState("");
    const [isUnitOfSalesError, isSetUnitOfSalesError] = useState(false);
    const [unitOfSalesErrorText, setUnitOfSalesErrorText] = useState("");
    const [unitOfSalesFullData, setUnitOfSalesFullData] = useState([]);
    const [unitOfSalesDDData, setUnitOfSalesDDData] = useState([]);


    const [materialRate, setMaterialRate] = React.useState("");
    const [materialRateErrorText, setMaterialRateErrorText] = useState("");
    const [isMaterialRateError, isSetMaterialRateError] = useState(false);

    const [alternativeWithMaterialRate, setAlternativeWithMaterialRate] = React.useState("");
    const [alternativeWithMaterialRateErrorText, setAlternativeWithMaterialRateErrorText] = useState("");
    const [isAlternativeWithMaterialRateError, isSetAlternativeWithMaterialRateError] = useState(false);

    const [alternativeWithoutMaterialRate, setAlternativeWithoutMaterialRate] = React.useState("");
    const [alternativeWithoutMaterialRateErrorText, setAlternativeWithoutMaterialRateErrorText] = useState("");
    const [isAlternativeWithoutMaterialRateError, isSetAlternativeWithoutMaterialRateError] = useState(false);

    const [withoutMaterialRate, setWithoutMaterialRate] = React.useState("");
    const [withoutMaterialRateErrorText, setWithoutMaterialRateErrorText] = useState("");
    const [isWithoutMaterialRateError, isSetWithoutMaterialRateError] = useState(false);

    const [shortSpecification, setShortSpecification] = React.useState("");
    const [shortSpecificationErrorText, setShortSpecificationErrorText] = useState("");
    const [isShortSpecificationError, isSetShortSpecificationError] = useState(false);

    const [specificationSP, setSpecificationSP] = React.useState("");
    const [specificationSPErrorText, setSpecificationSPErrorText] = useState("");
    const [isSpecificationSPError, isSetSpecificationSPError] = useState(false);

    const [rateCardID, setRateCardID] = useState<number>(0);
    const [display, setDisplay] = React.useState("Yes");

    const [conversionRate, setConversionRate] = React.useState("");

    const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [actionStatus, setActionStatus] = React.useState<string>("new");
    const [arnID, setArnID] = useState<number>(0);
    //#endregion

    //#region Functions

    useEffect(() => {

        let id = window.location.pathname.split('/').at(-1);
        if (!NullOrEmpty(id) && !isNaN(parseInt(id))) {
            setRateCardID(parseInt(id));
            FetchRateCardDetails(parseInt(id));
        }
        else {
            setRateCardID(0);
            //FetchRateCardDetails(parseInt(id));
            FetchServiceName();
        }
    }, []);

    const FetchRateCardDetails = (id: number) => {
        let params = {
            RateCardID: id
        };
        Provider.getAll(`master/getcontractorratecardbyid?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {

                        setRateCardID(response.data.data[0].rateCardID);
                        if (!NullOrEmpty(response.data.data[0].serviceID)) {
                            s_ID = response.data.data[0].serviceID;
                        }

                        if (!NullOrEmpty(response.data.data[0].categoryID)) {
                            c_ID = response.data.data[0].categoryID;
                        }

                        if (!NullOrEmpty(response.data.data[0].productID)) {
                            p_ID = response.data.data[0].productID;
                        }

                        if (!NullOrEmpty(response.data.data[0].selectedUnitID)) {
                            u_ID = response.data.data[0].selectedUnitID;
                        }
                        setHSN(response.data.data[0].hsn);
                        setGstRate(response.data.data[0].gstRate);
                        setMaterialRate(response.data.data[0].rateWithMaterials);
                        setWithoutMaterialRate(response.data.data[0].rateWithoutMaterials);

                        setAlternativeWithMaterialRate(response.data.data[0].altRateWithMaterials);
                        setAlternativeWithoutMaterialRate(response.data.data[0].altRateWithoutMaterials);

                        setDisplay(response.data.data[0].display == true ? "Yes" : "No");
                        setArnID(response.data.data[0].activityID);

                        setShortSpecification(response.data.data[0].shortSpecification);
                        setSpecificationSP(response.data.data[0].specification);

                    }

                    setLoading(false);
                    FetchCategory(response.data.data[0].activityID, response.data.data[0].serviceID);
                    FetchServiceProductName(response.data.data[0].activityID, response.data.data[0].serviceID, response.data.data[0].categoryID);
                    FetchUnitOfSalesName(response.data.data[0].productID, response.data.data[0].selectedUnitID, 0, 0);

                }
            })
            .catch((e) => {
                setLoading(false);
            });
    };


    const FetchServiceName = () => {

        let params = {
            data: {
                Sess_UserRefno: cookies.dfc.UserID
            }
        };
        Provider.createDFContractor(Provider.API_URLS.getservicenameratecardform, params)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        response.data.data = APIConverter(response.data.data, "addratecard");
                        const serviceName: any = [];
                        response.data.data.map((data: any, i: number) => {
                            serviceName.push({
                                id: data.serviceID,
                                label: data.serviceName,
                            });
                        });
                        setServiceNameFullData(serviceName);
                        if (s_ID > 0) {
                            let a = serviceName.filter((el) => {
                                return el.id === s_ID;
                            });
                            setSelectedServiceName(a[0].label);
                            setServiceNameID(s_ID);
                        }
                    }
                }
            })
            .catch((e) => { });
    };




    const FetchCategory = (arnID, serviceNameID) => {
        let params = {
            data: {
                Sess_UserRefno: cookies.dfc.UserID,
                service_refno: serviceNameID
            }
        };
        Provider.createDFContractor(Provider.API_URLS.getcategorynameratecardform, params)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        response.data.data = APIConverter(response.data.data);
                        const category: any = [];
                        response.data.data.map((data: any, i: number) => {
                            category.push({
                                id: data.id,
                                label: data.categoryName,
                            });
                        });
                        setCategoryDDData(category);
                        setCategoryFullData(response.data.data);
                        if (c_ID > 0) {
                            let a = category.filter((el) => {
                                return el.id === c_ID;
                            });

                            let b = response.data.data.filter((el) => {
                                return el.id === c_ID;
                            });
                            setSelectedCategory(a[0].label);
                            setCategoryID(a[0].id);
                        }
                    }
                }
            })
            .catch((e) => { });
    };

    const FetchHsnCode = (categoryID) => {
        let params = {
            data: {
                Sess_UserRefno: cookies.dfc.UserID,
                category_refno: categoryID
            }
        };
        Provider.createDFContractor(Provider.API_URLS.getcategorydataratecardform, params)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        response.data.data = APIConverter(response.data.data);
                        setHSN(response.data.data[0].hsnsacCode);
                        setGstRate(response.data.data[0].gstRate);
                    }
                }
            })
            .catch((e) => { });
    };


    const FetchServiceProductName = (arnID, serviceNameID, categoryID) => {
        let params = {
            data: {
                Sess_UserRefno: cookies.dfc.UserID,
                category_refno: categoryID
            }
            // ActivityID: arnID,
            // ServiceID: serviceNameID,
            // CategoryID: categoryID,
        };
        Provider.createDFContractor(Provider.API_URLS.getproductnameratecardform, params)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        response.data.data = APIConverter(response.data.data);
                        const serviceProduct: any = [];
                        response.data.data.map((data: any, i: number) => {
                            serviceProduct.push({
                                id: data.productID,
                                label: data.productName,
                            });
                        });

                        setServiceProductNameDDData(serviceProduct);
                        setServiceProductNameFullData(response.data.data);

                        if (p_ID > 0) {
                            let a = serviceProduct.filter((el) => {
                                return el.id === p_ID;
                            });

                            setServiceProductName(a[0].label)
                            setServiceProductNameID(a[0].id);
                            //setSelectedServiceProductName(a[0].label);
                        }
                    }
                }
            })
            .catch((e) => { });
    };

    

    const FetchUnitOfSalesName = (serviceProductNameID, selectedUnitID, MaterialRate, WithoutMaterialRate) => {
        debugger;
        let params = {
            data: {
                Sess_UserRefno: cookies.dfc.UserID,
                product_refno: serviceProductNameID
            }
            // ProductID: serviceProductNameID,
        };
        Provider.createDFContractor(Provider.API_URLS.getunitofsaleratecardform, params)
            .then((response: any) => {
            debugger;
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        debugger;
                        const unitSales: any = [];
                        response.data.data.map((data: any, i: number) => {
                            unitSales.push({
                                id: data.unitID,
                                label: data.unitName,
                            });
                        });
                        let selectedUID = 0;
                        setUnitOfSalesFullData(response.data.data);
                        let product = serviceProductNameFullData.filter((el: any) => {
                            return el.display && el.productID === serviceProductNameID;
                        });

                        setUnitOfSalesDDData(unitSales);
                        if (selectedUnitID !== null) {

                            if (selectedUnitID == response.data.data[0].unitID) {
                                setUnitOfSales(response.data.data[0].unitName);
                                setSelectedUnitID(response.data.data[0].unitID);
                                selectedUID = response.data.data[0].unitID;
                                setConversionRate(response.data.data[0].conversionRate);

                                setMaterialRate(product[0].rateWithMaterials);
                                setWithoutMaterialRate(product[0].rateWithoutMaterials);

                                setAlternativeWithMaterialRate((parseFloat(product[0].rateWithMaterials) * response.data.data[1].conversionRate).toFixed(2).toString());
                                setAlternativeWithoutMaterialRate((parseFloat(product[0].rateWithoutMaterials) * response.data.data[1].conversionRate).toFixed(2).toString());
                            }
                            else if (selectedUnitID == response.data.data[1].unitID) {

                                setUnitOfSales(response.data.data[1].unitName);
                                setSelectedUnitID(response.data.data[1].unitID);
                                selectedUID = response.data.data[1].unitID;
                                setConversionRate(response.data.data[1].conversionRate);

                                setMaterialRate((parseFloat(product[0].rateWithMaterials) * response.data.data[1].conversionRate).toFixed(2).toString());
                                setWithoutMaterialRate((parseFloat(product[0].rateWithoutMaterials) * response.data.data[1].conversionRate).toFixed(2).toString());

                                setAlternativeWithMaterialRate(((parseFloat(product[0].rateWithMaterials) * response.data.data[1].conversionRate) * response.data.data[0].conversionRate).toFixed(2).toString());
                                setAlternativeWithoutMaterialRate(((parseFloat(product[0].rateWithoutMaterials) * response.data.data[1].conversionRate) * response.data.data[0].conversionRate).toFixed(2).toString());
                            }
                        }

                        if (u_ID > 0) {
                            let a = unitSales.filter((el) => {
                                return el.id === u_ID;
                            });
                            setUnitOfSales(a[0].label);
                            setSelectedUnitID(a[0].id);
                        }
                    }
                }
            })
            .catch((e) => { });
    };

    const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplay((event.target as HTMLInputElement).value);
    };


    function ResetFields() {
        // setSelectedID(0);
        // setActionStatus("new");
        // setDataGridOpacity(1);
        // setDataGridPointer("auto");
        // setButtonDisplay("none");
        // setButtonLoading(false);
        // setAddCompanyName("");
        // setContactPerson("");
        // setContactMobileNo("");
        // setAddress("");
        // setPincode("");
        // setGst("");
        // setPan("");
        // setDisplay("");
        // serviceType[1]([
        //     { key: "Vendor", isSelected: false, id: 1 },
        //     { key: "Supplier", isSelected: false, id: 2 },
        //     { key: "Client", isSelected: false, id: 3 },
        // ]);
        // setServiceProvider("");
        setOpen(false);


    }

    const handleSubmitClick = () => {

        let isValid: boolean = true;

        if (selectedServiceName.trim() === "") {
            isValid = false;
            isSetServiceNameError(true);
            setServiceNameErrorText("Please Select Service Name");
        }

        if (selectedCategory.trim() === "") {
            isValid = false;
            isSetCategoryError(true);
            setCategoryErrorText("please Select Category ");
        }

        if (hsn.trim() === "") {
            isValid = false;
            isSetHSNError(true);
            setHSNErrorText("HSN / SAC Code can not be empty");
        }

        if (gstRate.toString().trim() === "") {
            isValid = false;
            isSetGstRateError(true);
            setGstRateErrorText("GST can not be empty");
        }

        if (serviceProductName.trim() === "") {
            isValid = false;
            isSetServiceProductNameError(true);
            setServiceProductNameErrorText("Please select Service Product");
        }

        if (unitOfSales.trim() === "") {
            isValid = false;
            isSetUnitOfSalesError(true);
            setUnitOfSalesErrorText("please Enter Unit of Sales ");
        }

        if (materialRate.toString().trim() === "") {
            isValid = false;
            isSetMaterialRateError(true);
            setMaterialRateErrorText("please Enter Material Rate");
        }

        if (alternativeWithMaterialRate.toString().trim() === "") {
            isValid = false;
            isSetAlternativeWithMaterialRateError(true);
            setAlternativeWithMaterialRateErrorText("please Enter Alternative rate");
        }

        if (withoutMaterialRate.toString().trim() === "") {
            isValid = false;
            isSetWithoutMaterialRateError(true);
            setWithoutMaterialRateErrorText("please Enter Without Material Rate");
        }
        if (alternativeWithoutMaterialRate.toString().trim() === "") {
            isValid = false;
            isSetAlternativeWithoutMaterialRateError(true);
            setAlternativeWithoutMaterialRateErrorText("please Enter Alternative rate");
        }

        if (isValid) {
            InsertUpdateData();
        }
    };

    const InsertUpdateData = () => {

        let params = {
            RateCardID: rateCardID,
            ProductID: serviceProductNameID,
            ActivityID: arnID,
            ServiceID: serviceNameID,
            CategoryID: categoryID,
            SelectedUnitID: selectedUnitID,
            UnitOfSalesID: unitOfSalesID,
            RateWithMaterials: materialRate,
            RateWithoutMaterials: withoutMaterialRate,
            AltRateWithMaterials: alternativeWithMaterialRate,
            AltRateWithoutMaterials: alternativeWithoutMaterialRate,
            AlternateUnitOfSales: 0,
            ShortSpecification: shortSpecification,
            Specification: specificationSP,
            Display: display === "Yes" ? true : false,
            ContractorID: cookies.dfc.UserID
        };

        if (actionStatus === "new") {
            Provider.create("master/insertupdatecontractorratecard", params)
                .then((response) => {

                    if (response.data && response.data.code === 200) {
                        navigate(`/contractor/ratecardsetup`);
                    } else if (response.data.code === 304) {
                        setSnackMsg(communication.ExistsError);
                        setOpen(true);
                        setSnackbarType("error");
                        ResetFields();
                    } else {
                        ResetFields();
                        setSnackMsg(communication.Error);
                        setSnackbarType("error");
                        setOpen(true);
                    }
                })
                .catch((e) => {
                    ResetFields();
                    setSnackMsg(communication.NetworkError);
                    setSnackbarType("error");
                    setOpen(true);
                });
        }
    };

    // const isSPRError = useState(false);
    // const sprError = useState("");

    // const serviceType = useState([
    //     { key: "Vendor", isSelected: false, id: 1 },
    //     { key: "Supplier", isSelected: false, id: 2 },
    //     { key: "Client", isSelected: false, id: 3 },
    // ]);

    // const design = (
    //     <>
    //#endregion 

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg" >
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={4} sm={8} md={12}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4">RATE CARD </Typography>
                            <Button variant="contained" startIcon={<VisibilityIcon sx={{ marginRight: 1 }} />} onClick={() => navigate("/contractor/ratecardsetup")}>View List</Button>
                        </Stack>

                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">RATE CARD (ADD)</Typography>
                    </Grid>
                    <Grid item md={9} >
                        <Grid container sx={{ mt: 2 }} alignItems="center" >
                            <Grid item md={3}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b><label style={{ color: "#ff0000" }}>*</label>Service Name</b>
                                </Typography>
                            </Grid>
                            <Grid item md={8}>
                                <FormControl fullWidth size="small" error={isServiceNameError}>
                                    <Autocomplete
                                        fullWidth
                                        options={serviceNameFullData}
                                        //sx={{ width: 300 }}
                                        onChange={(event: React.SyntheticEvent, value: any) => {
                                            isSetServiceNameError(false);
                                            setServiceNameError("");
                                            if (value !== null) {
                                                setSelectedServiceName(value.label);
                                                setServiceNameID(value.id);
                                            }
                                            FetchCategory(arnID, value.id);
                                        }}
                                        value={selectedServiceName}
                                        renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isServiceNameError} helperText={serviceNameError} />}
                                    />
                                    <FormHelperText>{serviceNameError}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 2 }} alignItems="center" >
                            <Grid item md={3}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b><label style={{ color: "#ff0000" }}>*</label>Category Name</b>
                                </Typography>
                            </Grid>
                            <Grid item md={8}>
                                <FormControl fullWidth size="small" error={isCategoryError}>
                                    <Autocomplete
                                        fullWidth
                                        options={categoryDDData}
                                        //sx={{ width: 300 }}
                                        onChange={(event: React.SyntheticEvent, value: any) => {
                                            isSetCategoryError(false);
                                            setCategoryError("");
                                            if (value !== null) {
                                                setSelectedCategory(value.label);
                                                setCategoryID(value.id);
                                                
                                                FetchHsnCode(value.id);
                                                FetchServiceProductName(arnID, serviceNameID, value.id);
                                            }

                                        }}
                                        value={selectedCategory}
                                        renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isCategoryError} helperText={categoryError} />}
                                    />
                                    <FormHelperText>{categoryError}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 2 }} alignItems="center">
                            <Grid item md={3}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b><label style={{ color: "#ff0000" }}>*</label>HSN / SAC Code</b>
                                </Typography>
                            </Grid>
                            <Grid item md={3}>
                                <TextField
                                    sx={{ background: "#e5e5e5" }}
                                    fullWidth
                                    disabled={true}
                                    variant="outlined"
                                    size="small"
                                    error={isHsnError}
                                    helperText={hsnErrorText}
                                    value={hsn}
                                />
                            </Grid>
                            <Grid item md={3} >
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b style={{ float: "right" }}><label style={{ color: "#ff0000" }}>*</label>GST Rate (%)</b>
                                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <TextField
                                    fullWidth
                                    disabled={true}
                                    variant="outlined"
                                    size="small"
                                    sx={{ background: "#e5e5e5" }}

                                    error={isGstRateError}
                                    helperText={gstRateErrorText}
                                    value={gstRate}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 2 }} alignItems="center" >
                            <Grid item md={3}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b><label style={{ color: "#ff0000" }}>*</label>Service Product Name</b>
                                </Typography>
                            </Grid>
                            <Grid item md={8}>
                                <FormControl fullWidth size="small" error={isServiceProductNameError}>
                                    <Autocomplete
                                        fullWidth
                                        options={serviceProductNameDDData}
                                        //sx={{ width: 300 }}
                                        onChange={(event: React.SyntheticEvent, value: any) => {
                                            isSetServiceProductNameError(false);
                                            setServiceProductNameError("");
                                            if (value !== null) {
                                                setServiceProductName(value.label)
                                                setServiceProductNameID(value.id);

                                                let product = serviceProductNameFullData.filter((el: any) => {
                                                    return el.display && el.productID === value.id;
                                                });

                                                if (product != null) {

                                                    setSelectedUnitID(product[0].selectedUnitID);
                                                    setSpecificationSP(product[0].specification);
                                                    setShortSpecification(product[0].shortSpecification);
                                                    setMaterialRate(product[0].rateWithMaterials);
                                                    setWithoutMaterialRate(product[0].rateWithoutMaterials);
                                                }

                                                FetchUnitOfSalesName(value.id, product[0].selectedUnitID, product[0].rateWithMaterials, product[0].rateWithoutMaterials);
                                            }
                                        }}
                                        value={serviceProductName}
                                        renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isServiceProductNameError} helperText={serviceProductNameError} />}
                                    />
                                    <FormHelperText>{serviceProductNameError}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 2 }} alignItems="center" >
                            <Grid item md={3}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b><label style={{ color: "#ff0000" }}>*</label>Unit of Sales</b>
                                </Typography>
                            </Grid>
                            <Grid item md={8}>
                                <FormControl fullWidth size="small" error={isUnitOfSalesError}>
                                    <Autocomplete
                                        fullWidth
                                        options={unitOfSalesDDData}
                                        //sx={{ width: 300 }}
                                        onChange={(event: React.SyntheticEvent, value: any) => {

                                            isSetUnitOfSalesError(false);
                                            if (value !== null) {
                                                setUnitOfSales(value.label);
                                                setSelectedUnitID(value.id);

                                                let product = serviceProductNameFullData.filter((el: any) => {
                                                    return el.display && el.productID === serviceProductNameID;
                                                });

                                                if (value.id == unitOfSalesFullData[0].unitID) {

                                                    setMaterialRate(product[0].rateWithMaterials);
                                                    setWithoutMaterialRate(product[0].rateWithoutMaterials);

                                                    setAlternativeWithMaterialRate((parseFloat(product[0].rateWithMaterials) * unitOfSalesFullData[1].conversionRate).toFixed(2).toString());
                                                    setAlternativeWithoutMaterialRate((parseFloat(product[0].rateWithoutMaterials) * unitOfSalesFullData[1].conversionRate).toFixed(2).toString());
                                                }
                                                else if (value.id == unitOfSalesFullData[1].unitID) {

                                                    setMaterialRate((parseFloat(product[0].rateWithMaterials) * unitOfSalesFullData[1].conversionRate).toFixed(2).toString());
                                                    setWithoutMaterialRate((parseFloat(product[0].rateWithoutMaterials) * unitOfSalesFullData[1].conversionRate).toFixed(2).toString());

                                                    setAlternativeWithMaterialRate(((parseFloat(product[0].rateWithMaterials) * unitOfSalesFullData[1].conversionRate) * unitOfSalesFullData[0].conversionRate).toFixed(2).toString());
                                                    setAlternativeWithoutMaterialRate(((parseFloat(product[0].rateWithoutMaterials) * unitOfSalesFullData[1].conversionRate) * unitOfSalesFullData[0].conversionRate).toFixed(2).toString());
                                                }
                                            }
                                        }}
                                        value={unitOfSales}
                                        renderInput={(params) => <TextField variant="outlined" {...params} label="" size="small" error={isUnitOfSalesError} helperText={unitOfSalesError} />}
                                    />
                                    <FormHelperText>{unitOfSalesError}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 2 }} alignItems="center">
                            <Grid item md={3}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b><label style={{ color: "#ff0000" }}>*</label>WITH MATERIALS Rate / Unit</b>
                                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {

                                        setMaterialRate((e.target as HTMLInputElement).value);
                                        isSetMaterialRateError(false);
                                        setMaterialRateErrorText("");
                                    }}
                                    error={isMaterialRateError}
                                    helperText={materialRateErrorText}
                                    value={materialRate}
                                />
                            </Grid>
                            <Grid item md={4} >
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b style={{ float: "right" }}><label style={{ color: "#ff0000" }}>*</label>Alternate Rate / Unit </b>
                                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    disabled={true}
                                    onChange={(e) => {
                                        setAlternativeWithMaterialRate((e.target as HTMLInputElement).value);
                                        isSetAlternativeWithMaterialRateError(false);
                                        setAlternativeWithMaterialRateErrorText("");
                                    }}
                                    error={isAlternativeWithMaterialRateError}
                                    helperText={alternativeWithMaterialRateErrorText}
                                    value={alternativeWithMaterialRate}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 2 }} alignItems="center">
                            <Grid item md={3}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b><label style={{ color: "#ff0000" }}>*</label>WITHOUT MATERIALS Rate / Unit</b>
                                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setWithoutMaterialRate((e.target as HTMLInputElement).value);
                                        isSetWithoutMaterialRateError(false);
                                        setWithoutMaterialRateErrorText("");
                                    }}
                                    error={isWithoutMaterialRateError}
                                    helperText={withoutMaterialRateErrorText}
                                    value={withoutMaterialRate}
                                />
                            </Grid>
                            <Grid item md={4} >
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b style={{ float: "right" }}><label style={{ color: "#ff0000" }}>*</label>Alternate Rate / Unit </b>
                                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    disabled={true}
                                    size="small"
                                    onChange={(e) => {
                                        setAlternativeWithoutMaterialRate((e.target as HTMLInputElement).value);
                                        isSetAlternativeWithoutMaterialRateError(false);
                                        setAlternativeWithoutMaterialRateErrorText("");
                                    }}
                                    error={isAlternativeWithoutMaterialRateError}
                                    helperText={alternativeWithoutMaterialRateErrorText}
                                    value={alternativeWithoutMaterialRate}
                                />
                            </Grid>
                        </Grid>

                        <Grid container sx={{ mt: 2 }} alignItems="center" >
                            <Grid item md={3}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b>Short Specification</b>
                                </Typography>
                            </Grid>
                            <Grid item md={8}>
                                <TextField
                                    fullWidth
                                    id="filled-textarea"
                                    placeholder=""
                                    multiline
                                    maxRows={3}
                                    variant="outlined"
                                    onChange={(e) => {
                                        setShortSpecification((e.target as HTMLInputElement).value);
                                        isSetShortSpecificationError(false);
                                        setShortSpecificationErrorText("");
                                    }}
                                    error={isShortSpecificationError}
                                    helperText={shortSpecificationErrorText}
                                    value={shortSpecification}

                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 2 }} alignItems="center" >
                            <Grid item md={3}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b>Specification of Service Provider</b>
                                </Typography>
                            </Grid>
                            <Grid item md={8}>
                                <TextField
                                    fullWidth
                                    id="filled-textarea"
                                    placeholder=""
                                    multiline
                                    maxRows={3}
                                    variant="outlined"
                                    onChange={(e) => {
                                        setSpecificationSP((e.target as HTMLInputElement).value);
                                        isSetSpecificationSPError(false);
                                        setSpecificationSPErrorText("");
                                    }}
                                    error={isSpecificationSPError}
                                    helperText={specificationSPErrorText}
                                    value={specificationSP}

                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                            <Grid item sm={3}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    <b >  Dispaly</b>
                                </Typography>
                            </Grid>
                            <Grid item sm={8}>
                                <FormControl>
                                    <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 2, mb: 10 }} alignItems="center" direction="row" justifyContent="center">
                        <Button variant="contained" onClick={handleSubmitClick}>Submit</Button>
                    </Grid>
                </Grid>

            </Container>
        </Box >
    );
};

export default AddRateCard;
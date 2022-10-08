
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
import { GetStringifyJson } from "../../../utils/CommonFunctions";



// type Source = {
//     id: number,
//     label: string
// }
// const sources = ['Company', 'Self'];
// const sourceOptions = sources.map((skill, index) => ({
//     id: index + 1,
//     label: skill
// }))

// type Category = {
//     id: number,
//     label: string
// }
// const categorys = ['apple', 'ball'];
// const categoryOptions = categorys.map((cat, index) => ({
//     id: index + 1,
//     label: cat
// }))


let s_ID = 0, c_ID = 0, sp_ID = 0, us_ID = 0;

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

    // const navigate = useNavigate();
    // const [source, setSource] = useState<Source | null>(null);
    // console.log(source)
    // const [category, setCategory] = useState<Source | null>(null);
    // console.log(category)

    // #region Variable

    const [serviceName, setServiceName] = useState("--Select--");
    const [serviceNameID, setServiceNameID] = useState<number>(0);
    const [serviceNameError, setServiceNameError] = useState("");
    const [selectedServiceName, setSelectedServiceName] = useState("");
    const [isServiceNameError, isSetServiceNameError] = useState(false);
    const [serviceNameErrorText, setServiceNameErrorText] = useState("");
    const [serviceNameFullData, setServiceNameFullData] = useState([]);

    const [category, setCategory] = useState("--Select--");
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

    const [alternativeUnit, setAlternativeUnit] = React.useState("");
    const [alternativeUnitErrorText, setAlternativeUnitErrorText] = useState("");
    const [isAlternativeUnitError, isSetAlternativeUnitError] = useState(false);

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
        FetchActvityRoles();
    }, []);

    const FetchActvityRoles = () => {
        Provider.getAll("master/getmainactivities")
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        response.data.data = response.data.data.filter((el: any) => {
                            return el.display && el.activityRoleName === "Contractor";
                        });
                        setArnID(response.data.data[0].id);
                    }

                    FetchServiceName();
                }
            })
            .catch((e) => { });
    };

    const FetchServiceName = () => {
        let params = {
            ContractorID: cookies.dfc.UserID,
        };
        Provider.getAll(`master/getcontractoractiveservices?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
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


    const FetchCategory = (serviceNameID) => {
        let params = {
            ActivityID: arnID,
            ServiceID: serviceNameID,
        };
        Provider.getAll(`master/getcategoriesbyserviceid?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
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
                            setSelectedCategory(a[0].label);
                        }
                    }
                }
            })
            .catch((e) => { });
    };

    const FetchServiceProductName = (categoryID) => {
        let params = {
            ActivityID: arnID,
            ServiceID: serviceNameID,
            CategoryID: categoryID,
        };

        Provider.getAll(`master/getproductsbycategoryid?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        const serviceProduct: any = [];
                        response.data.data.map((data: any, i: number) => {
                            serviceProduct.push({
                                id: data.productID,
                                label: data.productName,
                            });
                        });
                        setServiceProductNameDDData(serviceProduct);
                        setServiceProductNameFullData(response.data.data);
                        if (sp_ID > 0) {
                            let a = serviceProduct.filter((el) => {
                                return el.id === sp_ID;
                            });
                            setSelectedServiceProductName(a[0].label);
                        }
                    }
                }
            })
            .catch((e) => { });
    };

    const Conversion = (conversion, WithMaterialRate, WithoutMaterialRate, SelectedUnit, UnitData) => {

        if (SelectedUnit == UnitData.unit1ID) {
            
                                                    
        }
        else if (SelectedUnit == UnitData.unit2ID) {
            //  /
        }

        // setAlternativeWithMaterialRate(alternateWithRate.toString());
        //     setAlternativeWithoutMaterialRate(alternateWithoutRate.toString());


    }


    const FetchUnitOfSalesName = (serviceProductNameID, selectedUnitID) => {
        debugger;
        let params = {
            ProductID: serviceProductNameID,
        };
        Provider.getAll(`master/getunitbyproductid?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                debugger;
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        const unitSales: any = [];
                        response.data.data.map((data: any, i: number) => {
                            unitSales.push({
                                id: data.id,
                                label: data.productName,
                            });
                        });
                        setUnitOfSalesFullData(response.data.data);
                        const units = response.data.data.map((data: any) => data.displayUnit);

                        setUnitOfSalesDDData(units[0].split(" / "));

                        if (selectedUnitID !== null) {
                            if (selectedUnitID == response.data.data[0].unit1ID) {
                                setUnitOfSales(response.data.data[0].unit1Name);
                            }
                            else if (selectedUnitID == response.data.data[0].unit2ID) {
                                setUnitOfSales(response.data.data[0].unit2Name);
                            }
                        }

                        if (us_ID > 0) {
                            let a = unitSales.filter((el) => {
                                return el.id === us_ID;
                            });
                            setSelectedUnitOfSales(a[0].label);

                        }
                        else if (serviceProductNameID !== 0) {
                            let a = unitSales.filter((el) => {
                                return el.id === serviceProductNameID;
                            });
                            setSelectedUnitOfSales(a[0].label);
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

        if (serviceName.trim() === "") {
            isValid = false;
            isSetServiceNameError(true);
            setServiceNameErrorText("Please Select Service Name");
        }


        if (category.trim() === "") {
            isValid = false;
            isSetCategoryError(true);
            setCategoryErrorText("please Select Category ");
        }

        if (serviceProductName.trim() === "") {
            isValid = false;
            isSetServiceProductNameError(true);
            setServiceProductNameErrorText("please Enter Address ");
        }

        if (unitOfSales.trim() === "") {
            isValid = false;
            isSetUnitOfSalesError(true);
            setUnitOfSalesErrorText("please Enter Unit of Sales ");
        }

        // if (materialRate.trim() === "") {
        //     isValid = false;
        //     isSetMaterialRateError(true);
        //     setAlternativeRateErrorText("please Enter Material Rate ");
        // }

        // if (alternativeRate.trim() === "") {
        //     isValid = false;
        //     isSetAlternativeRateError(true);
        //     setServiceProductNameErrorText("please Enter Alternative rate ");
        // }

        if (withoutMaterialRate.trim() === "") {
            isValid = false;
            isSetWithoutMaterialRateError(true);
            setWithoutMaterialRateErrorText("please Enter Address ");
        }
        if (alternativeUnit.trim() === "") {
            isValid = false;
            isSetAlternativeUnitError(true);
            setAlternativeUnitErrorText("please Enter Address ");
        }



        // let blankData = serviceType[0].filter((el) => el.isSelected);

        if (isValid) {
            InsertUpdateData();
        }
    };

    const InsertUpdateData = () => {
        if (actionStatus === "new") {
            Provider.create("master/insertupdatecontractorratecard", {
                RateCardID: rateCardID,
                ProductID: serviceProductNameID,
                ActivityID: arnID,
                ServiceID: serviceNameID,
                CategoryID: categoryID,
                SelectedUnitID: selectedUnitOfSales,
                UnitOfSalesID: unitOfSalesID,
                RateWithMaterials: materialRate,
                RateWithoutMaterials: withoutMaterialRate,
                AlternateUnitOfSales: alternativeUnit,
                ShortSpecification: shortSpecification,
                Specification: specificationSP,
                Display: display,
                ContractorID: cookies.dfc.UserID
            })
                .then((response) => {
                    if (response.data && response.data.code === 200) {
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
        // else if (actionStatus === "edit") {
        //   Provider.create("servicecatalogue/updateworkfloor", {
        //     // ID: selectedID,
        //     WorkFloorName: paramWorkfloorName,
        //     Display: checked,
        //   })
        //     .then((response) => {
        //       if (response.data && response.data.code === 200) {
        //         FetchData("updated");
        //       }else if (response.data.code === 304) {
        //         setSnackMsg(communication.ExistsError);
        //         setOpen(true);
        //         setSnackbarType("error");
        //         ResetFields();
        //       }  else {
        //         ResetFields();
        //         setSnackMsg(communication.Error);
        //         setSnackbarType("error");
        //         setOpen(true);
        //       }
        //     })
        //     .catch((e) => {
        //       ResetFields();
        //       setSnackMsg(communication.NetworkError);
        //       setSnackbarType("error");
        //       setOpen(true);
        //     });
        // }
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
                            <Button variant="contained" startIcon={<VisibilityIcon sx={{ marginRight: 1 }} />} onClick={() => navigate("/master/ratecardsetup")}>View</Button>
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
                                            FetchCategory(value.id);
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

                                                let c = categoryFullData.filter((el: any) => {
                                                    return el.display && el.id === value.id;
                                                });

                                                setHSN(c[0].hsnsacCode);
                                                setGstRate(c[0].gstRate);
                                                FetchServiceProductName(value.id);
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
                                    fullWidth
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
                                    variant="outlined"
                                    size="small"

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

                                                let p = serviceProductNameFullData.filter((el: any) => {
                                                    return el.display && el.productID === value.id;
                                                });

                                                if (p != null) {

                                                    setConversionRate(p[0].conversionRate);
                                                    setSpecificationSP(p[0].specification);
                                                    setShortSpecification(p[0].shortSpecification);
                                                    setMaterialRate(p[0].rateWithMaterials);
                                                    setWithoutMaterialRate(p[0].rateWithoutMaterials);



                                                    let alternateWithRate = parseFloat(p[0].conversionRate) * parseFloat(p[0].rateWithMaterials);
                                                    let alternateWithoutRate = parseFloat(p[0].conversionRate) * parseFloat(p[0].rateWithoutMaterials);

                                                    setAlternativeWithMaterialRate(alternateWithRate.toString());
                                                    setAlternativeWithoutMaterialRate(alternateWithoutRate.toString());
                                                }

                                                FetchUnitOfSalesName(value.id, p[0].selectedUnitID);
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
                                            debugger;
                                            isSetUnitOfSalesError(false);
                                            setSelectedUnitOfSales("");
                                            if (value !== null) {
                                                setUnitOfSales(value.label);
                                                setUnitOfSalesID(value.id);



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
                                    <b style={{ float: "right" }}><label style={{ color: "#ff0000" }}>*</label>Alternate Rate / Unit</b>
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
                                    <b style={{ float: "right" }}><label style={{ color: "#ff0000" }}>*</label>Alternate Rate / Unit</b>
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
                                    <b><label style={{ color: "#ff0000" }}>*</label>Short Specification</b>
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
                                    <b><label style={{ color: "#ff0000" }}>*</label>Specification of Service Provider</b>
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
                        <Grid container sx={{ mt: 2 }} alignItems="center">
                            {/* <FormControl component="fieldset" error={isSPRError[0]}>
                            <FormLabel component="legend">Service Provider Role</FormLabel>
                            <FormGroup aria-label="position" row>
                                {serviceType[0].map((data, index) => {
                                return (
                                    <FormControlLabel
                                    value={data.id}
                                    control={
                                        <Checkbox
                                        checked={data.isSelected}
                                        tabIndex={-1}
                                        onClick={() => {
                                            isSPRError[1](false);
                                            sprError[1]("");
                                            const newChecked = [...serviceType[0]];
                                            newChecked.find((item, i) => {
                                            if (item.id === data.id) {
                                                item.isSelected = !item.isSelected;
                                            }
                                            });
                                            serviceType[1](newChecked);
                                        }}
                                        />
                                    }
                                    label={data.key}
                                    labelPlacement="end"
                                    />
                                );
                                })}
                             </FormGroup>
                            <FormHelperText>{sprError[0]}</FormHelperText>
                        </FormControl> */}
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
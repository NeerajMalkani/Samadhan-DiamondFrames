
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


let s_ID = 0, c_ID = 0, sp_ID = 0 ,us_ID =0;

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

    const [unitOfSales, setUnitOfSales] = useState("--Select--");
    const [unitOfSalesID, setUnitOfSalesID] = useState<number>(0);
    const [unitOfSalesError, setUnitOfSalesError] = useState("");
    const [selectedUnitOfSales, setSelectedUnitOfSales] = useState("");
    const [isUnitOfSalesError, isSetUnitOfSalesError] = useState(false);
    const [unitOfSalesErrorText, setUnitOfSalesErrorText] = useState("");
    const [unitOfSalesFullData, setUnitOfSalesFullData] = useState([]);

    const [materialRate, setMaterialRate] = React.useState("");
    const [materialRateErrorText, setMaterialRateErrorText] = useState("");
    const [isMaterialRateError, isSetMaterialRateError] = useState(false);

    const [alternativeRate, setAlternativeRate] = React.useState("");
    const [alternativeRateErrorText, setAlternativeRateErrorText] = useState("");
    const [isAlternativeRateError, isSetAlternativeRateError] = useState(false);

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

    const [display, setDisplay] = React.useState("Yes");

    const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [arnID, setArnID] = useState<number>(0);
    //#endregion

    useEffect(() => {
        FetchData("");
        FetchServiceName();
        FetchCategory();
        FetchServiceProductName();
        FetchUnitOfSalesName();

    }, []);

    const handleServiceProductNameChange = (event: SelectChangeEvent) => {
        let locationName: string = event.target.value;
        let ac = serviceProductNameFullData.find((el) => el.locationName === locationName);
        if (ac !== undefined) {
            setServiceProductName(locationName);
            setServiceProductNameID(ac?.id);
            isSetServiceProductNameError(false);
            setServiceProductNameError("");
        }
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        let locationName: string = event.target.value;
        let ac = categoryFullData.find((el) => el.locationName === locationName);
        if (ac !== undefined) {
            setCategory(locationName);
            setCategoryID(ac?.id);
            isSetCategoryError(false);
            setCategoryError("");
        }
    };

    const handleServiceNameChange = (event: SelectChangeEvent) => {
        let locationName: string = event.target.value;
        let ac = serviceNameFullData.find((el) => el.locationName === locationName);
        if (ac !== undefined) {
            setServiceName(locationName);
            setServiceNameID(ac?.id);
            isSetServiceNameError(false);
            setServiceNameError("");
        }
    };

    const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplay((event.target as HTMLInputElement).value);
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
                                id: data.id,
                                label: data.locationName,
                            });
                        });
                        setServiceNameFullData(serviceName);
                        if (s_ID > 0) {
                            let a = serviceName.filter((el) => {
                                return el.id === s_ID;
                            });
                            setSelectedServiceName(a[0].label);
                        }
                    }
                }
            })
            .catch((e) => { });
    };

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
                }
            })
            .catch((e) => { });
    };

    const FetchCategory = () => {
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
                                label: data.locationName,
                            });
                        });
                        setCategoryFullData(category);
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

    const FetchServiceProductName = () => {
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
                                id: data.id,
                                label: data.locationName,
                            });
                        });
                        setServiceProductNameFullData(serviceProduct);
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

    const FetchUnitOfSalesName = () => {
        let params = {
            AddedByUserID: cookies.dfc.UserID,
        };

        Provider.getAll(`master/getuserbranchforemployee?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        const branchData: any = [];
                        response.data.data.map((data: any, i: number) => {
                            branchData.push({
                                id: data.id,
                                label: data.locationName,
                            });
                        });
                        setUnitOfSalesFullData(branchData);
                        if (us_ID > 0) {
                            let a = branchData.filter((el) => {
                                return el.id === us_ID;
                            });
                            setSelectedUnitOfSales(a[0].label);
                        }
                    }
                }
            })
            .catch((e) => { });
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

    const FetchData = (type: string) => {
        debugger;
        let params = {
            // AddedByUserID: cookies.dfc.UserID,
        };
        ResetFields();
        Provider.getAll(`contractorquotationestimation/getclients?${new URLSearchParams(GetStringifyJson(params))}`)

            .then((response: any) => {
                debugger;
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        const arrList = [...response.data.data];
                        arrList.map(function (a: any, index: number) {
                            a.display = a.display ? "Yes" : "No";
                            a.material = a.material ? "Create" : "Add";
                            let sr = { srno: index + 1 };
                            a = Object.assign(a, sr);
                        });
                        // setRateCardList(arrList);
                        // setRateCardListTemp(arrList);
                        // if (type !== "") {
                        //   setSnackMsg("Activity role " + type);
                        //   setOpen(true);
                        //   setSnackbarType("success");
                        // }
                    }
                } else {
                    setSnackbarType("info");
                    setSnackMsg(communication.NoData);
                    setOpen(true);
                }
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
                setSnackbarType("error");
                setSnackMsg(communication.NetworkError);
                setOpen(true);
            });
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

        if (materialRate.trim() === "") {
            isValid = false;
            isSetMaterialRateError(true);
            setAlternativeRateErrorText("please Enter Material Rate ");
        }

        if (alternativeRate.trim() === "") {
            isValid = false;
            isSetAlternativeRateError(true);
            setServiceProductNameErrorText("please Enter Alternative rate ");
        }

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
            // InsertData();
        }
    };


    const InsertData = (status: string, fileName: string) => {
        debugger;
        if (status.toLowerCase() === "success") {
            const params = {
                // ID: employeeID,
                // MobileNo: mobile.trim(),
                // AadharNo: aadhar.trim(),
                // FatherName: fatherName,
                // Address: address,
                // StateID: selectedStateID,
                // CityID: selectedCityID,
                // Pincode: pincode,
                // ProfilePhoto: fileName ? AWSImagePath + fileName : "",
                // BloodGroup: bloodGroupID,
                // DOB: DOB,
                // DOJ: DOJ,
                // EmergencyContactName: emergencyCName,
                // EmergencyContactNo: emergencyCNo,
                // IDCardValidity: CardValidity,
                // LoginActiveStatus: (login === "Yes") ? true : false,
                // BranchID: branchID,
                // DepartmentID: departmentID,
                // DesignationID: designationID,
                // EmployeeType: employeeType,
                // LastWorkDate: LastWorkingDate,
                // WagesType: NullOrEmpty(wagesType) ? 0 : wagesType === "Daily" ? 1 : 2,
                // Salary: salary,
                // AccountHolderName: accountHName,
                // AccountNumber: NullOrEmpty(accountNo) ? 0 : parseInt(accountNo),
                // BankName: bankName,
                // BranchName: bankBranchName,
                // IFSCCode: ifscCode,
            };
            debugger;
            Provider.create("master/updateemployeedetails", params)
                .then((response) => {
                    debugger;
                    if (response.data && response.data.code === 200) {

                        setSnackbarType("success");
                        setSnackMsg("Data Inserted successfully");

                        setOpen(false);
                    } else {
                        setSnackbarType("error");
                        setSnackMsg(communication.Error);
                        setOpen(true);
                    }
                    setButtonLoading(false);
                })
                .catch((e) => {
                    console.log(e);
                    setSnackbarType("error");
                    setSnackMsg(communication.NetworkError);
                    setOpen(true);
                    setButtonLoading(false);
                });
        } else {
            setSnackbarType("error");
            setSnackMsg(communication.Error);
            setOpen(true);
            setButtonLoading(false);
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
                                    options={categoryFullData}
                                    //sx={{ width: 300 }}
                                    onChange={(event: React.SyntheticEvent, value: any) => {
                                        isSetCategoryError(false);
                                        setCategoryError("");
                                        if (value !== null) {
                                            setSelectedCategory(value.label);
                                            setCategoryID(value.id);
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
                                onChange={(e) => {
                                    setHSN((e.target as HTMLInputElement).value);
                                    isSetHSNError(false);
                                    setHSNErrorText("");
                                }}
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
                                onChange={(e) => {
                                    setGstRate((e.target as HTMLInputElement).value);
                                    isSetGstRateError(false);
                                    setGstRateErrorText("");
                                }}
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
                                    options={serviceProductNameFullData}
                                    //sx={{ width: 300 }}
                                    onChange={(event: React.SyntheticEvent, value: any) => {
                                        isSetServiceProductNameError(false);
                                        setServiceProductNameError("");
                                        if (value !== null) {
                                            setServiceProductName(value.label);
                                            setServiceProductNameID(value.id);
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
                                    options={unitOfSalesFullData}
                                    //sx={{ width: 300 }}
                                    onChange={(event: React.SyntheticEvent, value: any) => {
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
                                onChange={(e) => {
                                    setAlternativeRate((e.target as HTMLInputElement).value);
                                    isSetAlternativeRateError(false);
                                    setAlternativeRateErrorText("");
                                }}
                                error={isAlternativeRateError}
                                helperText={alternativeRateErrorText}
                                value={alternativeRate}
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
                                size="small"
                                onChange={(e) => {
                                    setAlternativeUnit((e.target as HTMLInputElement).value);
                                    isSetAlternativeUnitError(false);
                                    setAlternativeUnitErrorText("");
                                }}
                                error={isAlternativeUnitError}
                                helperText={alternativeUnitErrorText}
                                value={alternativeUnit}
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
                    <Button variant="contained">Submit</Button>
                </Grid>
            </Grid>

        </Container>
    </Box >
)
};

export default AddRateCard;
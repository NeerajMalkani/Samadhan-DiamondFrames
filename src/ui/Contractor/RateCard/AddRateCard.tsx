
import {
    Box, Container, Grid, Typography, Stack, Button, TextField,
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




const AddRateCard = () => {
    const navigate = useNavigate();
    // const [source, setSource] = useState<Source | null>(null);
    // console.log(source)
    // const [category, setCategory] = useState<Source | null>(null);
    // console.log(category)

    // #region Variable
    const [loading, setLoading] = useState(true);

    const [serviceName, setServiceName] = useState("--Select--");
    const [serviceNameID, setServiceNameID] = useState<number>(0);
    const [serviceNameError, setServiceNameError] = useState("");
    const [selectedServiceName, setSelectedServiceName] = useState("");
    const [isServiceNameError, isSetServiceNameError] = useState(false);
    const [serviceNameFullData, setServiceNameFullData] = useState([]);

    const [category, setCategory] = useState("--Select--");
    const [categoryID, setCategoryID] = useState<number>(0);
    const [categoryError, setCategoryError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isCategoryError, isSetCategoryError] = useState(false);
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
    const [serviceProductNameFullData, setServiceProductNameFullData] = useState([]);

    const [unitOfSales, setUnitOfSales] = useState("--Select--");
    const [unitOfSalesID, setUnitOfSalesID] = useState<number>(0);
    const [unitOfSalesError, setUnitOfSalesError] = useState("");
    const [selectedUnitOfSales, setSelectedUnitOfSales] = useState("");
    const [isUnitOfSalesError, isSetUnitOfSalesError] = useState(false);
    const [unitOfSalesFullData, setUnitOfSalesFullData] = useState([]);

    const [materialRate, setMaterialRate] = React.useState("");
    const [materialRateErrorText, setMaterialRateErrorText] = useState("");
    const [isMaterialRateError, isSetMaterialRateError] = useState(false);

    const [alternativeRate, setAlternativeRate] = React.useState("");
    const [alternativeRateErrorText, setAlternativeRateErrorText] = useState("");
    const [isAletrnativeRateError, isSetAlternativeRateError] = useState(false);

    const [withoutMaterialRate, setWithoutMaterialRate] = React.useState("");
    const [withoutMaterialRateErrorText, setWithoutMaterialRateErrorText] = useState("");
    const [isWithoutMaterialRateError, isSetWithoutMaterialRateError] = useState(false);

    const [alternativeUnit, setAlternativeUnit] = React.useState("");
    const [alternativeUnitErrorText, setAlternativeUnitErrorText] = useState("");
    const [isAletrnativeUnitError, isSetAlternativeUnitError] = useState(false);

    const [shortSpecification, setShortSpecification] = React.useState("");
    const [shortSpecificatonErrorText, setShortSpecificationErrorText] = useState("");
    const [isShortSpecificationError, isSetShortSpecificationError] = useState(false);

    const [specificationSP, setSpecificationSP] = React.useState("");
    const [specificationSPErrorText, setSpecificationSPErrorText] = useState("");
    const [isSpecificationSPError, isSetSpecificationSPError] = useState(false);

    const [display, setDisplay] = React.useState("Yes");

    //#endregion

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
    const isSPRError = useState(false);
    const sprError = useState("");

    const serviceType = useState([
        { key: "Vendor", isSelected: false, id: 1 },
        { key: "Supplier", isSelected: false, id: 2 },
        { key: "Client", isSelected: false, id: 3 },
    ]);
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
                                <Typography><span style={{ color: "red" }}>*</span>Service Name</Typography>
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
                                <Typography><span style={{ color: "red" }}>*</span>Category Name</Typography>
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
                                <Typography>HSN / SAC Code</Typography>
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
                                <Typography sx={{ marginLeft: 4, textAlign: "right", marginRight: 3 }}>GST Rate <br />(%)</Typography>
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
                                <Typography sx={{ width: "80%", fontSize: "15px" }}><span style={{ color: "red" }}>*</span>Service Product Name</Typography>
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
                                <Typography><span style={{ color: "red" }}>*</span>Unit of Sales</Typography>
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
                                <Typography sx={{ width: "80%", fontSize: "14px" }}><span style={{ color: 'red' }}>*</span>WITH MATERIALS Rate / Unit</Typography>
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
                                <Typography sx={{ marginLeft: 4, textAlign: "right", marginRight: 3, fontSize: "14px" }}><span style={{ color: "red" }}>*</span>Alternate <br />Rate / Unit</Typography>
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
                                    error={isAletrnativeRateError}
                                    helperText={alternativeRateErrorText}
                                    value={alternativeRate}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 2 }} alignItems="center">
                            <Grid item md={3}>
                                <Typography sx={{ width: "80%", fontSize: "14px" }}><span style={{ color: 'red' }}>*</span>WITHOUT MATERIALS Rate / Unit</Typography>
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
                                <Typography sx={{ marginLeft: 4, textAlign: "right", marginRight: 3, fontSize: "12px" }}><span style={{ color: "red" }}>*</span>Alternate <br />Rate / Unit</Typography>
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
                                    error={isAletrnativeUnitError}
                                    helperText={alternativeUnitErrorText}
                                    value={alternativeUnit}
                                />
                            </Grid>
                        </Grid>

                        <Grid container sx={{ mt: 2 }} alignItems="center" >
                            <Grid item md={3}>
                                <Typography>Short Specification</Typography>
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
                                        isSetAlternativeUnitError(false);
                                        setShortSpecificationErrorText("");
                                    }}
                                    error={isShortSpecificationError}
                                    helperText={shortSpecificatonErrorText}
                                    value={shortSpecification}

                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 2 }} alignItems="center" >
                            <Grid item md={3}>
                                <Typography>Specification of Service Provider</Typography>
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
                                        <b style={{ float: "right" }}>Dispaly</b>
                                    </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <FormControl>
                                        <RadioGroup row name="row-radio-buttons-group" value={display} >
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
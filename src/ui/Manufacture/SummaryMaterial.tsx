import { Box, TextField, Button, Container, FormControl, InputAdornment, CircularProgress, FormControlLabel, Typography, Select, Grid, Menu, Snackbar, MenuItem, AlertColor, FormHelperText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import CheckIcon from "@mui/icons-material/Check";
import Checkbox from '@mui/material/Checkbox';
import { ArrowDropDown, FormatAlignJustify } from "@mui/icons-material";
import { border } from "@mui/system";
import { SelectChangeEvent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { BrandModel, CategoryModel, OpeningStockModel, productModel, ServiceModel, summaryMaterialModel } from "../../models/Model";
import Header from "../../components/Header";
import NoData from "../../components/NoData";
import { theme } from "../../theme/AppTheme";
import { openingProductColumn, summaryMaterialColumn } from "../../utils/tablecolumns";



let st_ID = 0, ct_ID = 0;


const SummaryMaterial = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
    const [CookieUserID, SetCookieUseID] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
            navigate(`/login`);
        } else {
            SetCookieUseID(cookies.dfc.UserID);
        }
    }, []);


    //#region Variables


    const [snackMsg, setSnackMsg] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = React.useState<number>(5);

    const [userID, setUserID] = useState(0);

    const [date, setDate] = useState<Date | null>(new Date());

    const [serviceName, setServiceName] = useState("--Select--");
    const [serviceNameID, setServiceNameID] = useState<number>(0);
    const [serviceNameError, setServiceNameError] = useState("");
    const [isServiceNameError, setIsStateNameError] = useState(false);
    const [serviceNameList, setServiceNameList] = useState<Array<ServiceModel>>([]);

    const [categoryName, setCategoryName] = useState("--Select--");
    const [categoryNameID, setCategoryNameID] = useState<number>(0);
    const [categoryNameError, setCategoryNameError] = useState("");
    const [isCategoryNameError, setIsCategoryNameError] = useState(false);
    const [categoryNameList, setCategoryNameList] = useState<Array<CategoryModel>>([]);

    const [brandName, setBrandName] = useState("--Select--");
    const [brandNameID, setBrandNameID] = useState<number>(0);
    const [brandNameError, setBrandNameError] = useState("");
    const [isBrandNameError, setIsBrandNameError] = useState(false);
    const [brandNameList, setBrandNameList] = useState<Array<BrandModel>>([]);

    const [productName, setProductName] = useState("--Select--");
    const [productNameID, setProductNameID] = useState<number>(0);
    const [productNameError, setProductNameError] = useState("");
    const [isProductNameError, setIsProductNameError] = useState(false);
    const [productNameList, setProductNameList] = useState<Array<productModel>>([]);

    const [totalProduct, setTotalProduct] = useState("");
    const [totalProductError, setTotalProductError] = useState("");
    const [isTotalProductError, setIsTotalProductError] = useState(false);

    const [weight, setWeight] = useState("");
    const [weightError, setWeightError] = useState("");
    const [isWeightError, setIsWeightError] = useState(false);

    const [actionStatus, setActionStatus] = React.useState<string>("new");
    const [selectedID, setSelectedID] = React.useState<number>(0);
    const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [display, setDisplay] = React.useState("Yes");

    const [openingStockList, setOpeningStockList] = useState<Array<OpeningStockModel>>([]);
    const [openingStockListTemp, setOpeningStockListTemp] = React.useState<Array<any>>([]);
    //#endregion


    //#region Functions
    useEffect(() => {
        // FetchUserData("");
        // FetchStates();
        //FetchCity();
    }, []);

    //   const FetchStates = () => {
    //     Provider.getAll("master/getstates")
    //       .then((response: any) => {
    //         if (response.data && response.data.code === 200) {
    //           if (response.data.data) {
    //             const stateData: any = [];
    //             response.data.data.map((data: any, i: number) => {
    //               stateData.push({
    //                 id: data.id,
    //                 label: data.stateName,
    //               });
    //             });
    //             setStateNameList(response.data.data);

    //             if (st_ID > 0) {
    //               let a = stateData.filter((el) => {
    //                 return el.id === st_ID;
    //               });
    //               setState(a[0].label);
    //             }

    //             FetchCity(st_ID);
    //           }
    //         }
    //       })
    //       .catch((e) => { });
    //   };

    //   const FetchCity = (stateID) => {
    //     debugger;
    //     let params = {
    //       ID: stateID,
    //     };
    //     Provider.getAll(`master/getcitiesbyid?${new URLSearchParams(GetStringifyJson(params))}`)
    //       .then((response: any) => {
    //         debugger;
    //         if (response.data && response.data.code === 200) {
    //           if (response.data.data) {
    //             const cityData: any = [];
    //             response.data.data.map((data: any, i: number) => {
    //               cityData.push({
    //                 id: data.id,
    //                 label: data.cityName,
    //               });
    //             });

    //             setCityNameList(response.data.data);
    //             if (ct_ID > 0) {
    //               let a = cityData.filter((el) => {
    //                 return el.id === ct_ID;
    //               });
    //               setCity(a[0].label);
    //             }
    //           }
    //           else {
    //             setCityNameList([]);
    //             setCity("");
    //             ct_ID=0;
    //             setCityID(0);
    //           }
    //         }
    //         else {
    //           setCityNameList([]);
    //             setCity("");
    //             ct_ID=0;
    //             setCityID(0);
    //         }
    //       })
    //       .catch((e) => { });
    //   };

    //   const FetchUserData = (type: string) => {
    //     debugger;
    //     let params = {
    //       UserID: cookies.dfc.UserID,
    //     };
    //     Provider.getAll(`master/getusergeneralprofile?${new URLSearchParams(GetStringifyJson(params))}`)
    //       .then((response: any) => {
    //         debugger;
    //         if (response.data && response.data.code === 200) {
    //           if (response.data.data) {
    //             const arrList = [...response.data.data];
    //             debugger;
    //             setUserID(arrList[0].userID);
    //             setCompanyName(arrList[0].companyName);
    //             setContactPerson(arrList[0].contactPersonName);
    //             setMobile(arrList[0].contactPersonNumber);
    //             setProfileAddress(arrList[0].addressLine);
    //             // setState(arrList[0].stateName);

    //             if (!NullOrEmpty(arrList[0].stateID)) {
    //               setStateID(arrList[0].stateID);
    //               st_ID = arrList[0].stateID;
    //             }

    //             if (!NullOrEmpty(arrList[0].cityID)) {
    //               setStateID(arrList[0].cityID);
    //               ct_ID = arrList[0].cityID;
    //             }

    //             setCityID(arrList[0].cityID);

    //             // if (arrList[0].stateID > 0) {
    //             //   debugger;
    //             //   FetchCity(arrList[0].stateID);
    //             //   setCity(arrList[0].cityName);
    //             //   setCityID(arrList[0].cityID);
    //             // }

    //             setPincode(arrList[0].pincode);
    //             setGst(arrList[0].gstNumber);
    //             setPan(arrList[0].pan);

    //             if (type !== "") {
    //               setSnackMsg("User " + type);
    //               setOpen(true);
    //               setSnackbarType("success");
    //             }
    //           }
    //         } else {
    //           setSnackMsg(communication.NoData);
    //           setOpen(true);
    //           setSnackbarType("info");
    //         }

    //         FetchStates();
    //         setLoading(false);
    //       })
    //       .catch((e) => {
    //         setLoading(false);
    //         setSnackMsg(communication.NetworkError);
    //         setSnackbarType("error");
    //         setOpen(true);
    //       });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   };

    const handleDateChange = (newValueDate: Date | null) => {
        debugger;
        setDate(newValueDate);
    };

    const handleSNChange = (event: SelectChangeEvent) => {
        debugger;
        let serviceName: string = event.target.value;
        let ac = serviceNameList.find((el) => el.serviceName === serviceName);
        if (ac !== undefined) {
            setServiceName(serviceName);
            setServiceNameID(ac?.id);
            setIsStateNameError(false);
            setServiceNameError("");

        }
    };

    const handleCNChange = (event: SelectChangeEvent) => {
        debugger;
        let categoryName: string = event.target.value;
        let ac = categoryNameList.find((el) => el.categoryName === categoryName);
        if (ac !== undefined) {
            setCategoryName(categoryName);
            setCategoryNameID(ac?.id);
            setIsCategoryNameError(false);
            setCategoryNameError("");

        }
    };

    const handleBNChange = (event: SelectChangeEvent) => {
        debugger;
        let brandName: string = event.target.value;
        let ac = brandNameList.find((el) => el.brandName === brandName);
        if (ac !== undefined) {
            setBrandName(brandName);
            setBrandNameID(ac?.id);
            setIsBrandNameError(false);
            setBrandNameError("");
        }
    };

    const handlePNChange = (event: SelectChangeEvent) => {
        debugger;
        let productName: string = event.target.value;
        let ac = productNameList.find((el) => el.productName === productName);
        if (ac !== undefined) {
            setProductName(productName);
            setProductNameID(ac?.id);
            setIsProductNameError(false);
            setProductNameError("");
        }
    };
    const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplay((event.target as HTMLInputElement).value);
    };

    //   const handleSubmitClick = () => {
    //     debugger;
    //     let isValid: Boolean = true;

    //     if (companyName.trim() === "") {
    //       isValid = false;
    //       setIsCompanyError(true);
    //       setCompanyError(communication.BlankCompanyName);
    //     }

    //     if (contactPerson.trim() === "") {
    //       isValid = false;
    //       setIsContactPersonError(true);
    //       setContactPersonError(communication.BlankContactPerson);
    //     }

    //     if (mobile.trim() === "") {
    //       isValid = false;
    //       setIsMobileError(true);
    //       setMobileError(communication.BlankMobile);
    //     }

    //     if (profileAddress.trim() === "") {
    //       isValid = false;
    //       setIsAddressError(true);
    //       setAddressError(communication.BlankAddress);
    //     }

    //     if (state.trim() === "--Select--") {
    //       isValid = false;
    //       setIsStateError(true);
    //       setStateError(communication.BlankState);
    //     }

    //     if (city.trim() === "--Select--") {
    //       isValid = false;
    //       setIsCityError(true);
    //       setCityError(communication.BlankCity);
    //     }

    //     if (pincode.toString().trim() === "") {
    //       isValid = false;
    //       setIsPincodeError(true);
    //       setPincodeError(communication.BlankBrandPrefix);
    //     }

    //     if (gst.trim() === "") {
    //       isValid = false;
    //       setIsGstError(true);
    //       setGstError(communication.BlankGst);
    //     }

    //     if (pan.trim() === "") {
    //       isValid = false;
    //       setIsPanError(true);
    //       setPanError(communication.BlankPan);
    //     }
    //     debugger;
    //     if (isValid) {
    //       InsertUpdateData();
    //     }
    //   };

    //   const InsertUpdateData = () => {
    //     debugger;
    //     if (actionStatus === "new") {
    //       Provider.create("master/updategeneraluserprofile", {
    //         UserID: userID,
    //         CompanyName: companyName,
    //         ContactPersonName: contactPerson,
    //         ContactPersonNumber: mobile,
    //         AddressLine: profileAddress,
    //         StateID: stateID,
    //         CityID: cityID,
    //         Pincode: pincode,
    //         GSTNumber: gst,
    //         PAN: pan,
    //       })
    //         .then((response) => {
    //           debugger;
    //           if (response.data && response.data.code === 200) {
    //             //FetchData("added");
    //           } else {
    //             setSnackMsg(communication.Error);
    //             setSnackbarType("error");
    //             setOpen(true);
    //           }
    //         })
    //         .catch((e) => {
    //           debugger;

    //           setSnackMsg(communication.NetworkError);
    //           setSnackbarType("error");
    //           setOpen(true);
    //         });
    //     }
    //   };

    //   const onChangeSearch = (query: string) => {
    //     setSearchQuery(query);
    //     if (query === '') {
    //       setBrandConversionValueListTemp(brandConversionValueList);
    //     } else {
    //       setBrandConversionValueListTemp(
    //           brandConversionValueList.filter((el: BrandConversionValueModel) => {
    //           return el.serviceName
    //             .toString()
    //             .toLowerCase()
    //             .includes(query.toLowerCase());
    //         })
    //       );
    //     }
    //   };

    //   const handelEditAndDelete = (
    //     type: string | null,
    //     a: BrandConversionValueModel | undefined
    //   ) => {
    //     if (type?.toLowerCase() === 'edit' && a !== undefined) {
    //       setDataGridOpacity(0.3);
    //       setDataGridPointer('none');
    //       // setDisplay(a.view_status);
    //       // setActivityName(a?.group_name);
    //       setSelectedID(a.id);
    //       setactivitynameError('');
    //       setIsActivitynameError(false);
    //       setButtonDisplay('unset');
    //       setActionStatus('edit');
    //     }
    //     // else if (type?.toLowerCase() === "delete" && a !== undefined) {
    //     //   setSelectedID(a.id);
    //     //   Provider.deleteAllParams("master/deleteactivityroles", { ID: a.id })
    //     //     .then((response) => {
    //     //       if (response.data && response.data.code === 200) {
    //     //         FetchData();
    //     //       } else {
    //     //         setSnackMsg("your request cannot be processed");
    //     //         setOpen(true);
    //     //       }
    //     //     })
    //     //     .catch((e) => {
    //     //       console.log(e);
    //     //       setSnackMsg("your request cannot be processed");
    //     //       setOpen(true);
    //     //     });
    //     // }
    //   };
    //#endregion 


    return (
        <Box sx={{ mt: 11 }}>
            <Header />
         
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant='h4'> Summary of Material</Typography>
                    </Grid>
                    <Grid item xs={2} sm={6}>
                        <Typography variant="h5">Summary of Material (Raw & Ready)</Typography>
                    </Grid>
                </Grid>


                <Grid
                    item
                    xs={4}
                    sm={8}
                    md={12}
                    sx={{
                        borderBottom: 1,
                        paddingBottom: '8px',
                        borderColor: 'rgba(0,0,0,0.12)',
                    }}
                >
                    {/* <Typography variant='h6'>Production Stock</Typography> */}
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                    {loading ? (
                        <Box
                            height='300px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            sx={{ m: 2 }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <div style={{ height: 500, width: '100%', marginBottom: '20px' }}>
                            {openingStockList.length === 0 ? (
                                <NoData
                                    Icon={<ListIcon sx={{ fontSize: 72, color: 'red' }} />}
                                    height='auto'
                                    text='No data found'
                                    secondaryText=''
                                    isButton={false}
                                />
                            ) : (
                                <>
                                    <Grid
                                        item
                                        xs={4}
                                        sm={8}
                                        md={12}
                                        sx={{
                                            alignItems: 'flex-end',
                                            justifyContent: 'flex-end',
                                            mb: 1,
                                            display: 'flex',
                                            mr: 1,
                                        }}
                                    >
                                        <TextField
                                            placeholder='Search'
                                            variant='outlined'
                                            size='small'
                                            onChange={(e) => {
                                                // onChangeSearch((e.target as HTMLInputElement).value);
                                            }}
                                            value={searchQuery}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <SearchIcon />
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
                                        rows={openingStockListTemp}
                                        columns={summaryMaterialColumn}
                                        pageSize={pageSize}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        onPageSizeChange={(newPageSize) =>
                                            setPageSize(newPageSize)
                                        }
                                        disableSelectionOnClick
                                        onCellClick={(
                                            param,
                                            e: React.MouseEvent<HTMLElement>
                                        ) => {
                                            const arrActivity = [...openingStockList];
                                            let a: summaryMaterialModel | undefined =
                                                arrActivity.find((el) => el.id === param.row.id);
                                            // handelEditAndDelete((e.target as any).textContent, a);
                                        }}
                                        sx={{
                                            '& .MuiDataGrid-columnHeaders': {
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                            },
                                            mb: 1,
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </Grid>
                
                
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="table-responsive mb-3">
                        <h3 className="panel-title panel-title-new">Total Available Material & Scraps</h3>
                        <hr/>
                        <table className="table table-bordered table-hover" id="DataGridTable1">
                            <thead className="thead-new" style={{   backgroundColor: theme.palette.primary.main,
                                     color: theme.palette.primary.contrastText,}}>
                                <tr>
                                    <th style={{textAlign:"center",color:"white "}}>
                                        Slitting Invoice Scrap Total
                                        <br></br>
                                    </th>
                                    <th style={{textAlign:"center",color:"white "}}>
                                       Total Scrap
                                      <br />
                                        <strong style={{fontSize:"10px"}}>
                                        (Slitting Invoice Scrap Total + Prodiction Done Scrap Total  + Opening Stock Scrap Total) - (Sales Scrap Total) 
                                        </strong>
                                       
                                    </th>
                                    <th style={{textAlign:"center",color:"white "}}>
                                        Total Material Available
                                        <br />
                                        <strong style={{fontSize:"10px"}}>
                                        (Available Raw Material Kg Total + Prodiction Done  Kg Total  + Total Scrap)
                                        </strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{textAlign:"center",fontWeight:"bold",fontSize:"14px"}}>395.91Kg</td>
                                    <td style={{textAlign:"center",fontWeight:"bold",fontSize:"14px"}}>410.10Kg</td>
                                    <td style={{textAlign:"center",fontWeight:"bold",fontSize:"14px"}}>26845.959Kg</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </Box>
    );
};

export default SummaryMaterial;

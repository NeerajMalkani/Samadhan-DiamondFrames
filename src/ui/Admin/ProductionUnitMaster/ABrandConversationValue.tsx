import { Alert, AlertColor, Box, Button, CircularProgress,  SelectChangeEvent, FormHelperText, Container,MenuItem, FormControl, Select, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../api/Provider";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { brandConversationValueColumns } from "../../../utils/tablecolumns";
import { communication } from "../../../utils/communication";
import { theme } from "../../../theme/AppTheme";
import { ServiceNameModel,CategoryModel,BrandNameModel ,BrandConversionValueModel} from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import ListIcon from "@mui/icons-material/List";
import NoData from "../../../components/NoData";
import { APIConverter } from "../../../utils/apiconverter";

const ABrandConversionValue = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");

  const [serviceName, setServiceName]  = useState("--Select--");
  const [serviceNameID, setServiceNameID] = useState<number>(0);
  const [serviceNameError, setServiceNameError] = useState("");
  const [isServiceNameError, setIsServiceNameError] = useState(false);
  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);

  const [categoryName, setCategoryName]  = useState("--Select--");
  const [categoryNameID, setCategoryNameID] = useState<number>(0);
  const [categoryNameError, setCategoryNameError] = useState("");
  const [isCategoryNameError, setIsCategoryNameError] = useState(false);
  const [categoryNameList, setCategoryNameList] = useState<Array<CategoryModel>>([]);

  const [brandName, setBrandName]  = useState("--Select--");
  const [brandNameID, setBrandNameID] = useState<number>(0);
  const [brandNameError, setBrandNameError] = useState("");
  const [isBrandNameError, setIsBrandNameError] = useState(false);
  const [brandNameList, setBrandNameList] = useState<Array<BrandNameModel>>([]);

  const [conversationValue, setConversationValue] = useState("");
  const [conversationValueError, setConversationValueError] = useState<boolean>(false);
  const [conversationValueErrorText, setConversationValueErrorText] = useState<string>("");

  const [brandConversationValueList, setBrandConversationValueList] =useState<Array<BrandConversionValueModel>>([]);
  const [brandConversationValueListTemp, setBrandConversationValueTemp] = React.useState<Array<any>>([]);

  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  //#endregion

  //#region Functions
  useEffect(() => {
    FetchData("");
  }, []);

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
  };

  const FetchData = (type: string) => {
    // ResetFields();
    // if (type !== "") {
    //   setSnackMsg("Service " + type);
    //   setOpen(true);
    //   setSnackbarType("success");
    // }
    // let params = {
    //   data: {
    //     Sess_UserRefno: "2",
    //     service_refno: "all",
    //   },
    // };
    // Provider.createDFAdmin(Provider.API_URLS.ServiceFromRefNo, params)
    //   .then((response: any) => {
    //     if (response.data && response.data.code === 200) {
    //       if (response.data.data) {
    //         response.data.data = APIConverter(response.data.data);
    //         const arrList = [...response.data.data];
    //         arrList.map(function (a: any, index: number) {
    //           //   a.id = a.service_refno;
    //           a.display = a.display === "1" ? "Yes" : "No";
    //           let sr = { srno: index + 1 };
    //           a = Object.assign(a, sr);
    //         });

    //         setServiceNamesList(arrList);
    //         setServiceNamesListTemp(arrList);
         
    //       }
    //     } else {
    //       setSnackMsg(communication.NoData);
    //       setOpen(true);
    //       setSnackbarType("info");
    //     }
    //     setLoading(false);
    //   })
    //   .catch((e) => {
    //     setLoading(false);
    //     setSnackMsg(communication.NetworkError);
    //     setSnackbarType("error");
    //     setOpen(true);
    //   });
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const onChangeSearch = (query: string) => {
    // setSearchQuery(query);
    // if (query === "") {
    //   setServiceNamesListTemp(serviceNamesList);
    // } else {
    //   setServiceNamesListTemp(
    //     serviceNamesList.filter((el: ServiceNameModel) => {
    //       return el.serviceName.toString().toLowerCase().includes(query.toLowerCase());
    //     })
    //   );
    // }
  };
  const handleSNChange = (event: SelectChangeEvent) => {
    // debugger;
    // let subCategoryName: string = event.target.value;
    // let ac = subCategoryNameList.find((el) => el.subCategoryName === subCategoryName);
    // if (ac !== undefined) {
    //     setSubCategoryName(subCategoryName);
    //     setSubCategoryNameID(ac?.id);
    //     setIsSubCategoryNameError(false);
    //     setSubCategoryNameError("");
    // }
  };
 
  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    // const IsTextFiledError = serviceName.trim() === "";
    // setservicenameError(IsTextFiledError ? communication.BlankServiceName : "");
    // setIsServicenameError(IsTextFiledError);
    // if (!IsTextFiledError) {
    //   InsertUpdateData(serviceName, display === "Yes");
    //   setDisplay("Yes");
    //   setServiceName("");
    //   setservicenameError("");
    //   setIsServicenameError(false);
    // }
  };

  const handleCancelClick = () => {
    // setDisplay("Yes");
    // setServiceName("");
    // setservicenameError("");
    // setIsServicenameError(false);
    // setButtonDisplay("none");
    // setDataGridOpacity(1);
    // setDataGridPointer("auto");
  };

  const handelEditAndDelete = (type: string | null, a: ServiceNameModel | undefined) => {
    // if (type?.toLowerCase() === "edit" && a !== undefined) {
    //   setDataGridOpacity(0.3);
    //   setDataGridPointer("none");
    //   setDisplay(a.display);
    //   setServiceName(a?.serviceName);
    //   setSelectedID(a.id);
    //   setservicenameError("");
    //   setIsServicenameError(false);
    //   setButtonDisplay("unset");
    //   setActionStatus("edit");
    // }
  };

  const InsertUpdateData = (paramServiceName: string, checked: boolean) => {
    // setButtonLoading(true);
    // if (actionStatus === "new") {
    //   Provider.createDFAdmin(Provider.API_URLS.ServiceNameCreate, {
    //     data: {
    //       Sess_UserRefno: "2",
    //       service_name: paramServiceName,
    //       production_unit: "1",
    //       view_status: checked ? 1 : 0,
    //     },
    //   })
    //     .then((response) => {
    //       if (response.data && response.data.code === 200) {
    //         FetchData("added");
    //       } else if (response.data.code === 304) {
    //         setSnackMsg(communication.ExistsError);
    //         setOpen(true);
    //         setSnackbarType("error");
    //         ResetFields();
    //       } else {
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
    // } else if (actionStatus === "edit") {
    //   Provider.createDFAdmin(Provider.API_URLS.ServiceNameUpdate, {
    //     data: {
    //       Sess_UserRefno: "2",
    //       service_refno: selectedID,
    //       service_name: paramServiceName,
    //       production_unit: "1",
    //       view_status: checked ? 1 : 0,
    //     },
    //   })
    //     .then((response) => {
    //       if (response.data && response.data.code === 200) {
    //         FetchData("updated");
    //       } else if (response.data.code === 304) {
    //         setSnackMsg(communication.ExistsError);
    //         setOpen(true);
    //         setSnackbarType("error");
    //         ResetFields();
    //       } else {
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


  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //#endregion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Brand Conversion Value</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Brand Conversion Value (Add/Edit)</Typography>
          </Grid>
          <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b><label style={{ color: "#ff0000" }}>*</label>Service Name</b>
                </Typography>
                <FormControl fullWidth size="small" error={isServiceNameError}>
              <Select value={serviceName} onChange={handleSNChange}>
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
              <FormHelperText>{serviceNameError}</FormHelperText>
            </FormControl>
            </Grid>
            <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b><label style={{ color: "#ff0000" }}>*</label>Category Name</b>
                </Typography>
                <FormControl fullWidth size="small" error={isCategoryNameError}>
              <Select value={categoryName} onChange={handleSNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {categoryNameList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.categoryName}>
                      {item.categoryName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{categoryNameError}</FormHelperText>
            </FormControl>
            </Grid>
            <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b><label style={{ color: "#ff0000" }}>*</label>Brand Name</b>
                </Typography>
                <FormControl fullWidth size="small" error={isBrandNameError}>
              <Select value={brandName} onChange={handleSNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {brandNameList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.brandName}>
                      {item.brandName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{brandNameError}</FormHelperText>
            </FormControl>
            </Grid>
          <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b><label style={{ color: "#ff0000" }}>*</label>Conversion Value</b>
            </Typography>
            <TextField
              fullWidth
              placeholder="Conversion Value"
              variant="outlined"
              size="small"
              value={conversationValue}
              error={conversationValueError}
              helperText={conversationValueErrorText}
              onChange={(e) => {
                setConversationValue(e.currentTarget.value);
                setConversationValueError(false);
                setConversationValueErrorText("");
              }}
            />
          </Grid>
          <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
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
          <Grid item xs={4} sm={8} md={12}>
            <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} style={{ display: buttonDisplay }} onClick={handleCancelClick}>
              Cancel
            </Button>
            <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
              Submit
            </LoadingButton>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Service List</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {brandConversationValueList.length === 0 ? (
                  <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
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
                    <DataGrid
                      style={{
                        opacity: dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      autoHeight={true}
                      rows={brandConversationValueListTemp}
                      columns={brandConversationValueColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...brandConversationValueList];
                        let a: BrandConversionValueModel | undefined = arrActivity.find((el) => el.id == param.row.id);
                        // handelEditAndDelete((e.target as any).textContent, a);
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ABrandConversionValue;

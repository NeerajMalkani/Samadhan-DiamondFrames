import {
  Alert,
  AlertColor,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { Theme, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { categoryColumns } from "../../../utils/tablecolumns";
import Provider from "../../../api/Provider";
import { ActivityRoleNameModel, DFCategoryModel, ServiceNameModel, UnitOfSalesModel, DFUnitOfSalesModel1 } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { communication } from "../../../utils/communication";
import { LoadingButton } from "@mui/lab";
import { ValidateGSTRate } from "../../../utils/validations";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { APIConverter } from "../../../utils/apiconverter";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 },
  },
};

function getStyles(name: string, unitSales: readonly string[], theme: Theme) {
  return {
    fontWeight: unitSales.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const CategoryPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  const [loading, setLoading] = useState(true);
  const [arn, setArn] = useState("--Select--");
  const [arnID, setArnID] = useState<number>(0);
  const [sn, setSn] = useState("--Select--");
  const [sn1, setSn1] = useState("--Select--");
  const [snID, setSnID] = useState<number>(0);
  const [cn, setCn] = useState("");
  const [hsn, setHsn] = useState("");
  const [gst, setGst] = useState("");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const [unitsOfSales, setUnitsOfSales] = useState<string[]>([]);
  const [unitsOfSalesID, setUnitsOfSalesID] = useState<number[]>([]);

  const [personName, setPersonName] = React.useState<string[]>([]);

  const [display, setDisplay] = useState("Yes");
  const [activityNamesList, setActivityNamesList] = useState<Array<ActivityRoleNameModel>>([]); //React.useContext(DataContext).activityNamesList;
  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]); // React.useContext(DataContext).serviceNameList;
  const [unitOfSalesList, setUnitOfSalesList] = useState<Array<UnitOfSalesModel>>([]); //React.useContext(DataContext).unitOfSalesList;
  const [categoryList, setCategoryList] = useState<Array<DFCategoryModel>>([]); //React.useContext(DataContext).categoryList;

  const [SalesName, SetSalesName] = useState<Array<DFUnitOfSalesModel1>>([]); //React.useContext(DataContext).categoryList;

  const [categoryListTemp, setCategoryListTemp] = useState<Array<DFCategoryModel>>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [actionRoleError, setActionRoleError] = useState<boolean>(false);
  const [actionRoleErrorText, setActionRoleErrorText] = useState<string>("");

  const [serviceNameError, setServiceNameError] = useState<boolean>(false);
  const [serviceNameErrorText, setServiceNameErrorText] = useState<string>("");

  const [categoryNameError, setCategoryNameError] = useState<boolean>(false);
  const [categoryNameErrorText, setCategoryNameErrorText] = useState<string>("");

  const [hsnError, setHSNError] = useState<boolean>(false);
  const [hsnErrorText, setHSNErrorText] = useState<string>("");

  const [gstError, setGSTError] = useState<boolean>(false);
  const [gstErrorText, setGSTErrorText] = useState<string>("");

  const [unitError, setUnitError] = useState<boolean>(false);
  const [unitErrorText, setUnitErrorText] = useState<string>("");

  const [actionStatus, setActionStatus] = useState<string>("new");

  const [selectedID, setSelectedID] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const [UnitId, setUnitId] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    FetchData("");
    FetchActivityName();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // let ac = SalesName.find(
    //   (el) => el.unit_name === event.target.value
    // );
    const intersection = SalesName.filter((element) => event.target.value.includes(element.unit_name));
    let a = [];

    intersection.map((data) => {
      a.push(data.unit_id);
    });
    setUnitId(a);
    console.log("aniket", a);
  };

  const FetchActivityName = async () => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: "all",
      },
    };

    setLoading(true);
    await Provider.createDFAdmin(Provider.API_URLS.GroupFromRefNo, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setActivityNamesList(response.data.data);
          }
        }

        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        //Show snackbar
      });
  };

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
  };

  const FetchData = (type: string) => {
    ResetFields();
    let params = {
      data: {
        Sess_UserRefno: "2",
        category_refno: "all",
      },
    };

    Provider.createDFAdmin(Provider.API_URLS.CategoryFromRefNo, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.id = a.category_refno;
              a.view_status = a.view_status ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
              return a;
            });
            setCategoryList(arrList);
            setCategoryListTemp(arrList);

            if (type !== "") {
              setSnackMsg("Category " + type);
              setOpen(true);
              setSnackbarType("success");
            }
          }
        } else {
          setSnackMsg(communication.NoData);
          setOpen(true);
          setSnackbarType("info");
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setOpen(true);
        setSnackbarType("error");
      });

    let param = {
      data: {
        Sess_UserRefno: "2",
        service_refno: "all",
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ServiceFromRefNo, param)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setServiceNameList(response.data.data);
          }
        } else {
          //Show snackbar
        }
        // setLoading(false);
      })
      .catch((e) => {
        // setLoading(false);
        //Show snackbar
      });

    let unitParams = {
      data: {
        Sess_UserRefno: "2",
        unit_category_refno: "all",
      },
    };

    Provider.createDFAdmin(Provider.API_URLS.UnitCategoryFromRefNo, unitParams)
      .then((response: any) => {
        let a = [];
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            response.data.data.map((e) => {
              let ob = {};
              ob["unit_name"] = e.unit_name;
              ob["unit_id"] = e.unit_category_refno;
              a.push(ob);
            });
            SetSalesName(a);
            console.log(a, "testing_final");
          }
        } else {
          //Show snackbar
        }
        // setLoading(false);
      })
      .catch((e) => {
        //  setLoading(false);
        //Show snackbar
      });

    if (unitOfSalesList.length === 0) {
      Provider.createDFAdmin(Provider.API_URLS.UnitCategoryFromRefNo, unitParams)
        .then((response: any) => {
          if (response.data && response.data.code === 200) {
            if (response.data.data) {
              response.data.data = APIConverter(response.data.data);
              response.data.data = response.data.data.filter((el: any) => {
                return el.display;
              });
              setUnitOfSalesList(response.data.data);
            }
          } else {
            //Show snackbar
          }
          // setLoading(false);
        })
        .catch((e) => {
          //  setLoading(false);
          //Show snackbar
        });
    }
  };

  const handleARNChange = (event: SelectChangeEvent) => {
    let activityName: string = event.target.value;
    let ac = activityNamesList.find((el) => el.group_name === activityName);
    if (ac !== undefined) {
      setArnID(ac.group_refno);
      setArn(activityName);
      setActionRoleError(false);
      setActionRoleErrorText("");
    }
  };

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: string = event.target.value;
    let ac = serviceNameList.find((el) => el.service_name === serviceName);
    if (ac !== undefined) {
      setSn(serviceName);
      setSnID(ac?.service_refno);
      setServiceNameError(false);
      setServiceNameErrorText("");
    }
  };

  const handleSNChange1 = (event: SelectChangeEvent) => {
    let unitName: string = event.target.value;
    // let ac = serviceNameList.find((el) => el.unit_name === unitName);

    setSn1(unitName);
    // setSnID(ac?.service_refno);
    setUnitError(false);
    setUnitErrorText("");
  };

  const handleUnitChange = (event: SelectChangeEvent<typeof unitsOfSales>) => {
    const {
      target: { value },
    } = event;
    let un: any = event.target.value;

    if (un.indexOf("Add Unit Of Sales") !== -1) {
      navigate(`/master/unit`);
    }

    let a: any = unitOfSalesList.filter((el) => {
      return un.indexOf(el.displayUnit) !== -1;
    });

    const unitID = a.map((data: any) => data.id);
    setUnitsOfSales(typeof value === "string" ? value.split(",") : value);
    setUnitsOfSalesID(unitID.join(","));
    setUnitError(false);
    setUnitErrorText("");
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    let isValid: boolean = true;
    if (arn === "--Select--") {
      isValid = false;
      setActionRoleError(true);
      setActionRoleErrorText(communication.SelectActivityName);
    }

    if (sn === "--Select--") {
      isValid = false;
      setServiceNameError(true);
      setServiceNameErrorText(communication.SelectServiceName);
    }

    if (UnitId.length < 0) {
      isValid = false;
      setUnitError(true);
      setUnitErrorText(communication.SelectUnitName);
    }

    if (UnitId.length > 0) {
      isValid = true;
      setUnitError(false);
      setUnitErrorText("");
    }

    // if (unitsOfSales.length === 0) {
    //   isValid = false;
    //   setUnitError(true);
    //   setUnitErrorText(communication.SelectUnitName);
    // } else if (unitsOfSales.length > 3) {
    //   isValid = false;
    //   setUnitError(true);
    //   setUnitErrorText(communication.SelectUnitOnly3);
    // }

    if (cn.trim() === "") {
      isValid = false;
      setCategoryNameError(true);
      setCategoryNameErrorText(communication.BlankCategoryName);
    }

    if (hsn.trim() === "") {
      //|| !ValidateStringNumber(hsn)
      isValid = false;
      setHSNError(true);
      setHSNErrorText(communication.BlankHNSCode);
    }
    if (gst === "" || !ValidateGSTRate(gst)) {
      //|| isNaN(gst)
      isValid = false;
      setGSTError(true);
      setGSTErrorText(communication.BlankGST);
    }

    if (isValid) {
      InsertUpdateData();
      setSn("--Select--");
      setSnID(0);
      setArn("--Select--");
      setArnID(0);
      setCn("");
      setHsn("");
      setGst("");
      setUnitsOfSales([]);
      setUnitsOfSalesID([]);
    }
  };

  const handleCancelClick = () => {
    setDisplay("Yes");
    setSn("--Select--");
    setSnID(0);
    setArn("--Select--");
    setArnID(0);
    setCn("");
    setHsn("");
    setGst("");
    setUnitsOfSales([]);
    setUnitsOfSalesID([]);
    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setActionStatus("new");
  };

  const handelEditAndDelete = (type: string | null, a: DFCategoryModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.view_status);
      setSn(a.service_refno_name);
      setSnID(a.serviceID);
      setArn(a.group_refno_name);
      setArnID(a.roleID);
      setCn(a.category_name);
      setHsn(a.hsn_sac_code);
      setGst(a.gst_rate);

      if (a.unit_category_names !== null) {
        let arrUnits = a.unit_category_names.split(",");
        const results = arrUnits.map((element) => {
          return element.trim();
        });
        setUnitsOfSales(results);

        let a1: any = unitOfSalesList.filter((el) => {
          return results.indexOf(el.displayUnit) !== -1;
        });

        const unitID = a1.map((data: any) => data.id);
        setUnitsOfSalesID(unitID.join(","));
      }
      setSelectedID(a.id);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
  };

  const InsertUpdateData = () => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        category_name: cn,
        hsn_sac_code: hsn,
        group_refno: arnID,
        service_refno: snID,
        gst_rate: parseFloat(gst),
        view_status: display,
        unit_category_refno: UnitId,
      },
    };
    if (actionStatus === "new") {
      Provider.createDFAdmin(Provider.API_URLS.CategoryNameCreate, params)
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("added");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
            ResetFields();
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setOpen(true);
            setSnackbarType("error");
          }
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setOpen(true);
          setSnackbarType("error");
        });
    } else if (actionStatus === "edit") {
      Provider.createDFAdmin(Provider.API_URLS.CategoryNameCreate, {
        Sess_UserRefno: "2",
        category_refno: selectedID,
        category_name: cn,
        group_refno: arnID,
        service_refno: snID,
        hsn_sac_code: hsn,
        gst_rate: parseFloat(gst),
        unit_category_refno: unitsOfSalesID.toString(),
        view_status: display === "Yes" ? 1 : 0,
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("updated");
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

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setCategoryListTemp(categoryList);
    } else {
      setCategoryListTemp(
        categoryList.filter((el: DFCategoryModel) => {
          return el.category_name.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Category Name</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sm={8}
            md={12}
            sx={{
              borderBottom: 1,
              paddingBottom: "8px",
              borderColor: "rgba(0,0,0,0.12)",
            }}
          >
            <Typography variant="h6">Add/Edit Category Name</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={actionRoleError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Activity Role Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={arn} onChange={handleARNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {activityNamesList &&
                  activityNamesList.map((item, index) => {
                    console.log("testing", item.group_name);

                    return (
                      <MenuItem key={item.group_refno} value={item.group_name}>
                        {item.group_name}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText>{actionRoleErrorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={serviceNameError}>
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
                    <MenuItem
                      //selected={index === 1}
                      key={item.service_refno}
                      value={item.service_name}
                    >
                      {item.service_name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{serviceNameErrorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={3} md={5} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Category Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Category Name"
              variant="outlined"
              size="small"
              value={cn}
              onChange={(e) => {
                let activityName: string = e.currentTarget.value;
                setCn(activityName);
                setCategoryNameError(false);
                setCategoryNameErrorText("");
              }}
              error={categoryNameError}
              helperText={categoryNameErrorText}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>HSN / SAC Code</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="HSN / SAC Code"
              variant="outlined"
              size="small"
              value={hsn}
              error={hsnError}
              helperText={hsnErrorText}
              onChange={(e) => {
                setHsn(e.currentTarget.value);
                setHSNError(false);
                setHSNErrorText("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={2} md={3} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>GST Rate (%)</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="GST Rate (%)"
              variant="outlined"
              size="small"
              value={gst}
              error={gstError}
              helperText={gstErrorText}
              onChange={(e) => {
                setGst(e.currentTarget.value);
                setGSTError(false);
                setGSTErrorText("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" sx={{ paddingRight: { xs: 0, sm: 4 } }} error={unitError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Unit of Sales</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              {/* <Select
                multiple
                value={unitsOfSales}
                onChange={handleUnitChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem
                  //selected={true}
                  key='0'
                  value='Add Unit Of Sales'
                  style={getStyles(' Add Unit Of Sales', unitsOfSales, theme)}
                >
                  <b> Add Unit Of Sales</b>
                </MenuItem>
                {unitOfSalesList.map((units) => (
                  <MenuItem
                    selected={true}
                    key={units.id}
                    value={units.displayUnit}
                    style={getStyles(units.displayUnit, unitsOfSales, theme)}
                  >
                    {units.displayUnit}
                  </MenuItem>
                ))}
              </Select> */}

              {/* <Select value={sn1} onChange={handleSNChange1} multiple>
                <MenuItem disabled={true} value='--Select--'>
                  --Select--
                </MenuItem>
                {SalesName&&SalesName.map((item, index) => {
                  return (
                    <MenuItem
                      //selected={index === 1}
                      key={item.unit_name}
                      value={item.unit_name}
                    >
                      {item.unit_name}
                    </MenuItem>
                  );
                })}
              </Select> */}

              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {SalesName.map((name) => (
                  <MenuItem key={name.unit_id} value={name.unit_name} style={getStyles(name.unit_name, personName, theme)}>
                    {name.unit_name}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>{unitErrorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Display</b>
            </Typography>
            <FormControl>
              <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
                <FormControlLabel value={0} control={<Radio />} label="Yes" />
                <FormControlLabel value={1} control={<Radio />} label="No" />
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
          <Grid
            item
            xs={4}
            sm={8}
            md={12}
            sx={{
              borderBottom: 1,
              paddingBottom: "8px",
              borderColor: "rgba(0,0,0,0.12)",
            }}
          >
            <Typography variant="h6">Category Name List</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {categoryList.length === 0 ? (
                  <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <Grid
                      item
                      xs={4}
                      sm={8}
                      md={12}
                      sx={{
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        mb: 1,
                        display: "flex",
                        mr: 1,
                      }}
                    >
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
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
                      rows={categoryListTemp}
                      columns={categoryColumns}
                      getRowHeight={() => "auto"}
                      autoHeight={true}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...categoryList];
                        let a: DFCategoryModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        handelEditAndDelete((e.target as any).textContent, a);
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

export default CategoryPage;

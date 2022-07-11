import {
  Alert,
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
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { categoryColumns } from "../utils/tablecolumns";
import DataContext from "../contexts/DataContexts";
import Provider from "../api/Provider";
import { CategoryModel } from "../models/Model";
import { isFocusable } from "@testing-library/user-event/dist/utils";
import { useCookies } from "react-cookie";
import { communication } from "../utils/communication";
import { LoadingButton } from "@mui/lab";
import { ValidateGSTRate, ValidateStringNumber } from "../utils/validations";

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
  const [arn, setArn] = React.useState("--Select--");
  const [arnID, setArnID] = React.useState<number>(0);
  const [sn, setSn] = React.useState("--Select--");
  const [snID, setSnID] = React.useState<number>(0);
  const [cn, setCn] = React.useState("");
  const [hsn, setHsn] = React.useState("");
  const [gst, setGst] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const [unitsOfSales, setUnitsOfSales] = React.useState<string[]>([]);
  const [unitsOfSalesID, setUnitsOfSalesID] = React.useState<number[]>([]);

  const [display, setDisplay] = React.useState("Yes");
  const [activityNamesList, setActivityNamesList] = React.useContext(DataContext).activityNamesList;
  const [serviceNameList, setServiceNameList] = React.useContext(DataContext).serviceNameList;
  const [unitOfSalesList, setUnitOfSalesList] = React.useContext(DataContext).unitOfSalesList;
  const [categoryList, setCategoryList] = React.useContext(DataContext).categoryList;

  const [categoryListTemp, setCategoryListTemp] = useState<Array<CategoryModel>>([]);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [actionRoleError, setActionRoleError] = React.useState<boolean>(false);
  const [actionRoleErrorText, setActionRoleErrorText] = React.useState<string>("");

  const [serviceNameError, setServiceNameError] = React.useState<boolean>(false);
  const [serviceNameErrorText, setServiceNameErrorText] = React.useState<string>("");

  const [categoryNameError, setCategoryNameError] = React.useState<boolean>(false);
  const [categoryNameErrorText, setCategoryNameErrorText] = React.useState<string>("");

  const [hsnError, setHSNError] = React.useState<boolean>(false);
  const [hsnErrorText, setHSNErrorText] = React.useState<string>("");

  const [gstError, setGSTError] = React.useState<boolean>(false);
  const [gstErrorText, setGSTErrorText] = React.useState<string>("");

  const [unitError, setUnitError] = React.useState<boolean>(false);
  const [unitErrorText, setUnitErrorText] = React.useState<string>("");

  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  useEffect(() => {
    FetchData();
  }, []);

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
  };

  const FetchData = () => {
    ResetFields();
    Provider.getAll("master/getcategory")
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
            setCategoryList(arrList);
            setCategoryListTemp(arrList);
          }
        } else {
          setSnackMsg("No data found");
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });

    if (activityNamesList.length === 0) {
      Provider.getAll("master/getactivityroles")
        .then((response: any) => {
          if (response.data && response.data.code === 200) {
            if (response.data.data) {
              response.data.data = response.data.data.filter((el: any) => {
                return el.display;
              });
              setActivityNamesList(response.data.data);
            }
          } else {
            //Show snackbar
          }
          //  setLoading(false);
        })
        .catch((e) => {
          //  setLoading(false);
          //Show snackbar
        });
    }

    if (serviceNameList.length === 0) {
      Provider.getAll("master/getservices")
        .then((response: any) => {
          if (response.data && response.data.code === 200) {
            if (response.data.data) {
              response.data.data = response.data.data.filter((el: any) => {
                return el.display;
              });
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
    }

    if (unitOfSalesList.length === 0) {
      Provider.getAll("master/getunitofsales")
        .then((response: any) => {
          if (response.data && response.data.code === 200) {
            if (response.data.data) {
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
    let ac = activityNamesList.find((el) => el.activityRoleName === activityName);
    if (ac !== undefined) {
      setArnID(ac?.id);
      setArn(activityName);
      setActionRoleError(false);
      setActionRoleErrorText("");
    }
  };

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: string = event.target.value;
    let ac = serviceNameList.find((el) => el.serviceName === serviceName);
    if (ac !== undefined) {
      setSn(serviceName);
      setSnID(ac?.id);
      setServiceNameError(false);
      setServiceNameErrorText("");
    }
  };
  const handleUnitChange = (event: SelectChangeEvent<typeof unitsOfSales>) => {
    const {
      target: { value },
    } = event;
    let un: any = event.target.value;

    if (un[0].toLowerCase() === "add unit of sales") {
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

    if (unitsOfSales.length === 0) {
      isValid = false;
      setUnitError(true);
      setUnitErrorText(communication.SelectUnitName);
    } else if (unitsOfSales.length > 3) {
      isValid = false;
      setUnitError(true);
      setUnitErrorText(communication.SelectUnitOnly3);
    }

    if (cn.trim() === "") {
      isValid = false;
      setCategoryNameError(true);
      setCategoryNameErrorText(communication.BlankCategoryName);
    }

    if (hsn.trim() === "" || !ValidateStringNumber(hsn)) {
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

  const handelEditAndDelete = (type: string | null, a: CategoryModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setSn(a.serviceName);
      setSnID(a.serviceID);
      setArn(a.activityRoleName);
      setArnID(a.roleID);
      setCn(a.categoryName);
      setHsn(a.hsnsacCode);
      setGst(a.gstRate);
      let arrUnits=a.unitName.split(",");
      const results = arrUnits.map(element => {
        return element.trim();
      });
      setUnitsOfSales(results);
      setSelectedID(a.id);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
    // else if (type?.toLowerCase() === "delete" && a !== undefined) {
    //   setSelectedID(a.id);
    //   Provider.deleteAllParams("master/deletecategory", { ID: a.id })
    //     .then((response) => {
    //       if (response.data && response.data.code === 200) {
    //         FetchData();
    //       } else {
    //         ResetFields();
    //         setSnackMsg(communication.Error);
    //         setOpen(true);
    //       }
    //     })
    //     .catch((e) => {
    //       ResetFields();
    //       setSnackMsg(communication.NetworkError);
    //       setOpen(true);
    //     });
    // }
  };

  const InsertUpdateData = () => {
    if (actionStatus === "new") {
      Provider.create("master/insertcategory", {
        CategoryName: cn,
        RoleID: arnID,
        ServiceID: snID,
        HSNSACCode: hsn,
        GSTRate: parseFloat(gst),
        Display: display === "Yes",
        UnitID: unitsOfSalesID.toString(),
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData();
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setOpen(true);
          }
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setOpen(true);
        });
    } else if (actionStatus === "edit") {
      Provider.create("master/updatecategory", {
        id: selectedID,
        CategoryName: cn,
        RoleID: arnID,
        ServiceID: snID,
        HSNSACCode: hsn,
        GSTRate: parseFloat(gst),
        Display: display === "Yes",
        UnitID: unitsOfSalesID.toString(),
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData();
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setOpen(true);
          }
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
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
        categoryList.filter((el: CategoryModel) => {
          return el.categoryName.toString().toLowerCase().includes(query.toLowerCase());
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
            <Typography variant="h4">Category</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Add Category</Typography>
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
                {activityNamesList.map((item, index) => {
                  return (
                    <MenuItem key={index + 1} value={item.activityRoleName}>
                      {item.activityRoleName}
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
                      key={item.id}
                      value={item.serviceName}
                    >
                      {item.serviceName}
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
                setCn(e.currentTarget.value);
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
              <Select
                multiple
                value={unitsOfSales}
                onChange={handleUnitChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem
                  //selected={true}
                  key="0"
                  value="Add Unit Of Sales"
                  style={getStyles(" Add Unit Of Sales", unitsOfSales, theme)}
                >
                  Add Unit Of Sales
                </MenuItem>
                {unitOfSalesList.map((units) => (
                  <MenuItem selected={true} key={units.id} value={units.displayUnit} style={getStyles(units.displayUnit, unitsOfSales, theme)}>
                    {units.displayUnit}
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
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Category List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {categoryList.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search Category name"
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
                      getRowHeight={() => 'auto'}
                      autoHeight={true}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...categoryList];
                        let a: CategoryModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
        <Alert severity="error" sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoryPage;

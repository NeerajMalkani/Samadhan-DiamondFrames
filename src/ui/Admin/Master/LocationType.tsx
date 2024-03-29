import { Alert, AlertColor, Box, Button, Chip, CircularProgress, Container, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, TextField, Theme, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { ActivityRoleNameModel, LocationTypeModel, ServiceNameModel } from "../../../models/Model";
import Provider from "../../../api/Provider";
import { communication } from "../../../utils/communication";
import { LoadingButton } from "@mui/lab";
import { theme } from "../../../theme/AppTheme";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { locationTypeColumns } from "../../../utils/tablecolumns";
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

const LocationTypePage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("Yes");
  const [pageSize, setPageSize] = useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [selectedID, setSelectedID] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationTypeList, setLocationTypeList] = useState<Array<LocationTypeModel>>([]);
  const [locationTypeListTemp, setLocationTypeListTemp] = useState<Array<LocationTypeModel>>([]);
  const [activityNamesList, setActivityNamesList] = useState<Array<ActivityRoleNameModel>>([]);

  const [serviceNamesList, setServiceNamesList] = useState<Array<ServiceNameModel>>([]);

  const [activityList, setActivityList] = useState<string[]>([]);
  const [activityListID, setActivityListID] = useState<number[]>([]);
  const [activityError, setActivityError] = useState<boolean>(false);
  const [activityErrorText, setActivityErrorText] = useState<string>("");

  const [serviceList, setServiceList] = useState<string[]>([]);
  const [serviceListID, setServiceListID] = useState<number[]>([]);
  const [serviceError, setServiceError] = useState<boolean>(false);
  const [serviceErrorText, setServiceErrorText] = useState<string>("");

  const [locationError, setLocationError] = useState<boolean>(false);
  const [locationErrorText, setLocationErrorText] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const [activitySelectAll, setActivitySelectAll] = useState<string>("Select All");
  const [serviceSelectAll, setServiceSelectAll] = useState<string>("Select All");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  //#endregion

  //#region Functions
  useEffect(() => {
    FetchLocationType("");
    FetchActivity();
    FetchService();
  }, []);

  const FetchLocationType = (type: string) => {
    handleCancelClick();
    if (type !== "") {
      setSnackMsg("Location type " + type);
      setOpen(true);
      setSnackbarType("success");
    }
    let params = {
      data: {
        Sess_UserRefno: "2",
        locationtype_refno: "all",
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.LocationTypeRefNoCheck, params)
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
            setLocationTypeList(arrList);
            setLocationTypeListTemp(arrList);
          }
        } else {
          setSnackMsg(communication.NoData);
          setSnackbarType("info");
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const FetchActivity = () => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        group_refno: "all",
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.GroupFromRefNo, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];

            arrList.map(function (a: any, index: number) {
              return a.display;
            });
            setActivityNamesList(arrList);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const FetchService = () => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        service_refno: "all",
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ServiceFromRefNo, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            setServiceNamesList(arrList);
          }
        } else {
          setSnackMsg(communication.Error);
          setSnackbarType("error");
          setOpen(true);
        }
      })
      .catch((e) => {
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
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
      setLocationTypeListTemp(locationTypeList);
    } else {
      setLocationTypeListTemp(
        locationTypeList.filter((el: LocationTypeModel) => {
          return el.branchType.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const handleSubmitClick = () => {
    let isValid: boolean = true;

    if (activityList.length === 0 || activityListID.length === 0) {
      isValid = false;
      setActivityError(true);
      setActivityErrorText(communication.BlankActivityName);
    }

    if (serviceList.length === 0 || serviceListID.length === 0) {
      isValid = false;
      setServiceError(true);
      setServiceErrorText(communication.BlankServiceName);
    }

    if (location === "") {
      isValid = false;
      setLocationError(true);
      setLocationErrorText("Enter location");
    }

    if (isValid) {
      InsertUpdateData();
    }
  };

  const handleCancelClick = () => {
    setActivityList([]);
    setActivityError(false);
    setActivityErrorText("");

    setServiceList([]);
    setServiceError(false);
    setServiceErrorText("");

    setLocation("");
    setLocationError(false);
    setLocationErrorText("");

    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setDisplay("Yes");
    setSelectedID(0);
    setButtonDisplay("none");
    setActionStatus("new");
  };

  const handelEditAndDelete = (type: string | null, a: LocationTypeModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      const results: string[] = a.activityRoleName;
      setActivityList(results);
      let aID: any = activityNamesList.filter((el: ActivityRoleNameModel) => {
        return results.indexOf(el.activityRoleName) !== -1;
      });

      const unitID = aID.map((data: any) => data.id);
      setActivityListID(unitID.join(","));

      setActivityError(false);
      setActivityErrorText("");

      const resultsSer: string[] = a.serviceName;

      setServiceList(resultsSer);

      let aID1: any = serviceNamesList.filter((el: ServiceNameModel) => {
        return resultsSer.indexOf(el.serviceName) !== -1;
      });

      const unitID1 = aID1.map((data: any) => data.id);
      setServiceListID(unitID1.join(","));

      setServiceError(false);
      setServiceErrorText("");

      setLocation(a.branchType);
      setLocationError(false);
      setLocationErrorText("");

      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setSelectedID(a.id);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
  };

  const InsertUpdateData = () => {
    setButtonLoading(true);
    if (actionStatus.toLocaleLowerCase() === "new") {
      Provider.createDFAdmin(Provider.API_URLS.LocationTypeCreate, {
        Sess_UserRefno: "2",
        locationtype_name: location,
        group_refno: activityListID,
        service_refno: serviceListID,
        view_status: display === "Yes" ? 1 : 0,
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchLocationType("added");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
          setButtonLoading(false);
        })
        .catch((e) => {
          setButtonLoading(false);
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    } else if (actionStatus.toLocaleLowerCase() === "edit") {
      Provider.createDFAdmin(Provider.API_URLS.LocationTypeUpdate, {
        Sess_UserRefno: "2",
        locationtype_refno: selectedID,
        locationtype_name: location,
        group_refno: activityListID.toString(),
        service_refno: serviceListID.toString(),
        view_status: display === "Yes" ? 1 : 0,
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchLocationType("updated");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
          setButtonLoading(false);
        })
        .catch((e) => {
          setButtonLoading(false);
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    }
  };

  const handleActivityChange = (event: SelectChangeEvent<typeof activityList>) => {
    const {
      target: { value },
    } = event;
    let un: any = event.target.value;

    if (un.indexOf("Select All") !== -1) {
      //navigate(`/master/unit`);
      let arrAct: any = [];
      activityNamesList.map(function (a: ActivityRoleNameModel) {
        arrAct.push(a.activityRoleName);
      });
      setActivityList(arrAct);
      let aID: any = activityNamesList.filter((el: ActivityRoleNameModel) => {
        return arrAct.indexOf(el.activityRoleName) !== -1;
      });

      const unitID = aID.map((data: any) => data.id);
      setActivityListID(unitID.join(","));
      setActivitySelectAll("Unselect All");
    } else if (un.indexOf("Unselect All") !== -1) {
      setActivityList([]);
      setActivityListID([]);
      setActivitySelectAll("Select All");
    } else {
      let a: any = activityNamesList.filter((el: ActivityRoleNameModel) => {
        return un.indexOf(el.activityRoleName) !== -1;
      });

      const unitID = a.map((data: any) => data.id);
      setActivityList(typeof value === "string" ? value.split(",") : value);
      setActivityListID(unitID.join(","));
      setActivitySelectAll("Select All");
    }
    setActivityError(false);
    setActivityErrorText("");
  };

  const handleServiceChange = (event: SelectChangeEvent<typeof serviceList>) => {
    const {
      target: { value },
    } = event;
    let un: any = event.target.value;
    if (un.indexOf("Select All") !== -1) {
      let arrAct: any = [];
      serviceNamesList.map(function (a: ServiceNameModel) {
        arrAct.push(a.serviceName);
      });
      setServiceList(arrAct);
      let aID1: any = serviceNamesList.filter((el: ServiceNameModel) => {
        return arrAct.indexOf(el.serviceName) !== -1;
      });

      const unitID1 = aID1.map((data: any) => data.id);
      setServiceListID(unitID1.join(","));

      setServiceSelectAll("Unselect All");
    } else if (un.indexOf("Unselect All") !== -1) {
      setServiceList([]);
      setServiceListID([]);
      setServiceSelectAll("Select All");
    } else {
      let a: any = serviceNamesList.filter((el: ServiceNameModel) => {
        return un.indexOf(el.serviceName) !== -1;
      });

      const unitID = a.map((data: any) => data.id);
      setServiceList(typeof value === "string" ? value.split(",") : value);
      setServiceListID(unitID.join(","));

      setServiceSelectAll("Select All");
    }
    setServiceError(false);
    setServiceErrorText("");
  };
  //#endregion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Location Type</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Add/Edit Location Type</Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Location Type</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Location Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setLocation(e.currentTarget.value);
                setLocationError(false);
                setLocationErrorText("");
              }}
              error={locationError}
              helperText={locationErrorText}
              value={location}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" sx={{ paddingRight: { xs: 0, sm: 4 } }} error={activityError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Activity Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select
                multiple
                fullWidth
                value={activityList}
                onChange={handleActivityChange}
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
                  value={activitySelectAll}
                  style={getStyles(activitySelectAll, activityList, theme)}
                >
                  <b>{activitySelectAll}</b>
                </MenuItem>
                {activityNamesList.map((units: ActivityRoleNameModel) => (
                  <MenuItem selected={true} key={units.id} value={units.activityRoleName} style={getStyles(units.activityRoleName, activityList, theme)}>
                    {units.activityRoleName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{activityErrorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" sx={{ paddingRight: { xs: 0, sm: 4 } }} error={serviceError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Service Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select
                multiple
                fullWidth
                value={serviceList}
                onChange={handleServiceChange}
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
                  value={serviceSelectAll}
                  style={getStyles(serviceSelectAll, activityList, theme)}
                >
                  <b>{serviceSelectAll}</b>
                </MenuItem>
                {serviceNamesList.map((units: ServiceNameModel) => (
                  <MenuItem selected={true} key={units.id} value={units.serviceName} style={getStyles(units.serviceName, serviceList, theme)}>
                    {units.serviceName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{serviceErrorText}</FormHelperText>
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
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Location Type List</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {locationTypeList.length === 0 ? (
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
                      getRowHeight={() => "auto"}
                      autoHeight={true}
                      rows={locationTypeListTemp}
                      columns={locationTypeColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...locationTypeList];
                        let a: LocationTypeModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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

export default LocationTypePage;

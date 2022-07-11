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
  Theme,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DataContext from "../contexts/DataContexts";
import { ActivityRoleNameModel, LocationTypeModel, ServiceNameModel } from "../models/Model";
// import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import Provider from "../api/Provider";
import { communication } from "../utils/communication";
import { LoadingButton } from "@mui/lab";
import { theme } from "../theme/AppTheme";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { locationTypeColumns } from "../utils/tablecolumns";

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
  const [locationTypeList, setLocationTypeList] = useContext(DataContext).locationTypeList;
  const [locationTypeListTemp, setLocationTypeListTemp] = useContext(DataContext).locationTypeList;
  const [activityNamesList, setActivityNamesList] = useState<any>([]);
  //const activityFields: object = { text: "activityRoleName", value: "id" };

  const [serviceNamesList, setServiceNamesList] = useState<any>([]);
  //const serviceFields: object = { text: "serviceName", value: "id" };

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

  useEffect(() => {
    FetchLocationType();
    FetchActivity();
    FetchService();
  }, []);

  const FetchLocationType = () => {
    handleCancelClick();
    Provider.getAll("master/getlocationtypes")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setLocationTypeList(arrList);
            setLocationTypeListTemp(arrList);
          }
        } else {
          setSnackMsg(communication.NoData);
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const FetchActivity = () => {
    Provider.getAll("master/getactivityroles")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              return a.display;
            });
            setActivityNamesList(arrList);
          }
        } else {
          setSnackMsg(communication.NoData);
          setOpen(true);
        }
      })
      .catch((e) => {
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const FetchService = () => {
    Provider.getAll("master/getservices")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              return a.display;
            });
            setServiceNamesList(arrList);
          }
        } else {
          setSnackMsg(communication.Error);
          setOpen(true);
        }
      })
      .catch((e) => {
        setSnackMsg(communication.NetworkError);
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
    debugger;
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
      let arrAct = a.activityName.split(",");
      const results = arrAct.map((element) => {
        return element.trim();
      });
      setActivityList(results);
      setActivityError(false);
      setActivityErrorText("");

      let arrSer = a.serviceName.split(",");
      const resultsSer = arrSer.map((element) => {
        return element.trim();
      });
      setServiceList(resultsSer);
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
      Provider.create("master/insertlocationtype", {
        BranchType: location,
        ActivityID: activityListID.toString(),
        ServiceID: serviceListID.toString(),
        Display: display === "Yes",
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchLocationType();
          } else {
            setSnackMsg(communication.Error);
            setOpen(true);
          }
          setButtonLoading(false);
        })
        .catch((e) => {
          // console.log(e);
          setButtonLoading(false);
          setSnackMsg(communication.NetworkError);
          setOpen(true);
        });
    } else if (actionStatus.toLocaleLowerCase() === "edit") {
    }
  };

  const handleActivityChange = (event: SelectChangeEvent<typeof activityList>) => {
    const {
      target: { value },
    } = event;
    let un: any = event.target.value;

    if (un[0].toLowerCase() === "select all") {
      //navigate(`/master/unit`);
      let arrAct: any = [];
      activityNamesList.map(function (a: ActivityRoleNameModel) {
        arrAct.push(a.activityRoleName);
      });
      setActivityList(arrAct);
    } else {
      let a: any = activityNamesList.filter((el: ActivityRoleNameModel) => {
        return un.indexOf(el.activityRoleName) !== -1;
      });

      const unitID = a.map((data: any) => data.id);
      setActivityList(typeof value === "string" ? value.split(",") : value);
      setActivityListID(unitID.join(","));
      setActivityError(false);
      setActivityErrorText("");
    }
  };

  const handleServiceChange = (event: SelectChangeEvent<typeof serviceList>) => {
    const {
      target: { value },
    } = event;
    let un: any = event.target.value;
    debugger;
    if (un[0].toLowerCase() === "select all") {
      let arrAct: any = [];
      serviceNamesList.map(function (a: ServiceNameModel) {
        arrAct.push(a.serviceName);
      });
      setServiceList(arrAct);
    } else {
      let a: any = serviceNamesList.filter((el: ServiceNameModel) => {
        return un.indexOf(el.serviceName) !== -1;
      });

      const unitID = a.map((data: any) => data.id);
      setServiceList(typeof value === "string" ? value.split(",") : value);
      setServiceListID(unitID.join(","));
      setServiceError(false);
      setServiceErrorText("");
    }
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Activity</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Add Activity</Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" sx={{ paddingRight: { xs: 0, sm: 4 } }} error={activityError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Activity Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
                {/* <MultiSelectComponent dataSource={activityNamesList} mode="Default" fields={activityFields} placeholder="Select Activity name" /> */}
              </Typography>
              <Select
                multiple
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
                  value="Select All"
                  style={getStyles("Select All", activityList, theme)}
                >
                  Select All
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
                {/* <MultiSelectComponent dataSource={serviceNamesList} mode="Default" fields={serviceFields} placeholder="Select Service name" /> */}
              </Typography>
              <Select
                multiple
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
                  value="Select All"
                  style={getStyles("Select All", activityList, theme)}
                >
                  Select All
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
              Service List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {locationTypeList.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search Location Type"
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
        <Alert severity="error" sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LocationTypePage;

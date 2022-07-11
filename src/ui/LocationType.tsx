import { Alert, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DataContext from "../contexts/DataContexts";
import { LocationTypeModel } from "../models/Model";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import Provider from "../api/Provider";
import { communication } from "../utils/communication";
import { LoadingButton } from "@mui/lab";
import { theme } from "../theme/AppTheme";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { locationTypeColumns } from "../utils/tablecolumns";

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
  const [locationTypeList, setSlocationTypeList] = useContext(DataContext).locationTypeList;
  const [locationTypeListTemp, setSlocationTypeListTemp] = useContext(DataContext).locationTypeList;
  const [activityNamesList, setActivityNamesList] = useState<any>([]);
  const activityFields: object = { text: "activityRoleName", value: "id" };

  const [serviceNamesList, setServiceNamesList] = useState<any>([]);
  const serviceFields: object = { text: "serviceName", value: "id" };

  useEffect(() => {
    FetchLocationType();
    FetchActivity();
    FetchService();
  }, []);

  const FetchLocationType = () => {
    Provider.getAll("master/getlocationtype")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setSlocationTypeList(arrList);
            setSlocationTypeListTemp(arrList);
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
    setSearchQuery(query);
    if (query === "") {
      setSlocationTypeListTemp(locationTypeList);
    } else {
      setSlocationTypeListTemp(
        locationTypeList.filter((el: LocationTypeModel) => {
          return el.branchType.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const handleSubmitClick = () => {};

  const handleCancelClick = () => {};

  const handelEditAndDelete = (type: string | null, a: LocationTypeModel | undefined) => {};

  const InsertUpdateData = (paramServiceName: string, checked: boolean) => {};

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
          <Grid item xs={4} sm={3} md={84} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Activity Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
              <MultiSelectComponent dataSource={activityNamesList} mode="Default" fields={activityFields} placeholder="Select Activity name" />
            </Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Service Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
              <MultiSelectComponent dataSource={serviceNamesList} mode="Default" fields={serviceFields} placeholder="Select Service name" />
            </Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Location Type</b>
              <label style={{ color: "#ff0000" }}>*</label>
              <TextField
                fullWidth
                placeholder="Location Name"
                variant="outlined"
                size="small"
                onChange={(e) => {}}
                //   error={isServicenameError}
                //   helperText={servicenameError}
                //   value={serviceName}
              />
            </Typography>
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
                      autoHeight={true}
                      rows={locationTypeListTemp}
                      columns={locationTypeColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...serviceNamesList];
                        let a: LocationTypeModel | undefined = arrActivity.find((el) => el.id == param.row.id);
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

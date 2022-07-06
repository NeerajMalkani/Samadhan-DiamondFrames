import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../api/Provider";
import Header from "../components/Header";
import DataContext from "../contexts/DataContexts";
import { EWayBillModel } from "../models/Model";
import { theme } from "../theme/AppTheme";
import { communication } from "../utils/communication";
import { eWayBillColumns } from "../utils/tablecolumns";

const EWayBillPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();
  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/login`);
  }, []);

  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("Yes");

  const [ewayBillList, setEwayBillList] = useContext(DataContext).eWayBillList;

  const [pageSize, setPageSize] = useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">(
    "auto"
  );
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const [selectedStateName, setSelectedStateName] = useState("");
  const [selectedStateID, setSelectedStateID] = useState(0);

  const [stateError, setStateError] = useState("");
  const [isStateError, setIsStateError] = useState(false);

  const [selectedInStateLimit, setSelectedInStateLimit] = useState("");
  const [inStateError, setInStateError] = useState("");
  const [isInStateError, setIsInStateError] = useState(false);

  const [selectedInterStateLimit, setSelectedInterStateLimit] = useState("");
  const [interStateError, setInterStateError] = useState("");
  const [isInterStateError, setIsInterStateError] = useState(false);

  const [statesFullData, setStatesFullData] = useState([]);
  const [selectedID, setSelectedID] = useState<number>(0);

  
  const [ewayBillListTemp, setEwayBillListTemp] = useState<Array<EWayBillModel>>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    FetchData();
    FetchStates();
  }, []);

  const ResetFields = () => {
   // setSelectedID(0);
    // setActionStatus("new");
    // setDataGridOpacity(1);
    // setDataGridPointer("auto");
    // setButtonDisplay("none");
    // setButtonLoading(false);
     handleCancelClick();


  };

  const FetchData = () => {
    ResetFields();
    Provider.getAll("master/getewaybills")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setEwayBillList(response.data.data);
            setEwayBillListTemp(response.data.data);
          }
        } else {
          setSnackMsg("No data found");
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(e.message);
        setOpen(true);
      });
  };

  const FetchStates = () => {
    Provider.getAll("master/getstates")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            // setStatesFullData(response.data.data);
            const stateData: any = [];
            response.data.data.map((data: any, i: number) => {
              stateData.push({
                id: data.id,
                label: data.stateName,
              });
            });
            setStatesFullData(stateData);
          }
        }
      })
      .catch((e) => {});
  };

  const handelEditAndDelete = (
    type: string | null,
    a: EWayBillModel | undefined
  ) => {
    if (
      type?.toLowerCase() === "edit" &&
      a !== undefined &&
      statesFullData !== undefined
    ) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setSelectedID(a.id);
      setDisplay(a.display);
      setSelectedStateName(a?.stateName);
      let stateData: any = statesFullData.find(
        (el: any) => el.label === a?.stateName
      );

      setSelectedStateID(stateData.id);
      setSelectedInStateLimit(a?.inStateLimit.toString());
      setSelectedInterStateLimit(a?.interStateLimit.toString());
      setIsStateError(false);
      setStateError("");
      setIsInterStateError(false);
      setInterStateError("");
      setIsInterStateError(false);
      setInterStateError("");

      setButtonDisplay("unset");
      setActionStatus("edit");
    }
  };

  const handleCancelClick = () => {
    setButtonLoading(false);
    setDisplay("Yes");
    setSelectedID(0);

    setSelectedStateName("");
    setSelectedStateID(0);
    setIsStateError(false);
    setStateError("");

    setSelectedInStateLimit("");
    setIsInStateError(false);
    setInStateError("");

    setSelectedInterStateLimit("");
    setIsInterStateError(false);
    setInterStateError("");

    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setActionStatus("new");
  };

  const handleSubmitClick = () => {
    let isValid: boolean = true;
    if (selectedStateID === 0 || selectedStateName.trim() === "") {
      isValid = false;
      setIsStateError(true);
      setStateError(communication.BlankState);
    }

    if (selectedInStateLimit === "") {
      isValid = false;
      setIsInStateError(true);
      setInStateError(communication.BlankInState);
    }

    if (selectedInterStateLimit === "") {
      isValid = false;
      setIsInterStateError(true);
      setInterStateError(communication.BlankInterState);
    }
    if (isValid) {
      InsertUpdateData();
    }
  };

  const InsertUpdateData = () => {
    setButtonLoading(true);
    if (actionStatus === "new") {
      Provider.create("master/insertewaybill", {
        StateID: selectedStateID,
        InStateLimit: selectedInStateLimit,
        InterStateLimit: selectedInterStateLimit,
        Display: display === "Yes",
      })
        .then((response: any) => {
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
      Provider.create("master/updateewaybill", {
        ID: selectedID,
        StateID: selectedStateID,
        InStateLimit: selectedInStateLimit,
        InterStateLimit: selectedInterStateLimit,
        Display: display === "Yes",
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

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setEwayBillListTemp(ewayBillList);
    } else {
      setEwayBillListTemp(
        ewayBillList.filter((el: EWayBillModel) => {
          return el.stateName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">E - Way bill</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Add E - Way bill</Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>State Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <Autocomplete
              disablePortal
              fullWidth
              // id="combo-box-demo"
              options={statesFullData}
              sx={{ width: 300 }}
              onChange={(event: React.SyntheticEvent, value: any) => {
                setIsStateError(false);
                setStateError("");
                if (value !== null) {
                  setSelectedStateName(value.label);
                  setSelectedStateID(value.id);
                }
              }}
              value={selectedStateName}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label=""
                  size="small"
                  error={isStateError}
                  helperText={stateError}
                />
              )}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>In State Limit</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="In State Limit"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setSelectedInStateLimit((e.target as HTMLInputElement).value);
                setIsInStateError(false);
                setInStateError("");
              }}
              error={isInStateError}
              helperText={inStateError}
              value={selectedInStateLimit}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Inter State Limit</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Inter State Limit"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setSelectedInterStateLimit(
                  (e.target as HTMLInputElement).value
                );
                setIsInterStateError(false);
                setInterStateError("");
              }}
              error={isInterStateError}
              helperText={interStateError}
              value={selectedInterStateLimit}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Display</b>
            </Typography>
            <FormControl>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                value={display}
                onChange={handleDisplayChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Button
              variant="contained"
              sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
              style={{ display: buttonDisplay }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={buttonLoading}
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleSubmitClick}
            >
              Submit
            </LoadingButton>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6" sx={{ mt: 2 }}>
            E - Way bill List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box
                height="300px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ m: 2 }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {ewayBillList.length === 0 ? (
                  <></>
                ) : (
                  <>
                  <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                    <TextField
                      placeholder="Search State name"
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
                    rows={ewayBillListTemp}
                    columns={eWayBillColumns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    disableSelectionOnClick
                    onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                      const arrActivity = [...ewayBillList];
                      let a: EWayBillModel | undefined = arrActivity.find(
                        (el) => el.id === param.row.id
                      );
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EWayBillPage;

import {
  Alert,
  AlertColor,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  InputAdornment,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../utils/communication";
import { workLocationColumns } from "../../../utils/tablecolumns";
import { theme } from "../../../theme/AppTheme";
import { WorkLocationNameModel } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { APIConverter } from "../../../utils/apiconverter";

const WorkLocationPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
  const [worklocationName, setWorklocationName] = React.useState("");
  const [worklocationNamesList, setWorklocationNamesList] = React.useState<Array<WorkLocationNameModel>>([]);

  const [worklocationNamesListTemp, setWorklocationNamesListTemp] = React.useState<Array<WorkLocationNameModel>>([]);

  const [worklocationnameError, setworklocationnameError] = useState("");
  const [isWorklocationnameError, setIsWorklocationnameError] = useState(false);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
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
    ResetFields();
    if (type !== "") {
      setSnackMsg("Work Floor " + type);
      setOpen(true);
      setSnackbarType("success");
    }
    let params = {
      data: {
        Sess_UserRefno: "2",
        worklocation_refno: "all",
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.WorkLocationRefNoCheck, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setWorklocationNamesList(arrList);
            setWorklocationNamesListTemp(arrList);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    const IsTextFiledError = worklocationName.trim() === "";
    setworklocationnameError(IsTextFiledError ? communication.BlankWorklocationName : "");
    setIsWorklocationnameError(IsTextFiledError);
    if (!IsTextFiledError) {
      setButtonLoading(true);
      InsertUpdateData(worklocationName, display === "Yes");
      setDisplay("Yes");
      setWorklocationName("");
      setworklocationnameError("");
      setIsWorklocationnameError(false);
    }
  };

  const handleCancelClick = () => {
    setDisplay("Yes");
    setWorklocationName("");
    setworklocationnameError("");
    setIsWorklocationnameError(false);
    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setActionStatus("new");
  };

  const handelEditAndDelete = (type: string | null, a: WorkLocationNameModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setWorklocationName(a?.workLocationName);
      setSelectedID(a.id);
      setworklocationnameError("");
      setIsWorklocationnameError(false);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
  };

  const InsertUpdateData = (paramWorklocationName: string, checked: boolean) => {
    if (actionStatus === "new") {
      const params = {
        data: {
          Sess_UserRefno: "2",
          worklocation_name: paramWorklocationName,
          view_status: checked ? 1 : 0,
        },
      };
      Provider.createDFAdmin(Provider.API_URLS.WorkLocationCreate, params)
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
    } else if (actionStatus === "edit") {
      const params = {
        data: {
          Sess_UserRefno: "2",
          worklocation_refno: selectedID,
          worklocation_name: paramWorklocationName,
          view_status: checked ? 1 : 0,
        },
      };
      Provider.createDFAdmin(Provider.API_URLS.WorkLocationUpdate, params)
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
      setWorklocationNamesListTemp(worklocationNamesList);
    } else {
      setWorklocationNamesListTemp(
        worklocationNamesList.filter((el: WorkLocationNameModel) => {
          return el.workLocationName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };
  //#endregion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Work Location</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Add/Edit Work Location</Typography>
          </Grid>
          <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Work Location name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Work Location Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setWorklocationName((e.target as HTMLInputElement).value);
                setIsWorklocationnameError(false);
                setworklocationnameError("");
              }}
              error={isWorklocationnameError}
              helperText={worklocationnameError}
              value={worklocationName}
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
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Work Location List</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {worklocationNamesList.length === 0 ? (
                  <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
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
                      rows={worklocationNamesListTemp}
                      columns={workLocationColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrWorklocation = [...worklocationNamesList];
                        let a: WorkLocationNameModel | undefined = arrWorklocation.find((el) => el.id === param.row.id);
                        handelEditAndDelete((e.target as any).textContent, a);
                      }}
                      sx={{
                        "& .MuiDataGrid-columnHeaders": {
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

export default WorkLocationPage;

import {
  Box,
  Container,
  TextField,
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Select,
  Typography,
  NativeSelect,
  CircularProgress,
  MenuItem,
  AlertColor,
  useTheme,
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  SelectChangeEvent,
  Radio,
  Snackbar,
  Alert,
} from "@mui/material";

import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DataContexts from "../../../contexts/DataContexts";
import Provider from "../../../api/Provider";
import { communication } from "../../../utils/communication";
import { activityColumns } from "../../../utils/tablecolumns";
import { theme } from "../../../theme/AppTheme";
import { ActivityRoleNameModel, DesignationNameModel } from "../../../models/Model";
import { Cookies, useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { designationColumns } from "../../../utils/tablecolumns";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";

const AddDDesignation = () => {
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

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [display, setDisplay] = React.useState("Yes");
  const [report, setReport] = React.useState("Yes");
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const theme = useTheme();

  const [designationName, setDesignationName] = useState("--Select--");
  const [designationID, setDesignationID] = useState<number>(0);
  const [isDesignationError, isSetDesignationError] = useState<boolean>(false);
  const [designationErrorText, setDesignationErrorText] = useState<string>("");
  const [designationList, setDesignationList] = useState<Array<DesignationNameModel>>([]);

  const [gridDesignationList, setGridDesignationList] = useState<Array<DesignationNameModel>>([]);
  const [gridDesignationtListTemp, setGridDesignationListTemp] = useState<Array<DesignationNameModel>>([]);

  useEffect(() => {
    FetchData("");
    FetchDesignation();
  }, []);

  const FetchData = (type: string) => {
    let params = {
      UserType: 4,
      UserId: cookies.dfc.UserID,
    };
    Provider.getAll(`master/getuserdesignation?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              a.reportingAuthority = a.reportingAuthority ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setGridDesignationList(arrList);
            setGridDesignationListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Designation " + type);
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
        setSnackbarType("error");
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const FetchDesignation = () => {
    Provider.getAll("master/getdesignations")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el) => {
              return el.display;
            });
            setDesignationList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const handleDropdownChange = (event: SelectChangeEvent) => {
    let designationName: string = event.target.value;
    let ac = designationList.find((el) => el.designationName === designationName);
    if (ac !== undefined) {
      setDesignationName(designationName);
      setDesignationID(ac?.id);
      isSetDesignationError(false);
      setDesignationErrorText("");
    }
  };

  const handleCancelClick = () => {
    setDesignationName("--Select--");
    setDesignationID(0);
    isSetDesignationError(false);
    setDesignationErrorText("");
    setActionStatus("new");
    setSelectedID(0);
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
    setDisplay("Yes");
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleReportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReport((event.target as HTMLInputElement).value);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setGridDesignationListTemp(gridDesignationList);
    } else {
      setGridDesignationListTemp(
        gridDesignationList.filter((el: DesignationNameModel) => {
          return el.designationName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handelEditAndDelete = (type: string | null, a: DesignationNameModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setDesignationName(a.designationName);
      setDesignationID(
        designationList.find((el) => {
          return el.designationName === a.designationName;
        }).id
      );
      setDesignationID(a.id);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
  };

  const handleSubmitClick = () => {
    let isValid: boolean = true;

    if (designationName.trim() === "--Select--") {
      isValid = false;
      isSetDesignationError(true);
      setDesignationErrorText("please select Designation");
    }
    if (isValid) {
      InsertUpdateData(designationName);
    }
  };

  const InsertUpdateData = (paramServiceName: string) => {
    setButtonLoading(true);
    if (actionStatus === "new") {
      Provider.create("master/insertuserdesignation", {
        UserId: cookies.dfc.UserID,
        UserType: 4,
        DesignationID: designationID,
        ReportingAuthority: report === "Yes",
        Display: display === "Yes",
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("added");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
          handleCancelClick();
        })
        .catch((e) => {
          handleCancelClick();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    } else if (actionStatus === "edit") {
      Provider.create("master/updateuserdesignation", {
        // ServiceID: departmentID,
        UserId: cookies.dfc.UserID,
        UserType: 4,
        DesignationID: designationID,
        ReportingAuthority: report === "Yes",
        Display: display === "Yes",
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("updated");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
          handleCancelClick();
        })
        .catch((e) => {
          handleCancelClick();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    }
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Add Designation</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h5">Designation (Add/ Edit)</Typography>
            {/* <hr style={{width:'360',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:"solid"}}></hr>  */}
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={isDesignationError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Designation Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={designationName} onChange={handleDropdownChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {designationList.map((item, index) => {
                  return (
                    <MenuItem key={item.id} value={item.designationName}>
                      {item.designationName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{designationErrorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={2} sx={{ mt: 1 }}></Grid>

          <Grid item xs={2} sm={2} md={3} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Reporting Authority</b>
            </Typography>
            <FormControl>
              <RadioGroup row name="row-radio-buttons-group" value={report} onChange={handleReportChange}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={2} md={3} sx={{ mt: 1 }}>
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
            <Typography variant="h6">My Designation List</Typography>
          </Grid>
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
            <Grid item xs={4} sm={8} md={12}>
              {loading ? (
                <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                  {gridDesignationList.length === 0 ? (
                    <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                  ) : (
                    <>
                      <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, mt: 1, display: "flex", mr: 1 }}>
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
                        rows={gridDesignationtListTemp}
                        columns={designationColumns}
                        getRowHeight={() => "auto"}
                        autoHeight={true}
                        pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 20]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        disableSelectionOnClick
                        onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                          const arrActivity = [...gridDesignationList];
                          let a: DesignationNameModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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

export default AddDDesignation;

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
import { ActivityRoleNameModel, DepartmentNameModel } from "../../../models/Model";
import { Cookies, useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { departmentColumns } from "../../../utils/tablecolumns";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";

const AddDDepartment = () => {
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
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [display, setDisplay] = React.useState("Yes");
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const theme = useTheme();

  const [departmentName, setDepartmentName] = useState("--Select--");
  const [departmentID, setDepartmentID] = useState<number>(0);
  const [isDepartmentError, isSetDepartmentError] = useState<boolean>(false);
  const [departmentErrorText, setDepartmentErrorText] = useState<string>("");
  const [departmentList, setDepartmentList] = useState<Array<DepartmentNameModel>>([]);

  const [gridDepartmentList, setGridDepartmentList] = useState<Array<DepartmentNameModel>>([]);
  const [gridDepartmentListTemp, setGridDepartmentListTemp] = useState<Array<DepartmentNameModel>>([]);
 //#endregion 

 //#region Functions
  useEffect(() => {
    FetchData("");
    FetchDepartments();
  }, []);

  const FetchData = (type: string) => {
    let params = {
      AddedByUserID: cookies.dfc.UserID,
    };
    Provider.getAll(`master/getuserdepartments?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setGridDepartmentList(arrList);
            setGridDepartmentListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Department " + type);
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

  const FetchDepartments = () => {
    Provider.getAll("master/getdepartments")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = response.data.data.filter((el) => {
              return el.display;
            });
            setDepartmentList(response.data.data);
          }
        }
      })
      .catch((e) => {});
  };

  const handleDropdownChange = (event: SelectChangeEvent) => {
    let departmentName: string = event.target.value;
    let ac = departmentList.find((el) => el.departmentName === departmentName);
    if (ac !== undefined) {
      setDepartmentName(departmentName);
      setDepartmentID(ac?.id);
      isSetDepartmentError(false);
      setDepartmentErrorText("");
    }
  };

  const handleCancelClick = () => {
    setDepartmentName("--Select--");
    setDepartmentID(0);
    isSetDepartmentError(false);
    setDepartmentErrorText("");
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

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setGridDepartmentListTemp(gridDepartmentList);
    } else {
      setGridDepartmentListTemp(
        gridDepartmentList.filter((el: DepartmentNameModel) => {
          return el.departmentName.toString().toLowerCase().includes(query.toLowerCase());
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

  const handelEditAndDelete = (type: string | null, a: DepartmentNameModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setDepartmentName(a.departmentName);
      setDepartmentID(
        departmentList.find((el) => {
          return el.departmentName === a.departmentName;
        }).id
      );
      setSelectedID(a.id);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
  };

  const handleSubmitClick = () => {
    let isValid: boolean = true;

    if (departmentName.trim() === "--Select--") {
      isValid = false;
      isSetDepartmentError(true);
      setDepartmentErrorText("Please select Department");
    }
    if (isValid) {
      InsertUpdateData(departmentName, display === "Yes");
    }
  };

  const InsertUpdateData = (paramServiceName: string, checked: boolean) => {
    setButtonLoading(true);
    if (actionStatus === "new") {
      Provider.create("master/insertuserdepartments", {
        AddedByUserID: cookies.dfc.UserID,
        DepartmentID: departmentID,
        Display: checked,
        ID: 0
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
      Provider.create("master/updateuserdepartment", {
        AddedByUserID: cookies.dfc.UserID,
        DepartmentID: departmentID,
        Display: checked,
        ID: selectedID,
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
//#endregion 

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Add Department</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h5">Department (Add/ Edit)</Typography>
            {/* <hr style={{width:'360',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:"solid"}}></hr>  */}
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={isDepartmentError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Department Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={departmentName} onChange={handleDropdownChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {departmentList.map((item, index) => {
                  return (
                    <MenuItem key={item.id} value={item.departmentName}>
                      {item.departmentName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{departmentErrorText}</FormHelperText>
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
            <Typography variant="h6">My Department List</Typography>
          </Grid>
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
            <Grid item xs={4} sm={8} md={12}>
              {loading ? (
                <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                  {gridDepartmentList.length === 0 ? (
                    <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                  ) : (
                    <>
                      <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1,mt: 1, display: "flex", mr: 1 }}>
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
                        rows={gridDepartmentListTemp}
                        columns={departmentColumns}
                        getRowHeight={() => "auto"}
                        autoHeight={true}
                        pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 20]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        disableSelectionOnClick
                        onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                          const arrActivity = [...gridDepartmentList];
                          let a: DepartmentNameModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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

export default AddDDepartment;

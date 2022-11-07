import { Alert, AlertColor, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { KeyboardEvent, useEffect, useState } from "react";
import Provider from "../../../api/Provider";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { serviceColumns } from "../../../utils/tablecolumns";
import { communication } from "../../../utils/communication";
import { theme } from "../../../theme/AppTheme";
import { ServiceNameModel } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import ListIcon from "@mui/icons-material/List";
import NoData from "../../../components/NoData";

const ServicePage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

 //#region Variables
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
  const [serviceName, setServiceName] = React.useState("");
  const [serviceNamesList, setServiceNamesList] = useState<Array<ServiceNameModel>>([]); // React.useContext(DataContext).serviceNameList;
  const [servicenameError, setservicenameError] = useState("");
  const [isServicenameError, setIsServicenameError] = useState(false);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const [serviceNamesListTemp, setServiceNamesListTemp] = useState<Array<ServiceNameModel>>([]);
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
    Provider.getAll("master/getservices")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setServiceNamesList(arrList);
            setServiceNamesListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Service " + type);
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

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setServiceNamesListTemp(serviceNamesList);
    } else {
      setServiceNamesListTemp(
        serviceNamesList.filter((el: ServiceNameModel) => {
          return el.serviceName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    const IsTextFiledError = serviceName.trim() === "";
    setservicenameError(IsTextFiledError ? communication.BlankServiceName : "");
    setIsServicenameError(IsTextFiledError);
    if (!IsTextFiledError) {
      InsertUpdateData(serviceName, display === "Yes");
      setDisplay("Yes");
      setServiceName("");
      setservicenameError("");
      setIsServicenameError(false);
    }
  };

  const handleCancelClick = () => {
    setDisplay("Yes");
    setServiceName("");
    setservicenameError("");
    setIsServicenameError(false);
    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
  };

  const handelEditAndDelete = (type: string | null, a: ServiceNameModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setServiceName(a?.serviceName);
      setSelectedID(a.id);
      setservicenameError("");
      setIsServicenameError(false);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
    // else if (type?.toLowerCase() === "delete" && a !== undefined) {
    //   setSelectedID(a.id);
    //   Provider.deleteAllParams("master/deleteservices", { ID: a.id })
    //     .then((response) => {
    //       if (response.data && response.data.code === 200) {
    //         FetchData();
    //       } else {
    //         setSnackMsg(communication.Error);
    //         setOpen(true);
    //         ResetFields();
    //       }
    //     })
    //     .catch((e) => {
    //       ResetFields();
    //       setSnackMsg(communication.NetworkError);
    //       setOpen(true);
    //     });
    // }
  };

  const InsertUpdateData = (paramServiceName: string, checked: boolean) => {
    debugger;
    setButtonLoading(true);
    if (actionStatus === "new") {
      Provider.createDF("apiappadmin/spawu7S4urax/tYjD/servicenamecretae/", {
        // ServiceName: paramServiceName,
        // Display: checked,

        data: {
          Sess_UserRefno: cookies.dfc.Sess_group_refno,
          service_name: paramServiceName,
          production_unit: "1",
          view_status: checked ? 1 : 0
        }

      })
        .then((response) => {
          debugger;
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
      Provider.create("master/updateservices", {
        id: selectedID,
        ServiceName: paramServiceName,
        Display: checked,
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
//#endregion 

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Service</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Add/Edit Service</Typography>
          </Grid>
          <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Service Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Service Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setServiceName((e.target as HTMLInputElement).value);
                setIsServicenameError(false);
                setservicenameError("");
              }}
              error={isServicenameError}
              helperText={servicenameError}
              value={serviceName}
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
            <Typography variant="h6">Service List</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {serviceNamesList.length === 0 ? (
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
                      rows={serviceNamesListTemp}
                      columns={serviceColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...serviceNamesList];
                        let a: ServiceNameModel | undefined = arrActivity.find((el) => el.id == param.row.id);
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

export default ServicePage;

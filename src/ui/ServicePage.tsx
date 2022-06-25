import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import React, { KeyboardEvent, useEffect, useState } from "react";
import DataContext from "../contexts/DataContexts";
import Provider from "../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { serviceColumns } from "../utils/tablecolumns";
import { communication } from "../utils/communication";
import { theme } from "../theme/AppTheme";
import {ServiceNameModel} from "../models/Model";
import { useCookies } from "react-cookie";

const ServicePage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
    useEffect(() => {
      if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
        navigate(`/Samadhan-DiamondFrames/login`);
    }, []);

  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
  const [serviceName, setServiceName] = React.useState("");
  const [serviceNamesList, setServiceNamesList] =
    React.useContext(DataContext).serviceNameList;
  const [servicenameError, setservicenameError] = useState("");
  const [isServicenameError, setIsServicenameError] = useState(false);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">(
    "auto"
  );
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");

  useEffect(() => {
    FetchData();
  }, []);

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
  };

  const FetchData = () => {
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
            setServiceNamesList(response.data.data);
          }
        } else {
          // setSnackMsg("your request cannot be processed");
          // setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg("your request cannot be processed");
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handelEditAndDelete = (
    type: string | null,
    a: ServiceNameModel | undefined
  ) => {
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
    } else if (type?.toLowerCase() === "delete" && a !== undefined) {
      setSelectedID(a.id);
      Provider.deleteAllParams("master/deleteservices", { ID: a.id })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData();
          } else {
            setSnackMsg("your request cannot be processed");
            setOpen(true);
            ResetFields();
          }
          //setIsLoading(false);
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg("your request cannot be processed");
          setOpen(true);
        });
    }
  };

  const InsertUpdateData = (paramServiceName: string, checked: boolean) => {
    if (actionStatus === "new") {
      Provider.create("master/insertservices", {
        ServiceName: paramServiceName,
        Display: checked,
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData();
          } else {
            ResetFields();
            setSnackMsg("your request cannot be processed");
            setOpen(true);
          }
          //setIsLoading(false);
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg("your request cannot be processed");
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
            FetchData();
          } else {
            ResetFields();
            setSnackMsg("your request cannot be processed");
            setOpen(true);
          }
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg("your request cannot be processed");
          setOpen(true);
        });
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
            <Typography variant="h4">Service</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Add Service</Typography>
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
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleSubmitClick}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Service List
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
              <div style={{ height: 400, width: "100%", marginBottom: "20px" }}>
                <DataGrid
                  style={{
                    opacity: dataGridOpacity,
                    pointerEvents: dataGridPointer,
                  }}
                  rows={serviceNamesList}
                  columns={serviceColumns}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 20]}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  disableSelectionOnClick
                  onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                    const arrActivity = [...serviceNamesList];
                    let a: ServiceNameModel | undefined = arrActivity.find(
                      (el) => el.id == param.row.id
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
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message={snackMsg}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};

export default ServicePage;

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
import { GetSession } from "../utils/sessions";
import DataContext from "../contexts/DataContexts";
import Provider from "../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../utils/communication";
import { activityColumns } from "../utils/tablecolumns";
import { theme } from "../theme/AppTheme";
import ActivityRoleNameModel from "../models/ActivityRoleModel";

const ActivityPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (GetSession("isLogin") !== "true") {
      navigate(`/login`);
    }
  });

  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
  const [activityName, setActivityName] = React.useState("");
  const [activityNamesList, setActivityNamesList] =
    React.useContext(DataContext).activityNamesList;
  const [activitynameError, setactivitynameError] = useState("");
  const [isActivitynameError, setIsActivitynameError] = useState(false);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">(
    "auto"
  );
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
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
    Provider.getAll("master/getactivityroles")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setActivityNamesList(response.data.data);
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
        //Show snackbar
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    const IsTextFiledError = activityName.trim() === "";
    setactivitynameError(
      IsTextFiledError ? communication.BlankActivityName : ""
    );
    setIsActivitynameError(IsTextFiledError);
    if (!IsTextFiledError) {
      InsertUpdateData(activityName, display === "Yes");
      setDisplay("Yes");
      setActivityName("");
      setactivitynameError("");
      setIsActivitynameError(false);
    }
  };

  const handleCancelClick = () => {
    setDisplay("Yes");
    setActivityName("");
    setactivitynameError("");
    setIsActivitynameError(false);
    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setActionStatus("new");
  };

  const handelEditAndDelete = (
    type: string | null,
    a: ActivityRoleNameModel | undefined
  ) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setActivityName(a?.activityRoleName);
      setSelectedID(a.id);
      setactivitynameError("");
      setIsActivitynameError(false);
      setButtonDisplay("unset");
      setActionStatus("edit");
    } else if (type?.toLowerCase() === "delete" && a !== undefined) {
      setSelectedID(a.id);
      Provider.deleteAllParams("master/deleteactivityroles", { ID: a.id })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData();
          } else {
            setSnackMsg("your request cannot be processed");
            setOpen(true);
          }
        })
        .catch((e) => {
          console.log(e);
          setSnackMsg("your request cannot be processed");
          setOpen(true);
        });
    }
  };

  const InsertUpdateData = (paramActivityName: string, checked: boolean) => {
    if (actionStatus === "new") {
      Provider.create("master/insertactivityroles", {
        ActivityRoleName: paramActivityName,
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
      Provider.create("master/updateactivityroles", {
        id: selectedID,
        ActivityRoleName: paramActivityName,
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
            <Typography variant="h4">Activity</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Add Activity</Typography>
          </Grid>
          <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Activity Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Activity Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setActivityName((e.target as HTMLInputElement).value);
                setIsActivitynameError(false);
                setactivitynameError("");
              }}
              error={isActivitynameError}
              helperText={activitynameError}
              value={activityName}
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
              Activity List
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
                  rows={activityNamesList}
                  columns={activityColumns}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 20]}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  disableSelectionOnClick
                  onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                    const arrActivity = [...activityNamesList];
                    let a: ActivityRoleNameModel | undefined = arrActivity.find(
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

export default ActivityPage;

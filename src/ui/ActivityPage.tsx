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
  TextField,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { GetSession } from "../utils/sessions";
import DataContext from "../contexts/DataContexts";
import Provider from "../api/Provider";
import { ActivityRoleDataDummy } from "../utils/dummydata";
import { DataGrid } from "@mui/x-data-grid";
import { activityColumns } from "../utils/tablecolumns";
import { communication } from "../utils/communication";
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

  useEffect(() => {
    Provider.getAll("shows")
      .then((response: any) => {
        if (response) {
          setActivityNamesList(ActivityRoleDataDummy);
        } else {
        }
        setLoading(false);
      })
      .catch((e: Error) => {
        console.log(e);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    setTimeout(() => {
      debugger
      const arrActivity = [...activityNamesList];
     SetData(arrActivity[0]);
    }, 5000);
  },[]);

  const SetData=(data:ActivityRoleNameModel)=>{
    debugger;
    // setDisplay(data.activityDisplay);
    // setActivityName(data.activityName);
    setactivitynameError("");
    setIsActivitynameError(false);
    setButtonDisplay("unset");
  }

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
      const arrActivity = [...activityNamesList];
      arrActivity.push({
        id: activityNamesList.length + 1,
        srno: activityNamesList.length + 1,
        activityName: activityName,
        activityDisplay: display,
        action: "Edit",
      });

      setActivityNamesList(arrActivity);
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
              sx={{ mt: 1, mr: 1 }}
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
                  rows={activityNamesList}
                  columns={activityColumns}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 20]}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  disableSelectionOnClick
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
    </Box>
  );
};

export default ActivityPage;

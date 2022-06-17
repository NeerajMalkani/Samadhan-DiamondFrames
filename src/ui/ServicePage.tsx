import { Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { GetSession } from "../utils/sessions";
import DataContext from "../contexts/DataContexts";
import Provider from "../api/Provider";
import { ServiceNameDataDummy } from "../utils/dummydata";
import { DataGrid } from "@mui/x-data-grid";
import { serviceColumns } from "../utils/tablecolumns";
import { communication } from "../utils/communication";
import { theme } from "../theme/AppTheme";
import ServiceRoleNameModel from "../models/ServiceNameModel";

const ServicePage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (GetSession("isLogin") !== "true") {
      navigate(`/login`);
    }
  });

  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
  const [serviceName, setServiceName] = React.useState("");
  const [serviceNamesList, setServiceNamesList] = React.useContext(DataContext).serviceNameList;
  const [servicenameError, setservicenameError] = useState("");
  const [isServicenameError, setIsServicenameError] = useState(false);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");

  useEffect(() => {
    Provider.getAll("shows")
      .then((response: any) => {
        if (response) {
          setServiceNamesList(ServiceNameDataDummy);
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

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    const IsTextFiledError = serviceName.trim() === "";
    setservicenameError(IsTextFiledError ? communication.BlankServiceName : "");
    setIsServicenameError(IsTextFiledError);
    if (!IsTextFiledError) {
      const arrActivity = [...serviceNamesList];
      arrActivity.push({
        id: serviceNamesList.length + 1,
        srno: serviceNamesList.length + 1,
        serviceName: serviceName,
        serviceDisplay: display,
        action: "Edit",
      });

      setServiceNamesList(arrActivity);
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

  const handelEditAndDelete = (type: string | null, a: ServiceRoleNameModel | undefined) => {
    if (type?.toLowerCase() == "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.serviceDisplay);
      setServiceName(a?.serviceName);
      setservicenameError("");
      setIsServicenameError(false);
      setButtonDisplay("unset");

    }
    else if (type?.toLowerCase() == "delete") {
      
     }
  }

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
              <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
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
            <Button variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
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
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 400, width: "100%", marginBottom: "20px" }}>
                <DataGrid
                  style={{ opacity: dataGridOpacity, pointerEvents: dataGridPointer }}
                  rows={serviceNamesList}
                  columns={serviceColumns}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 20]}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  disableSelectionOnClick
                  onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                    const arrActivity = [...serviceNamesList];
                    let a: ServiceRoleNameModel | undefined = arrActivity.find(el => el.id == param.row.id);
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
    </Box>
  );
};

export default ServicePage;

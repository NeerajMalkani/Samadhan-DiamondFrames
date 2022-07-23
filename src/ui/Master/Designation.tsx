import { LoadingButton } from "@mui/lab";
import { Alert, AlertColor, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../../api/Provider";
import Header from "../../components/Header";
import { DesignationNameModel } from "../../models/Model";
import { theme } from "../../theme/AppTheme";
import { communication } from "../../utils/communication";
import { designationColumns } from "../../utils/tablecolumns";

const DesignationPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/login`);
  }, []);

  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("Yes");
  const [designationName, setDesignationName] = useState("");
  const [designationNameList, setDesignationNameList] = useState<Array<DesignationNameModel>>([]);
  //  useContext(DataContext).designationNamesList;
  const [designationNameError, setDesignationNameError] = useState("");
  const [isDesignationNameError, setIsDesignationNameError] = useState(false);
  const [pageSize, setPageSize] = useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">(
    "auto"
  );
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [selectedID, setSelectedID] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const [designationNameListTemp, setDesignationNameListTemp] = useState<Array<DesignationNameModel>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  useEffect(() => {
    FetchData("");
  }, []);

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    const IsTextFiledError = designationName.trim() === "";
    setDesignationNameError(
      IsTextFiledError ? communication.BlankActivityName : ""
    );
    setIsDesignationNameError(IsTextFiledError);
    if (!IsTextFiledError) {
      setButtonLoading(true);
      InsertUpdateData(designationName, display === "Yes");
      setDisplay("Yes");
      setDesignationName("");
      setDesignationNameError("");
      setIsDesignationNameError(false);
    }
  };

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
  };

  const FetchData = (type:string) => {
    ResetFields();
    Provider.getAll("master/getdesignations")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setDesignationNameList(response.data.data);
            setDesignationNameListTemp(response.data.data);
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
        setOpen(true);
        setSnackbarType("error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };


  const handleCancelClick = () => {
    setDisplay("Yes");
    setDesignationName("");
    setDesignationNameError("");
    setIsDesignationNameError(false);
    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setActionStatus("new");
  };

  const handelEditAndDelete = (
    type: string | null,
    a: DesignationNameModel | undefined
  ) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setDesignationName(a?.designationName);
      setSelectedID(a.id);
      setDesignationNameError("");
      setIsDesignationNameError(false);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }

  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setDesignationNameListTemp(designationNameList);
    } else {
      setDesignationNameListTemp(
        designationNameList.filter((el: DesignationNameModel) => {
          return el.designationName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const InsertUpdateData = (paramActivityName: string, checked: boolean) => {
    if (actionStatus === "new") {
      Provider.create("master/insertdesignation", {
        DesignationName: paramActivityName,
        Display: checked,
      })
        .then((response: any) => {
          if (response.data && response.data.code === 200) {
            FetchData("added");
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
      Provider.create("master/updatedesignation", {
        id: selectedID,
        DesignationName: paramActivityName,
        Display: checked,
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("updated");
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

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (<Box sx={{ mt: 11 }}>
    <Header />
    <Container maxWidth="lg">
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={12}>
          <Typography variant="h4">Designation Name</Typography>
        </Grid>
        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
          <Typography variant="h6">Add/Edit Designation</Typography>
        </Grid>
        <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            <b>Designation Name</b>
            <label style={{ color: "#ff0000" }}>*</label>
          </Typography>
          <TextField
            fullWidth
            placeholder="Designation Name"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setDesignationName((e.target as HTMLInputElement).value);
              setIsDesignationNameError(false);
              setDesignationNameError("");
            }}
            error={isDesignationNameError}
            helperText={designationNameError}
            value={designationName}
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
        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
          <Typography variant="h6">
            Designation List
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
              {designationNameList.length === 0 ? (
                <></>
              ) : (
                <>
                  <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                    <TextField
                      placeholder="Search Designation Name"
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
                    rows={designationNameListTemp}
                    columns={designationColumns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    disableSelectionOnClick
                    onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                      const arrActivity = [...designationNameList];
                      let a: DesignationNameModel | undefined =
                        arrActivity.find((el) => el.id === param.row.id);

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
      <Alert severity={snackbarType} sx={{ width: "100%" }}>
        {snackMsg}
      </Alert>
    </Snackbar>
  </Box>);
}

export default DesignationPage;
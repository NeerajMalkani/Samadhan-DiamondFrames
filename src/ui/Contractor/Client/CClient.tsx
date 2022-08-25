import { Alert, AlertColor, Box, Button, CircularProgress, Container, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CreateClient from "../../../components/Client";
import Header from "../../../components/Header";
import NoData from "../../../components/NoData";
import { theme } from "../../../theme/AppTheme";
import { restrictNumericMobile } from "../../../utils/validations";
import ListIcon from "@mui/icons-material/List";
import { ActivityRoleNameModel, ClientModel } from "../../../models/Model";
import { activityColumns } from "../../../utils/tablecolumns";

const ContractorClientPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [pageSize, setPageSize] = useState<number>(5);
  const [loading, setLoading] = useState(true);
  const [activityNamesList, setActivityNamesList] = useState<Array<ActivityRoleNameModel>>([]);
  const [activityNamesListTemp, setActivityNamesListTemp] = useState<Array<any>>([]);
  let navigate = useNavigate();

  let aaa: ClientModel = null;

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Client</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6" sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
              Search Client
            </Typography>
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Name / Company Name</b>
            </Typography>
            <TextField
              fullWidth
              placeholder="Name"
              variant="outlined"
              size="small"
              // error={is}
              // helperText={brandPrefixError}
              value={searchName}
              onChange={(e) => {
                setSearchName((e.target as HTMLInputElement).value);
              }}
            />
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Phone Number</b>
            </Typography>
            <TextField
              fullWidth
              placeholder="Phone Number"
              variant="outlined"
              size="small"
              inputProps={{
                maxLength: 10,
                onKeyDown: (e) => {
                  restrictNumericMobile(e);
                },
              }}
              value={searchMobile}
              onChange={(e) => {
                setSearchMobile((e.target as HTMLInputElement).value);
              }}
            />
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Button variant="contained">Search</Button>
            <Typography>OR</Typography>
            <Button variant="contained">Create Client</Button>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
            <CreateClient client={aaa} saveCallBack={() => {}} cancelCallBack={() => {}} type={"add"} />
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {activityNamesList.length === 0 ? (
                  <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <DataGrid
                      style={{
                        opacity: dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      autoHeight={true}
                      rows={activityNamesListTemp}
                      columns={activityColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        // const arrActivity = [...activityNamesList];
                        // let a: ActivityRoleNameModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        // handelEditAndDelete((e.target as any).textContent, a);
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

export default ContractorClientPage;

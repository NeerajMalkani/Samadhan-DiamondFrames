import {
  Alert,
  AlertColor,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import NoData from "../../../components/NoData";
import { ActivityRoleNameModel } from "../../../models/Model";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { theme } from "../../../theme/AppTheme";
import { activityColumns } from "../../../utils/tablecolumns";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const UserEstimationListPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);

  const [activityNamesList, setActivityNamesList] = useState<Array<ActivityRoleNameModel>>([]);
  const [activityNamesListTemp, setActivityNamesListTemp] = useState<Array<ActivityRoleNameModel>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState<number>(5);
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState<string>("");
  const [dialogText, setDialogText] = useState<string>("");

  const [contractorName, SetContractorName] = useState<string>("");
  const [quotationAmount, SetQuotationAmount] = useState<string>("");
  const [cas, SetCas] = useState<string>("");
  const [was, SetWas] = useState<string>("");
  const [action, SetAction] = useState<string>("");
  const [crl, SetCrl] = useState<string>("");

  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);

  const [loading, setLoading] = useState(true);
  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setActivityNamesListTemp(activityNamesList);
    } else {
      setActivityNamesListTemp(
        activityNamesList.filter((el: ActivityRoleNameModel) => {
          return el.activityRoleName.toString().toLowerCase().includes(query.toLowerCase());
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

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography sx={{ ml: 1 }} variant="h4">
              Service Catalogue and Image Gallery
            </Typography>
          </Grid>
          {loading ? (
            <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
              {activityNamesList.length === 0 ? (
                <NoData Icon={<SearchOffIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No search results" secondaryText="" isButton={false} />
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
                      value={searchQuery}
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
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{dialogHeader}</DialogTitle>
        <DialogContent>
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            <ListItem>
              <ListItemText primary="Contractor Name" secondary={contractorName} />
              <ListItemText primary="Quotation Amount" secondary={quotationAmount} />
              <ListItemText primary="Contractor Accept Status" secondary={cas} />
              <ListItemText primary="Work Allot Status" secondary={was} />
              <ListItemText primary="Action" secondary={action} />
              <ListItemText primary="Contractor Response List Empty" secondary={crl} />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserEstimationListPage;

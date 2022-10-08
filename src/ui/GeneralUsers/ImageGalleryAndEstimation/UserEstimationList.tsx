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
import { YourEstimationModel } from "../../../models/Model";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { theme } from "../../../theme/AppTheme";
import { yourEstimationColumns } from "../../../utils/tablecolumns";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import Provider from "../../../api/Provider";
import { communication } from "../../../utils/communication";

const UserEstimationListPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);

   //#region Variables
  const [activityNamesList, setActivityNamesList] = useState<Array<YourEstimationModel>>([]);
  const [activityNamesListTemp, setActivityNamesListTemp] = useState<Array<YourEstimationModel>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState<number>(5);
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState<string>("");
  const [dialogText, setDialogText] = useState<string>("");

  const [contractorName, SetContractorName] = useState<string>("NA");
  const [quotationAmount, SetQuotationAmount] = useState<string>("NA");
  const [cas, SetCas] = useState<string>("NA");
  const [was, SetWas] = useState<string>("NA");
  const [action, SetAction] = useState<string>("NA");
  const [crl, SetCrl] = useState<string>("NA");
  const [CookieUserID, SetCookieUseID] = useState(0);
  let navigate = useNavigate();

 //#endregion 

 //#region Functions
  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
      FetchData(cookies.dfc.UserID);
    }
  }, []);

  const [loading, setLoading] = useState(true);
  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const FetchData = (userID: number) => {
    let params = {
      UserID: userID,
    };
    Provider.getAll(`generaluserenquiryestimations/getuserallestimation?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setActivityNamesList(arrList);
            setActivityNamesListTemp(arrList);
          }
        } else {
          ///  listData[1]([]);
          setSnackMsg(communication.NoData);
          setSnackbarType("info");
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setActivityNamesListTemp(activityNamesList);
    } else {
      setActivityNamesListTemp(
        activityNamesList.filter((el: YourEstimationModel) => {
          return el.productName.toString().toLowerCase().includes(query.toLowerCase());
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

  const handelEditAndDelete = (type: string | null, a: YourEstimationModel | undefined) => {
    if (type?.toLowerCase() === "view details" && a !== undefined) {
      navigate(`/generaluser/imagegallery/productestimationdetails`, { state: { userDesignEstimationID: a.id } });
    } else if (type?.toLowerCase() === "send enquiry" && a !== undefined) {
      InsertDesignEstimationEnquiry(a.id, a.totalAmount);
    } else if (type?.toLowerCase() === "view" && a !== undefined) {
      setOpenDialog(true);
    }
  };

  const InsertDesignEstimationEnquiry = (userDesignEstimationID: number, totalAmount: number) => {
    const params = {
      ID: userDesignEstimationID,
      TotalAmount: totalAmount,
      Status: true,
    };
    Provider.create("generaluserenquiryestimations/insertdesignestimateenquiries", params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          setSnackMsg(communication.EstimationSent);
          setSnackbarType("success");
          setOpen(true);
          FetchData(CookieUserID);
          setLoading(true);
        } else {
          setSnackMsg(communication.Error);
          setSnackbarType("error");
          setOpen(true);
        }
      })
      .catch((e) => {
        setSnackMsg(communication.Error);
        setSnackbarType("error");
        setOpen(true);
      });
  };
 //#endregion 
  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography sx={{ ml: 1 }} variant="h4">
              Your Estimations
            </Typography>

            <Typography sx={{ ml: 1, mt: 2, borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }} variant="h6">
              Estimation List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
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
                      getRowHeight={() => "auto"}
                      rows={activityNamesListTemp}
                      columns={yourEstimationColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...activityNamesList];
                        let a: YourEstimationModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        handelEditAndDelete((e.target as any).textContent, a);
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

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{dialogHeader}</DialogTitle>
        <DialogContent>
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            <ListItem>
              <ListItemText primary="Contractor Name" secondary={contractorName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Quotation Amount" secondary={quotationAmount} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Contractor Accept Status" secondary={cas} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Work Allot Status" secondary={was} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Action" secondary={action} />
            </ListItem>
            <ListItem>
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

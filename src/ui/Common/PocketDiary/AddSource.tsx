import { Alert, AlertColor, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Provider from "../../../api/Provider";
import Header from "../../../components/Header";
import NoData from "../../../components/NoData";
import { SourceModel, } from "../../../models/Model";
import { communication } from "../../../utils/communication";
import { SourceColumns } from "../../../utils/tablecolumns";
import ListIcon from "@mui/icons-material/List";
import { APIConverter } from "../../../utils/apiconverter";
import SearchIcon from "@mui/icons-material/Search";


const AddSource = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  const theme = useTheme();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables
  const [pktEntryTypeID, setPktEntryTypeID] = useState("0");
  const [loading, setLoading] = useState(true);
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [pageSize, setPageSize] = useState<number>(5);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [searchQuery, setSearchQuery] = useState("");


  const [sourceList, setSourceList] = useState<Array<SourceModel>>([]);
  const [sourceListTemp, setSourceListTemp] = React.useState<Array<any>>([]);


  //#endredgion

  //#region Functions

  useEffect(() => {
    FetchEntryType();
    //FetchRecepientMode();

  }, []);


  const FetchEntryType = () => {
    debugger;
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
      },
    };
    Provider.createDFPocketDairy(Provider.API_URLS.get_pckentrytype, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            debugger;
            // response.data.data = APIConverter(response.data.data);

          }
        } else {
          setSnackbarMessage(communication.NoData);
          setIsSnackbarOpen(true);
          setSnackbarType("info");
        }
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarMessage(e.message);
        setSnackbarType("error");
        setIsSnackbarOpen(true);
      });
  };


  const FetchRecepientMode = () => {
    let params = {
      data: {
        Sess_UserRefno: "2",
        service_product_refno: "all",
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.ServiceProductrefNoCheck, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);

          }
        } else {
          setSnackbarMessage(communication.NoData);
          setIsSnackbarOpen(true);
          setSnackbarType("info");
        }
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarMessage(e.message);
        setSnackbarType("error");
        setIsSnackbarOpen(true);
      });
  };









  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // SetFilters(snFilter, cnFilter, query);
  };


  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  //   const handleEditAndDelete = (type: string | null, a: ProductModel | undefined) => {
  //     if (type?.toLowerCase() === "edit" && a !== undefined) {
  //       setDataGridOpacity(0.3);
  //       setDataGridPointer("none");
  //     }
  //   };


  //#endredgion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
          <Typography variant="h6">
            Source List
          </Typography>
        </Grid>
        <Grid item xs={4} sm={8} md={12}>
          {loading ? (
            <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
              {sourceList.length === 0 ? (
                <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
              ) : (
                <>
                  <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                    <TextField
                      placeholder="Search"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        //   onChangeSearch((e.target as HTMLInputElement).value);
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
                    rows={sourceListTemp}
                    columns={SourceColumns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    disableSelectionOnClick
                    onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                      const arrActivity = [...sourceList];
                      let a: SourceModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                      //    handelEditAndDelete((e.target as any).textContent, a);
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
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddSource;

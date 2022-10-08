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
import Provider from "../../../api/Provider";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { communication } from "../../../utils/communication";
import { ClientModel } from "../../../models/Model";
import { clientColumns } from "../../../utils/tablecolumns";

const ContractorClientPage = () => {

  
 //#region Variables
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
  const [clientList, setClientList] = useState<Array<ClientModel>>([]);
  const [clientListTemp, setClientListTemp] = useState<Array<ClientModel>>([]);
  const dataType = useState("add");
  const cardDisplay = useState("none");
  let navigate = useNavigate();

  let selectedData = useState<ClientModel>();
 //#endregion 

 //#region Functions
  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
      FetchData(cookies.dfc.UserID, "");
    }
  }, []);

  const FetchData = (userID: number, type: string) => {
    let params = {
      AddedByUserID: userID,
    };
    Provider.getAll(`contractorquotationestimation/getclients?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          console.log(JSON.stringify(response.data.data));
          if (response.data.data) {
            const lisData = [...response.data.data];
            lisData.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setClientList(lisData);
            setClientListTemp(lisData);
            if (type !== "") {
              setSnackMsg("Client " + type);
              setSnackbarType("success");
              setOpen(true);
            }
          }
        } else {
          setSnackMsg(communication.NoData);
          setSnackbarType("info");
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setSnackMsg(e.message);
        setSnackbarType("error");
        setOpen(false);
        setLoading(false);
      });
  };

  const onChangeSearch = () => {
    if (searchName === "" && searchMobile === "") {
      setClientListTemp(clientList);
    } else {
      setClientListTemp(
        clientList.filter((el: ClientModel) => {
          if (searchMobile === "" && searchName !== "") return el.companyName.toString().toLowerCase().includes(searchName.toLowerCase());
          else if (searchMobile !== "" && searchName === "") return el.contactMobileNumber.toString().toLowerCase().includes(searchMobile.toLowerCase());
          else {
            return el.companyName.toString().toLowerCase().includes(searchName.toLowerCase()) || el.contactMobileNumber.toString().toLowerCase().includes(searchMobile.toLowerCase());
          }
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
//#endregion 

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
            <div style={{ marginTop: "30px", float: "left" }}>
              <div style={{ float: "left" }}>
                <Button variant="contained" onClick={onChangeSearch}>
                  Search
                </Button>
              </div>
              <div style={{ float: "left", marginLeft: "16px", marginTop: "8px" }}>
                <Typography>OR</Typography>
              </div>
              <div style={{ float: "left", marginLeft: "16px" }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    cardDisplay[1]("block");
                  }}
                >
                  Create Client
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
            <CreateClient
              client={selectedData[0]}
              saveCallBack={(data, actionType) => {
                try {
                  if (data.data && data.data.code === 200) {
                    FetchData(CookieUserID, actionType);
                    cardDisplay[1]("none");
                    setDataGridOpacity(1);
                    setDataGridPointer("auto");
                  } else if (data.data.code === 304) {
                    setSnackMsg(communication.ExistsError);
                    setOpen(true);
                    setSnackbarType("error");
                  } else {
                    setSnackMsg(communication.Error);
                    setOpen(true);
                    setSnackbarType("error");
                  }
                } catch (e) {
                  setSnackMsg(communication.Error);
                  setOpen(true);
                  setSnackbarType("error");
                }
              }}
              cancelCallBack={() => {
                cardDisplay[1]("none");
                setDataGridOpacity(1);
                setDataGridPointer("auto");
              }}
              type={dataType[0]}
              cardDisplay={cardDisplay[0]}
            />
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {clientList.length === 0 ? (
                  <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <>
                    <DataGrid
                      style={{
                        opacity: dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      autoHeight={true}
                      getRowHeight={() => "auto"}
                      rows={clientListTemp}
                      columns={clientColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...clientList];
                        cardDisplay[1]("block");
                        dataType[1]("edit");
                        let a: ClientModel | undefined = arrActivity.find((el) => el.id === param.row.id);

                        selectedData[1](a);
                        setDataGridOpacity(0.3);
                        setDataGridPointer("none");
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

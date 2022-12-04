import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "../../../theme/AppTheme";
import { useCookies } from "react-cookie";
import Header from "../../../components/Header";
import Provider from "../../../api/Provider";
import { declinedColumns } from "../../../utils/tablecolumns";
import { DFDeclinedModel } from "../../../models/Model";
import { communication } from "../../../utils/communication";

const Declined = () => {
  //return <></>;
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/login`);
  }, []);
  //#region Variables
  const [loading, setLoading] = useState(true);

  const [declinedName, setDeclinedName] = React.useState("");
  const [declinedNamesList, setDeclinedNameList] = useState<Array<DFDeclinedModel>>([]);
  const [declinedNamesListTemp, setDeclinedNameListTemp] = React.useState<Array<any>>([]);

  const [declinedNameError, setDeclinedNameError] = useState("");
  const [isDeclinedNameError, setIsDeclinedNameError] = useState(false);

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
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  //#endregion 
///endregionn
  //#region Functions
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setDeclinedNameListTemp(declinedNamesList);
    } else {
      setDeclinedNameListTemp(
        declinedNamesList.filter((el: DFDeclinedModel) => {
          return el.company_name.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  //   const handelEditAndDelete = (
  //     type: string | null,
  //     a: DeclinedModel | undefined
  //   ) => {
  //     if (type?.toLowerCase() === "edit" && a !== undefined) {
  //       setSelectedID(a.userID);
  //     }
  // };

  useEffect(() => {
    FetchData();
  }, []);

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const approveUserStatus = () => {
    handleClose();
    setButtonLoading(true);
    const params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        user_refno: selectedID
      }
    };
    debugger;
    Provider.createDFAdmin("userapprovestatus/", params)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          FetchData();
          alert("Approved Successfully")
        } else {
          setLoading(false);
          setSnackMsg(communication.NetworkError);
          setOpen(true);
        }
        setButtonLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
  };

  const FetchData = () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        group_refno: 'all',
      },
    };
    debugger;
    ResetFields();
    Provider.createDFAdmin("getuserdeclinedlist/ ", params)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.id = a.user_refno;
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            // setDeclinedNameList(response.data.data);
            // setDeclinedNameListTemp(response.data.data);
            setDeclinedNameList(arrList);
            setDeclinedNameListTemp(arrList);
          }
        } else {
          // setSnackMsg(communication.Error);
          // setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  //#endregion 

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
            <Typography variant="h4"> USERS </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">User Declined List</Typography>
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
                {declinedNamesList.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        //sx={{justifySelf:"flex-end"}}
                        onChange={(e) => {
                          onChangeSearch((e.target as HTMLInputElement).value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              < SearchIcon />
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
                      rowHeight={80}
                      // getRowId={(row) => row.userID}
                      rows={declinedNamesListTemp}
                      columns={declinedColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick={true}
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        if (param.field === 'action') {
                          debugger;
                          const arrActivity = [...declinedNamesList];
                          let a: DFDeclinedModel | undefined =
                            arrActivity.find((el) => el.user_refno === param.row.user_refno);
                          //  handelEditAndDelete((e.target as any).textContent, a);
                          setSelectedID(a.id);
                          setOpen(true);
                        }
                      }}
                      sx={{
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        },
                        mb: 1
                      }}
                    />

                  </>
                )}
              </div>
            )}
          </Grid>

        </Grid>
      </Container>
      <div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>Confirm to Approve?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                approveUserStatus();
              }}
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>

  );
};

export default Declined;

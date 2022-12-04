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
import { pendingColumns } from "../../../utils/tablecolumns";
import { DFPendingModel } from "../../../models/Model";
import { communication } from "../../../utils/communication";
// import "react-toastify/dist/ReactToastify.css"

const Pending = () => {
  //return <></>;
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/login`);
  }, []);
  //#region Variables
  const [loading, setLoading] = useState(true);

  const [pendingName, setPendingName] = React.useState("");
  const [pendingNamesList, setPendingNameList] = useState<Array<DFPendingModel>>([]);
  const [pendingNamesListTemp, setPendingNamesListTemp] = React.useState<Array<any>>([]);
  const [pendingNameError, setPendingNameError] = useState("");
  const [isPendingNameError, setIsPendingNameError] = useState(false);
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
  const [decline, setDecline] = React.useState(false);




  //Modal







  //#endregion 

  //#region Functions
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setPendingNamesListTemp(pendingNamesList);
    } else {
      setPendingNamesListTemp(
        pendingNamesList.filter((el: DFPendingModel) => {
          return el.role.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  // const handelEditAndDelete = (
  //   type: string | null,
  //   a: DFPendingModel | undefined
  // ) => {
  //   if (type?.toLowerCase() === "edit" && a !== undefined) {
  //     setDataGridOpacity(0.3);
  //     setDataGridPointer("none");
  //     setPendingName(a?.role);
  //     setSelectedID(a.id);
  //     setPendingNameError("");
  //     setIsPendingNameError(false);
  //     setButtonDisplay("unset");
  //     setActionStatus("edit");
  //   }
  // };
  const handleApprove = (
    type: string | null,
    a: DFPendingModel | undefined
  ) => {
    if (type?.toLowerCase() === "approve" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setPendingName(a?.role);
      setSelectedID(a.id);
      setPendingNameError("");
      setIsPendingNameError(false);
      setButtonDisplay("unset");
      setActionStatus("approve");
    }
  };
  const handelDecline = (
    type: string | null,
    a: DFPendingModel | undefined
  ) => {
    if (type?.toLowerCase() === "decline" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setPendingName(a?.role);
      setSelectedID(a.id);
      setPendingNameError("");
      setIsPendingNameError(false);
      setButtonDisplay("unset");
      setActionStatus("decline");
    }
  };

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
  };


  const handleClose = () => {
    setOpen(false);
    setDecline(false)
  };
  const handleCloseDecline = () => {
    // setOpen(false);
    setDecline(false)
  };


  const approveUserStatus = () => {
    debugger;
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
        debugger;
        if (response.data && response.data.code === 200) {
          FetchData();
          // toast("Approved Successfully!");
          alert("Approved Successfully")
        } else {
          setLoading(false);
          setSnackMsg(communication.NetworkError);
          setOpen(true);
          setDecline(true);
        }
        setButtonLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setOpen(true);
        setDecline(true);
      });
  };
  const DeclineUserStatus = () => {
    handleClose();
    setButtonLoading(true);
    const params = {
      data:{
      Sess_UserRefno: cookies.dfc.UserID,
      user_refno: selectedID
      }
    };
    Provider.createDFAdmin("userdeclinestatus/", params)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          FetchData();
          alert("Declined Successfully")
        } else {
          setLoading(false);
          setSnackMsg(communication.NetworkError);
          setOpen(true);
          setDecline(true);
        }
        setButtonLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setOpen(true);
        setDecline(true);
      });
  };





  const FetchData = () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        user_refno: 'all',
      },
    };
    
    ResetFields();
    debugger;
    Provider.createDFAdmin("getuserpendinglist/", params)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.id = a.user_refno;
              //a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);

            });
            setPendingNameList(response.data.data);
            setPendingNamesListTemp(response.data.data);
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
        setDecline(true)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  //#endregion 

  //  console.log(PendingNameList);
  //  console.log(PendingNamesListTemp);
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
            <Typography variant="h6">User Pending List</Typography>
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
                {pendingNamesList.length === 0 ? (
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
                      rows={pendingNamesListTemp}
                      // getRowId={(row: any) =>  row.user_refno + row.company_name+row.firstname+row.mobile_no+row.group_name+row.approved_status}
                      columns={pendingColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        if (param.field === 'approve') {
                          debugger;
                          const arrActivity = [...pendingNamesList];
                          let a: DFPendingModel | undefined =
                            arrActivity.find((el) =>el.user_refno === param.row.user_refno);
                          //handleApprove((e.target as any).textContent, a);
                          setSelectedID(a.id);
                          setOpen(true)

                        }
                        if (param.field === 'decline') {
                          debugger;
                          const arrActivity = [...pendingNamesList];
                          let a: DFPendingModel | undefined =
                          arrActivity.find((el) => el.user_refno === param.row.user_refno);
                         // handelDecline((e.target as any).textContent, a);
                         setSelectedID(a.id);
                          setDecline(true)
                          
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
            <DialogContentText>Confirm for Approve ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                approveUserStatus();
                // DeclineUserStatus();
              }}
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={decline} onClose={handleCloseDecline} fullWidth maxWidth="sm">
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>Confirm to Decline ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDecline}>Cancel</Button>
            <Button
              onClick={() => {
                DeclineUserStatus();
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

export default Pending;

// export const declineModal=()=>{
//   <Modal
//     decline={decline}
//     onClose={handleClose}
//     aria-labelledby="modal-modal-title"
//     aria-describedby="modal-modal-description"
//   >
//     <Box sx={style}>
//       <Typography id="modal-modal-title" variant="h6" component="h2">
//         Text in a modal
//       </Typography>
//       <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//       </Typography>
//     </Box>
//   </Modal>
//   }
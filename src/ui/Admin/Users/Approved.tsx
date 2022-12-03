// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   InputAdornment,
//   TextField,
//   Typography,
//   NativeSelect,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import SearchIcon from "@mui/icons-material/Search";
// import { theme } from "../../../theme/AppTheme";
// import { useCookies } from "react-cookie";
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import Header from "../../../components/Header";
// import DataContexts from "../../../contexts/DataContexts";
// import Provider from "../../../api/Provider";
// import { approvedColumns } from "../../../utils/tablecolumns";
// import { DFApprovredModel } from "../../../models/Model";
// import { communication } from "../../../utils/communication";

// const Approved = () => {
//   //return <></>;
//   const [cookies, setCookie] = useCookies(["dfc"]);
//   let navigate = useNavigate();

//   useEffect(() => {
//     if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
//       navigate(`/login`);
//   }, []);
//  //#region Variables
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [approvedName, setApprovedName] = React.useState("");
//   const [approvedNamesList, setApprovedNamesList] = useState<Array<DFApprovredModel>>([]);

//   const [approvedNamesListTemp, setApprovedNamesListTemp] = React.useState<Array<any>>([]);

//   const [approvedNameError, setApprovedNameError] = useState("");
//   const [isApprovedNameError, setIsApprovedNameError] = useState(false);

//   const [pageSize, setPageSize] = React.useState<number>(5);
//   const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
//   const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
//   const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">(
//     "auto"
//   );
//   const [actionStatus, setActionStatus] = React.useState<string>("new");
//   const [selectedID, setSelectedID] = React.useState<number>(0);
//   const [snackMsg, setSnackMsg] = React.useState("");
//   const [buttonLoading, setButtonLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
// //#endregion 

//  //#region Functions
//   const onChangeSearch = (query: string) => {
//     debugger;
//     setSearchQuery(query);
//     if (query === "") {
//       setApprovedNamesListTemp(approvedNamesList);
//     } else {
//       setApprovedNamesListTemp(
//         approvedNamesList.filter((el: DFApprovredModel) => {
//           return el.username.toString().toLowerCase().includes(query.toLowerCase());
//         })
//       );
//     }
//   };

//   const handelEditAndDelete = (
//     type: string | null,
//     a: DFApprovredModel | undefined
//   ) => {
//     if (a !== undefined) {
//       setSelectedID(a.userID);
//     }
//   };

//   useEffect(() => {
//     FetchData();
//   }, []);

//   const ResetFields = () => {
//     setSelectedID(0);
//     setActionStatus("new");
//     setDataGridOpacity(1);
//     setDataGridPointer("auto");
//     setButtonDisplay("none");
//     setButtonLoading(false);
//     setOpen(false);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const UpdateUserStatus = () => {
//     handleClose();
//     setButtonLoading(true);
//     const params = {
//       UserID: selectedID,
//       Status: 2,
//     };
//     Provider.createDF("master/updateuserstatus", params)
//       .then((response) => {
//         if (response.data && response.data.code === 200) {
//           FetchData();
//         } else {
//           setLoading(false);
//           setSnackMsg(communication.NetworkError);
//           setOpen(true);
//         }
//         setButtonLoading(false);
//       })
//       .catch((e) => {
//         setLoading(false);
//         setSnackMsg(communication.NetworkError);
//         setOpen(true);
//       });
//   };

//   const FetchData = () => {
//     let params = {
//       data: {
//         Sess_UserRefno: cookies.dfc.UserID,
//         group_refno: 'all',
//       },
//     };
//     ResetFields();
//     Provider.createDF("apiappadmin/spawu7S4urax/tYjD/getuserapprovelist/", params)
//       .then((response: any) => {
//         if (response.data && response.data.code === 200) {
//           if (response.data.data) {
//             const arrList = [...response.data.data];
//             arrList.map(function (a: any, index: number) {
//               a.id = a.user_refno;
//               let sr = { srno: index + 1 };
//               a = Object.assign(a, sr);
//             });
//             setApprovedNamesList(arrList);
//             setApprovedNamesListTemp(arrList);
//           }
//         } else {
//           // setSnackMsg(communication.Error);
//           // setOpen(true);
//         }
//         setLoading(false);
//       })
//       .catch((e) => {
//         setLoading(false);
//         setSnackMsg(communication.NetworkError);
//         setOpen(true);
//       });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   };
// //#endregion 

//   return (
//     <Box sx={{ mt: 11 }}>
//       <Header />
//       <Container maxWidth="lg">
//         <Grid
//           container
//           spacing={{ xs: 1, md: 2 }}
//           columns={{ xs: 4, sm: 8, md: 12 }}
//         >
//           <Grid item xs={4} sm={8} md={12}>
//             <Typography variant="h4"> USERS </Typography>
//           </Grid>
//           <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
//             <Typography variant="h6">User Approved List</Typography>
//           </Grid>

//           <Grid item xs={4} sm={8} md={12}>
//             {loading ? (
//               <Box
//                 height="300px"
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 sx={{ m: 2 }}
//               >
//                 <CircularProgress />
//               </Box>
//             ) : (
//               <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
//                 {approvedNamesList.length === 0 ? (
//                   <></>
//                 ) : (
//                   <>
//                     <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
//                       <TextField
//                         placeholder="Search"
//                         variant="outlined"
//                         size="small"
//                         //sx={{justifySelf:"flex-end"}}
//                         onChange={(e) => {
//                           onChangeSearch((e.target as HTMLInputElement).value);
//                         }}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               < SearchIcon />
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </Grid>
//                     <DataGrid
//                       style={{
//                         opacity: dataGridOpacity,
//                         pointerEvents: dataGridPointer,
//                       }}
//                       rowHeight={80}
//                       rows={approvedNamesListTemp}
//                         //  getRowId={(row: any) =>  row.user_refno + row.company_name+row.firstname+row.mobile_no+row.group_name+row.approve_status+row.departmentname+row.designationname+row.user_name+row.password}
//                       getRowId={(row) => row.userID}
//                       columns={approvedColumns}
//                       pageSize={pageSize}
//                       rowsPerPageOptions={[5, 10, 20]}
//                       onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//                       disableSelectionOnClick={true}
//                       onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
//                         debugger;
//                         if (param.field === 'action') {
//                           debugger;
//                           const arrActivity = [...approvedNamesList];
//                             let a: DFApprovredModel | undefined =
//                               arrActivity.find((el) => el.userID === param.row.userID);
//                              debugger;
//                             handelEditAndDelete((e.target as any).textContent, a);
//                             setOpen(true);
//                         }
//                         // else if (param.field === ' ') {
//                         //   const arrActivity = [...approvedNamesList];
//                         //   let a: DFApprovredModel | undefined = arrActivity.find((el) => el.id === param.row.id);


//                         }
//                       }

//                       //   
//                       // }}
//                       sx={{
//                         "& .MuiDataGrid-columnHeaders": {
//                           backgroundColor: theme.palette.primary.main,
//                           color: theme.palette.primary.contrastText,
//                         },
//                         mb: 1
//                       }}
//                     />

//                   </>
//                 )}
//               </div>
//             )}
//           </Grid>
//         </Grid>
//       </Container>
//       <div>
//         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//           <DialogTitle>Confirmation</DialogTitle>
//           <DialogContent>
//             <DialogContentText>Confirm to Decline?</DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button
//               onClick={() => {
//                 UpdateUserStatus();
//               }}
//               autoFocus
//             >
//               OK
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </Box>
//   );
// };

// export default Approved;
// 

//  console.log(PendingNameList);
//  console.log(PendingNamesListTemp);
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  NativeSelect,
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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Header from "../../../components/Header";
import DataContexts from "../../../contexts/DataContexts";
import Provider from "../../../api/Provider";
import { approvedColumns } from "../../../utils/tablecolumns";
import { DFApprovredModel } from "../../../models/Model";
import { communication } from "../../../utils/communication";
import axios from "axios";

const Approved = () => {
  //return <></>;
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/login`);
  }, []);
  //#region Variables
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [approvedName, setApprovedName] = React.useState("");
  const [approvedNamesList, setApprovedNamesList] = useState<Array<DFApprovredModel>>([]);

  const [approvedNamesListTemp, setApprovedNamesListTemp] = React.useState<Array<any>>([]);

  const [approvedNameError, setApprovedNameError] = useState("");
  const [isApprovedNameError, setIsApprovedNameError] = useState(false);

  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">(
    "auto"
  );
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  //#endregion 

  //#region Functions
  const onChangeSearch = (query: string) => {
    debugger;
    setSearchQuery(query);
    if (query === "") {
      setApprovedNamesListTemp(approvedNamesList);
    } else {
      setApprovedNamesListTemp(
        approvedNamesList.filter((el: DFApprovredModel) => {
          return el.user_refno.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const handelDecline = (
    type: string | null,
    a: DFApprovredModel | undefined
  ) => {
    if (a !== undefined) {
      setSelectedID(a.userID);
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
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const ApproveUserStatus = () => {
    handleClose();
    setButtonLoading(true);
    const params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        user_refno: selectedID
      }
    };
    debugger;
    Provider.createDFAdmin("userdeclinestatus/", params)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          FetchData();
          alert("Decline Successfully")
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
  // const approveUserStatus= async(currentUserId)=>{
  //   handleClose();
  //   setButtonLoading(true);
  //   await axios.delete(``)
  // }

  const FetchData = () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        user_refno: 'all',
      },
    };
    // debugger;
    ResetFields();
    Provider.createDFAdmin("getuserapprovelist/", params)
      .then((response: any) => {
        // debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.id = a.user_refno;
              //  a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setApprovedNamesList(response.data.data);
            setApprovedNamesListTemp(response.data.data);
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
            <Typography variant="h6">User Approved List</Typography>
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
                {approvedNamesList.length === 0 ? (
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
                      rows={approvedNamesListTemp}
                      //  getRowId={(row: any) =>  row.user_refno + row.company_name+row.firstname+row.mobile_no+row.group_name+row.approve_status+row.departmentname+row.designationname+row.user_name+row.password}
                      // getRowId={(row) => row.userID}
                      columns={approvedColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick={true}
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        debugger;
                        if (param.field === 'action') {
                          debugger;
                          const arrActivity = [...approvedNamesList];
                          let a: DFApprovredModel | undefined =
                            arrActivity.find((el) => el.user_refno === param.row.user_refno);
                          debugger;
                          handelDecline((e.target as any).textContent, a);
                          setOpen(true);
                          setSelectedID(a.id);
                        }
                        // else if (param.field === ' ') {
                        //   const arrActivity = [...approvedNamesList];
                        //   let a: DFApprovredModel | undefined = arrActivity.find((el) => el.id === param.row.id);


                      }
                      }

                      //   
                      // }}
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
            <DialogContentText>Confirm to Decline?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                ApproveUserStatus();
              }}
              autoFocus
            >
              OK
            </Button>
            {/* <Button onClick={()=> approveUserStatus(currentUserId)} autoFocus>OK</Button> */}
          </DialogActions>
        </Dialog>
      </div>
    </Box>

  );
};

export default Approved;

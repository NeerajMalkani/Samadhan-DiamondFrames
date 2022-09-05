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
    import React,{ useEffect,useState } from "react";
    import { DataGrid } from "@mui/x-data-grid";
    import SearchIcon from "@mui/icons-material/Search";
    import { theme } from "../../../theme/AppTheme";
    import { useCookies } from "react-cookie";
    import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
    import Header from "../../../components/Header";
    import DataContexts from "../../../contexts/DataContexts";
    import Provider from "../../../api/Provider";
    import { declinedColumns } from "../../../utils/tablecolumns";
    import { DeclinedModel } from "../../../models/Model";
    import { communication } from "../../../utils/communication";
    
    const Declined = () => {
      //return <></>;
        const [cookies, setCookie] = useCookies(["dfc"]);
        let navigate = useNavigate();
    
        useEffect(() => {
          if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
            navigate(`/login`);
        }, []);
    
        const [loading, setLoading] = useState(true);
      
        const [declinedName, setDeclinedName] = React.useState("");
        const [declinedNamesList, setDeclinedNameList] =useState<Array<DeclinedModel>>([]);
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
    
        const onChangeSearch = (query: string) => {
          setSearchQuery(query);
          if (query === "") {
            setDeclinedNameListTemp(declinedNamesList);
          } else {
            setDeclinedNameListTemp(
              declinedNamesList.filter((el: DeclinedModel) => {
                return el.username.toString().toLowerCase().includes(query.toLowerCase());
              })
            );
          }
        };
    
          const handelEditAndDelete = (
            type: string | null,
            a: DeclinedModel | undefined
          ) => {
            if (type?.toLowerCase() === "edit" && a !== undefined) {
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

        const UpdateUserStatus = () => {
          handleClose();
          setButtonLoading(true);
          const params = {
            UserID: selectedID,
            Status: 1,
          };
          Provider.create("master/updateuserstatus", params)
            .then((response) => {
              if (response.data && response.data.code === 200) {
                FetchData();
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
          ResetFields();
          Provider.getAll("master/getdeclinedusers")
            .then((response: any) => {
              if (response.data && response.data.code === 200) {
                if (response.data.data) {
                  const arrList = [...response.data.data];
                  arrList.map(function (a: any, index: number) {
                    let sr = { srno: index + 1 };
                    a = Object.assign(a, sr);
                  });
                  setDeclinedNameList(response.data.data);
                  setDeclinedNameListTemp(response.data.data);
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
    
        return (
          <Box sx={{ mt:11 }}>
            <Header/>
              <Container maxWidth="lg">
                <Grid
                container
                spacing={{ xs:1, md:2}}
                columns={{ xs:4, sm:8, md:12}}
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
                            getRowId={(row) => row.userID}
                            rows={declinedNamesListTemp}
                            columns={declinedColumns}
                            pageSize={pageSize}
                            rowsPerPageOptions={[5, 10, 20]}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            disableSelectionOnClick
                            onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                              const arrActivity = [...declinedNamesList];
                              let a: DeclinedModel | undefined =
                                arrActivity.find((el) => el.userID === param.row.userID);
                              handelEditAndDelete((e.target as any).textContent, a);
                              setOpen(true);
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
                UpdateUserStatus();
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
    
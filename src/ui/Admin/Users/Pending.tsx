import {
    Box,
    Button,
    Container,
    Grid,
    InputAdornment,
    TextField,
    Typography,
    NativeSelect,
    CircularProgress
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
    import { pendingColumns } from "../../../utils/tablecolumns";
    import { PendingModel } from "../../../models/Model";
    import { communication } from "../../../utils/communication";
    
    const Pending = () => {
      //return <></>;
        const [cookies, setCookie] = useCookies(["dfc"]);
        let navigate = useNavigate();
    
        useEffect(() => {
          if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
            navigate(`/login`);
        }, []);
    
        const [loading, setLoading] = useState(true);
      
        const [pendingName, setPendingName] = React.useState("");
        const [pendingNamesList, setPendingNameList] =useState<Array<PendingModel>>([]);
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
    
        const onChangeSearch = (query: string) => {
          setSearchQuery(query);
          if (query === "") {
            setPendingNamesListTemp(pendingNamesList);
          } else {
            setPendingNamesListTemp(
              pendingNamesList.filter((el: PendingModel) => {
                return el.role.toString().toLowerCase().includes(query.toLowerCase());
              })
            );
          }
        };
    
          const handelEditAndDelete = (
            type: string | null,
            a: PendingModel | undefined
          ) => {
            if (type?.toLowerCase() === "edit" && a !== undefined) {
              setDataGridOpacity(0.3);
              setDataGridPointer("none");
              setPendingName(a?.role);
              setSelectedID(a.id);
              setPendingNameError("");
              setIsPendingNameError(false);
              setButtonDisplay("unset");
              setActionStatus("edit");
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
    
        const FetchData = () => {
          ResetFields();
          Provider.getAll("master/getpendingusers")
            .then((response: any) => {
              if (response.data && response.data.code === 200) {
                if (response.data.data) {
                  const arrList = [...response.data.data];
                  arrList.map(function (a: any, index: number) {
                    a.display = a.display ? "Yes" : "No";
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
                            columns={pendingColumns}
                            pageSize={pageSize}
                            rowsPerPageOptions={[5, 10, 20]}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            disableSelectionOnClick
                            onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                              const arrActivity = [...pendingNamesList];
                              let a: PendingModel | undefined =
                                arrActivity.find((el) => el.id === param.row.id);
                              handelEditAndDelete((e.target as any).textContent, a);
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
          </Box>
    
        );
    };
    
    export default Pending;
    
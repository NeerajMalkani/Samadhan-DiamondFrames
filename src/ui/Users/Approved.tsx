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
import {theme } from "../../theme/AppTheme";
import { useCookies } from "react-cookie";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Header from "../../components/Header";
import DataContext from "../contexts/DataContexts";
import Provider from "../api/Provider";
import { activityColumns } from "../utils/tablecolumns";
import { ActivityRoleNameModel } from "../models/Model";
import { communication } from "../utils/communication";

const Approved = () => {
  debugger;
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/login`);
  }, []);

  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
  const [activityName, setActivityName] = React.useState("");
  const [activityNamesList, setActivityNamesList] =
    React.useContext(DataContext).activityNamesList;

  const [activityNamesListTemp, setActivityNamesListTemp] = React.useState<Array<any>>([]);

  const [activitynameError, setactivitynameError] = useState("");
  const [isActivitynameError, setIsActivitynameError] = useState(false);
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
      setActivityNamesListTemp(activityNamesList);
    } else {
      setActivityNamesListTemp(
        activityNamesList.filter((el: ActivityRoleNameModel) => {
          return el.activityRoleName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

    const handelEditAndDelete = (
      type: string | null,
      a: ActivityRoleNameModel | undefined
    ) => {
      if (type?.toLowerCase() === "edit" && a !== undefined) {
        setDataGridOpacity(0.3);
        setDataGridPointer("none");
        setDisplay(a.display);
        setActivityName(a?.activityRoleName);
        setSelectedID(a.id);
        setactivitynameError("");
        setIsActivitynameError(false);
        setButtonDisplay("unset");
        setActionStatus("edit");
      }
      // else if (type?.toLowerCase() === "delete" && a !== undefined) {
      //   setSelectedID(a.id);
      //   Provider.deleteAllParams("master/deleteactivityroles", { ID: a.id })
      //     .then((response) => {
      //       if (response.data && response.data.code === 200) {
      //         FetchData();
      //       } else {
      //         setSnackMsg("your request cannot be processed");
      //         setOpen(true);
      //       }
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //       setSnackMsg("your request cannot be processed");
      //       setOpen(true);
      //     });
      // }
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
    Provider.getAll("master/getactivityroles")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setActivityNamesList(response.data.data);
            setActivityNamesListTemp(response.data.data);
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
            <Typography variant="h5"> <FormatListBulletedIcon/> &nbsp;<b>USERS</b> </Typography>
            </Grid>
           <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h5"><b>User Approved List</b></Typography>
           </Grid>
            <Grid>
            <hr style={{width:'1000px',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:'dotted'}}></hr>
            </Grid>
            <Grid item xs={4} >
              <Typography variant="h6"><b>Show </b>&nbsp;<NativeSelect></NativeSelect>&nbsp;entries</Typography>
            </Grid>
            {/* <Grid>
              <div style={{border:"1px solid black",alignItems:"flex-end",}}>
                  <Grid item xs={4} sm={8} md={12} sx={{ alignItems:"flex-end",justifyContent:"flex-end",mb:1,display:"flex",mr:1}}>
                    <TextField
                    placeholder="Search"
                    variant="outlined"
                    size="small"
                        //sx={{justifySelf:"flex-end"}}
                        // onChange={(e) => {
                        //   onChangeSearch((e.target as HTMLInputElement).value);
                        // }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              < SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                    ></TextField>
                  </Grid>
              </div>
            </Grid>
 */}
                  {/* <DataGrid
                   style={{
                    opacity: dataGridOpacity,
                    pointerEvents: dataGridPointer,
                   }}
                   rows={activityNamesListTemp}
                   columns={activityColumns}
                   pageSize={pageSize}
                   rowsPerPageOptions={[5,10,20]}
                   onPageSizeChange={(newPageSize)=> setPageSize(newPageSize)}
                   disableSelectionOnClick
                  //  onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                  //   const arrActivity = [...activityNamesList];
                  //   let a: ActivityRoleNameModel | undefined =
                  //     arrActivity.find((el) => el.id === param.row.id);
                  //   handelEditAndDelete((e.target as any).textContent, a);
                  // }}
                  sx={{
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    },
                    mb: 1
                  }}
                  ></DataGrid> */}

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
                {activityNamesList.length === 0 ? (
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
                      rows={activityNamesListTemp}
                      columns={activityColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...activityNamesList];
                        let a: ActivityRoleNameModel | undefined =
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

export default Approved;


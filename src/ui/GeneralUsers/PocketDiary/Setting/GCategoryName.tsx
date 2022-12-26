import { Alert, AlertColor, Box, Button, CircularProgress, Container, Select, MenuItem, FormHelperText, FormControl, FormControlLabel, FormLabel, Grid, Icon, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../../utils/communication";
import { aCategoryNameColumns } from "../../../../utils/tablecolumns";
import { theme } from "../../../../theme/AppTheme";
import { AcategoryNameModel } from "../../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from '@mui/icons-material/List';
import NoData from "../../../../components/NoData";
import { SelectChangeEvent } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { APIConverter } from "../../../../utils/apiconverter";


const GCategoryName = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables

  const [categoryName, setCategoryName] = React.useState("");
  const [categoryList, setCategoryList] = useState<Array<AcategoryNameModel>>([]);//React.useContext(DataContext).activityNamesList;
  const [categoryListTemp, setCategoryListTemp] = React.useState<Array<any>>([]);
  const [categoryNameError, setCategoryNameError] = useState("");
  const [isCategoryNameError, setIscategoryNameError] = useState(false);

  const transactionType = useState([
    { key: "Source", isSelected: false, id: 1 },
    { key: "Expenses", isSelected: false, id: 2 },
  ]);

  const istTypenameError = useState(false);
  const tTypeNameError = useState("");

  const [display, setDisplay] = React.useState("Yes");
  const [loading, setLoading] = useState(false);

  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState("");
  //#endregion 

  //#region Functions

  useEffect(() => {
    FetchTransactionType();
    FetchData("");
  }, []);

  const FetchTransactionType = () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.gettransactiontype_pckcategoryform_appadmin, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);

            const stateData: any = [];
            response.data.data.map((data: any, i: number) => {
              stateData.push({
                key: data.transTypeName,
                isSelected: false,
                id: data.transtypeID
              });
            });
            transactionType[1](stateData);

          }
        } else {
          setSnackbarType("info");
          setSnackMsg(communication.NoData);
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarType("error");
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };


  const FetchData = (type: string) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        pck_category_refno: "all"
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.pckcategoryrefnocheck, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.transactionType = a.transactionType ? "Source" : "Expenses";
              a.id = index + 1;
              a.display = a.display === "1" ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setCategoryList(arrList);
            setCategoryListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Category " + type);
              setOpen(true);
              setSnackbarType("success");
            }
          }
        } else {
          setSnackbarType("info");
          setSnackMsg(communication.NoData);
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarType("error");
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const ResetFields = () => {
    setSelectedID("0");
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);

    let arrService = [...transactionType[0]];
    arrService[0].isSelected = false;
    arrService[1].isSelected = false;

    transactionType[1](arrService);
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    let isValid = true;
    const IsTextFiledError = categoryName.trim() === "";
    setCategoryNameError(IsTextFiledError ? communication.BlankCategoryName : "");
    setIscategoryNameError(IsTextFiledError);
    if (!IsTextFiledError) {
      setButtonLoading(true);

      let blankData = transactionType[0].filter((el) => el.isSelected);
      if (blankData.length === 0) {
        isValid = false;
        istTypenameError[1](true);
        tTypeNameError[1]("Please select Transaction Type ");
      }

      if (isValid) {

        const tt = blankData.map((data) => data.id);
        InsertUpdateData(categoryName, display === "Yes", tt);
      }

      setDisplay("Yes");
      setCategoryName("");
      setCategoryNameError("");
      setIscategoryNameError(false);
    }
  };

  const handleCancelClick = () => {
    setDisplay("Yes");
    setCategoryName("");
    setCategoryNameError("");
    setIscategoryNameError(false);
    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    // setActionStatus("new");
    let arrService = [...transactionType[0]];
    arrService[0].isSelected = false;
    arrService[1].isSelected = false;

    transactionType[1](arrService);
  };

  const handelEditAndDelete = (type: string | null, a: AcategoryNameModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setCategoryName(a?.categoryName);
      setSelectedID(a.pckCategoryID);

      const stateData: any = [];
      transactionType[0].map((data: any, i: number) => {
        if (a.transactionTypeName.includes(data.key)) {
          stateData.push({
            key: data.key,
            isSelected: true,
            id: data.id
          });
        }
        else {
          stateData.push({
            key: data.key,
            isSelected: false,
            id: data.id
          });
        }
        transactionType[1](stateData);
      });

      setCategoryNameError("");
      setIscategoryNameError(false);
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

  const InsertUpdateData = (categoryName: string, checked: boolean, tt) => {
    if (actionStatus === "new") {
      Provider.createDFAdmin(Provider.API_URLS.pckcategorynamecreate, {
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          category_name: categoryName,
          pck_transtype_refno: tt,
          view_status: checked ? "1" : "0",
        }
      })
        .then((response) => {
          setButtonLoading(false);
          if (response.data && response.data.code === 200) {
            FetchData("added");
            ResetFields();
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
            ResetFields();
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    } else if (actionStatus === "edit") {
      Provider.createDFAdmin(Provider.API_URLS.pckcategorynameupdate, {
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          pck_category_refno: selectedID,
          category_name: categoryName,
          pck_transtype_refno: tt,
          view_status: checked ? "1" : "0",
        }
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("updated");
            ResetFields();
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
            ResetFields();
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //   const onChangeSearch = (query: string) => {
  //     setSearchQuery(query);
  //     if (query === "") {
  //       setActivityNamesListTemp(activityNamesList);
  //     } else {
  //       setActivityNamesListTemp(
  //         activityNamesList.filter((el: ActivityRoleNameModel) => {
  //           return el.activityRoleName.toString().toLowerCase().includes(query.toLowerCase());
  //         })
  //       );
  //     }
  //   };

  //#endregion


  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Category Name</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Category Name (Add /Edit)</Typography>
          </Grid>
          <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b><label style={{ color: "#ff0000" }}>*</label> Category Name</b>
            </Typography>
            <TextField
              fullWidth
              placeholder="Category Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setCategoryName((e.target as HTMLInputElement).value);
                setIscategoryNameError(false);
                setCategoryNameError("");
              }}
              error={isCategoryNameError}
              helperText={categoryNameError}
              value={categoryName}
            />
          </Grid>
          <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Transaction Type</b>
            </Typography>
            <FormControl component="fieldset" error={istTypenameError[0]}>
              {/* <FormLabel component="legend"><b>Transaction Type</b></FormLabel> */}
              <FormGroup aria-label="position" row>
                {transactionType[0].map((data, index) => {
                  return (
                    <FormControlLabel
                      value={data.id}
                      control={
                        <Checkbox
                          checked={data.isSelected}
                          tabIndex={-1}
                          onClick={() => {
                            istTypenameError[1](false);
                            tTypeNameError[1]("");
                            const newChecked = [...transactionType[0]];
                            newChecked.find((item, i) => {
                              if (item.id === data.id) {
                                item.isSelected = !item.isSelected;
                              }
                            });
                            transactionType[1](newChecked);
                          }}
                        />
                      }
                      label={data.key}
                      labelPlacement="end"
                    />
                  );
                })}
              </FormGroup>
              <FormHelperText>{tTypeNameError[0]}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Display</b>
            </Typography>
            <FormControl>
              <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3} sm={8} md={12}>
            <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} style={{ display: buttonDisplay }} onClick={handleCancelClick}>
              Cancel
            </Button>
            <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
              Submit
            </LoadingButton>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">
              Category List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {categoryList.length === 0 ? (
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
                      rows={categoryListTemp}
                      columns={aCategoryNameColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...categoryList];
                        let a: AcategoryNameModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
    </Box>
  );

};

export default GCategoryName;
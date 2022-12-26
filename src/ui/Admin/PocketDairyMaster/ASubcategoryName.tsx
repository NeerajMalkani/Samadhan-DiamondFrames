import { Alert, AlertColor, Box, Button, CircularProgress, Container, Select, MenuItem, FormHelperText, FormControl, FormControlLabel, Grid, Icon, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../utils/communication";
import { aSubCategoryNameColumns } from "../../../utils/tablecolumns";
import { theme } from "../../../theme/AppTheme";
import { ASubCategoryNameModel, PckTransactionTypeModel, AcategoryNameModel } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from '@mui/icons-material/List';
import NoData from "../../../components/NoData";
import { SelectChangeEvent } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { APIConverter } from "../../../utils/apiconverter";


const ASubCategoryName = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables
  //   const [transactionType, setTransactionType] = useState("--Select--");
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [transactionTypeID, setTransactionTypeID] = useState("0");
  const [transactionType, setTransactionType] = useState("--Select--");
  const [transactionTypeError, setTransactionTypeError] = useState<boolean>(false);
  const [transactionTypeErrorText, setTransactionTypeErrorText] = useState<string>("");
  const [transactionTypeNamesList, setTransactionTypeNamesList] = useState<Array<PckTransactionTypeModel>>([]);

  const [subCategoryNamesList, setSubCategoryNamesList] = useState<Array<ASubCategoryNameModel>>([]);

  const [categoryID, setCategoryID] = useState("0");
  const [categoryName, setCategoryName] = useState("--Select--");
  const [categoryNameError, setCategoryNameError] = useState<boolean>(false);
  const [categoryNameErrorText, setCategoryNameErrorText] = useState<string>("");

  const [categoryNamesList, setCategoryNamesList] = useState<Array<AcategoryNameModel>>([]);

  const [subCategoryName, setSubCategoryName] = React.useState("");
  const [subCategoryList, setSubCategoryList] = useState<Array<ASubCategoryNameModel>>([]);
  const [subCategoryListTemp, setSubCategoryListTemp] = React.useState<Array<any>>([]);
  const [subCategoryNameError, setSubCategoryNameError] = useState("");
  const [isSubCategoryNameError, setIsSubCategoryNameError] = useState(false);

  const [notes, setNotes] = React.useState("");
  const [notesList, setNotesList] = useState<Array<ASubCategoryNameModel>>([]);
  const [notesListTemp, setNotesListTemp] = React.useState<Array<any>>([]);
  const [notesNameError, setNotesNameError] = useState("");
  const [isNotesNameError, setIsNotesNameError] = useState(false);

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
  const [selectedID, setSelectedID] = React.useState("");

  //#endregion 


  //#region Function

  useEffect(() => {
    FetchData("");
    FetchTransactionType();
  }, []);

  const FetchData = (type: string) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        pck_sub_category_refno: "all"
      },
    };
    Provider.createDFAdmin(Provider.API_URLS.pcksubcategoryrefnocheck, params)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.id = index + 1;
              a.display = a.display == "1" ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setSubCategoryList(arrList);
            setSubCategoryListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Sub Category " + type);
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

  const FetchTransactionType = async () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
      },
    };
    setLoading(true);
    await Provider.createDFAdmin(Provider.API_URLS.gettransactiontype_pcksubcategoryform, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setTransactionTypeNamesList(response.data.data);
          }
        }

        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        //Show snackbar
      });
  };

  const FetchCategory = async (transactionType) => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
        pck_transtype_refno: transactionType
      },
    };
    //setLoading(true);
    await Provider.createDFAdmin(Provider.API_URLS.getpckcategoryname_pcksubcategoryform_appadmin, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            debugger;
            response.data.data = APIConverter(response.data.data);
            setCategoryNamesList(response.data.data);
          }
        }

        //setLoading(false);
      })
      .catch((e) => {
        //setLoading(false);
        //Show snackbar
      });
  };


  const handleTTChange = (event: SelectChangeEvent) => {
    debugger;
    let transactionTypeName: string = event.target.value;
    let ac = transactionTypeNamesList.find(
      (el) => el.transTypeName === transactionTypeName
    );

    setCategoryID("0");
    setCategoryName("--Select--");

    if (ac !== undefined) {
      setTransactionTypeID(ac.transtypeID);
      setTransactionType(transactionTypeName);
      setTransactionTypeError(false);
      setTransactionTypeErrorText("");
      FetchCategory(ac.transtypeID);
    }
    else {
      FetchCategory(0);
    }
  };

  const handleCNChange = (event: SelectChangeEvent) => {
    let categoryName: string = event.target.value;
    let ac = categoryNamesList.find(
      (el) => el.categoryName === categoryName
    );
    if (ac !== undefined) {
      setCategoryID(ac.pckCategoryID);
      setCategoryName(categoryName);
      setCategoryNameError(false);
      setCategoryNameErrorText("");
    }
  };

  const handleSubmitClick = () => {
    debugger;
    let isValid = true;

    if (transactionType.trim() === "--Select--") {
      isValid = false;
      setTransactionTypeError(true);
      setTransactionTypeErrorText("Please select Transaction Type");
    }

    if (categoryName.trim() === "--Select--") {
      isValid = false;
      setCategoryNameError(true);
      setCategoryNameErrorText("Please select Category Name");
    }

    if (subCategoryName.trim() === "") {
      isValid = false;
      setIsSubCategoryNameError(true);
      setSubCategoryNameError("Please enter Sub Category Name");
    }

    if (isValid) {
      setButtonLoading(true);
      InsertUpdateData(display === "Yes");
    }

  };

  const InsertUpdateData = (checked: boolean) => {
    debugger;
    if (actionStatus === "new") {
      Provider.createDFAdmin(Provider.API_URLS.pcksubcategorynamecreate_appadmin, {
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          pck_transtype_refno: transactionTypeID,
          pck_category_refno: categoryID,
          sub_category_name: subCategoryName,
          notes: notes,
          view_status: checked ? 1 : 0
        }
      })
        .then((response) => {
          debugger;
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

      Provider.createDFAdmin(Provider.API_URLS.pcksubcategorynameupdate_appadmin, {
        data: {
          // Sess_UserRefno: cookies.dfc.UserID,
          // pck_category_refno: selectedID,
          // category_name: categoryName,
          // pck_transtype_refno: tt,
          // view_status: checked ? "1" : "0",

          Sess_UserRefno: cookies.dfc.UserID,
          pck_sub_category_refno: selectedID,
          pck_transtype_refno: transactionTypeID,
          pck_category_refno: categoryID,
          sub_category_name: subCategoryName,
          notes: notes,
          view_status: checked ? 1 : 0
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

  const ResetFields = () => {
    setSelectedID("0");
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);

    setDisplay("Yes");
    setTransactionType("--Select--");
    setTransactionTypeID("0");
    setCategoryID("0");
    setCategoryName("");
    setSubCategoryName("");
    setNotes("");

  };


  const handleCancelClick = () => {
    setSelectedID("0");
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
    setDisplay("Yes");
    setTransactionType("--Select--");
    setTransactionTypeID("0");
    setCategoryID("0");
    setCategoryName("");
    setSubCategoryName("");
    setNotes("");
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handelEditAndDelete = (type: string | null, a: ASubCategoryNameModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);

      setTransactionTypeID(a.transtypeID);
      setTransactionType(a.transactionTypeName);
      FetchCategory(a.transtypeID);
      setCategoryID(a.pckCategoryID);
      setCategoryName(a.categoryName);

      setSelectedID(a.subcategoryID);

      setSubCategoryName(a.subCategoryName);
      setNotes(a.notes);

      // const stateData: any = [];
      // transactionType[0].map((data: any, i: number) => {
      //   if (a.transactionTypeName.includes(data.key)) {
      //     stateData.push({
      //       key: data.key,
      //       isSelected: true,
      //       id: data.id
      //     });
      //   }
      //   else {
      //     stateData.push({
      //       key: data.key,
      //       isSelected: false,
      //       id: data.id
      //     });
      //   }
      //   transactionType[1](stateData);
      // });

      // setCategoryNameError("");
      // setIscategoryNameError(false);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }

  };


  //#endregion 

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };
  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4"> Sub Category</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Sub Category Name (Add /Edit)</Typography>
          </Grid>

          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={transactionTypeError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <label style={{ color: "#ff0000" }}>*</label>
                <b>Transaction Type</b>
              </Typography>
              <Select value={transactionType} onChange={handleTTChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {transactionTypeNamesList &&
                  transactionTypeNamesList.map((item, index) => {
                    return (
                      <MenuItem key={item.transtypeID} value={item.transTypeName}>
                        {item.transTypeName}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText>{transactionTypeErrorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={categoryNameError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <label style={{ color: "#ff0000" }}>*</label>
                <b>Category Name</b>
              </Typography>
              <Select value={categoryName} onChange={handleCNChange} >
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {categoryNamesList &&
                  categoryNamesList.map((item, index) => {
                    return (
                      <MenuItem key={item.pckCategoryID} value={item.categoryName}>
                        {item.categoryName}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText>{categoryNameErrorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b><label style={{ color: "#ff0000" }}>*</label>Sub Category Name</b>
            </Typography>
            <TextField
              fullWidth
              placeholder="Category Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setSubCategoryName((e.target as HTMLInputElement).value);
                setIsSubCategoryNameError(false);
                setSubCategoryNameError("");
              }}
              error={isSubCategoryNameError}
              helperText={subCategoryNameError}
              value={subCategoryName}
            />
          </Grid>

          <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Notes</b>
            </Typography>
            <TextField
              fullWidth
              placeholder="Notes"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setNotes((e.target as HTMLInputElement).value);
                setIsNotesNameError(false);
                setNotesNameError("");
              }}
              error={isNotesNameError}
              helperText={notesNameError}
              value={notes}
            />
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
              Sub Category List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {subCategoryList.length === 0 ? (
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
                      rows={subCategoryListTemp}
                      columns={aSubCategoryNameColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...subCategoryList];
                        let a: ASubCategoryNameModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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

export default ASubCategoryName;
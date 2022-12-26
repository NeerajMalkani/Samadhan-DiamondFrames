import { Alert, AlertColor, Box, Button, CircularProgress, Container, Select, MenuItem, FormHelperText, FormControl, FormControlLabel, FormLabel, Grid, Icon, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../../utils/communication";
import { gMyContactsNameColumns } from "../../../../utils/tablecolumns";
import { theme } from "../../../../theme/AppTheme";
import { GeneralMyContacts } from "../../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from '@mui/icons-material/List';
import NoData from "../../../../components/NoData";
import { SelectChangeEvent } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { APIConverter } from "../../../../utils/apiconverter";


const GMyContacts = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
    let navigate = useNavigate();
  
    useEffect(() => {
      if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    }, []);

     //#region Variables
     const [name, setName] = React.useState("");
     const [nameList, setNameList] = useState<Array<GeneralMyContacts>>([]);//React.useContext(DataContext).activityNamesList;
     const [nameListTemp, setNameListTemp] = React.useState<Array<any>>([]);
     const [nameError, setNameError] = useState("");
     const [isNameError, setIsNameError] = useState(false);

     const [mobileNo, setMobileNo] = React.useState("");
     const [mobileNoList, setmobileNoList] = useState<Array<GeneralMyContacts>>([]);//React.useContext(DataContext).activityNamesList;
     const [mobileNoListTemp, setMobileNoListTemp] = React.useState<Array<any>>([]);
     const [mobileNoError, setMobileNoError] = useState("");
     const [isMobileNoError, setIsMobileNoError] = useState(false);

     const [remark, setRemark] = React.useState("");
     const [remarkList, setRemarkList] = useState<Array<GeneralMyContacts>>([]);//React.useContext(DataContext).activityNamesList;
     const [remarkListTemp, setRemarkListTemp] = React.useState<Array<any>>([]);
     const [remarkError, setRemarkError] = useState("");
     const [isRemarkError, setIsRemarkError] = useState(false);

     const [display, setDisplay] = React.useState("Yes");

     const [contactList, setContactList] = useState<Array<GeneralMyContacts>>([]);//React.useContext(DataContext).activityNamesList;
     const [contactListTemp, setContactListTemp] = React.useState<Array<any>>([]);

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

     //#region Function

     useEffect(() => {
        // FetchTransactionType();
        // FetchData("");
      }, []);

      const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplay((event.target as HTMLInputElement).value);
      };

      const handleSubmitClick = () => {
        // let isValid = true;
        // const IsTextFiledError = categoryName.trim() === "";
        // setCategoryNameError(IsTextFiledError ? communication.BlankCategoryName : "");
        // setIscategoryNameError(IsTextFiledError);
        // if (!IsTextFiledError) {
        //   setButtonLoading(true);
    
        //   let blankData = transactionType[0].filter((el) => el.isSelected);
        //   if (blankData.length === 0) {
        //     isValid = false;
        //     istTypenameError[1](true);
        //     tTypeNameError[1]("Please select Transaction Type ");
        //   }
    
        //   if (isValid) {
    
        //     const tt = blankData.map((data) => data.id);
        //     InsertUpdateData(categoryName, display === "Yes", tt);
        //   }
    
        //   setDisplay("Yes");
        //   setCategoryName("");
        //   setCategoryNameError("");
        //   setIscategoryNameError(false);
        // }
      };

      const handleCancelClick = () => {
        // setDisplay("Yes");
        // setCategoryName("");
        // setCategoryNameError("");
        // setIscategoryNameError(false);
        // setButtonDisplay("none");
        // setDataGridOpacity(1);
        // setDataGridPointer("auto");
        // // setActionStatus("new");
        // let arrService = [...transactionType[0]];
        // arrService[0].isSelected = false;
        // arrService[1].isSelected = false;
    
        // transactionType[1](arrService);
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
                <Typography variant="h4">My Contacts</Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                <Typography variant="h6">My Contacts</Typography>
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b><label style={{ color: "#ff0000" }}>*</label> Name</b>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Name"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    setName((e.target as HTMLInputElement).value);
                    setIsNameError(false);
                    setNameError("");
                  }}
                  error={isNameError}
                  helperText={nameError}
                  value={name}
                />
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b><label style={{ color: "#ff0000" }}>*</label> Mobile No</b>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Mobile No"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    setMobileNo((e.target as HTMLInputElement).value);
                    setIsMobileNoError(false);
                    setMobileNoError("");
                  }}
                  error={isMobileNoError}
                  helperText={mobileNoError}
                  value={mobileNo}
                />
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b> Remarks</b>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Remarks"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    setRemark((e.target as HTMLInputElement).value);
                    setIsRemarkError(false);
                    setRemarkError("");
                  }}
                  error={isRemarkError}
                  helperText={remarkError}
                  value={remark}
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
                  Contacts List
                </Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {contactList.length === 0 ? (
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
                          rows={contactListTemp}
                          columns={gMyContactsNameColumns}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            const arrActivity = [...contactList];
                            let a: GeneralMyContacts | undefined = arrActivity.find((el) => el.id === param.row.id);
                            // handelEditAndDelete((e.target as any).textContent, a);
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
    
    export default GMyContacts;
import { Alert, AlertColor, Box, Button, CircularProgress, Container, Select, MenuItem, FormHelperText, FormControl, FormControlLabel, FormLabel, Grid, Icon, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../../utils/communication";
import { gMyBankNameColumns } from "../../../../utils/tablecolumns";
import { theme } from "../../../../theme/AppTheme";
import { GeneralMYBank } from "../../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from '@mui/icons-material/List';
import NoData from "../../../../components/NoData";
import { SelectChangeEvent } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { APIConverter } from "../../../../utils/apiconverter";



const GMyBank = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
    let navigate = useNavigate();
  
    useEffect(() => {
      if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    }, []);

    //#region Variables
    const [bankName, setBankName] = React.useState("");
    const [bankNameError, setBankNameError] = useState("");
    const [isBankNameError, setIsBankNameError] = useState(false);

    const [bankAccountNo, setBankAccountNo] = React.useState("");
    const [bankAccountNoError, setBankAccountNoError] = useState("");
    const [isBankAccountNoError, setIsBankAccountNoError] = useState(false);

    const cardType = useState([
        { key: "Debit Card", isSelected: false, id: 1 },
        { key: "Credit Card", isSelected: false, id: 2 },
      ]);

      const iscardTypeError = useState(false);
      const cardTypeError = useState("");

    const [openingBalance, setOpeningBalance] = React.useState("");
    const [openingBalanceError, setOpeningBalanceError] = useState("");
    const [isOpeningBalanceError, setIsOpeningBalanceError] = useState(false);

    const [remarks, setRemarks] = React.useState("");
    const [remarksError, setRemarksError] = useState("");
    const [isRemarksError, setIsRemarksError] = useState(false);

    const [display, setDisplay] = React.useState("Yes");

    const [bankList, setBankList] = useState<Array<GeneralMYBank>>([]);//React.useContext(DataContext).activityNamesList;
  const [bankListTemp, setBankListTemp] = React.useState<Array<any>>([]);

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
                <Typography variant="h4">My Bank</Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                <Typography variant="h6">My Bank</Typography>
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b><label style={{ color: "#ff0000" }}>*</label>Bank Name</b>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Bank Name"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    setBankName((e.target as HTMLInputElement).value);
                    setIsBankNameError(false);
                    setBankNameError("");
                  }}
                  error={isBankNameError}
                  helperText={bankNameError}
                  value={bankName}
                />
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Bank Account No</b>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Category Name"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    setBankAccountNo((e.target as HTMLInputElement).value);
                    setIsBankAccountNoError(false);
                    setBankAccountNoError("");
                  }}
                  error={isBankAccountNoError}
                  helperText={bankAccountNoError}
                  value={bankAccountNo}
                />
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b> Card Type</b>
                </Typography>
                <FormControl component="fieldset" error={iscardTypeError[0]}>
                  {/* <FormLabel component="legend"><b>Transaction Type</b></FormLabel> */}
                  <FormGroup aria-label="position" row>
                    {cardType[0].map((data, index) => {
                      return (
                        <FormControlLabel
                          value={data.id}
                          control={
                            <Checkbox
                              checked={data.isSelected}
                              tabIndex={-1}
                              onClick={() => {
                                iscardTypeError[1](false);
                                cardTypeError[1]("");
                                const newChecked = [...cardType[0]];
                                newChecked.find((item, i) => {
                                  if (item.id === data.id) {
                                    item.isSelected = !item.isSelected;
                                  }
                                });
                                cardType[1](newChecked);
                              }}
                            />
                          }
                          label={data.key}
                          labelPlacement="end"
                        />
                      );
                    })}
                  </FormGroup>
                  <FormHelperText>{cardTypeError[0]}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Opening Balance</b>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Category Name"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    setOpeningBalance((e.target as HTMLInputElement).value);
                    setIsOpeningBalanceError(false);
                    setOpeningBalanceError("");
                  }}
                  error={isOpeningBalanceError}
                  helperText={openingBalanceError}
                  value={openingBalance}
                />
              </Grid>
              <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Remarks</b>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Category Name"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    setRemarks((e.target as HTMLInputElement).value);
                    setIsRemarksError(false);
                    setRemarksError("");
                  }}
                  error={isRemarksError}
                  helperText={remarksError}
                  value={remarks}
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
                  Bank List
                </Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {bankList.length === 0 ? (
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
                          rows={bankListTemp}
                          columns={gMyBankNameColumns}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            const arrActivity = [...bankList];
                            let a: GeneralMYBank | undefined = arrActivity.find((el) => el.id === param.row.id);
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
    
    export default GMyBank;
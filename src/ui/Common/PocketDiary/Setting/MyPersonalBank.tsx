import { Alert, AlertColor, Box, Button, CircularProgress, Container, Select, MenuItem, FormHelperText, FormControl, FormControlLabel, Grid, Icon, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../../utils/communication";
import { personalBankDetailsColumns } from "../../../../utils/tablecolumns";
import { theme } from "../../../../theme/AppTheme";
import { PersonalBankListModel } from "../../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from '@mui/icons-material/List';
import NoData from "../../../../components/NoData";
import { SelectChangeEvent } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { APIConverter } from "../../../../utils/apiconverter";


const MyPersonalBank = () => {
    const [cookies, setCookie] = useCookies(["dfc"]);
    let navigate = useNavigate();
  
    useEffect(() => {
      if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    }, []);
  
    //#region Variables
  
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountHolderNameError, setAccountHolderNameError] = useState("");
  const [isAccountHolderNameError, setIsAccountHolderNameError] = useState(false);
  const [accountHolderNameText, setAccountHolderNameText] = useState<string>("");

  const [accountNo, setAccountNo] = useState("");
  const [accountNoError, setAccountNoError] = useState("");
  const [isAccountNoError, setIsAccountNoError] = useState(false);

  const [bankName, setBankName] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [isBankNameError, setIsBankNameError] = useState(false);
  const [ankNameText, setBankNameText] = useState<string>("");

  const [bankBranchName, setBankBranchName] = useState("");
  const [bankBranchNameError, setBankBranchNameError] = useState("");
  const [isBankBranchNameError, setIsBankBranchNameError] = useState(false);

  const [ifscCode, setIFSCCode] = useState("");
  const [ifscCodeError, setIFSCCodeError] = useState("");
  const [isIFSCCodeError, setIsIFSCCodeError] = useState(false);

  const cardType = useState([
    { key: "Debit Card", isSelected: false, id: 1 },
    { key: "Credit Card", isSelected: false, id: 2 },
  ]);

  const isCardTypeError = useState(false);
  const cardTypeError = useState("");

  const [openingBalance, setOpeningBalance] = useState("");
  const [openingBalanceError, setOpeningBalanceError] = useState("");
  const [isOpeningBalanceError, setIsOpeningBalanceError] = useState(false);

  const [remarks, setRemarks] = useState("");
  const [remarksError, setRemarksError] = useState("");
  const [isRemarksError, setIsRemarksError] = useState(false);

  const [personalBankList, setPersonalBankList] = useState<Array<PersonalBankListModel>>([]);
  const [personalBankListTemp, setPersonalBankListTemp] = React.useState<Array<any>>([]);

  const [loading, setLoading] = useState(false);

  const [display, setDisplay] = React.useState("Yes");
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  //#endregion 

  //#region Functions
  useEffect(() => {
    FetchData("");
    FetchCardType();
  }, []);

  const FetchData = (type: string) => {
    debugger;
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        bank_refno: "all"
      },
     
    };
    ///
    Provider.createDFPocketDairy(Provider.API_URLS.pckmypersonalbankrefnocheck, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
            debugger;
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.id = index + 1;
              a.cardType = a.cardType ? "Debit" : "Credit";
              a.display = a.display == "1" ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setPersonalBankList(arrList);
            setPersonalBankListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Peronal Bank Data " + type);
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

  const FetchCardType = () => {
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
      },
    };
    Provider.createDFPocketDairy(Provider.API_URLS.getcardtype_pckmypersonalbankform, params)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            const stateData: any = [];
            response.data.data.map((data: any, i: number) => {
              stateData.push({
                key: data.cardTypeName,
                isSelected: false,
                id: data.cardTypeID
              });
            });
            cardType[1](stateData);

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

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handelEditAndDelete = (
    type: string | null,
    a: PersonalBankListModel | undefined
  ) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setAccountHolderName(a.accountHolderName);
      setAccountNo(a.accountNumber);
      setBankName(a.bankName);
      setBankBranchName(a.branchName);
      setIFSCCode(a.ifscCode);

      const stateData: any = [];
      cardType[0].map((data: any, i: number) => {
        if (a.cardTypeName.includes(data.key)) {
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
        cardType[1](stateData);
      });

      setOpeningBalance(a.openingBalance);
      setRemarks(a.remarks);
      setSelectedID(a.bank_refno);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
  };

  const onChangeSearch = (query: string) => {
    // setSearchQuery(query);
    // if (query === "") {
    //   setBankNamesListTemp(bankNamesList);
    // } else {
    //   setBankNamesListTemp(
    //     bankNamesList.filter((el: UserBankListModel) => {
    //       return el.bankName
    //         .toString()
    //         .toLowerCase()
    //         .includes(query.toLowerCase());
    //     })
    //   );
    // }
  };


  const handleSubmitBankClick = () => {
    debugger;
    let isValid: boolean = true;

    if (accountHolderName.trim() === "") {
      isValid = false;
      setIsAccountHolderNameError(true);
      setAccountHolderName(communication.AccountHolderName);
    }

    if (bankName.trim() === "") {
      isValid = false;
      setIsBankNameError(true);
      setBankName(communication.BlankBankName);
    }

    let blankData = cardType[0].filter((el) => el.isSelected);
    if (blankData.length === 0) {
      isValid = false;
      isCardTypeError[1](true);
      cardTypeError[1]("Please select Card Type ");
    }

    if (isValid) {

      const ct = blankData.map((data) => data.id);
      InsertUpdateBankData(accountHolderName, display === "Yes", ct);
    }
    setDisplay("Yes");
    setAccountHolderName("");
    setAccountHolderNameError("");
    setIsAccountHolderNameError(false);
  };


  const InsertUpdateBankData = (accountHolderName: string, checked: boolean, ct) => {
    setButtonLoading(true);
    if (actionStatus === "new") {
      debugger;
      let params = {
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          bank_ac_holder_name: accountHolderName,
          bank_account_no: accountNo,
          bank_name: bankName,
          bank_branch_name: bankBranchName,
          ifsc_code: ifscCode,
          cardtype_refno: ct,
          opening_balance: openingBalance,
          remarks: remarks,
          view_status: display === "Yes" ? 1 : 0,
        },
      }
      Provider.createDFPocketDairy(Provider.API_URLS.pckmypersonalbankcreate, params)
        .then((response) => {
          debugger;
          if (response.data && response.data.code === 200) {
            debugger;
            FetchData("added");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
          // handleCancelClick();
        })
        .catch((e) => {
          // handleCancelClick();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    } else if (actionStatus === "edit") {
      debugger;
      let params = {
     
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          bank_refno: selectedID,
          bank_ac_holder_name: accountHolderName,
          bank_account_no: accountNo,
          bank_name: bankName,
          bank_branch_name: bankBranchName,
          ifsc_code: ifscCode,
          cardtype_refno: ct,
          opening_balance: openingBalance,
          remarks: remarks,
          view_status: display === "Yes" ? 1 : 0,
      },
      }
      Provider.createDFPocketDairy(Provider.API_URLS.pckmypersonalbankupdate, params)
        .then((response) => {
          debugger;
          if (response.data && response.data.code === 200) {
            debugger;
            FetchData("updated");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
          } else {
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
          // handleCancelClick();
        })
        .catch((e) => {
          // handleCancelClick();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    }
  };

  
  //#endregion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4"> My Personal Bank</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">My Personal Bank</Typography>
          </Grid>
          <Grid container xs={4} sm={8} md={12} spacing={{ xs: 1, md: 2 }}>
                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Account Holder Number</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setAccountHolderName((e.target as HTMLInputElement).value);
                            setIsAccountHolderNameError(false);
                            setAccountHolderNameError("");
                          }}
                          error={isAccountHolderNameError}
                          helperText={accountHolderNameError}
                          value={accountHolderName}
                        />
                      </Grid>
                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Account Number</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setAccountNo((e.target as HTMLInputElement).value);
                            setIsAccountNoError(false);
                            setAccountNoError("");
                          }}
                          error={isAccountNoError}
                          helperText={accountNoError}
                          value={accountNo}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Bank Name</b>
                        </Typography>
                        <TextField
                          fullWidth
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

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Bank Branch Name</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setBankBranchName(
                              (e.target as HTMLInputElement).value
                            );
                            setIsBankBranchNameError(false);
                            setBankBranchNameError("");
                          }}
                          error={isBankBranchNameError}
                          helperText={bankBranchNameError}
                          value={bankBranchName}
                        />
                      </Grid>

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>IFSC Code</b>
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setIFSCCode((e.target as HTMLInputElement).value);
                            setIsIFSCCodeError(false);
                            setIFSCCodeError("");
                          }}
                          error={isIFSCCodeError}
                          helperText={ifscCodeError}
                          value={ifscCode}
                        />
                      </Grid>

                      <Grid item xs={3} sm={4} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Card Type</b>
                        </Typography>
                        <FormControl component="fieldset" error={isCardTypeError[0]}>
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
                                        isCardTypeError[1](false);
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

                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Opening Balance</b>
                        </Typography>
                        <TextField
                          fullWidth
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
                      <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Remarks</b>
                        </Typography>
                        <TextField
                          fullWidth
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


                      <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Display</b>
                        </Typography>
                        <FormControl>

                          <RadioGroup
                            row
                            name="row-radio-buttons-group"
                            value={display}
                            onChange={handleDisplayChange}
                          >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} sm={8} md={12}>
                        <LoadingButton
                          loading={buttonLoading}
                          variant="contained"
                          sx={{ mt: 1 }}
                     onClick={handleSubmitBankClick}
                        >
                          Submit
                        </LoadingButton>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={4}
                      sm={8}
                      md={12}
                      sx={{
                        borderBottom: 1,
                        paddingBottom: "8px",
                        borderColor: "rgba(0,0,0,0.12)",
                      }}
                    >
                      <Typography variant="h6">Personal Banking List</Typography>
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
                          {personalBankList.length === 0 ? (
                            <NoData
                              Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />}
                              height="auto"
                              text="No data found"
                              secondaryText=""
                              isButton={false}
                            />
                          ) : (
                            <>
                              <Grid
                                item
                                xs={4}
                                sm={8}
                                md={12}
                                sx={{
                                  alignItems: "flex-end",
                                  justifyContent: "flex-end",
                                  mb: 1,
                                  display: "flex",
                                  mr: 1,
                                }}
                              >
                                <TextField
                                  placeholder="Search"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => {
                                    onChangeSearch((e.target as HTMLInputElement).value);
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
                                rows={personalBankListTemp}
                                columns={personalBankDetailsColumns}
                                pageSize={pageSize}
                                rowsPerPageOptions={[5, 10, 20]}
                                onPageSizeChange={(newPageSize) =>
                                  setPageSize(newPageSize)
                                }
                                disableSelectionOnClick
                                onCellClick={(
                                  param,
                                  e: React.MouseEvent<HTMLElement>
                                ) => {
                                  const arrActivity = [...personalBankList];
                                  let a: PersonalBankListModel | undefined =
                                    arrActivity.find((el) => el.id === param.row.id);
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
    );
};
  
export default MyPersonalBank;

 

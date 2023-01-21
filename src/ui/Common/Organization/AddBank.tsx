import {
    Alert,
    Box,
    TextField,
    Button,
    Container,
    NativeSelect,
    Typography,
    Select,
    Grid,
    CircularProgress,
    MenuItem,
    InputAdornment,
    Checkbox,
    FormControl,
    FormHelperText,
    AlertColor,
    RadioGroup,
    FormControlLabel,
    Snackbar,
    Radio
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "../../../theme/AppTheme";
import { useCookies } from "react-cookie";
import Header from "../../../components/Header";
import DataContexts from "../../../contexts/DataContexts"
import Provider from "../../../api/Provider";
import { CompanyBranchNameModel, AddBankListModel } from "../../../models/Model";
import { communication } from "../../../utils/communication";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { SelectChangeEvent } from "@mui/material";
import { ForkRight } from "@mui/icons-material";
import { APIConverter } from "../../../utils/apiconverter";
import FormGroup from '@mui/material/FormGroup';
import { LoadingButton } from "@mui/lab";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { addBankColumns } from "../../../utils/tablecolumns"

const AddBank = () => {

    const [cookies, setCookie] = useCookies(["dfc"]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
            navigate(`/login`);
    }, []);

    //#region variable

    const [companyBranchName, setCompanyBranchName] = useState("--Select--");
    const [companyBranchNameID, setCompanyBranchNameID] = useState("");
    const [myCompanyBranchNameID, setMyCompanyBranchNameID] = useState<number>(0);
    const [companyBranchNameError, setCompanyBranchNameError] = useState("");
    const [isCompanyBranchNameError, setIsCompanyBranchNameError] = useState(false);
    const [companyBranchNameErrorText, setCompanyBranchNameErrorText] = useState<string>("");
    const [companyBranchNameList, setCompanyBranchNameList] = useState<Array<CompanyBranchNameModel>>([]);
    const [companyBranchNameFullList, setCompanyBranchNameFullList] = useState<Array<CompanyBranchNameModel>>([]);

    const [accountNo, setAccountNo] = useState("");
    const [accountNoError, setAccountNoError] = useState("");
    const [isAccountNoError, setIsAccountNoError] = useState(false);

    const [bankName, setBankName] = useState("");
    const [bankNameError, setBankNameError] = useState("");
    const [isBankNameError, setIsBankNameError] = useState(false);

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

    const [searchQuery, setSearchQuery] = useState("");
    const [pageSize, setPageSize] = React.useState<number>(5);
    const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");

    const [display, setDisplay] = React.useState("Yes");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [actionStatus, setActionStatus] = React.useState<string>("new");

    const [snackMsg, setSnackMsg] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
    const [loading, setLoading] = useState(true);
    const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
    const [selectedID, setSelectedID] = React.useState<number>(0);

    const [addBankList, setAddBankList] = useState<Array<AddBankListModel>>([]);
    const [addBankListTemp, setAddBankListTemp] = React.useState<Array<any>>([]);
    //#endregion


    //#region Functions

    useEffect(() => {
        FetchData("");
        FetchCompanyBranchName();
    }, []);

    const FetchCompanyBranchName = () => {
        let params = {
            data: {
                Sess_UserRefno: cookies.dfc.UserID,
                Sess_company_refno: cookies.dfc.Sess_company_refno
            },
        };
        Provider.createDFCommon(Provider.API_URLS.getbranchnamebankform, params)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        response.data.data = APIConverter(response.data.data);
                        const branch: any = [], fullList = [];

                        response.data.data.map((data: any, i: number) => {
                            branch.push({
                                id: data.id,
                                branchType: data.locationName + " >> " + data.branchType
                            });
                            fullList.push({
                                id: data.id,
                                branchType: data.locationName + " >> " + data.branchType,
                                locationName: data.locationName,
                                oldBranchType: data.branchType
                            });
                        });
                        setCompanyBranchNameList(branch);
                        setCompanyBranchNameFullList(fullList);

                    }
                }
            })
            .catch((e) => { });
    };

    const FetchData = (type: string) => {
        let params = {
            data: {
                Sess_UserRefno: cookies.dfc.UserID,
                Sess_company_refno: cookies.dfc.Sess_company_refno,
                bank_refno: "all"
            },
        };

        Provider.createDFCommon(Provider.API_URLS.branchbankrefnocheck, params)
            .then((response: any) => {
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        debugger;
                        response.data.data = APIConverter(response.data.data, "contractor_bank");
                        debugger;
                        const arrList = [...response.data.data];
                        arrList.map(function (a: any, index: number) {
                            a.id = index + 1;
                            a.cardType = a.cardType ? "Debit" : "Credit";
                            a.display = a.display == "1" ? "Yes" : "No";
                            let sr = { srno: index + 1 };
                            a = Object.assign(a, sr);
                        });
                        setAddBankList(arrList);
                        setAddBankListTemp(arrList);
                        if (type !== "") {
                            setSnackMsg("Bank Details " + type);
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


    const handleSubmitClick = () => {
        debugger;
        let isValid: boolean = true;

        if (companyBranchName.trim() === "--Select--") {
            isValid = false;
            setIsCompanyBranchNameError(true);
            setCompanyBranchNameErrorText("Please select Company Branch Name");
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
            InsertUpdateData(companyBranchName, display === "Yes", ct);
        }
    };

    const handleCancelClick = () => {
        setCompanyBranchName("--Select--");
        setCompanyBranchNameID("0");
        setIsCompanyBranchNameError(false);
        setCompanyBranchNameErrorText("");
        setActionStatus("new");
        setSelectedID(0);
        setDataGridOpacity(1);
        setDataGridPointer("auto");
        setButtonDisplay("none");
        setButtonLoading(false);
        setDisplay("Yes");
    };


    const InsertUpdateData = (companyBranchName: string, checked: boolean, ct) => {
        setButtonLoading(true);
        if (actionStatus === "new") {
            let params = {
                data: {
                    Sess_UserRefno: cookies.dfc.UserID,
                    Sess_company_refno: cookies.dfc.Sess_company_refno,
                    branch_refno: companyBranchNameID,
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
            Provider.createDFCommon(Provider.API_URLS.branchbankcreate, params)
                .then((response) => {
                    if (response.data && response.data.code === 200) {
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
                    handleCancelClick();
                })
                .catch((e) => {
                    handleCancelClick();
                    setSnackMsg(communication.NetworkError);
                    setSnackbarType("error");
                    setOpen(true);
                });
        } else if (actionStatus === "edit") {
            debugger;
            let params = {
                data: {
                    Sess_UserRefno: cookies.dfc.UserID,
                    Sess_company_refno: cookies.dfc.Sess_company_refno,
                    bank_refno: selectedID,
                    branch_refno: companyBranchNameID,
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
            Provider.createDFCommon(Provider.API_URLS.branchbankupdate, params)
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
                    handleCancelClick();
                })
                .catch((e) => {
                    handleCancelClick();
                    setSnackMsg(communication.NetworkError);
                    setSnackbarType("error");
                    setOpen(true);
                });
        }
    };

    const handelEditAndDelete = (type: string | null, a: AddBankListModel | undefined) => {
        debugger;
        if (type?.toLowerCase() === "edit" && a !== undefined) {
            setDataGridOpacity(0.3);
            setDataGridPointer("none");
            setDisplay(a.display);

            setCompanyBranchName(companyBranchNameFullList.find((el) => {
                return el.locationName == a.companyBranchName;
            }).branchType);
            setCompanyBranchNameID(a?.branchID);
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
            setSelectedID(a.bank_refno);
            setButtonDisplay("unset");
            setActionStatus("edit");
        }
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

    const handleCBNChange = (event: SelectChangeEvent) => {
        let branchType: string = event.target.value;
        let ac = companyBranchNameList.find((el) => el.branchType === branchType);
        if (ac !== undefined) {
            setCompanyBranchName(branchType);
            setCompanyBranchNameID(ac?.id.toString());
            setIsCompanyBranchNameError(false);
            setCompanyBranchNameError("");
        }
    };

    const onChangeSearch = (query: string) => {
        setSearchQuery(query);
        if (query === "") {
            setAddBankListTemp(addBankList);
        } else {
            setAddBankListTemp(
                addBankList.filter((el: AddBankListModel) => {
                    return el.bankName
                        .toString()
                        .toLowerCase()
                        .includes(query.toLowerCase());
                })
            );
        }
    };

    //#endregion

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h4" >Add Bank</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                    <Typography variant="h5">Bank (Add/ Edit)</Typography>
                    {/* <hr style={{width:'360',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:"solid"}}></hr>  */}
                </Grid>
                <br></br>
                <Grid container xs={4} sm={8} md={12} spacing={{ xs: 1, md: 2 }}>
                    <Grid item xs={4} sm={5} md={4} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            <b><label style={{ color: "#ff0000" }}>*</label> Company Branch Name</b>
                        </Typography>
                        {/* <Grid item sm={3}> */}
                        <FormControl fullWidth size="small" error={isCompanyBranchNameError}>
                            <Select value={companyBranchName} onChange={handleCBNChange}>
                                <MenuItem disabled={true} value="--Select--">
                                    --Select--
                                </MenuItem>
                                {companyBranchNameFullList.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.branchType}>
                                            {item.branchType}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>{companyBranchNameError}</FormHelperText>
                        </FormControl>
                        {/* </Grid> */}
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
                            <b><label style={{ color: "#ff0000" }}>*</label>Bank Name</b>
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
                            onClick={handleSubmitClick}
                        >
                            Submit
                        </LoadingButton>
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
                        <Typography variant="h6">Bank List</Typography>
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
                                {addBankList.length === 0 ? (
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
                                            rows={addBankListTemp}
                                            columns={addBankColumns}
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
                                                const arrActivity = [...addBankList];
                                                let a: AddBankListModel | undefined =
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert severity={snackbarType} sx={{ width: "100%" }}>
                    {snackMsg}
                </Alert>
            </Snackbar>
        </Box>
    )
};


export default AddBank;

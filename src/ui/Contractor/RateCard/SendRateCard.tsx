import {
    Box, Alert, AlertColor, Container, Grid, Select, MenuItem, FormControl,
    FormHelperText,Typography, Stack, Button, CircularProgress, InputAdornment, Snackbar, ListItemText
} from "@mui/material";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from '@mui/icons-material/List';
import NoData from "../../../components/NoData";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../../utils/tablecolumns";
import { ProductDetailsModel,SendRateCardModel } from "../../../models/Model";
import { theme } from "../../../theme/AppTheme";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { communication } from "../../../utils/communication";
import Provider from "../../../api/Provider";
import { useCookies } from "react-cookie";
import { Style } from "@mui/icons-material";
import { border } from "@mui/system";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const SendRateCard = () => {

    //#region Variables
    // const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["dfc"]);
    const [CookieUserID, SetCookieUseID] = useState(0);
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [clientName, setClientName] = useState("--Select--");
    const [clientNameID, setClientNameID] = useState<number>(0);
    const [clientNameError, SetClientNameError] = useState("");
    const [isClientNameError, IsSetClientNameError] = useState(false);
    const [clientNameList, setClientNameList] = useState<Array<SendRateCardModel>>([]);
    const [clientNameFullData, setClientNameFullData] = useState([]);

    const [cName, setCName] = useState("");
    const [clientNo, setClientNo] = useState("");

    const [unitOfSales, setUnitOfSales] = useState("--Select--");
    const [unitOfSalesID, setUnitOfSalesID] = useState<number>(0);
    const [unitOfSalesError, SetUnitOfSalesError] = useState("");
    const [isUnitOfSalesError, IsSetUnitOfSalesError] = useState(false);
    const [unitOfSalesList, setUnitOfSalesList] = useState<Array<SendRateCardModel>>([]);
    const [UnitOfSalesFullData, setUnitOfSalesFullData] = useState([]);

    const [productDetailList, setProductDetailList] = useState<Array<ProductDetailsModel>>([]);
    const [productDetailListTemp, setProductDetailListTemp] = React.useState<Array<any>>([]);
    
    const [pageSize, setPageSize] = React.useState<number>(5);
    const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");

    //#endregion

    //#regionFunction
    useEffect(() => {
        // FetchCompanyName();

    }, []);

    const handleClientNameChange = (event: SelectChangeEvent) => {

        let clientName: string = event.target.value;
        let ac = clientNameFullData.find((el) => el.clientName === clientName);
        if (ac !== undefined) {
            setClientName(clientName);
            setClientNameID(ac?.id);
            IsSetClientNameError(false);
            SetClientNameError("");
            setCName(ac?.cName);
            setClientNo(ac?.clientNo);

        }
    };

    const handleUnitOfSalesChange = (event: SelectChangeEvent) => {

        let unitOfSales: string = event.target.value;
        let ac = UnitOfSalesFullData.find((el) => el.unit === unitOfSales);
        if (ac !== undefined) {
            setUnitOfSales(unitOfSales);
            setUnitOfSalesID(ac?.id);
            IsSetUnitOfSalesError(false);
            SetUnitOfSalesError("");
        }
    };

    const FetchCompanyName = () => {
        let params = {
            AddedByUserID: cookies.dfc.UserID,
        };
        Provider.getAll(`master/getbranchadmins?${new URLSearchParams(GetStringifyJson(params))}`)
            .then((response: any) => {
                const clientdata: any = [];
                if (response.data && response.data.code === 200) {
                    if (response.data.data) {
                        setClientNameFullData(response.data.data);
                        response.data.data.map((data: any, i: number) => {
                            clientdata.push({
                                id: data.id,
                                companyName: data.companyName,
                            });
                        });
                        setClientNameList(clientdata);
                    }
                }
            })
            .catch((e) => { });
    };

  
    //#endregion

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4">RATE CARD SETUP</Typography>
                            <Button variant="contained" startIcon={<AddIcon sx={{ marginRight: 1 }} />} onClick={() => navigate("/contractor/ratecard/sendratecardlist")}>View List</Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">Client Deatils</Typography>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                        <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={6}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={3}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            <b style={{ float: 'right', }}>  <label style={{ color: "#ff0000" }}>*</label>Client Name</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <FormControl fullWidth size="small" error={isClientNameError}>
                                            <Select value={clientName} onChange={handleClientNameChange} >
                                                <MenuItem disabled={true} value="--Select--">
                                                    --Select--
                                                </MenuItem>
                                                {clientNameList.map((item, index) => {
                                                    return (
                                                        <MenuItem key={index} value={item.clientName}>
                                                            {item.clientName}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                            <FormHelperText>{clientNameError}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={1}>
                                        <Button variant="contained" style={{ marginTop: "-4px" }} sx={{ mr: 1, backgroundColor: theme.palette.success.main }}>
                                            <AddIcon />
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={6}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={2}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            <b style={{ float: 'right', }}>Client Name</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <TextField
                                            fullWidth
                                            disabled={true}
                                            sx={{ background: "#e5e5e5" }}
                                            inputProps={{
                                                maxLength: 10,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                            onChange={(e) => {
                                                setCName((e.target as HTMLInputElement).value);
                                            }}
                                            value={cName}
                                        />
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            <b style={{ float: 'right', }}>Client No</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <TextField
                                            fullWidth
                                            disabled={true}
                                            sx={{ background: "#e5e5e5" }}
                                            inputProps={{
                                                maxLength: 10,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                            onChange={(e) => {
                                                setClientNo((e.target as HTMLInputElement).value);
                                            }}
                                            value={clientNo}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">Rate Card Preparation Type</Typography>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px", }}>
                        <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={5}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={4}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            <b style={{ float: 'right', }}>  <label style={{ color: "#ff0000" }}>*</label>Unit of Sales</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={7}>
                                        <FormControl fullWidth size="small" error={isUnitOfSalesError}>
                                            <Select value={unitOfSales} onChange={handleUnitOfSalesChange} >
                                                <MenuItem disabled={true} value="--Select--">
                                                    --Select--
                                        
                                                </MenuItem>
                                                <MenuItem value="foot">Foot</MenuItem>
                                                <MenuItem value="Meter">Meter</MenuItem>
                                                {unitOfSalesList.map((item, index) => {
                                                    return (
                                                        <MenuItem key={index} value={item.unit}>
                                                            {item.unit}
                                                            
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                            <FormHelperText>{unitOfSalesError}</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                </Grid>

                            </Grid>
                            <Grid item xs={4}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={5}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            <b style={{ float: 'right', }}>Inclusive Materials</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={1}>
                                        
                                        <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label="" />
                                        </FormGroup>
                                       

                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 9, md: 12 }} >
                                    <Grid item sm={8}>
                                        <Button variant="contained" style={{ marginTop: "-4px" }} sx={{ mr: 1, backgroundColor: theme.palette.success.main }}>
                                            <AddIcon />     Add Product
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">Product Details</Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12}>
                    {loading ? (
                        <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                            {productDetailList.length === 0 ? (
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
                                            // value={searchQuery}
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
                                        rows={productDetailListTemp}
                                        columns={productColumns}
                                        pageSize={pageSize}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        disableSelectionOnClick
                                        onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                                            const arrActivity = [...productDetailList];
                                            let a: ProductDetailsModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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
        </Box >
    )
};

export default SendRateCard;
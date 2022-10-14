import { Box, Alert, AlertColor, Container, Grid, FormControl, Select, MenuItem, FormHelperText, Typography, Stack, Button, CircularProgress, InputAdornment, Snackbar } from "@mui/material";
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
import { sendRateCardListColumns } from "../../../utils/tablecolumns";
import { SendRateCardModel } from "../../../models/Model";
import { theme } from "../../../theme/AppTheme";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { communication } from "../../../utils/communication";
import Provider from "../../../api/Provider";
import { useCookies } from "react-cookie";

const SendRateCardList = () => {

    //#region Variables
    // const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["dfc"]);
    const [CookieUserID, SetCookieUseID] = useState(0);
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [sendRateCardList, setSendRateCardList] = useState<Array<SendRateCardModel>>([]);
    const [sendRateCardListTemp, setSendRateCardListTemp] = React.useState<Array<any>>([]);
    const [pageSize, setPageSize] = React.useState<number>(5);
    const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
    //#endregion

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                    <Typography variant="h6">
                        Rate Card List (Contarctor)
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                    {loading ? (
                        <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                            {sendRateCardList.length === 0 ? (
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
                                        rows={sendRateCardListTemp}
                                        columns={sendRateCardListColumns}
                                        pageSize={pageSize}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        disableSelectionOnClick
                                        onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                                            const arrActivity = [...sendRateCardList];
                                            let a: SendRateCardModel | undefined = arrActivity.find((el) => el.id === param.row.id);
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

            </Container>
        </Box>
    )
};

export default SendRateCardList;
import React,{useState} from "react";
import {Box,Container,Grid,Typography,Stack} from "@mui/material";
import Header from "../../components/Header";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { pocketRemainder } from "../../utils/tablecolumns";
import { ServiceNameModel } from "../../models/Model";
import { Theme, useTheme } from "@mui/material/styles";
const PocketRemainder = () =>{
    
    //for grid
    const [gridServicesList, setGridServicesList] = useState<Array<ServiceNameModel>>([]);
    const [gridServicesListTemp, setGridServicesListTemp] = useState<Array<ServiceNameModel>>([]);

    //for dropdown
    const [serviceName, setServiceName] = useState("--Select--");
    const [serviceID, setServiceID] = useState<number>(0);
    const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);

    const [display, setDisplay] = useState("Yes");
    const [pageSize, setPageSize] = useState<number>(5);
    const [buttonDisplay, setButtonDisplay] = useState<string>("none");
    const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
    const [actionStatus, setActionStatus] = useState<string>("new");
    const [selectedID, setSelectedID] = useState<number>(0);
    const theme = useTheme();

    const handelEditAndDelete = (type: string | null, a: ServiceNameModel | undefined) => {
        if (type?.toLowerCase() === "edit" && a !== undefined) {
          setDataGridOpacity(0.3);
          setDataGridPointer("none");
          setDisplay(a.display);
          setServiceName(a.serviceName);
          setServiceID(
            serviceNameList.find((el) => {
              return el.serviceName === a.serviceName;
            }).id
          );
          setSelectedID(a.id);
          setButtonDisplay("unset");
          setActionStatus("edit");
        }
      };
    const design = (
        <>
            <Box sx={{ mt:11 }}>
            <Header />
            <Container maxWidth="lg" >
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h4">Pocket Dairy</Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="h6">Remainder</Typography>
                            <NotificationsActiveOutlinedIcon />
                        </Stack>
                    </Grid>
                    
                    <Grid item xs={4} sm={8} md={12}>
                        <DataGrid
                            style={{
                                opacity: dataGridOpacity,
                                pointerEvents: dataGridPointer,
                            }}
                            rows={gridServicesListTemp}
                            columns={pocketRemainder}
                            getRowHeight={() => "auto"}
                            autoHeight={true}
                            pageSize={pageSize}
                            rowsPerPageOptions={[5, 10, 20]}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            disableSelectionOnClick
                            onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                                const arrActivity = [...gridServicesList];
                                let a: ServiceNameModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                                handelEditAndDelete((e.target as any).textContent, a);
                                }}
                                sx={{
                                    "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
            </Box>
        </>
    );
    return design;
}
export default PocketRemainder;
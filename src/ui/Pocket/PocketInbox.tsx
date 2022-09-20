import React,{useState} from "react";
import {Box,Container,Grid,Typography,TextField,Autocomplete,Stack,Button,Paper,Tab} from "@mui/material";
import Header from "../../components/Header";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { pocketInbox } from "../../utils/tablecolumns";
import {serviceColumns} from "../../utils/tablecolumns";
import { ServiceNameModel } from "../../models/Model";
import { Theme, useTheme } from "@mui/material/styles";
const rows = [
    {
        id:"1",
        date:"10-12-2015",
        contactname:"9004070123",
        contact:"9000",
        amount:"900",
        status:"one"
    },
    {
        id:"2",
        date:"10-12-2015",
        contactname:"9004070123",
        contact:"9000",
        amount:"900",
        status:"one"
    },
    {
        id:"3",
        date:"10-12-2015",
        contactname:"9004070123",
        contact:"9000",
        amount:"900",
        status:"two"
    }
]
const PocketInbox = () =>{
    const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [display, setDisplay] = useState("Yes");
  const [pageSize, setPageSize] = useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [selectedID, setSelectedID] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
 

  const theme = useTheme();

  //for dropdown
  const [serviceName, setServiceName] = useState("--Select--");
  const [serviceID, setServiceID] = useState<number>(0);
  const [serviceErrorText, setServiceErrorText] = useState("");
  const [isServiceError, setIsServiceError] = useState(false);
  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);

  //for grid
  const [gridServicesList, setGridServicesList] = useState<Array<ServiceNameModel>>([]);
  const [gridServicesListTemp, setGridServicesListTemp] = useState<Array<ServiceNameModel>>([]);

    const [value,setValue] = useState('1')
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };

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
        <Box sx={{ mt:11 }}>
            <Header />
            <Container maxWidth="lg" >
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h4">Pocket Dairy</Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">Inbox</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList aria-label="Tabs example" onChange={handleChange}>
                                    <Tab label="Settlement" value="1" />
                                    <Tab label="Lending" value="2" />
                                    <Tab label="Company" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Grid item xs={4} sm={8} md={12}>
                                <DataGrid
                                    style={{
                                        opacity: dataGridOpacity,
                                        pointerEvents: dataGridPointer,
                                    }}
                                    rows={gridServicesListTemp}
                                    columns={serviceColumns}
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
                            </TabPanel>
                            <TabPanel value="2">Pael two</TabPanel>
                            <TabPanel value="3">Panel three</TabPanel>
                        </TabContext>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
    return design;
}
export default PocketInbox;
import { useState } from "react";
import {Box,Container,Grid,Typography,Tabs,Tab,TextField,InputAdornment} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { DataGrid,GridSearchIcon } from "@mui/x-data-grid";
import { ServiceNameModel } from "../../../models/Model";
import { archNewCol,archAccepted,userRejectedEnquiry } from "../../../utils/tablecolumns";




import Header from "../../../components/Header";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Box>{children}</Box>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }


  // Dummy data for tables

  const dummyNew = [
    {id:1,details:"R.D Frames",boq:"4",action:"Accept OR Reject"},
    {id:2,details:"R.D Frames",boq:"5",action:"Accept OR Reject"}
  ]

  
  const dummyAccepted = [
    {id:1,details:"R.D Frames",boq:"4",boq_status:"Architect & Client Approve your budget",action:"Accept OR Reject"}
  ]

  const dummyRejected = [
    {id:1,details:"R.D Frames",boq:"4",boq__status:"Architect & Client Approve your budget",action:"Accept OR Reject"}
  ]



const ArchitectAndConsultant = () => {
 //#region Variables
    const theme = useTheme()
    const [pageSize, setPageSize] = useState<number>(5);

    const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");

    const [searchQuery, setSearchQuery] = useState("");

      //for grid
    const [gridServicesList, setGridServicesList] = useState<Array<ServiceNameModel>>([]);
    const [gridServicesListTemp, setGridServicesListTemp] = useState<Array<ServiceNameModel>>([]);
 //#endregion 

    const [value,setValue] = useState(0)
    const [entries,setEntries] = useState(10)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
     const handleEntries =  (e) => {
        console.log(e.target.value)
        setEntries(e.target.value)
      };
 //#region Functions
      const onChangeSearch = (query: string) => {
        setSearchQuery(query);
        if (query === "") {
          setGridServicesListTemp(gridServicesList);
        } else {
          setGridServicesListTemp(
            gridServicesList.filter((el: ServiceNameModel) => {
              return el.serviceName.toString().toLowerCase().includes(query.toLowerCase());
            })
          );
        }
      };
//#endregion 

    return (
        <Box sx={{mt:11}}>
            <Header />
            <Container maxWidth="lg">
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h4">Architect New BOQ</Typography>
                    </Grid>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider',width:'100%' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="New / Edit / View" {...a11yProps(0)} />
                            <Tab label="Accepted" {...a11yProps(1)} />
                            <Tab label="Rejected" {...a11yProps(2)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>                            
                        <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          onChangeSearch((e.target as HTMLInputElement).value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <GridSearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    {/* <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}> */}
                    <DataGrid
                      style={{
                        opacity: dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      rows={dummyNew}
                      columns={archNewCol}
                      getRowHeight={() => "auto"}
                      autoHeight={true}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      // onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                      //   const arrActivity = [...gridServicesList];
                      //   let a: ServiceNameModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                      //   handelEditAndDelete((e.target as any).textContent, a);
                      // }}
                      sx={{
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        },
                      }}
                    />
                    {/* </Grid> */}
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                        <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          onChangeSearch((e.target as HTMLInputElement).value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <GridSearchIcon />
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
                      rows={dummyAccepted}
                      columns={archAccepted}
                      getRowHeight={() => "auto"}
                      autoHeight={true}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      // onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                      //   const arrActivity = [...gridServicesList];
                      //   let a: ServiceNameModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                      //   handelEditAndDelete((e.target as any).textContent, a);
                      // }}
                      sx={{
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        },
                      }}
                    />
                        </TabPanel>


                        <TabPanel value={value} index={2}>
                        <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          onChangeSearch((e.target as HTMLInputElement).value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <GridSearchIcon />
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
                      rows={dummyRejected}
                      columns={archAccepted}
                      getRowHeight={() => "auto"}
                      autoHeight={true}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      // onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                      //   const arrActivity = [...gridServicesList];
                      //   let a: ServiceNameModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                      //   handelEditAndDelete((e.target as any).textContent, a);
                      // }}
                      sx={{
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        },
                      }}
                    />
                        </TabPanel>
                    </Box>
                    
                </Grid>
            </Container>
        </Box>
        
    )
}

export default ArchitectAndConsultant
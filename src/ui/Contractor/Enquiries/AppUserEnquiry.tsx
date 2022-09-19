import { useState } from "react";
import {Box,Container,Grid,Typography,Tabs,Tab,TextField,InputAdornment} from "@mui/material";
import { DataGrid,GridSearchIcon } from "@mui/x-data-grid";
import { ServiceNameModel } from "../../../models/Model";
import { Theme, useTheme } from "@mui/material/styles";
import { userNewEnquiry,userAcceptedEnquiry,userRejectedEnquiry } from "../../../utils/tablecolumns";
import Header from "../../../components/Header";



// Default values for creating Box tab elements -----Start---------
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
  
//   Default values for creating Box tab elements -----ENd---------

// Dummy data for table


const dummyRow  = [
  { id: 1, clientDetails: 'Snow', designImage: 'https://dfsolutions.in/uploads/ServiceCatelogueDesign/designimage_2_3_1652627009.jpeg', 
  estimation_product_details: {
    est_no:"AUG0004",
    service:"GYPSUM & POP",
    category:"DRYWALL PARTITION",
    product:" 127 MM GYPSUM PARTITION",
    design_type:"92mm board side",
    design_no:"DS-0012",
    sq_ft:"1.0000",
    material_cost:"286.47",
    labour_cost:"83.00"
  },
  labourCost : 1445523,
  action: " Accept OR Reject" 
},
  { id: 2, clientDetails: 'white', designImage: 'https://dfsolutions.in/uploads/ServiceCatelogueDesign/designimage_25_9_1652627202.jpeg', estimation_product_details: {
    est_no:"AUG0004",
    service:"GYPSUM & POP",
    category:"DRYWALL PARTITION",
    product:" 127 MM GYPSUM PARTITION",
    design_type:"92mm board side",
    design_no:"DS-0012",
    sq_ft:"1.0000",
    material_cost:"286.47",
    labour_cost:"83.00"
  },labourCost : 1445523,action: "Accept OR Reject" },
  { id: 3, clientDetails: 'Sparrow', designImage: 'https://dfsolutions.in/uploads/ServiceCatelogueDesign/designimage_2_15_1660751109.jpeg', estimation_product_details: {
    est_no:"AUG0004",
    service:"GYPSUM & POP",
    category:"DRYWALL PARTITION",
    product:" 127 MM GYPSUM PARTITION",
    design_type:"92mm board side",
    design_no:"DS-0012",
    sq_ft:"1.0000",
    material_cost:"286.47",
    labour_cost:"83.00"
  },labourCost : 1445523,action: "Accept OR Reject" },
  { id: 4, clientDetails: 'Alberto', designImage: 'https://dfsolutions.in/uploads/ServiceCatelogueDesign/designimage_51_12_1657984955.png', estimation_product_details: {
    est_no:"AUG0004",
    service:"GYPSUM & POP",
    category:"DRYWALL PARTITION",
    product:" 127 MM GYPSUM PARTITION",
    design_type:"92mm board side",
    design_no:"DS-0012",
    sq_ft:"1.0000",
    material_cost:"286.47",
    labour_cost:"83.00"
  },labourCost : 140523,action: "Accept OR Reject" },
  { id: 5, clientDetails: 'Jessica', designImage: 'https://dfsolutions.in/uploads/ServiceCatelogueDesign/designimage_2_3_1652627009.jpeg', estimation_product_details: {
    est_no:"AUG0004",
    service:"GYPSUM & POP",
    category:"DRYWALL PARTITION",
    product:" 127 MM GYPSUM PARTITION",
    design_type:"92mm board side",
    design_no:"DS-0012",
    sq_ft:"1.0000",
    material_cost:"286.47",
    labour_cost:"83.00"
  },labourCost : 14523,action: "Accept OR Reject" }
];

const dummyRow_Accepted = [
  {id: 1, clientDetails: 'Snow', designImage: 'https://dfsolutions.in/uploads/ServiceCatelogueDesign/designimage_2_15_1660751109.jpeg', estimation_product_details: {
    est_no:"AUG0004",
    service:"GYPSUM & POP",
    category:"DRYWALL PARTITION",
    product:" 127 MM GYPSUM PARTITION",
    design_type:"92mm board side",
    design_no:"DS-0012",
    sq_ft:"1.0000",
    material_cost:"286.47",
    labour_cost:"83.00"
  },labourCost : 123, status: "Waiting for client Approval", action: " Accept OR Reject"}
]



const AppUserEnquiry = () => {

    const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
    const theme = useTheme()
    const [pageSize, setPageSize] = useState<number>(5);
    const [searchQuery, setSearchQuery] = useState("");

    //for grid
  const [gridServicesList, setGridServicesList] = useState<Array<ServiceNameModel>>([]);
  const [gridServicesListTemp, setGridServicesListTemp] = useState<Array<ServiceNameModel>>([]);

  // Default values for creating Box tab elements -----Start---------

    const [value,setValue] = useState(0)
    const [entries,setEntries] = useState(10)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
     const handleEntries =  (e) => {
        console.log(e.target.value)
        setEntries(e.target.value)
      };

//   Default values for creating Box tab elements -----ENd---------

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

    return (
        <Box sx={{ mt: 11 }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h4">General User New Enquiry</Typography>
                    </Grid>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider',width:'100%' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="New" {...a11yProps(0)} />
                            <Tab label="Accepted" {...a11yProps(1)} />
                            <Tab label="Rejected" {...a11yProps(2)} />
                        </Tabs>
                        {/* New Tab */}
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
                      rows={dummyRow}
                      columns={userNewEnquiry}
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

                        {/* Accepted Tab */}
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
                      rows={dummyRow_Accepted}
                      columns={userAcceptedEnquiry}
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

                        {/* Insert a new data grid here, make a model in utils/tablecolumns like userNewEnquiry and dummy row data like dummyrow  */}
                        {/* Rejected Panel */}
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
                      rows={dummyRow}
                      columns={userRejectedEnquiry}
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

export default AppUserEnquiry
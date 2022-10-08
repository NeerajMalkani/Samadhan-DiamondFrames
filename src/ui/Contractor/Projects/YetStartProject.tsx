import { useState } from "react";
import {Box,Container,Grid,Typography,Tabs,Tab,TextField,InputAdornment} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { DataGrid,GridSearchIcon } from "@mui/x-data-grid";
import { ServiceNameModel } from "../../../models/Model";
import { yetStartProject } from "../../../utils/tablecolumns";




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

  const dummy = [
    {id:1,by_project:"General User Enquiry Wise",project_name:"---",contact:" -- & --",action:"Accept"},
    {id:2,by_project:"Contractor Design Wise",project_name:"---",contact:" -- & --",action:"Accept"}  

]

  
  



const YetStartProject = () => {
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

 //#region Functions
    const [value,setValue] = useState(0)
    const [entries,setEntries] = useState(10)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
     const handleEntries =  (e) => {
        console.log(e.target.value)
        setEntries(e.target.value)
      };

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
            <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h4">Yet Start Projects</Typography>
                    </Grid>
            <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 ,mt:1}}>
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
                      rows={dummy}
                      columns={yetStartProject}
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
            </Container>
        </Box>
        
    )
}

export default YetStartProject

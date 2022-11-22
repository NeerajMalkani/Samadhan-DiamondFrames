import React,{useState} from 'react'
import Header from '../../../components/Header'
import {Box,Typography,Container,Grid,Button,FormControl,Select,MenuItem,FormHelperText} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";
import { CategoryModel } from '../../../models/Model';


function VenderOrderAddForm() {

    const [categoryName, setCategoryName] = useState("--Select--");
    const [categoryNameID, setCategoryNameID] = useState<number>(0);
    const [categoryNameError, setCategoryNameError] = useState("");
    const [isCategoryNameError, setIsCategoryNameError] = useState(false);
    const [categoryNameList, setCategoryNameList] = useState<Array<CategoryModel>>([]);

    const handleCNChange = (event: SelectChangeEvent) => {
        debugger;
        let categoryName: string = event.target.value;
        let ac = categoryNameList.find((el) => el.categoryName === categoryName);
        if (ac !== undefined) {
            setCategoryName(categoryName);
            setCategoryNameID(ac?.id);
            setIsCategoryNameError(false);
            setCategoryNameError("");

        }
    };


    let navigate = useNavigate();

  return (
 <Box sx={{mt:11}}>
       <Header/>
       <Container maxWidth="lg">
       <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-end", }}>
                <Grid>
                    {/* <Button sx={{mt:1,mr:2}}
                        variant="text"
                        // disabled={otpButtonDisabled}
                        onClick={() => {
                            addProduct();
                        }}>
                        + Create New
                    </Button> */}
                     <Button variant="contained"onClick={() => navigate(-1)} sx={{mr:2}}>View Purchase Order List </Button>

                </Grid>
            </Grid>
            
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant='h4'>  Vender Order</Typography>
                    </Grid>
                    <Grid item xs={2} sm={6}>
                        <Typography variant="h5"> Vender Order ADD</Typography>
                    </Grid>
                </Grid>
               <hr></hr>
               <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }} style={{marginTop:"30px"}}>
                        <Grid item sm={5}>
                            <label>
                                <label style={{ color: "#ff0000" }}>*</label> Vendor Company Name (Delivery Address)
                            </label>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl fullWidth size="small" error={isCategoryNameError}>
                                <Select value={categoryName} onChange={handleCNChange}>
                                    <MenuItem disabled={true} value="--Select--">
                                        SSP/0001
                                    </MenuItem>
                                    <MenuItem disabled={true} value="--Select--">
                                        --select--
                                    </MenuItem>
                              
                           
                                    {categoryNameList.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item.categoryName}>
                                                {item.categoryName}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{categoryNameError}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>

            </Container>
 </Box>
  )
}

export default VenderOrderAddForm
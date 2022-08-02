import{
Box,
TextField,
Button,
Container,
FormControl,
FormControlLabel,
Typography,
Select,
Grid,
Menu,
Snackbar,
MenuItem
} from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React,{ useState,useEffect } from "react";
import {theme } from "../../../theme/AppTheme";
import { useCookies } from "react-cookie";
import ModeIcon from '@mui/icons-material/Mode';
import CheckIcon from '@mui/icons-material/Check';
import { ArrowDropDown, FormatAlignJustify } from "@mui/icons-material";
import { border } from "@mui/system";

const Basic = () => {
    debugger;
    const [cookies, setCookie] = useCookies(["dfc"]);
    let navigate = useNavigate();
  
    useEffect(() => {
        if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
          navigate(`/login`);
      }, []);

      const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");

return(
   <Box sx={{ mt:11}} >
    <Header/>
    <Container maxWidth="lg">
        <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:9,md:12}}  >
          <Grid item xs={4} sm={8} md={12} >
            <Typography variant="h4" > BASIC DETAILS</Typography> 
          </Grid>
          </Grid>
          <br></br>  
          {/* <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:9,md:12}} style={{border:1,borderStyle:"solid",borderWidth:1,borderColor:'#000000'}}> */}
          <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:9,md:12}} >
            <Grid item sm={4} >
                <Typography variant="h6" >HEAD OFFICE COMPANY DETAILS</Typography>
                <hr style={{width:'360px',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:"solid",}}/>
            </Grid>
            <Grid item sm={4} >
                <Typography variant="h6" >HEAD OFFICE BANK DETAILS</Typography>
                <hr style={{width:'360px',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:"solid"}}/>
            </Grid>
            <Grid item sm={4} >
                <Typography variant="h6" >LOGO PREVIEW</Typography>
                <hr style={{width:'360px',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:"solid"}}/>
            </Grid>
          </Grid>
          <br></br>         
          <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:10,md:15}} >
          <Grid item sm={2}> 
            <label><label style={{ color: "#ff0000" }}>*</label> Company/Firm Name</label>
          </Grid>
          <Grid item sm={3}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            <Grid item sm={2}>
            <label>Account No</label>
          </Grid>
          <Grid item sm={3}>
                <TextField variant="outlined" size="small"></TextField>
            </Grid>
            <Grid item sm={2}>
            <label>Change Logo</label>
          </Grid>
          <Grid item sm={3}>
                <TextField  variant="outlined" size="small"><Button>Choose Logo</Button></TextField>
            </Grid>
            </Grid>  
            <br></br>           
        <Grid container spacing={{xs:1, md:2}} columns={{ xs:4,sm:10,md:15}} >
        <Grid item sm={2}> 
            <label><label style={{ color: "#ff0000" }}>*</label> Contact Person Name</label>
          </Grid>
          <Grid item sm={3}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
            <Grid item sm={2}>
            <label>Bank Name</label>
          </Grid>
          <Grid item sm={3}>
                <TextField  variant="outlined" size="small"></TextField>
            </Grid>
        </Grid>
        <br></br>     
        <Grid container spacing={{xs:1, md:2}} columns={{xs:4,sm:10,md:15}}>
          <Grid item sm={2}>
            <label><label style={{ color: "#ff0000" }}>*</label> Contact Person No</label>
          </Grid>
          <Grid item sm={3}>
            <TextField  variant="outlined" size="small"></TextField>
          </Grid>
          <Grid item sm={2}>
            <label>Bank Branch Name</label>
          </Grid>
          <Grid item sm={3}>
          <TextField  variant="outlined" size="small"></TextField>
          </Grid>
        </Grid>
        <br></br>     
        <Grid container spacing={{xs:1, md:2}} columns={{xs:4,sm:10,md:15}}>
          <Grid item sm={2}>
            <label>GST No</label>
          </Grid>
          <Grid item sm={3}>
            <TextField variant="outlined" size="small"></TextField>
          </Grid>
          <Grid item sm={2}>
            <label>IFSC Code</label>
          </Grid>
          <Grid item sm={3}>
            <TextField variant="outlined" size="small"></TextField>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{xs:1, md:2}} columns={{xs:4,sm:10,md:15}}>
          <Grid item sm={2}>
            <label>Pan No</label>
          </Grid>
          <Grid item sm={3}>
            <TextField  variant="outlined" size="small"></TextField>
          </Grid>
          <Grid item sm={4}>
          <Typography variant="h6" >COMPANY COMMON SETUP</Typography>
          <hr style={{width:'300px',borderRadius:1,borderWidth:1,borderColor:'#000000',borderStyle:"solid"}}/>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:10,md:15}}>
          <Grid item sm={2}>
            <label><label style={{ color: "#ff0000" }}>*</label> Location Name</label>
          </Grid>
          <Grid item sm={3}>
            <TextField  variant="outlined" size="small"></TextField>
          </Grid>
        <Grid item sm={2}>
          <label>Comapny Name Prefix</label>
        </Grid>
        <Grid item sm={3}>
          <TextField  variant="outlined" size="small"></TextField>
        </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:10,md:15}}>
          <Grid item sm={2}>
            <label>Address</label>
          </Grid>
          <Grid item sm={3}>
            <TextField  variant="outlined" size="small"></TextField>
          </Grid>
          <Grid item sm={2}>
            <label>Employee Code prefix</label>
          </Grid>
          <Grid item sm={3}>
            <TextField  variant="outlined" size="small"></TextField>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:10,md:15}}>
          <Grid item sm={2}>
            <label>State</label>
          </Grid>
          <Grid item sm={3}>
          <Select style={{width:220,}}>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
          </Select>
          </Grid>
          <Grid item sm={2}>
            <label>Purchase Order prefix</label>
          </Grid>
          <Grid item sm={3}>
            <TextField  variant="outlined" size="small"></TextField>
          </Grid>
        </Grid>
        <br></br>
       <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:10,md:15}}>
        <Grid item sm={2}>
          <label>City</label>
        </Grid>
        <Grid item sm={3}>
          <Select style={{width:220,}}>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
          </Select>
          
        </Grid>
        <Grid item sm={2}>
          <label>Purchase Order Prefix</label>
        </Grid>
        <Grid item sm={3}>
          <TextField  variant="outlined" size="small"></TextField>
        </Grid>
       </Grid>
       <br></br>
       <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:10,md:15}}>
        <Grid item sm={2}>
          <label>Pincode</label>
        </Grid>
        <Grid item sm={3}>
          <TextField  variant="outlined" size="small"></TextField>
        </Grid>
       </Grid>
       <br></br>
       <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:10,md:15}} style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
        <Grid >
          {/* <Button style={{color:'#006680',border:1,borderColor:'#000000',borderStyle:"solid"}}><CheckIcon/>  Update</Button> */}
          <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}>Update</Button>
        </Grid>
       </Grid>   
       {/* </Grid> */}
    </Container>
   </Box>
)
    };
    
export default Basic;

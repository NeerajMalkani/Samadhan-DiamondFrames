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
    import Header from "../components/Header";
    import { useNavigate } from "react-router-dom";
    import React,{ useState,useEffect } from "react";
    import {theme } from "../theme/AppTheme";
    import { useCookies } from "react-cookie";
    import ModeIcon from '@mui/icons-material/Mode';
    import CheckIcon from '@mui/icons-material/Check';
    import { ArrowDropDown, FormatAlignJustify } from "@mui/icons-material";
    import { border } from "@mui/system";
    
        const Userbasic = () => {
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
              <Grid item xs={2} sm={4}  >
              <Typography variant="h4" > Update Profile</Typography> 
              </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:10,md:15}} >
              <Grid item sm={4}>
                <label>Name / Company Name</label>
              </Grid>
              <Grid item sm={4}>
                <TextField variant="outlined" size="small"></TextField>
              </Grid>  
              </Grid>
            <br></br>
            <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:10,md:15}} >
              <Grid item sm={4}>
              <label><label  style={{ color: "#ff0000" }}>*</label> Contact Person</label>
              </Grid>
              <Grid item sm={4}>
                <TextField variant="outlined" size="small"></TextField>
              </Grid>  
              </Grid>
            <br></br>
            <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:10,md:15}} >
              <Grid item sm={4}>
              <label><label  style={{ color: "#ff0000" }}>*</label> Contact Mobile No</label>
              </Grid>
              <Grid item sm={4}>
                <TextField variant="outlined" size="small"></TextField>
              </Grid>  
              </Grid>
            <br></br>
            <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:10,md:15}} >
              <Grid item sm={4}>
              <label><label  style={{ color: "#ff0000" }}>*</label> Address 1</label>
              </Grid>
              <Grid item sm={4}>
                <TextField variant="outlined" size="small"></TextField>
              </Grid>  
              </Grid>
            <br></br>
            <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:10,md:15}} >
              <Grid item sm={4}>
              <label><label  style={{ color: "#ff0000" }}>*</label> State</label>
              </Grid>
              <Grid item sm={3}>
          <Select style={{width:220,}}>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
          </Select>
          </Grid> 
              </Grid>
            <br></br>
            <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:10,md:15}} >
              <Grid item sm={4}>
              <label><label  style={{ color: "#ff0000" }}>*</label> City</label>
              </Grid>
              <Grid item sm={3}>
          <Select style={{width:220,}}>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
          </Select>
          </Grid>  
              </Grid>
            <br></br>
            <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:10,md:15}} >
              <Grid item sm={4}>
              <label>Pincode</label>
              </Grid>
              <Grid item sm={4}>
                <TextField variant="outlined" size="small"></TextField>
              </Grid>  
              </Grid>
            <br></br>
            <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:10,md:15}} >
              <Grid item sm={4}>
              <label>GST No</label>
              </Grid>
              <Grid item sm={4}>
                <TextField variant="outlined" size="small"></TextField>
              </Grid>  
              </Grid>
            <br></br>
            <Grid container spacing={{ xs:1,md:2}} columns={{ xs:4,sm:10,md:15}} >
              <Grid item sm={4}>
              <label>PAN No</label>
              </Grid>
              <Grid item sm={4}>
                <TextField variant="outlined" size="small"></TextField>
              </Grid>  
              </Grid>
            <br></br>
            <Grid container spacing={{xs:1,md:2}} columns={{xs:4,sm:10,md:15}} style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
            <Grid >
              <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}>Update</Button>
            </Grid>
           </Grid>  
        </Container>
 </Box>

)
 };

export default Userbasic;
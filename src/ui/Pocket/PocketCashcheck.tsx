import React,{useState} from "react";
import {Box,Container,Grid,Typography,TextField,Autocomplete,Stack,Button,Paper,Table,TableContainer,TableHead,TableRow,TableCell,TableBody} from "@mui/material";
import Header from "../../components/Header";

type Cash = {
    id:number,
    label:string
}
const cashoptions = ['Both',"All of This"]; 

const PocketCash = () =>{
    const tabelbodydata = [
        {
            id:1,
            labelone:"1",
            labeltwo:"2",
            labelthree:"3"
        },
        {
            id:2,
            labelone:"4",
            labeltwo:"5",
            labelthree:"6"
        }
    ]
    const BodyRow = ({items}) =>{
        const design = (
            <>
                <TableRow>
                    <TableCell align="right" sx={{borderRight:"2px solid gray",backgroundColor:"#ddd"}}>{items.labelone}</TableCell>
                    <TableCell align="right" sx={{borderRight:"2px solid gray"}}>{items.labeltwo}</TableCell>
                    <TableCell align="right" sx={{backgroundColor:"#ddd"}}>{items.labelthree}</TableCell>
                </TableRow>
            </>
        );
        return design;
    }
    const design = (
        <Box sx={{ mt:11 }}>
            <Header />
            <Container maxWidth="lg" >
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h4">Pocket Dairy</Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">Cash Check</Typography>
                    </Grid>
                    <Grid item md={7}>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography>Check Mode</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={cashoptions}
                                    size="small"
                                    renderInput={(params)=><TextField {...params} label="Cash Check"/>}
                                />
                            </Grid>
                            <Grid item md={1}>
                                    <Typography sx={{ml:1}}>Self</Typography>
                                    <Typography sx={{ml:1}}>Company</Typography>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    <Grid item md={6}>
                        <Grid container sx={{mt:2}} md={12}>
                            <Grid item md={12}>
                                <TableContainer component={Paper}>
                                        <Table sx={{border:"2px solid gray"}} size="small">
                                            <TableHead sx={{backgroundColor:"#A8A9AD",width:"100%",p:0,border:"2px solid gray"}}>
                                                <TableRow sx={{backgroundColor:"#A8A9AD",width:"100%",p:0,border:"2px solid gray"}}>
                                                    <TableCell colSpan={3} align="center" sx={{color:"white"}}>Cash Check</TableCell>
                                                </TableRow>
                                                <TableRow sx={{backgroundColor:"#E6E7E9",width:"100%"}}>
                                                    <TableCell align="center" sx={{borderRight:"2px solid gray",width:"33.5%"}}>Denomination</TableCell>
                                                    <TableCell align="center" sx={{borderRight:"2px solid gray",width:"33.5%"}}>Count</TableCell>
                                                    <TableCell align="center" sx={{width:"33.5%"}}>Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    tabelbodydata.map((item)=>{
                                                        return <BodyRow items={item} key={item.id}/>
                                                    })
                                                }
                                                <TableRow sx={{backgroundColor:"#A8A9AD",border:"2px solid gray",color:"white"}}>
                                                    <TableCell colSpan={2} sx={{color:"white"}}>Total</TableCell>
                                                    <TableCell align="right" sx={{color:"white"}}>1800</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item md={12} sx={{mt:8}}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{border:"2px solid gray"}} size="small">
                                            <TableHead sx={{backgroundColor:"#A8A9AD",width:"100%",p:0,border:"2px solid gray"}}>
                                                <TableRow sx={{backgroundColor:"#A8A9AD",width:"100%",p:0,border:"2px solid gray"}}>
                                                    <TableCell colSpan={2} align="center" sx={{color:"white"}}>Cash In-Hand</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>slef</TableCell>
                                                    <TableCell align="right">900</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>slef</TableCell>
                                                    <TableCell align="right">900</TableCell>
                                                </TableRow>
                                                <TableRow sx={{backgroundColor:"#A8A9AD",color:"white"}}>
                                                    <TableCell sx={{color:"white"}}>Total</TableCell>
                                                    <TableCell align="right" sx={{color:"white"}}>1800</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Container>
        </Box>
    );
    return design;
}
export default PocketCash;
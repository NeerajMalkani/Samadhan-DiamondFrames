import React,{useState} from "react";
import {Box,Container,Grid,Typography,TextField,Autocomplete,Stack,Button,Paper} from "@mui/material";
import Header from "../../components/Header";

type Source = {
    id:number,
    label:string
}
const sources = ['Company','Self'];
const sourceOptions = sources.map((skill,index)=>({
    id:index+1,
    label:skill
}))
type StartDate = {
    id:number,
    label:string
}
const startdates = ['19-6-2020','19-6-2021','19-6-2022']
const sdateOptions = startdates.map((sdate,index)=>({
    id:index+1,
    label:sdate
}))
type EndDate = {
    id:number,
    label:string
}
const enddates = ['20-7-2020','20-7-2021','20-7-2022']
const edateOptions = enddates.map((edate,index)=>({
    id:index+1,
    label:edate
}))
type Report = {
    id:number,
    label:string
}
const reports = ['rizwan','khan','rizwan khan']
const reportOptions = reports.map((report,index)=>({
    id:index+1,
    label:report
}))
type Filter = {
    id:number,
    label:string
}
const filters = ['rizwan','khan','rizwan khan']
const filterOptions = reports.map((filter,index)=>({
    id:index+1,
    label:filter
}))
const PocketReport = () =>{
    const [source,setSource] = useState<Source | null>(null);
    console.log(source)
    const [startdate,setStartdate] = useState<StartDate | null>(null);
    console.log(startdate);
    const [enddate,setEnddate] = useState<StartDate | null>(null);
    console.log(enddate);
    const [report,setReport] = useState<Report | null>(null);
    console.log(enddate);
    const [filter,setFilter] = useState<Report | null>(null);
    console.log(enddate);
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
                        <Typography variant="h6">Reports</Typography>
                    </Grid>
                    <Grid item md={7}>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography >Source</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={sourceOptions}
                                    size="small"
                                    value={source}
                                    renderInput={(params)=><TextField {...params} label="Source"/>}
                                    onChange={(event:any,newValue:Source | null)=>setSource(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography >Start Date</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={sdateOptions}
                                    size="small"
                                    value={startdate}
                                    renderInput={(params)=><TextField {...params} label="Start Date"/>}
                                    onChange={(event:any,newValue:StartDate | null)=>setStartdate(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography >End Date</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={edateOptions}
                                    size="small"
                                    value={enddate}
                                    renderInput={(params)=><TextField {...params} label="Start Date"/>}
                                    onChange={(event:any,newValue:EndDate | null)=>setEnddate(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography >Report Name</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={reportOptions}
                                    size="small"
                                    value={report}
                                    renderInput={(params)=><TextField {...params} label="Report Name"/>}
                                    onChange={(event:any,newValue:Report | null)=>setReport(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography >Filters</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={filterOptions}
                                    size="small"
                                    value={filter}
                                    renderInput={(params)=><TextField {...params} label="Report Name"/>}
                                    onChange={(event:any,newValue:Filter | null)=>setFilter(newValue)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            </Box>
        </>
    );
    return design;
}
export default PocketReport;
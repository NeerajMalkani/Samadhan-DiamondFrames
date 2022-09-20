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

type Category = {
    id:number,
    label:string
}
const categorys = ['HTML','CSS','JAVASCRIPT','TYPESCRIPT','REACT'];
const categoryOptions = categorys.map((category,index)=>({
    id:index+1,
    label:category
}))

type Mode = {
    id:number,
    label:string
}
const modes = ["card","cash"];
const modeOptions = modes.map((mode,index)=>({
    id:index+1,
    label:mode
}))
const PocketSource = () =>{
    const [source,setSource] = useState<Source | null>(null);
    console.log(source)
    const [category,setCategory] = useState<Category | null>(null);
    console.log(category)
    const [mode,setMode] = useState<Mode | null>(null);
    console.log({mode})
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
                    <Typography variant="h6">Add Source</Typography>
                    </Grid>
                    <Grid item md={7}>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography>Source</Typography>
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
                                <Typography>Amount</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <TextField fullWidth type="number" size="small" label="Amount"/>
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography>Category</Typography>
                            </Grid>
                            <Grid item md={7}>
                                    <Autocomplete
                                        fullWidth
                                        options={categoryOptions}
                                        size="small"
                                        value={category}
                                        renderInput={(params)=><TextField {...params} label="Category"/>}
                                        onChange={(event:any,newValue:Source | null)=>setCategory(newValue)}
                                     />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography>Mode</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={modeOptions}
                                    size="small"
                                    value={mode}
                                    renderInput={(params)=><TextField {...params} label="Category"/>}
                                    onChange={(event:any,newValue:Mode | null)=>setMode(newValue)}
                                />
                            </Grid>
                            <Grid item md={1}>
                                    <Typography sx={{textAlign:"center",mt:1}}>cash</Typography>
                            </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography>Notes</Typography>
                            </Grid>
                            <Grid item md={7}>
                                 <TextField fullWidth type="number" size="small" label="Notes"/>
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} justifyContent="center" >
                            <Button type="submit" variant="contained">Submit</Button>
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
export default PocketSource;
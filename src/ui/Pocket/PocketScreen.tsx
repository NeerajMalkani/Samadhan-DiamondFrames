import React,{useState} from "react";
import {Box,Container,Grid,Typography,TextField,Autocomplete,Stack,Button,Paper} from "@mui/material";
import Header from "../../components/Header";

type Skill = {
    id:number,
    label:string
}
const skills = ['HTML','CSS','JAVASCRIPT','TYPESCRIPT','REACT'];
const skillOptions = skills.map((skill,index)=>({
    id:index+1,
    label:skill
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

type Rec = {
    id:number,
    label:string
}
const recs = ["Yes","No"];
const recOptions = recs.map((rec,index)=>({
    id:index+1,
    label:rec
}))
const PocketScreen = () =>{
    const [skill,setSkill] = useState<Skill |null>(null);
    console.log({skill})
    const [mode,setMode] = useState<Mode | null>(null);
    console.log({mode})
    const [rec,setRec] = useState<Rec | null>(null);
    console.log(rec)
    const design =(
    <>
        <Box sx={{ mt:11 }}>
            <Header />
            <Container maxWidth="lg" >
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h4">Pocket Dairy</Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                    <Typography variant="h6">Add Expanse</Typography>
                    </Grid>
                    <Grid item  md={7}>
                        <Grid container>
                            <Grid item md={4}>
                                <Typography variant="h6" component="p">Expense Type</Typography>
                            </Grid>
                        {/* <Autocomplete 
                            disablePortal 
                            sx={{width:"250px"}}
                            options={skills} 
                            renderInput={(params)=><TextField variant="outlined" {...params} label="skill" size="small"/>}
                            onChange={(event:any,newValue: string | null)=> setValue(newValue)}
                            freeSolo
                            /> */}
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={skillOptions}
                                    size="small"
                                    value={skill}
                                    renderInput={(params)=><TextField {...params} label="skills"  />}
                                    onChange={(event:any,newValue:Skill | null)=>setSkill(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={4}>
                                <Typography variant="h6" component="p">Amount</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <TextField fullWidth type="number" size="small" label="Amount"/>
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={4}>
                                <Typography>Project</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={skillOptions}
                                    size="small"
                                    value={skill}
                                    renderInput={(params)=><TextField {...params} label="Project"  />}
                                    onChange={(event:any,newValue:Skill | null)=>setSkill(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={4}>
                                <Typography>Category</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={skillOptions}
                                    size="small"
                                    value={skill}
                                    renderInput={(params)=><TextField {...params} label="Category"/>}
                                    onChange={(event:any,newValue:Skill | null)=>setSkill(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={4}>
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
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={4}>
                                <Typography>Notes</Typography>
                            </Grid>
                            <Grid item md={7}>
                                 <TextField fullWidth type="number" size="small" label="Notes"/>
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={4}>
                                <Typography>Attach</Typography>
                            </Grid>
                            <Grid item md={7}>
                                 <TextField fullWidth type="number" size="small" label="Attach"/>
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={4}>
                                <Typography>Reccuring</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={recOptions}
                                    size="small"
                                    value={rec}
                                    renderInput={(params)=><TextField {...params} label="Reccuring"/>}
                                    onChange={(event:any,newValue:Rec | null)=>setRec(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={4}>
                                <Typography>Reimbursement</Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Autocomplete
                                    fullWidth
                                    options={recOptions}
                                    size="small"
                                    value={rec}
                                    renderInput={(params)=><TextField {...params} label="Reimbursement"/>}
                                    onChange={(event:any,newValue:Rec | null)=>setRec(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} justifyContent="center">
                            <Button type="submit" variant="contained">Submit</Button>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Container>
        </Box>
     </>
    );
    return design;
}
export default PocketScreen;
import {useState} from "react";
import {Box,Container,Grid,Typography,Stack,Button,TextField,Autocomplete,FormControl,FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText} from "@mui/material";
import Header from "../../../components/Header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TextareaAutosize } from '@mui/base';
import {useNavigate} from "react-router-dom";

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
const categorys = ['apple','ball'];
const categoryOptions = categorys.map((cat,index)=>({
    id:index+1,
    label:cat
}))
const AddRateCard = () =>{
    const navigate = useNavigate();
    const [source,setSource] = useState<Source | null>(null);
        console.log(source)
    const [category,setCategory] = useState<Source | null>(null);
        console.log(category)

    const isSPRError = useState(false);
    const sprError = useState("");

    const serviceType = useState([
        { key: "Vendor", isSelected: false, id: 1 },
        { key: "Supplier", isSelected: false, id: 2 },
        { key: "Client", isSelected: false, id: 3 },
      ]);
    const design = (
        <>
            <Box sx={{ mt:11 }}>
            <Header />
            <Container maxWidth="lg" >
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={4} sm={8} md={12}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4">RATE CARD </Typography>
                            <Button variant="contained" startIcon={<VisibilityIcon sx={{marginRight:1}} />} onClick={()=>navigate("/master/ratecardsetup")}>View</Button>
                        </Stack>
                        
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                        <Typography variant="h6">RATE CARD (ADD)</Typography>
                    </Grid>
                    <Grid item md={9} >
                        <Grid container sx={{mt:2}} alignItems="center" >
                            <Grid item md={3}>
                                <Typography><span style={{color:"red"}}>*</span>Service Name</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <Autocomplete
                                        fullWidth
                                        options={sourceOptions}
                                        size="small"
                                        value={source}
                                        
                                        renderInput={(params)=><TextField {...params} label="Select" error={true} helperText="one"/>}
                                        onChange={(event:any,newValue:Source | null)=>setSource(newValue)}
                                    />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center" >
                            <Grid item md={3}>
                                <Typography><span style={{color:"red"}}>*</span>Category Name</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <Autocomplete
                                        fullWidth
                                        options={categoryOptions}
                                        size="small"
                                        value={category}
                                        renderInput={(params)=><TextField {...params} label="Select"/>}
                                        onChange={(event:any,newValue:Category | null)=>setCategory(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography>HSN / SAC Code</Typography>
                            </Grid>
                            <Grid item md={3}>
                                <TextField 
                                    fullWidth
                                    type="text"
                                    size="small"
                                    disabled
                                    sx={{backgroundColor:"#ddd",color:"black"}}
                                    placeholder="HSN / SAC Code"
                                />
                            </Grid>
                            <Grid item md={3} >
                                <Typography sx={{marginLeft:4,textAlign:"right",marginRight:3}}>GST Rate <br />(%)</Typography>
                            </Grid>
                            <Grid item md={2}>
                                <TextField 
                                    fullWidth
                                    type="text"
                                    size="small"
                                    disabled
                                    sx={{backgroundColor:"#ddd",color:"black"}}
                                    placeholder="GST Ral"
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center" >
                            <Grid item md={3}>
                                <Typography sx={{width:"80%",fontSize:"15px"}}><span style={{color:"red"}}>*</span>Service Product Name</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <Autocomplete
                                        fullWidth
                                        options={sourceOptions}
                                        size="small"
                                        value={source}
                                        renderInput={(params)=><TextField {...params} label="Select"/>}
                                        onChange={(event:any,newValue:Source | null)=>setSource(newValue)}
                                    />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center" >
                            <Grid item md={3}>
                                <Typography><span style={{color:"red"}}>*</span>Unit of Sales</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <Autocomplete
                                        fullWidth
                                        options={categoryOptions}
                                        size="small"
                                        value={category}
                                        renderInput={(params)=><TextField {...params} label="Select"/>}
                                        onChange={(event:any,newValue:Category | null)=>setCategory(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography sx={{width:"80%",fontSize:"14px"}}><span style={{color:'red'}}>*</span>WITH MATERIALS Rate / Unit</Typography>
                            </Grid>
                            <Grid item md={2}>
                                <TextField 
                                    fullWidth
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid item md={4} >
                                <Typography sx={{marginLeft:4,textAlign:"right",marginRight:3,fontSize:"14px"}}><span style={{color:"red"}}>*</span>Alternate <br />Rate / Unit</Typography>
                            </Grid>
                            <Grid item md={2}>
                                <TextField 
                                    fullWidth
                                    type="text"
                                    disabled
                                    size="small"
                                    sx={{backgroundColor:"#ddd"}}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                            <Grid item md={3}>
                                <Typography sx={{width:"80%",fontSize:"14px"}}><span style={{color:'red'}}>*</span>WITHOUT MATERIALS Rate / Unit</Typography>
                            </Grid>
                            <Grid item md={2}>
                                <TextField 
                                    fullWidth
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid item md={4} >
                                <Typography sx={{marginLeft:4,textAlign:"right",marginRight:3,fontSize:"12px"}}><span style={{color:"red"}}>*</span>Alternate <br />Rate / Unit</Typography>
                            </Grid>
                            <Grid item md={2}>
                                <TextField 
                                    fullWidth
                                    type="text"
                                    disabled
                                    size="small"
                                    sx={{backgroundColor:"#ddd"}}
                                />
                            </Grid>
                        </Grid>

                        <Grid container sx={{mt:2}} alignItems="center" >
                            <Grid item md={3}>
                                <Typography>Short Specification</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <TextareaAutosize
                                    aria-label="empty textarea"
                                    placeholder="Empty"
                                    minRows={4}
                                    style={{width:"100%"}}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center" >
                            <Grid item md={3}>
                                <Typography>Specification of Service Provider</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <TextareaAutosize
                                    aria-label="empty textarea"
                                    placeholder="Empty"
                                    minRows={4}
                                    style={{width:"100%"}}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{mt:2}} alignItems="center">
                        {/* <FormControl component="fieldset" error={isSPRError[0]}>
                            <FormLabel component="legend">Service Provider Role</FormLabel>
                            <FormGroup aria-label="position" row>
                                {serviceType[0].map((data, index) => {
                                return (
                                    <FormControlLabel
                                    value={data.id}
                                    control={
                                        <Checkbox
                                        checked={data.isSelected}
                                        tabIndex={-1}
                                        onClick={() => {
                                            isSPRError[1](false);
                                            sprError[1]("");
                                            const newChecked = [...serviceType[0]];
                                            newChecked.find((item, i) => {
                                            if (item.id === data.id) {
                                                item.isSelected = !item.isSelected;
                                            }
                                            });
                                            serviceType[1](newChecked);
                                        }}
                                        />
                                    }
                                    label={data.key}
                                    labelPlacement="end"
                                    />
                                );
                                })}
                             </FormGroup>
                            <FormHelperText>{sprError[0]}</FormHelperText>
                        </FormControl> */}
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked/>} label="Display"></FormControlLabel>
                        </FormGroup>
                        </Grid>
                        <Grid container sx={{mt:2,mb:10}} alignItems="center" direction="row" justifyContent="center">
                            <Button variant="contained">Submit</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            </Box>
        </>
    );
    return design;
}
export default AddRateCard;
import {Box,Container,Grid,Typography,Stack,Button} from "@mui/material";
import Header from "../../../components/Header";

import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
const RateCard = () =>{
    const navigate = useNavigate();
    const design = (
        <>
            <Box sx={{ mt:11 }}>
            <Header />
            <Container maxWidth="lg" >
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={4} sm={8} md={12}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4">RATE CARD SETUP</Typography>
                            <Button variant="contained" startIcon={<AddIcon sx={{marginRight:1}} />} onClick={()=>navigate("/master/addratecard")}>View</Button>
                        </Stack>
                        
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "6px", borderColor: "rgba(0,0,0,0.12)" }}>
                    <Typography variant="h6">VIEW RATE CARD LIST (CONTRACTOR)</Typography>
                    </Grid>
                </Grid>
            </Container>
            </Box>
        </>
    );
    return design;
}
export default RateCard;
import {Box,Container,Grid,Typography,Avatar,Stack,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Chip} from "@mui/material";
import Header from "../components/Header";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MdPhone from '@mui/icons-material/Phone';
const DashboardPocket = () =>{
    const data = [
        {
            id:1,
            name:"Expense",
            color:"#00A54F",
            icons:"home"
        },
        {
            id:2,
            name:"Source",
            color:"#00AEEF",
            icons:"accessibility_icon"
        },
        {
            id:3,
            name:"Payable",
            color:"#F58220",
            icons:"add_shopping_cart_icon"
        },
        {
            id:4,
            name:"Receivable",
            color:"#A54586",
            icons:"account_balance_icon"
        }
    ]
    const Pocket = ({items}) =>{
        const design = (
            <>
                <Grid item  sx={{width:"23%",height:"200px",border:"1px solid #ddd",background:"#FFFFFF",ml:3,borderRadius:2,flexDirection:"row",p:2, backgroundColor:"#fff",'&:hover': {boxShadow: 6,transition:"0.4s"} ,cursor:"pointer"}} >
                    <Grid container >
                        <Grid item sx={{width:"70%"}}>
                            <Typography variant="h6">{items.name}</Typography>
                            {/* <h1 style={{border:"1px solid red",padding:0}}><span className="material-icons" style={{fontSize:"24px",marginRight:"0"}}>currency_rupee_icon</span>one</h1> */}
                            
                            <Chip icon={<CurrencyRupeeIcon />} label="24K" sx={{backgroundColor:"#ffffff",fontSize:"24px",my:3,fontWeight:"bold"}}/>
                            <p>Click to Expand</p>
                        </Grid>
                        <Grid item sx={{width:"30%"}}>
                            <Box sx={{width:70,height:70,border:"1px solid #aaa",borderRadius:"50%",ml:"12px",backgroundColor:`${items.color}`,padding:"18px",overflow:"hidden"}}>
                                    <span className="material-icons" style={{color:"white",fontSize:"30px",width:"100%"}}>{items.icons}</span>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
        return design;
    }
    const design = (
      <Box sx={{ mt: 7 }}>
        <Header />
        <Container sx={{ padding: { xs: 2, md: 4 } }} maxWidth="xl">
            <Grid container xs={4} sm={8} md={12} sx={{ mt: 2, p: 1, border: 1, borderRadius: "4px", borderColor: "rgba(0, 0, 0, 0.12)", backgroundColor: "rgba(0, 102, 193, 0.04)" }}>
              <Grid item xs={4} sm={8} md={12} sx={{ mt: 1, ml: 3 }}>
                <Typography variant="h5">Pocket Dairy</Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }} style={{ display: "flex", justifyContent: "center" }}>
                {/* <TitlebarBelowImageList
                  itemData={catalogueCategoryImages}
                  callback={(index: number) => {
                    console.log(index);
                  }}
                /> */}
                {/* //<ShowsGrid shows={catalogueCategoryImages} buttonSettings={buttonSetting} cardCallback={(CookieRoleID === 2 || CookieRoleID === 3 )? handleCardClick : () => {}} type="category" /> */}

                
              </Grid>
              {
                data.map((item)=>{
                  return <Pocket items={item}/>
                })
              }
            </Grid>
        </Container>
        
      </Box>
    );
    return design;
}
export default DashboardPocket;
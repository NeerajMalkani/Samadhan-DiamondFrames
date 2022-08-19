import { AlertColor, Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";

const ProductEstimationDetailsPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    }
  }, []);

  interface ProductItemModel {
    productID: number;
    productName: string;
    brandID: number;
    brandName: string;
    quantity: string;
    rate: string;
    amount: string;
    formula: string;
  }

  const [loading, setLoading] = useState(true);
  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [isShowDeatils, setIsShowDeatils] = useState<Boolean>(false);
  const [isShowProductDeatils, setIsShowProductDeatils] = useState<Boolean>(false);
  const [productItem, setProductItem] = useState<Array<ProductItemModel>>([]);

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography sx={{ ml: 1 }} variant="h4">
              Service Catalogue and Image Gallery
            </Typography>
          </Grid>

          <Grid item xs={4} sm={8} md={12}>
            <Grid item xs={2} sm={4} md={3}>
              <Paper className="flex-column flex-center padding-16">
                <Typography variant="h4" sx={{ mt: 2 }}>
                  fsdf
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={2} sm={4} md={3}>
              <Paper className="flex-column flex-center padding-16">
                <Typography variant="h4" sx={{ mt: 2 }}>
                  fsdf
                </Typography>
                <Button variant="text">View details</Button>
              </Paper>
              {isShowProductDeatils ? <Typography sx={{fontSize:48}}>=</Typography> : <></>}
            </Grid>

            {isShowDeatils ? (
              <>
                <Grid item xs={2} sm={4} md={3}>
                  <Paper className="flex-column flex-center padding-16">
                    <Typography variant="h4" sx={{ mt: 2 }}>
                      fsdf
                    </Typography>
                    <Button variant="text">View details</Button>
                  </Paper>
                  <Typography sx={{fontSize:48}}>+</Typography>
                </Grid>
                <Grid item xs={2} sm={4} md={3}>
                  <Paper className="flex-column flex-center padding-16">
                    <Typography variant="h4" sx={{ mt: 2 }}>
                      fsdf
                    </Typography>
                  </Paper>
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
          {isShowProductDeatils ? (
            <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell sx={{ width: "96px" }}>Quantity</TableCell>
                      <TableCell sx={{ width: "96px" }}>Rate</TableCell>
                      <TableCell sx={{ width: "96px" }}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productItem.map((row: ProductItemModel, index: number) => (
                      <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {row.productName}
                        </TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell align="right">{row.rate}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell colSpan={3}>Sub Total</TableCell>
                      <TableCell align="right">5656565</TableCell>
                    </TableRow>
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell align="right">5656565</TableCell>
                    </TableRow>
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell colSpan={3}>Transportation Charges</TableCell>
                      <TableCell align="right">5656565</TableCell>
                    </TableRow>
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell colSpan={4}>
                        <Button variant="contained">Pay</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductEstimationDetailsPage;

import { Alert, AlertColor, Box, Button, CircularProgress, Container, Grid, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { LoadingButton } from "@mui/lab";
import EmailIcon from "@mui/icons-material/Email";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import Provider from "../../../api/Provider";
import { communication } from "../../../utils/communication";
import { retrunValueFromLocation } from "../../../utils/AWSFileUpload";
import { EstimationCostDetails, ProductItemModel } from "../../../models/Model";

const ProductEstimationDetailsPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    }
  }, []);

  const [loading, setLoading] = useState(true);
  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [isShowDeatils, setIsShowDeatils] = useState<Boolean>(false);
  const [opac, setOpac] = useState<boolean>(false);
  const [productItem, setProductItem] = useState<Array<ProductItemModel>>([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [totalSqFt, setTotalSqFt] = useState<number>(0);
  const [estimationData, setEstimationData] = useState<Array<EstimationCostDetails>>([]);
  const [materialCost, setMaterialCost] = useState(0);
  const [labourCost, setLabourCost] = useState<number>(0);
  const [selectedID, setSelectedID] = useState<number>(0);

  useEffect(() => {
    setSelectedID(parseInt(retrunValueFromLocation(location, "userDesignEstimationID")));
    FetchEstimationData(parseInt(retrunValueFromLocation(location, "userDesignEstimationID")));
  }, []);

  const FetchEstimationData = (id: number) => {
    let params = {
      UserDesignEstimationID: id,
    };
    Provider.getAll(`generaluserenquiryestimations/getdesignestimateenquiries?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            FetchEstimationMaterialSetupData(response.data.data[0].id);
            setEstimationData(response.data.data);
            console.log(JSON.stringify(response.data.data));
            let length = response.data.data[0].length.toString().split(".");
            let width = response.data.data[0].width.toString().split(".");
            CalculateSqfeet(parseInt(length[0]), parseInt(length[1] === undefined ? "0" : length[1]), parseInt(width[0]), parseInt(width[1] === undefined ? "0" : width[1]));
            setLabourCost(
              CalculateSqfeetInternal(parseInt(length[0]), parseInt(length[1] === undefined ? "0" : length[1]), parseInt(width[0]), parseInt(width[1] === undefined ? "0" : width[1])) *
                response.data.data[0].labourCost
            );
          }
        } else {
          setSnackMsg(communication.NoData);
          setSnackbarType("error");
          setOpen(true);
          setLoading(false);
        }
      })
      .catch((e) => {
        setSnackMsg(communication.NoData);
        setSnackbarType("error");
        setOpen(true);
        setLoading(false);
      });
  };

  const FetchEstimationMaterialSetupData = (materialSetupID) => {
    let params = {
      MaterialSetupID: materialSetupID,
    };
    Provider.getAll(`generaluserenquiryestimations/getdesignestimateenquiriesformaterialsetup?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setProductItem(response.data.data);
          }
        } else {
          setSnackMsg(communication.NoData);
          setSnackbarType("error");
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
        setLoading(false);
      });
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const CalculateSqfeet = (lf: number, li: number, whf: number, whi: number) => {
    if (lf > 0 && li > -1 && whf > 0 && whi > -1) {
      let lengthInches = ((lf * 12 + li) * (whf * 12 + whi)) / 144;
      setTotalSqFt(parseFloat(lengthInches.toFixed(4)));
    } else {
      setTotalSqFt(0);
    }
  };

  const CalculateSqfeetInternal = (lf: number, li: number, whf: number, whi: number) => {
    if (lf > 0 && li > -1 && whf > 0 && whi > -1) {
      let lengthInches = ((lf * 12 + li) * (whf * 12 + whi)) / 144;
      return lengthInches;
    } else {
      return 0;
    }
  };

  const CreateProductDetails = () => {
    let subtotalCal = 0,
      transportCharges = 0;

    return (
      <TableBody>
        {productItem.map((row: ProductItemModel, index: number) => {
          let length = row.length.toString().split(".");
          let width = row.width.toString().split(".");
          const destinationSqFt = CalculateSqfeetInternal(
            parseInt(length[0]),
            parseInt(length[1] === undefined ? "0" : length[1]),
            parseInt(width[0]),
            parseInt(width[1] === undefined ? "0" : width[1])
          );

          const newRate = (totalSqFt * row.rate) / destinationSqFt;
          const newQuant = (totalSqFt * row.quantity) / destinationSqFt;
          let newAmount = (totalSqFt * row.amount) / destinationSqFt;
          newAmount = newAmount - newAmount * (row.generalDiscount / 100);
          subtotalCal += newAmount;
          if (index === productItem.length - 1) {
            transportCharges = subtotalCal * (5 / 100);
            setMaterialCost(subtotalCal);
          }
          return (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.productName + " » " + row.brandName}
              </TableCell>
              <TableCell align="right">{newQuant.toFixed(4)}</TableCell>
              <TableCell align="right">{newRate.toFixed(4)}</TableCell>
              <TableCell align="right">{newAmount.toFixed(4)}</TableCell>
            </TableRow>
          );
        })}
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell colSpan={3} sx={{ textAlign: "right" }}>
            Sub Total
          </TableCell>
          <TableCell align="right">{subtotalCal.toFixed(4)}</TableCell>
        </TableRow>

        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell colSpan={3} sx={{ textAlign: "right" }}>
            Transportation Charges
          </TableCell>
          <TableCell align="right">{transportCharges.toFixed(4)}</TableCell>
        </TableRow>
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell colSpan={3} sx={{ textAlign: "right" }}>
            Total
          </TableCell>
          <TableCell align="right">{(transportCharges + subtotalCal).toFixed(4)}</TableCell>
        </TableRow>
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell colSpan={4} sx={{ textAlign: "right" }}>
            <Button variant="contained">Pay</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };

  const InsertDesignEstimationEnquiry = () => {
    setButtonLoading(true);
    const params = {
      ID: selectedID,
      Status: true,
      TotalAmount: materialCost + materialCost * (5 / 100),
    };

    Provider.create("generaluserenquiryestimations/insertdesignestimateenquiries", params)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          navigate(`/generaluser/userestimation`);
        } else {
          setSnackMsg(communication.Error);
          setSnackbarType("error");
          setOpen(true);
          setButtonLoading(false);
        }
      })
      .catch((e) => {
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
        setButtonLoading(false);
      });
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography sx={{ ml: 1 }} variant="h4">
              Estimation Details
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={2} sm={4} md={3} sx={{ mt: 2 }}>
                    <Paper className="flex-column flex-center padding-16">
                      <Typography variant="h6" sx={{ mt: 1, color: "rgba(0,0,0,0.54)" }}>
                        Total Sq.Ft
                      </Typography>
                      <Typography variant="h5" sx={{ mt: 2 }}>
                        {totalSqFt.toFixed(4)}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={2} sm={4} md={3} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Paper className="flex-column flex-center padding-16">
                      <Typography variant="h6" sx={{ mt: 1, color: "rgba(0,0,0,0.54)" }}>
                        Total Amount
                      </Typography>
                      <Typography variant="h5" sx={{ mt: 2 }}>
                        {(materialCost + materialCost * (5 / 100) + labourCost).toFixed(4)}
                      </Typography>
                      <Button
                        startIcon={<VisibilityIcon />}
                        variant="text"
                        onClick={() => {
                          setIsShowDeatils(true);
                        }}
                      >
                        View details
                      </Button>
                    </Paper>
                    {isShowDeatils ? <Typography sx={{ fontSize: 48, ml: "48px" }}>=</Typography> : <></>}
                  </Grid>

                  {isShowDeatils ? (
                    <>
                      <Grid item xs={2} sm={4} md={3} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                        <Paper className="flex-column flex-center padding-16">
                          <Typography variant="h6" sx={{ mt: 1, color: "rgba(0,0,0,0.54)" }}>
                            Material Cost
                          </Typography>
                          <Typography variant="h5" sx={{ mt: 2 }}>
                            {(materialCost + materialCost * (5 / 100)).toFixed(4)}
                          </Typography>
                          <Button
                            variant="text"
                            startIcon={<VisibilityIcon />}
                            onClick={() => {
                              setOpac(true);
                            }}
                          >
                            View Materials
                          </Button>
                        </Paper>
                        <Typography sx={{ fontSize: 48, ml: "48px" }}>+</Typography>
                      </Grid>
                      <Grid item xs={2} sm={4} md={3} sx={{ mt: 2 }}>
                        <Paper className="flex-column flex-center padding-16">
                          <Typography variant="h6" sx={{ mt: 1, color: "rgba(0,0,0,0.54)" }}>
                            Labour Cost
                          </Typography>
                          <Typography variant="h5" sx={{ mt: 2 }}>
                            {labourCost.toFixed(4)}
                          </Typography>
                        </Paper>
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}

                  {!estimationData[0].status ? (
                    <Grid item xs={4} sm={8} md={12} sx={{ textAlign: "center", mt: 2 }}>
                      <LoadingButton startIcon={<EmailIcon />} loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={InsertDesignEstimationEnquiry}>
                        Send Enquiry
                      </LoadingButton>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>

                <Grid item xs={4} sm={8} md={12} sx={{ mt: 2, opacity: opac ? 1 : 0 }}>
                  <TableContainer component={Paper} sx={{ width: "100%" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product Name</TableCell>
                          <TableCell sx={{ width: "140px" }}>Quantity</TableCell>
                          <TableCell sx={{ width: "140px" }}>Rate</TableCell>
                          <TableCell sx={{ width: "140px" }}>Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <CreateProductDetails />
                    </Table>
                  </TableContainer>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductEstimationDetailsPage;

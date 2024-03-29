import {
  Alert,
  AlertColor,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { LoadingButton } from "@mui/lab";
import EmailIcon from "@mui/icons-material/Email";
import { GetStringifyJson, CalculateSqfeet } from "../../../utils/CommonFunctions";
import Provider from "../../../api/Provider";
import { communication } from "../../../utils/communication";
import { retrunValueFromLocation, uniqueByKey } from "../../../utils/JSCommonFunction";
import { EstimationCostDetails, ProductItemModel } from "../../../models/Model";

const ProductEstimationDetailsPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();
  const [type, setType] = useState("");
  const location = useLocation();

  interface BrandItemModel {
    brandID: number;
    brandName: string;
    categoryName: string;
  }

  interface BrandProductItemModel {
    brandID: number;
    brandName: string;
    productID: number;
    price: number;
    unitValue: number;
    categoryName: string;
  }

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    }
  }, []);

   //#region Variables
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

  const [brandProductList, setBrandProductList] = useState<Array<BrandProductItemModel>>([]);
  const [brandList, setBrandList] = useState<Array<BrandItemModel>>([]);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
 //#endregion 

 //#region Functions

  useEffect(() => {
    setSelectedID(parseInt(retrunValueFromLocation(location, "userDesignEstimationID")));
    setType(retrunValueFromLocation(location, "type"));
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
            let TotalArea = CalculateSqfeet(parseInt(length[0]), parseInt(length[1] === undefined ? "0" : length[1]), parseInt(width[0]), parseInt(width[1] === undefined ? "0" : width[1]));
            setTotalSqFt(TotalArea);
            setLabourCost(TotalArea * response.data.data[0].labourCost);
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
            if (retrunValueFromLocation(location, "type") === "designWiseContractor") {
              FetchProductBrandFromProductID(response.data.data);
            }
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

  const CreateProductDetails = () => {
    let subtotalCal = 0,
      transportCharges = 0;

    return (
      <TableBody>
        {productItem.map((row: ProductItemModel, index: number) => {
          let length = row.length.toString().split(".");
          let width = row.width.toString().split(".");
          // const destinationSqFt = CalculateSqfeet(parseInt(length[0]), parseInt(length[1] === undefined ? "0" : length[1]), parseInt(width[0]), parseInt(width[1] === undefined ? "0" : width[1]));

          const newQuant = totalSqFt / parseFloat(row.formula);
          let newAmount = newQuant * parseFloat(row.rate);
          let discountedAmount = newAmount - newAmount * (row.generalDiscount / 100);

          // const newRate = (totalSqFt * parseFloat(row.rate)) / destinationSqFt;

          // newAmount = newAmount - newAmount * (row.generalDiscount / 100);
          subtotalCal += discountedAmount;
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
              <TableCell align="right">{parseFloat(row.rate).toFixed(4)}</TableCell>
              <TableCell align="right">{newAmount.toFixed(4)}</TableCell>
              <TableCell align="right">{discountedAmount.toFixed(4)}</TableCell>
            </TableRow>
          );
        })}
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell colSpan={4} sx={{ textAlign: "right" }}>
            <b>Sub Total</b>
          </TableCell>
          <TableCell align="right">{subtotalCal.toFixed(4)}</TableCell>
        </TableRow>

        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell colSpan={4} sx={{ textAlign: "right" }}>
            <b> Transportation Charges</b>
          </TableCell>
          <TableCell align="right">{transportCharges.toFixed(4)}</TableCell>
        </TableRow>
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell colSpan={4} sx={{ textAlign: "right" }}>
            <b>Total</b>
          </TableCell>
          <TableCell align="right">{(transportCharges + subtotalCal).toFixed(4)}</TableCell>
        </TableRow>
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell colSpan={2} sx={{ textAlign: "right" }}>
            To buy material
          </TableCell>
          <TableCell colSpan={3} sx={{ textAlign: "right" }}>
            <Button variant="contained">Add to Cart</Button>
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
          if (type === "contractor" || type === "designWiseContractor") {
            navigate(`/contractor/quotationandestimation/designwise`, { state: { redirecttab: "pending" } });
          } else {
            navigate(`/generaluser/userestimation`);
          }
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

  const handleBrandChange = (event: SelectChangeEvent) => {
    let brandData: number = parseInt(event.target.value);
    if (brandData > 0) {
      setSelectedBrand(brandData);
      let ProductData1 = brandProductList.filter((el: BrandProductItemModel) => el.brandID === brandData);
      let ProductData: Array<ProductItemModel> = [...productItem];
      ProductData.map((value: ProductItemModel, index: number) => {
        ProductData1.find(function (item: BrandProductItemModel, i: number) {
          if (item.productID === value.productID) {
            value.brandName = item.brandName;
            value.brandID = item.brandID;
            value.rate = item.price.toFixed(4);
            if (parseFloat(value.formula) !== 0) {
              value.quantity = (parseFloat(totalSqFt.toString()) / parseFloat(value.formula)).toFixed(4);
              value.amount = (parseFloat(value.quantity) * parseFloat(value.rate === "0" ? "1" : value.rate)).toFixed(4);
            }
            return i;
          }
        });
      });
    }
  };

  const FetchProductBrandFromProductID = (data: any) => {
    let productids = null;
    if (data === "") productids = productItem.map((data1) => data1.productID);
    else productids = data.map((data1) => data1.productID);

    let params = {
      ProductID: productids.join(","),
    };

    Provider.getAll(`servicecatalogue/getbrandsbyproductids?${new URLSearchParams(params)}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setBrandProductList(response.data.data);
            let BrandData: Array<BrandItemModel> = uniqueByKey(response.data.data, "brandID");
            setBrandList(BrandData);
          }
        }
      })
      .catch((e) => {});
  };
 //#endregion 

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
                          {type !== "contractor" && type !== "designWiseContractor" ? (
                            <Button
                              variant="text"
                              startIcon={<VisibilityIcon />}
                              onClick={() => {
                                setOpac(true);
                              }}
                            >
                              View Materials
                            </Button>
                          ) : (
                            <></>
                          )}
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

                  {type === "designWiseContractor" ? (
                    <Grid item xs={4} sm={4} md={12} sx={{ mt: 1 }}>
                      <FormControl style={{ width: 240 }} size="small" error={false}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Brand Name</b>
                          <label style={{ color: "#ff0000" }}>*</label>
                        </Typography>
                        <Select value={selectedBrand.toString()} onChange={handleBrandChange}>
                          <MenuItem disabled={true} value="0">
                            --Select--
                          </MenuItem>
                          {brandList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.brandID}>
                                {item.brandName + " (" + item.categoryName + ")"}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <FormHelperText>{""}</FormHelperText>
                      </FormControl>
                    </Grid>
                  ) : (
                    <></>
                  )}

                  {!estimationData[0].status || type === "designWiseContractor" ? (
                    <Grid item xs={4} sm={8} md={12} sx={{ textAlign: "center", mt: 2 }}>
                      <LoadingButton startIcon={<EmailIcon />} loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={InsertDesignEstimationEnquiry}>
                        {type === "contractor" ? "Send Quote to Client" : type === "designWiseContractor" ? "Update Quote & Send to Client" : "Send Enquiry"}
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
                          <TableCell sx={{ width: "140px" }}>Discounted Amount</TableCell>
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

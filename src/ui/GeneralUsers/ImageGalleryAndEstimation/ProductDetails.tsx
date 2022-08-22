import { Alert, AlertColor, Box, Button, CircularProgress, Container, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/Header";
import { ArrowBack } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Provider from "../../../api/Provider";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { communication } from "../../../utils/communication";
import { retrunValueFromLocation } from "../../../utils/JSCommonFunction";
import { theme } from "../../../theme/AppTheme";
import { ProductItemModel } from "../../../models/Model";

const ImageGalleryProductDetailsPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  const [selectedData, setSelectedData] = useState<any>();
  const location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
      setSelectedData(retrunValueFromLocation(location, "", true));
      setLoading(false);
      CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(widthHeightInches));
    }
  }, []);

  const [loading, setLoading] = useState(true);
  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [lengthFeet, setLengthFeet] = useState("1");
  const [lengthInches, setLengthInches] = useState("0");
  const [widthHeightFeet, setWidthHeightFeet] = useState("1");
  const [widthHeightInches, setWidthHeightInches] = useState("0");
  const [totalSqFt, setTotalSqFt] = useState<number>(0);
  const [buttonLoading, setButtonLoading] = useState(false);

  const CreateLengthFeet = (count: number) => {
    let menuItems = [];
    for (let i = 0; i < count; i++) {
      menuItems.push(
        <MenuItem key={i} value={i + 1}>
          {i + 1}
        </MenuItem>
      );
    }
    return menuItems;
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
  const handleLFChange = (event: SelectChangeEvent, type: string) => {
    let lf: string = event.target.value;
    if (parseInt(lf) > 0) {
      if (type === "lengthFeet") {
        setLengthFeet(event.target.value as string);
        CalculateSqfeet(parseInt(lf), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(widthHeightInches));
      } else if (type === "lengthInches") {
        setLengthInches(event.target.value as string);
        CalculateSqfeet(parseInt(lengthFeet), parseInt(lf), parseInt(widthHeightFeet), parseInt(widthHeightInches));
      } else if (type === "widthFeet") {
        setWidthHeightFeet(event.target.value as string);
        CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(lf), parseInt(widthHeightInches));
      } else if (type === "widthInches") {
        setWidthHeightInches(event.target.value as string);
        CalculateSqfeet(parseInt(lengthFeet), parseInt(lengthInches), parseInt(widthHeightFeet), parseInt(lf));
      }
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const FetchEstimationMaterialSetupData = (materialSetupID, from, userDesignEstimationID) => {
    let params = {
      MaterialSetupID: materialSetupID,
    };
    Provider.getAll(`generaluserenquiryestimations/getdesignestimateenquiriesformaterialsetup?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const targetSqFt = totalSqFt;
            let subtotalCal = 0;
            response.data.data.map((k: ProductItemModel, i) => {
              let length = k.length.toString().split(".");
              let width = k.width.toString().split(".");
              const destinationSqFt = CalculateSqfeetInternal(
                parseInt(length[0]),
                parseInt(length[1] === undefined ? "0" : length[1]),
                parseInt(width[0]),
                parseInt(width[1] === undefined ? "0" : width[1])
              );
              let newAmount = (targetSqFt * k.amount) / destinationSqFt;
              newAmount = newAmount - newAmount * (k.generalDiscount / 100);
              subtotalCal += newAmount;
            });
            InsertDesignEstimationEnquiry(from, 2, subtotalCal, userDesignEstimationID);
          }
        }
      })
      .catch((e) => {});
  };

  const FetchEstimationData = (userDesignEstimationID, from) => {
    let params = {
      UserDesignEstimationID: userDesignEstimationID,
    };
    Provider.getAll(`generaluserenquiryestimations/getdesignestimateenquiries?${new URLSearchParams(params)}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            FetchEstimationMaterialSetupData(response.data.data[0].id, from, userDesignEstimationID);
          }
        }
      })
      .catch((e) => {});
  };

  const InsertDesignEstimationEnquiry = (from: string, fromCount: number, subtotal: number, userDesignEstimationID: number) => {
    const params = {
      UserID: CookieUserID,
      DesignTypeID: selectedData.designTypeID,
      Length: parseFloat(lengthFeet + "." + lengthInches),
      Width: parseFloat(widthHeightFeet + "." + widthHeightInches),
      Status: false,
      TotalAmount: subtotal + subtotal * (5 / 100),
    };

    if (fromCount === 2) {
      params["ID"] = userDesignEstimationID;
    }
    debugger;
    Provider.create("generaluserenquiryestimations/insertdesignestimateenquiries", params)
      .then((response) => {
        if (response.data && response.data.code === 200) {
          if (fromCount === 2) {
            if (from === "add") {
              navigate(`/generaluser/imagegallery/category`);
            } else {
              navigate(`/generaluser/imagegallery/productestimationdetails`, { state: { userDesignEstimationID: response.data.data[0].userDesignEstimationID } });
              //   navigation.navigate("GetEstimationScreen", { userDesignEstimationID: response.data.data[0].userDesignEstimationID });
            }
          } else {
            FetchEstimationData(response.data.data[0].userDesignEstimationID, from);
          }
        } else {
          setSnackMsg(communication.Error);
          setSnackbarType("error");
          setOpen(true);
        }
      })
      .catch((e) => {
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <IconButton
              aria-label="back"
              size="large"
              sx={{ marginTop: "-8px" }}
              onClick={() => {
                navigate(`/generaluser/imagegallery/product`, { state: { id: selectedData.serviceID, name: selectedData.serviceName } });
              }}
            >
              <ArrowBack fontSize="small" />
            </IconButton>
            <Typography sx={{ ml: 1, display: "inline" }} variant="h4">
              Design Estimation
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ padding: "8px", border: "1px solid rgba(0,0,0,0.54)" }}>
                  <Grid item xs={4} sm={4} md={5} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ maxWidth: 360, maxHeight: 360, overflow: "hidden", padding: "4px", border: "1px solid rgba(0,0,0,0.12)" }}>
                      <img
                        src={selectedData.designImage}
                        alt={selectedData.designTypeName}
                        style={{ display: "block", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={4} sm={4} md={6}>
                    <Grid item xs={4} sm={4} md={6} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2">
                        <b>{selectedData.designNumber}</b>
                      </Typography>
                      <Typography variant="subtitle2">Design Code</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2">
                        <b>{selectedData.designTypeName}</b>
                      </Typography>
                      <Typography variant="subtitle2">Design Type</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2">
                        <b>{selectedData.categoryName}</b>
                      </Typography>
                      <Typography variant="subtitle2">Category Name</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2">
                        <b>{selectedData.productName}</b>
                      </Typography>
                      <Typography variant="subtitle2">Product Name</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={8} md={12} sx={{ mt: 3 }}>
                  <Typography sx={{ ml: 1, borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }} variant="h6">
                    AREA SQ.FT Calculation & Get Estimation
                  </Typography>
                  <Grid container columns={{ xs: 4, sm: 8, md: 12 }} sx={{ mt: 1 }}>
                    <Grid container xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, width: "100%" }}>
                        <b>Length</b>
                        <label style={{ color: "#ff0000" }}>*</label>
                      </Typography>
                      <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Feet</b>
                        </Typography>
                        <Select
                          value={lengthFeet}
                          onChange={(e) => {
                            handleLFChange(e, "lengthFeet");
                          }}
                        >
                          {CreateLengthFeet(50)}
                        </Select>
                      </Grid>
                      <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Inches</b>
                        </Typography>
                        <Select
                          value={lengthInches}
                          onChange={(e) => {
                            handleLFChange(e, "lengthInches");
                          }}
                        >
                          <MenuItem value="0">0</MenuItem>
                          {CreateLengthFeet(11)}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container xs={4} sm={4} md={3} sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, width: "100%" }}>
                        <b>Width / Height</b>
                        <label style={{ color: "#ff0000" }}>*</label>
                      </Typography>
                      <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Feet</b>
                        </Typography>
                        <Select
                          value={widthHeightFeet}
                          onChange={(e) => {
                            handleLFChange(e, "widthFeet");
                          }}
                        >
                          {CreateLengthFeet(50)}
                        </Select>
                      </Grid>
                      <Grid item sx={{ mt: 1, pl: "4px", pr: "4px" }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          <b>Inches</b>
                        </Typography>
                        <Select
                          value={widthHeightInches}
                          onChange={(e) => {
                            handleLFChange(e, "widthInches");
                          }}
                        >
                          <MenuItem value="0">0</MenuItem>
                          {CreateLengthFeet(11)}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} sm={4} md={3} sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                      <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <b style={{ padding: 8 }}>Total (Sq.Ft)</b>
                        <label style={{ color: "#ff0000", marginLeft: "16px", border: "2px solid rgba(0,0,0,0.12)", padding: 8, borderRadius: "4px" }}>{totalSqFt}</label>
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={3} sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: theme.palette.error.main }}
                          onClick={() => {
                            InsertDesignEstimationEnquiry("add", 1, 0, 0);
                            // navigate(`/generaluser/imagegallery/category`);
                          }}
                        >
                          Add more Rooms & Design
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
                    <LoadingButton
                      loading={buttonLoading}
                      variant="contained"
                      sx={{ mt: 1 }}
                      onClick={() => {
                        //navigate(`/generaluser/imagegallery/productestimationdetails`);
                        InsertDesignEstimationEnquiry("", 1, 0, 0);
                      }}
                    >
                      Submit
                    </LoadingButton>
                  </Grid>
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

export default ImageGalleryProductDetailsPage;

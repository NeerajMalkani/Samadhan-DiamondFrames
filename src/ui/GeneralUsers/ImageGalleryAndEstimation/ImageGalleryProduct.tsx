import { Alert, AlertColor, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Link, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/Header";
import { ButtonSettings, ImageGalleryEstimation } from "../../../models/Model";
import PrismaZoom from "react-prismazoom";
import { ArrowBack } from "@mui/icons-material";
import ShowsGrid from "../../../components/GridStructure";
import NoData from "../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import Provider from "../../../api/Provider";
import { communication } from "../../../utils/communication";
import { GetStringifyJson } from "../../../utils/CommonFunctions";
import { retrunValueFromLocation } from "../../../utils/JSCommonFunction";
//import { APIConverter } from "../../../utils/apiconverter";

const ImageGalleryProductPage = (route) => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [serviceName, setServiceName] = useState("");
  const [type, setType] = useState("");

  const location = useLocation();

  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      setServiceName(retrunValueFromLocation(location, "name"));
      setType(retrunValueFromLocation(location, "type"));
      FetchImageGalleryData(parseInt(retrunValueFromLocation(location, "id")));
    }
  }, []);
  //#region Variables
  const [loading, setLoading] = useState(true);
  const [imageGalleryData, setImageGalleryData] = useState<Array<ImageGalleryEstimation>>([]);
  const [selectedData, setSelectedData] = useState<ImageGalleryEstimation>();

  //Snackbar
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [selectedImage, setSelectedImage] = useState("");
  const [imageOpen, setImageOpen] = useState(false);
  //#endregion 

  //#region Functions
  const buttonSetting: ButtonSettings = {
    isActionButton: false,
    actionButtons: [
      {
        title: "Zoom",
        type: "text",
        callBack: (data: ImageGalleryEstimation) => {
          setSelectedImage(data.designImage);
          setImageOpen(true);
        },
      },
      {
        title: "Go to Estimation",
        type: "text",
        callBack: (data: ImageGalleryEstimation) => {
          debugger;
          data["type"] = type;
          navigate(`/generaluser/imagegallery/productdetails`, { state: data });
        },
      },
    ],
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleImageClose = () => {
    setImageOpen(false);
  };

  const handleCardClick = (data: ImageGalleryEstimation) => {
    debugger;
    setSelectedData(data);
    setSelectedImage(data.designImage);
    setImageOpen(true);
  };

  const APIConverter = (response: any) => {
    function renameKey(obj: any, oldKey: string, newKey: string) {
      if (obj.hasOwnProperty(oldKey)) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
      }
    }
  
    response.forEach((obj: any) => {
      renameKey(obj, "product_refno", "productID");
      renameKey(obj, "product_name", "productName");
      renameKey(obj, "product_refno", "id");
      renameKey(obj, "category_refno", "id");
      renameKey(obj, "category_name", "categoryName");
      renameKey(obj, "group_refno_name", "activityRoleName");
      renameKey(obj, "group_refno", "id");
      renameKey(obj, "group_name", "activityRoleName");
      renameKey(obj, "service_refno_name", "serviceName");
      renameKey(obj, "service_refno", "id");
      renameKey(obj, "service_name", "serviceName");
      renameKey(obj, "unit_category_names", "unitName");
      renameKey(obj, "unit_category_name", "unitName");
      renameKey(obj, "unit_category_refno", "id");
      renameKey(obj, "unit_name_text", "displayUnit");
      renameKey(obj, "hsn_sac_code", "hsnsacCode");
      renameKey(obj, "gst_rate", "gstRate");
      renameKey(obj, "view_status", "display");
      renameKey(obj, "product_code", "productCode");
      renameKey(obj, "unit_display_name", "displayUnit");
      renameKey(obj, "unit_name", "displayUnit");
      renameKey(obj, "unitcategoryrefno_unitrefno", "id");
      renameKey(obj, "with_material_rate", "rateWithMaterials");
      renameKey(obj, "without_material_rate", "rateWithoutMaterials");
      renameKey(obj, "short_desc", "shortSpecification");
      renameKey(obj, "actual_unitname", "selectedUnit");
      renameKey(obj, "convert_unitname", "convertedUnit");
      renameKey(obj, "service_product_refno", "productID");
      renameKey(obj, "locationtype_refno", "id");
      renameKey(obj, "service_refno_name", "serviceName");
      renameKey(obj, "locationtype_name", "branchType");
      renameKey(obj, "workfloor_refno", "id");
      renameKey(obj, "workfloor_name", "workFloorName");
      renameKey(obj, "worklocation_refno", "id");
      renameKey(obj, "worklocation_name", "workLocationName");
      renameKey(obj, "designtype_refno", "designTypeID");
      renameKey(obj, "designtype_name", "designTypeName");
      renameKey(obj, "designtype_image_url", "designImage");
      renameKey(obj, "materials_setup_refno", "id");
      renameKey(obj, "service_product_name", "productName");
      renameKey(obj, "matrails_cost", "materialCost");
      renameKey(obj, "dealer_product_refno", "productID");
      renameKey(obj, "brand_refno", "brandID");
      renameKey(obj, "brand_name", "brandName");
      renameKey(obj, "company_product_refno", "productID");
      renameKey(obj, "company_product_price", "price");
      renameKey(obj, "company_brand_refno", "brandID");
      renameKey(obj, "company_brand_name", "brandName");
      renameKey(obj, "design_image_url", "designImage");
      
    });
  
    return response;
  };

  const FetchImageGalleryData = (id: number) => {
    debugger;
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        Sess_group_refno: cookies.dfc.Sess_group_refno,
        service_refno: id
      },
    };
    Provider.createDFCommon(Provider.API_URLS.GetserviceimagegalleryByServicerefno, params)
      //Provider.getAll(`generaluserenquiryestimations/getimagegallerybycategoryid?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            response.data.data = APIConverter(response.data.data);
            setImageGalleryData(response.data.data);
          }
        } else {
          setImageGalleryData([]);
          setSnackMsg(communication.NoData);
          setSnackbarType("info");
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
  };
  //#endregion 

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
                navigate(`/generaluser/imagegallery/category`);
              }}
            >
              <ArrowBack fontSize="small" />
            </IconButton>
            <Typography sx={{ ml: 1, display: "inline" }} variant="h4">
              {"Image Gallery » " + serviceName}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div>
                {imageGalleryData.length === 0 ? (
                  <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                ) : (
                  <ShowsGrid shows={imageGalleryData} buttonSettings={buttonSetting} cardCallback={handleCardClick} type="subcategory" />
                )}
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>

      <Dialog open={imageOpen} onClose={handleImageClose} fullScreen={true}>
        <DialogTitle>Catalogue Images</DialogTitle>
        <DialogContent>
          <PrismaZoom allowPan={false} style={{ height: 640, display: "flex", justifyContent: "center" }}>
            <img alt="" style={{ height: 640 }} src={selectedImage} />
          </PrismaZoom>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageClose}>Cancel</Button>
          <Button
            onClick={() => {
              debugger;
              console.log(JSON.stringify(selectedData));
              navigate(`/generaluser/imagegallery/productdetails`, { state: selectedData });
            }}
          >
            Go to Estimation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageGalleryProductPage;

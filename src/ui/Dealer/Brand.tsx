import { LoadingButton } from "@mui/lab";
import { Alert, AlertColor, Button, CircularProgress, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { BrandNameModel, CategoryModel, ServiceNameModel, UnitOfSalesModel } from "../../models/Model";
import { Theme, useTheme } from "@mui/material/styles";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";

const BrandPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [pageSize, setPageSize] = useState<number>(5);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [arnID, setArnID] = useState<number>(0);
  const [sn, setSn] = useState("--Select--");
  const [snID, setSnID] = useState<number>(0);
  const [servicenameError, setServicenameError] = useState("");
  const [isServicenameError, setIsServicenameError] = useState(false);

  const [cn, setCn] = useState("--Select--");
  const [cnID, setCnID] = useState<number>(0);
  const [categorynameError, setCategorynameError] = useState("");
  const [isCategorynameError, setIsCategorynameError] = useState(false);

  const [serviceNameList, setServiceNameList] = useState<Array<ServiceNameModel>>([]);
  const [categoryList, setCategoryList] = useState<Array<CategoryModel>>([]);
  const [brandList, setBrandList] = useState<Array<BrandNameModel>>([]);
  const [brandListTemp, setBrandListTemp] = useState<Array<BrandNameModel>>([]);
  const [unitOfSalesList, setUnitOfSalesList] = useState<Array<UnitOfSalesModel>>([]);
  const [hsn, setHsn] = useState("");
  const [gst, setGst] = useState("");

  const [brandPrefix, setBrandPrefix] = useState("");
  const [brandPrefixError, setBrandPrefixError] = useState("");
  const [isBrandPrefixError, setIsBrandPrefixError] = useState(false);

  const [bn, setBn] = useState("--Select--");
  const [bnID, setBnID] = useState<number>(0);
  const [brandError, setbrandError] = useState("");
  const [isBrandError, setIsBrandError] = useState(false);

  const [unitsOfSales, setUnitsOfSales] = useState<string>("--Select--");
  const [unitList, setUnitList] = useState<string[]>([]);
  const [unitError, setUnitError] = useState<boolean>(false);
  const [unitErrorText, setUnitErrorText] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [selectedUnitID, setSelectedUnitID] = useState<number>(0);

  const [display, setDisplay] = useState("Yes");


  const [gd, setGD] = useState("");
  const [gdError, setGDError] = useState("");
  const [isGDError, setIsGDError] = useState(false);

  const [apd, setAPD] = useState("");
  const [apdError, setAPDError] = useState("");
  const [isAPDError, setIsAPDError] = useState(false);

  const [rp, setRP] = useState("");
  const [rpError, setRPError] = useState("");
  const [isRPError, setIsRPError] = useState(false);

  const [cd, setCD] = useState("");
  const [cdError, setCDError] = useState("");
  const [isCDError, setIsCDError] = useState(false);

  const [gold, setGold] = useState("");
  const [goldError, setGoldError] = useState("");
  const [isGoldError, setIsGoldError] = useState(false);

  const [silver, setSilver] = useState("");
  const [silverError, setSilverError] = useState("");
  const [isSilverError, setIsSilverError] = useState(false);

  const [platinum, setPlatinum] = useState("");
  const [platinumError, setPlatinumError] = useState("");
  const [isPlatinumError, setIsPlatinumError] = useState(false);

  const [contractor, setContractor] = useState("");
  const [contractorError, setContractorError] = useState("");
  const [isContractorError, setIsContractorError] = useState(false);

  const handleSNChange = (event: SelectChangeEvent) => {
    let serviceName: string = event.target.value;
    let ac = serviceNameList.find((el) => el.serviceName === serviceName);
    if (ac !== undefined) {
      setSn(event.target.value as string);
      setSnID(ac.id);
      //   SetResetServiceName(false);
      //   SetResetCategoryName(true);
      //   SetResetProductName(true);
      //   FetchCategoriesFromServices(arnID, ac.id);
    }
  };

  const handleCNChange = (event: SelectChangeEvent) => {
    let categoryName: string = event.target.value;
    let ac = categoryList.find((el) => el.categoryName === categoryName);
    if (ac !== undefined) {
      setCn(event.target.value as string);
      setCnID(ac.id);
      //   SetResetCategoryName(false);
      //   SetResetProductName(true);
      //   FetchProductsFromCategory(arnID, snID, ac.id);
    }
  };

  const handleBNChange = (event: SelectChangeEvent) => {
    let bName: string = event.target.value;
    let ac = brandList.find((el) => el.brandName === bName);
    if (ac !== undefined) {
      setBn(event.target.value as string);
      setBnID(ac.id);
      //   SetResetCategoryName(false);
      //   SetResetProductName(true);
      //   FetchProductsFromCategory(arnID, snID, ac.id);
    }
  };
  

  const handleUnitChange = (event: SelectChangeEvent<typeof unitsOfSales>) => {
    setUnitsOfSales(event.target.value);
    if (unitOfSalesList[0].unit1Name === event.target.value) {
      setSelectedUnit(unitOfSalesList[0].unit2Name);
      setSelectedUnitID(unitOfSalesList[0].unit1ID);
    } else {
      setSelectedUnit(unitOfSalesList[0].unit1Name);
      setSelectedUnitID(unitOfSalesList[0].unit2ID);
    }   
  };

  const handleCancelClick = () => {};

  const handleSubmitClick = () => {};

  const handelEditAndDelete = (type: string | null, a: BrandNameModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
     


      setButtonDisplay("unset");
      setActionStatus("edit");
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Brand</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Add/Edit Brand</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={isServicenameError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Service Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={sn} onChange={handleSNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {serviceNameList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.serviceName}>
                      {item.serviceName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{servicenameError}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={isCategorynameError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Category Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={cn} onChange={handleCNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {categoryList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.categoryName}>
                      {item.categoryName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{categorynameError}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>HSN / SAC Code</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              sx={{ background: "#e5e5e5" }}
              disabled
              fullWidth
              placeholder="HSN / SAC Code"
              variant="outlined"
              size="small"
              value={hsn}
              onChange={(e) => {
                setHsn(e.currentTarget.value);
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>GST Rate (%)</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              sx={{ background: "#e5e5e5" }}
              fullWidth
              disabled
              placeholder="GST Rate (%)"
              variant="outlined"
              size="small"
              value={gst}
              onChange={(e) => {
                setGst(e.currentTarget.value);
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Brand prefix Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Brand prefix Name"
              variant="outlined"
              size="small"
              error={isBrandPrefixError}
              helperText={brandPrefixError}
              value={brandPrefix}
              onChange={(e) => {
                setBrandPrefix((e.target as HTMLInputElement).value);
                setIsBrandPrefixError(false);
                setBrandPrefixError("");
              }}
            />
          </Grid>

          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={isBrandError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Brand Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={bn} onChange={handleBNChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {brandList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.brandName}>
                      {item.brandName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{brandError}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={2} md={3} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" error={unitError}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Unit Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={unitsOfSales} onChange={handleUnitChange}>
                <MenuItem disabled={true} value="--Select--">
                  --Select--
                </MenuItem>
                {unitList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{unitErrorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>General Discount (%)</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Discount"
              variant="outlined"
              size="small"
              error={isGDError}
              helperText={gdError}
              value={gd}
              onChange={(e) => {
                setGD((e.target as HTMLInputElement).value);
                setIsGDError(false);
                setGDError("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>App Provider Promotion (%)</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Promotion"
              variant="outlined"
              size="small"
              error={isAPDError}
              helperText={apdError}
              value={apd}
              onChange={(e) => {
                setAPD((e.target as HTMLInputElement).value);
                setIsAPDError(false);
                setAPDError("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Referral Point (%)</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Referral Point"
              variant="outlined"
              size="small"
              error={isRPError}
              helperText={rpError}
              value={rp}
              onChange={(e) => {
                setRP((e.target as HTMLInputElement).value);
                setIsRPError(false);
                setRPError("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Contractor Discount (%)</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Discount"
              variant="outlined"
              size="small"
              error={isCDError}
              helperText={cdError}
              value={cd}
              onChange={(e) => {
                setCD((e.target as HTMLInputElement).value);
                setIsCDError(false);
                setCDError("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Display</b>
            </Typography>
            <FormControl>
              <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Buyer Category Discount (%)</Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={3} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Gold (%)</b>
            </Typography>
            <TextField
              fullWidth
              placeholder="0.00"
              variant="outlined"
              size="small"
              error={isGoldError}
              helperText={goldError}
              value={gold}
              onChange={(e) => {
                setGold((e.target as HTMLInputElement).value);
                setIsGoldError(false);
                setGoldError("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={3} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Silver (%)</b>
            </Typography>
            <TextField
              fullWidth
              placeholder="0.00"
              variant="outlined"
              size="small"
              error={isSilverError}
              helperText={silverError}
              value={silver}
              onChange={(e) => {
                setSilver((e.target as HTMLInputElement).value);
                setIsSilverError(false);
                setSilverError("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={3} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Platinum (%)</b>
            </Typography>
            <TextField
              fullWidth
              placeholder="0.00"
              variant="outlined"
              size="small"
              error={isPlatinumError}
              helperText={platinumError}
              value={platinum}
              onChange={(e) => {
                setPlatinum((e.target as HTMLInputElement).value);
                setIsPlatinumError(false);
                setPlatinumError("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={3} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Contractor (%)</b>
            </Typography>
            <TextField
              fullWidth
              placeholder="0.00"
              variant="outlined"
              size="small"
              error={isContractorError}
              helperText={contractorError}
              value={contractor}
              onChange={(e) => {
                setContractor((e.target as HTMLInputElement).value);
                setIsContractorError(false);
                setContractorError("");
              }}
            />
          </Grid>
          <Grid item xs={4} sm={5} md={8}>
            <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} style={{ display: buttonDisplay }} onClick={handleCancelClick}>
              Cancel
            </Button>
            <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
              Submit
            </LoadingButton>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6" sx={{ mt: 2, borderBottom: 1, paddingBottom: "8px" }}>
              Brand List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {brandList.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search Department Name"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          onChangeSearch((e.target as HTMLInputElement).value);
                        }}
                        value={searchQuery}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <GridSearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <DataGrid
                      style={{
                        opacity: dataGridOpacity,
                        pointerEvents: dataGridPointer,
                      }}
                      autoHeight={true}
                      getRowHeight={() => "auto"}
                      rows={brandListTemp}
                      columns={serviceProductColumns}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...brandList];
                        let a: BrandNameModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        if (a) {
                          const clickType = (e.target as any).textContent;
                          if (clickType.toLowerCase() === "edit") handelEditAndDelete(clickType, a);
                        }
                      }}
                      sx={{
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        },
                      }}
                    />
                  </>
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
    </Box>
  );
};

export default BrandPage;

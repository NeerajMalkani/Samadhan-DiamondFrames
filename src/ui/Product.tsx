import { Box, Button, Chip, CircularProgress, Container, FormControl, FormControlLabel, Grid, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Theme, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { GetSession } from "../utils/sessions";
import { productColumns } from "../utils/tablecolumns";
import DataContext from "../contexts/DataContexts";
import Provider from "../api/Provider";
import {CategoryModel, ProductModel} from "../models/Model";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = { PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 } } };

function getStyles(name: string, unitSales: readonly string[], theme: Theme) {
  return { fontWeight: unitSales.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium };
}

const ProductPage = () => {
    let navigate = useNavigate();
    useEffect(() => {
      if (GetSession("isLogin") !== "true") {
        navigate(`/Samadhan-DiamondFrames/login`);
      }
    });


    const [loading, setLoading] = useState(true);
    const [arn, setArn] = React.useState("--Select--");
    const [sn, setSn] = React.useState("--Select--");
    const [cn, setCn] = React.useState("");
    const [hsn, setHsn] = React.useState("");
    const [gst, setGst] = React.useState("");
    const [unitsOfSales, setUnitsOfSales] = React.useState<string[]>([]);
    const [display, setDisplay] = React.useState("Yes");
    const [activityNamesList, setActivityNamesList] = React.useContext(DataContext).activityNamesList;
    const [serviceNameList, setServiceNameList] = React.useContext(DataContext).serviceNameList;
    const [unitOfSalesList, setUnitOfSalesList] = React.useContext(DataContext).unitOfSalesList;
    const [categoryList, setCategoryList] = React.useContext(DataContext).categoryList;
    const [productList, setProductList] = React.useContext(DataContext).productList;
    const [pageSize, setPageSize] = React.useState<number>(5);
    const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
    const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
    const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");

    const theme = useTheme();

    
  useEffect(() => {
    Provider.getAll("shows")
      .then((response: any) => {
        if (response) {
          // setCategoryList(CategoryDataDummy);
          // setActivityNamesList(ActivityRoleDataDummy);
          // setServiceNameList(ServiceNameDataDummy);
          // setUnitOfSalesList(UnitOfSalesDataDummy);
          // setProductList(ProductDataDummy);
        } else {
        }
        setLoading(false);
      })
      .catch((e: Error) => {
        console.log(e);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleARNChange = (event: SelectChangeEvent) => {
    setArn(event.target.value as string);
  };
  const handleSNChange = (event: SelectChangeEvent) => {
    setSn(event.target.value as string);
  };
  const handleUnitChange = (event: SelectChangeEvent<typeof unitsOfSales>) => {
    const {
      target: { value },
    } = event;
    setUnitsOfSales(typeof value === "string" ? value.split(",") : value);
  };
  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    let isValid: boolean = true;
    if (arn === "--Select--") {
      isValid = false;
    }
    if (sn === "--Select--") {
      isValid = false;
    }
    if (arn === "--Select--") {
      isValid = false;
    }
    if (cn.trim() === "") {
      isValid = false;
    }
    if (hsn.trim() === "") {
      isValid = false;
    }
    if (gst.trim() === "") {
      isValid = false;
    }
    if (isValid) {
      setSn("--Select--");
      setCn("--Select--");
      setCn("");
      setHsn("");
      setGst("");
      let arrCatList = [...productList];
      // const objCat: ProductModel = {
      //   id: productList.length + 1,
      //   srno: productList.length + 1,
      //   activityRoleName: arn,
      //   serviceName: sn,
      //   hsnSacCode: hsn,
      //   unitOfSales: "Sq.Ft / Sq.Mtr",
      //   gstRate: parseFloat(gst),
      //   categoryName: cn,
      //   display: display,
      //   action: "",
      // };
      // arrCatList.push(objCat);
      // setProductList(arrCatList);
    }
  };

  const handleCancelClick = () => {
    setDisplay("Yes");
    // setActivityName("");
    // setactivitynameError("");
    // setIsActivitynameError(false);
    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
  };

  const handelEditAndDelete = (type: string | null, a: CategoryModel | undefined) => {
    if (type?.toLowerCase() == "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      // setActivityName(a?.ac);
      // setactivitynameError("");
      // setIsActivitynameError(false);
      // setButtonDisplay("unset");

    }
    else if (type?.toLowerCase() == "delete") {
      
     }
  }

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Product</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Add Product</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small">
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Activity Role Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={arn} onChange={handleARNChange}>
                <MenuItem value="--Select--">--Select--</MenuItem>
                {activityNamesList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.activityRoleName}>
                      {item.activityRoleName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small">
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Service Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select value={sn} onChange={handleSNChange}>
                <MenuItem value="--Select--">--Select--</MenuItem>
                {categoryList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.categoryName}>
                      {item.categoryName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={3} md={5} sx={{ mt: 1 }}>
          <FormControl fullWidth size="small">
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Category Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <Select value={sn} onChange={handleSNChange}>
                <MenuItem value="--Select--">--Select--</MenuItem>
                {serviceNameList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.serviceName}>
                      {item.serviceName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>HSN / SAC Code</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
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
          <Grid item xs={4} sm={2} md={3} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>GST Rate (%)</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
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
          <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Product Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
            disabled
              fullWidth
              placeholder="Product Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
              //  setHsn(e.currentTarget.value);
              }}
            />
          </Grid>
          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" sx={{ paddingRight: { xs: 0, sm: 4 } }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Unit of Sales</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <Select 
                multiple
                value={unitsOfSales}
                onChange={handleUnitChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {unitOfSalesList.map((units) => (
                  <MenuItem key={units.id} value={units.unitName} style={getStyles(units.unitName, unitsOfSales, theme)}>
                    {units.unitName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <Grid item xs={4} sm={5} md={8}>
          <Button
              variant="contained"
              sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
              style={{ display: buttonDisplay }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <Button variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Product List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 400, width: "100%", marginBottom: "20px" }}>
                <DataGrid
                style={{ opacity: dataGridOpacity, pointerEvents: dataGridPointer }}
                  rows={productList}
                  columns={productColumns}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 20]}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  disableSelectionOnClick
                  onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                    const arrActivity = [...categoryList];
                    let a: CategoryModel | undefined = arrActivity.find(el => el.id == param.row.id);
                    handelEditAndDelete((e.target as any).textContent, a);
                  }}
                  sx={{
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductPage;

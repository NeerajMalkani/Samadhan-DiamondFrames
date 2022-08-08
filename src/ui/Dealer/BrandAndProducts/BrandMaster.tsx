import { Alert, AlertColor, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../../api/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { communication } from "../../../utils/communication";
import { brandNameColumns } from "../../../utils/tablecolumns";
import { theme } from "../../../theme/AppTheme";
import { BrandNameModel } from "../../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import ErrorIcon from "@mui/icons-material/Error";
import { GetStringifyJson } from "../../../utils/CommonFunctions";

const BrandMasterPage = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("Yes");
  const [brandName, setBrandName] = useState("");
  const [brandNamesList, setBrandNamesList] = useState<Array<BrandNameModel>>([]);

  const [brandNamesListTemp, setBrandNamesListTemp] = useState<Array<any>>([]);

  const [brandnameError, setbrandnameError] = useState("");
  const [isBrandnameError, setIsBrandnameError] = useState(false);
  const [pageSize, setPageSize] = useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [selectedID, setSelectedID] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [isBrandApproved, setIsBrandApproved] = useState<Boolean>(true);

  useEffect(() => {
    FetchShowBrand(cookies.dfc.UserID);
  }, []);

  const FetchShowBrand = (UserID) => {
    let params = {
      DealerID: UserID,
    };
    Provider.getAll(`dealerbrand/getshowbrand?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            setIsBrandApproved(response.data.data[0].showBrand);
            if (response.data.data[0].showBrand) {
              FetchData("", UserID);
            }
          }
        }
      })
      .catch((e) => {});
  };

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
  };

  const FetchData = (type: string, UserID: number) => {
    ResetFields();
    let params = {
      DealerID: UserID,
    };
    Provider.getAll(`dealerbrand/getbrand?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setBrandNamesList(arrList);
            setBrandNamesListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Brand " + type);
              setOpen(true);
              setSnackbarType("success");
            }
          }
        } else {
          setSnackbarType("info");
          setSnackMsg(communication.NoData);
          setOpen(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackbarType("error");
        setSnackMsg(communication.NetworkError);
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    const IsTextFiledError = brandName.trim() === "";
    setbrandnameError(IsTextFiledError ? communication.BlankBrandName : "");
    setIsBrandnameError(IsTextFiledError);
    if (!IsTextFiledError) {
      setButtonLoading(true);
      InsertUpdateData(brandName, display === "Yes");
      setDisplay("Yes");
      setBrandName("");
      setbrandnameError("");
      setIsBrandnameError(false);
    }
  };

  const handleCancelClick = () => {
    setDisplay("Yes");
    setBrandName("");
    setbrandnameError("");
    setIsBrandnameError(false);
    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setActionStatus("new");
  };

  const handelEditAndDelete = (type: string | null, a: BrandNameModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setBrandName(a?.brandName);
      setSelectedID(a.id);
      setbrandnameError("");
      setIsBrandnameError(false);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
  };

  const InsertUpdateData = (paramBrandName: string, checked: boolean) => {
    if (actionStatus === "new") {
      debugger;
      Provider.create("dealerbrand/insertbrand", {
        BrandName: paramBrandName,
        Display: checked,
        DealerID: CookieUserID,
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("added", CookieUserID);
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
            ResetFields();
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    } else if (actionStatus === "edit") {
      Provider.create("dealerbrand/updatebrand", {
        id: selectedID,
        BrandName: paramBrandName,
        Display: checked,
        DealerID: CookieUserID,
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("updated", CookieUserID);
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
            ResetFields();
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setBrandNamesListTemp(brandNamesList);
    } else {
      setBrandNamesListTemp(
        brandNamesList.filter((el: BrandNameModel) => {
          return el.brandName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        {isBrandApproved ? (
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={8} md={12}>
              <Typography variant="h4">Brand</Typography>
            </Grid>
            <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
              <Typography variant="h6">Add/Edit Brand Name</Typography>
            </Grid>
            <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <b>Brand Name</b>
                <label style={{ color: "#ff0000" }}>*</label>
              </Typography>
              <TextField
                fullWidth
                placeholder="Brand Name"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setBrandName((e.target as HTMLInputElement).value);
                  setIsBrandnameError(false);
                  setbrandnameError("");
                }}
                error={isBrandnameError}
                helperText={brandnameError}
                value={brandName}
              />
            </Grid>
            <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
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
              <Button variant="contained" sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }} style={{ display: buttonDisplay }} onClick={handleCancelClick}>
                Cancel
              </Button>
              <LoadingButton loading={buttonLoading} variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
                Submit
              </LoadingButton>
            </Grid>
            <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
              <Typography variant="h6">Brand List</Typography>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              {loading ? (
                <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                  {brandNamesList.length === 0 ? (
                    <></>
                  ) : (
                    <>
                      <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                        <TextField
                          placeholder="Search"
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            onChangeSearch((e.target as HTMLInputElement).value);
                          }}
                          value={searchQuery}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
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
                        rows={brandNamesListTemp}
                        columns={brandNameColumns}
                        pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 20]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        disableSelectionOnClick
                        onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                          const arrBrand = [...brandNamesList];
                          let a: BrandNameModel | undefined = arrBrand.find((el) => el.id === param.row.id);
                          handelEditAndDelete((e.target as any).textContent, a);
                        }}
                        sx={{
                          "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                          },
                          mb: 1,
                        }}
                      />
                    </>
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={8} md={12}>
              <ErrorIcon sx={{ float: "left", mr: 1, color: "#ff5959", mt: "5px" }} />{" "}
              <Typography variant="h6" sx={{ color: "#ff5959" }}>
                Would you like to create Brand & Product? Please activate the option in your settings
              </Typography>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <Button
                variant="contained"
                sx={{ mt: 1, mr: 1 }}
                onClick={() => {
                  navigate(`/dealer/basicdetails`);
                }}
              >
                Activate
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BrandMasterPage;

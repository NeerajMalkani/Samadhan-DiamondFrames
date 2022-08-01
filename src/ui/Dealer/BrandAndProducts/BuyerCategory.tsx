import { Alert, AlertColor, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Theme, useTheme } from "@mui/material/styles";
import { BuyerCategoryModel } from "../../../models/Model";
import Header from "../../../components/Header";
import { LoadingButton } from "@mui/lab";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { BuyerCategoryColumns } from "../../../utils/tablecolumns";
import { communication } from "../../../utils/communication";
import Provider from "../../../api/Provider";
import { GetStringifyJson } from "../../../utils/CommonFunctions";

const BuyerCategory = () => {
  const [cookies, setCookie] = useCookies(["dfc"]);
  let navigate = useNavigate();
  const [CookieUserID, SetCookieUseID] = useState(0);
  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [display, setDisplay] = useState("Yes");
  const [pageSize, setPageSize] = useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = useState<string>("new");
  const [selectedID, setSelectedID] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  const theme = useTheme();

  const [bc, setBc] = useState("");
  const [bcID, setBcID] = useState<number>(0);
  const [bcError, setBcError] = useState<boolean>(false);
  const [bcErrorText, setBcErrorText] = useState<string>("");
  const [buyerCategoryList, setBuyerCategoryList] = useState<Array<BuyerCategoryModel>>([]);
  const [buyerCategoryListTemp, setBuyerCategoryListTemp] = useState<Array<BuyerCategoryModel>>([]);


  useEffect(() => {
    FetchData("");
  }, []);

  const FetchData = (type: string) => {
    handleCancelClick();
   
    let params = {
      DealerID: CookieUserID,
    };

    Provider.getAll(`companyprofiledealer/getbuyercategory?${new URLSearchParams(GetStringifyJson(params))}`)
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setBuyerCategoryList(arrList);
            setBuyerCategoryListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Service " + type);
              setOpen(true);
              setSnackbarType("success");
            }
          }
        } else {
          setSnackMsg(communication.NoData);
          setOpen(true);
          setSnackbarType("info");
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setSnackbarType("error");
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setBuyerCategoryListTemp(buyerCategoryList);
    } else {
      setBuyerCategoryListTemp(
        buyerCategoryList.filter((el: BuyerCategoryModel) => {
          return el.buyerCategoryName.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCancelClick = () => {
    setBc("");
    setBcID(0);
    setBcError(false);
    setBcErrorText("");
    setActionStatus("new");
    setSelectedID(0);
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
    setDisplay("Yes");
  };

  const handelEditAndDelete = (type: string | null, a: BuyerCategoryModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setBc(a.buyerCategoryName);
      setBcID(a.id);
      setSelectedID(a.id);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
  };

  const handleSubmitClick = () => {
    let isValid: boolean = true;

    if (bc.trim() === "") {
      isValid = false;
      setBcError(true);
      setBcErrorText(communication.SelectServiceName);
    }

    if (isValid) {
      InsertUpdateData(bc, display === "Yes");
    }
  };

  const InsertUpdateData = (buyerCategoryName: string, checked: boolean) => {
    setButtonLoading(true);
    if (actionStatus === "new") {
      Provider.create("companyprofiledealer/insertbuyercategory", {
        BuyerCategoryName: buyerCategoryName,
        Display: checked,
        DealerID: CookieUserID,
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("added");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
            handleCancelClick();
          }else {
            handleCancelClick();
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e) => {
          handleCancelClick();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    } else if (actionStatus === "edit") {
      Provider.create("companyprofiledealer/updatebuyercategory", {
        ID: selectedID, BuyerCategoryName: buyerCategoryName, Display: checked, DealerID: CookieUserID,  
      })
        .then((response) => {
          if (response.data && response.data.code === 200) {
            FetchData("updated");
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType("error");
            handleCancelClick();
          } else {
            handleCancelClick();
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e) => {
          handleCancelClick();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    }
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Buyer Category</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
            <Typography variant="h6">Add/Edit Buyer Category</Typography>
          </Grid>
          <Grid item xs={4} sm={5} md={8} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Customer / Buyer Type Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
            <TextField
              fullWidth
              placeholder="Buyer Type Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setBc((e.target as HTMLInputElement).value);
                setBcError(false);
                setBcErrorText("");
              }}
              error={bcError}
              helperText={bcErrorText}
              value={bc}
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
            <Typography variant="h6">Buyer Category List</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {buyerCategoryList.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                      <TextField
                        placeholder="Search Buyer Type Name"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          onChangeSearch((e.target as HTMLInputElement).value);
                        }}
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
                      rows={buyerCategoryListTemp}
                      columns={BuyerCategoryColumns}
                      getRowHeight={() => "auto"}
                      autoHeight={true}
                      pageSize={pageSize}
                      rowsPerPageOptions={[5, 10, 20]}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      disableSelectionOnClick
                      onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                        const arrActivity = [...buyerCategoryList];
                        let a: BuyerCategoryModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                        handelEditAndDelete((e.target as any).textContent, a);
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

export default BuyerCategory;

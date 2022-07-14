import {
  Alert,
  AlertColor,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Provider from "../../api/Provider";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { unitColumns } from "../../utils/tablecolumns";
import { communication } from "../../utils/communication";
import { theme } from "../../theme/AppTheme";
import { UnitOfSalesModel } from "../../models/Model";
import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";

const UnitPage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/login`);
  }, []);

  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
  const [unit1Name, setUnit1Name] = React.useState("");
  const [unit2Name, setUnit2Name] = React.useState("");
  const [unitNamesList, setUnitNamesList] = useState<Array<UnitOfSalesModel>>([])
   // React.useContext(DataContext).unitOfSalesList;
  const [unit1Error, setUnit1Error] = useState("");
  const [isUnit1Error, setIsunit1Error] = useState(false);
  const [unit2Error, setUnit2Error] = useState("");
  const [isUnit2Error, setIsunit2Error] = useState(false);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">(
    "auto"
  );
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);

  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  
  const [unitNamesListTemp, setUnitNamesListTemp] = useState<Array<UnitOfSalesModel>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");

  useEffect(() => {
    FetchData("");
  }, []);

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    setButtonDisplay("none");
    setButtonLoading(false);
  };

  const FetchData = (type:string) => {
    ResetFields();
    Provider.getAll("master/getunitofsales")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.display = a.display ? "Yes" : "No";
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setUnitNamesList(arrList);
            setUnitNamesListTemp(arrList);
            if (type !== "") {
              setSnackMsg("Unit " + type);
              setOpen(true);
              setSnackbarType("success");
            }
          }
        } else {
          setOpen(true);
          setSnackMsg(communication.NoData);
          setSnackbarType("info");
        }
        setLoading(false);
      })
      .catch((e:any) => {
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

  const handleSubmitClick = () => {
    const IsTextFiledError1 = unit1Name.trim() === "";
    const IsTextFiledError2 = unit2Name.trim() === "";

    setUnit1Error(IsTextFiledError1 ? communication.BlankUnit1Name : "");
    setIsunit1Error(IsTextFiledError1);

    setUnit2Error(IsTextFiledError2 ? communication.BlankUnit2Name : "");
    setIsunit2Error(IsTextFiledError2);

    if (!IsTextFiledError1 && !IsTextFiledError2) {
      InsertUpdateData(unit1Name , unit2Name, display === "Yes");
      setDisplay("Yes");
      setUnit1Name("");
      setUnit2Name("");
      setUnit1Error("");
      setUnit2Error("");
      setIsunit2Error(false);
      setIsunit1Error(false);
    }
  };

  const handleCancelClick = () => {
    setDisplay("Yes");
    setUnit1Name("");
    setUnit2Name("");
    setUnit1Error("");
    setUnit2Error("");
    setIsunit2Error(false);
    setIsunit1Error(false);
    setButtonDisplay("none");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
  };

  const handelEditAndDelete = (
    type: string | null,
    a: UnitOfSalesModel | undefined
  ) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setUnit1Name(a.displayUnit.split("/")[0].trim());
      setUnit2Name(a.displayUnit.split("/")[1].trim());
      setSelectedID(a.id);
      setUnit1Error("");
      setUnit2Error("");
      setIsunit2Error(false);
      setIsunit1Error(false);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
    // else if (type?.toLowerCase() === "delete" && a !== undefined) {
    //   setSelectedID(a.id);
    //   Provider.deleteAllParams("master/deleteunitofsales", { ID: a.id })
    //     .then((response) => {
    //       if (response.data && response.data.code === 200) {
    //         FetchData();
    //       } else {
    //         ResetFields();
    //         setSnackMsg("your request cannot be processed");
    //         setOpen(true);
    //       }
    //     })
    //     .catch((e) => {
    //       ResetFields();
    //       setSnackMsg("your request cannot be processed");
    //       setOpen(true);
    //     });
    // }
  };

  const InsertUpdateData = (unit1: string, unit2: string,  checked: boolean) => {
    setButtonLoading(true);
    if (actionStatus === "new") {
      Provider.create("master/insertunitofsales", {
        Unit1Name: unit1,
        Unit2Name:unit2,
        Display: checked,
      })
        .then((response:any) => {
          if (response.data && response.data.code === 200) {
            FetchData("added");
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e:any) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    } else if (actionStatus === "edit") {
      Provider.create("master/updateunitofsales", {
        id: selectedID,
        Unit1Name: unit1,
        Unit2Name:unit2,
        Display: checked,
      })
        .then((response:any) => {
          if (response.data && response.data.code === 200) {
            FetchData("updated");
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setSnackbarType("error");
            setOpen(true);
          }
        })
        .catch((e:any) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setSnackbarType("error");
          setOpen(true);
        });
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setUnitNamesListTemp(unitNamesList);
    } else {
      setUnitNamesListTemp(
        unitNamesList.filter((el: UnitOfSalesModel) => {
          return el.displayUnit.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Unit of Sale</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Add/Edit Unit</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
            <Typography variant="subtitle2">
              <b>Unit Name</b>
              <label style={{ color: "#ff0000" }}>*</label>
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={6}>
            <TextField
              fullWidth
              placeholder="Unit Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setUnit1Name((e.target as HTMLInputElement).value);
                setIsunit1Error(false);
                setUnit1Error("");
              }}
              error={isUnit1Error}
              helperText={unit1Error}
              value={unit1Name}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={6}>
            <TextField
              fullWidth
              placeholder="Conversion Unit Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setUnit2Name((e.target as HTMLInputElement).value);
                setIsunit2Error(false);
                setUnit2Error("");
              }}
              error={isUnit2Error}
              helperText={unit2Error}
              value={unit2Name}
            />
          </Grid>

          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Display</b>
            </Typography>
            <FormControl>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                value={display}
                onChange={handleDisplayChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Button
              variant="contained"
              sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
              style={{ display: buttonDisplay }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={buttonLoading}
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleSubmitClick}
            >
              Submit
            </LoadingButton>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6" sx={{ mt: 2, borderBottom: 1, paddingBottom: "8px" }}>
              Unit List
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box
                height="300px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ m: 2 }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                {unitNamesList.length === 0 ? (
                  <></>
                ) : (
                  <>
                  <Grid item xs={4} sm={8} md={12} sx={{ alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
                    <TextField
                      placeholder="Search Unit Name"
                      variant="outlined"
                      size="small"
                      value={searchQuery}
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
                    rows={unitNamesListTemp}
                    autoHeight={true}
                    columns={unitColumns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    disableSelectionOnClick
                    onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                      const arrActivity = [...unitNamesList];
                      let a: UnitOfSalesModel | undefined = arrActivity.find(
                        (el) => el.id == param.row.id
                      );
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UnitPage;

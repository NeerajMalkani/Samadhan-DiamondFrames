import { Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { GetSession } from "../utils/sessions";
import DataContext from "../contexts/DataContexts";
import Provider from "../api/Provider";
import { UnitOfSalesDataDummy } from "../utils/dummydata";
import { DataGrid } from "@mui/x-data-grid";
import { unitColumns } from "../utils/tablecolumns";
import { communication } from "../utils/communication";
import { theme } from "../theme/AppTheme";
import UnitOfSalesModel from "../models/UnitOfSalesModel";

const UnitPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (GetSession("isLogin") !== "true") {
      navigate(`/login`);
    }
  });

  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState("Yes");
  const [unit1Name, setUnit1Name] = React.useState("");
  const [unit2Name, setUnit2Name] = React.useState("");
  const [unitNamesList, setUnitNamesList] = React.useContext(DataContext).unitOfSalesList;
  const [unit1Error, setUnit1Error] = useState("");
  const [isUnit1Error, setIsunit1Error] = useState(false);
  const [unit2Error, setUnit2Error] = useState("");
  const [isUnit2Error, setIsunit2Error] = useState(false);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>("none");
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<"auto" | "none">("auto");
  const [actionStatus, setActionStatus] = React.useState<string>("new");
  const [selectedID, setSelectedID] = React.useState<number>(0);

  // useEffect(() => {
  //   Provider.getAll("shows")
  //     .then((response: any) => {
  //       if (response) {
  //         setUnitNamesList(UnitOfSalesDataDummy);
  //       } else {
  //       }
  //       setLoading(false);
  //     })
  //     .catch((e: Error) => {
  //       console.log(e);
  //       setLoading(false);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = () => {
    setSelectedID(0);
    setActionStatus("new");
    setDataGridOpacity(1);
    setDataGridPointer("auto");
    Provider.getAll("master/getunitofsales")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any) {
              a.display = a.display ? "Yes" : "No";
            });
            setUnitNamesList(response.data.data);
          }
        } else {
          //Show snackbar
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        //Show snackbar
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }


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
      // const arrActivity = [...unitNamesList];
      // arrActivity.push({
      //   id: unitNamesList.length + 1,
      //   srno: unitNamesList.length + 1,
      //   unit: unit1Name + " / " + unit2Name,
      //   unitDisplay: display,
      //   action: "Edit",
      // });

      // setUnitNamesList(arrActivity);
      InsertUpdateData((unit1Name + " / " + unit2Name), display === "Yes");
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

  // const handelEditAndDelete = (type: string | null, a: UnitOfSalesModel | undefined) => {
  //   if (type?.toLowerCase() == "edit" && a !== undefined) {
  //     setDataGridOpacity(0.3);
  //     setDataGridPointer("none");
  //     setDisplay(a.unitDisplay);
  //     setUnit1Name(a.unit.split("/")[0].trim());
  //     setUnit2Name(a.unit.split("/")[1].trim());
  //     setUnit1Error("");
  //     setUnit2Error("");
  //     setIsunit2Error(false);
  //     setIsunit1Error(false);
  //     setButtonDisplay("unset");

  //   }
  //   else if (type?.toLowerCase() == "delete") {

  //   }
  // }

  const handelEditAndDelete = (type: string | null, a: UnitOfSalesModel | undefined) => {
    if (type?.toLowerCase() === "edit" && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer("none");
      setDisplay(a.display);
      setUnit1Name(a.unitName.split("/")[0].trim());
      setUnit2Name(a.unitName.split("/")[1].trim());
      setSelectedID(a.id);
      setUnit1Error("");
      setUnit2Error("");
      setIsunit2Error(false);
      setIsunit1Error(false);
      setButtonDisplay("unset");
      setActionStatus("edit");
    }
    else if (type?.toLowerCase() === "delete" && a !== undefined) {
      setSelectedID(a.id);
      Provider.deleteAllParams("master/deleteunitofsales", { ID:selectedID })
      .then((response) => {
        debugger;
        if (response.data && response.data.code === 200) {
          FetchData();
        } else {
          //Show snackbar
        }
        //setIsLoading(false);
      })
      .catch((e) => {
        debugger;
        console.log(e);
        //setIsLoading(false);
        //Show snackbar
      });
    }
  }

  const InsertUpdateData = (paramActivityName: string, checked: boolean) => {
    if (actionStatus === "new") {
      Provider.create("master/insertunitofsales", { UnitName: paramActivityName, Display: checked })
        .then((response) => {
          debugger;
          if (response.data && response.data.code === 200) {
            FetchData();
          } else {
            //Show snackbar
          }
          //setIsLoading(false);
        })
        .catch((e) => {
          debugger;
          console.log(e);
          //setIsLoading(false);
          //Show snackbar
        });
    } else if (actionStatus === "edit") {
      Provider.create("master/updateunitofsales", { id: selectedID, UnitName: paramActivityName, Display: checked })
        .then((response) => {
          debugger;
          if (response.data && response.data.code === 200) {
            FetchData();
          } else {
            //Show snackbar
          }
          //setIsLoading(false);
        })
        .catch((e) => {
          debugger;
          console.log(e);
          //setIsLoading(false);
          //Show snackbar
        });
    }
  }

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Unit of Sale</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6">Add Unit</Typography>
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
              <RadioGroup row name="row-radio-buttons-group" value={display} onChange={handleDisplayChange}>
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
            <Button variant="contained" sx={{ mt: 1 }} onClick={handleSubmitClick}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Unit List
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
                  rows={unitNamesList}
                  columns={unitColumns}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 20]}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  disableSelectionOnClick
                  onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                    const arrActivity = [...unitNamesList];
                    let a: UnitOfSalesModel | undefined = arrActivity.find(el => el.id == param.row.id);
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
};

export default UnitPage;

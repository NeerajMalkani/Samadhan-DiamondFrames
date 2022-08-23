import { Alert, AlertColor, Box, CircularProgress, Container, Grid, InputAdornment, Snackbar, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ShowsGrid from "../../../../components/GridStructure";
import Header from "../../../../components/Header";
import NoData from "../../../../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { ButtonSettings, ImageGalleryEstimation, MaterialSetupModel } from "../../../../models/Model";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { theme } from "../../../../theme/AppTheme";
import { materialSetupColumns } from "../../../../utils/tablecolumns";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const buttonSetting: ButtonSettings = {
  isActionButton: false,
  actionButtons: [],
};

const DesignWisePage = () => {
  const [value, setValue] = useState(0);
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieUserID, SetCookieUseID] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageGalleryData, setImageGalleryData] = useState<Array<ImageGalleryEstimation>>([]);

  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [materialSetupListTemp, setMaterialSetupListTemp] = useState<Array<MaterialSetupModel>>([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) {
      navigate(`/login`);
    } else {
      SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [dataGridOpacity, setDataGridOpacity] = useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = useState<"auto" | "none">("auto");
  const [pageSize, setPageSize] = useState<number>(5);


  const handleCardClick = (data: ImageGalleryEstimation) => {
    navigate(`/generaluser/imagegallery/product`, { state: { id: data.serviceID, name: data.serviceName } });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // if (query === "") {
    //   setMaterialSetupListTemp(materialSetupList);
    // } else {
    //   setMaterialSetupListTemp(
    //     materialSetupList.filter((el: MaterialSetupModel) => {
    //       return el.designTypeName.toString().toLowerCase().includes(query.toLowerCase());
    //     })
    //   );
    // }
  };

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4">Material Setup</Typography>
          </Grid>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Design Gallery" {...a11yProps(0)} />
              <Tab label="Pending" {...a11yProps(1)} />
              <Tab label="Approved" {...a11yProps(2)} />
              <Tab label="Rejected" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <Grid item xs={4} sm={8} md={12}>
            <TabPanel value={value} index={0}>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
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
                        <ShowsGrid shows={imageGalleryData} buttonSettings={buttonSetting} cardCallback={handleCardClick} type="category" />
                      )}
                    </div>
                  )}
                </Grid>
              </Grid>
            </TabPanel>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <TabPanel value={value} index={1}>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={4} sm={8} md={12} sx={{ borderBottom: 1, paddingBottom: "8px", borderColor: "rgba(0,0,0,0.12)" }}>
                  <Typography variant="h6">Pending list</Typography>
                </Grid>

                {loading ? (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div style={{ height: 500, width: "100%", marginBottom: "20px" }}>
                    {imageGalleryData.length === 0 ? (
                      <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
                    ) : (
                      <>
                        <Grid item xs={4} sm={8} md={12} sx={{ mt: 1, alignItems: "flex-end", justifyContent: "flex-end", mb: 1, display: "flex", mr: 1 }}>
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
                          rows={materialSetupListTemp}
                          columns={materialSetupColumns}
                          pageSize={pageSize}
                          rowsPerPageOptions={[5, 10, 20]}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          disableSelectionOnClick
                          onCellClick={(param, e: React.MouseEvent<HTMLElement>) => {
                            // const arrActivity = [...materialSetupList];
                            // let a: MaterialSetupModel | undefined = arrActivity.find((el) => el.id === param.row.id);
                            // if (a) {
                            //   const clickType = (e.target as any).textContent;
                            //   if (clickType.toLowerCase() === "edit") handelEditAndDelete(clickType, a);
                            // }
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
            </TabPanel>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <TabPanel value={value} index={2}>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}></Grid>
            </TabPanel>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <TabPanel value={value} index={3}>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 1, md: 2 }}></Grid>
            </TabPanel>
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

export default DesignWisePage;

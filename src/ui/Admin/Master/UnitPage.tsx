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
} from '@mui/material';
import Header from '../../../components/Header';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Provider from '../../../api/Provider';
import { DataGrid, GridSearchIcon } from '@mui/x-data-grid';
import { unitColumns } from '../../../utils/tablecolumns';
import { communication } from '../../../utils/communication';
import { theme } from '../../../theme/AppTheme';
import { DFUnitOfSalesModel } from '../../../models/Model';
import { useCookies } from 'react-cookie';
import { LoadingButton } from '@mui/lab';
import ListIcon from '@mui/icons-material/List';
import NoData from '../../../components/NoData';

const UnitPage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['dfc']);

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
  }, []);

  //#region Variables
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = React.useState('Yes');
  const [unit1Name, setUnit1Name] = React.useState('');
  const [unit2Name, setUnit2Name] = React.useState('');
  const [unit1ID, setUnit1ID] = React.useState(0);
  const [unit2ID, setUnit2ID] = React.useState(0);
  const [unitNamesList, setUnitNamesList] = useState<Array<DFUnitOfSalesModel>>(
    []
  );
  // React.useContext(DataContext).unitOfSalesList;
  const [unit1Error, setUnit1Error] = useState('');
  const [isUnit1Error, setIsunit1Error] = useState(false);
  const [unit2Error, setUnit2Error] = useState('');
  const [isUnit2Error, setIsunit2Error] = useState(false);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [buttonDisplay, setButtonDisplay] = React.useState<string>('none');
  const [dataGridOpacity, setDataGridOpacity] = React.useState<number>(1);
  const [dataGridPointer, setDataGridPointer] = React.useState<'auto' | 'none'>(
    'auto'
  );
  const [actionStatus, setActionStatus] = React.useState<string>('new');
  const [selectedID, setSelectedID] = React.useState<number>(0);

  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  const [unitNamesListTemp, setUnitNamesListTemp] = useState<
    Array<DFUnitOfSalesModel>
  >([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>(
    'error'
  );
  //#endregion

  //#region Functions
  useEffect(() => {
    FetchData('');
  }, []);

  const ResetFields = () => {
    setSelectedID(0);
    setActionStatus('new');
    setDataGridOpacity(1);
    setDataGridPointer('auto');
    setButtonDisplay('none');
    setButtonLoading(false);
  };

  const FetchData = (type: string) => {
    ResetFields();
    let params = {
      data: {
        Sess_UserRefno: cookies.dfc.UserID,
        unit_category_refno: 'all',
      },
    };
    Provider.createDF(
      'apiappadmin/spawu7S4urax/tYjD/unitcategoryrefnocheck/',
      params
    )
      .then((response: any) => {
        debugger;
        if (response.data && response.data.code === 200) {
          if (response.data.data) {
            const arrList = [...response.data.data];
            arrList.map(function (a: any, index: number) {
              a.id = a.unit_category_refno;
              a.view_status = a.view_status ? 1 : 0;
              let sr = { srno: index + 1 };
              a = Object.assign(a, sr);
            });
            setUnitNamesList(arrList);
            setUnitNamesListTemp(arrList);
            if (type !== '') {
              setSnackMsg('Unit ' + type);
              setOpen(true);
              setSnackbarType('success');
            }
          }
        } else {
          setOpen(true);
          setSnackMsg(communication.NoData);
          setSnackbarType('info');
        }
        setLoading(false);
      })
      .catch((e: any) => {
        setLoading(false);
        setSnackMsg(communication.NetworkError);
        setSnackbarType('error');
        setOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay((event.target as HTMLInputElement).value);
  };

  const handleSubmitClick = () => {
    const IsTextFiledError1 = unit1Name.trim() === '';
    const IsTextFiledError2 = unit2Name.trim() === '';

    setUnit1Error(IsTextFiledError1 ? communication.BlankUnit1Name : '');
    setIsunit1Error(IsTextFiledError1);

    setUnit2Error(IsTextFiledError2 ? communication.BlankUnit2Name : '');
    setIsunit2Error(IsTextFiledError2);

    if (!IsTextFiledError1 && !IsTextFiledError2) {
      InsertUpdateData(unit1Name, unit2Name, display === 'Yes');
      setDisplay('Yes');
      setUnit1Name('');
      setUnit2Name('');
      setUnit1Error('');
      setUnit2Error('');
      setIsunit2Error(false);
      setIsunit1Error(false);
    }
  };

  const handleCancelClick = () => {
    setDisplay('Yes');
    setUnit1Name('');
    setUnit2Name('');
    setUnit1Error('');
    setUnit2Error('');
    setIsunit2Error(false);
    setIsunit1Error(false);
    setButtonDisplay('none');
    setDataGridOpacity(1);
    setDataGridPointer('auto');
  };

  const handelEditAndDelete = (
    type: string | null,
    a: DFUnitOfSalesModel | undefined
  ) => {
    if (type?.toLowerCase() === 'edit' && a !== undefined) {
      setDataGridOpacity(0.3);
      setDataGridPointer('none');
      setUnit1ID(a.unit1ID);
      setUnit2ID(a.unit2ID);
      setDisplay(a.view_status);
      setUnit1Name(a.unit_name_text.split('/')[0].trim());
      setUnit2Name(a.unit_name_text.split('/')[1].trim());
      setSelectedID(a.id);
      setUnit1Error('');
      setUnit2Error('');
      setIsunit2Error(false);
      setIsunit1Error(false);
      setButtonDisplay('unset');
      setActionStatus('edit');
    }
  };

  const InsertUpdateData = (unit1: string, unit2: string, checked: boolean) => {
    debugger;
    setButtonLoading(true);
    if (actionStatus === 'new') {
      Provider.createDF('apiappadmin/spawu7S4urax/tYjD/unitnamecreate/', {
        // Unit1Name: unit1,
        // Unit2Name: unit2,
        // Display: checked,
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          unit_name: unit1,
          convert_unit_name: unit2,
          view_status: checked ? 1 : 0,
        },
      })
        .then((response: any) => {
          debugger;
          if (response.data && response.data.code === 200) {
            FetchData('added');
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType('error');
            ResetFields();
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setSnackbarType('error');
            setOpen(true);
          }
        })
        .catch((e: any) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setSnackbarType('error');
          setOpen(true);
        });
    } else if (actionStatus === 'edit') {
      debugger;
      Provider.createDF('apiappadmin/spawu7S4urax/tYjD/unitnameupdate/', {
        // Unit1Name: unit1,
        // Unit2Name: unit2,
        // Unit1ID: unit1ID,
        // Unit2ID: unit2ID,
        // Display: checked,
        // "data": {
        //   "Sess_UserRefno": "2",
        //   "unit_category_refno": "1",
        //   "unit_name": "Sq.Ft",
        //   "convert_unit_name": "Sq.Mtr",
        //   "view_status": "1"
        // }
        data: {
          Sess_UserRefno: cookies.dfc.UserID,
          unit_category_refno: selectedID,
          unit_name: unit1,
          convert_unit_name: unit2,
          view_status: checked ? 1 : 0,
        },
      })
        .then((response: any) => {
          debugger;
          if (
            response.data &&
            (response.data.code === 200 || response.data.code === 204)
          ) {
            FetchData('updated');
          } else if (response.data.code === 304) {
            setSnackMsg(communication.ExistsError);
            setOpen(true);
            setSnackbarType('error');
            ResetFields();
          } else {
            ResetFields();
            setSnackMsg(communication.Error);
            setSnackbarType('error');
            setOpen(true);
          }
        })
        .catch((e: any) => {
          ResetFields();
          setSnackMsg(communication.NetworkError);
          setSnackbarType('error');
          setOpen(true);
        });
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setUnitNamesListTemp(unitNamesList);
    } else {
      setUnitNamesListTemp(
        unitNamesList.filter((el: DFUnitOfSalesModel) => {
          return el.view_status
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase());
        })
      );
    }
  };
  //#endregion

  return (
    <Box sx={{ mt: 11 }}>
      <Header />
      <Container maxWidth='lg'>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant='h4'>Unit of Sale</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sm={8}
            md={12}
            sx={{
              borderBottom: 1,
              paddingBottom: '8px',
              borderColor: 'rgba(0,0,0,0.12)',
            }}
          >
            <Typography variant='h6'>Add/Edit Unit</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 1 }}>
            <Typography variant='subtitle2'>
              <b>Unit Name</b>
              <label style={{ color: '#ff0000' }}>*</label>
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={6}>
            <TextField
              fullWidth
              placeholder='Unit Name'
              variant='outlined'
              size='small'
              onChange={(e) => {
                setUnit1Name((e.target as HTMLInputElement).value);
                setIsunit1Error(false);
                setUnit1Error('');
              }}
              error={isUnit1Error}
              helperText={unit1Error}
              value={unit1Name}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={6}>
            <TextField
              fullWidth
              placeholder='Conversion Unit Name'
              variant='outlined'
              size='small'
              onChange={(e) => {
                setUnit2Name((e.target as HTMLInputElement).value);
                setIsunit2Error(false);
                setUnit2Error('');
              }}
              error={isUnit2Error}
              helperText={unit2Error}
              value={unit2Name}
            />
          </Grid>

          <Grid item xs={4} sm={3} md={4} sx={{ mt: 1 }}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              <b>Display</b>
            </Typography>
            <FormControl>
              <RadioGroup
                row
                name='row-radio-buttons-group'
                value={display}
                onChange={handleDisplayChange}
              >
                <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                <FormControlLabel value='No' control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Button
              variant='contained'
              sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.error.main }}
              style={{ display: buttonDisplay }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={buttonLoading}
              variant='contained'
              sx={{ mt: 1 }}
              onClick={handleSubmitClick}
            >
              Submit
            </LoadingButton>
          </Grid>
          <Grid
            item
            xs={4}
            sm={8}
            md={12}
            sx={{
              borderBottom: 1,
              paddingBottom: '8px',
              borderColor: 'rgba(0,0,0,0.12)',
            }}
          >
            <Typography variant='h6'>Unit List</Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            {loading ? (
              <Box
                height='300px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{ m: 2 }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ height: 500, width: '100%', marginBottom: '20px' }}>
                {unitNamesList.length === 0 ? (
                  <NoData
                    Icon={<ListIcon sx={{ fontSize: 72, color: 'red' }} />}
                    height='auto'
                    text='No data found'
                    secondaryText=''
                    isButton={false}
                  />
                ) : (
                  <>
                    <Grid
                      item
                      xs={4}
                      sm={8}
                      md={12}
                      sx={{
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        mb: 1,
                        display: 'flex',
                        mr: 1,
                      }}
                    >
                      <TextField
                        placeholder='Search'
                        variant='outlined'
                        size='small'
                        value={searchQuery}
                        onChange={(e) => {
                          onChangeSearch((e.target as HTMLInputElement).value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
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
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
                      disableSelectionOnClick
                      onCellClick={(
                        param,
                        e: React.MouseEvent<HTMLElement>
                      ) => {
                        const arrActivity = [...unitNamesList];
                        let a: DFUnitOfSalesModel | undefined =
                          arrActivity.find((el) => el.id == param.row.id);
                        handelEditAndDelete((e.target as any).textContent, a);
                      }}
                      sx={{
                        '& .MuiDataGrid-columnHeaders': {
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
        <Alert severity={snackbarType} sx={{ width: '100%' }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UnitPage;

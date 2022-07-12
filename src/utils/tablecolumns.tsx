import { Button, Grid, IconButton, Link, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import DataContexts from "../contexts/DataContexts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { theme } from "../theme/AppTheme";
import { PanoramaSharp } from "@mui/icons-material";

export const categoryColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.5,
    //  minWidth: 60,
    sortable: false,
  },
  {
    field: "categoryName",
    headerName: "Category Name",
    flex: 1.5,
    // minWidth: 120,
  },
  {
    field: "activityRoleName",
    headerName: "Activity Role Name",
    flex: 1.8,
    maxWidth: 140,
  },
  {
    field: "serviceName",
    headerName: "Service Name",
    flex: 1.8,
    //  minWidth: 140,
  },

  {
    field: "hsnsacCode",
    headerName: "HSN / SAC Code",
    flex: 1,
    maxWidth: 150,
    sortable: false,
  },
  {
    field: "gstRate",
    headerName: "GST Rate",
    flex: 0.5,
    maxWidth: 150,
    sortable: false,
    renderCell: (params) => {
      return params.value.toFixed(2) + "%";
    },
  },
  {
    field: "unitName",
    headerName: "Unit of Sales",
    flex: 1.5,
    sortable: false,
    //  minWidth: 120,
    renderCell: (params) => {
      if (params.value !== null && params.value !== undefined) {
        const a = params.value.split(",");
        return (
          <div>
            {a.map((k: string) => {
              return <Typography color="textSecondary">{k.trim()}</Typography>;
            })}
          </div>
        );
      }
    },
  },
  {
    field: "display",
    headerName: "Display",
    sortable: false,
    flex: 0.5,
    maxWidth: 110,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 2,
    maxWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}>
          Edit
        </Button>

        {/* <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.error.main }}
        >
          Delete
        </Button> */}
      </Grid>
    ),
  },
];

export const activityColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "activityRoleName",
    headerName: "Activity Name",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    minWidth: 140,
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    sortable: false,
    renderCell: (e) => (
      <Grid>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}>
          Edit
        </Button>

        {/* <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.error.main }}
        >
          Delete
        </Button> */}
        {/* <IconButton aria-label="edit" sx={{ mr: 1 }}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton> */}
      </Grid>
    ),
  },
];

export const serviceColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "serviceName",
    headerName: "Service Name",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    minWidth: 140,
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 1,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}>
          Edit
        </Button>

        {/* <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.error.main }}
        >
          Delete
        </Button> */}
      </Grid>
    ),
  },
];

export const unitColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "displayUnit",
    headerName: "Unit Name",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "display",
    headerName: "Display",
    sortable: false,
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 1,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}>
          Edit
        </Button>

        {/* <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.error.main }}
        >
          Delete
        </Button> */}
      </Grid>
    ),
  },
];

export const productColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "productName",
    headerName: "Product Name",
    flex: 2.5,
    minWidth: 140,
  },
  {
    field: "activityRoleName",
    headerName: "Activity Role Name",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "serviceName",
    headerName: "Service Name",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "categoryName",
    headerName: "Category Name",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "hsnsacCode",
    headerName: "Product Code",
    flex: 1.8,
    minWidth: 140,
  },

  {
    field: "unitName",
    headerName: "Unit of Sale",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    maxWidth: 80,
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 1,
    maxWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const serviceProductColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    sortable: false,
    //minWidth: 60,
  },
  {
    field: "productName",
    headerName: "Product Name / Specification",
    flex: 2.5,
    // minWidth: 140,
    renderCell: (params) => {
      if (params.value !== null && params.value !== undefined) {
        return (
          <div>
            <Typography noWrap={false}>{params.value}</Typography>
            <Grid>
              <Grid>
                <Link underline="hover">{"View Short Specification"}</Link>
              </Grid>
              <Grid>
                <Link underline="hover">{"View Specification"}</Link>
              </Grid>
            </Grid>
          </div>
        );
      }
    },
  },
  {
    field: "serviceName",
    headerName: "Service Name",
    flex: 1.8,
    //  minWidth: 140,
  },
  {
    field: "categoryName",
    headerName: "Category Name",
    flex: 1.8,
    // minWidth: 140,
  },
  {
    field: "rateWithMaterials",
    headerName: "Rate (with material)",
    flex: 1.8,
    //  minWidth: 140,
    renderCell: (params) => {
      if (params.row.selectedUnitID === params.row.unit1ID) {
        return params.value + " / " + params.row.unit1Name;
      } else {
        return params.value + " / " + params.row.unit2Name;
      }
    },
  },
  {
    field: "rateWithoutMaterials",
    headerName: "Rate (without material)",
    flex: 1.8,
    renderCell: (params) => {
      if (params.row.selectedUnitID === params.row.unit1ID) {
        return params.value + " / " + params.row.unit1Name;
      } else {
        return params.value + " / " + params.row.unit2Name;
      }
    },
    //  minWidth: 140,
  },
  {
    field: "alternateUnitOfSales",
    headerName: "Alternate Unit of Sale",
    flex: 1.8,
    renderCell: (params) => {
      if (params.row.selectedUnitID === params.row.unit1ID) {
        return params.row.unit2Name;
      } else {
        return params.row.unit1Name;
      }
    },
    //  minWidth: 140,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    sortable: false,
    maxWidth: 100,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    sortable: false,
    maxWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const departmentColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    sortable: false,
    minWidth: 60,
  },
  {
    field: "departmentName",
    headerName: "Department Name",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    minWidth: 140,
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    sortable: false,
    renderCell: (e) => (
      <Grid>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const designationColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "designationName",
    headerName: "Designation Name",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    sortable: false,
    minWidth: 140,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 1,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const eWayBillColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "stateName",
    headerName: "State",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "inStateLimit",
    headerName: "In State Limit",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "interStateLimit",
    headerName: "Inter State Limit",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    minWidth: 140,
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    sortable: false,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const locationTypeColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "branchType",
    headerName: "Location Type",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "activityName",
    headerName: "Activity Name",
    flex: 1.8,
    minWidth: 140,
    renderCell: (params) => {
      if (params.value !== null && params.value !== undefined) {
        const a = params.value.split(",");
        return (
          <div>
            {a.map((k: string) => {
              return <Typography color="textSecondary">{k.trim()}</Typography>;
            })}
          </div>
        );
      }
    },
  },
  {
    field: "serviceName",
    headerName: "Service Name",
    flex: 1.8,
    minWidth: 140,
    renderCell: (params) => {
      if (params.value !== null && params.value !== undefined) {
        const a = params.value.split(",");
        return (
          <div>
            {a.map((k: string) => {
              return <Typography color="textSecondary">{k.trim()}</Typography>;
            })}
          </div>
        );
      }
    },
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    maxWidth: 100,
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 1,
    maxWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}>
          Edit
        </Button>
        {/* <IconButton color="primary" aria-label="Edit">
          <EditIcon />
        </IconButton> */}
      </Grid>
    ),
  },
];

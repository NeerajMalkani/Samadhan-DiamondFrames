import { Button, Grid, IconButton, Link, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import DataContexts from "../contexts/DataContexts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { theme } from "../theme/AppTheme";

export const categoryColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.5,
    minWidth: 60,
  },
  {
    field: "activityRoleName",
    headerName: "Activity Role Name",
    flex: 1.8,
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
    flex: 1.5,
    minWidth: 120,
  },
  {
    field: "hsnsacCode",
    headerName: "HSN / SAC Code",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "gstRate",
    headerName: "GST Rate",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "unitID",
    headerName: "Unit of Sales",
    flex: 1.5,
    minWidth: 120,
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
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 2,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}
        >
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
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}
        >
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
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}
        >
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
  },
  {
    field: "unitName",
    headerName: "Unit Name",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}
        >
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
  }, {
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
    minWidth: 140,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}
        >
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
    minWidth: 60,
  }, {
    field: "productName",
    headerName: "Product Name / Specification",
    flex: 2.5,
    minWidth: 140,
    renderCell: (params) => {
      if (params.value !== null && params.value !== undefined) {
        return (
          <div>
            <Typography>params.value</Typography>
            <Link>View Short Specification</Link>
            <Link>View Specification</Link>
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
  },
  {
    field: "categoryName",
    headerName: "Category Name",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "rateWithMaterials",
    headerName: "Rate (with material)",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "rateWithoutMaterials",
    headerName: "Rate (without material)",
    flex: 1.8,
    minWidth: 140,
  }, {
    field: "alternateUnitOfSales",
    headerName: "Alternate Unit of Sale",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}
        >
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
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}
        >
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
    minWidth: 140,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}
        >
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
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.success.main, mr: 1 }}
        >
          Edit
        </Button>
      </Grid>
    ),
  },
];

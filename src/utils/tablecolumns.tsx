import { Button, Grid, Link, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { CalculateSqfeet } from "./CommonFunctions";
import { NullOrEmpty } from "./CommonFunctions";

export const categoryColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.5,
    sortable: false,
  },
  {
    field: "categoryName",
    headerName: "Category Name",
    flex: 1.5,
  },
  {
    field: "activityRoleName",
    headerName: "Activity Role Name",
    flex: 1.8,
  },
  {
    field: "serviceName",
    headerName: "Service Name",
    flex: 1.8,
  },

  {
    field: "hsnsacCode",
    headerName: "HSN / SAC Code",
    flex: 1,
    sortable: false,
    maxWidth: 150,
  },
  {
    field: "gstRate",
    headerName: "GST Rate",
    flex: 0.5,
    sortable: false,
    minWidth: 100,
    renderCell: (params) => {
      return params.value.toFixed(2) + "%";
    },
  },
  {
    field: "unitName",
    headerName: "Unit of Sales",
    flex: 1.5,
    sortable: false,
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
        <Button variant="text" sx={{ mr: 1 }}>
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
        <Button variant="text" sx={{ mr: 1 }}>
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
        <Button variant="text" sx={{ mr: 1 }}>
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
        <Button variant="text" sx={{ mr: 1 }}>
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
        <Button variant="text" sx={{ mr: 1 }}>
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
        <Button variant="text" sx={{ mr: 1 }}>
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
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const branchColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "locationType",
    headerName: "Location Type",
    flex: 2.5,
    minWidth: 140,
  },
  {
    field: "locationName",
    headerName: "Location Name",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "branchAdmin",
    headerName: "Branch Admin",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "gstNo",
    headerName: "GST No",
    flex: 1.8,
    minWidth: 140,
  },

  {
    field: "panNo",
    headerName: "PAN No",
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
        <Button variant="text" sx={{ mr: 1 }}>
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
    field: "reportingAuthority",
    headerName: "Reporting Authority",
    flex: 1.8,
    sortable: false,
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
        <Button variant="text" sx={{ mr: 1 }}>
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
        <Button variant="text" sx={{ mr: 1 }}>
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
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
        {/* <IconButton color="primary" aria-label="Edit">
          <EditIcon />
        </IconButton> */}
      </Grid>
    ),
  },
];

export const workFloorColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "workFloorName",
    headerName: "Work Floor Name",
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
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const workLocationColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "workLocationName",
    headerName: "Work Location Name",
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
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const designTypeColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    sortable: false,
  },
  {
    field: "designTypeName",
    headerName: "Design Type Name",
    flex: 2.5,
  },
  {
    field: "serviceName",
    headerName: "Service Name",
    flex: 1.8,
  },
  {
    field: "categoryName",
    headerName: "Category Name",
    flex: 1.8,
  },
  {
    field: "productName",
    headerName: "Product Name",
    flex: 1.8,
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
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const postNewDesignColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    sortable: false,
  },
  {
    field: "designTypeName",
    headerName: "Design Type Name",
    flex: 2,
  },
  {
    field: "serviceName",
    headerName: "Service Name",
    flex: 1.8,
  },
  {
    field: "categoryName",
    headerName: "Category Name / Product Name",
    flex: 2.3,
    renderCell: (params) => {
      return (
        <div>
          <Typography noWrap={false}>{params.value}</Typography>
          <Typography noWrap={false}>{params.row.productName}</Typography>
        </div>
      );
    },
  },
  {
    field: "workLocationName",
    headerName: "Work Location Name",
    flex: 1.8,
  },
  {
    field: "designNumber",
    headerName: "Design No.",
    flex: 1.8,
  },
  {
    field: "labourCost",
    headerName: "Labour Cost",
    flex: 1.8,
    renderCell: (params) => {
      return params.value.toFixed(2);
    },
  },
  {
    field: "designImage",
    headerName: "Design Image",
    flex: 1.8,
    renderCell: (params) => {
      return <img src={params.value} alt="" style={{ width: "98px", height: "96px" }} />;
    },
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
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const brandNameColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "brandName",
    headerName: "Brand Name",
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
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const brandColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    sortable: false,
  },
  {
    field: "serviceName",
    headerName: "Service Name",
    flex: 1.5,
  },
  {
    field: "categoryName",
    headerName: "Category Name",
    flex: 1.5,
  },
  {
    field: "brandPrefixName",
    headerName: "Brand Prefix",
    flex: 1,
  },
  {
    field: "brandName",
    headerName: "Brand Name",
    flex: 1.8,
  },
  {
    field: "Unit of Sale",
    headerName: "Unit Of Sale",
    flex: 1.8,
    renderCell: (params) => {
      return params.row.unitName;
    },
  },
  {
    field: "generalDiscount",
    headerName: "General Discount (%)",
    flex: 1,
  },
  {
    field: "contractorDiscount",
    headerName: "Contractor Discount (%)",
    flex: 1,
  },
  {
    field: "appProviderDiscount",
    headerName: "App Provider Promotion (%)",
    flex: 1,
  },
  {
    field: "referralPoints",
    headerName: "Referral Points (%)",
    flex: 1,
  },
  // {
  //   field: "approve",
  //   headerName: "Approve",
  //   flex: 1.8,
  //   sortable: false,
  //   maxWidth: 100,
  // },
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
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const productSetupColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    sortable: false,
  },
  {
    field: "productName",
    headerName: "Product Name >> Brand",
    flex: 1.5,
    renderCell: (param) => (
      <Grid>
        <Typography>{param.value}</Typography>
        <Typography color="textSecondary">{param.row.brandName}</Typography>
      </Grid>
    ),
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1.5,
  },
  {
    field: "unitOfSale",
    headerName: "Unit of Sale",
    flex: 1,
    renderCell: (params) => {
      return params.row.unitName;
    },
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1.8,
  },
  {
    field: "unitValue",
    headerName: "Converted Unit",
    flex: 1,
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
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const BuyerCategoryColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "buyerCategoryName",
    headerName: "Buyer Type Name",
    flex: 1.8,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 1,
    renderCell: (e) => (
      <Grid>
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const materialSetupColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    sortable: false,
  },
  {
    field: "serviceName",
    headerName: "Service Name",
    flex: 1.5,
  },
  {
    field: "categoryName",
    headerName: "Category > Service Product Name",
    flex: 1.5,
    renderCell: (param) => (
      <Grid>
        <Typography>{param.value}</Typography>
        <Typography color="textSecondary">{param.row.productName}</Typography>
      </Grid>
    ),
  },
  {
    field: "designTypeName",
    headerName: "Design Type Name",
    flex: 1,
  },
  {
    field: "subtotal",
    headerName: "Materials Cost (per Sq.Ft)",
    flex: 1.8,
    renderCell: (params) => {
      return (params.row.subtotal / (params.row.length * params.row.width)).toFixed(4);
    },
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
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const employeeColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "employeeName",
    headerName: "Employee Name / Code",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "mobileNo",
    headerName: "Mobile No",
    flex: 1.8,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "locationName",
    headerName: "Branch",
    flex: 1.8,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "departmentName",
    headerName: "Department",
    flex: 1.5,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "designationName",
    headerName: "Designation",
    flex: 1.5,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "profileStatus",
    headerName: "Profile Status",
    flex: 1,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "loginStatus",
    headerName: "Login Status",
    flex: 1,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "verifyStatus",
    headerName: "Verify Status",
    flex: 1,
    minWidth: 120,
    sortable: false,
    renderCell: params => {
      if (params.row.verifyStatus === false) {
        return <Button variant="contained" size="small" sx={{ mr: 1 }}
        >
                  Send OTP
                </Button>;
      }
      else {
        return <Grid>
         <Typography>Verified</Typography>
      </Grid>;
      }
    }
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    sortable: false,
    renderCell: (e) => (
      <Grid>
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const yourEstimationColumns: GridColDef[] = [
  {
    field: "view",
    headerName: "View",
    sortable: false,
    flex: 1.3,
    maxWidth: 80,
    renderCell: (e) => (
      <Grid>
        <Button variant="text" sx={{ mr: 1 }}>
          View
        </Button>
      </Grid>
    ),
  },
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "id",
    headerName: "Estimation No.",
    flex: 1.2,
    minWidth: 50,
  },
  {
    field: "designTypeID",
    headerName: "Design Code",
    flex: 1.2,
    minWidth: 60,
  },
  {
    field: "designTypeName",
    headerName: "Design Type",
    flex: 1.8,
    minWidth: 140,
  },

  {
    field: "productName",
    headerName: "Product Name",
    flex: 2.5,
    minWidth: 140,
  },
  {
    field: "totalSqFt",
    headerName: "Total Sq.Ft",
    flex: 1.5,
    minWidth: 100,
    renderCell: (e) => {
      let length = e.row.length.toString().split(".");
      let width = e.row.width.toString().split(".");

      let lengthInches = ((parseInt(length[0]) * 12 + parseInt(length[1] === undefined ? "0" : length[1])) * (parseInt(width[0]) * 12 + parseInt(width[1] === undefined ? "0" : width[1]))) / 144;
      return lengthInches.toFixed(4);
    },
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    flex: 1.8,
    minWidth: 140,
    renderCell: (e) => e.value.toFixed(4),
  },
  {
    field: "status",
    headerName: "Send Enquiry Status",
    flex: 1.5,
    maxWidth: 100,
    sortable: false,
    renderCell: (e) => (
      <Grid>
        <Typography color={e.value ? "green" : "red"}>{e.value ? "Yes" : "No"}</Typography>
      </Grid>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 1.8,
    maxWidth: 240,
    renderCell: (e) => (
      <Grid>
        {!e.row.status ? (
          <Grid>
            <Button variant="text" sx={{ mr: 1 }}>
              Send Enquiry
            </Button>
          </Grid>
        ) : (
          <></>
        )}
        <Grid>
          <Button variant="text" sx={{ mr: 1 }}>
            View Details
          </Button>
        </Grid>
      </Grid>
    ),
  },
];

export const clientColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "ServiceProviderRole",
    headerName: "Service Provider Role",
    flex: 2,
    maxWidth: 240,
    renderCell: (e) => {
      let arrService = [];
      switch (e.row.serviceType) {
        case 1:
          arrService.push("Vendor");
          break;
        case 2:
          arrService.push("Supplier");
          break;
        case 3:
          arrService.push("Client");
          break;
        case 12:
          arrService.push("Vendor");
          arrService.push("Supplier");
          break;
        case 13:
          arrService.push("Vendor");
          arrService.push("Client");
          break;
        case 23:
          arrService.push("Supplier");
          arrService.push("Vendor");
          break;
        case 123:
          arrService.push("Vendor");
          arrService.push("Supplier");
          arrService.push("Client");
          break;
      }

      return (
        <Grid>
          {arrService.map((item) => {
            return <Typography>{item}</Typography>;
          })}
        </Grid>
      );
    },
  },
  {
    field: "companyName",
    headerName: "Company / Firm Name",
    flex: 1.8,
    minWidth: 140,
    sortable: false,
  },
  {
    field: "address1",
    headerName: "Address",
    flex: 2,
    minWidth: 200,
    sortable: false,
    renderCell: (e) => {
      return (
        <Grid>
          <Typography>{e.row.companyName}</Typography>
          <Typography>{e.row.address1}</Typography>
          <Typography>{e.row.cityName + " - " + e.row.pincode}</Typography>
          <Typography>{e.row.stateName}</Typography>
        </Grid>
      );
    },
  },
  {
    field: "gstNumber",
    headerName: "GST No.",
    flex: 1.8,
    minWidth: 160,
    sortable: false,
  },
  {
    field: "pan",
    headerName: "PAN No.",
    flex: 1.8,
    minWidth: 140,
    sortable: false,
  },
  {
    field: "contactPerson",
    headerName: "Contact Person",
    flex: 1.8,
    minWidth: 140,
    sortable: false,
  },
  {
    field: "contactMobileNumber",
    headerName: "Phone No.",
    flex: 1.8,
    minWidth: 140,
    sortable: false,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1.8,
    sortable: false,
    maxWidth: 140,
  },
  {
    field: "addedBy",
    headerName: "Created/Added",
    flex: 1.8,
    sortable: false,
    maxWidth: 140,
    renderCell: (e) => {
      return e.value ? "Create" : "Add";
    },
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    sortable: false,
    renderCell: (e) => (
      <Grid>
        <Button variant="text" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Grid>
    ),
  },
];

export const contractorPendingQuotation: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "clientDetails",
    headerName: "Client Details",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
    renderCell: (e) => {
      return (
        <Grid>
          <Typography>{e.row.fullName}</Typography>
          <Typography>{e.row.username}</Typography>
        </Grid>
      );
    },
  },
  {
    field: "designTypeImage",
    headerName: "Design Image",
    flex: 0.8,
    maxWidth: 100,
    sortable: false,
    renderCell: (params) => {
      return <img src={params.value} alt="" style={{ width: "98px", height: "96px" }} />;
    },
  },
  {
    field: "estimationDetails",
    headerName: "Estimation & Product Details",
    flex: 1.8,
    minWidth: 240,
    sortable: false,
    renderCell: (e) => {
      let length = e.row.length.toString().split(".");
      let width = e.row.width.toString().split(".");
      const destinationSqFt = CalculateSqfeet(parseInt(length[0]), parseInt(length[1] === undefined ? "0" : length[1]), parseInt(width[0]), parseInt(width[1] === undefined ? "0" : width[1]));
      return (
        <Grid sx={{ padding: "4px" }}>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Estimation No.: </span>
            <b style={{ marginLeft: 8 }}>{"AUG" + e.row.id}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Service:</span>
            <b style={{ marginLeft: 8 }}>{e.row.serviceName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Category:</span>
            <b style={{ marginLeft: 8 }}>{e.row.categoryName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Product:</span>
            <b style={{ marginLeft: 8 }}>{e.row.productName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Design Type:</span>
            <b style={{ marginLeft: 8 }}>{e.row.designTypeName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Design No.:</span>
            <b style={{ marginLeft: 8 }}>{"DS-" + e.row.designTypeID}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Total Sq.Ft.:</span>
            <b style={{ marginLeft: 8 }}>{destinationSqFt.toFixed(4)}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Material Cost:</span>
            <b style={{ marginLeft: 8 }}>{e.row.subtotalAmount.toFixed(4)}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Labour Cost:</span>
            <b style={{ marginLeft: 8 }}>{e.row.labourCost.toFixed(4)}</b>
          </Typography>
        </Grid>
      );
    },
  },
  {
    field: "approvalStatus",
    headerName: "Status",
    flex: 1,
    maxWidth: 100,
    sortable: false,
    renderCell: (params) => {
      return "Pending";
    },
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1.5,
    minWidth: 160,
    sortable: false,
    renderCell: (e) => (
      <>
        <Grid>
          <Button variant="text" sx={{ mr: 1 }}>
            Edit
          </Button>
        </Grid>
        <Grid>
          <Button variant="text" sx={{ mr: 1 }}>
            Self Approve
          </Button>
        </Grid>
        <Grid>
          <Button variant="text" sx={{ mr: 1 }}>
            Reject
          </Button>
        </Grid>
      </>
    ),
  },
];

export const contractorApprovedQuotation: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "clientDetails",
    headerName: "Client Details",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
    renderCell: (e) => {
      return (
        <Grid>
          <Typography>{e.row.fullName}</Typography>
          <Typography>{e.row.username}</Typography>
        </Grid>
      );
    },
  },
  {
    field: "designTypeImage",
    headerName: "Design Image",
    flex: 0.8,
    maxWidth: 100,
    sortable: false,
    renderCell: (params) => {
      return <img src={params.value} alt="" style={{ width: "98px", height: "96px" }} />;
    },
  },
  {
    field: "estimationDetails",
    headerName: "Estimation & Product Details",
    flex: 1.8,
    minWidth: 240,
    sortable: false,
    renderCell: (e) => {
      let length = e.row.length.toString().split(".");
      let width = e.row.width.toString().split(".");
      const destinationSqFt = CalculateSqfeet(parseInt(length[0]), parseInt(length[1] === undefined ? "0" : length[1]), parseInt(width[0]), parseInt(width[1] === undefined ? "0" : width[1]));
      return (
        <Grid sx={{ padding: "4px" }}>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Estimation No.: </span>
            <b style={{ marginLeft: 8 }}>{"AUG" + e.row.id}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Service:</span>
            <b style={{ marginLeft: 8 }}>{e.row.serviceName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Category:</span>
            <b style={{ marginLeft: 8 }}>{e.row.categoryName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Product:</span>
            <b style={{ marginLeft: 8 }}>{e.row.productName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Design Type:</span>
            <b style={{ marginLeft: 8 }}>{e.row.designTypeName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Design No.:</span>
            <b style={{ marginLeft: 8 }}>{"DS-" + e.row.designTypeID}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Total Sq.Ft.:</span>
            <b style={{ marginLeft: 8 }}>{destinationSqFt.toFixed(4)}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Material Cost:</span>
            <b style={{ marginLeft: 8 }}>{e.row.subtotalAmount.toFixed(4)}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Labour Cost:</span>
            <b style={{ marginLeft: 8 }}>{e.row.labourCost.toFixed(4)}</b>
          </Typography>
        </Grid>
      );
    },
  },
  {
    field: "approvalStatus",
    headerName: "Status",
    flex: 0.8,
    maxWidth: 100,
    sortable: false,
    renderCell: (params) => {
      return "Approved";
    },
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1.5,
    minWidth: 120,
    sortable: false,
    renderCell: (e) => (
      <>
        <Grid>
          <Button variant="text" sx={{ mr: 1 }}>
            Finally Take Project
          </Button>
        </Grid>
        <Grid>
          <Button variant="text" sx={{ mr: 1 }}>
            Edit
          </Button>
        </Grid>
        <Grid>
          <Button variant="text" sx={{ mr: 1 }}>
            Reject
          </Button>
        </Grid>
      </>
    ),
  },
];

export const contractorRejectedQuotation: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "clientDetails",
    headerName: "Client Details",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
    renderCell: (e) => {
      return (
        <Grid>
          <Typography>{e.row.fullName}</Typography>
          <Typography>{e.row.username}</Typography>
        </Grid>
      );
    },
  },
  {
    field: "designTypeImage",
    headerName: "Design Image",
    flex: 0.8,
    maxWidth: 100,
    sortable: false,
    renderCell: (params) => {
      return <img src={params.value} alt="" style={{ width: "98px", height: "96px" }} />;
    },
  },
  {
    field: "estimationDetails",
    headerName: "Estimation & Product Details",
    flex: 1.8,
    minWidth: 240,
    sortable: false,
    renderCell: (e) => {
      let length = e.row.length.toString().split(".");
      let width = e.row.width.toString().split(".");
      const destinationSqFt = CalculateSqfeet(parseInt(length[0]), parseInt(length[1] === undefined ? "0" : length[1]), parseInt(width[0]), parseInt(width[1] === undefined ? "0" : width[1]));
      return (
        <Grid sx={{ padding: "4px" }}>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Estimation No.: </span>
            <b style={{ marginLeft: 8 }}>{"AUG" + e.row.id}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Service:</span>
            <b style={{ marginLeft: 8 }}>{e.row.serviceName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Category:</span>
            <b style={{ marginLeft: 8 }}>{e.row.categoryName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Product:</span>
            <b style={{ marginLeft: 8 }}>{e.row.productName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Design Type:</span>
            <b style={{ marginLeft: 8 }}>{e.row.designTypeName}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Design No.:</span>
            <b style={{ marginLeft: 8 }}>{"DS-" + e.row.designTypeID}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Total Sq.Ft.:</span>
            <b style={{ marginLeft: 8 }}>{destinationSqFt.toFixed(4)}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Material Cost:</span>
            <b style={{ marginLeft: 8 }}>{e.row.subtotalAmount.toFixed(4)}</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: "8px" }}>
            <span>Labour Cost:</span>
            <b style={{ marginLeft: 8 }}>{e.row.labourCost.toFixed(4)}</b>
          </Typography>
        </Grid>
      );
    },
  },
  {
    field: "approvalStatus",
    headerName: "Status",
    flex: 1,
    maxWidth: 100,
    sortable: false,
    renderCell: (params) => {
      return "Rejected";
    },
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    sortable: false,
  },
];

export const searchClientColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.5,
    sortable: false,
  },
  {
    field: "companyName",
    headerName: "Name / Company Name",
    flex: 1,
  },
  {
    field: "contactMobileNumber",
    headerName: "Mobile No.",
    flex: 1,
  },

  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 2,
    renderCell: (e) => (
      <Grid>
        <Button variant="text" sx={{ mr: 1 }}>
          Add to My Client List
        </Button>
      </Grid>
    ),
  },
];

export const employeeSearchResult: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "employeeName",
    headerName: "Employee Name / Code",
    flex: 1.3,
    minWidth: 120,
  },
  {
    field: "aadharNo",
    headerName: "Aadhar No",
    flex: 1.3,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "mobileNo",
    headerName: "Mobile No",
    flex: 1.3,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1.5,
    minWidth: 100,
    sortable: false,
    renderCell: (e) => (
      <Grid>
        <Button variant="text" sx={{ mr: 1 }}>
          Add to My Employee List
        </Button>
      </Grid>
    ),
  },
];

export const approvedColumns:GridColDef[]=[
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
  {
    field: "company",
    headerName: "Company & Contact Details",
    flex: 4,
    minWidth: 160,
    renderCell: (params) => (
      <div>
        <Typography>{NullOrEmpty(params.row.company) ? "" : params.row.company.split(',')[0]}</Typography>
        <Typography>{NullOrEmpty(params.row.company) ? "" : params.row.company.split(',')[1]}</Typography>
        <Typography>{NullOrEmpty(params.row.company) ? "" : params.row.company.split(',')[2]}</Typography>
      </div>
    )
  },
   {
    field: "activityRoleName",
    headerName: "Activity Role",
    flex: 1.8,
    minWidth: 140,
    sortable: false,
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1.5,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "designation",
    headerName: "Designation",
    flex: 1.5,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "username",
    headerName: "User Name",
    flex: 1.5,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "password",
    headerName: "Password",
    flex: 1.5,
    minWidth: 140,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1.5,
    maxWidth: 100,
    sortable: false,
    renderCell: (e) => (
      <Grid>
        <label>Approved</label>
      </Grid>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 2,
    maxWidth: 100,
    renderCell: (e) => (
      <Grid>
        <Button variant="text" sx={{ mr: 1 }}>
          Decline
        </Button>
      </Grid>
    ),
  },

];

export const declinedColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "role",
    headerName: "Role",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "companyName",
    headerName: "ComapnyName",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "contactName",
    headerName: "Contact Name",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "mobileNo",
    headerName: "Mobile No",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "status",
    headerName: "Status",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "action",
    headerName: "Action",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
];

export const pendingColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "role",
    headerName: "Role",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "companyName",
    headerName: "ComapnyName",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "contactName",
    headerName: "Contact Name",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "mobileNo",
    headerName: "Mobile No",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "status",
    headerName: "Status",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
   {
    field: "action",
    headerName: "Action",
    flex: 0.8,
    minWidth: 60,
    sortable: false,
  },
];
import { GridColDef } from "@mui/x-data-grid";

export const categoryColumns: GridColDef[] = [
  {
    field: "srno",
    headerName: "Sr. No.",
    flex: 0.8,
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
    field: "hsnSacCode",
    headerName: "HSN / SAC Code",
    flex: 1.6,
    minWidth: 130,
  },
  {
    field: "gstRate",
    headerName: "GST Rate",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "unitOfSales",
    headerName: "Unit of Sales",
    flex: 1.5,
    minWidth: 120,
  },
  {
    field: "display",
    headerName: "Display",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
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
    field: "activityName",
    headerName: "Activity Name",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "activityDisplay",
    headerName: "Display",
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
  }];

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
      field: "serviceDisplay",
      headerName: "Display",
      flex: 1.8,
      minWidth: 140,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
    }];

    export const unitColumns: GridColDef[] = [
      {
        field: "srno",
        headerName: "Sr. No.",
        flex: 0.8,
        minWidth: 60,
      },
      {
        field: "unit",
        headerName: "Unit Name",
        flex: 1.8,
        minWidth: 140,
      },
      {
        field: "unitDisplay",
        headerName: "Display",
        flex: 1.8,
        minWidth: 140,
      },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        minWidth: 100,
      }];

      export const productColumns: GridColDef[] = [
        {
          field: "srno",
          headerName: "Sr. No.",
          flex: 0.8,
          minWidth: 60,
        },
        {
          field: "activityRoleName",
          headerName: "Activity Role Name",
          flex: 1.8,
          minWidth: 140,
        },{
          field: "serviceName",
          headerName: "Service Name",
          flex: 1.8,
          minWidth: 140,
        },{
          field: "categoryName",
          headerName: "Category Name",
          flex: 1.8,
          minWidth: 140,
        },{
          field: "productCode",
          headerName: "Product Code",
          flex: 1.8,
          minWidth: 140,
        },{
          field: "productName",
          headerName: "Product Name",
          flex: 1.8,
          minWidth: 140,
        },{
          field: "unitOfSales",
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
        }];
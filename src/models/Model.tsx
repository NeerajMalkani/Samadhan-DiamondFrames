export interface ActivityRoleNameModel {
  id: number;
  srno: number;
  activityRoleName: string;
  display: string;
  action: string;
}

export interface CategoryModel {
  id: number;
  srno: number;
  activityRoleName: string;
  serviceName: string;
  categoryName: string;
  productName: string;
  hsnsacCode: string;
  gstRate: string;
  unitID: string;
  unitName: string;
  display: string;
  action: string;
  serviceID: number;
  roleID: number;
}

export interface ProductModel {
  id: number;
  srno: number;
  activityRoleName: string;
  serviceName: string;
  categoryName: string;
  productCode: string;
  productName: string;
  hsnSacCode: string;
  gstRate: number;
  unitName: string;
  display: string;
  action: string;
  serviceID: number;
  unitOfSalesID: number;
  categoryID: number;
  activityID: number;
  productID: number;
  alternateUnitOfSales: number;
  rateWithMaterials: number;
  rateWithoutMaterials: number;
  serviceDisplay: string;
  shortSpecification: string;
  specification: string;
  unit1ID: number;
  unit1Name: string;
  unit2ID: number;
  unit2Name: string;
  selectedUnitID: number;
}
//  {
//   id: number;
//   srno: number;
//   activityRoleName: string;
//   serviceName: string;
//   categoryName: string;
//   productCode: string;
//   productName: string;
//   hsnSacCode: string;
//   gstRate: number;
//   unitName: string;
//   display: string;
//   action: string;
//   serviceID: number;
//   unitOfSalesID: number;
//   categoryID: number;
//   activityID: number;
//   productID: number;

// }

export interface ServiceNameModel {
  id: number;
  srno: number;
  serviceName: string;
  display: string;
  action: string;
}

export interface UnitOfSalesModel {
  id: number;
  srno: number;
  display: string;
  action: string;
  displayUnit: string;
  unit1Name: string;
  unit1ID: number;
  unit2Name: string;
  unit2ID: number;
}

export interface UserCreds {
  UserID: number;
  FullName: string;
}

export interface RoleDetails {
  roleID: number;
  roleName: string;
  roleCount: number;
}

export interface DepartmentNameModel {
  id: number;
  srno: number;
  departmentName: string;
  display: string;
  action: string;
}

export interface DesignationNameModel {
  id: number;
  srno: number;
  designationName: string;
  display: string;
  action: string;
}

export interface EWayBillModel {
  id: number;
  srno: number;
  stateName: string;
  inStateLimit: number;
  interStateLimit: number;
  display: string;
  action: string;
}

export interface LocationTypeModel {
  id: number;
  srno: number;
  serviceName: string;
  activityName: string;
  branchType: string;
  display: string;
  action: string;
}


export interface WorkfloorNameModel {
  id: number;
  srno: number;
  workFloorName: string;
  display: string;
  action: string;
}

export interface WorkLocationNameModel {
  id: number;
  srno: number;
  workLocationName: string;
  display: string;
  action: string;
}


export interface DesignTypeModel {
  id: number;
  srno: number;
  serviceName: string;
  categoryName: string;
  productName: string;
  designTypeName:string;
  display: string;
  action: string;
  serviceID: number;
  categoryID: number;
  activityID: number;
  productID: number;
  serviceDisplay: string;
}
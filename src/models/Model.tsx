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
  unitName: string;
  display: string;
  action: string;
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

export interface ActivityRoleNameModel {
   id: number;
   srno:number;
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
  hsnsacCode: string;
  gstRate: string;
  unitID: string;
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
  unitOfSales: string;
  display: string;
  action: string;
}

export interface ServiceNameModel {
  id: number;
  srno:number;
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

export interface UserCreds{
  UserID:number,
  FullName:string
}

export interface RoleDetails{
  roleID:number,
  roleName:string,
  roleCount:number
}
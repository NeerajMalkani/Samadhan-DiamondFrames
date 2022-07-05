import React, { Dispatch, SetStateAction } from "react";
import {
  ActivityRoleNameModel,
  CategoryModel,
  ServiceNameModel,
  UnitOfSalesModel,
  ProductModel,
  DepartmentNameModel,
  DesignationNameModel,
  EWayBillModel,
} from "../models/Model";

const activityNames: ActivityRoleNameModel[] = [];
const activityNamesList: [
  ActivityRoleNameModel[],
  Dispatch<SetStateAction<ActivityRoleNameModel[]>>
] = [activityNames, () => {}];

const serviceName: ServiceNameModel[] = [];
const serviceNameList: [
  ServiceNameModel[],
  Dispatch<SetStateAction<ServiceNameModel[]>>
] = [serviceName, () => {}];

const unitOfSales: UnitOfSalesModel[] = [];
const unitOfSalesList: [
  UnitOfSalesModel[],
  Dispatch<SetStateAction<UnitOfSalesModel[]>>
] = [unitOfSales, () => {}];

const category: CategoryModel[] = [];
const categoryList: [
  CategoryModel[],
  Dispatch<SetStateAction<CategoryModel[]>>
] = [category, () => {}];

const product: ProductModel[] = [];
const productList: [ProductModel[], Dispatch<SetStateAction<ProductModel[]>>] =
  [product, () => {}];

const departmentNames: DepartmentNameModel[] = [];
const departmentNamesList: [
  DepartmentNameModel[],
  Dispatch<SetStateAction<DepartmentNameModel[]>>
] = [departmentNames, () => {}];

const designationNames: DesignationNameModel[] = [];
const designationNamesList: [
  DesignationNameModel[],
  Dispatch<SetStateAction<DesignationNameModel[]>>
] = [designationNames, () => {}];

const eWayBill: EWayBillModel[] = [];
const eWayBillList: [
  EWayBillModel[],
  Dispatch<SetStateAction<EWayBillModel[]>>
] = [eWayBill, () => {}];

const DataContext = React.createContext({
  categoryList: categoryList,
  activityNamesList: activityNamesList,
  unitOfSalesList: unitOfSalesList,
  serviceNameList: serviceNameList,
  productList: productList,
  departmentNamesList: departmentNamesList,
  designationNamesList: designationNamesList,
  eWayBillList: eWayBillList,
});

const DataContextProvider = DataContext.Provider;
const DataContextConsumer = DataContext.Consumer;

export { DataContext as default, DataContextProvider, DataContextConsumer };

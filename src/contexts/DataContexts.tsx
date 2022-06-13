import React, { Dispatch, SetStateAction } from "react";
import ActivityRoleNameModel from "../models/ActivityRoleModel";
import CategoryModel from "../models/CategoryModel";
import ServiceNameModel from "../models/ServiceNameModel";
import UnitOfSalesModel from "../models/UnitOfSalesModel";
import ProductModel from "../models/ProductModel";

const activityNames: ActivityRoleNameModel[] = [];
const activityNamesList: [ActivityRoleNameModel[], Dispatch<SetStateAction<ActivityRoleNameModel[]>>] = [activityNames, () => {}];

const serviceName: ServiceNameModel[] = [];
const serviceNameList: [ServiceNameModel[], Dispatch<SetStateAction<ServiceNameModel[]>>] = [serviceName, () => {}];

const unitOfSales: UnitOfSalesModel[] = [];
const unitOfSalesList: [UnitOfSalesModel[], Dispatch<SetStateAction<UnitOfSalesModel[]>>] = [unitOfSales, () => {}];

const category: CategoryModel[] = [];
const categoryList: [CategoryModel[], Dispatch<SetStateAction<CategoryModel[]>>] = [category, () => {}];

const product: ProductModel[] = [];
const productList: [ProductModel[], Dispatch<SetStateAction<ProductModel[]>>] = [product, () => {}];

const DataContext = React.createContext({ categoryList: categoryList, activityNamesList: activityNamesList, unitOfSalesList: unitOfSalesList, serviceNameList: serviceNameList, productList:productList });

const DataContextProvider = DataContext.Provider;
const DataContextConsumer = DataContext.Consumer;

export { DataContext as default, DataContextProvider, DataContextConsumer };

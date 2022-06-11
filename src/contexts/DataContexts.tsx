import React, { Dispatch, SetStateAction } from "react";
import ActivityRoleNameModel from "../models/ActivityRoleModel";
import CategoryModel from "../models/CategoryModel";
import ServiceNameModel from "../models/ServiceNameModel";
import UnitOfSalesModel from "../models/UnitOfSalesModel";

const activityNames: ActivityRoleNameModel[] = [];
const activityNamesList: [ActivityRoleNameModel[], Dispatch<SetStateAction<ActivityRoleNameModel[]>>] = [activityNames, () => {}];

const serviceName: ServiceNameModel[] = [];
const serviceNameList: [ServiceNameModel[], Dispatch<SetStateAction<ServiceNameModel[]>>] = [serviceName, () => {}];

const unitOfSales: UnitOfSalesModel[] = [];
const unitOfSalesList: [UnitOfSalesModel[], Dispatch<SetStateAction<UnitOfSalesModel[]>>] = [unitOfSales, () => {}];

const category: CategoryModel[] = [];
const categoryList: [CategoryModel[], Dispatch<SetStateAction<CategoryModel[]>>] = [category, () => {}];

const DataContext = React.createContext({ categoryList: categoryList, activityNamesList: activityNamesList, unitOfSalesList: unitOfSalesList, serviceNameList: serviceNameList });

const DataContextProvider = DataContext.Provider;
const DataContextConsumer = DataContext.Consumer;

export { DataContext as default, DataContextProvider, DataContextConsumer };

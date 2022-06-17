import ActivityRoleNameModel from "../models/ActivityRoleModel";
import CategoryModel from "../models/CategoryModel";
import ServiceNameModel from "../models/ServiceNameModel";
import UnitOfSalesModel from "../models/UnitOfSalesModel";
import ProductModel from "../models/ProductModel";

export const ActivityRoleDataDummy: ActivityRoleNameModel[] = [
  // {roleID: 1, activityName: "Dealer", activityDisplay:"Yes", action:"" },
  // {  srno: 2, activityName: "Contractor", activityDisplay:"No", action:"" },
];
export const ServiceNameDataDummy: ServiceNameModel[] = [
  // { id: 1, srno: 1, serviceName: "GYPSUM & POP", serviceDisplay:"Yes", action:"" },
  // { id: 2, srno: 2, serviceName: "PLY,WOOD & FURNITURE", serviceDisplay:"Yes", action:""  },
  // { id: 3, srno: 3, serviceName: "IRON & STEEL", serviceDisplay:"Yes", action:""  },
];
export const UnitOfSalesDataDummy: UnitOfSalesModel[] = [
  // { id: 1, srno: 1, unit: "Sq.Ft / Sq.Mtr", unitDisplay:"Yes", action:"" },
  // { id: 2, srno: 2, unit: "R.Ft / R.Mtr", unitDisplay:"Yes", action:"" },
  // { id: 3, srno: 3, unit: "Cu.Ft / Cu.Mtr", unitDisplay:"Yes", action:"" },
  // { id: 4, srno: 4, unit: "Nos / Kg", unitDisplay:"Yes", action:"" },
  // { id: 5, srno: 5, unit: "Bag / Kg", unitDisplay:"Yes", action:"" },
  // { id: 6, srno: 6, unit: "Kg / Tone", unitDisplay:"Yes", action:"" },
  // { id: 7, srno: 7, unit: "Nos / Nos.", unitDisplay:"Yes", action:"" },
  // { id: 8, srno: 8, unit: "Packet / No", unitDisplay:"Yes", action:"" },
  // { id: 9, srno: 9, unit: "BUCKET / KG", unitDisplay:"Yes", action:"" },
];

export const ProductDataDummy: ProductModel[] = [
  // { id: 1, srno: 1, activityRoleName: "",serviceName:"",categoryName:"",productCode:"",productName:"", hsnSacCode:"",gstRate:18,unitOfSales: "Sq.Ft / Sq.Mtr", display:"Yes", action:"Edit" },
  // { id: 2, srno: 2,  activityRoleName: "",serviceName:"",categoryName:"",productCode:"",productName:"",  hsnSacCode:"",gstRate:18,unitOfSales: "R.Ft / R.Mtr", display:"Yes", action:"Edit" },
  // { id: 3, srno: 3,  activityRoleName: "",serviceName:"",categoryName:"",productCode:"",productName:"", hsnSacCode:"",gstRate:18, unitOfSales: "Cu.Ft / Cu.Mtr", display:"Yes", action:"Edit" }
];

export const CategoryDataDummy: CategoryModel[] = [{ id: 1, srno: 1, activityRoleName: "Dealer", serviceName: "GYPSUM & POP", categoryName: "GI Frames", hsnSacCode: "73089090", gstRate: 18.0, unitOfSales: "Nos / Kg", display: "Yes", action: "" }];

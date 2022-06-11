import ActivityRoleNameModel from "../models/ActivityRoleModel";
import CategoryModel from "../models/CategoryModel";
import ServiceNameModel from "../models/ServiceNameModel";
import UnitOfSalesModel from "../models/UnitOfSalesModel";

export const ActivityRoleDataDummy: ActivityRoleNameModel[] = [
  { id: 1, srno: 1, activityName: "Dealer" },
  { id: 2, srno: 2, activityName: "Contractor" },
];
export const ServiceNameDataDummy: ServiceNameModel[] = [
  { id: 1, srno: 1, serviceName: "GYPSUM & POP" },
  { id: 2, srno: 2, serviceName: "PLY,WOOD & FURNITURE" },
  { id: 3, srno: 3, serviceName: "IRON & STEEL" },
];
export const UnitOfSalesDataDummy: UnitOfSalesModel[] = [
  { id: 1, srno: 1, unit: "Sq.Ft / Sq.Mtr" },
  { id: 2, srno: 2, unit: "R.Ft / R.Mtr" },
  { id: 3, srno: 3, unit: "Cu.Ft / Cu.Mtr" },
  { id: 4, srno: 4, unit: "Nos / Kg" },
  { id: 5, srno: 5, unit: "Bag / Kg" },
  { id: 6, srno: 6, unit: "Kg / Tone" },
  { id: 7, srno: 7, unit: "Nos / Nos." },
  { id: 8, srno: 8, unit: "Packet / No" },
  { id: 9, srno: 9, unit: "BUCKET / KG" },
];
export const CategoryDataDummy: CategoryModel[] = [{ id: 1, srno: 1, activityRoleName: "Dealer", serviceName: "GYPSUM & POP", categoryName: "GI Frames", hsnSacCode: "73089090", gstRate: 18.0, unitOfSales: "Nos / Kg", display: "Yes", action: "" }];

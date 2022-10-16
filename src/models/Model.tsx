import { NumericLiteral } from "typescript";

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

export interface UnitModel {
  id: number;
  unitName: string;
}

export interface UnitWithConversionModel {
  id: number;
  unitID: number;
  unitName: string;
  conversionRate: number;
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
  conversionRate: number;
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
  isChecked: boolean;
}

export interface RateCardProductModel {
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
  conversionRate: number;
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
  isChecked: boolean;
  footRate:string;
  meterRate:string;
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
  serviceID: number;
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

export interface BranchModel {
  regionalOfficeID:number;
  branchType: string;
  branchTypeID: number;
  branchAdminID:number;
  contactPersonNo:string;
  locationName:string;
  stateID:number;
  cityID:number;
  branchAdmin:string;
  pincode:number;
  accountNo:string;
  bankName:string;
  bankBranchName:string;
  ifscCode:string;
  address:string;
  gstNo: string;
  panNo: string;
  display: string;

}

export interface BranchTypeModel {
  id: number;
  branchType: string;
  assignBranch: string;
  isUT: string;
  isActive: string;
}

export interface RegionalOfficeModel {
  id: number;
  locationName: string;
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
  reportingAuthority: string;
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
  designTypeName: string;
  display: string;
  action: string;
  serviceID: number;
  categoryID: number;
  activityID: number;
  productID: number;
  serviceDisplay: string;
  designImage: string;
}

export interface PostNewDesignModel {
  id: number;
  srno: number;
  serviceName: string;
  categoryName: string;
  productName: string;
  designTypeName: string;
  designTypeID: number;
  display: string;
  action: string;
  serviceID: number;
  categoryID: number;
  activityID: number;
  productID: number;
  serviceDisplay: string;
  designNumber: string;
  designImage: string;
  labourCost: string;
  workLocationID: number;
  workLocationName: string;
}

export interface BrandNameModel {
  id: number;
  srno: number;
  brandName: string;
  display: string;
  action: string;
}

export interface BrandModel {
  id: number;
  srno: number;
  brandName: string;
  serviceName: string;
  serviceID: number;
  categoryName: string;
  categoryID: number;
  hsnCode: string;
  gst: string;
  brandPrefixName: string;
  brandID: number;
  unitOfSale: string;
  unitID: number;
  unitName: string;
  unitName2: string;
  unitOfSalesID: number;
  unitOfSalesID2: number;
  generalDiscount: string;
  appProviderDiscount: string;
  referralPoints: string;
  contractorDiscount: string;
  display: string;
  action: string;
}

export interface ImageDataModel {
  id: number;
  url: string;
  title: string;
}

export interface ProductSetupModel {
  id: number;
  srno: number;
  brandName: string;
  productName: string;
  brandID: number;
  productID: number;
  image: string;
  description: string;
  unitOfSale: string;
  unitID: number;
  price: string;
  unitValue: string;
  display: string;
  action: string;
}

export interface BuyerCategoryModel {
  id: number;
  srno: number;
  buyerCategoryName: string;
  display: string;
  action: string;
}

export interface StateModel {
  id: number;
  stateName: string;
  isUT: string;
  isActive: string;
}

export interface CityModel {
  id: number;
  cityName: string;
  stateID: number;
  isActive: string;
}

export interface BloodGroupModel {
  ID: number;
  Name: string;
}

export interface DOBModel {
  id: number;
  dateOfBirth: string;
  dateOfBirthID: number;
  isActive: string;
}

export interface DOJModel {
  id: number;
  dateOfJoin: string;
  dateOfJoinID: number;
  isActive: string;
}

export interface BranchModel {
  id: number;
  locationName: string;
  isActive: string;
}

export interface UserModel {
  userID: number;
  fullName: string;
  userName: string;
  password: string;
  roleID: number;
  OTP: number;
  isVerifird: string;
  addressLine: string;
  stateID: number;
  cityID: number;
  pincode: number;
}

export interface CompanyModel {
  id: number;
  CompanyID: number;
  UserID: number;
  CompanyName: string;
  CompanyNamePrefix: string;
  EmpoyeeCodePrefix: string;
  QuotationNumberPrefix: string;
  CompanyLogo: string;
  CreationTStamp: string;
  display: string;
  ContactPersonName: string;
  ContactPersonNumber: string;
}

export interface UserProfile {
  id: number;
  CompanyID: number;
  UserID: number;
  ContactPersonName: string;
  ContactPersonNumber: string;
  CompanyName: string;
  AddressLine: string;
  StateName: string;
  CityName: string;
  StateID: number;
  CityID: number;
  Pincode: number;
  GSTNumber: string;
  PAN: string;
}

export interface MaterialSetupModel {
  id: number;
  srno: number;
  categoryID: number;
  categoryName: string;
  designTypeID: number;
  designTypeName: string;
  display: string;
  length: number;
  productID: number;
  productName: string;
  serviceID: number;
  serviceName: string;
  width: number;
  action: string;
  subtotal: string;
}

export interface ImageGalleryEstimation {
  categoryID: number;
  categoryName: string;
  designImage: string;
  designNumber: string;
  designTypeID: number;
  designTypeName: string;
  id: number;
  productID: number;
  productName: string;
  serviceID: number;
  serviceName: string;
  workLocationID: number;
  workLocationName: string;
}

export interface ButtonSettings {
  isActionButton: boolean;
  actionButtons: Array<ActionButtons>;
}

export interface ActionButtons {
  title: string;
  type: "text" | "outlined" | "contained";
  callBack: Function;
}

export interface EstimationCostDetails {
  id: number;
  labourCost: number;
  length: number;
  materialCostPerSqFeet: number;
  status: boolean;
  width: number;
}

export interface ProductItemModel {
  amount: string;
  brandName: string;
  formula: string;
  generalDiscount: number;
  length: number;
  materialSetupID: number;
  productName: string;
  quantity: string;
  rate: string;
  width: number;
  productID: number;
  brandID: number;
}

export interface YourEstimationModel {
  designTypeID: number;
  designTypeName: string;
  id: number;
  length: number;
  productName: string;
  status: boolean;
  totalAmount: number;
  width: number;
}

export interface EmployeeModel {
  id: number;
  srno: number;
  employeeName: string;
  mobileNo: string;
  branchName: string;
  departmentName: string;
  designationName: string;
  profileStatus: boolean;
  loginStatus: boolean;
  verifyStatus: boolean;
  otp: number;
  action: string;
  rateUnit: string;
  altRateUnit: string;
  material: string;
}

export interface RateCardModel {
  id: number;
  productID: number;
  activityID: number;
  serviceID: number;
  categoryID: number;
  selectedUnitID: number;
  unitOfSalesID: number;
  rateWithMaterials: number;
  rateWithoutMaterials: number;
  altRateWithMaterials: number;
  altRateWithoutMaterials: number;
  alternateUnitOfSales: number;
  shortSpecification: string;
  specification: string;
  serviceName: string;
  categoryName: string;
  productName: string;
  selectedUnitName: string;
  unit1Name: string;
  unit2Name: string;
  unit1ID: number;
  unit2ID: number;
  conversionRate: number;
  srno: number;
  serviceProductName: string;
  display: string;
  action: string;
}

export interface SendRateCardModel{
  id:number;
  clientName:string;
  contactNo:string;
  unit:string;
  inclusiveMaterials:string;
  sendStatus:string;
  action:string;
}

export interface ProductDetailsModel{
  id:number;
  serviceName:string;
  categoryName:string;
  productName:string;
  unit:string;
  rate:string;
  action:string;
}

export interface QuotationProductDetailsModel{
  productName:string;
  unit:string;
  quantity:string;
  rate:string;
  amount:string;
  remarks:string;
  action:string;
}

export interface ClientModel {
  id: number;
  srno: number;
  address1: string;
  cityID: number;
  cityName: string;
  companyName: string;
  contactMobileNumber: string;
  contactPerson: string;
  display: string;
  gstNumber: string;
  pan: string;
  pincode: string;
  serviceType: number;
  stateID: number;
  stateName: string;
  addedBy: boolean;
}

export interface QuotationDataModel {
  id: number;
  srno: number;
  designTypeID: number;
  fullName: string;
  username: string;
  serviceName: string;
  categoryName: string;
  designTypeName: string;
  designTypeImage: string;
  productName: string;
  length: number;
  width: number;
  subtotalAmount: number;
  labourCost: number;
  totalAmount: number;
  status: boolean;
  approvalStatus: number;
}

export interface ReportNameModel {
  id: number;
  employee: string;
}

export interface IdCardModel {
  id: number;
  idCard: string;
  idCardID: number;
  isActive: string;
}


export interface ApprovredModel {
  id: number;
  userID: number;
  srno: number;
  company: string;
  activityrole: string;
  department: string;
  designation: string;
  username: string;
  password: string;
  status: boolean;
  action: boolean;
}

export interface PendingModel {
  id: number;
  srno: number;
  role: string;
  companyName: string;
  contactName: string;
  mobileNo: number;
  status: boolean;
  action: boolean;
}
export interface DeclinedModel {
  id: number;
  userID: number;
  srno: number;
  company: string;
  activityrole: string;
  department: string;
  designation: string;
  username: string;
  password: string;
  status: boolean;
  action: boolean;
}

export interface QuotationSendPendingModel {
  id: number;
  srno: number;
  quotationNo: string;
  projectName:string;
  clientContactPersonNumber:string;
  quotationUnit:string;
  materials:string;
  status: boolean;
  action: boolean;
}

export interface QuotationApprovePendingModel {
  id: number;
  srno: number;
  quotationNo: string;
  projectName:string;
  clientContactPersonNumber:string;
  quotationUnit:string;
  materials:string;
  clientStatus:number;
  quotationStatus:number;
  action: boolean;
}

export interface QuotationApprovedModel {
  id: number;
  srno: number;
  quotationNo: string;
  projectName:string;
  clientContactPersonNumber:string;
  quotationUnit:string;
  materials:string;
  status: boolean;
  action: boolean;
}

export interface QuotationRejectedModel {
  id: number;
  srno: number;
  quotationNo: string;
  projectName:string;
  clientContactPersonNumber:string;
  quotationUnit:string;
  materials:string;
  status: boolean;
 }
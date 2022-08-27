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
  CompanyName: string;
  BranchName: string;
  AccountNo: number;
  Address: string;
  BankName: string;
  BankBranchName: string;
  ContactPersonNo: number;
  GST: string;
  Pan: string;
  Pincode: number;
  IfscCode: number;
}

export interface BranchTypeModel {
  id: number;
  branchType: string;
  assignBranch: string;
  isUT: string;
  isActive: string;
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
  id: number;
  bloodGroup: string;
  bloodGroupID: number;
  isActive: string;
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
  branchName: string;
  branchID: number;
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
  amount: number;
  brandName: number;
  formula: number;
  generalDiscount: number;
  length: number;
  materialSetupID: number;
  productName: string;
  quantity: number;
  rate: number;
  width: number;
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
  profileStatus: string;
  loginStatus: string;
  verifyStatus: string;
  action: string;
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
}

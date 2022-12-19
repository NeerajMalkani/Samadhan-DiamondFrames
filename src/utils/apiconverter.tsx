export const APIConverter = (response: any, type?: string) => {
  function renameKey(obj: any, oldKey: string, newKey: string) {
    if (obj.hasOwnProperty(oldKey)) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  }

  response.forEach((obj) => {
    if (type == "addbranch") {
      renameKey(obj, "locationtype_refno", "branchTypeID");
      renameKey(obj, "gst_no", "gstNo");
      renameKey(obj, "pan_no", "panNo");
    }

    if (type == "employee") {
      renameKey(obj, "myemployee_refno", "employeeID");
      renameKey(obj, "aadhar_no", "aadharNo");
    }

    renameKey(obj, "product_refno", "productID");
    renameKey(obj, "product_name", "productName");
    renameKey(obj, "product_refno", "id");
    renameKey(obj, "category_refno", "id");
    renameKey(obj, "category_name", "categoryName");
    renameKey(obj, "group_refno_name", "activityRoleName");
    renameKey(obj, "group_refno", "id");
    renameKey(obj, "group_name", "activityRoleName");
    renameKey(obj, "service_refno_name", "serviceName");
    renameKey(obj, "service_refno", "id");
    renameKey(obj, "service_name", "serviceName");
    renameKey(obj, "unit_category_names", "unitName");
    renameKey(obj, "unit_category_name", "unitName");
    renameKey(obj, "unit_category_refno", "id");
    renameKey(obj, "unit_name_text", "displayUnit");
    renameKey(obj, "convert_unit_name", "convertUnitName");
    renameKey(obj, "hsn_sac_code", "hsnsacCode");
    renameKey(obj, "gst_rate", "gstRate");
    renameKey(obj, "view_status", "display");
    renameKey(obj, "product_code", "productCode");
    renameKey(obj, "unit_display_name", "displayUnit");
    renameKey(obj, "unit_name_convert_unit_name", "displayUnitFull");
    renameKey(obj, "unit_name", "displayUnit");
    renameKey(obj, "unitcategoryrefno_unitrefno", "unitId");
    renameKey(obj, "with_material_rate", "rateWithMaterials");
    renameKey(obj, "without_material_rate", "rateWithoutMaterials");
    renameKey(obj, "short_desc", "shortSpecification");
    renameKey(obj, "actual_unitname", "selectedUnit");
    renameKey(obj, "convert_unitname", "convertedUnit");
    renameKey(obj, "service_product_refno", "productID");
    renameKey(obj, "locationtype_refno", "id");
    renameKey(obj, "service_refno_name", "serviceName");
    renameKey(obj, "locationtype_name", "branchType");
    renameKey(obj, "workfloor_refno", "id");
    renameKey(obj, "workfloor_name", "workFloorName");
    renameKey(obj, "worklocation_refno", "id");
    renameKey(obj, "worklocation_name", "workLocationName");
    renameKey(obj, "designtype_refno", "id");
    renameKey(obj, "designtype_name", "designTypeName");
    renameKey(obj, "designtype_image_url", "designImage");
    renameKey(obj, "materials_setup_refno", "id");
    renameKey(obj, "service_product_name", "productName");
    renameKey(obj, "matrails_cost", "materialCost");
    renameKey(obj, "dealer_product_refno", "productID");
    renameKey(obj, "brand_refno", "brandID");
    renameKey(obj, "brand_name", "brandName");
    renameKey(obj, "company_product_refno", "productID");
    renameKey(obj, "company_product_price", "price");
    renameKey(obj, "company_brand_refno", "brandID");
    renameKey(obj, "company_brand_name", "brandName");
    renameKey(obj, "designgallery_refno", "id");
    renameKey(obj, "design_image_url", "designImage");
    renameKey(obj, "labour_cost", "labourCost");
    renameKey(obj, "design_no", "designNumber");
    renameKey(obj, "department_refno", "id");
    renameKey(obj, "department_name", "departmentName");
    renameKey(obj, "designation_refno", "id");
    renameKey(obj, "ewaybill_refno", "id");
    //
    renameKey(obj, "Sess_UserRefno", "UserID");
    renameKey(obj, "company_name", "companyName");
    if (type != "addbranch") {
      renameKey(obj, "address", "addressLine");
    }

    renameKey(obj, "mobile_no", "contactPersonNumber");
    renameKey(obj, "aadhar_no", "aadhar");
    renameKey(obj, "father_name", "fatherName");
    renameKey(obj, "bloodgroup_refno", "bloodGroupID");

    renameKey(obj, "dob", "DOB");
    renameKey(obj, "doj", "DOJ");
    renameKey(obj, "emergency_contact_name", "emergencyCName");
    renameKey(obj, "emergency_contact_no", "emergencyContactNo");
    renameKey(obj, "bank_account_no", "accountNumber");
    renameKey(obj, "bank_branch_name", "branchName");
    renameKey(obj, "bank_name", "bankName");
    renameKey(obj, "company_logo_url", "companyLogo");
    renameKey(obj, "company_name_prefix", "companyNamePrefix");
    renameKey(obj, "employee_code_prefix", "employeeCodePrefix");
    renameKey(obj, "firstname", "contactPersonName");

    renameKey(obj, "gst_no", "gstNumber");
    renameKey(obj, "pan_no", "pan");
    renameKey(obj, "location_name", "locationName");
    renameKey(obj, "ifsc_code", "ifscCode");
    renameKey(obj, "state_refno", "stateID");
    renameKey(obj, "state_name", "stateName");
    renameKey(obj, "quotation_no_prefix", "quotationBudgetPrefix");
    renameKey(obj, "district_name", "cityName");
    renameKey(obj, "district_refno", "cityID");
    renameKey(obj, "so_prefix", "salesOrderPrefix");
    renameKey(obj, "po_prefix", "purchaseOrderPrefix");
    renameKey(obj, "if_create_brand", "showBrand");

    // renameKey(obj, "company_refno", "branchName");
    renameKey(obj, "designation_name", "designationName");
    renameKey(obj, "formula_parameter1", "formula");
    renameKey(obj, "qty", "quantity");
    renameKey(obj, "rate", "price");

    renameKey(obj, "brand_master_refno", "id");
    renameKey(obj, "brand_name", "brandName");
    renameKey(obj, " buyercategory_refno", "id");
    renameKey(obj, " buyercategory_name", "buyerCategoryName");

    renameKey(obj, "department_refno_name", "departmentName");
    renameKey(obj, "mydepartment_refno", "departmentID");

    renameKey(obj, "designation_refno_name", "designationName");
    renameKey(obj, "mydesignation_refno", "designationID");
    renameKey(obj, "reporting_status", "reportingAuthority");

    renameKey(obj, "employee_name", "employeeName");
    renameKey(obj, "employee_name", "addEmployeeName");
    renameKey(obj, "branchname", "branchName");
    renameKey(obj, "common_employee_code", "employeeCode");
    renameKey(obj, "departmentname", "departmentName");
    renameKey(obj, "designationname", "designationName");
    renameKey(obj, "employee_active_status", "loginStatus");
    renameKey(obj, "employee_mobile_no", "mobileNo");
    renameKey(obj, "mobile_no_Result", "mobileNo");
    renameKey(obj, "aadharno_Result", "adhaarNo");
    renameKey(obj, "mobile_OTP_verify_status", "verifyStatus");
    renameKey(obj, "profie_update_status", "profileStatus");
    renameKey(obj, "myemployee_refno", "id");
    renameKey(obj, "mobile_OTP_verify_status", "verifyStatus");
    renameKey(obj, "profie_update_status", "profileStatus");

    renameKey(obj, "company_refno", "companyID");
    renameKey(obj, "parent_branch_refno", "regionalOfficeID");
    renameKey(obj, "incharge_user_refno", "branchAdminID");
    //renameKey(obj, "pincode", "pincode");
    renameKey(obj, "employee_user_refno", "id");
    renameKey(obj, "branch_refno", "id");
    renameKey(obj, "myservice_refno", "serviceID");

    renameKey(obj, "branch_incharge_contact_person", "branchInchargeName");
    renameKey(obj, "branch_incharge_contact_person_mobile_no", "branchInchargeContactNo");
    renameKey(obj, "underby", "underBy");

    renameKey(obj, "actual_unit_name", "unitOfSale");
    renameKey(obj, "actual_unit_name_txt", "unitOfSaleText");
    renameKey(obj, "actual_unit_refno", "unitID");
    renameKey(obj, "brand_prefixname", "brandPrefix");
    renameKey(obj, "convert_unit_refno", "convertedUnitID");
    renameKey(obj, "converted_unit_value", "convertedUnitValue");
    renameKey(obj, "isapprove", "isApprove");
    renameKey(obj, "ispublish", "isPublish");
    renameKey(obj, "product_image_url", "image");
    renameKey(obj, "sales_unit", "unitOfSale");
    renameKey(obj, "aadhar_no_s", "aadharNo");
    renameKey(obj, "mobile_no_s", "mobileNo");
    renameKey(obj, "Search_employee_refno", "id");
    renameKey(obj, "Search_employee_company_name", "companyName");
    renameKey(obj, "Search_employee_name", "employeeName");
    renameKey(obj, "Search_Employee_designationname", "designationName");
    renameKey(obj, "Search_employee_aadhar_no", "aadharNo");
    renameKey(obj, "Search_employee_mobile_no", "mobileNo");
    renameKey(obj, "employee_user_refno", "employeeID");
    renameKey(obj, "employee_company_refno", "employeeCompanyID");



  });

  return response;
};

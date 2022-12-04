export const APIConverter = (response: any) => {
  function renameKey(obj: any, oldKey: string, newKey: string) {
    if (obj.hasOwnProperty(oldKey)) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  }

  response.forEach((obj) => {
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
<<<<<<< HEAD
    renameKey(obj, "ewaybill_refno", "id");
    //
    renameKey(obj, "Sess_UserRefno", "UserID");
    renameKey(obj, "company_name", "companyName");
    renameKey(obj, "address", "addressLine");
    renameKey(obj, "mobile_no", "contactPersonNumber");
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
=======
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


>>>>>>> adac0a202187704c59c7c3f840b4f360f09f430b
  });

  return response;
};

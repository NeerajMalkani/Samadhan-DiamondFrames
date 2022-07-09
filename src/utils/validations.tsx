/* #region  Login Validations */
export const ValidateCredentials = (username: string, password: string) => {
  let isValid: boolean = false;
  if (username === "admin" && password === "admin@DF") {
    isValid = true;
  }
  return isValid;
};

export const ValidateEmail = (email: string) => {
  let isValid: boolean = false;
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (email.match(pattern)) {
    isValid = true;
  }
  return isValid;
};

//#region Validation regex
const Number = /^[0-9]+$/;
const Name = /^[a-zA-Z0-9\s]+$/;
const Address = /^[a-zA-Z0-9\s,'-/]*$/;
export const ValidateFields = (type: string, value: string) => {
  let boolStatus = false;
  switch (type.toLowerCase()) {
    case "fullname":
      if (!Number.test(value) && Name.test(value) && value.length > 2) boolStatus = true;
      break;
    case "phonenumber":
      if (Number.test(value) && value.length === 10) {
        boolStatus = true;
      }
      break;

    case "address":
      if (Address.test(value) && value.length > 1) boolStatus = true;
      break;
  }

  return boolStatus;
};

export function restrictNumericMobile(e: any) {
  let input = null;
  if (e.metaKey || e.ctrlKey || e.which === 0 || e.which < 33 || e.which < 37 || e.which < 39 || e.which < 46 || (e.which > 95 && e.which < 106)) {
    return true;
  }

  input = String.fromCharCode(e.which);
  if (e.which < 48 || e.which > 57 || (!/[\d\s]/.test(input) && e.which !== 13) || e.shiftKey) {
    return e.preventDefault();
  }
}
//#endregion

export const ValidateCategoryName = (categoryName: string) => {};
export const ValidateStringNumber = (hsnsacCode: string) => {
  return ValidateFields("fullname", hsnsacCode);
};
export const ValidateGSTRate = (gstRate: string) => {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return gstRate.match(rgx);
};

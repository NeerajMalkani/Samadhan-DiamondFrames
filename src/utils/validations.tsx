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

export const ValidateMobile = (mobile: string) => {
  let isValid: boolean = false;
  const pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  if (mobile.match(pattern)) {
    isValid = true;
  }
  return isValid;
};
/* #endregion */

export const ValidateCategoryName = (categoryName: string) => {};
export const ValidateHSNSACCode = (hsnsacCode: string) => {};
export const ValidateGSTRate = (gstRate: string) => {};

export const uniqueByKey = (array, key) => {
  return [...new Map(array.map((item) => [item[key], item])).values()];
};

export const retrunValueFromLocation = (arr, key, isState = false) => {
  if (isState) {
    return arr.state;
  } else {
    return arr.state[key];
  }
};

export const retrunSumID = (blankData) => {
  return blankData.map((bill) => bill.id).reduce((acc, amount) => acc.toString() + amount.toString());
};

const BloodGroup = {
  "A+": 1,
  "O+": 2,
  "B+": 3,
  "AB+":4,
  "A-": 5,
  "O-": 6,
  "B-": 7,
  "AB-":8
};
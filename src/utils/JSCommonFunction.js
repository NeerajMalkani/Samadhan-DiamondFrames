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

export const BloodGroup = [
  {
    ID:1,
    Name:"A+"
  },
  {
    ID:2,
    Name:"O+"
  },
  {
    ID:3,
    Name:"B+"
  },
  {
    ID:4,
    Name:"AB+"
  },
  {
    ID:5,
    Name:"A-"
  },
  {
    ID:6,
    Name:"O-"
  },
  {
    ID:7,
    Name:"B-"
  },
  {
    ID:8,
    Name:"AB-"
  },
]
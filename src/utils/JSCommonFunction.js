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

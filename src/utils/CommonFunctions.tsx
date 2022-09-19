export const  GetStringifyJson = (params:any) => {
    var string_ = JSON.stringify(params);

    string_ = string_.replace(/{/g, "");
    string_ = string_.replace(/}/g, "");
    string_ = string_.replace(/:/g, "=");
    string_ = string_.replace(/,/g, "&");
    string_ = string_.replace(/"/g, "");
    return string_;
  };

  export const CalculateSqfeet = (lf: number, li: number, whf: number, whi: number) => {
    if (lf > 0 && li > -1 && whf > 0 && whi > -1) {
      let lengthInches = ((lf * 12 + li) * (whf * 12 + whi)) / 144;
      return lengthInches;
    } else {
      return 0;
    }
  };


  export const NullOrEmpty = (param) => {
    if (param === undefined || param === null) {
      return true;
    } else if(param.toString() === "") {
      return true;
    }
    else {
      return false;
    }
  };



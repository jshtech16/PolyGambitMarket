const standardFloat = (number: number): string => {
  if (number < 1 && number.toString().indexOf('e-') != -1) {
    const e = parseInt(number.toString().split('e-')[1]);
    number *= Math.pow(10,e-1);
    return '0.' + (new Array(e)).join('0') + number.toString().substring(2);
  }
  return String(number)
}

const removeHeadZero = (str: string): string => {
  while(str.charAt(0) == '0') {
    str = str.substr(1)
  }
  if (str == '') return '0';
  return str;
}

export const convertDecimal = (amount:number|string, decimal:number, dir:string):string|number => {
  if (amount == null || amount == undefined) return '0';
  let strAmount = amount.toString();
  if (dir == 'toBN') {
    strAmount = standardFloat(Number(strAmount)).toString();
    const arr = strAmount.split(".");
    if (arr[1] && arr[1] != '') {
      if (arr[1].length >= decimal) {
        const ret = removeHeadZero(arr[0] + arr[1].substr(0, decimal));
        return (ret != "" ? ret : '0');
      }
      else {
        let len = decimal - arr[1].length;
        let vdecimal = '';
        while(len > 0) {
          vdecimal = vdecimal + '0';
          len --;
        }
        return removeHeadZero(arr[0] + arr[1] + vdecimal);
      }
    }
    else {
      let len = decimal;
      let decimal_str = '';
      while(len > 0) {
        decimal_str = decimal_str + '0';
        len --;
      }
      return removeHeadZero(strAmount + decimal_str);
    }
  }
  else {
    if (strAmount.length > decimal) {
      const top = strAmount.substr(0, strAmount.length - decimal);
      const low = strAmount.substr(strAmount.length - decimal, decimal>=12?12:decimal);
      return Number.isNaN(top+"."+low)?0:Number(top+"."+low);
    }
    else {
      let len = decimal - strAmount.length;
      let dec = '';
      while (len > 0) {
        dec = dec + '0';
        len --;
      }
      let tmp = decimal
      if (tmp >= 12) {
        tmp = 12;
      }
      return Number.isNaN('0.'+ dec + strAmount.substr(0, tmp))?0:Number('0.'+ dec + strAmount.substr(0, tmp));
    }
  }
}
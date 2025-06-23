export const renderNumberComma = (str: string | number): string => {
  str = String(str);
  if (str.indexOf('e-') != -1) {
    const tmp = str.split('e-');
    const tmp2 = tmp[0].split(".");
    return tmp2[0] + (tmp2.length > 1 ? '.'+tmp2[1].substr(0, 2) : '') + 'e-' + tmp[1]
  }
  else {
    if (Number(str) > 1000000000) {
      str = Number(str) / 1000000000
      str = Math.round(str * 100) / 100 + 'B'
      return str;
    }
    else if (Number(str) > 1000000) {
      str = Number(str) / 1000000
      str = Math.round(str * 100) / 100 + 'M'
      return str;
    }
    else if (Number(str) > 1000) {
      str = Number(str) / 1000
      str = Math.round(str * 100) / 100 + 'K'
      return str;
    }
    else if (Number(str) >= 0.01) {
      const tmp2 = str.split(".");
      return tmp2[0] + (tmp2.length > 1 ? '.'+tmp2[1].substr(0, 2) : '')
    }
    else if (Number(str) == 0) {
      return '0.00';
    }
    else {
      const tmp2 = String(str).split(".");
      let x = 0;
      while(tmp2[1].charAt(x) == '0') x++
      return '0.' + tmp2[1].substr(x, 2) + 'e-' + x;
    }
  }
}

export const renderNumberWithExp = (num: string): string => {
  if (Number(num) >= 0.001) {
    const tmp = String(Math.round(Number(num) * 1000) / 1000).split(".")
    if (tmp[0].length > 3 ) {
      if (tmp[1]) {
        return tmp[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + num[1];
      }
      else {
        return tmp[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    }
    else {
      if (tmp[1]) {
        return tmp[0] + "." + tmp[1];
      }
      else {
        return tmp[0]
      }
    }
  }
  else if (Number(num) == 0) {
    return '0';
  }
  else {
    const tmp = num.split('e')
    if (tmp.length > 1) {
      tmp[0] = Number(num[0]).toFixed(2)
      if (tmp[1]) {
        return tmp[0] + 'e' + tmp[1];
      }
      return tmp[0]
    }
    else {
      const tmp2 = String(tmp[0]).split(".");
      let x = 0;
      while(tmp2[1].charAt(x) == '0') x++
      return '0.' + tmp2[1].substr(x, 3) + 'e-' + x;
    }
  }
}

export const renderNumberWithRound = (str: string, zero: boolean=false, zerostr: string='--', decimal:number=3, round:boolean=false): string => {
  if (Number(str) == 0 && zero) {
    return zerostr;
  }
  str = String(str);
  if (str.indexOf('e-') != -1) {
    const tmp = str.split('e-');
    const tmp2 = tmp[0].split(".");
    if (round && Number(tmp[1]) > decimal) return '0.00';
    return tmp2[0] + (tmp2.length > 1 ? '.'+tmp2[1].substr(0, 3) : '') + 'e-' + tmp[1]
  }
  else {
    const defaultN = 1 / Math.pow(10, decimal);
    if (Number(str) >= defaultN) {
      const tmp2 = str.split(".");
      return tmp2[0] + (tmp2.length > 1 ? '.'+tmp2[1].substr(0, decimal) : '')
    }
    else if (Number(str) == 0) {
      return '0.00';
    }
    else {
      if (round) return '0.00';
      const tmp2 = String(str).split(".");
      let x = 0;
      if (tmp2[1] != undefined) {
        while(tmp2[1].charAt(x) == '0') x++
        if (tmp2[1].substr(x+1, 2).length > 0) {
          return tmp2[1].charAt(x) + '.' + tmp2[1].substr(x+1, 2) + 'e-' + x;
        }
        else {
          return tmp2[1].charAt(x) + 'e-' + x;
        }
      }
      else {
        return '0.00';
      }
    }
  }
}

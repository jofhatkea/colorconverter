import { knownColors } from "./knownColors";

export function getColorFormat(str) {
  if (str.match(/rgba/)) {
    return "rgba";
  } else if (str.match(/rgb/)) {
    return "rgb";
  } else if (str.match(/#/)) {
    if (str.length === 4 || str.length === 7) {
      //#FF or #FFF
      return "hex";
    } else if (str.length === 9) {
      //#FFFFFF80
      return "hexa";
    }
  } else if (str.match(/hsla/)) {
    return "hsla";
  } else if (str.match(/hsl/)) {
    return "hsl";
  } else if (knownColors.includes(str)) {
    return "name";
  }

  return false;
}

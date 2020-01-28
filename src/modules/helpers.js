import {
  RGBToHex,
  RGBAToHexA,
  hexToRGB,
  hexAToRGBA,
  RGBToHSL,
  RGBAToHSLA,
  HSLToRGB,
  HSLAToRGBA,
  hexToHSL,
  hexAToHSLA,
  HSLToHex,
  HSLAToHexA,
  nameToRGB,
  nameToHex,
  nameToHSL
} from "./colors";

export const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  console.log(`copied ${str} to clipboard`);
};
export const getColorCodes = (colorFormat, input) => {
  let colorHex, colorHexA, colorRgb, colorRgbA, colorHsl, colorHslA;
  switch (colorFormat) {
    case "rgb":
      colorHex = RGBToHex(input);
      colorHexA = colorHex + "ff";
      colorRgb = input;
      colorRgbA = hexAToRGBA(colorHexA);
      colorHsl = RGBToHSL(input);
      colorHslA = RGBAToHSLA(colorRgbA);
      break;
    case "rgba":
      colorHexA = RGBAToHexA(input);
      colorHex = colorHexA.substr(0, 7);
      colorRgb = hexToRGB(colorHex);
      colorRgbA = input;
      colorHsl = hexToHSL(colorHex);
      colorHslA = RGBAToHSLA(input);
      break;
    case "hsl":
      colorHex = HSLToHex(input);
      colorHexA = colorHex + "ff";
      colorRgb = HSLToRGB(input);
      colorRgbA = hexAToRGBA(colorHexA);
      colorHsl = input;
      colorHslA = hexAToHSLA(colorHexA);
      break;
    case "hsla":
      colorHslA = input;
      colorHexA = HSLAToHexA(input);
      colorRgbA = HSLAToRGBA(input);
      colorHex = HSLToHex(
        (input.split(",").slice(0, 3) + ")").replace("hsla", "hsl")
      );
      colorRgb = hexToRGB(colorHex);
      colorHsl = hexToHSL(colorHex);

      break;
    case "hex":
      let normalizedInput = input;
      if (input.length < 7) {
        const parts = input.split("");
        normalizedInput =
          "#" + parts[1] + parts[1] + parts[2] + parts[2] + parts[3] + parts[3];
      }
      colorHex = input;
      colorRgb = hexToRGB(normalizedInput);
      colorHsl = hexToHSL(normalizedInput);
      colorHexA = normalizedInput + "ff"; //this will break if #FF or #FFF i guess
      colorRgbA = hexAToRGBA(colorHexA);
      colorHslA = hexAToHSLA(colorHexA);
      break;
    case "hexa":
      colorHexA = input;
      colorRgbA = hexAToRGBA(input);
      colorHslA = hexAToHSLA(input);
      colorHex = colorHexA.substring(0, 7);
      colorRgb = hexToRGB(colorHex);
      colorHsl = hexToHSL(colorHex);
      break;
    case "name":
      colorHex = nameToHex(input);
      colorRgb = nameToRGB(input);
      colorHsl = nameToHSL(input);
      colorHexA = colorHex + "ff";
      colorRgbA = hexAToRGBA(colorHexA);
      colorHslA = hexAToHSLA(colorHexA);
      break;
    default:
      colorHex = colorHexA = colorRgb = colorRgbA = colorHsl = colorHslA = "";
  }
  //TODO: hsla somethimes has fractions in opacity, which makes other functions trip up
  return [colorHex, colorHexA, colorRgb, colorRgbA, colorHsl, colorHslA];
};

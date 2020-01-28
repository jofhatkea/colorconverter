import React, { useState, useEffect } from "react";
import ColorBox from "./ColorBox";
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
} from "./modules/colors";
import { knownColors } from "./modules/knownColors";
import { getColorFormat } from "./modules/getColorFormat";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  useEffect(() => {
    //TODO: brug ref til input
    window.addEventListener("keyup", handleDropDown);
    function handleDropDown(e) {
      if (suggestions.length > 0) {
        if (e.key === "ArrowDown") {
          setActiveSuggestion(activeSuggestion + 1);
        } else if (e.key === "ArrowUp") {
          setActiveSuggestion(activeSuggestion - 1);
        } else if (
          e.key === "Enter" &&
          activeSuggestion > -1 &&
          activeSuggestion < suggestions.length
        ) {
          updateInputState(suggestions[activeSuggestion]);
          setActiveSuggestion(-1);
        }
      }
      return function cleanup() {
        window.removeEventListener("keyup", handleDropDown);
      };
    }
  }, [activeSuggestion, suggestions]);
  let colorHex, colorHexA, colorRgb, colorRgbA, colorHsl, colorHslA;
  const colorFormat = getColorFormat(input);
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
  function updateInputState(val) {
    setInput(val);
    setSuggestions(
      knownColors.filter(
        color => val !== "" && color.startsWith(val) && color !== val
      )
    );
    setActiveSuggestion(-1);
  }

  return (
    <div id="wrapper">
      <div id="formWrapper">
        <form
          onSubmit={e => {
            e.preventDefault(); //TODO: virker ikke
          }}
        >
          <input
            type="text"
            name="color"
            value={input}
            onChange={e => updateInputState(e.target.value)}
            onFocus={e => e.target.select()}
          />
          <ul>
            {suggestions.map((sug, i) => {
              return (
                <li
                  key={i}
                  className={activeSuggestion === i ? "active" : ""}
                  onClick={() => updateInputState(sug)}
                >
                  {sug}
                </li>
              );
            })}
          </ul>
        </form>
      </div>
      <ColorBox color={colorHex} desc="Hex" />
      <ColorBox color={colorHexA} desc="HexA" />
      <ColorBox color={colorRgb} desc="RGB" />
      <ColorBox color={colorRgbA} desc="RGBA" />
      <ColorBox color={colorHsl} desc="HSL" />
      <ColorBox color={colorHslA} desc="HSLA" />
    </div>
  );
}

export default App;

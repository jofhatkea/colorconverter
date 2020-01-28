import React, { useState, useEffect } from "react";
import ColorBox from "./components/ColorBox";

import { knownColors } from "./modules/knownColors";
import { getColorFormat } from "./modules/getColorFormat";
import { getColorCodes } from "./modules/helpers";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  useEffect(() => {
    //TODO: brug ref til input (så vi ikke lytter på input, og kun når den er i fokus)
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
  //let colorHex, colorHexA, colorRgb, colorRgbA, colorHsl, colorHslA;
  const colorFormat = getColorFormat(input);
  const [
    colorHex,
    colorHexA,
    colorRgb,
    colorRgbA,
    colorHsl,
    colorHslA
  ] = getColorCodes(colorFormat, input);

  function updateInputState(val) {
    setInput(val);
    setSuggestions(
      knownColors.filter(
        color => val !== "" && color.startsWith(val) && color !== val
      )
    );
    setActiveSuggestion(-1);
  }
  //TODO: calculate a decent contrast for the colorboxes
  /* //refractor into colorbox wrapper? so contrast is calculated once
function luminanace(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1, rgb2) {
    return (luminanace(rgb1[0], rgb1[1], rgb1[2]) + 0.05)
         / (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05);
}
contrast([255, 255, 255], [255, 255, 0]); // 1.074 for yellow, 4.5 is the goal, 3 for bigger text
contrast([255, 255, 255], [0, 0, 255]); // 8.592 for blue
  */
  return (
    <div id="wrapper">
      <div id="formWrapper">
        <form
          onSubmit={e => {
            e.preventDefault();
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

import React from "react";
import { copyToClipboard } from "../modules/helpers";

export default function ColorBox({ color, desc }) {
  return (
    <div
      onClick={e => copyToClipboard(color)}
      className="colorbox"
      style={{ background: color }}
    >
      <header>
        <h1>As {desc}</h1>
      </header>
      <p>{color}</p>
    </div>
  );
}

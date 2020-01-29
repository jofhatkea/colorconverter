import React from "react";
import { copyToClipboard } from "../modules/helpers";
import { toast } from "react-toastify";

export default function ColorBox({ color, desc }) {
  toast.configure({
    autoClose: 1500
  });
  const notify = () => toast("Copied the color to your clipboard");
  return (
    <div
      onClick={e => {
        copyToClipboard(color);
        notify();
      }}
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

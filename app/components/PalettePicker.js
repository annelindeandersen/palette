"use client";

import { useState } from "react";
import { getPalette } from "../helpers/getPalette";
import { getHSL } from "../helpers/getHSL";

export const PalettePicker = () => {
    const [color, setColor] = useState(undefined);
    const HSLColor = getHSL(color);

    const paletteCostum = color ? getPalette(HSLColor) : ''
    const paletteBlue = getPalette([185, 100, 28]);
    const palettePink = getPalette([342, 100, 80]);

  return (
    <>
        <div className="flex gap-5 py-3 items-center">
            <h1 className="text-black text-4xl">Color palette picker:</h1>
            <span className="rounded-full overflow-hidden h-10 w-10 flex items-center justify-center border">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-20 shrink-0"/>
            </span>
        </div>
        <section className="grid gap-4 items-center">
            <div className="flex flex-wrap gap-3 text-xs text-black">
                {color && paletteCostum.map(item => <div key={item} className="h-32 w-36 flex flex-col-reverse rounded shadow-lg overflow-hidden" style={{background: item}}><span className="bg-white p-2">{item}</span></div>)}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-black">
                {paletteBlue.map(item => <div key={item} className="h-32 w-36 flex flex-col-reverse rounded shadow-lg overflow-hidden" style={{background: item}}><span className="bg-white p-2">{item}</span></div>)}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-black">
                {palettePink.map(item => <div key={item} className="h-32 w-36 flex flex-col-reverse rounded shadow-lg overflow-hidden" style={{background: item}}><span className="bg-white p-2">{item}</span></div>)}
            </div>
        </section>
      </>
  )
}
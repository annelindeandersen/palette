"use client";

import { useState } from "react";
import { getPalette } from "../helpers/getPalette";
import { getHSL } from "../helpers/getHSL";

export const PalettePicker = () => {
    const [color, setColor] = useState('#ff7B00');
    const [primaryColor, setPrimaryColor] = useState('#008591');
    const [secondaryColor, setSecondaryColor] = useState('#FF97B7');

    const HSLColor = getHSL(color);
    const HSLPrimary = getHSL(primaryColor);
    const HSLSecondary = getHSL(secondaryColor);

    const otherColor = getPalette(HSLColor);
    const primaryPalette = getPalette(HSLPrimary);
    const secondaryPalette = getPalette(HSLSecondary);

  return (
    <>
        <PaletteSection>
            <div className="flex gap-5 py-3 items-center">
                <h2 className="text-black text-3xl">Color palette picker:</h2>
                <ColorSelectorWrapper>
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-20 shrink-0 cursor-pointer"/>
                </ColorSelectorWrapper>
            </div>
            <PaletteWrapper>
                {otherColor && Object.keys(otherColor).map(item => <ColorContainer keyID={otherColor[item].name} background={otherColor[item].hsl}>
                    <span className="bg-white p-2">
                        <p>{otherColor[item].name}</p>
                        <p className="text-gray-400 text-xs">{otherColor[item].hex}</p>
                        <p className="text-gray-400 text-xs">{otherColor[item].hsl}</p>
                    </span>
                </ColorContainer>)}
            </PaletteWrapper>
        </PaletteSection>

        <PaletteSection>
            <div className="flex gap-5 py-3 items-center">
                <h2 className="text-black text-3xl">Primary palette picker:</h2>
                <ColorSelectorWrapper>
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-20 shrink-0 cursor-pointer"/>
                </ColorSelectorWrapper>
            </div>
            <PaletteWrapper>
                {Object.keys(primaryPalette).map(item => <ColorContainer keyID={primaryPalette[item].name} background={primaryPalette[item].hsl}>
                    <span className="bg-white p-2">
                        <p>{primaryPalette[item].name}</p>
                        <p className="text-gray-400 text-xs">{primaryPalette[item].hex}</p>
                        <p className="text-gray-400 text-xs">{primaryPalette[item].hsl}</p>
                    </span>
                </ColorContainer>)}
            </PaletteWrapper>
        </PaletteSection>

        <PaletteSection>
            <div className="flex gap-5 py-3 items-center">
                <h2 className="text-black text-3xl">Secondary palette picker:</h2>
                <ColorSelectorWrapper>
                    <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="h-20 shrink-0 cursor-pointer"/>
                </ColorSelectorWrapper>
            </div>
            <PaletteWrapper>
                {Object.keys(secondaryPalette).map(item => <ColorContainer keyID={secondaryPalette[item].name} background={secondaryPalette[item].hsl}>
                    <span className="bg-white p-2">
                        <p>{secondaryPalette[item].name}</p>
                        <p className="text-gray-400 text-xs">{secondaryPalette[item].hex}</p>
                        <p className="text-gray-400 text-xs">{secondaryPalette[item].hsl}</p>
                    </span>
                </ColorContainer>)}
            </PaletteWrapper>
        </PaletteSection>
      </>
  )
}

const PaletteSection = ({children}) => {
    return <section className="grid gap-4 items-center text-xs text-black">{children}</section>
}

const PaletteWrapper = ({children}) => {
    return <div className="flex flex-wrap gap-3">{children}</div>
}

const ColorSelectorWrapper = ({children}) => {
    return <span className="rounded-full overflow-hidden h-10 w-10 flex items-center justify-center border-black border-2">{children}</span>
}

const ColorContainer = ({children, background, keyID}) => {
    return <div key={keyID} style={{ background: background }} className="h-40 w-36 flex flex-col-reverse rounded shadow-md overflow-hidden">{children}</div>
}


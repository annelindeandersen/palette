"use client";

import { useState } from "react";
import { getPalette } from "../helpers/getPalette";
import { getHSL } from "../helpers/getHSL";

export const PalettePicker = () => {
    const [primaryColor, setPrimaryColor] = useState('#008591');
    const [secondaryColor, setSecondaryColor] = useState('#FF97B7');

    const HSLPrimary = getHSL(primaryColor);
    const HSLSecondary = getHSL(secondaryColor);

    const primaryPalette = getPalette(HSLPrimary);
    const secondaryPalette = getPalette(HSLSecondary);

    const downloadPalette = () => {
        const palette = {primaryPalette, secondaryPalette};
        const paletteData ='data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(palette));
        const download = document.createElement('palette');

        download.setAttribute('href', paletteData);
        download.setAttribute('download', 'Palette.json');
        download.click();
    }

  return (
    <>
        <PaletteSection>
            <div className="flex gap-5 py-3 items-center">
                <h2 className="text-black text-xl sm:text-3xl">Primary palette picker:</h2>
                <ColorSelectorWrapper>
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-20 shrink-0 cursor-pointer"/>
                </ColorSelectorWrapper>
            </div>
            <PaletteWrapper>
                {Object.keys(primaryPalette).map(item => 
                    <div key={primaryPalette[item].name}>
                        <ColorContainer item={primaryPalette[item]}>
                            <span className="bg-white p-2">
                                <p>{primaryPalette[item].name}</p>
                                <p className="text-gray-400 text-xs">{primaryPalette[item].hex}</p>
                                <p className="text-gray-400 text-xs">{primaryPalette[item].rgb}</p>
                                <p className="text-gray-400 text-xs">{primaryPalette[item].hsl}</p>
                            </span>
                        </ColorContainer>
                    </div>
                )}
            </PaletteWrapper>
        </PaletteSection>

        <PaletteSection>
            <div className="flex gap-5 py-3 items-center">
                <h2 className="text-black text-xl sm:text-3xl">Secondary palette picker:</h2>
                <ColorSelectorWrapper>
                    <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="h-20 shrink-0 cursor-pointer"/>
                </ColorSelectorWrapper>
            </div>
            <PaletteWrapper>
                {Object.keys(secondaryPalette).map(item => 
                    <div key={secondaryPalette[item].name}>
                        <ColorContainer item={secondaryPalette[item]}>
                            <span className="bg-white p-2">
                                <p>{secondaryPalette[item].name}</p>
                                <p className="text-gray-400 text-xs">{secondaryPalette[item].hex}</p>
                                <p className="text-gray-400 text-xs">{secondaryPalette[item].rgb}</p>
                                <p className="text-gray-400 text-xs">{secondaryPalette[item].hsl}</p>
                            </span>
                        </ColorContainer>
                    </div>
                )}
            </PaletteWrapper>
        </PaletteSection>
        <button onClick={downloadPalette} className="border shadow-md rounded text-gray-400 py-2 px-5 m-16">Download palette.json</button>
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

const ColorContainer = ({children, item}) => {
    return (
        <div style={{ background: item.hsl }} className="h-44 w-36 flex flex-col-reverse rounded shadow-md overflow-hidden relative">
            <span className="absolute top-2 right-2" style={{color: item.complimentaryColor}}>Complimentary</span>
            {children}
        </div>
    );
}


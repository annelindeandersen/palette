import { Palette } from '../interfaces/palette';
"use client";

import { ReactNode, useState } from "react";
import { getPalette } from "../helpers/getPalette";
import { getHSL } from "../helpers/getHSL";
import { HEX } from '../interfaces/colors';

export const PalettePicker = (): ReactNode => {
    const [primaryColor, setPrimaryColor] = useState<HEX>('#008591');
    const [secondaryColor, setSecondaryColor] = useState<HEX>('#FF97B7');

    const HSLPrimary = primaryColor && getHSL(primaryColor);
    const HSLSecondary = secondaryColor && getHSL(secondaryColor);

    const primaryPalette: Palette[] = getPalette(HSLPrimary);
    const secondaryPalette: Palette[] = getPalette(HSLSecondary);

  return (
    <>
        <PaletteSection>
            <div className="flex gap-5 py-3 items-center">
                <h2 className="text-black text-xl sm:text-3xl">Primary palette picker:</h2>
                <ColorSelectorWrapper>
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-20 shrink-0 cursor-pointer"/>
                </ColorSelectorWrapper>
            </div>
            {primaryPalette && primaryColor && 
                <PaletteWrapper>
                    {Object.keys(primaryPalette).map((item) => 
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
            }
        </PaletteSection>

        <PaletteSection>
            <div className="flex gap-5 py-3 items-center">
                <h2 className="text-black text-xl sm:text-3xl">Secondary palette picker:</h2>
                <ColorSelectorWrapper>
                    <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="h-20 shrink-0 cursor-pointer"/>
                </ColorSelectorWrapper>
            </div>
            {secondaryColor && secondaryPalette &&
                <PaletteWrapper>
                    {secondaryPalette && Object.keys(secondaryPalette).map(item => 
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
            }
        </PaletteSection>
      </>
  )
}

const PaletteSection = ({children}: {children: ReactNode}) => {
    return <section className="grid gap-4 items-center text-xs text-black">{children}</section>
}

const PaletteWrapper = ({children}: {children: ReactNode}) => {
    return <div className="flex flex-wrap gap-3">{children}</div>
}

const ColorSelectorWrapper = ({children}: {children: ReactNode}) => {
    return <span className="rounded-full overflow-hidden h-10 w-10 flex items-center justify-center border-black border-2">{children}</span>
}

const ColorContainer = ({children, item}: {children: ReactNode, item: Palette}) => {
    return (
        <div style={{ background: item.hsl }} className="h-44 w-36 flex flex-col-reverse rounded shadow-md overflow-hidden relative">
            <span className="absolute top-2 right-2" style={{color: item.complimentaryColor}}>Complimentary</span>
            {children}
        </div>
    );
}


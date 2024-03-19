import { HSL } from "../interfaces/colors";
import { Palette } from "../interfaces/palette";
import { getComplimentary } from "./getComplimentary";
import { formatRGB, getHEX, getRGB } from "./getHEX";

/**
 * 
 * @param {h, s, l}
 * @param index 
 * @returns Palette
 * 
 * This function uses the HSL values of the selected color
 * and darkens it based on the current lightness and index.
 * 
 * Depending on hue and saturation colors are desaturated:
 * If color is on the red/pink spectrum of hues, it gets
 * most desaturated. If not and saturation is high, it is
 * desaturated slightly.
 * 
 * Hue is a degree on the color wheel from 0 to 360. 
 * 0 is red, 120 is green, and 240 is blue. 
 * Saturation is a percentage value. 
 * 0% means a shade of gray, and 100% is the full color.
 */
export const getDarkColors = ({h, s, l}: HSL, index: number): Palette => {
  /** 
   * Divide current lightness by 8 (magic number to not make it go all black)
   * Multiply by index to make color gradually darker and deduct current lightness.
   * Ensure lightness value stays within 0-100 range */
  l -= (l / 8 * index);
  l = Math.min(100, Math.max(0, l));

  /** If s === 0 it is grey and we should not touch saturation. */
  if(s !== 0) {

    /** If saturation is between 70-100% decrease saturation */
    if(s >= 70 && s <= 100) {

      /** If red/pink hues, desaturate 10-15% */
      if(h >= 300 || h <= 10) {
        s -= index * (s / 7)
      } else if (l >= 40) {
        s -= index * 2
      }
    }
    /** Ensure saturation value stays within 1-100 range */
    s = Math.min(100, Math.max(1, s));
  }

  /** We want indexes output in Tailwind fashion: 600, 700, 800, 900, 950 */
  const tailwindName = index === 5 ? 950 : (index + 5) * 100;
  const complimentary = getComplimentary({h,s,l});
  const hex = getHEX({h,s,l});
  const rgb = formatRGB(getRGB({h,s,l}));

  return { 
    name: tailwindName, 
    hsl: `hsl(${Math.ceil(h)}, ${Math.ceil(s)}%, ${Math.ceil(l)}%)`,
    hex: hex,
    rgb: rgb,
    complimentaryColor: complimentary
  }
  };
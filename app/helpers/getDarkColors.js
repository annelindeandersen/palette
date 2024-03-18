// Hue is a degree on the color wheel from 0 to 360. 
// 0 is red, 120 is green, and 240 is blue. 
// Saturation is a percentage value. 
// 0% means a shade of gray, and 100% is the full color.

import { getComplimentary } from "./getComplimentary";
import { getHEX, getRGB } from "./getHEX";

export const getDarkColors = (h, s, l, index) => {
  l -= (l / 8 * index);
  l = Math.min(100, Math.max(0, l)); // Ensure lightness value stays within 0-100 range

  // if s === 0 it is grey and we should not touch saturation.
  if(s !== 0) {

    // if saturation is between 70-100% decrease saturation
    if(s >= 70 && s <= 100) {

      // if red/pink hues, desaturate 10-15%
      if(h >= 300 || h <= 10) {
        s -= index * (s / 7)
      } else if (l >= 40) {
        s -= index * 2
      }
    }
    s = Math.min(100, Math.max(1, s)); // Ensure lightness value stays within 1-100 range
  }

  // We want indexes output in Tailwind fashion: 600, 700, 800, 900, 950
  const tailwindName = index === 5 ? 950 : (index + 5) * 100;
  const complimentary = getComplimentary(h,s,l);
  const hex = getHEX(h,s,l);
  const rgb = getRGB(h,s,l, true);

  return { 
    name: tailwindName, 
    hsl: `hsl(${Math.ceil(h)}, ${Math.ceil(s)}%, ${Math.ceil(l)}%)`,
    hex: hex,
    rgb: rgb,
    complimentaryColor: complimentary
  }
  };
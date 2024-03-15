// Hue is a degree on the color wheel from 0 to 360. 
// 0 is red, 120 is green, and 240 is blue. 
// Saturation is a percentage value. 
// 0% means a shade of gray, and 100% is the full color.

import { getComplimentary } from "./getComplimentary";
import { getHEX } from "./getHEX";

export const getLightColors = (h, s, l, index) => {
    // index 0 is the base colour and should not change
    if (index !== 0) {
      const diff = 100 - l;
      l += (diff / 6) * index;
      l = Math.min(100, Math.max(0, l)); // Ensure lightness value stays within 0-100 range
  
      // if s === 0 it is grey and we should not touch saturation.
      if(s !== 0) {

        // if saturation is between 70-100% decrease saturation
        if(s <= 100 && s >= 70) {

          // if not red & pink
          if(h < 300 && h > 30) {

            // if lightness is above 80%
            if (l >= 80) {
              s -= index * (s / 7)
            } else {
              s -= index * (s / 6)
            }
          }
          s = Math.min(100, Math.max(0, s)); // Ensure lightness value stays within 0-100 range
        }
      }
    }
    
    // Because the array is reversed it is reversed logic. 
    // We want indexes output in Tailwind fashion: 50, 100, 200, 300, 400, 500
    const tailwindName = index === 5 ? 50 : (5 - index) * 100;
    const complimentary = getComplimentary(l);
    const hex = getHEX(h,s,l);

    return { 
      name: tailwindName, 
      hsl: `hsl(${Math.ceil(h)}, ${Math.ceil(s)}%, ${Math.ceil(l)}%)`, 
      hex: hex,
      complimentaryColor: complimentary}
  };
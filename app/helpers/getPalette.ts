import { getDarkColors } from "./getDarkColors";
import { getLightColors } from "./getLightColors";
import { HSL } from "../interfaces/colors";
import { Palette } from "../interfaces/palette";

export const getPalette = (baseColor: HSL): Palette[] => {
    const {h,s,l} = baseColor;

    const lightGradientArray = Array.from(Array(6), (_, i) => getLightColors({h, s, l}, i)).reverse();
    const darkGradientArray = Array.from(Array(5), (_, i) => getDarkColors({h, s, l}, i + 1));
  
    return [...lightGradientArray, ...darkGradientArray]
  }
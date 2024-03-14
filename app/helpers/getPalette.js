import { getDarkColors } from "./getDarkColors";
import { getLightColors } from "./getLightColors";

export const getPalette = (baseColor) => {
    const lightGradientArray = Array.from(Array(6), (_, i) => getLightColors(baseColor[0], baseColor[1], baseColor[2], i)).reverse();
    const darkGradientArray = Array.from(Array(5), (_, i) => getDarkColors(baseColor[0], baseColor[1], baseColor[2], i + 1));
  
    return [...lightGradientArray, ...darkGradientArray]
  }
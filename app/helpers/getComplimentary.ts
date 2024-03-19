import { HSL, RGB } from "../interfaces/colors";
import { complimentaryColor } from "../interfaces/palette";
import { getRGB } from "./getHEX";
import { getLuminance } from "./getLuminance";

export const getComplimentary = ({h, s, l}: HSL): complimentaryColor => {
    const complimentaryLight = '#FFFFFF';
    const complimentaryDark = '#1B1B1B';

    const rgbColors: RGB = getRGB({h, s, l});
    const {r, g, b} = rgbColors;
    const luminance = getLuminance({r, g, b});

    /** if luminance is above 40%, text needs to be dark. */
    return luminance > .4 ? complimentaryDark : complimentaryLight;
}
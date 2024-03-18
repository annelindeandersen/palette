import { getRGB } from "./getHEX";
import { getLuminance } from "./getLuminance";

export const getComplimentary = (h, s, l) => {
    const complimentaryLight = '#FFFFFF';
    const complimentaryDark = '#1B1B1B';

    const luminance = getLuminance(getRGB(h, s, l));

    // if luminance is above 40%, text needs to be dark.
    return luminance > .4 ? complimentaryDark : complimentaryLight;
}
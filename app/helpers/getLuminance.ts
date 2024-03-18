import { RGB } from "../interfaces/colors";

export const getLuminance = ({r, g, b}: RGB) => {
    const gammaCorrect = (c) => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const linearR = gammaCorrect(r);
    const linearG = gammaCorrect(g);
    const linearB = gammaCorrect(b);

    return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
}
import { HSL, RGB } from "../interfaces/colors";

export const getRGB = ({h, s, l}: HSL) => {
    /** Convert hue to a value between 0 and 1 */
    h = h / 360;
    
    /** Convert saturation and lightness to values between 0 and 1 */
    s = s / 100;
    l = l / 100;

    let r, g, b;

    if (s === 0) {
        /** If saturation is 0, the color is grayscale (achromatic) */
        r = g = b = l;
    } else {
        const hueToRgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    /**  Convert RGB values to 0-255 range */
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return {r, g, b};
}

export const formatRGB = ({r, g, b}: RGB) => {
    return `rgb(${r}, ${g}, ${b})`;
}

export const getHEX = ({h, s, l}: HSL) => {
    const RGB: RGB = getRGB({h, s, l});

    /** Convert each RGB component to hexadecimal */
    const rgbToHex = (number: number) => {
        const hex = number.toString(16);
        return hex.length == 1 ? "0" + hex : hex; /** Add leading zero if needed */
    };

    return `#${rgbToHex(RGB.r)}${rgbToHex(RGB.g)}${rgbToHex(RGB.b)}`;
}
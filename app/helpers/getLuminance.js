export const getLuminance = ([R, G, B]) => {
    const gammaCorrect = (c) => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const linearR = gammaCorrect(R);
    const linearG = gammaCorrect(G);
    const linearB = gammaCorrect(B);

    return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
}
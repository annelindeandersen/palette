export const getComplimentary = (lightness) => {
    const complimentaryLight = '#FFFFFF';
    const complimentaryDark = '#1B1B1B';

    // if lightness is above 50%, text needs to be dark.
    return lightness > 50 ? complimentaryDark : complimentaryLight;
}
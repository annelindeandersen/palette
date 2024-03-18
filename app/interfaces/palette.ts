import { HEX } from "./colors";

export interface Palette {
    name: number;
    hsl: string;
    hex: HEX;
    rgb: string;
    complimentaryColor: complimentaryColor;
}

export type complimentaryColor = '#FFFFFF' | '#1B1B1B'
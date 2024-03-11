const baseColorPink = [342, 100, 80]; // HSL values
const baseColorBlue = [185, 100, 28]; // HSL values

// Hue is a degree on the color wheel from 0 to 360. 
// 0 is red, 120 is green, and 240 is blue. 
// Saturation is a percentage value. 
// 0% means a shade of gray, and 100% is the full color.

const adjustLighterColorHSL = (h, s, l, index) => {

  // First figure out lightness to calc how much lightness to add or deduct:
  // if(l >= 87 && l <= 95) {
  //   h -= 1;
  //   l += index;
  // } else if (l < 87 && l >= 70) {
  //   l += (index * 3);
  // } else if (l < 70 && l > 50) {
  //   l += (index * 5);
  // } else if (l <= 50 && l >= 20) {
  //   l += (index * 9);
  //   l += (index * 12);
  // } 
  
  // if (l <= 95 && l >= 81) {
  // l += (index * (l / 15));
  // } else if (l <= 80 && l >= 66) {
  // l += (index * (l / 14));
  // } else if (l <= 65 && l >= 46) {
  // l += (index * (l / 8));
  // } else if (l <= 45 && l >= 36) {
  // l += (index * (l / 3));
  // } else if (l <= 35 && l >= 16) {
  // l += (index * (l / 2));
  // } else if (l <= 15) {
  // l += (index * l);
  // }
  // } else {

  //   l += (index * (l / 3));
  // }

  const diff = 100 - l;
  l += (diff / 5.5) * index;
  l = Math.min(100, Math.max(0, l)); // Ensure lightness value stays within 0-100 range

  // if s === 0 it is grey and we should not touch saturation.
  if(s !== 0) {
    // if not red & pink
    if(h < 300 && h > 10) {
      s -= (index + 2) * 10;
    }
    s = Math.min(100, Math.max(1, s)); // Ensure lightness value stays within 1-100 range
  }

  return `hsl(${Math.ceil(h)}, ${Math.ceil(s)}%, ${Math.ceil(l)}%)`;
};

const adjustDarkerColorHSL = (h, s, l, index) => {

  // First figure out lightness to calc how much lightness to add or deduct:
  // if(l >= 10 && l <= 5) {
  //   // if lightness is 5-10, take the hue up one and set lightness to - index.
  //   h += 1;
  //   l -= index;
  // } else if(l === 0) {
  //     // if lightness is 0, take the hue down one and set lightness to 50.
  //     h += 1;
  //     l = 10 / index;
  //   } else {
  //   l -= (index * 10);
  // }

  const diff = 100 - l;
  
  if(diff < 25) {
    l -= (diff / 2) * index;
  } else {
    l -= (index * 3);
  }
  l = Math.min(100, Math.max(0, l)); // Ensure lightness value stays within 0-100 range

  // if s === 0 it is grey and we should not touch saturation.
  // if initial lightness is above or equals 25, decrease saturation on darker warm colors
  if(s !== 0 && l >= 25) {
    // if red/pink toned
    if(h >= 300 || h <= 10) {
      s -= ((index + 3) * 10);
    } else {
      s -= ((index + 2) * 5);
    }
    s = Math.min(100, Math.max(1, s)); // Ensure lightness value stays within 1-100 range
  }

  return `hsl(${Math.ceil(h)}, ${Math.ceil(s)}%, ${Math.ceil(l)}%)`;
};


const getPalette = (baseColor) => {
  const lightGradientArray = Array.from(Array(6), (_, i) => adjustLighterColorHSL(baseColor[0], baseColor[1], baseColor[2], i)).reverse();
  const darkGradientArray = Array.from(Array(5), (_, i) => adjustDarkerColorHSL(baseColor[0], baseColor[1], baseColor[2], i + 1));

  return [...lightGradientArray, ...darkGradientArray]
}

export default function Home() {
  const paletteBlue = getPalette(baseColorBlue);
  const palettePink = getPalette(baseColorPink);

  return (
    <main className="flex flex-col items-center justify-between px-10 py-20 bg-white">
      <h1 className="text-black">Colors:</h1>
      <section className="grid gap-4 items-center">
        <div className="flex flex-wrap gap-3 text-xs text-black">
          {paletteBlue.map(item => <div className="h-32 w-36 flex flex-col-reverse rounded shadow-lg overflow-hidden" style={{background: item}}><span className="bg-white p-2">{item}</span></div>)}
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-black">
          {palettePink.map(item => <div className="h-32 w-36 flex flex-col-reverse rounded shadow-lg overflow-hidden" style={{background: item}}><span className="bg-white p-2">{item}</span></div>)}
        </div>
      </section>
    </main>
  );
}

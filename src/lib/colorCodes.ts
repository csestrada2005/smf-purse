// Maps color abbreviation codes to full color keys and vice versa
const codeToKey: Record<string, string> = {
  W: 'white',
  B: 'black',
  Be: 'beige',
  G: 'gold',
  R: 'red',
  N: 'navy',
  T: 'tan',
  P: 'pink',
  Gr: 'green',
  Gy: 'grey',
};

const keyToCode: Record<string, string> = Object.fromEntries(
  Object.entries(codeToKey).map(([code, key]) => [key, code])
);

export const colorCodeToKey = (code: string): string => {
  return codeToKey[code] || code.toLowerCase();
};

export const colorKeyToCode = (key: string): string => {
  return keyToCode[key.toLowerCase()] || key.charAt(0).toUpperCase();
};

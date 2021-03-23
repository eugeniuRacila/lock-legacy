const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateASCIICharFromArray = (asciiChars) =>
  String.fromCharCode(
    asciiChars[generateRandomNumber(0, asciiChars.length - 1)]
  );

export const generateCharacterSwapTime = () => generateRandomNumber(450, 1100);

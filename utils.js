const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateASCIIChar = (from, to) =>
  String.fromCharCode(generateRandomNumber(from, to));

export const generateASCIICharFromArray = (asciiChars) =>
  String.fromCharCode(
    asciiChars[generateRandomNumber(0, asciiChars.length - 1)]
  );

export const generateLetterSwapTime = () => generateRandomNumber(450, 1100);

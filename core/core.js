import ascii from "./characters.js";
import {
  generateASCIICharFromArray,
  generateLetterSwapTime,
} from "../utils.js";

let asciiCharactersPool = [];
const swapLetterTimeoutRef = [];

export const updateASCIICharactersPool = (key, value) => {
  if (value) {
    asciiCharactersPool = [...asciiCharactersPool, ...ascii[key]];
  } else {
    asciiCharactersPool = asciiCharactersPool.filter(
      (value) => !ascii[key].includes(value)
    );
  }
  console.log("Updated ASCII pool", asciiCharactersPool);
};

export const stopLetterSwap = () => {
  swapLetterTimeoutRef.map((timeout) => clearTimeout(timeout));
};

const swapLetter = (i) => {
  console.log("swapLetterTimeoutRef.length", swapLetterTimeoutRef.length);
  swapLetterTimeoutRef[i] = setTimeout(() => {
    const tempGeneratedASCIIChar = generateASCIICharFromArray(
      asciiCharactersPool
    );

    document.getElementById(`c-${i}`).textContent = tempGeneratedASCIIChar;

    swapLetter(i);
  }, generateLetterSwapTime());
};

export const generatePassword = (numberOfChar) => {
  const generatedPasswordChars = [];

  for (let i = 0; i < numberOfChar; i++) {
    generatedPasswordChars.push(
      generateASCIICharFromArray(asciiCharactersPool)
    );

    swapLetter(i);
  }

  return generatedPasswordChars;
};

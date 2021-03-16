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

const updateLetterContent = (i) => {
  document.getElementById(`c-${i}`).textContent = generateASCIICharFromArray(
    asciiCharactersPool
  );
};

const swapLetter = (i) => {
  swapLetterTimeoutRef[i] = setTimeout(() => {
    updateLetterContent(i);

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

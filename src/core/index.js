import ascii from 'Core/characters';
import { generateASCIICharFromArray, generateCharacterSwapTime } from 'Utils';
import { updateCharacterNodeContent } from 'Utils/DomManipulation';

// Current selected ASCII character's range for password generation
let asciiCharactersPool = [];

//
const seedCharacterSwapTimeoutRef = [];

export const clearSeedSwapTimeout = (fromIndex, toIndex) => {
  if (
    seedCharacterSwapTimeoutRef.length &&
    seedCharacterSwapTimeoutRef.length >= toIndex
  )
    for (let i = fromIndex; i < toIndex; i++)
      clearTimeout(seedCharacterSwapTimeoutRef[i]);
};

export const updateASCIICharactersPool = (key, value = true) => {
  // "value" is equal to true when the pool is requested to contain the range
  // of characters indicated in the "key" name
  if (value) {
    asciiCharactersPool = [...asciiCharactersPool, ...ascii[key]];
  } else {
    asciiCharactersPool = asciiCharactersPool.filter(
      (value) => !ascii[key].includes(value)
    );
  }

  console.log('updateASCIICharactersPool ::', asciiCharactersPool);
};

export const generatePassword = (numberOfCharacters) => {
  const generatedPassword = [];

  for (let i = 0; i < numberOfCharacters; i++)
    generatedPassword.push(generateASCIICharFromArray(asciiCharactersPool));

  console.log('generatePassword ::', generatedPassword);

  return generatedPassword;
};

const swapSeedCharacter = (i) => {
  seedCharacterSwapTimeoutRef[i] = setTimeout(() => {
    updateCharacterNodeContent(
      i,
      generateASCIICharFromArray(asciiCharactersPool)
    );

    swapSeedCharacter(i);
  }, generateCharacterSwapTime());
};

export const initSeedRandomizer = (numberOfCharacters) => {
  for (let i = 0; i < numberOfCharacters; i++) swapSeedCharacter(i);
  console.log('initSeedRandomizer ::', numberOfCharacters);
};

export const stopAndClearSeedRandomizer = () => {
  seedCharacterSwapTimeoutRef.map((timeout) => clearTimeout(timeout));
  console.log('stopSeedRandomizer ::', seedCharacterSwapTimeoutRef);
};

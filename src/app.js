import {
  clearSeedSwapTimeout,
  initSeedRandomizer,
  generatePassword,
  stopAndClearSeedRandomizer,
  updateASCIICharactersPool,
} from 'Core';
import { generateRepeatPasswordGenerationTime } from 'Utils';
import { updateCharacterNodeContent } from 'Utils/DomManipulation';

let generatedPassword;
const passwordLength = 16;

// Switcher elements
const generatePasswordButton = document.getElementById('generate-password');
const useLower = document.getElementById('useLower');
const useNumber = document.getElementById('useNumber');
const useSpecial = document.getElementById('useSpecial');
const useUpper = document.getElementById('useUpper');
const password = document.getElementById('password');
const repeatPasswordGenerationButton = document.getElementById(
  'repeat-password-generation'
);

const populatePasswordsCharacters = (arrayOfCharacters) => {
  for (let i = 0; i < arrayOfCharacters.length; i++)
    updateCharacterNodeContent(i, arrayOfCharacters[i]);
};

const generateInitialPassword = () => {
  populatePasswordsCharacters(generatePassword(passwordLength));
};

const getLocalStorageValue = (key) => localStorage.getItem(key);

const setLocalStorageValue = (key, value) => localStorage.setItem(key, value);

const toggleSwitcherStyle = ({ classList }) => {
  classList.toggle('switcher--checked');
};

const updateAndSaveSwitcherState = ({
  target: { checked, name, parentElement },
}) => {
  console.log('updateAndSaveSwitcherState ::', parentElement);
  updateASCIICharactersPool(name, checked);
  toggleSwitcherStyle(parentElement);
  setLocalStorageValue(name, checked);
};

const localStorageSwitcherStateUpdate = (switcher) => {
  if (getLocalStorageValue(switcher.name) === 'true') {
    switcher.checked = true;
    updateASCIICharactersPool(switcher.name);
    toggleSwitcherStyle(switcher.parentElement);
  }
};

// Check local storage for prefered options
const updatePasswordOptionsFromLocalStorage = () => {
  localStorageSwitcherStateUpdate(useLower);
  localStorageSwitcherStateUpdate(useNumber);
  localStorageSwitcherStateUpdate(useSpecial);
  localStorageSwitcherStateUpdate(useUpper);
};

const setGeneratedPasswordCharacters = (fromIndex, toIndex) => {
  for (let i = fromIndex; i < toIndex; i++) {
    document.getElementById(`c-${i}`).textContent = generatedPassword[i];
    document.getElementById(`c-${i}`).classList.add('password__char--g');
  }
};

const clearCharSwapTimeoutAndSetStyles = () => {
  for (
    let i = 0, j = 4, time = 0;
    j <= passwordLength;
    i += 4, j += 4, time += 350
  )
    setTimeout(() => {
      clearSeedSwapTimeout(i, j);
      setGeneratedPasswordCharacters(i, j);

      if (j === passwordLength) {
        generatePasswordButton.disabled = false;
        generatePasswordButton.classList.add('generate-password--copy');
        generatePasswordButton.textContent = 'Copy password to clipboard';
      }
    }, time);
};

const onGeneratePasswordClick = () => {
  generatePasswordButton.disabled = true;
  generatedPassword = generatePassword(passwordLength);

  clearCharSwapTimeoutAndSetStyles();

  generatePasswordButton.removeEventListener('click', onGeneratePasswordClick);
  generatePasswordButton.addEventListener('click', onCopyToClipboardClick);
};

const onCopyToClipboardClick = () => {
  navigator.clipboard.writeText(password.textContent.replace(/\s/g, '')).then(
    () => console.log('Async: Copying to clipboard was successful!'),
    (err) => console.error('Async: Could not copy text: ', err)
  );
};

export const initApp = () => {
  updatePasswordOptionsFromLocalStorage();
  initSeedRandomizer(passwordLength);

  // Switcher listeners
  useLower.addEventListener('click', updateAndSaveSwitcherState);
  useNumber.addEventListener('click', updateAndSaveSwitcherState);
  useSpecial.addEventListener('click', updateAndSaveSwitcherState);
  useUpper.addEventListener('click', updateAndSaveSwitcherState);

  generatePasswordButton.addEventListener('click', onGeneratePasswordClick);

  repeatPasswordGenerationButton.addEventListener('click', () => {
    generatePasswordButton.disabled = true;
    stopAndClearSeedRandomizer();
    generatedPassword = generatePassword(passwordLength);
    initSeedRandomizer(passwordLength);

    for (let i = 0; i < passwordLength; i++)
      document.getElementById(`c-${i}`).classList.remove('password__char--g');

    setTimeout(() => {
      onGeneratePasswordClick();
    }, generateRepeatPasswordGenerationTime());
  });
};

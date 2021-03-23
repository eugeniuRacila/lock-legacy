import {
  initSeedRandomizer,
  generatePassword,
  updateASCIICharactersPool,
} from 'Core';
import { updateCharacterNodeContent } from 'Utils/DomManipulation';

const passwordLength = 16;

// Switcher elements
const useLower = document.getElementById('useLower');
const useNumber = document.getElementById('useNumber');
const useSpecial = document.getElementById('useSpecial');
const useUpper = document.getElementById('useUpper');

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

export const initApp = () => {
  updatePasswordOptionsFromLocalStorage();
  generateInitialPassword();
  initSeedRandomizer(passwordLength);

  // Switcher listeners
  useLower.addEventListener('click', updateAndSaveSwitcherState);
  useNumber.addEventListener('click', updateAndSaveSwitcherState);
  useSpecial.addEventListener('click', updateAndSaveSwitcherState);
  useUpper.addEventListener('click', updateAndSaveSwitcherState);
};

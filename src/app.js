import {
  clearSeedSwapTimeout,
  initSeedRandomizer,
  generatePassword,
  stopAndClearSeedRandomizer,
  updateASCIICharactersPool,
} from 'Core';
import { generateRepeatPasswordGenerationTime } from 'Utils';
import { updateCharacterNodeContent } from 'Utils/DomManipulation';

const passwordLength = 16;
let isCopyToClipboard = false;
let generatedPassword;

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

const removeGeneratedPasswordStyle = () => {
  for (let i = 0; i < passwordLength; i++)
    document.getElementById(`c-${i}`).classList.remove('password__char--g');
};

const changeGegeneratePasswordButtonToCopyClipboard = (isDisabled = false) => {
  generatePasswordButton.disabled = isDisabled;

  if (!isCopyToClipboard) {
    isCopyToClipboard = true;
    generatePasswordButton.classList.add('generate-password--clipboard');
    generatePasswordButton.textContent = 'Copy password to clipboard';
  }
};

const setGeneratedPasswordWithStyles = () => {
  for (
    let i = 0, j = 4, time = 0;
    j <= passwordLength;
    i += 4, j += 4, time += 350
  )
    setTimeout(() => {
      clearSeedSwapTimeout(i, j);
      setGeneratedPasswordCharacters(i, j);

      if (j === passwordLength) {
        repeatPasswordGenerationButton.disabled = false;
        changeGegeneratePasswordButtonToCopyClipboard();
      }
    }, time);
};

const onGeneratePasswordClick = () => {
  generatePasswordButton.disabled = true;
  generatedPassword = generatePassword(passwordLength);

  setGeneratedPasswordWithStyles();

  if (!isCopyToClipboard) {
    generatePasswordButton.removeEventListener(
      'click',
      onGeneratePasswordClick
    );
    generatePasswordButton.addEventListener('click', onCopyToClipboardClick);
  }
};

const onRepeatGeneratePasswordClick = () => {
  repeatPasswordGenerationButton.disabled = true;
  generatePasswordButton.disabled = true;

  generatedPassword = generatePassword(passwordLength);
  stopAndClearSeedRandomizer();
  initSeedRandomizer(passwordLength);

  removeGeneratedPasswordStyle();

  setTimeout(() => {
    onGeneratePasswordClick();
  }, generateRepeatPasswordGenerationTime());
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

  repeatPasswordGenerationButton.addEventListener(
    'click',
    onRepeatGeneratePasswordClick
  );
};

import {
  generatePassword,
  initSeedRandomizer,
  stopSeedRandomizer,
  updateASCIICharactersPool,
} from 'Core';

(() => {
  const useLower = document.getElementById('useLower');
  const useNumber = document.getElementById('useNumber');
  const useSpecial = document.getElementById('useSpecial');
  const useUpper = document.getElementById('useUpper');

  const passwordLength = 16;

  // Generate password
  const generatedPassword = generatePassword(passwordLength);

  for (let i = 0; i < generatedPassword.length; i++)
    document.getElementById(`c-${i}`).textContent = generatedPassword[i];

  // Init seed randomizer
  initSeedRandomizer(passwordLength);

  const toggleSwitcherState = ({ classList }) => {
    classList.toggle('switcher--checked');
  };

  // Set ASCII pool
  updateASCIICharactersPool('lower', true);
  // Set the selected option as checked
  useLower.checked = true;
  // Set styles for the selected pool
  toggleSwitcherState(useLower.parentElement);

  const asciiSwitcherCallback = ({
    target: { checked, name, parentElement },
  }) => {
    updateASCIICharactersPool(name, checked);

    toggleSwitcherState(parentElement);
  };

  useLower.addEventListener('change', asciiSwitcherCallback);

  useNumber.addEventListener('change', asciiSwitcherCallback);

  useSpecial.addEventListener('change', asciiSwitcherCallback);

  useUpper.addEventListener('change', asciiSwitcherCallback);

  document.getElementById('generate-password').addEventListener('click', () => {
    stopSeedRandomizer();
    // stopLetterSwap();
    // const generatedPassword = generateSeed(passwordLength);
    // console.log(`generatedPassword:`);
    // console.log(generatedPassword);

    // for (let i = 0; i < generatedPassword.length; i++) {
    //   document.getElementById(`c-${i}`).textContent = generatedPassword[i];
    //   document.getElementById(`c-${i}`).classList.add('password__char--g');
    // }
  });
})();

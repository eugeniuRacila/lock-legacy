import {
  generatePassword,
  initSeedRandomizer,
  stopSeedRandomizer,
  updateASCIICharactersPool,
} from 'Core';

import { initApp } from './app';

(() => {
  initApp();

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

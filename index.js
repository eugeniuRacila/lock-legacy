import {
  generatePassword,
  stopLetterSwap,
  updateASCIICharactersPool,
} from "./core/core.js";

const useLower = document.getElementById("useLower");
const useNumber = document.getElementById("useNumber");
const useSpecial = document.getElementById("useSpecial");
const useUpper = document.getElementById("useUpper");

const passwordLength = 16;

// Set ASCII pool
updateASCIICharactersPool("upper", true);

// Generate password
const generatedPassword = generatePassword(passwordLength);

for (let i = 0; i < passwordLength; i++)
  document.getElementById(`c-${i}`).textContent = generatedPassword[i];

document.getElementById("generate-password").addEventListener("click", () => {
  stopLetterSwap();
});

// Update ASCII character pool
const updateASCIIOnChange = ({ target: { checked, name } }) => {
  updateASCIICharactersPool(name, checked);
};

useLower.addEventListener("change", updateASCIIOnChange);

useNumber.addEventListener("change", updateASCIIOnChange);

useSpecial.addEventListener("change", updateASCIIOnChange);

useUpper.addEventListener("change", updateASCIIOnChange);

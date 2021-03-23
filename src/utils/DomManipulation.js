export const updateCharacterNodeContent = (i, asciiCharacter) => {
  document.getElementById(`c-${i}`).textContent = asciiCharacter;
};

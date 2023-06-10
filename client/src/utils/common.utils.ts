export const hasAllKeys = (keys: string[], obj: object) =>
  keys.every(key => Object.keys(obj).includes(key));

export const capitalize = (word: string) => {
  if (word === "") {
    return word;
  }
  return word[0].toUpperCase() + word.slice(1);
};

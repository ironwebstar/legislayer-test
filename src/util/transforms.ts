import { Profile } from "../types";

export const mergeProfiles = (arr1: Profile[], arr2: Profile[]): Profile[] => {
  const newArray = [...arr1, ...arr2];
  for (let i = 0; i < newArray.length; ++i) {
    for (let j = i + 1; j < newArray.length; ++j) {
      if (newArray[i].id.value === newArray[j].id.value) {
        newArray.splice(j, 1);
      }
    }
  }

  return newArray;
};

// Function to set key and value in browser local storage
const set = (key: string, value: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  localStorage.setItem(key, value);
};

export const LocalStorageUtils = {
  set,
};

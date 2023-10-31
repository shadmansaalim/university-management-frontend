// Imports
import { authKey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { LocalStorageUtils } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return LocalStorageUtils.set(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = LocalStorageUtils.get(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = LocalStorageUtils.get(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return LocalStorageUtils.del(key);
};

// Imports
import { LocalStorageUtils } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  LocalStorageUtils.set("accessToken", accessToken);
};

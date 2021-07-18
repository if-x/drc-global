import localForage from "localforage";

export const checkDarkMode = async (): Promise<boolean> => {
  const isDarkModePreferredInHistory = await localForage.getItem<boolean>(
    "isDarkMode"
  );

  if (isDarkModePreferredInHistory) {
    return true;
  }

  return false;
};

export const storeDarkModePreference = async (isDarkMode: boolean) => {
  await localForage.setItem("isDarkMode", isDarkMode);
};

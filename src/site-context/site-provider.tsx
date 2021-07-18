import * as React from "react";
import { throttle } from "throttle-debounce";
import { checkDarkMode, storeDarkModePreference } from "../utils/dark-mode";
import { SiteContext } from "./site-context";

const SiteProvider: React.FC = ({ children }) => {
  const [isMobile, setMobile] = React.useState<boolean>(true);
  const [isDarkMode, setDarkmode] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (window) {
      const checkDeviceSize = () => {
        const windowSize = window.innerWidth;
        if (windowSize < 767) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      };
      checkDeviceSize();
      window.addEventListener("resize", throttle(500, checkDeviceSize));

      checkDarkMode().then((isDarkModePreferred) => {
        setDarkmode(isDarkModePreferred);
      });
    }
  }, []);

  const store = {
    isMobile,
    isDarkMode,
    setDarkmode: (isDarkModePreferred: boolean) => {
      setDarkmode(isDarkModePreferred);
      storeDarkModePreference(isDarkModePreferred);
    },
  };

  return <SiteContext.Provider value={store}>{children}</SiteContext.Provider>;
};

export default SiteProvider;

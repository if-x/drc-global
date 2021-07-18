import * as React from "react";
import { navigate } from "gatsby";
import { SiteContext } from "../../../site-context/site-context";
import Image from "../../ui-library/image/image";

import LightIcon from "../../../images/icons/light-icon.svg";
import MoonIcon from "../../../images/icons/moon-icon.svg";
import { Language } from "../../../../types/language";
import styles from "./dark-mode-and-language-toggle.styles";

interface DarkModeAngLanguageToggleProps {
  currentLang?: Language;
}

const DarkModeAngLanguageToggle: React.FC<DarkModeAngLanguageToggleProps> = ({
  currentLang = "en",
}) => {
  const { isDarkMode, setDarkmode } = React.useContext(SiteContext);

  const languageLabel = currentLang === "en" ? "ZH" : "EN";
  const toggleLanguage = () => {
    navigate(currentLang === "en" ? "/zh/" : "/");
  };

  return (
    <div css={styles.root}>
      <div
        role="button"
        aria-label={languageLabel}
        css={styles.toggleButton}
        onClick={toggleLanguage}
      >
        {languageLabel}
      </div>
      <div
        role="button"
        aria-label={isDarkMode ? "Turn on light mode" : "Turn on dark mode"}
        css={styles.toggleButton}
        onClick={() => setDarkmode(!isDarkMode)}
      >
        <Image
          src={isDarkMode ? LightIcon : MoonIcon}
          alt={isDarkMode ? "Light" : "Moon"}
        />
      </div>
    </div>
  );
};

export default DarkModeAngLanguageToggle;

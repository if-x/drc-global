import { Link } from "gatsby";
import * as React from "react";
import { Language } from "../../../../types/language";
import { Theme } from "../../../../types/theme";
import { SiteContext } from "../../../site-context/site-context";
import { getUrlByLanguage } from "../../../utils/url";
import Container from "../../ui-library/container/container";
import DarkModeAngLanguageToggle from "../dark-mode-and-language-toggle/dark-mode-and-language-toggle";
import styles from "./header.styles";

export enum NavTab {
  Home = "home",
  WhitePaper = "whitePaper",
  Platform = "Platform",
  FAQs = "FAQs",
  Resources = "resources",
}

type TabName = Record<string, string>;
interface NavItem {
  id: NavTab;
  name: TabName;
  mobileName?: TabName;
  url: string;
}

const navItems: NavItem[] = [
  {
    id: NavTab.Home,
    name: { en: "HOME", zh: "首页" },
    url: "/",
  },
  {
    id: NavTab.WhitePaper,
    name: { en: "WHITE PAPER", zh: "白皮书" },
    mobileName: { en: "WHITE" },
    url: "/white-paper-1/",
  },
  {
    id: NavTab.Platform,
    name: { en: "VAULTS" },
    mobileName: { en: "VAULTS" },
    url: "/platform/",
  },
  {
    id: NavTab.FAQs,
    name: { en: "FAQS", zh: "常见问题" },
    url: "/faqs/",
  },
  {
    id: NavTab.Resources,
    name: { en: "RESOURCES", zh: "相关链接" },
    mobileName: { en: "LINKS" },
    url: "/resources/",
  },
];

interface HeaderProps {
  activeTab?: NavTab;
  lang?: Language;
}

const Header: React.FC<HeaderProps> = ({ activeTab, lang = "en" }) => {
  const { isMobile } = React.useContext(SiteContext);

  const itemStyle = (isActive: boolean) => (theme: Theme) =>
    [styles.item(theme), isActive && styles.itemActive(theme)];

  return (
    <header css={styles.root}>
      <Container fullWidthOnMobile={true}>
        <nav css={styles.nav}>
          {navItems.map(
            (item) =>
              item.name[lang] && (
                <Link
                  key={item.id}
                  to={getUrlByLanguage({ url: item.url, lang })}
                  css={itemStyle(activeTab === item.id)}
                >
                  {isMobile && (item.mobileName?.[lang] || item.name[lang])}
                  {!isMobile && item.name[lang]}
                </Link>
              )
          )}
        </nav>
      </Container>

      <div css={styles.darkModeToggle}>
        <DarkModeAngLanguageToggle currentLang={lang} />
      </div>
    </header>
  );
};

export default Header;

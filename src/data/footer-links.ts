import TelegramSmIcon from "../images/resources/telegram-sm.svg";
import TwitterSmIcon from "../images/resources/twitter-sm.svg";
import DiscordSmIcon from "../images/resources/discord-sm.svg";
import UniswapSmIcon from "../images/resources/uniswap-sm.svg";
import CoingeckoSmIcon from "../images/resources/coingecko-sm.svg";
import LinkedInSmIcon from "../images/resources/linkedin-sm.svg";
import MediumSmIcon from "../images/resources/medium-sm.svg";
import EmailSmIcon from "../images/resources/email-sm.svg";
import { communityLinks, informationLink, marketLinks } from "./resource-links";

export const footerLinks = [
  {
    name: "Telegram",
    icon: TelegramSmIcon,
    url: communityLinks.telegram.url,
  },
  {
    name: "Twitter",
    icon: TwitterSmIcon,
    url: communityLinks.twitter.url,
  },
  {
    name: "Discord",
    icon: DiscordSmIcon,
    url: communityLinks.discord.url,
  },
  {
    name: "LinkedIn",
    icon: LinkedInSmIcon,
    url: informationLink.linkedIn.url,
  },
  {
    name: "Uniswap",
    icon: UniswapSmIcon,
    url: marketLinks.uniswapInfo.url,
  },
  {
    name: "Medium",
    icon: MediumSmIcon,
    url: informationLink.medium.url,
  },
  {
    name: "CoinGecko",
    icon: CoingeckoSmIcon,
    url: marketLinks.coingecko.url,
  },
  {
    name: "Email",
    icon: EmailSmIcon,
    url: informationLink.email.url,
  },
];

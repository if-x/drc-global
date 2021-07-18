import { Language } from "../../../types/language";
import { ROADMAP } from "../../constants/elements";

interface StoryOfDRC {
  title: string;
  contents: string[];
}

export const STORY_OF_DRC: Record<Language, StoryOfDRC> = {
  en: {
    title: "The Story of DRC",
    contents: [
      'Digital Reserve Currency was designed to become a decentralized digital store of value with a limited supply and a zero inflation rate. It was created during the COVID-19 crisis when fiscal and monetary policies have exposed serious vulnerabilities in the current financial system. The concept of the Digital Reserve Currency was developed by <a href="https://www.linkedin.com/in/maximnurov/" target="_blank" rel="noreferrer">Maxim Nurov</a>, founder of Digital Finance, Washington, DC, financial company that specializes in the digital assets market.',
      `100% of the total DRC token supply has been issued directly to the Uniswap market with an intentionally small market cap to allow early adopters to establish inexpensive exposure to DRC if they believe it will have a larger market in the future. The DRC token is fully developed and operational and has a unique utility of providing exclusive access to the Digital Reserve, an online platform within the DRC ecosystem. No one has control over DRC nor provides essential managerial efforts that affect its success as DRC has fully decentralized structure. <a href="#${ROADMAP}">See the DRC Roadmap</a>.`,
    ],
  },
  zh: {
    title: "DRC的故事",
    contents: [
      '数字储备货币（DRC）旨在成为去中心化的数字价值储藏，其供应有限且通货膨胀率为零。它是在新冠病毒危机期间创建的，因为当时财政和货币政策暴露了目前金融体系中的严重漏洞。数字储备货币的概念是由专门从事比特币市场的华盛顿特区数字金融公司创始人<a href="https://www.linkedin.com/in/maximnurov/" target="_blank" rel="noreferrer">马克西姆·努罗夫</a>（Maxim Nurov）提出的。',
      "目前100％的DRC代币供应已上市，并可以在Uniswap分散式交易所进行交易，其市值故意做得较小，为了让相信未来会拥有更大的市场的早起采用者建立起以公道价格接触DRC的方式。 DRC代币已全面开发并投入运营。由于DRC拥有完全去中心化的结构，因此没有人可以控制DRC，也无法提供任何必要的管理措施去影响其成功。",
    ],
  },
};

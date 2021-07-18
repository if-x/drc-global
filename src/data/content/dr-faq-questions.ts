import { communityLinks } from "../resource-links";

export const DR_FAQ_QUESTIONS = [
  {
    question: "What’s different between the DRC Vault and DR Vault Sets?",
    answer: [
      "While DRC Vault’s main purpose is to securely store DRC and it better serves users who believe in the token price appreciation, DR Vault Sets are designed for diversification and hedging purposes and allow users to easily convert their DRC to SoV and alternative assets, based on individual financial goals and risk tolerance.",
    ],
  },
  {
    question: "How do I start using the DRC Vault or DR Vault Sets??",
    answer: [
      "If you currently hold DRC tokens in your non-custodial wallet, such as MetaMask, you can start using the DR straight away. All you need to do is consider which DR option is right for you, then ‘Launch App’ and ‘Connect Wallet’ to access your secure DRC Vault or DR Vault Set Dashboard. Next, choose the amount of DRC tokens you would like to deposit, then approve, confirm and complete the transaction.",
    ],
  },
  {
    question: "What are the benefits of using the DR Vault Sets?",
    answer: [
      "Digital Reserve is an online platform where DRC holders can get instant exposure to the baskets of the most efficient store of value assets, by utilising DR Vault Sets, with the purpose of capital preservation and hedging inflation risks. DRC holders will also have access to alternative vaults, designed for users with higher risk tolerance.",
      "DR Vault Set users can take advantage of the portfolio diversification benefits, portfolio rebalancing, and security of holdings. Also, DR platform offers user friendly interface, instant deposits and withdrawals, and portfolio performance tracking.",
    ],
  },
  {
    question: "What are the risks involved with using the DR Vault Sets?",
    answer: [
      "The value of assets held in DR Vault Sets can fluctuate because of the market conditions and there can be a substantial risk that you lose money depositing DRC into DR Vault Sets. You should carefully consider whether using DR Vault Sets is suitable for you in light of your individual risk profile and financial condition.",
    ],
  },
  {
    question: "Where does my DRC go when I deposit into a DR Vault Set?",
    answer: [
      "The deposited DRC will first be converted to WETH via the Uniswap router. The WETH will then be divided by the portfolio assets' allocation percentages, and converted to those assets.",
      "The new assets' total worth is then calculated and minted as DR-POD.",
      "The new DR-POD total will be the new total worth divided by the current unit price. The newly minted amount of DR-POD will then be given to you as your Proof of Deposit, in your DR Vault Set.",
    ],
  },
  {
    question: "What is DR-POD?",
    answer: [
      "DR-POD is a Proof of Deposit given to a user upon their deposit of DRC into a DR Vault Set. DR-POD is only ever minted at the time of a deposit into a DR Vault Set and is burnt at the time of a withdrawal through the Digital Reserve.",
      "The initial supply of DR-POD in a DR Vault Set always starts at 0. A Genesis Deposit of 1000 DRC to each respective DR Vault Set is made by the DRC Foundation Multi-sig wallet to create the initial DR-POD supply with a favourable numerical value.",
      "The unit price of DR-POD equals to the total DR Vault Set holding worth, divided by the total supply of DR-POD.",
      "The total supply of DR-POD will change according to the value of subsequent deposits into the Vault. When new assets are stored in a DR Vault Set, the new total assets worth, divided by the DR-POD unit price gives the new DR-POD total supply. The newly minted DR-POD goes to the depositor.",
      "This allows the DR Smart Contract to make precise calculations of DR-POD's value in relation to the Vault's assets. From this value, withdrawals from DR Vault Sets are processed and historical price analyses are formulated.",
    ],
  },
  {
    question: "What is DR-POD's Net Asset Value?",
    answer: [
      "DR-POD’s Net Asset Value (NAV) is the DR Vault Set's total asset worth, divided by the total supply of DR-POD in its respective DR Vault Set.",
      "The price oracle function for DR-POD’s Net Asset Value is provided in the DR Smart Contract.",
    ],
  },
  {
    question: "What is rebalancing and how does DR do this?",
    answer: [
      "Rebalancing is the process of realigning the weighting of a portfolio of assets to the strategy allocation that is defined.",
      "When rebalancing, the DR Smart Contract will check each of the portfolio asset's worth, and the DR Vault's total worth. Based on the designed portfolio allocations, the DR Smart Contract will calculate how much each asset should be worth.",
      "Some of the assets' worth might exceed what it should be, whilst some would be below what it should be. The DR Smart Contract will then convert the overflowed parts of the assets to ETH. And then further swap the ETH to make up for the assets that are below the designed percentage value.",
      `Rebalancing is only executable by the DR Smart Contract owner - <a href="https://drc.foundation/fund/" target="_blank" rel="noreferrer">the DRC Foundation Fund Multi-sig Wallet</a> and will occur either weekly or monthly, depending on market conditions.`,
    ],
  },
  {
    question: "What happens when I withdraw from a DR Vault Set?",
    answer: [
      "When you choose to withdraw your capital from a DR Vault Set, the DR Smart Contract will calculate the share of the assets you wish to withdraw and convert that to WETH, then further convert to DRC and transfer to your personal wallet.",
    ],
  },
  {
    question: "What happens if there’s not enough DRC liquidity?",
    answer: [
      "This is not possible based on how the Uniswap Router and AMM (Automatic Market Making) mechanics work. There will always be liquidity in the DRC Liquidity Pool as it is time-locked and unable to be pulled unexpectedly from the decentralised Uniswap market. The main DRC Liquidity Pool keys will also be managed by the DRC Foundation upon unlock in May 2021.",
    ],
  },
  {
    id: "security-audit",
    question: "Is the DR Smart Contract audited and secure?",
    answer: [
      `Yes, the DR Smart Contract is secure and has been audited. It was audited by Dedaub and you can read the <a href="/files/dr-audit-report.pdf" target="_blank" rel="noreferrer">Security Audit Report PDF</a>. All Critical Issues raised during the auditing process were resolved and incorporated into the Ethereum Mainnet DR Smart Contract code.`,
    ],
  },
  {
    question: "Does the DR have an insurance policy?",
    answer: [
      "The Digital Reserve does not provide insurance coverage of funds held in the DR Vault Sets or DRC Vault.",
      "Please note that DR Smart Contract security was verified by an independent blockchain development firm and DR admins are not able to withdraw any funds from DR Vaults, because of the DR Smart Contract restrictions.",
    ],
  },
  {
    question: "Should I use the DR Vault Sets or just hold DRC?",
    answer: [
      "If you already hold DRC tokens, using the Digital Reserve is optional, as you can simply hold DRC tokens and rely on its potential price appreciation. Utilising the DRC Vault is one way to hold your DRC and still be part of a decentralised application to securely store your DRC tokens.",
    ],
  },
  {
    question: "I need some help, how can I get support?",
    answer: [
      `Feel free to jump onto either the <a href="${communityLinks.telegram.url}" target="_blank" rel="noreferrer">DRC Telegram Group</a> or <a href="${communityLinks.discord.url}" target="_blank" rel="noreferrer">DRC Discord Channel</a> and let us know what help or support you need with using the Digital Reserve.`,
      "A YouTube tutorial will be provided soon.", // TODO
    ],
  },
];

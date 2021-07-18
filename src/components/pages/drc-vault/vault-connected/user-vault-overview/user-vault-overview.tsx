import * as React from "react";
import Back from "../../../../ui-library/breadcrumb/back";
import { grid } from "../../../../ui-library/design-tokens/grid";
import DrCard from "../../../../ui-library/vault-components/dr-card/dr-card";
import Heading from "../../../../ui-library/text/heading";
import { SiteContext } from "../../../../../site-context/site-context";
import Separator from "../../../../ui-library/separator/separator";
import { DR_OVERVIEW } from "../../../../../constants/elements";
import Badge from "../../../../ui-library/badge/badge";
import { ChainNames } from "../../../../../constants/chain-id";
import LinkOut from "../../../../ui-library/link-out/link-out";
import { getAddressUrl } from "../../../../../utils/etherscan";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../utils/format-number";
import { CurrencySymbol } from "../../../../../../types/currency";
import { getContractAddress } from "../../../../../data/dr/contract-by-network";
import { DrcVaultContext } from "../../../../../site-context/dr-context/drc-vault-context";
import styles from "./user-vault-overview.styles";

const UserVaultOverview: React.FC = () => {
  const {
    chainId,
    userAccount,
    drcBalance,
    drcPrice: { data: drcPrice },
    userVaultHolding: { data: holding },
    disconnectWallet,
  } = React.useContext(DrcVaultContext);

  const { isMobile } = React.useContext(SiteContext);
  const usdValue =
    holding !== undefined && drcPrice ? holding * drcPrice : undefined;

  return (
    <div id={DR_OVERVIEW} css={styles.root}>
      <div css={styles.back}>
        <Back url="/platform/" label="DR Vaults" />
      </div>

      <div css={styles.disconnect} onClick={disconnectWallet}>
        Disconnect wallet
      </div>

      <DrCard isNoPadding={true} isNoBorderBottom={isMobile}>
        <a
          css={styles.buyDrcButton}
          href={`https://app.uniswap.org/#/swap?outputCurrency=${getContractAddress(
            "drc",
            chainId
          )}&use=V2`}
          target="_blank"
          rel="noreferrer"
        >
          <Badge>Buy DRC</Badge>
        </a>

        {(chainId === 1 || chainId === 3) && (
          <div css={styles.badge}>
            <Badge>{ChainNames[chainId]}</Badge>
          </div>
        )}

        <div css={styles.topContainer}>
          <div css={styles.walletHeading}>Your Connected Wallet</div>
          <div css={styles.drcBalance}>
            {formatNumber({ value: drcBalance.data }) || "loading"} DRC
          </div>
          <LinkOut url={getAddressUrl(userAccount, chainId)} isCenter={true}>
            {userAccount.slice(0, 10)}...{userAccount.slice(-8)}
          </LinkOut>
        </div>

        <Separator />

        <div css={styles.bottomContainer}>
          <Heading
            component="h2"
            textAlign="center"
            margin={{ bottom: grid(1.5) }}
          >
            Your DRC Vault Holdings
          </Heading>

          <div css={styles.userVaultWorth}>
            {formatNumber({
              value: holding,
            }) || "-"}{" "}
            DRC
          </div>

          <div css={styles.text}>
            {formatCurrency({
              value: usdValue,
              round: 2,
              currency: CurrencySymbol.USD,
            }) || "$-"}{" "}
            USD
          </div>
        </div>
      </DrCard>
    </div>
  );
};

export default UserVaultOverview;

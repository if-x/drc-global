import * as React from "react";
import Back from "../../../../ui-library/breadcrumb/back";
import Button from "../../../../ui-library/button/button";
import { grid } from "../../../../ui-library/design-tokens/grid";
import DrCard from "../../../../ui-library/vault-components/dr-card/dr-card";
import MarginBox from "../../../../ui-library/margin-box/margin-box";
import Heading from "../../../../ui-library/text/heading";
import { DrContext } from "../../../../../site-context/dr-context/dr-context";
import { SiteContext } from "../../../../../site-context/site-context";
import Separator from "../../../../ui-library/separator/separator";
import { DR_OVERVIEW, MANAGE_DR } from "../../../../../constants/elements";
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
import { anchorToElement } from "../../../../../utils/dom/anchor-to-hash";
import { SetId } from "../../../../../../types/dr-vault";
import styles from "./user-vault-overview.styles";

const urlMapping: Record<SetId, string> = {
  s1: "/platform/",
  s2: "/platform/",
  s3: "/platform/?drVaultType=alternate",
};

const UserVaultOverview: React.FC = () => {
  const {
    setId,
    isArchived,
    chainId,
    userAccount,
    appState,
    drcBalance,
    userVaultInfo,
    disconnectWallet,
  } = React.useContext(DrContext);

  const { isMobile } = React.useContext(SiteContext);

  const handleClickDeposit = () => {
    appState.setActiveDrAction("deposit");
    anchorToElement(MANAGE_DR);
  };

  const handleClickWithdraw = () => {
    appState.setActiveDrAction("withdraw");
    anchorToElement(MANAGE_DR);
  };

  return (
    <div id={DR_OVERVIEW} css={styles.root}>
      <div css={styles.back}>
        <Back url={urlMapping[setId]} label="DR Vaults" />
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
            Your DR Vault {setId} Value
          </Heading>

          <div css={styles.userVaultWorth}>
            {formatCurrency({
              value: userVaultInfo.data?.userHoldingUsd,
              currency: CurrencySymbol.USD,
            }) || "$-"}
          </div>

          <MarginBox margin={{ bottom: grid(3) }}>
            <div css={styles.text}>
              Equivalent to{" "}
              {formatNumber({
                value: userVaultInfo.data?.totalWorthInDrc,
              })}{" "}
              DRC
            </div>
          </MarginBox>

          <div css={styles.buttonContainer}>
            {!isArchived && (
              <Button
                css={styles.button}
                type="primary"
                onClick={handleClickDeposit}
              >
                DEPOSIT
              </Button>
            )}
            <Button
              css={styles.button}
              type="primary"
              onClick={handleClickWithdraw}
            >
              WITHDRAW
            </Button>
          </div>
        </div>
      </DrCard>
    </div>
  );
};

export default UserVaultOverview;

import * as React from "react";
import { CurrencySymbol } from "../../../../../../types/currency";
import { DrContext } from "../../../../../site-context/dr-context/dr-context";
import { SiteContext } from "../../../../../site-context/site-context";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../utils/format-number";
import Column from "../../../../ui-library/column-system/column";
import Row from "../../../../ui-library/column-system/row";
import InfoCardLarge from "../../../../ui-library/vault-components/info-card/info-card-large";

const UserVaultSnapshot: React.FC = () => {
  const {
    setId,
    userVaultInfo: { data: userVaultInfo },
    drcPrice: { data: drcPrice = 0 },
    userPastInteraction: { data: userPastInteraction },
  } = React.useContext(DrContext);

  const { isMobile } = React.useContext(SiteContext);

  // const drcDiff = userPastInteraction
  //   ? userPastInteraction.totalWidthdrawAmount +
  //     (userVaultInfo?.totalWorthInDrc || 0) -
  //     userPastInteraction.totalDepositAmount
  //   : 0;

  const usdDiff = userPastInteraction
    ? userPastInteraction.totalWidthdrawUsdWorth +
      (userVaultInfo?.userHoldingUsd || 0) -
      userPastInteraction.totalDepositUsdWorth
    : 0;

  return (
    <Row>
      <Column
        spanLg={4}
        spanMd={4}
        spanSm={12}
        isNoMarginBottom={!isMobile}
        isNarrowMargin={isMobile}
      >
        <InfoCardLarge
          label="Your Last DRC Deposit"
          value={
            formatNumber({
              value: userPastInteraction?.lastDepositedAmount,
              round: 2,
            }) || "-"
          }
          secondaryLabel="Last DRC Deposit USD Value"
          secondaryValue={`${
            userPastInteraction
              ? formatCurrency({
                  value: userPastInteraction.lastDepositedUsdWorth,
                  currency: CurrencySymbol.USD,
                })
              : "$-"
          } USD`}
        />
      </Column>
      <Column
        spanLg={4}
        spanMd={4}
        spanSm={12}
        isNoMarginBottom={!isMobile}
        isNarrowMargin={isMobile}
      >
        <InfoCardLarge
          label={`Your DR Vault ${setId} Value`}
          value={`${
            formatCurrency({
              value: userVaultInfo?.userHoldingUsd,
              currency: CurrencySymbol.USD,
            }) || "-"
          } USD`}
          secondaryLabel="Amount of DR-POD"
          secondaryValue={`${
            formatNumber({ value: userVaultInfo?.drPodBalance, round: 2 }) ||
            "-"
          } DR-POD`}
        />
      </Column>
      <Column
        spanLg={4}
        spanMd={4}
        spanSm={12}
        isNoMarginBottom={!isMobile}
        isNarrowMargin={isMobile}
      >
        <InfoCardLarge
          label="Your USD Profit/Loss"
          value={`${usdDiff > 0 ? "+" : ""}${
            formatCurrency({
              value: usdDiff,
              currency: CurrencySymbol.USD,
              round: 2,
            }) || "-"
          }`}
          secondaryLabel="Equivalent DRC"
          secondaryValue={`${usdDiff > 0 ? "+" : ""}${
            formatNumber({
              value: drcPrice ? Math.round(usdDiff / drcPrice) : null,
            }) || "-"
          } DRC`}
        />
      </Column>
    </Row>
  );
};

export default UserVaultSnapshot;

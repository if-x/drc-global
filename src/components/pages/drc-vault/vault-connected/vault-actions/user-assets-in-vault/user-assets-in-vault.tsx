import * as React from "react";
import { CurrencySymbol } from "../../../../../../../types/currency";
import LogoBlack from "../../../../../../images/logo-round-black.svg";
import LogoWhite from "../../../../../../images/logo-round-white.svg";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../../utils/format-number";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import Text from "../../../../../ui-library/text/text";
import { Fonts } from "../../../../../ui-library/design-tokens/fonts";
import { DrcVaultContext } from "../../../../../../site-context/dr-context/drc-vault-context";
import { SiteContext } from "../../../../../../site-context/site-context";
import Image from "../../../../../ui-library/image/image";
import PercentagePieChart from "../../../../../ui-library/vault-components/allocation-pie-chart/percentage-pie-chart";
import styles from "./user-assets-in-vault.styles";

const UserAssetsInVault: React.FC = () => {
  const {
    drcPrice: { data: drcPrice },
    userVaultHolding: { data: holding },
    totalVaultHolding: { data: total },
  } = React.useContext(DrcVaultContext);

  const { isDarkMode } = React.useContext(SiteContext);

  const logo = isDarkMode ? LogoWhite : LogoBlack;

  const usdValue =
    holding !== undefined && drcPrice ? holding * drcPrice : undefined;

  const percentage =
    holding && total ? Math.round((holding / total) * 1000) / 10 : 0;

  return (
    <div>
      <div css={styles.content}>
        <div css={styles.headingContainer}>
          <div css={styles.imageContainer}>
            <Image src={logo} alt="Logo" />
          </div>

          <Text
            component="div"
            weight={Fonts.Weight.Bold}
            margin={{ bottom: grid(0.5) }}
          >
            Your DRC share in DRC Vault
          </Text>
          <Text
            component="div"
            textSize={24}
            weight={Fonts.Weight.Bold}
            margin={{ bottom: grid(0.5) }}
          >
            {formatNumber({
              value: holding,
            }) || "-"}{" "}
            DRC
          </Text>
          <Text component="div" type="secondary" textSize={14}>
            {formatCurrency({
              value: usdValue,
              round: 2,
              currency: CurrencySymbol.USD,
            }) || "$-"}{" "}
            USD
          </Text>
        </div>

        <PercentagePieChart percentage={percentage} />
      </div>
    </div>
  );
};

export default UserAssetsInVault;

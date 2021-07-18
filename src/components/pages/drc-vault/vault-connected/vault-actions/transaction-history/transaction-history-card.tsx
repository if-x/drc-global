import * as React from "react";
import AnimateHeight from "react-animate-height";
import ChevronBlackIcon from "../../../../../../images/icons/chevron-icon-black.svg";
import ChevronWhiteIcon from "../../../../../../images/icons/chevron-icon-white.svg";
import ArrowIconWhite from "../../../../../../images/icons/arrow-icon-white.svg";
import ArrowIconBlack from "../../../../../../images/icons/arrow-icon-black.svg";
import { SiteContext } from "../../../../../../site-context/site-context";
import Separator from "../../../../../ui-library/separator/separator";
import InfoCard from "../../../../../ui-library/vault-components/info-card/info-card";
import Image from "../../../../../ui-library/image/image";
import { DrcVaultTransactionInfo } from "../../../../../../../types/dr-vault";
import Text from "../../../../../ui-library/text/text";
import { Fonts } from "../../../../../ui-library/design-tokens/fonts";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import LinkOut from "../../../../../ui-library/link-out/link-out";
import { getTransactionUrl } from "../../../../../../utils/etherscan";
import { formatNumber } from "../../../../../../utils/format-number";
import { DrcVaultContext } from "../../../../../../site-context/dr-context/drc-vault-context";
import styles from "./transaction-history-card.styles";

interface TransactionHistoryCardProps extends DrcVaultTransactionInfo {
  isDefaultOpen?: boolean;
}

const TransactionHistoryCard: React.FC<TransactionHistoryCardProps> = ({
  isDefaultOpen,
  eventName,
  transactionHash,
  timeFormated,
  drcAmount,
}) => {
  const { isDarkMode } = React.useContext(SiteContext);
  const { chainId } = React.useContext(DrcVaultContext);

  const [isOpen, setOpen] = React.useState<boolean>(isDefaultOpen || false);

  const chevronIcon = isDarkMode ? ChevronWhiteIcon : ChevronBlackIcon;
  const arrowIcon = isDarkMode ? ArrowIconWhite : ArrowIconBlack;

  const isArrowDown = eventName === "Deposit";

  return (
    <InfoCard isNoPadding={true}>
      <div css={styles.cardHeader} onClick={() => setOpen(!isOpen)}>
        <div css={[styles.arrow, isArrowDown && styles.arrowDown]}>
          <Image src={arrowIcon} alt="Arrow" />
        </div>
        <div css={styles.heading}>
          <Text
            component="div"
            textSize={20}
            weight={Fonts.Weight.Bold}
            margin={{ bottom: grid(1) }}
          >
            {eventName}
          </Text>

          <Text component="div" type="secondary" textSize={12}>
            {timeFormated}
          </Text>
        </div>

        <div
          css={[
            styles.chevron,
            {
              transform: `rotateX(${isOpen ? 0 : 180}deg)`,
            },
          ]}
        >
          <Image src={chevronIcon} alt="Chevron icon" />
        </div>
      </div>

      <AnimateHeight duration={200} height={isOpen ? "auto" : 0}>
        <Separator />

        <div css={styles.content}>
          <Text
            component="div"
            weight={Fonts.Weight.Bold}
            margin={{ bottom: grid(1) }}
          >
            Amount
          </Text>

          <Text component="div" type="secondary" margin={{ bottom: grid(2) }}>
            {!!drcAmount && `${formatNumber({ value: drcAmount })} DRC`}
          </Text>

          <Text
            component="div"
            weight={Fonts.Weight.Bold}
            margin={{ bottom: grid(1) }}
          >
            Transaction Hash
          </Text>

          <LinkOut
            url={getTransactionUrl(transactionHash, chainId)}
            underline={true}
          >
            {transactionHash.slice(0, 25)}...
          </LinkOut>
        </div>
      </AnimateHeight>
    </InfoCard>
  );
};

export default TransactionHistoryCard;

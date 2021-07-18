import * as React from "react";
import { DrContext } from "../../../../../../site-context/dr-context/dr-context";
import { SiteContext } from "../../../../../../site-context/site-context";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import Loader from "../../../../../ui-library/loader/loader";
import MarginBox from "../../../../../ui-library/margin-box/margin-box";
import SlideOut from "../../../../../ui-library/slide-out/slide-out";
import Heading from "../../../../../ui-library/text/heading";
import SlideOutHeader from "../../../../../ui-library/vault-components/slide-out-vault-info/slide-out-header";
import styles from "./transaction-history.styles";
import TransactionHistoryCard from "./transaction-history-card";

interface SlideOutTransactionHistoriesProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutTransactionHistories: React.FC<SlideOutTransactionHistoriesProps> =
  ({ isOpen, onClose }) => {
    const {
      userTransactions: { data: transactions, loading },
    } = React.useContext(DrContext);

    const { isMobile } = React.useContext(SiteContext);

    return (
      <SlideOut
        isOpen={isOpen}
        onHide={onClose}
        isFullWidthOnMobile={true}
        enableBodyLock={true}
      >
        <div css={styles.root}>
          <SlideOutHeader
            heading="Your transaction history"
            onClose={onClose}
          />

          <div css={styles.content}>
            {isMobile && (
              <Heading margin={{ bottom: grid(3) }}>
                Your transaction history
              </Heading>
            )}

            {loading && <Loader />}

            {transactions?.map((tx, index) => (
              <MarginBox key={tx.id} margin={{ bottom: grid(2) }}>
                <TransactionHistoryCard {...tx} isDefaultOpen={index === 0} />
              </MarginBox>
            ))}
          </div>
        </div>
      </SlideOut>
    );
  };

export default SlideOutTransactionHistories;

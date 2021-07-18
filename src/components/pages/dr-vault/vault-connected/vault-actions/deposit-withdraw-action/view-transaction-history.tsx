import * as React from "react";
import ListIcon from "../../../../../../images/icons/list-icon.svg";
import Image from "../../../../../ui-library/image/image";
import { DrContext } from "../../../../../../site-context/dr-context/dr-context";
import SlideOutTransactionHistories from "../transaction-history/transaction-history";
import styles from "./deposit-withdraw-action.styles";

const ViewTransactionHistory: React.FC = () => {
  const [isTxHistoryOpen, setTxHistoryOpen] = React.useState<boolean>(false);

  const {
    userTransactions: { data: userTransactions },
  } = React.useContext(DrContext);

  return (
    <>
      {userTransactions && userTransactions.length > 0 && (
        <div
          css={styles.txHistoryButton}
          onClick={() => setTxHistoryOpen(true)}
        >
          <Image src={ListIcon} alt="List" />
          View transaction history
        </div>
      )}

      <SlideOutTransactionHistories
        isOpen={isTxHistoryOpen}
        onClose={() => setTxHistoryOpen(false)}
      />
    </>
  );
};

export default ViewTransactionHistory;

import * as React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import TickIcon from "../../../images/icons/tick-icon.svg";
import FailedIcon from "../../../images/icons/failed-icon.svg";
import LinkIconBlack from "../../../images/icons/link-icon-black.svg";
import LinkIconWhite from "../../../images/icons/link-icon-white.svg";
import { Colors } from "../design-tokens/colors";
import Image from "../image/image";
import ToastCard from "../toast-card/toast-card";
import Text from "../text/text";
import { Fonts } from "../design-tokens/fonts";
import { grid } from "../design-tokens/grid";
import { SiteContext } from "../../../site-context/site-context";
import { TransactionStatus } from "../../../../types/dr-vault";
import styles from "./transaction-status-toast.styles";

interface TransactionStatusToastProps {
  status: TransactionStatus;
  name: string;
  titleOverwrite?: string;
  message: string;
  timeOut?: number;
  url?: string;
}

const nameMapping: Record<TransactionStatus, string> = {
  none: "",
  pending: "pending...",
  success: "successful!",
  failed: "unsuccessful",
};

const TransactionStatusToast: React.FC<TransactionStatusToastProps> = ({
  status,
  name,
  titleOverwrite,
  message,
  timeOut,
  url,
}) => {
  const [isVisible, setVisible] = React.useState<boolean>(false);
  const [renderStatus, setRenderStatus] =
    React.useState<TransactionStatus>(status);

  const { isDarkMode } = React.useContext(SiteContext);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status !== "none") {
      setVisible(true);
      setRenderStatus(status);
    }

    if (isVisible && status !== "pending") {
      const action = () => {
        setVisible(false);
        setRenderStatus(status);
      };

      timer = setTimeout(action, timeOut || 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  const linkIcon = isDarkMode ? LinkIconWhite : LinkIconBlack;

  return (
    <ToastCard isVisible={isVisible}>
      <div css={styles.root}>
        <div css={styles.icon}>
          {renderStatus === "pending" && (
            <BounceLoader size={40} color={Colors.MidGrey} />
          )}
          {renderStatus === "success" && <Image src={TickIcon} alt="Success" />}
          {renderStatus === "failed" && <Image src={FailedIcon} alt="Failed" />}
        </div>

        <div>
          <Text
            component="div"
            textSize={{ desktop: 18 }}
            weight={Fonts.Weight.Bold}
            margin={{ bottom: grid(0.5) }}
          >
            {titleOverwrite || `${name} ${nameMapping[renderStatus]}`}
          </Text>
          <Text component="div" type="secondary" textSize={{ desktop: 12 }}>
            {message}
          </Text>
        </div>

        {url && (
          <a href={url} css={styles.linkIcon} target="_blank" rel="noreferrer">
            <Image src={linkIcon} alt="Link" />
          </a>
        )}
      </div>
    </ToastCard>
  );
};

export default TransactionStatusToast;

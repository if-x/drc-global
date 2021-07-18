import * as React from "react";
import { WalletContext } from "../../../../site-context/dr-context/wallet-context";
import { grid } from "../../../ui-library/design-tokens/grid";
import ItemPickerTabs from "../../../ui-library/item-picker-tabs/item-picker-tabs";
import Loader from "../../../ui-library/loader/loader";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Heading from "../../../ui-library/text/heading";
import Text from "../../../ui-library/text/text";
import {
  getDrcVaultPerformanceTimeline,
  TokenValueTimeStep,
} from "../../../../utils/web3/drc-vault/drc-vault-performance-timeline";
import PerformanceLineChart from "./performance-line-chart";
import styles from "./drc-vault-performance-graph.styles";

interface DrcVaultPerformanceGraphProps {
  contractAddress: string;
}

type ChartTab = "price" | "tvl";
const items: { value: ChartTab; label: string }[] = [
  { label: "PRICE", value: "price" },
  { label: "TVL", value: "tvl" },
];

const DrcVaultPerformanceGraph: React.FC<DrcVaultPerformanceGraphProps> = ({
  contractAddress,
}) => {
  const [activeTab, setActiveTab] = React.useState<ChartTab>("price");
  const [data, setData] = React.useState<TokenValueTimeStep[]>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const context = React.useContext(WalletContext);
  const web3 = !context.loading ? context.web3 : undefined;

  React.useEffect(() => {
    if (web3) {
      setLoading(true);
      getDrcVaultPerformanceTimeline({ web3, contractAddress }).then((res) => {
        setLoading(false);
        if (res && res.length) {
          setData(res);
        }
      });
    }
  }, [web3]);

  if (loading) {
    return (
      <MarginBox
        margin={{ desktop: { bottom: grid(8) }, mobile: { bottom: grid(7) } }}
      >
        <Loader />
      </MarginBox>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <MarginBox
      margin={{ desktop: { bottom: grid(8) }, mobile: { bottom: grid(7) } }}
    >
      <div css={styles.headerContainer}>
        <div>
          <Heading margin={{ bottom: grid(1) }}>DRC Vault performance</Heading>
          <Text
            component="div"
            type="secondary"
            textSize={14}
            margin={{ mobile: { bottom: grid(2) } }}
          >
            {activeTab === "price"
              ? "Price performance since genesis deposit"
              : "Total Value Locked since genesis deposit"}
          </Text>
        </div>

        <div css={styles.itemPickerContainer}>
          <ItemPickerTabs
            itemPickerName="drPerformanceChart"
            items={items}
            activeItemValue={activeTab}
            onItemClick={(value) => setActiveTab(value as ChartTab)}
            isUniWidth={true}
            size="small"
          />
        </div>
      </div>
      <PerformanceLineChart data={data} dataKey={activeTab} />
    </MarginBox>
  );
};

export default DrcVaultPerformanceGraph;

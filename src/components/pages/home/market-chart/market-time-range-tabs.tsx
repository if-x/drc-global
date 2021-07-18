import * as React from "react";
import { MarketDays } from "../../../../../types/coin-market-data";
import ItemPickerTabs from "../../../ui-library/item-picker-tabs/item-picker-tabs";

interface TimeRangeTab {
  label: string;
  value: MarketDays;
}

export const marketTimeRangeTabs: TimeRangeTab[] = [
  {
    label: "24h",
    value: "1",
  },
  {
    label: "7d",
    value: "7",
  },
  {
    label: "14d",
    value: "14",
  },
  {
    label: "30d",
    value: "30",
  },
  // {
  //   label: "90d", // Add these tabs when this token have more history
  //   value: "90",
  // },
  // {
  //   label: "180d",
  //   value: "180",
  // },
  // {
  //   label: "1y",
  //   value: "365",
  // },
  {
    label: "Max",
    value: "max",
  },
];

interface MarketTimeRangeTabsProps {
  activeTab: MarketDays;
  setActiveTab: (tab: MarketDays) => void;
}

const MarketTimeRangeTabs: React.FC<MarketTimeRangeTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  // const { isMobile } = React.useContext(SiteContext);

  return (
    <ItemPickerTabs
      itemPickerName="coinMarketChartType"
      activeItemValue={activeTab}
      items={marketTimeRangeTabs}
      isUniWidth={true}
      // isScrollable={isMobile} // Make is scrollable when we add 90 days tab and more
      onItemClick={(item) => setActiveTab(item as MarketDays)}
    />
  );
};

export default MarketTimeRangeTabs;

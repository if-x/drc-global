import * as React from "react";
import {
  addUrlParameterToLocation,
  getUrlParamStringByName,
} from "../../../../utils/url";
import { grid } from "../../../ui-library/design-tokens/grid";
import ItemPickerTabs from "../../../ui-library/item-picker-tabs/item-picker-tabs";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import ArchivedVaults from "./vault-categories/archived-vaults";
import SovVaults from "./vault-categories/sov-vaults";

type VaultType = "sov" | "archived";
interface TabItem {
  label: string;
  value: VaultType;
}

const items: TabItem[] = [
  {
    label: "Store of value",
    value: "sov",
  },
  {
    label: "ARCHIVED VAULTS",
    value: "archived",
  },
];

const DrVaults: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<VaultType>("sov");

  React.useEffect(() => {
    const tabFromUrl = getUrlParamStringByName("drVaultType");
    console.log("tabFromUrl", tabFromUrl);
    if (tabFromUrl && tabFromUrl.trim() !== "") {
      console.log("setActiveTab", tabFromUrl);
      setActiveTab(tabFromUrl as VaultType);
    }
  }, []);

  const handleClickTab = (vaultType: VaultType) => {
    addUrlParameterToLocation("drVaultType", vaultType);
    setActiveTab(vaultType);
  };

  return (
    <section>
      <MarginBox
        margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
      >
        <ItemPickerTabs
          items={items}
          itemPickerName="valueTypePicker"
          activeItemValue={activeTab}
          isUniWidth={true}
          onItemClick={(value) => handleClickTab(value as VaultType)}
        />
      </MarginBox>

      {activeTab === "sov" && <SovVaults />}
      {activeTab === "archived" && <ArchivedVaults />}
    </section>
  );
};

export default DrVaults;

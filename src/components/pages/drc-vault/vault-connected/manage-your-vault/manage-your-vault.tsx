import * as React from "react";
import { DrVaultUserAction } from "../../../../../../types/dr-vault";
import { MANAGE_DRC_VAULT } from "../../../../../constants/elements";
import { DrcVaultContext } from "../../../../../site-context/dr-context/drc-vault-context";
import { anchorToElement } from "../../../../../utils/dom/anchor-to-hash";
import Container from "../../../../ui-library/container/container";
import { grid } from "../../../../ui-library/design-tokens/grid";
import ItemPickerTabs from "../../../../ui-library/item-picker-tabs/item-picker-tabs";
import MarginBox from "../../../../ui-library/margin-box/margin-box";
import Heading from "../../../../ui-library/text/heading";
import VaultActionDeposit from "../vault-actions/vault-action-deposit";
import VaultActionWithdraw from "../vault-actions/vault-action-withdraw";

const actionItems = [
  { label: "Deposit", value: "deposit" },
  { label: "Withdraw", value: "withdraw" },
];

const ManageYourDr: React.FC = () => {
  const { appState } = React.useContext(DrcVaultContext);
  const { activeAction, setActiveDrAction } = appState;

  const handleClickItem = (item: string) => {
    setActiveDrAction(item as DrVaultUserAction);
    anchorToElement(MANAGE_DRC_VAULT);
  };

  return (
    <>
      <Container id={MANAGE_DRC_VAULT}>
        <Heading
          textAlign="center"
          margin={{ desktop: { bottom: grid(4) }, mobile: { bottom: grid(4) } }}
        >
          Manage your DRC Vault
        </Heading>

        <MarginBox
          margin={{ desktop: { bottom: grid(4) }, mobile: { bottom: grid(4) } }}
        >
          <ItemPickerTabs
            itemPickerName="drcVaultUserActionType"
            activeItemValue={activeAction}
            items={actionItems}
            isUniWidth={true}
            onItemClick={handleClickItem}
          />
        </MarginBox>
      </Container>

      <Container fullWidthOnMobile={true}>
        {activeAction === "deposit" && <VaultActionDeposit />}
        {activeAction === "withdraw" && <VaultActionWithdraw />}
      </Container>
    </>
  );
};

export default ManageYourDr;

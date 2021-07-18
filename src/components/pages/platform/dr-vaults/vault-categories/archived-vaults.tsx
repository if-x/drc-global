import * as React from "react";
import { DR_VAULTS } from "../../../../../data/dr/dr-vaults";
import DrDepositWarning from "../../../../modules/dr-deposit-warning/dr-deposit-warning";
import Column from "../../../../ui-library/column-system/column";
import Row from "../../../../ui-library/column-system/row";
import { grid } from "../../../../ui-library/design-tokens/grid";
import MarginBox from "../../../../ui-library/margin-box/margin-box";
import VaultCard from "../../vault-card/vault-card";

const ArchivedVaults: React.FC = () => {
  return (
    <>
      <MarginBox margin={{ bottom: grid(4) }}>
        <DrDepositWarning />
      </MarginBox>

      <Row>
        <Column spanLg={6} spanMd={6} spanSm={12}>
          <VaultCard {...DR_VAULTS.s1} />
        </Column>
        <Column spanLg={6} spanMd={6} spanSm={12}>
          <VaultCard {...DR_VAULTS.s3} />
        </Column>
      </Row>
    </>
  );
};

export default ArchivedVaults;

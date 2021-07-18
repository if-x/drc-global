import * as React from "react";
import Column from "../../../../ui-library/column-system/column";
import Row from "../../../../ui-library/column-system/row";
import Vault5ComingSoonCard from "../../vault-card/vault-5-coming-soon-card";
import Vault6ComingSoonCard from "../../vault-card/vault-6-coming-soon-card";

const InterestBearingVaults: React.FC = () => {
  return (
    <Row>
      <Column spanLg={6} spanMd={6} spanSm={12}>
        <Vault5ComingSoonCard />
      </Column>
      <Column spanLg={6} spanMd={6} spanSm={12}>
        <Vault6ComingSoonCard />
      </Column>
    </Row>
  );
};

export default InterestBearingVaults;

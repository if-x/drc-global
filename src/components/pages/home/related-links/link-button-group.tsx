import * as React from "react";
import Button from "../../../ui-library/button/button";
import Column from "../../../ui-library/column-system/column";
import Row from "../../../ui-library/column-system/row";

interface LinkItem {
  label: string;
  url: string;
}

interface LinkButtonGroupProps {
  links: LinkItem[];
}

const LinkButtonGroup: React.FC<LinkButtonGroupProps> = ({ links }) => {
  return (
    <Row>
      {links.map((link) => (
        <Column key={link.url} spanLg={4} spanMd={4} spanSm={4} spanXs={12}>
          <Button to={link.url} target="_blank" css={{ width: "100%" }}>
            {link.label}
          </Button>
        </Column>
      ))}
    </Row>
  );
};

export default LinkButtonGroup;

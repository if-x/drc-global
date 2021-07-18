import * as React from "react";
import { Theme } from "../../../../types/theme";
import { grid } from "../../ui-library/design-tokens/grid";
import Heading from "../../ui-library/text/heading";

interface WhitePaperSectionProps {
  id?: string;
  heading: string;
}

const WhitePaperSection: React.FC<WhitePaperSectionProps> = ({
  id,
  heading,
  children,
}) => {
  return (
    <div id={id} css={{ marginBottom: grid(5) }}>
      <Heading
        component="h2"
        size="small"
        margin={{ desktop: { bottom: grid(3) }, mobile: { bottom: grid(2) } }}
      >
        {heading}
      </Heading>

      <div
        css={(theme: Theme) => ({
          color: theme.text,
          p: { marginBottom: grid(2) },
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default WhitePaperSection;

import * as React from "react";
import Container from "../../ui-library/container/container";
import { grid } from "../../ui-library/design-tokens/grid";
import MarginBox from "../../ui-library/margin-box/margin-box";
import PageHeading from "../../modules/page-heading/page-heading";
import { Fonts } from "../../ui-library/design-tokens/fonts";
import { Device } from "../../ui-library/design-tokens/media-queries";

const NotFound: React.FC = () => {
  return (
    <Container>
      <MarginBox
        margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
      >
        <PageHeading />
      </MarginBox>

      <h1
        css={{
          fontSize: 50,
          fontWeight: Fonts.Weight.Bold,
          textAlign: "center",
          marginBottom: grid(1),

          [Device.DesktopTablet]: {
            fontSize: 100,
          },
        }}
      >
        404
      </h1>

      <div
        css={{
          fontSize: 20,
          textAlign: "center",

          [Device.DesktopTablet]: {
            fontSize: 24,
          },
        }}
      >
        Page not found
      </div>
    </Container>
  );
};

export default NotFound;

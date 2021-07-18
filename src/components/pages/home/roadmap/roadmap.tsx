import * as React from "react";
import { Theme } from "../../../../../types/theme";
import { ROADMAP } from "../../../../constants/elements";
import { DRC_ROADMAP_EN } from "../../../../data/content/drc-roadmap-en";
import { grid } from "../../../ui-library/design-tokens/grid";
import { Device } from "../../../ui-library/design-tokens/media-queries";
import Heading from "../../../ui-library/text/heading";
import RoadmapSection from "./roadmap-section/roadmap-section";

const Roadmap: React.FC = () => {
  return (
    <section id={ROADMAP} css={{ paddingTop: grid(3) }}>
      <Heading component="h2" textAlign="center" margin={{ bottom: grid(2) }}>
        DRC Roadmap
      </Heading>

      <div
        css={(theme: Theme) => ({
          color: theme.text,
          textAlign: "center",
          marginBottom: grid(3),
          [Device.DesktopTablet]: {
            marginBottom: grid(4),
          },
        })}
      >
        Q4 2020 - Q4 2021
      </div>

      {DRC_ROADMAP_EN.map((section) => (
        <RoadmapSection key={section.title} {...section} />
      ))}
    </section>
  );
};

export default Roadmap;

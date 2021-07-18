import * as React from "react";
import styles from "./roadmap-section.styles";

interface RoadmapSectionProps {
  title: string;
  events: {
    content: string;
    finished: boolean;
  }[];
}

const RoadmapSection: React.FC<RoadmapSectionProps> = ({ title, events }) => {
  return (
    <div css={styles.root}>
      <div css={(theme) => [styles.title(theme), styles.link(theme)]}>
        {title}
      </div>

      {events.map((event) => (
        <div
          key={event.content.slice(0, 30)}
          css={(theme) => [
            styles.node(theme),
            styles.link(theme),
            event.finished && styles.nodeActive(theme),
          ]}
        >
          {event.content}
        </div>
      ))}
    </div>
  );
};

export default RoadmapSection;

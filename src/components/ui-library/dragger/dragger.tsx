import * as React from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import styles from "./dragger.styles";

interface DraggerProps {
  percentage: number;
  onDragged: (percentage: number) => void;
}

const Dragger: React.FC<DraggerProps> = ({ percentage, onDragged }) => {
  const draggerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState<number>(310);
  const [left, setLeft] = React.useState<number>(percentage);

  React.useEffect(() => {
    setWidth(draggerRef.current?.clientWidth || 280);
  }, []);

  React.useEffect(() => {
    const leftPosition = (percentage * width) / 100;
    setLeft(leftPosition);
  }, [percentage]);

  const handleDrag: DraggableEventHandler = (_, data) => {
    const x = Math.min(Math.max(data.x, 0), width);
    const newPercentage = Math.round((x / width) * 100);
    onDragged(newPercentage);
  };

  return (
    <div ref={draggerRef} css={styles.root}>
      <Draggable
        axis="x"
        handle=".handle"
        position={{ x: left, y: 0 }}
        bounds={{ left: 0, right: width }}
        grid={[1, 10]}
        scale={1}
        onDrag={handleDrag}
        onStop={handleDrag}
      >
        <div className="handle" css={styles.handle} />
      </Draggable>
      <div css={styles.rail} />
    </div>
  );
};

export default Dragger;

import * as React from "react";
import Button from "../button/button";
import styles from "./percentage-picker.styles";

interface PercentagePickerProps {
  percentage: number;
  onSelect: (percentage: number) => void;
}

const items = [25, 50, 75, 100];

const PercentagePicker: React.FC<PercentagePickerProps> = ({
  percentage,
  onSelect,
}) => {
  return (
    <div css={styles.root}>
      {items.map((item) => (
        <Button
          key={item}
          size="small"
          type={percentage === item ? "primary" : "default"}
          onClick={() => onSelect(item)}
        >
          {item === 100 ? "Max" : `${item}%`}
        </Button>
      ))}
    </div>
  );
};

export default PercentagePicker;

import * as React from "react";

import invariant from "ts-invariant";
import styles from "./item-picker-tabs.styles";

export interface PickerItem {
  label: string;
  value: string;
}

interface ItemPickerTabsProps {
  itemPickerName: string;
  items: PickerItem[];
  activeItemValue: string;
  onItemClick: (value: string) => void;
  isScrollable?: boolean;
  isUniWidth?: boolean;
  size?: "small" | "default";
}

const ItemPickerTabs: React.FC<ItemPickerTabsProps> = (props) => {
  const {
    itemPickerName,
    isScrollable,
    isUniWidth,
    items,
    activeItemValue,
    onItemClick,
    size,
  } = props;

  invariant(
    !itemPickerName.includes(" "),
    "Item picker name should be camelcase"
  );

  const content = items.map((item, index) => (
    <div
      id={`${itemPickerName}-${index}`}
      key={item.value}
      role="button"
      aria-label={item.label}
      css={(theme) => [
        styles.defaultLabel(theme),
        isUniWidth && styles.uniWidth,
        activeItemValue === item.value && styles.selected(theme),
      ]}
      onClick={() => onItemClick(item.value)}
      title={item.value}
    >
      <span
        css={[styles.labelText, size === "small" && styles.smallLabel]}
        title={item.value}
      >
        {item.label}
      </span>
    </div>
  ));

  return (
    <div css={[styles.container, isScrollable && styles.scroll]}>
      <div
        css={(theme) => [
          styles.borderedContainer(theme),
          size === "small" && styles.smallContainer,
        ]}
      >
        {content}
      </div>
    </div>
  );
};

export default ItemPickerTabs;

export const ItemPickerTabsSkeleton: React.FC = () => (
  <div css={styles.container}>
    <div css={styles.borderedContainer} />
  </div>
);

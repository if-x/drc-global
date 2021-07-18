import { useTheme } from "emotion-theming";
import * as React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Theme } from "../../../../types/theme";
import styles from "./button.styles";

interface ButtonProps {
  to?: string;
  title?: string;
  type?: "primary" | "default";
  size?: "standard" | "small";
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
  target?: string;
}

const Button: React.FC<ButtonProps> = ({
  to,
  type = "default",
  size = "standard",
  isLoading,
  isDisabled,
  target,
  onClick,
  children,
  ...props
}) => {
  const theme = useTheme<Theme>();

  const content = (
    <>
      {isLoading && (
        <div css={styles.loader}>
          <ScaleLoader
            height={15}
            width={2}
            radius={2}
            margin={2}
            color={type === "primary" ? theme.background : theme.foreground}
          />
        </div>
      )}

      {children}
    </>
  );

  return to ? (
    <a
      href={to}
      css={(theme) => [
        styles.root(theme),
        type === "primary" && styles.primary(theme),
        size === "small" && styles.small,
        isDisabled && styles.disabled,
      ]}
      target={target}
      onClick={!isDisabled ? onClick : undefined}
      rel={target === "_blank" ? "noreferrer" : undefined}
      {...props}
    >
      {content}
    </a>
  ) : (
    <button
      css={(theme) => [
        styles.root(theme),
        type === "primary" && styles.primary(theme),
        size === "small" && styles.small,
        onClick && !isDisabled && styles.cursorPointer,
        isLoading && styles.cursorWait,
        isDisabled && styles.disabled,
      ]}
      onClick={!isDisabled ? onClick : undefined}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;

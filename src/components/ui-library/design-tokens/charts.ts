import { Theme } from "../../../../types/theme";

export const TooltipContainerStyles = (theme: Theme) => ({
  border: 0,
  borderRadius: "8px",
  fontSize: 12,
  color: theme.foreground,
  backgroundColor: theme.tooltipBackground,
  boxShadow: "2px 2px 5px 3px rgba(0,0,0,0.15)",
  "*": {
    color: theme.foreground,
  },
});

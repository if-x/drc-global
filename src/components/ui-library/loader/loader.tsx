import { useTheme } from "emotion-theming";
import * as React from "react";
import BarLoader from "react-spinners/BarLoader";
import { Theme } from "../../../../types/theme";

interface LoaderProps {
  height?: number;
}

const Loader: React.FC<LoaderProps> = ({ height = 80 }) => {
  const theme = useTheme<Theme>();

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        height,
        justifyContent: "center",
        "> span": { display: "block" },
      }}
    >
      <BarLoader height={10} width={200} color={theme.foreground} />
    </div>
  );
};

export default Loader;

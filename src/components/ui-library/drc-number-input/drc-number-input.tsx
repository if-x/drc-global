import * as React from "react";
import LogoBlack from "../../../images/logo-round-black.svg";
import LogoWhite from "../../../images/logo-round-white.svg";
import { SiteContext } from "../../../site-context/site-context";
import { Fonts } from "../design-tokens/fonts";
import Image from "../image/image";
import Text from "../text/text";
import styles from "./drc-number-input.styles";

interface DrcNumberInputProps {
  value: number;
  max: number;
  onValueSet: (value: number) => void;
}

const DrcNumberInput: React.FC<DrcNumberInputProps> = ({
  value,
  max,
  onValueSet,
}) => {
  const { isDarkMode } = React.useContext(SiteContext);

  const logo = isDarkMode ? LogoWhite : LogoBlack;

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.currentTarget.value);
    const formattedValue = Math.max(0, Math.min(max, newValue));
    onValueSet(formattedValue);
  };

  return (
    <div css={styles.root}>
      <div css={styles.imageContainer}>
        <Image src={logo} alt="Logo" />
      </div>

      <input
        type="number"
        css={styles.input}
        value={`${value}`}
        onChange={handleValueChange}
        step={1}
      />

      <Text weight={Fonts.Weight.Bold}>DRC</Text>
    </div>
  );
};

export default DrcNumberInput;

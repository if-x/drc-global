import * as React from "react";
import { getTimeDiff, isLaunched } from "../../../../utils/timestamp";
import { Fonts } from "../../../ui-library/design-tokens/fonts";
import { grid } from "../../../ui-library/design-tokens/grid";
import { Device } from "../../../ui-library/design-tokens/media-queries";
import MarginBox from "../../../ui-library/margin-box/margin-box";

interface TimeDiff {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const CountDown: React.FC = () => {
  const [timeDiff, setTimeDiff] = React.useState<TimeDiff>(getTimeDiff());

  React.useEffect(() => {
    const updateTimer = setInterval(() => {
      if (!isLaunched) {
        setTimeDiff(getTimeDiff());
      } else {
        clearInterval(updateTimer);
      }
    }, 1000);

    return () => {
      clearInterval(updateTimer);
    };
  }, []);

  if (isLaunched) {
    return null;
  }

  return (
    <MarginBox
      margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
    >
      <div
        css={(theme) => ({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: grid(9),
          textAlign: "center",
          fontSize: 18,
          lineHeight: "30px",
          fontWeight: Fonts.Weight.Bold,
          border: `1px solid ${theme.border}`,

          [Device.DesktopTablet]: {
            height: grid(6),
          },
          [Device.Mobile]: {
            flexDirection: "column",
          },
        })}
      >
        <span
          css={{
            [Device.DesktopTablet]: {
              marginRight: grid(0.5),
            },
            [Device.Mobile]: {
              display: "block",
            },
          }}
        >
          LAUNCHING IN :
        </span>
        {timeDiff.days} D : {timeDiff.hours} H : {timeDiff.minutes} M :{" "}
        {timeDiff.seconds} S
      </div>
    </MarginBox>
  );
};

export default CountDown;
